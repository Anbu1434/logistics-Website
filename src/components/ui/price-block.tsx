import * as React from "react";
import { cn, formatCurrency, calculateDiscountPercent } from "@/lib/utils";
import { Badge } from "./badge";

export interface PriceBlockProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "default" | "lg" | "xl";
  showSavingsBadge?: boolean;
  currencyCode?: string;
  className?: string;
}

export function PriceBlock({
  price,
  compareAtPrice,
  size = "default",
  showSavingsBadge = true,
  currencyCode,
  className,
}: PriceBlockProps) {
  const discountPercent = compareAtPrice ? calculateDiscountPercent(price, compareAtPrice) : 0;
  const hasDiscount = discountPercent > 0;

  const sizeClasses = {
    sm: {
      current: "text-sm font-semibold",
      compare: "text-xs",
      savings: "sm" as const,
    },
    default: {
      current: "text-base font-semibold",
      compare: "text-sm",
      savings: "sm" as const,
    },
    lg: {
      current: "text-xl font-bold",
      compare: "text-base",
      savings: "default" as const,
    },
    xl: {
      current: "text-2xl sm:text-3xl font-bold",
      compare: "text-lg",
      savings: "default" as const,
    },
  };

  const selectedSize = sizeClasses[size];

  return (
    <div className={cn("flex items-center flex-wrap gap-2 font-sans", className)}>
      <span className={cn("text-ink-900 tracking-tight", selectedSize.current)}>
        {formatCurrency(price, currencyCode)}
      </span>

      {hasDiscount && compareAtPrice && (
        <span
          className={cn(
            "text-ink-500 line-through decoration-ink-500/60 font-normal",
            selectedSize.compare
          )}
        >
          {formatCurrency(compareAtPrice, currencyCode)}
        </span>
      )}

      {hasDiscount && showSavingsBadge && (
        <Badge variant="clay" size={selectedSize.savings}>
          Save {discountPercent}%
        </Badge>
      )}
    </div>
  );
}
