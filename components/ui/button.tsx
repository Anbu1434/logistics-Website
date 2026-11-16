import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "ghost-white" | "link";
  size?: "default" | "sm";
  showArrow?: boolean;
  asChild?: boolean;
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
      ...props
    },
    ref
  ) => {
    // Default showArrow to true on primary and link variants unless explicitly overridden
    const shouldShowArrow =
      showArrow !== undefined ? showArrow : variant === "primary" || variant === "link";

    // Section 4.3: Button | 15 to 16px | 600 | 1 | 0 (letter-spacing: 0)
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold tracking-[0] leading-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ocean-600 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variantStyles = {
      primary:
        "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-600 rounded-btn shadow-sm",
      secondary:
        "bg-navy-900 text-white hover:bg-navy-700 active:bg-navy-700 rounded-btn",
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

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          variant !== "link" && "gap-2",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {shouldShowArrow && (
          <ArrowUpRight
            className={cn(
              "shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
            )}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
