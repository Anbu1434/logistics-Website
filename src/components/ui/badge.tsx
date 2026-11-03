import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "sage" | "forest" | "cream" | "clay" | "gold" | "outline" | "danger" | "success";
  size?: "sm" | "default";
}

export function Badge({
  className,
  variant = "sage",
  size = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    sage: "bg-sage-100 text-forest-800 border-sage-300/60",
    forest: "bg-forest-800 text-cream-50 border-forest-800",
    cream: "bg-cream-100 text-ink-900 border-cream-200",
    clay: "bg-clay-400 text-white border-clay-400",
    gold: "bg-[#F7EFE1] text-[#8C6428] border-[#E8D1A7]",
    outline: "bg-transparent text-ink-500 border-cream-200",
    danger: "bg-[#FDF2F2] text-brand-danger border-[#F8D7DA]",
    success: "bg-[#F0FDF4] text-brand-success border-[#BBF7D0]",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
    default: "px-3.5 py-1 text-xs font-medium tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-pill border uppercase tracking-wider transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
