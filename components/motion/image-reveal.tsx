"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealDirection = "bottom" | "left" | "right" | "top";

const CLIP: Record<RevealDirection, string> = {
  bottom: "inset(100% 0 0 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  top: "inset(0 0 100% 0)",
};

export interface ImageRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  threshold?: number;
}

/**
 * Directional photo reveal. Applies a clip-path wipe to the container and a
 * small scale settle to its first child.
 */
export function ImageReveal({
  direction = "bottom",
  duration = 800,
  delay = 0,
  threshold = 0.15,
  className,
  style,
  children,
  ...props
}: ImageRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
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
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-image-ready={ready ? "true" : undefined}
      data-visible={visible ? "true" : "false"}
      className={cn("image-reveal", className)}
      style={
        {
          "--clip-hidden": CLIP[direction],
          "--image-duration": `${duration}ms`,
          "--image-delay": `${delay}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
