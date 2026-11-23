"use client";

import * as React from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Returns 0 → 1 progress for an element as it travels through the viewport.
 * Useful for scroll-linked route lines without scroll-jacking.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = React.useRef<T | null>(null);
  const [progress, setProgress] = React.useState(0);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const start = window.innerHeight * 0.78;
      const end = window.innerHeight * 0.22;
      const distance = rect.height + start - end;
      const raw = distance > 0 ? (start - rect.top) / distance : 0;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return { ref, progress };
}
