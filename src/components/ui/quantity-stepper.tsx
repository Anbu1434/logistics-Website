"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "sm" | "default" | "lg";
  className?: string;
  disabled?: boolean;
}

export function QuantityStepper({
  value,
  min = 1,
  max = 10,
  onChange,
  size = "default",
  className,
  disabled = false,
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const sizeStyles = {
    sm: "h-8 text-xs",
    default: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  const buttonSizeStyles = {
    sm: "w-7 h-8",
    default: "w-9 h-10",
    lg: "w-11 h-12",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-pill border border-cream-200 bg-cream-50 overflow-hidden shadow-subtle",
        sizeStyles[size],
        className
      )}
      role="group"
      aria-label="Quantity Stepper"
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min || disabled}
        aria-label="Decrease quantity"
        className={cn(
          "flex items-center justify-center text-ink-900 transition-colors hover:bg-cream-100 disabled:opacity-30 disabled:pointer-events-none active:scale-95",
          buttonSizeStyles[size]
        )}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span
        aria-live="polite"
        className="px-3 text-center font-medium font-sans text-ink-900 min-w-[2rem]"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max || disabled}
        aria-label="Increase quantity"
        className={cn(
          "flex items-center justify-center text-ink-900 transition-colors hover:bg-cream-100 disabled:opacity-30 disabled:pointer-events-none active:scale-95",
          buttonSizeStyles[size]
        )}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
