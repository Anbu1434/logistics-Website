import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[];
  variant?: "navy" | "orange";
  speedSeconds?: number;
}

export function FourPointStar({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-3.5 h-3.5 shrink-0 select-none", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 0L14.3 9.7L24 12L14.3 14.3L12 24L9.7 14.3L0 12L9.7 9.7L12 0Z" />
    </svg>
  );
}

export function Marquee({
  items,
  variant = "navy",
  speedSeconds = 30,
  className,
  ...props
}: MarqueeProps) {
  const variantStyles = {
    navy: "bg-navy-900 text-white",
    orange: "bg-orange-500 text-white",
  };

  const starColors = {
    navy: "text-orange-500",
    orange: "text-white/80",
  };

  // Render a duplicated array of items for seamless continuous looping
  const renderList = (keyPrefix: string) => (
    <div className="flex items-center gap-8 shrink-0 py-3.5" key={keyPrefix}>
      {items.map((item, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <span className="font-sans font-semibold text-[14px] tracking-[0.08em] uppercase whitespace-nowrap">
            {item}
          </span>
          <FourPointStar className={starColors[variant]} />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "marquee-container w-full overflow-hidden select-none border-y border-white/10",
        variantStyles[variant],
        className
      )}
      aria-label="Service capabilities ticker"
      {...props}
    >
      <div
        className="animate-marquee flex items-center"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {renderList("first")}
        {renderList("second")}
        {renderList("third")}
        {renderList("fourth")}
      </div>
    </div>
  );
}

