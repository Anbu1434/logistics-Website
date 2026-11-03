"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/context/store-context";
import { ProductCard } from "@/components/ui/product-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

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

interface WishlistClientProps {
  recommendations: RecommendedProduct[];
}

export function WishlistClient({ recommendations }: WishlistClientProps) {
  const { wishlist, wishlistCount } = useStore();

  // Find products that match wishlist IDs from recommendations or placeholders
  const wishlistedProducts = recommendations.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "My Wishlist", current: true },
        ]}
      />

      <div className="border-b border-cream-200 pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900">
          My Saved Formulations
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 mt-1">
          {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved to your personal botanical wishlist.
        </p>
      </div>

      {wishlistCount === 0 ? (
        <div className="p-8 sm:p-14 text-center rounded-hero bg-cream-100/60 border border-cream-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-cream-50 flex items-center justify-center mx-auto text-clay-400 shadow-subtle">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-ink-900">
              Your wishlist is waiting to be filled
            </h2>
            <p className="text-xs text-ink-500 max-w-sm mx-auto">
              Tap the heart icon on any botanical serum, barrier cream, or mineral SPF to save it
              here.
            </p>
          </div>
          <Link href="/collections/all">
            <Button className="rounded-pill mt-2" withArrow>
              Discover Formulations
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(wishlistedProducts.length > 0 ? wishlistedProducts : recommendations.slice(0, wishlistCount)).map((p) => (
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

      {/* Recommended Formulations Strip */}
      <div className="pt-10 border-t border-cream-200 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-ink-900">
          You May Also Adore
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((p) => (
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
  );
}

