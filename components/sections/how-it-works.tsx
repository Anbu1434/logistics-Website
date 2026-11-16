import * as React from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StepItem } from "@/components/ui/step-item";

export function HowItWorks() {
  const steps = [
    {
      stepNumber: 1,
      title: "Request a Quote",
      description:
        "Submit cargo dimensions, route, and handling requirements to receive guaranteed pricing within minutes.",
    },
    {
      stepNumber: 2,
      title: "Plan & Pickup",
      description:
        "Our local dispatch team secures carrier capacity and schedules prompt pickup directly at your facility.",
    },
    {
      stepNumber: 3,
      title: "Transit & Tracking",
      description:
        "Track maritime, air, or highway milestones in real time with automated telematics and geofence alerts.",
    },
    {
      stepNumber: 4,
      title: "Delivery & Confirmation",
      description:
        "Prompt final-mile drop-off with instant digital proof-of-delivery (e-POD) and customs clearance sign-off.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden border-b border-line select-none">
      <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-[620px] mb-8 sm:mb-10 lg:mb-12">
          <Eyebrow>Process</Eyebrow>
          <h2 className="font-display font-bold text-[clamp(26px,3.2vw,38px)] leading-[1.18] tracking-[-0.015em] text-ink mt-2.5 [text-wrap:balance]">
            From request to delivery{" "}
            <span className="text-orange-500">in four steps.</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-slate-600 mt-2.5">
            A transparent and repeatable operational workflow designed for maximum
            transit predictability and zero friction.
          </p>
        </div>

        {/* Two-Column Grid: Steps on Left, Wide Dock/Terminal Photo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Steps List (Properly spaced without awkward bottom gaps) */}
          <div className="lg:col-span-6 flex flex-col">
            {steps.map((step, idx) => (
              <StepItem
                key={step.title}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                orientation="vertical"
                isLast={idx === steps.length - 1}
              />
            ))}
          </div>

          {/* Right Column: Loading Dock / Forklift Photo */}
          <div className="lg:col-span-6 relative w-full">
            <div className="relative aspect-[4/3] rounded-[18px] sm:rounded-[22px] overflow-hidden border border-line shadow-soft group">
              <Image
                src="/images/process-dock.webp"
                alt="Freight handler operating modern forklift moving palletized cargo at loading bay"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-lg border border-line shadow-soft text-slate-700 text-[13px] font-medium flex items-center gap-2 select-none pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Verified Port & Dock Operations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

