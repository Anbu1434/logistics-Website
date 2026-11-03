import * as React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageSlotProps {
  src?: string | null;
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  fallbackGradient?: string;
  badgeText?: string;
}

export function ImageSlot({
  src,
  alt,
  aspectRatio = "portrait",
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fallbackGradient = "from-[#F4EEE4] via-[#E6ECDD]/50 to-[#E9DFD0]",
  badgeText,
}: ImageSlotProps) {
  const [hasError, setHasError] = React.useState(false);

  const aspectRatios = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[16/9]",
    wide: "aspect-[21/9]",
  };

  const isRemoteOrLocalValid = src && !hasError && (src.startsWith("/") || src.startsWith("http"));

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-cream-100 rounded-card select-none group",
        aspectRatios[aspectRatio],
        className
      )}
    >
      {isRemoteOrLocalValid ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setHasError(true)}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
        />
      ) : (
        /* Botanical aesthetic placeholder */
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-104",
            fallbackGradient
          )}
        >
          <div className="w-14 h-14 rounded-full bg-cream-50/80 backdrop-blur-sm flex items-center justify-center text-forest-800 shadow-subtle mb-3">
            <Sparkles className="w-6 h-6 text-forest-600" />
          </div>
          <span className="text-xs uppercase tracking-widest text-forest-800/80 font-serif font-semibold max-w-[85%] truncate">
            {alt}
          </span>
          <span className="text-[10px] text-ink-500 mt-1 uppercase tracking-wider">
            Verdéa Botanical Formula
          </span>
        </div>
      )}

      {badgeText && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-pill text-[11px] font-medium tracking-wider uppercase bg-forest-800 text-cream-50 shadow-sm">
            {badgeText}
          </span>
        </div>
      )}
    </div>
  );
}
