"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VariantOption {
  id: string;
  label: string; // e.g. "30ml", "50ml", "Rose Nude"
  sublabel?: string; // e.g. "₹899", "Travel size"
  colorHex?: string; // For makeup / shade swatches
  isAvailable?: boolean;
}

export interface VariantSelectorProps {
  label: string;
  options: VariantOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function VariantSelector({
  label,
  options,
  selectedId,
  onSelect,
  className,
}: VariantSelectorProps) {
  const isColorSwatch = options.some((opt) => opt.colorHex);

  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="flex items-center justify-between text-xs tracking-wider uppercase font-medium">
        <span className="text-ink-500">{label}:</span>
        <span className="text-forest-800 font-semibold">
          {options.find((o) => o.id === selectedId)?.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          const isAvailable = option.isAvailable !== false;

          if (isColorSwatch && option.colorHex) {
            return (
              <button
                key={option.id}
                type="button"
                disabled={!isAvailable}
                onClick={() => onSelect(option.id)}
                title={`${option.label}${!isAvailable ? " (Out of Stock)" : ""}`}
                aria-label={`Select shade ${option.label}`}
                className={cn(
                  "relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border-2",
                  isSelected
                    ? "border-forest-800 scale-105 shadow-sm"
                    : "border-transparent hover:scale-105",
                  !isAvailable && "opacity-40 cursor-not-allowed"
                )}
              >
                <span
                  className="w-7 h-7 rounded-full shadow-inner border border-black/10"
                  style={{ backgroundColor: option.colorHex }}
                />
                {isSelected && (
                  <Check className="absolute w-3.5 h-3.5 text-white drop-shadow-md stroke-[3]" />
                )}
              </button>
            );
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => onSelect(option.id)}
              className={cn(
                "px-4 py-2 rounded-pill text-xs font-medium tracking-wide transition-all duration-200 border",
                isSelected
                  ? "bg-forest-800 text-cream-50 border-forest-800 shadow-sm"
                  : "bg-cream-50 text-ink-900 border-cream-200 hover:border-forest-600/60 hover:bg-cream-100",
                !isAvailable && "opacity-40 cursor-not-allowed line-through"
              )}
            >
              <span>{option.label}</span>
              {option.sublabel && (
                <span
                  className={cn(
                    "ml-1.5 text-[11px] font-normal",
                    isSelected ? "text-cream-200" : "text-ink-500"
                  )}
                >
                  {option.sublabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
