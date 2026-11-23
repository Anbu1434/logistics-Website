"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface PausableMarqueeProps {
  children: React.ReactNode;
  label: string;
  speedSeconds?: number;
  tone?: "light" | "dark";
  gap?: number;
  className?: string;
  groupClassName?: string;
  controlClassName?: string;
}

/**
 * Two-copy marquee with a real pause control.
 *
 * The first copy stays in the accessibility tree; the duplicate is hidden.
 * The track only runs while the marquee is in view, and it pauses on hover,
 * keyboard focus, touch, or when the user presses the control.
 */
export function PausableMarquee({
  children,
  label,
  speedSeconds = 30,
  tone = "dark",
  gap = 32,
  className,
  groupClassName,
  controlClassName,
}: PausableMarqueeProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.01,
    rootMargin: "0px",
    once: false,
  });
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = React.useState(false);
  const [touching, setTouching] = React.useState(false);

  const isPaused = paused || touching;

  return (
    <div
      ref={ref}
      className={cn("marquee-viewport relative w-full overflow-hidden", className)}
      data-marquee-active={inView ? "true" : "false"}
      data-marquee-paused={isPaused ? "true" : "false"}
      data-marquee-reduced={reducedMotion ? "true" : "false"}
      role="region"
      aria-label={label}
      aria-live="off"
    >
      <div
        className="marquee-track flex w-max items-center"
        style={{ "--marquee-duration": `${speedSeconds}s` } as React.CSSProperties}
        onTouchStart={() => setTouching(true)}
        onTouchEnd={() => setTouching(false)}
        onTouchCancel={() => setTouching(false)}
      >
        <div
          className={cn("marquee-group flex items-center", groupClassName)}
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {children}
        </div>
        <div
          className={cn("marquee-group flex items-center", groupClassName)}
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>

      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label={paused ? `Resume ${label}` : `Pause ${label}`}
          className={cn(
            "marquee-control absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-150",
            tone === "light"
              ? "border-white/25 bg-navy-900/70 text-white hover:bg-navy-900"
              : "border-line bg-white/90 text-navy-900 hover:border-navy-900",
            controlClassName
          )}
        >
          {paused ? (
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Pause className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
