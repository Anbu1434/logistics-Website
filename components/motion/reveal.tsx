"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "figure"
  | "span"
  | "li"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: RevealTag;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * Reveal-on-scroll wrapper.
 *
 * SSR renders content fully visible. On mount, only elements below the initial
 * viewport are hidden before paint, then revealed once by IntersectionObserver.
 */
export function Reveal({
  as = "div",
  delay = 0,
  y = 16,
  x = 0,
  duration = 400,
  threshold = 0.15,
  once = true,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [ready, setReady] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      setVisible(true);
      return;
    }

    const rect = node.getBoundingClientRect();
    const inInitialViewport =
      rect.top < window.innerHeight * 0.95 && rect.bottom > 0;

    setReady(true);

    if (inInitialViewport) {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      data-reveal-ready={ready ? "true" : undefined}
      className={cn(visible && "is-visible", className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
          "--reveal-x": `${x}px`,
          "--reveal-duration": `${duration}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Tag>
  );
}
