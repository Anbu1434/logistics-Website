"use client";

import * as React from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  threshold?: number;
}

/**
 * Accessible animated metric. The final value is server-rendered and exposed
 * to assistive technology; the animated number is decorative.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = MOTION.counter,
  className,
  threshold = 0.4,
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = React.useState(value);
  const hasRun = React.useRef(false);

  React.useEffect(() => {
    if (!inView || hasRun.current) return;

    hasRun.current = true;

    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    setDisplay(0);
    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [duration, inView, reducedMotion, value]);

  const finalText = `${prefix}${value.toLocaleString("en-US")}${suffix}`;

  return (
    <span
      className="relative inline-block tabular-nums"
      style={{ minWidth: `${finalText.length}ch` }}
    >
      <span ref={ref} aria-hidden="true" className={cn("tabular-nums", className)}>
        {prefix}
        {display.toLocaleString("en-US")}
        {suffix}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
