"use client";

import * as React from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "ghost-white" | "link";
  size?: "default" | "sm";
  showArrow?: boolean;
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      showArrow,
      children,
      disabled,
      loading,
      ...props
    },
    ref
  ) => {
    const rippleRef = React.useRef<HTMLSpanElement>(null);
    const [rippleCoords, setRippleCoords] = React.useState<{ x: number; y: number } | null>(null);

    // Default showArrow to true on primary and link variants unless explicitly overridden
    const shouldShowArrow =
      showArrow !== undefined ? showArrow : variant === "primary" || variant === "link";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setRippleCoords({ x, y });

      // Clean up ripple after animation
      setTimeout(() => setRippleCoords(null), 400);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.width / 2;
        const y = rect.height / 2;
        setRippleCoords({ x, y });
        setTimeout(() => setRippleCoords(null), 400);
      }
    };

    // Section 4.3: Button | 15 to 16px | 600 | 1 | 0 (letter-spacing: 0)
    const baseStyles =
      "group relative overflow-hidden inline-flex items-center justify-center font-sans font-semibold tracking-[0] leading-none transition-[background-color,color,border-color,transform,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-ocean-600 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none motion-safe:active:scale-[0.97] motion-safe:transition-transform motion-safe:duration-75";

    const variantStyles = {
      primary:
        "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 rounded-btn shadow-sm hover:shadow-[0_4px_14px_-4px_rgba(249,115,22,0.4)]",
      secondary:
        "bg-navy-900 text-white hover:bg-navy-700 active:bg-navy-800 rounded-btn",
      ghost:
        "bg-transparent border border-navy-900 text-navy-900 hover:bg-navy-900/5 active:bg-navy-900/10 rounded-btn",
      "ghost-white":
        "bg-transparent border border-white text-white hover:bg-white/10 active:bg-white/20 rounded-btn",
      link: "bg-transparent text-ocean-600 hover:text-orange-500 p-0 h-auto font-semibold inline-flex items-center gap-1",
    };

    const sizeStyles = {
      default: variant === "link" ? "" : "h-[48px] px-6 text-[15px]",
      sm: variant === "link" ? "" : "h-[40px] px-4 text-[14px]",
    };

    const isPrimaryOrSecondary = variant === "primary" || variant === "secondary";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          variant !== "link" && "gap-2",
          loading && "cursor-wait",
          className
        )}
        {...props}
      >
        {/* Ripple effect */}
        {rippleCoords && isPrimaryOrSecondary && (
          <span
            ref={rippleRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              left: rippleCoords.x,
              top: rippleCoords.y,
            }}
            aria-hidden="true"
          >
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 animate-ripple"
              style={{
                width: "200%",
                height: "200%",
                maxWidth: "300px",
                maxHeight: "300px",
              }}
            />
          </span>
        )}

        {/* Loading spinner */}
        {loading ? (
          <span className="flex items-center justify-center gap-2" aria-live="polite">
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} aria-hidden="true" />
            <span className="font-sans font-semibold tracking-[0]">{children}</span>
          </span>
        ) : (
          <>
            <span className="relative z-10 transition-opacity duration-150">{children}</span>
            {shouldShowArrow && (
              <ArrowUpRight
                className={cn(
                  "relative z-10 shrink-0 motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5",
                  size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
                )}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
