import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchClient } from "./search-client";
import brandConfig from "@/config/brand";
import { searchCatalog } from "@/services/search.service";
import { getBestSellers } from "@/services/catalog.service";

interface SearchPageProps {
  searchParams: { q?: string };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || "";
  return {
    title: query ? `Search results for "${query}" | ${brandConfig.name}` : `Search | ${brandConfig.name}`,
    description: `Discover clean botanical skincare matching "${query}" at ${brandConfig.name}.`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  const [searchData, bestSellers] = await Promise.all([
    query ? searchCatalog(query, 24) : Promise.resolve({ results: [], suggestions: [] }),
    getBestSellers(4),
  ]);

  const recommendedProducts = bestSellers.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle || p.category?.name || "Verdéa Care",
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
    reviewCount: p.reviews.length || 32,
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
        <SearchClient
          initialQuery={query}
          results={searchData.results}
          suggestions={searchData.suggestions}
          recommendedProducts={recommendedProducts}
        />
      </main>
      <Footer />
    </div>
  );
}

