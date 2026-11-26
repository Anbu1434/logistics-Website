"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { useQuoteModal } from "@/context/quote-modal-context";

export function FinalCTA() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[18px] sm:rounded-[22px] bg-navy-900 text-white border border-navy-700 shadow-lift">
          {/* Background image: Global Logistics at Twilight */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/Global Logistics at Twilight.png"
              alt="Global logistics operations at twilight"
              fill
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="object-cover object-center lg:object-right"
              priority={false}
            />
            {/* Dark navy gradient overlay to ensure strong WCAG text contrast while showcasing twilight imagery */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/85 to-navy-900/65 lg:bg-gradient-to-r lg:from-navy-900 lg:via-navy-900/85 lg:to-navy-900/25"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]">
            {/* Copy and actions */}
            <div className="lg:col-span-7 xl:col-span-6 p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center">
              <Reveal y={16}>
                <span className="font-sans font-bold text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-orange-500">
                  Move with certainty
                </span>
              </Reveal>

              <Reveal
                as="h2"
                delay={70}
                y={16}
                className="mt-3 font-display font-bold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.14] tracking-[-0.02em] text-white max-w-[520px] [text-wrap:balance]"
              >
                Ready to move your business{" "}
                <span className="text-orange-500">forward?</span>
              </Reveal>

              <Reveal
                as="p"
                delay={130}
                y={12}
                className="mt-3 max-w-[460px] font-sans text-[15px] sm:text-[16px] leading-[1.65] text-slate-300"
              >
                Tell us what you are shipping and where it needs to be. A route
                specialist will come back with pricing and a realistic transit
                plan.
              </Reveal>

              <Reveal
                delay={200}
                y={12}
                className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <Button
                  variant="primary"
                  onClick={openQuoteModal}
                  className="h-[48px] rounded-btn text-[15px] font-semibold shadow-sm"
                >
                  Get a Free Quote
                </Button>
                <Link href="/contact" className="sm:w-auto">
                  <Button
                    variant="ghost-white"
                    showArrow={false}
                    className="w-full sm:w-auto h-[48px] rounded-btn text-[15px] font-semibold border-2 border-white hover:bg-white/10"
                  >
                    Talk to an Expert
                  </Button>
                </Link>
              </Reveal>

              <Reveal delay={260} y={8} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                {[
                  "No obligation",
                  "Reply within 1 business day",
                  "Global coverage",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 font-sans text-[12.5px] text-slate-300"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-orange-500"
                      aria-hidden="true"
                    />
                    {item}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
