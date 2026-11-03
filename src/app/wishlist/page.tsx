import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WishlistClient } from "./wishlist-client";
import brandConfig from "@/config/brand";
import { getBestSellers } from "@/services/catalog.service";

export const metadata: Metadata = {
  title: `My Wishlist | ${brandConfig.name}`,
  description: `Your curated collection of favorite botanical skincare formulas.`,
};

export default async function WishlistPage() {
  const bestSellers = await getBestSellers(4);

  const fallbackRecommendations = bestSellers.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle || p.category?.name || "Botanical Care",
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
    reviewCount: p.reviews.length || 36,
    image: p.images[0]?.url || "/images/placeholder.jpg",
    badge: p.badge || undefined,
    variantId: p.variants[0]?.id,
    size: p.variants[0]?.size || "50ml",
  }));

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <WishlistClient recommendations={fallbackRecommendations} />
      </main>
      <Footer />
    </div>
  );
}

