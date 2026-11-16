import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "in-transit" | "delivered" | "delayed" | "outline";
  showDot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  showDot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    // Default: pill, 12px 600 weight, navy-900 on sky-50
    default: "bg-sky-50 text-navy-900 border border-line",
    // In transit: ocean-600 tint
    "in-transit": "bg-ocean-600/10 text-ocean-600 border border-ocean-600/20",
    // Delivered: success tint
    delivered: "bg-success/10 text-success border border-success/20",
    // Delayed: orange tint
    delayed: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
    // Outline
    outline: "bg-transparent text-navy-900 border border-line",
  };

  const dotColors = {
    default: "bg-navy-900",
    "in-transit": "bg-ocean-600 animate-pulse",
    delivered: "bg-success",
    delayed: "bg-orange-500",
    outline: "bg-slate-600",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold leading-tight select-none tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {showDot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}

