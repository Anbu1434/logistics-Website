import * as React from "react";
import { cn } from "@/lib/utils";

// Clean vector logos of realistic commercial shippers and manufacturers
const partnerLogos = [
  {
    name: "Vanguard Maritime",
    symbol: (
      <svg viewBox="0 0 120 28" className="h-6 w-auto fill-current">
        <path d="M12 2L4 24h6l2-6h8l2 6h6L20 2h-8zm3 6l2.5 7h-5L12 8z" />
        <text x="36" y="20" fontSize="13" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
          VANGUARD
        </text>
      </svg>
    ),
  },
  {
    name: "TransGlobal Freight",
    symbol: (
      <svg viewBox="0 0 130 28" className="h-6 w-auto fill-current">
        <circle cx="12" cy="14" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M5 14h14M12 5c3 4 3 14 0 18" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="32" y="20" fontSize="13" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
          TRANSGLOBAL
        </text>
      </svg>
    ),
  },
  {
    name: "Atlas Industrial",
    symbol: (
      <svg viewBox="0 0 100 28" className="h-6 w-auto fill-current">
        <polygon points="12,3 22,23 2,23" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="12" cy="16" r="3" fill="currentColor" />
        <text x="30" y="20" fontSize="14" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
          ATLAS
        </text>
      </svg>
    ),
  },
  {
    name: "Orion Express",
    symbol: (
      <svg viewBox="0 0 110 28" className="h-6 w-auto fill-current">
        <path d="M4 14L12 4L20 14L12 24Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <text x="30" y="20" fontSize="14" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
          ORION
        </text>
      </svg>
    ),
  },
  {
    name: "Nordex Heavy Haul",
    symbol: (
      <svg viewBox="0 0 115 28" className="h-6 w-auto fill-current">
        <path d="M6 5v16l14-8L6 5z" fill="currentColor" />
        <text x="28" y="20" fontSize="13" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
          NORDEX
        </text>
      </svg>
    ),
  },
  {
    name: "Pacific Intermodal",
    symbol: (
      <svg viewBox="0 0 115 28" className="h-6 w-auto fill-current">
        <rect x="5" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <line x1="5" y1="13" x2="21" y2="13" stroke="currentColor" strokeWidth="2" />
        <text x="28" y="20" fontSize="13" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
          PACIFIC
        </text>
      </svg>
    ),
  },
];

export function TrustBar() {
  return (
    <section
      className="w-full bg-white border-b border-line py-10 select-none overflow-hidden"
      aria-label="Client Trust Proof"
    >
      <div className="max-w-container mx-auto px-6 flex flex-col items-center gap-6">
        {/* Eyebrow-Style Trust Line */}
        <p className="font-sans font-semibold text-[12px] md:text-[13px] tracking-[0.12em] uppercase text-slate-600 text-center">
          Trusted by growing businesses worldwide
        </p>

        {/* Desktop: 6 Logos in a Row, Greyscale at 60% opacity */}
        <div className="hidden md:flex items-center justify-between gap-8 w-full max-w-4xl opacity-60">
          {partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="text-navy-900 transition-opacity duration-200 hover:opacity-100 flex items-center justify-center"
              title={logo.name}
            >
              {logo.symbol}
            </div>
          ))}
        </div>

        {/* Mobile: Smooth Slow Marquee (No Horizontal Overflow) */}
        <div className="md:hidden w-full overflow-hidden marquee-container">
          <div
            className="animate-marquee flex items-center gap-8 opacity-60"
            style={{ animationDuration: "25s" }}
          >
            {partnerLogos.map((logo, idx) => (
              <div key={`m1-${idx}`} className="shrink-0 text-navy-900">
                {logo.symbol}
              </div>
            ))}
            {partnerLogos.map((logo, idx) => (
              <div key={`m2-${idx}`} className="shrink-0 text-navy-900">
                {logo.symbol}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

