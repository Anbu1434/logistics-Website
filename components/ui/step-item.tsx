"use client";

import * as React from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface StepItemProps extends React.HTMLAttributes<HTMLDivElement> {
  stepNumber: number | string;
  title: string;
  description: string;
  isLast?: boolean;
  orientation?: "horizontal" | "vertical";
}

export function StepItem({
  stepNumber,
  title,
  description,
  isLast = false,
  orientation = "horizontal",
  className,
  ...props
}: StepItemProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reducedMotion = useReducedMotion();
  const active = reducedMotion || inView;

  const formattedStep =
    typeof stepNumber === "number" && stepNumber < 10
      ? `0${stepNumber}`
      : `${stepNumber}`;

  const nodeStyle: React.CSSProperties = {
    transform: active ? "scale(1)" : "scale(0.85)",
    opacity: active ? 1 : 0,
    transition: `transform 200ms cubic-bezier(0.22,1,0.36,1), opacity 200ms linear`,
  };

  const contentStyle: React.CSSProperties = {
    transform: active ? "translateY(0)" : "translateY(8px)",
    opacity: active ? 1 : 0,
    transition: `transform 300ms cubic-bezier(0.22,1,0.36,1) 60ms, opacity 300ms linear 60ms`,
  };

  if (orientation === "vertical") {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-start gap-4",
          isLast ? "pb-0" : "pb-5 sm:pb-6",
          className
        )}
        {...props}
      >
        {!isLast && (
          <div
            className="absolute left-5 top-10 bottom-0 w-[1px] origin-top border-l border-dashed border-slate-300"
            aria-hidden="true"
            style={{
              transform: active ? "scaleY(1)" : "scaleY(0)",
              transition: "transform 700ms cubic-bezier(0.22,1,0.36,1) 80ms",
            }}
          />
        )}

        <div
          className="relative z-10 w-10 h-10 rounded-full bg-navy-900 text-white font-mono text-[14px] font-semibold flex items-center justify-center shrink-0 shadow-soft"
          style={nodeStyle}
        >
          {formattedStep}
        </div>

        <div className="flex flex-col gap-1 pt-1" style={contentStyle}>
          <h4 className="font-display font-semibold text-[17px] sm:text-[18px] text-ink leading-snug">
            {title}
          </h4>
          <p className="font-sans text-[13.5px] sm:text-[14px] text-slate-600 leading-[1.6]">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex-1 flex flex-col items-start gap-3 p-4",
        className
      )}
      {...props}
    >
      <div className="w-full flex items-center">
        {/* Numbered circle */}
        <div
          className="relative z-10 w-11 h-11 rounded-full bg-navy-900 text-white font-mono text-[15px] font-semibold flex items-center justify-center shrink-0 shadow-soft"
          style={nodeStyle}
        >
          {formattedStep}
        </div>

        {/* 1px dashed line rule connecting to next step */}
        {!isLast && (
          <div className="flex-1 pl-3 pr-1 hidden md:block" aria-hidden="true">
            <div
              className="h-0 origin-left border-t border-dashed border-line"
              style={{
                transform: active ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 700ms cubic-bezier(0.22,1,0.36,1) 80ms",
              }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 pt-1" style={contentStyle}>
        <h4 className="font-display font-semibold text-[18px] text-ink leading-snug">
          {title}
        </h4>
        <p className="font-sans text-[14px] text-slate-600 leading-[1.6] max-w-[280px]">
          {description}
        </p>
      </div>
    </div>
  );
}
