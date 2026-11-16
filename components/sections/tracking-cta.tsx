"use client";

import * as React from "react";
import Image from "next/image";
import { PackageSearch, ArrowRight, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { useTrackingModal } from "@/context/tracking-modal-context";

export function TrackingCTA() {
  const { openTrackingModal } = useTrackingModal();
  const [trackingId, setTrackingId] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    openTrackingModal(trackingId.trim().toUpperCase());
  };

  const handleQuickFill = (id: string) => {
    setTrackingId(id);
    openTrackingModal(id);
  };

  return (
    <section className="relative bg-navy-900 py-16 sm:py-20 lg:py-28 text-white overflow-hidden border-b border-navy-700 select-none">
      {/* Background Images: Mobile Portrait vs Desktop/Tablet Landscape */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Mobile View Background (Portrait 1024x1536) */}
        <div className="relative w-full h-full sm:hidden">
          <Image
            src="/images/Dusk Harbor Cranes and Container Ship.png"
            alt="Dusk harbor cranes and container ship in port"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* Desktop & Tablet Background (Landscape 2172x724) */}
        <div className="relative w-full h-full hidden sm:block">
          <Image
            src="/images/Twilight Harbor Lights and Cargo Ship.png"
            alt="Twilight harbor lights and cargo ship loading freight"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* Light cinematic vignette overlay allowing the harbor lights & ship to be clearly visible */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-900/20 to-navy-900/60"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-[760px] mx-auto text-center flex flex-col items-center gap-4">
          <Eyebrow className="justify-center">Tracking Portal</Eyebrow>

          <h2 className="font-display font-bold text-[clamp(30px,4vw,48px)] leading-[1.15] tracking-[-0.015em] text-white [text-wrap:balance] drop-shadow-lg">
            Track your <span className="text-orange-500">shipment.</span>
          </h2>

          <p className="font-sans text-[16px] lg:text-[18px] text-white/95 max-w-[560px] drop-shadow">
            Enter your booking reference or container tracking ID to get live
            satellite coordinates, milestone logs, and estimated port arrival.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[580px] mt-4 flex flex-col sm:flex-row items-stretch gap-2.5 bg-navy-900/75 p-2 rounded-xl border border-white/25 backdrop-blur-md shadow-2xl"
          >
            <div className="relative flex-1 flex items-center">
              <PackageSearch
                className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="LG-2026-004981"
                className="w-full h-[48px] pl-11 pr-4 bg-white text-ink placeholder:text-slate-400 font-mono text-[15px] rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all uppercase"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="h-[48px] px-7 font-semibold text-[15px] shrink-0 shadow-md"
            >
              Track
            </Button>
          </form>

          {/* Quick-fill Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[13px] text-white/90 drop-shadow">
            <span>Try sample tracking ID:</span>
            <button
              type="button"
              onClick={() => handleQuickFill("LG-2026-004981")}
              className="font-mono text-white bg-navy-900/75 hover:bg-navy-900/90 px-2.5 py-0.5 rounded border border-white/25 backdrop-blur-sm transition-colors cursor-pointer shadow-sm"
            >
              LG-2026-004981
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("LG-2026-008412")}
              className="font-mono text-white bg-navy-900/75 hover:bg-navy-900/90 px-2.5 py-0.5 rounded border border-white/25 backdrop-blur-sm transition-colors cursor-pointer shadow-sm"
            >
              LG-2026-008412
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

