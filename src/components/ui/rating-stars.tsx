import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  rating: number; // 0 to 5 (e.g., 4.8)
  reviewCount?: number;
  maxStars?: number;
  size?: "sm" | "default" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
  showCount?: boolean;
}

export function RatingStars({
  rating,
  reviewCount,
  maxStars = 5,
  size = "default",
  interactive = false,
  onRatingChange,
  className,
  showCount = true,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const starSizes = {
    sm: "w-3.5 h-3.5",
    default: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const currentScore = hoverRating !== null ? hoverRating : rating;

  return (
    <div
      className={cn("inline-flex items-center gap-1.5", className)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${rating.toFixed(1)} out of ${maxStars} stars${
        reviewCount ? `, ${reviewCount} reviews` : ""
      }`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = currentScore >= starValue;
          const isHalf = !isFilled && currentScore >= starValue - 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange?.(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={cn(
                "relative transition-transform",
                interactive ? "cursor-pointer hover:scale-110 focus:outline-none" : "cursor-default"
              )}
              aria-label={interactive ? `Rate ${starValue} stars` : undefined}
            >
              <Star
                className={cn(
                  starSizes[size],
                  isFilled
                    ? "fill-gold-500 text-gold-500"
                    : isHalf
                    ? "fill-gold-500/50 text-gold-500"
                    : "fill-cream-200 text-cream-200"
                )}
              />
            </button>
          );
        })}
      </div>

      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-ink-500 font-medium ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

