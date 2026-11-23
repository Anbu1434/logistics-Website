import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { PausableMarquee } from "@/components/motion/pausable-marquee";

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
      <svg viewBox="0 0 120 28" className="h-6 w-auto fill-current">
        <path d="M4 24L12 4l8 20h-5l-1.5-4h-3L9 24H4zm9-8h-2l1-3 1 3z" />
        <text x="30" y="20" fontSize="13" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
          ATLAS
        </text>
      </svg>
    ),
  },
  {
    name: "Meridian Group",
    symbol: (
      <svg viewBox="0 0 130 28" className="h-6 w-auto fill-current">
        <rect x="3" y="6" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M8 18V10l3 4 3-4v8" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="30" y="20" fontSize="13" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
          MERIDIAN
        </text>
      </svg>
    ),
  },
  {
    name: "Nordic Supply Co",
    symbol: (
      <svg viewBox="0 0 130 28" className="h-6 w-auto fill-current">
        <path d="M4 24V4h4l7 12V4h4v20h-4L8 12v12H4z" />
        <text x="30" y="20" fontSize="13" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
          NORDIC
        </text>
      </svg>
    ),
  },
  {
    name: "Pacific Trade Lines",
    symbol: (
      <svg viewBox="0 0 130 28" className="h-6 w-auto fill-current">
        <path d="M4 8h16v4H4V8zm3 6h10v6a3 3 0 01-3 3H10a3 3 0 01-3-3v-6z" />
        <text x="30" y="20" fontSize="13" fontWeight="700" letterSpacing="0.08em" fontFamily="system-ui">
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
        <Reveal as="p" y={12} duration={300} className="font-sans font-semibold text-[12px] md:text-[13px] tracking-[0.12em] uppercase text-slate-600 text-center">
          Trusted by growing businesses worldwide
        </Reveal>

        {/* Desktop: 6 Logos in a Row, Greyscale at 60% opacity */}
        <div className="hidden md:flex items-center justify-between gap-8 w-full max-w-4xl">
          {partnerLogos.map((logo, index) => (
            <div
              key={logo.name}
              className="text-navy-900 flex items-center justify-center opacity-60 transition-opacity duration-200 hover:opacity-100"
            >
              <Reveal delay={index * 50} y={8}>
                <div title={logo.name}>{logo.symbol}</div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Mobile: Slow pausable marquee */}
        <div className="md:hidden w-full">
          <PausableMarquee
            label="Client logos"
            speedSeconds={25}
            tone="dark"
            gap={32}
            className="opacity-60"
          >
            {partnerLogos.map((logo, idx) => (
              <div key={idx} className="shrink-0 text-navy-900">
                {logo.symbol}
              </div>
            ))}
          </PausableMarquee>
        </div>
      </div>
    </section>
  );
}
