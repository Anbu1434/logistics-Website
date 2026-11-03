"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { ImageSlot } from "./image-slot";
import { RatingStars } from "./rating-stars";
import { PriceBlock } from "./price-block";
import { Button } from "./button";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import { useStore } from "@/context/store-context";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  price: number;
  compareAtPrice?: number;
  rating?: number;
  reviewCount?: number;
  image?: string | null;
  badge?: string;
  variantId?: string;
  size?: string;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  className?: string;
}

export function ProductCard({
  id,
  slug,
  name,
  subtitle,
  price,
  compareAtPrice,
  rating = 4.8,
  reviewCount = 96,
  image,
  badge,
  variantId,
  size = "50ml",
  isWishlisted: propIsWishlisted,
  onToggleWishlist,
  onAddToCart,
  className,
}: ProductCardProps) {
  const store = useStore();
  const [isAdding, setIsAdding] = React.useState(false);

  const isWishlisted =
    propIsWishlisted !== undefined ? propIsWishlisted : store.isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(id);
    } else {
      store.toggleWishlist(id);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    if (onAddToCart) {
      setTimeout(() => {
        setIsAdding(false);
        onAddToCart(id);
      }, 300);
    } else {
      setTimeout(() => {
        setIsAdding(false);
        store.addToCart({
          productId: id,
          variantId: variantId || `var-${id}`,
          name,
          subtitle,
          size,
          price,
          compareAtPrice,
          image: image || "",
          quantity: 1,
          maxStock: 20,
        });
      }, 300);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between bg-cream-50 rounded-card p-3.5 border border-cream-200/80 transition-all duration-300 hover:shadow-soft hover:border-forest-600/30",
        className
      )}
    >
      <div>
        {/* Top Image Container */}
        <div className="relative overflow-hidden rounded-[16px] bg-[#F4EFE6]">
          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <Badge variant="forest" size="sm">
                {badge}
              </Badge>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-cream-50/90 backdrop-blur-sm flex items-center justify-center text-ink-900 transition-transform duration-200 hover:scale-110 active:scale-95 shadow-subtle"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isWishlisted ? "fill-clay-400 text-clay-400" : "text-ink-500 hover:text-ink-900"
              )}
            />
          </button>

          {/* Product Image */}
          <Link href={`/products/${slug}`} className="block focus:outline-none">
            <ImageSlot
              src={image}
              alt={name}
              aspectRatio="square"
              className="rounded-[16px]"
            />
          </Link>
        </div>

        {/* Content Details */}
        <div className="pt-4 px-1 pb-2">
          {subtitle && (
            <p className="text-[11px] font-medium tracking-wider uppercase text-forest-600 mb-1">
              {subtitle}
            </p>
          )}

          <Link
            href={`/products/${slug}`}
            className="block group/link focus:outline-none"
          >
            <h3 className="font-serif text-base font-semibold text-ink-900 line-clamp-1 group-hover/link:text-forest-800 transition-colors">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="mt-1.5 flex items-center">
            <RatingStars rating={rating} reviewCount={reviewCount} size="sm" />
          </div>

          {/* Price */}
          <div className="mt-2.5">
            <PriceBlock price={price} compareAtPrice={compareAtPrice} size="sm" />
          </div>
        </div>
      </div>

      {/* Add To Bag CTA Button */}
      <div className="mt-3 px-1">
        <Button
          type="button"
          variant="primary"
          size="sm"
          loading={isAdding}
          onClick={handleAddToCartClick}
          className="w-full text-xs font-semibold uppercase tracking-wider py-2.5 rounded-pill shadow-none hover:shadow-subtle"
        >
          <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
          Add to Bag
        </Button>
      </div>
    </div>
  );
}
