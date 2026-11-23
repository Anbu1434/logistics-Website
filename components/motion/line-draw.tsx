"use client";

import * as React from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface LineDrawProps extends React.HTMLAttributes<HTMLSpanElement> {
  orientation?: "horizontal" | "vertical";
  delay?: number;
  duration?: number;
}

/**
 * A simple one-shot line draw built on `scaleX`/`scaleY`.
 * Use SVG stroke-dasharray for curved routes.
 */
export function LineDraw({
  orientation = "horizontal",
  delay = 0,
  duration = 700,
  className,
  style,
  ...props
}: LineDrawProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const reducedMotion = useReducedMotion();
  const active = reducedMotion || inView;
  const isHorizontal = orientation === "horizontal";

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "block",
        isHorizontal ? "origin-left" : "origin-top",
        className
      )}
      style={{
        transform: active
          ? isHorizontal
            ? "scaleX(1)"
            : "scaleY(1)"
          : isHorizontal
          ? "scaleX(0)"
          : "scaleY(0)",
        transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...props}
    />
  );
}
