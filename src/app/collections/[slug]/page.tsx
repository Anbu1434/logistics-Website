import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CollectionClient } from "./collection-client";
import brandConfig from "@/config/brand";
import {
  getProducts,
  getCategories,
  getSkinConcerns,
} from "@/services/catalog.service";

interface PageProps {
  params: { slug: string };
  searchParams: {
    concern?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
    page?: string;
  };
}

const COLLECTION_TITLES: Record<string, { title: string; subtitle: string }> = {
  all: {
    title: "Complete Botanical Collection",
    subtitle: "Explore our full spectrum of clean, clinical phyto-active formulas.",
  },
  skincare: {
    title: "Botanical Skincare Essentials",
    subtitle: "Cleansers, barrier creams, and active treatments designed in harmony.",
  },
  cleansers: {
    title: "Purifying & Balancing Cleansers",
    subtitle: "Melt impurities and replenish the lipid barrier without stripping.",
  },
  moisturizers: {
    title: "Barrier Repair & Hydration",
    subtitle: "Deep cellular moisture powered by bio-compatible ceramides and squalane.",
  },
  serums: {
    title: "High-Potency Active Serums",
    subtitle: "Clinically proven concentrations of Vitamin C, Niacinamide, and Peptides.",
  },
  sunscreens: {
    title: "Invisible Mineral SPF Defense",
    subtitle: "Broad-spectrum SPF 50+ mineral protection with zero white cast.",
  },
  makeup: {
    title: "Botanical Bio-Pigments",
    subtitle: "Clean, nourishing cosmetics enriched with antioxidants and botanical oils.",
  },
  haircare: {
    title: "Hair & Scalp Revitalization",
    subtitle: "Root-strengthening peptides and rosemary bio-actives for lustrous hair.",
  },
  fragrance: {
    title: "Botanical Fine Fragrances",
    subtitle: "Pure essential plant distillations crafted without synthetic fixatives.",
  },
  combos: {
    title: "Synergistic Routine Bundles",
    subtitle: "Curated rituals designed to deliver clinical outcomes with up to 25% savings.",
  },
  "best-sellers": {
    title: "Best-Selling Formulations",
    subtitle: "Our most coveted, highest-rated formulas beloved by dermatologists and customers.",
  },
  sale: {
    title: "Special Botanical Offers",
    subtitle: "Seasonal reductions on award-winning natural skincare rituals.",
  },
  new: {
    title: "New Arrivals",
    subtitle: "Fresh from our formulation laboratory: the latest in green cosmetic science.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = COLLECTION_TITLES[params.slug] || {
    title: `${params.slug.replace("-", " ")} Collection`,
    subtitle: `Shop ${params.slug.replace("-", " ")} at ${brandConfig.name}.`,
  };

  return {
    title: `${meta.title} | ${brandConfig.name}`,
    description: meta.subtitle,
    alternates: {
      canonical: `/collections/${params.slug}`,
    },
  };
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { slug } = params;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;
  const concernSlug = searchParams.concern;
  const sort = searchParams.sort || "featured";

  const [categories, concerns, catalogResult] = await Promise.all([
    getCategories(),
    getSkinConcerns(),
    getProducts({
      categorySlug: slug,
      concernSlug,
      minPrice,
      maxPrice,
      sort,
      page,
      limit: 12,
    }),
  ]);

  const collectionInfo = COLLECTION_TITLES[slug] || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " "),
    subtitle: "Discover high-performance natural formulations for glowing health.",
  };

  // Map products
  const formattedProducts = catalogResult.products.map((p) => {
    const minPrice = p.variants[0]?.price ? p.variants[0].price / 100 : 799;
    const compareAtPrice = p.variants[0]?.compareAtPrice
      ? p.variants[0].compareAtPrice / 100
      : undefined;
    const primaryImage = p.images[0]?.url || "/images/placeholder.jpg";
    const avgRating =
      p.reviews.length > 0
        ? Number(
            (p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length).toFixed(1)
          )
        : 4.8;

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      subtitle: p.subtitle || p.category?.name || "Verdéa Care",
      price: minPrice,
      compareAtPrice,
      rating: avgRating,
      reviewCount: p.reviews.length || 32,
      badge: p.badge || undefined,
      image: primaryImage,
      variantId: p.variants[0]?.id,
      size: p.variants[0]?.size || "50ml",
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <CollectionClient
          slug={slug}
          title={collectionInfo.title}
          subtitle={collectionInfo.subtitle}
          products={formattedProducts}
          pagination={catalogResult.pagination}
          categories={categories.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            count: c._count.products,
          }))}
          concerns={concerns.map((con) => ({
            id: con.id,
            name: con.name,
            slug: con.slug,
            count: con._count.products,
          }))}
          currentFilters={{
            concern: concernSlug,
            minPrice,
            maxPrice,
            sort,
            page,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

