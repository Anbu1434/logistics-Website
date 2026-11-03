"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SerializedProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  image?: string;
  variantId?: string;
  size?: string;
}

interface CategoryFilter {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface ConcernFilter {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface CollectionClientProps {
  slug: string;
  title: string;
  subtitle: string;
  products: SerializedProduct[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  categories: CategoryFilter[];
  concerns: ConcernFilter[];
  currentFilters: {
    concern?: string;
    minPrice?: number;
    maxPrice?: number;
    sort: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
    page: number;
  };
}

export function CollectionClient({
  slug,
  title,
  subtitle,
  products,
  pagination,
  categories,
  concerns,
  currentFilters,
}: CollectionClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  // Update query params helper
  const updateFilter = (newParams: Record<string, string | number | undefined | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Reset to page 1 on filter change if page wasn't explicitly provided
    if (!newParams.page) {
      params.delete("page");
    }

    router.push(`/collections/${slug}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(`/collections/${slug}`);
  };

  // Check active filters count
  const hasActiveFilters =
    Boolean(currentFilters.concern) ||
    currentFilters.minPrice !== undefined ||
    currentFilters.maxPrice !== undefined ||
    currentFilters.sort !== "featured";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections/all" },
          { label: title, current: true },
        ]}
      />

      {/* Hero Title & Result Count */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-cream-200/90 gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-600">
            Botanical Catalog
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-ink-500">{subtitle}</p>
        </div>

        {/* Total Products indicator */}
        <div className="text-xs text-ink-500 font-medium">
          Showing{" "}
          <strong className="text-ink-900">{products.length}</strong> of{" "}
          <strong className="text-ink-900">{pagination.totalCount}</strong> formulations
        </div>
      </div>

      {/* Main Container: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-cream-100/50 p-6 rounded-card border border-cream-200">
          <div className="flex items-center justify-between pb-4 border-b border-cream-200">
            <h2 className="font-serif text-lg font-bold text-ink-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-forest-800" />
              <span>Filters</span>
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-forest-800 hover:text-forest-900 underline font-semibold"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Categories Facet */}
          <div className="space-y-3 pb-5 border-b border-cream-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forest-800">
              Categories
            </h3>
            <div className="space-y-1.5 text-xs">
              <Link
                href="/collections/all"
                className={cn(
                  "flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors",
                  slug === "all"
                    ? "bg-forest-800 text-cream-50 font-semibold"
                    : "text-ink-900 hover:bg-cream-200/50"
                )}
              >
                <span>All Products</span>
                <span className="text-[11px] opacity-80">{pagination.totalCount}</span>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.slug}`}
                  className={cn(
                    "flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors",
                    slug === cat.slug
                      ? "bg-forest-800 text-cream-50 font-semibold"
                      : "text-ink-900 hover:bg-cream-200/50"
                  )}
                >
                  <span>{cat.name}</span>
                  <span className="text-[11px] opacity-80">{cat.count}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Skin Concern Facet */}
          <div className="space-y-3 pb-5 border-b border-cream-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forest-800">
              Targeted Concern
            </h3>
            <div className="space-y-1.5 text-xs">
              {concerns.map((con) => {
                const isSelected = currentFilters.concern === con.slug;
                return (
                  <button
                    key={con.id}
                    type="button"
                    onClick={() =>
                      updateFilter({ concern: isSelected ? undefined : con.slug })
                    }
                    className={cn(
                      "w-full flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors text-left",
                      isSelected
                        ? "bg-sage-300 text-forest-900 font-bold"
                        : "text-ink-900 hover:bg-cream-200/50"
                    )}
                  >
                    <span>{con.name}</span>
                    <span className="text-[11px] text-ink-500">({con.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forest-800">
              Price Range
            </h3>
            <div className="space-y-1 text-xs">
              {[
                { label: "All Prices", min: undefined, max: undefined },
                { label: "Under $30", min: undefined, max: 30 },
                { label: "$30 to $50", min: 30, max: 50 },
                { label: "$50 and above", min: 50, max: undefined },
              ].map((tier, idx) => {
                const isSelected =
                  currentFilters.minPrice === tier.min && currentFilters.maxPrice === tier.max;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      updateFilter({
                        minPrice: tier.min,
                        maxPrice: tier.max,
                      })
                    }
                    className={cn(
                      "w-full text-left py-1.5 px-2 rounded-lg transition-colors",
                      isSelected
                        ? "bg-forest-800 text-cream-50 font-semibold"
                        : "text-ink-900 hover:bg-cream-200/50"
                    )}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Sort Toolbar, Active Chips & Product Grid */}
        <div className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Mobile filter button + Sort dropdown */}
          <div className="flex items-center justify-between gap-4 bg-cream-100/60 p-3 rounded-card border border-cream-200">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-cream-50 border border-cream-200 text-xs font-semibold text-ink-900 hover:bg-cream-100"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && "(Active)"}</span>
            </button>

            {/* Sorting Select */}
            <div className="flex items-center gap-2 ml-auto">
              <label htmlFor="sort-select" className="text-xs text-ink-500 font-medium hidden sm:block">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={currentFilters.sort}
                onChange={(e) => updateFilter({ sort: e.target.value })}
                className="h-9 px-3 pr-8 rounded-pill bg-cream-50 border border-cream-200 text-xs font-semibold text-ink-900 focus:outline-none focus:ring-2 focus:ring-forest-800"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-ink-500 font-medium mr-1">Active filters:</span>
              {currentFilters.concern && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-sage-100 border border-sage-300 text-xs font-semibold text-forest-900">
                  <span>Concern: {currentFilters.concern}</span>
                  <button
                    onClick={() => updateFilter({ concern: undefined })}
                    aria-label="Remove concern filter"
                    className="hover:text-danger"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {(currentFilters.minPrice !== undefined || currentFilters.maxPrice !== undefined) && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-sage-100 border border-sage-300 text-xs font-semibold text-forest-900">
                  <span>
                    Price: {currentFilters.minPrice ? `$${currentFilters.minPrice}` : "$0"} -{" "}
                    {currentFilters.maxPrice ? `$${currentFilters.maxPrice}` : "+"}
                  </span>
                  <button
                    onClick={() =>
                      updateFilter({ minPrice: undefined, maxPrice: undefined })
                    }
                    aria-label="Remove price filter"
                    className="hover:text-danger"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-ink-500 hover:text-forest-800 underline font-medium ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="p-12 text-center rounded-hero bg-cream-100/60 border border-cream-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cream-50 flex items-center justify-center mx-auto text-ink-500 shadow-subtle">
                <Sparkles className="w-8 h-8 text-forest-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-ink-900">
                  No formulations found
                </h3>
                <p className="text-xs text-ink-500 max-w-md mx-auto">
                  Try adjusting your price range or concern filters to view more botanical
                  creations.
                </p>
              </div>
              <Button onClick={clearAllFilters} variant="secondary" size="sm" className="rounded-pill">
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <ProductCard
                  key={prod.id}
                  id={prod.id}
                  slug={prod.slug}
                  name={prod.name}
                  subtitle={prod.subtitle}
                  price={prod.price}
                  compareAtPrice={prod.compareAtPrice}
                  rating={prod.rating}
                  reviewCount={prod.reviewCount}
                  badge={prod.badge}
                  image={prod.image}
                  variantId={prod.variantId}
                  size={prod.size}
                />
              ))}
            </div>
          )}

          {/* Pagination Navigation */}
          {pagination.totalPages > 1 && (
            <div className="pt-8 border-t border-cream-200 flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={pagination.currentPage <= 1}
                onClick={() => updateFilter({ page: pagination.currentPage - 1 })}
                className="rounded-pill px-3"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              {[...Array(pagination.totalPages)].map((_, i) => {
                const p = i + 1;
                const isCurrent = p === pagination.currentPage;
                return (
                  <button
                    key={p}
                    onClick={() => updateFilter({ page: p })}
                    className={cn(
                      "w-8 h-8 rounded-full text-xs font-semibold transition-colors",
                      isCurrent
                        ? "bg-forest-800 text-cream-50"
                        : "text-ink-900 hover:bg-cream-100"
                    )}
                  >
                    {p}
                  </button>
                );
              })}

              <Button
                variant="secondary"
                size="sm"
                disabled={pagination.currentPage >= pagination.totalPages}
                onClick={() => updateFilter({ page: pagination.currentPage + 1 })}
                className="rounded-pill px-3"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-cream-50 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                <h3 className="font-serif text-lg font-bold text-ink-900">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-ink-500 hover:text-ink-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-forest-800">Categories</h4>
                <div className="space-y-1 text-xs">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/collections/${cat.slug}`}
                      onClick={() => setMobileFiltersOpen(false)}
                      className="block py-1.5 px-2 rounded hover:bg-cream-100"
                    >
                      {cat.name} ({cat.count})
                    </Link>
                  ))}
                </div>
              </div>

              {/* Concerns */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-forest-800">Concerns</h4>
                <div className="space-y-1 text-xs">
                  {concerns.map((con) => (
                    <button
                      key={con.id}
                      onClick={() => {
                        updateFilter({ concern: con.slug });
                        setMobileFiltersOpen(false);
                      }}
                      className="block w-full text-left py-1.5 px-2 rounded hover:bg-cream-100"
                    >
                      {con.name} ({con.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-cream-200">
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full rounded-pill"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

