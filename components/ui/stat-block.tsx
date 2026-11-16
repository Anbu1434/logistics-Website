import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  sublabel?: string;
  dark?: boolean;
  hasDivider?: boolean;
}

export function StatBlock({
  value,
  label,
  sublabel,
  dark = false,
  hasDivider = false,
  className,
  ...props
}: StatBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 px-4 md:px-8 py-2",
        hasDivider && "md:border-r md:border-line last:border-r-0",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "font-display font-bold text-[40px] md:text-[56px] leading-[1.05] tracking-tight",
          dark ? "text-white" : "text-ink"
        )}
      >
        {value}
      </div>

      <div
        className={cn(
          "font-sans text-[14px] md:text-[15px] font-medium leading-[1.4]",
          dark ? "text-slate-300" : "text-slate-600"
        )}
      >
        {label}
      </div>

      {sublabel && (
        <div
          className={cn(
            "font-mono text-[12px] leading-tight",
            dark ? "text-slate-400" : "text-slate-600/70"
          )}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
}

