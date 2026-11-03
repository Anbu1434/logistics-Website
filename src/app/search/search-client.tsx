"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface SearchResultItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string | null;
  price: number;
  badge: string | null;
  categoryName: string | null;
}

interface RecommendedProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  variantId?: string;
  size?: string;
}

interface SearchClientProps {
  initialQuery: string;
  results: SearchResultItem[];
  suggestions: string[];
  recommendedProducts: RecommendedProduct[];
}

const POPULAR_SEARCHES = [
  "Vitamin C",
  "Ceramide",
  "Niacinamide",
  "Moisturizer",
  "SPF 50",
  "Cleanser",
  "Barrier",
  "Bakuchiol",
];

export function SearchClient({
  initialQuery,
  results,
  suggestions,
  recommendedProducts,
}: SearchClientProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState(initialQuery);

  const displayChips = suggestions.length > 0 ? suggestions : POPULAR_SEARCHES;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChipClick = (term: string) => {
    setQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Search", current: true },
        ]}
      />

      {/* Search Header Form */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900">
          Search the Verdéa Botanical Formulary
        </h1>
        <p className="text-xs sm:text-sm text-ink-500">
          Search by botanical active, skin concern, formulation type, or product name.
        </p>

        {/* Input bar */}
        <form onSubmit={handleSearch} className="relative flex items-center pt-2">
          <Search className="w-5 h-5 text-ink-500 absolute left-4 pointer-events-none" />
          <input
            type="search"
            placeholder="e.g. Vitamin C, Ceramide cream, mineral sunscreen..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-10 rounded-pill bg-cream-100 border border-cream-200 text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:ring-2 focus:ring-forest-800 shadow-subtle"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 text-ink-500 hover:text-ink-900"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs text-ink-500 font-medium mr-1">Trending:</span>
          {displayChips.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleChipClick(term)}
              className="px-3 py-1 rounded-pill bg-cream-100 border border-cream-200/80 text-xs font-semibold text-forest-800 hover:bg-cream-200 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Display */}
      {initialQuery ? (
        <div className="space-y-6 pt-4 border-t border-cream-200">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink-900">
              Results for &ldquo;{initialQuery}&rdquo;
            </h2>
            <span className="text-xs text-ink-500 font-medium">
              {results.length} {results.length === 1 ? "match" : "matches"} found
            </span>
          </div>

          {results.length === 0 ? (
            /* No Results Recovery */
            <div className="p-8 sm:p-12 text-center rounded-hero bg-cream-100/60 border border-cream-200 space-y-6">
              <div className="w-16 h-16 rounded-full bg-cream-50 flex items-center justify-center mx-auto text-ink-500 shadow-subtle">
                <Sparkles className="w-8 h-8 text-forest-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-ink-900">
                  No direct matches for &ldquo;{initialQuery}&rdquo;
                </h3>
                <p className="text-xs text-ink-500 max-w-md mx-auto">
                  We could not find an exact match, but our best-selling botanical formulas might be
                  just what your barrier needs.
                </p>
              </div>

              {/* Recommended alternatives */}
              <div className="pt-6 space-y-4 text-left">
                <h4 className="font-serif text-lg font-bold text-ink-900">
                  Recommended Best Sellers:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      slug={p.slug}
                      name={p.name}
                      subtitle={p.subtitle}
                      price={p.price}
                      compareAtPrice={p.compareAtPrice}
                      rating={p.rating}
                      reviewCount={p.reviewCount}
                      image={p.image}
                      badge={p.badge}
                      variantId={p.variantId}
                      size={p.size}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  slug={p.slug}
                  name={p.name}
                  subtitle={p.subtitle || p.categoryName || undefined}
                  price={p.price}
                  rating={4.9}
                  reviewCount={42}
                  badge={p.badge || undefined}
                  size="50ml"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Empty Query landing view */
        <div className="space-y-6 pt-6">
          <h2 className="font-serif text-2xl font-bold text-ink-900">
            Featured Botanical Curations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                slug={p.slug}
                name={p.name}
                subtitle={p.subtitle}
                price={p.price}
                compareAtPrice={p.compareAtPrice}
                rating={p.rating}
                reviewCount={p.reviewCount}
                image={p.image}
                badge={p.badge}
                variantId={p.variantId}
                size={p.size}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

