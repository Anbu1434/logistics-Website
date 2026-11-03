import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductClient } from "./product-client";
import brandConfig from "@/config/brand";
import { getProductBySlug, getProducts } from "@/services/catalog.service";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: `Product Not Found | ${brandConfig.name}`,
    };
  }

  const primaryImage = product.images[0]?.url || "/images/placeholder.jpg";

  return {
    title: `${product.name} | ${brandConfig.name}`,
    description: product.subtitle || product.description,
    openGraph: {
      title: product.name,
      description: product.subtitle || product.description,
      images: [{ url: primaryImage }],
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Fetch "Complete the routine" cross-sell products from the same category or overall
  const relatedResult = await getProducts({
    categorySlug: product.category?.slug,
    limit: 4,
  });

  const crossSellProducts = relatedResult.products
    .filter((p) => p.id !== product.id)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      subtitle: p.subtitle || p.category?.name || "Complementary Routine",
      price: p.variants[0]?.price ? p.variants[0].price / 100 : 799,
      compareAtPrice: p.variants[0]?.compareAtPrice
        ? p.variants[0].compareAtPrice / 100
        : undefined,
      rating:
        p.reviews.length > 0
          ? Number(
              (p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length).toFixed(1)
            )
          : 4.8,
      reviewCount: p.reviews.length || 24,
      image: p.images[0]?.url || "/images/placeholder.jpg",
      variantId: p.variants[0]?.id,
      size: p.variants[0]?.size || "50ml",
    }));

  // Average rating
  const avgRating =
    product.reviews.length > 0
      ? Number(
          (
            product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
          ).toFixed(1)
        )
      : 4.9;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    brand: {
      "@type": "Brand",
      name: brandConfig.name,
    },
    offers: product.variants.map((variant) => ({
      "@type": "Offer",
      price: (variant.price / 100).toFixed(2),
      priceCurrency: brandConfig.currency.code,
      availability:
        variant.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      sku: variant.sku,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: Math.max(1, product.reviews.length),
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-6 sm:py-10">
        <ProductClient
          product={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            subtitle: product.subtitle,
            description: product.description,
            badge: product.badge,
            category: product.category,
            variants: product.variants.map((v) => ({
              id: v.id,
              name: v.name,
              sku: v.sku,
              size: v.size || "50ml",
              price: v.price / 100,
              compareAtPrice: v.compareAtPrice ? v.compareAtPrice / 100 : undefined,
              inventoryQuantity: v.stock,
            })),
            images: product.images.map((img) => ({
              id: img.id,
              url: img.url,
              alt: img.altText || product.name,
              isPrimary: img.isPrimary,
            })),
            ingredients: product.ingredients.map((item) => ({
              id: item.ingredient.id,
              name: item.ingredient.name,
              inciName: item.ingredient.inciName,
              description: item.ingredient.description,
              isKey: item.isKeyActive,
            })),
            concerns: product.concerns.map((con) => ({
              id: con.concern.id,
              name: con.concern.name,
              slug: con.concern.slug,
            })),
            reviews: product.reviews.map((r) => ({
              id: r.id,
              authorName: r.authorName,
              rating: r.rating,
              title: r.title,
              content: r.content,
              isVerified: r.verifiedPurchase,
              createdAt: r.createdAt.toISOString(),
            })),
            questions: product.questions.map((q) => ({
              id: q.id,
              question: q.question,
              answer: q.answer,
              askedBy: q.authorName,
            })),
          }}
          crossSellProducts={crossSellProducts}
        />
      </main>
      <Footer />
    </div>
  );
}
