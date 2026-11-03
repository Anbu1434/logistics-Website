import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartPageClient } from "./cart-page-client";
import brandConfig from "@/config/brand";
import { getBestSellers } from "@/services/catalog.service";

export const metadata: Metadata = {
  title: `Your Shopping Bag | ${brandConfig.name}`,
  description: `Review your selected botanical skincare formulations, apply discount codes, and proceed to checkout.`,
};

export default async function CartPage() {
  const bestSellers = await getBestSellers(4);

  const upsells = bestSellers.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle || p.category?.name || "Botanical Routine",
    price: p.variants[0]?.price ? p.variants[0].price / 100 : 799,
    compareAtPrice: p.variants[0]?.compareAtPrice
      ? p.variants[0].compareAtPrice / 100
      : undefined,
    image: p.images[0]?.url || "/images/placeholder.jpg",
    rating: 4.9,
    reviewCount: 38,
    variantId: p.variants[0]?.id,
    size: p.variants[0]?.size || "50ml",
  }));

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <CartPageClient upsells={upsells} />
      </main>
      <Footer />
    </div>
  );
}

