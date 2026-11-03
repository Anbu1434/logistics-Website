import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeClient } from "./home-client";
import brandConfig from "@/config/brand";
import { getBestSellers, getCategories, getSkinConcerns } from "@/services/catalog.service";

export const metadata: Metadata = {
  title: `${brandConfig.name} | Natural Skincare & Botanical Science`,
  description: brandConfig.description,
};

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function HomePage() {
  const [dbBestSellers, dbCategories, dbConcerns] = await Promise.all([
    getBestSellers(8).catch(() => []),
    getCategories().catch(() => []),
    getSkinConcerns().catch(() => []),
  ]);

  // Format products for HomeClient
  const bestSellers = dbBestSellers.map((prod) => {
    const minPrice = prod.variants[0]?.price ? prod.variants[0].price / 100 : 899;
    const compareAtPrice = prod.variants[0]?.compareAtPrice
      ? prod.variants[0].compareAtPrice / 100
      : undefined;
    const primaryImage = prod.images[0]?.url || "/images/placeholder.jpg";
    const avgRating =
      prod.reviews.length > 0
        ? Number(
            (
              prod.reviews.reduce((acc, r) => acc + r.rating, 0) / prod.reviews.length
            ).toFixed(1)
          )
        : 4.9;

    return {
      id: prod.id,
      slug: prod.slug,
      name: prod.name,
      subtitle: prod.subtitle || prod.category?.name || "Botanical Science",
      price: minPrice,
      compareAtPrice,
      rating: avgRating,
      reviewCount: prod.reviews.length || 48,
      badge: prod.badge || undefined,
      image: primaryImage,
      variantId: prod.variants[0]?.id,
      size: prod.variants[0]?.size || "50ml",
    };
  });

  const categories = dbCategories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || "Botanical formulations designed for radiant barrier health.",
    productCount: c._count.products,
    image: c.image,
  }));

  const concerns = dbConcerns.map((con) => ({
    id: con.id,
    name: con.name,
    slug: con.slug,
    description: con.description,
    productCount: con._count.products,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1">
        <HomeClient
          initialBestSellers={bestSellers}
          initialCategories={categories}
          initialConcerns={concerns}
        />
      </main>
      <Footer />
    </div>
  );
}
