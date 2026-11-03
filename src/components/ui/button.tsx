import * as React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "clay" | "link";
  size?: "sm" | "default" | "lg" | "icon";
  loading?: boolean;
  withArrow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      loading = false,
      withArrow = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-forest-800 text-cream-50 hover:bg-forest-900 shadow-sm hover:shadow-md",
      secondary:
        "border border-forest-800 text-forest-800 bg-transparent hover:bg-forest-800 hover:text-cream-50",
      outline:
        "border border-cream-200 text-ink-900 bg-transparent hover:bg-cream-100 hover:border-forest-600",
      ghost:
        "text-ink-900 bg-transparent hover:bg-cream-100 hover:text-forest-800",
      clay:
        "bg-clay-400 text-white hover:bg-clay-500 shadow-sm hover:shadow-md",
      link:
        "text-forest-800 underline-offset-4 hover:underline p-0 h-auto font-normal",
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-xs rounded-pill gap-1.5",
      default: "h-11 px-6 text-sm rounded-pill gap-2",
      lg: "h-13 px-8 text-base rounded-pill gap-2.5",
      icon: "h-10 w-10 rounded-full p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin mr-1.5" aria-hidden="true" />}
        {children}
        {withArrow && !loading && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cream-50/20 text-current ml-1 group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
