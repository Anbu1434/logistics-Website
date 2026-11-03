"use client";

import * as React from "react";
import { Sparkles, Truck, X } from "lucide-react";
import brandConfig from "@/config/brand";
import { formatCurrency } from "@/lib/utils";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Promotional Announcement"
      className="bg-forest-800 text-cream-50 text-xs py-2 px-4 relative z-40 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-1.5 text-sage-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-serif italic tracking-wide">Clean Botanical Formulations</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 text-center font-medium tracking-wide">
          <Truck className="w-3.5 h-3.5 text-sage-300 inline shrink-0" />
          <span>
            Complimentary Shipping on all orders over{" "}
            <span className="font-semibold text-white underline decoration-sage-300 decoration-2">
              {formatCurrency(brandConfig.currency.freeShippingThreshold)}
            </span>
          </span>
          <span className="hidden md:inline text-sage-300 font-normal">| Code: BOTANICAL15 for 15% off first order</span>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement banner"
            className="text-cream-50/70 hover:text-white p-1 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-cream-50"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

