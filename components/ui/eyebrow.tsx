import * as React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-orange-500 font-sans font-semibold text-[12px] md:text-[13px] tracking-[0.12em] uppercase leading-tight select-none",
        className
      )}
      {...props}
    >
      <span
        className="w-6 h-[2px] bg-orange-500 rounded-full shrink-0"
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}

