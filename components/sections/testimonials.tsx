import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PausableMarquee } from "@/components/motion/pausable-marquee";
import { cn } from "@/lib/utils";

interface ReviewItem {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export function Testimonials() {
  const reviews: ReviewItem[] = [
    {
      name: "Marcus Vance",
      role: "VP of Global Supply Chain",
      company: "Apex Global Industrial",
      avatar: "/images/avatar-1.jpg",
      quote:
        "Your Brand cut our transatlantic transit variance from five days to less than twelve hours. The live telemetry and rapid customs clearance are unmatched.",
    },
    {
      name: "Sarah Lin",
      role: "Director of Logistics",
      company: "Nexus Consumer Goods",
      avatar: "/images/avatar-2.jpg",
      quote:
        "When severe port congestion hit the West Coast, their dispatch team rerouted forty containers seamlessly. They are our most dependable maritime partner.",
    },
    {
      name: "David Morales",
      role: "Head of Operations",
      company: "BioMed Logistics Corp",
      avatar: "/images/avatar-3.jpg",
      quote:
        "Precision cold chain logging and zero temperature excursions. Our pharmaceutical shipments arrive GDP-compliant every single time without exception.",
    },
    {
      name: "Elena Rostova",
      role: "Chief Procurement Officer",
      company: "Veloce Automotive Europe",
      avatar: "/images/avatar-2.jpg",
      quote:
        "Critical automotive assembly parts delivered with guaranteed expedited air slots. Their exception alerts prevented two factory floor shutdowns.",
    },
    {
      name: "Thomas Becker",
      role: "VP of International Freight",
      company: "Nordic Retail Alliance",
      avatar: "/images/avatar-1.jpg",
      quote:
        "Full visibility from Shanghai departure to Rotterdam offloading. Their unified digital portal saved our supply chain team over fifteen hours every week.",
    },
  ];

  const renderCard = (rev: ReviewItem, key: string) => (
    <div
      key={key}
      className={cn(
        "group relative bg-[#F2F6FB] rounded-[26px] sm:rounded-[30px] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden shrink-0",
        "w-[340px] sm:w-[410px] lg:w-[450px]",
        "border-2 border-slate-200/80 shadow-[0_4px_24px_rgba(11,31,58,0.05)]",
        "hover:border-orange-500 hover:shadow-[0_22px_48px_rgba(11,31,58,0.12),0_6px_20px_rgba(232,89,12,0.08)] motion-safe:hover:-translate-y-2",
        "transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] min-h-[360px] sm:min-h-[380px]"
      )}
    >
      {/* Top White Speech Bubble */}
      <div className="relative bg-white rounded-t-[20px] sm:rounded-t-[22px] rounded-bl-[20px] p-6 sm:p-7 xl:p-8 flex flex-col justify-between flex-1 shadow-[0_2px_10px_rgba(11,31,58,0.03)]">
        <div>
          {/* Top Row: Soft Double Quotation Mark + 5-Star Rating Tag */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            {/* Quotation Mark matching reference image */}
            <div className="w-8 h-8 text-slate-300 group-hover:text-orange-500/30 transition-colors duration-300">
              <svg viewBox="0 0 32 32" fill="currentColor" className="w-full h-full">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14H22c0-2.2 1.8-4 4-4V8z" />
              </svg>
            </div>

            {/* 5-Star Rating Tag */}
            <div className="flex items-center gap-1.5 bg-[#F2F6FB] px-2.5 py-1 rounded-full border border-slate-200/70">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-orange-500 text-orange-500"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] font-bold text-navy-900 ml-0.5">
                5.0
              </span>
            </div>
          </div>

          {/* Testimonial Quote Typography */}
          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.68] text-slate-700 font-normal">
            &ldquo;{rev.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom Docked Notch Area */}
      <div className="relative flex items-end justify-between min-h-[64px] sm:min-h-[72px]">
        {/* Author Info Docked in the Left Cutout Shelf */}
        <div className="flex items-center gap-3.5 pl-2.5 sm:pl-3 pr-2 py-3 min-w-0 flex-1">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-navy-900 text-white flex items-center justify-center font-sans font-bold text-[13px] shrink-0 border-2 border-white shadow-sm ring-2 ring-slate-200/80 group-hover:ring-orange-300 transition-[box-shadow] duration-300">
            <Image
              src={rev.avatar}
              alt={rev.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-display font-bold text-[15px] sm:text-[16px] text-navy-900 leading-snug group-hover:text-orange-500 transition-colors duration-300 truncate">
              {rev.name}
            </h4>
            <p className="font-sans text-[12px] sm:text-[12.5px] text-slate-500 leading-tight mt-0.5 truncate">
              {rev.role}
            </p>
            <p className="font-sans text-[11.5px] text-slate-400 font-medium leading-tight truncate">
              {rev.company}
            </p>
          </div>
        </div>

        {/* Right White Anchor Tab with Concave Fillet Curve */}
        <div className="relative bg-white w-[72px] sm:w-[86px] lg:w-[94px] h-[64px] sm:h-[72px] rounded-b-[18px] sm:rounded-b-[20px] shadow-[0_2px_10px_rgba(11,31,58,0.03)] shrink-0 flex items-center justify-center">
          {/* Seamless Concave Fillet joining speech bubble to vertical tab */}
          <div className="absolute top-0 right-full w-5 h-5 -mt-5 pointer-events-none">
            <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
              <path d="M0,0 C11.046,0 20,8.954 20,20 L20,0 Z" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Subtle brand trust pill inside right tab */}
          <span className="w-2 h-2 rounded-full bg-orange-500/80 group-hover:bg-orange-500 motion-safe:group-hover:scale-125 transition-[background-color,transform] duration-300 shadow-sm" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-14 sm:py-18 lg:py-24 bg-white overflow-hidden border-b border-line">
      <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="max-w-[640px] mb-10 sm:mb-12 lg:mb-14">
          <Eyebrow>Client reviews</Eyebrow>
          <h2 className="font-display font-bold text-[clamp(26px,3.2vw,38px)] leading-[1.18] tracking-[-0.015em] text-navy-900 mt-2.5 [text-wrap:balance]">
            What our <span className="text-orange-500">customers say.</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-slate-600 mt-2.5">
            Real feedback from procurement managers and enterprise shippers who
            rely on us for time-critical freight movements.
          </p>
        </Reveal>
      </div>

      {/* Infinite Scrolling Marquee Track with Edge Gradients */}
      <div className="relative w-full">
        {/* Left & Right Smooth Edge Fade Masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 lg:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 lg:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-20"
          aria-hidden="true"
        />

        <PausableMarquee
          label="Client testimonials"
          speedSeconds={36}
          tone="dark"
          gap={24}
          groupClassName="items-stretch"
          className="py-3 pt-12"
          controlClassName="top-3 right-4 translate-y-0"
        >
          {reviews.map((rev, idx) => renderCard(rev, `review-${idx}`))}
        </PausableMarquee>
      </div>
    </section>
  );
}

