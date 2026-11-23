import * as React from "react";
import { PausableMarquee } from "@/components/motion/pausable-marquee";
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
}: MarqueeProps) {
  const variantStyles = {
    navy: "bg-navy-900 text-white",
    orange: "bg-orange-500 text-white",
  };

  const starColors = {
    navy: "text-orange-500",
    orange: "text-white/80",
  };

  return (
    <PausableMarquee
      label="Service capabilities ticker"
      speedSeconds={speedSeconds}
      tone="light"
      gap={32}
      groupClassName="py-3.5"
      className={cn(
        "select-none border-y border-white/10",
        variantStyles[variant],
        className
      )}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="whitespace-nowrap font-sans text-[14px] font-semibold uppercase tracking-[0.08em]">
            {item}
          </span>
          <FourPointStar className={starColors[variant]} />
        </React.Fragment>
      ))}
    </PausableMarquee>
  );
}
