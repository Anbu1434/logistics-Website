"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { useQuoteModal } from "@/context/quote-modal-context";
import { useTrackingModal } from "@/context/tracking-modal-context";
import { QuoteForm } from "./quote-form";

export function Hero() {
  const { openQuoteModal } = useQuoteModal();
  const { openTrackingModal } = useTrackingModal();

  return (
    // Hero: min-h-[100svh] mobile hero with ship visible on top and content on dark lower panel
    <section className="relative w-full min-h-[100svh] pt-[100px] min-[390px]:pt-[110px] sm:pt-[120px] lg:pt-[120px] pb-10 min-[390px]:pb-12 lg:pb-[64px] flex items-center overflow-hidden bg-navy-900 select-none">
      {/* 1. Full-Bleed Container-Ship Photo/Video: object-[center_top] on mobile */}
      <div className="absolute inset-0 z-0 bg-navy-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-ship.jpg"
          aria-label="Commercial container vessel navigating an international freight corridor"
          className="absolute inset-0 h-full w-full object-cover object-[center_top] md:object-[85%_center]"
        >
          <source src="/videos/hero-ship.mp4" type="video/mp4" />
        </video>

        {/* Desktop Overlay (md+): linear-gradient(90deg, ...) + bottom fade */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(0deg, rgba(11,31,58,0.5) 0%, transparent 35%), linear-gradient(90deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.75) 40%, rgba(11,31,58,0.2) 75%, rgba(11,31,58,0.1) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Mobile Overlay (< md): ship visible on top, dark navy panel over headline/buttons */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,31,58,0.30) 0%, rgba(11,31,58,0.50) 25%, rgba(11,31,58,0.92) 55%, rgba(11,31,58,0.96) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
          {/* Left Column: Headlines & CTA Buttons - max-w-[560px] */}
          <div className="lg:col-span-7 flex flex-col gap-3 min-[390px]:gap-3.5 text-left w-full max-w-[560px] -mt-3 min-[390px]:-mt-4 lg:mt-0">
            {/* Section 5: Eyebrow Label */}
            <div className="flex items-center select-none">
              <span className="font-sans font-bold text-[12px] min-[390px]:text-[13px] tracking-[0.14em] uppercase text-orange-500">
                REAL-TIME TRACKING
              </span>
            </div>

            {/* Section 6: Main Headline - Two Lines with non-wrapping final period */}
            <h1 className="font-display font-bold text-[28px] min-[360px]:text-[32px] min-[390px]:text-[36px] min-[430px]:text-[40px] lg:text-[clamp(36px,5vw,64px)] leading-[1.06] lg:leading-[1.05] tracking-[-0.025em] text-white">
              <span>Where Logistics</span>{" "}
              <span className="text-orange-500 whitespace-nowrap">Meets Precision.</span>
            </h1>

            {/* Section 7: Description Paragraph */}
            <p className="font-sans text-[14px] min-[390px]:text-[15px] lg:text-[18px] leading-[1.5] lg:leading-[1.65] text-slate-100 max-w-[340px] min-[390px]:max-w-[420px] lg:max-w-[540px]">
              Fast, secure, end-to-end freight across cities, countries, and continents.
            </p>

            {/* Section 8 & 9: Primary & Secondary CTA Buttons (48px high on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1.5 w-full sm:w-auto">
              <Button
                variant="primary"
                onClick={openQuoteModal}
                className="w-full sm:w-auto h-[48px] rounded-btn text-[15px] font-semibold shadow-sm"
              >
                Get a Quote
              </Button>
              <Button
                variant="ghost-white"
                onClick={() => openTrackingModal()}
                showArrow={false}
                className="w-full sm:w-auto h-[48px] rounded-btn text-[15px] font-semibold border-2 border-white hover:bg-white/10"
              >
                Track Shipment
              </Button>
            </div>

            {/* Section 10: Social Proof with 3 overlapping customer avatars */}
            <div className="pt-3.5 min-[390px]:pt-4 flex items-center">
              <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-soft bg-navy-900">
                  <Image
                    src="/images/avatar-1.jpg"
                    alt="Customer testimonial avatar 1"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-soft bg-navy-900">
                  <Image
                    src="/images/avatar-2.jpg"
                    alt="Customer testimonial avatar 2"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-soft bg-navy-900">
                  <Image
                    src="/images/avatar-3.jpg"
                    alt="Customer testimonial avatar 3"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Mobile: Vertical divider + 2-line text */}
              <div className="flex items-center lg:hidden">
                <div className="h-6 w-[1px] bg-white/40 mx-3 shrink-0" aria-hidden="true" />
                <div className="flex flex-col text-left leading-tight text-white">
                  <span className="font-sans text-[14px] tracking-tight">
                    <strong className="font-bold text-white">15k</strong> businesses
                  </span>
                  <span className="font-sans text-[14px] text-slate-200">
                    shipped with us
                  </span>
                </div>
              </div>

              {/* Desktop single line */}
              <span className="hidden lg:inline ml-3.5 font-sans text-[14px] font-medium text-slate-200">
                {siteConfig.trustProof}
              </span>
            </div>
          </div>

          {/* Desktop Right Column: Quote Card (ONLY visible on desktop lg+) */}
          <div className="hidden lg:flex lg:col-span-5 w-full justify-end lg:translate-x-4 xl:translate-x-6">
            <div className="w-full max-w-[460px] xl:max-w-[480px]">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}