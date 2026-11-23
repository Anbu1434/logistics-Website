import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { LineDraw } from "@/components/motion/line-draw";
import { cn } from "@/lib/utils";

export function About() {
  const stats = [
    {
      value: "29K+",
      label: "Field specialists & crew",
      sublabel: "Worldwide logistics personnel",
      highlight: false,
    },
    {
      value: "150K",
      label: "Tons moved annually",
      sublabel: "Intermodal freight volume",
      highlight: true,
    },
    {
      value: "139K+",
      label: "Active enterprise clients",
      sublabel: "Direct B2B accounts",
      highlight: false,
    },
    {
      value: "50+",
      label: "Global hub cities",
      sublabel: "Ports & terminal facilities",
      highlight: true,
    },
  ];

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-white overflow-hidden border-b border-line">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Asymmetric Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          {/* Left Column: Tall Port Photo with Overlapping 98% Stat Card */}
          <div className="lg:col-span-6 relative">
            <ImageReveal className="group relative aspect-[4/5] sm:aspect-[16/13] lg:aspect-[4/5] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-line shadow-soft">
              <div className="relative h-full w-full">
                <Image
                  src="/images/about-port.webp"
                  alt="Container port terminal with heavy gantry cranes and shipping vessels"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
                  priority={false}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </ImageReveal>

            {/* Overlapping Navy Stat Card */}
            <Reveal
              delay={250}
              y={12}
              className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 bg-navy-900 text-white rounded-[14px] sm:rounded-[16px] p-4 sm:p-5 shadow-lift border border-navy-700/80 max-w-[210px] sm:max-w-[230px] z-10"
            >
              <div className="font-display font-bold text-[34px] sm:text-[40px] leading-none text-white tabular-nums">
                <CountUp value={98} suffix="%" />
              </div>
              <p className="font-sans text-[12.5px] sm:text-[13px] text-slate-200 mt-2 leading-snug">
                On-time delivery across verified global routes.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Heading, Copy, 2x2 Numbers Counts Grid, CTA Button */}
          <div className="lg:col-span-6 flex flex-col gap-5 pt-4 lg:pt-0 text-left">
            {/* Eyebrow with orange dash */}
            <div className="flex items-center gap-2">
              <LineDraw
                className="w-5 h-[2px] bg-orange-500 rounded-full shrink-0"
                duration={300}
              />
              <span className="font-sans font-bold text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-orange-500">
                ABOUT US
              </span>
            </div>

            {/* Main Headline */}
            <Reveal
              as="h2"
              delay={60}
              y={16}
              className="font-display font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.16] tracking-[-0.02em] text-navy-900 [text-wrap:balance]"
            >
              A logistics partner built on{" "}
              <span className="text-orange-500">speed, technology, and trust.</span>
            </Reveal>

            {/* Supporting Description */}
            <Reveal
              as="p"
              delay={120}
              y={16}
              className="font-sans text-[14.5px] sm:text-[15.5px] lg:text-[16px] leading-[1.65] text-slate-600 max-w-[540px]"
            >
              We combine live tracking, a dedicated team, and deep route expertise
              so every shipment reaches its destination safely and on time. With
              strategic hub networks and automated telematics, we eliminate the
              delays typical of legacy freight operations.
            </Reveal>

            {/* 4 Numbers Counts (Clean Text Style, No Card Background/Borders) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 my-1">
              {stats.map((stat, index) => {
                const numeric = Number(stat.value.replace(/[^\d]/g, ""));
                const suffix = stat.value.replace(/^[\d,]+/, "");
                return (
                  <Reveal
                    key={stat.label}
                    delay={160 + index * 80}
                    y={12}
                    className="flex flex-col"
                  >
                    <span
                      className={cn(
                        "font-display font-bold text-[28px] sm:text-[34px] lg:text-[38px] leading-tight tracking-tight tabular-nums",
                        stat.highlight ? "text-orange-500" : "text-navy-900"
                      )}
                    >
                      <CountUp value={numeric} suffix={suffix} />
                    </span>
                    <span className="font-sans text-[13.5px] sm:text-[14px] font-semibold text-navy-900 mt-1 leading-snug">
                      {stat.label}
                    </span>
                    <span className="font-sans text-[12px] sm:text-[12.5px] text-slate-500 leading-tight mt-0.5">
                      {stat.sublabel}
                    </span>
                  </Reveal>
                );
              })}
            </div>

            {/* Primary Action Button */}
            <Reveal delay={520} y={12} className="pt-1">
              <Link href="/about">
                <Button variant="primary" size="default" className="shadow-sm">
                  More About Us
                </Button>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
