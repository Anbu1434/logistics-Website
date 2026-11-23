"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Ship, Plane, Truck, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { LineDraw } from "@/components/motion/line-draw";
import { cn } from "@/lib/utils";

export interface ServiceItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ElementType;
  href: string;
  isFeatured?: boolean;
}

export function Services() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const serviceItems: ServiceItem[] = [
    {
      title: "Ocean Freight",
      description:
        "Cost-effective container and bulk cargo shipping across global maritime corridors.",
      imageSrc: "/images/service-ocean-new.jpg",
      imageAlt: "Commercial container vessel navigating open sea with cargo stacks at twilight",
      icon: Ship,
      href: "/services/ocean-freight",
      isFeatured: true,
    },
    {
      title: "Air Freight",
      description:
        "When speed matters, get priority handling and tight flight schedules for urgent freight.",
      imageSrc: "/images/service-air-new.jpg",
      imageAlt: "Heavy cargo freighter aircraft loading at airport apron in stormy blue hour",
      icon: Plane,
      href: "/services/air-freight",
    },
    {
      title: "Road Freight",
      description:
        "Flexible FTL and LTL transport with real-time GPS fleet telemetry and dedicated haulage.",
      imageSrc: "/images/service-road-new.jpg",
      imageAlt: "Interstate freight trailer truck on highway transit at twilight",
      icon: Truck,
      href: "/services/road-freight",
    },
    {
      title: "Warehousing",
      description:
        "Secure storage, temperature-controlled staging, inventory control, and rapid fulfillment.",
      imageSrc: "/images/service-warehouse-new.jpg",
      imageAlt: "High-bay logistics warehouse racking and forklift operations",
      icon: Warehouse,
      href: "/services/warehousing",
    },
  ];

  return (
    <section className="relative pt-8 sm:pt-10 lg:pt-12 pb-14 sm:pb-16 lg:pb-20 bg-white overflow-hidden border-b border-line">
      {/* Scoped CSS for Butter-Smooth Expanding Flex Widths on Desktop Only */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 1024px) {
              .service-card-item {
                flex: var(--card-flex, 1 1 0%) !important;
                transition: flex 500ms cubic-bezier(0.25, 1, 0.5, 1),
                            border-color 300ms ease,
                            box-shadow 350ms ease;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .service-card-item {
                transition: none !important;
              }
            }
          `,
        }}
      />

      {/* Background: Dotted World Map with Orange Routes (Softly Blurred) */}
      <Reveal
        y={0}
        duration={800}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/images/Dotted World Map with Orange Routes.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[right_top] sm:object-top opacity-85 blur-[4px] scale-105"
          priority={false}
        />
      </Reveal>

      <div className="max-w-[1380px] xl:max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading Area (Two Columns on Desktop) */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-7 sm:mb-8 lg:mb-8">
          {/* Left Column: Eyebrow + Main Heading + Description */}
          <div className="flex flex-col gap-2 sm:gap-2.5 max-w-[680px]">
            {/* Eyebrow with Orange Accent Line */}
            <div className="flex items-center gap-2 mb-0.5">
              <LineDraw
                className="w-5 h-[2px] bg-orange-500 rounded-full shrink-0"
                duration={300}
              />
              <span className="font-sans font-bold text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-orange-500">
                OUR SERVICES
              </span>
            </div>

            {/* Main Headline */}
            <Reveal
              as="h2"
              delay={60}
              y={16}
              className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.14] tracking-[-0.02em] text-navy-900 [text-wrap:balance]"
            >
              <span>Logistics solutions that</span>{" "}
              <span className="text-orange-500">move you forward.</span>
            </Reveal>

            {/* Supporting Description Paragraph */}
            <Reveal
              as="p"
              delay={120}
              y={16}
              className="font-sans text-[14.5px] sm:text-[15.5px] lg:text-[16.5px] leading-[1.6] text-slate-600 max-w-[580px]"
            >
              End-to-end freight and supply chain solutions designed for speed,
              reliability, and global reach.
            </Reveal>
          </div>

          {/* Right Column: Unified Canonical Primary CTA Button (Desktop only on top) */}
          <Reveal delay={200} y={12} className="shrink-0 self-start md:self-end hidden md:block">
            <Link href="/services">
              <Button variant="primary" size="default" className="shadow-sm">
                View all services
              </Button>
            </Link>
          </Reveal>
        </div>

        {/* Four Service Cards */}
        {/* Desktop: Interactive Expanding Flex Row (1024px+) with generous width */}
        {/* Tablet: 2-Column Grid (640px-1023px) */}
        {/* Mobile: Horizontal Snap Carousel (<640px) */}
        <div
          onMouseLeave={() => setActiveIndex(null)}
          className="relative z-10 flex gap-4 sm:gap-5 lg:gap-5 xl:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:overflow-visible"
        >
          {serviceItems.map((service, index) => {
            const isHovered = activeIndex === index;
            const isAnyHovered = activeIndex !== null;
            // By default (no hover), the orange button and highlight appear on the first card only
            const isHighlighted = isHovered || (!isAnyHovered && index === 0);

            // Flex proportions for desktop:
            // Default (no hover): 1 1 0% each (~25% width each)
            // Hovered card: 1.85 1 0% (~40% wider showcase with generous room)
            // Sibling cards: 0.8 1 0% (~20% each with comfortable room for title & text)
            const flexValue =
              activeIndex === null
                ? "1 1 0%"
                : isHovered
                ? "1.85 1 0%"
                : "0.8 1 0%";

            return (
              <Reveal
                key={service.title}
                delay={100 + index * 80}
                y={24}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setActiveIndex(null);
                  }
                }}
                style={{ "--card-flex": flexValue } as React.CSSProperties}
                className="service-card-item min-w-0 lg:min-w-[210px] xl:min-w-[230px] group w-[86vw] max-w-[360px] shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                <div
                  className={cn(
                    "relative h-full w-full overflow-hidden rounded-[22px] sm:rounded-[24px] lg:rounded-[26px] bg-navy-900 shadow-soft transition-[border-color,box-shadow,transform,opacity] duration-300 ease-out min-h-[490px] sm:min-h-[520px] lg:min-h-[540px] xl:min-h-[570px] flex flex-col justify-between p-6 sm:p-7 lg:p-7 xl:p-8",
                    isHighlighted
                      ? "border-2 border-orange-500 shadow-lift motion-safe:lg:-translate-y-1.5"
                      : isAnyHovered && !isHovered
                      ? "border border-white/60 opacity-90"
                      : "border border-white/80 hover:border-orange-500 hover:shadow-lift motion-safe:hover:-translate-y-1.5"
                  )}
                >
                  {/* 1. Background Image with Gentle Zoom on Active Card */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, (max-width: 1440px) 35vw, 25vw"
                      className={cn(
                        "object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out",
                        isHovered
                          ? "motion-safe:scale-105"
                          : "motion-safe:group-hover:scale-105"
                      )}
                    />
                  </div>

                  {/* 2. Dark Navy Gradient Overlay for optimal contrast & legibility */}
                  <div
                    className="absolute inset-0 z-[1] bg-gradient-to-t from-navy-900 via-navy-900/80 via-45% to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* 3. Top-Right: Circular Arrow Button matching reference */}
                  <div className="relative z-10 self-end">
                    <div
                      className={cn(
                        "w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-soft flex items-center justify-center bg-orange-500 text-white motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
                        isHovered
                          ? "motion-safe:scale-105 shadow-lift"
                          : "motion-safe:group-hover:scale-105"
                      )}
                    >
                      <ArrowUpRight
                        className={cn(
                          "w-5 h-5 sm:w-6 sm:h-6 motion-safe:transition-transform motion-safe:duration-300",
                          isHovered
                            ? "motion-safe:translate-x-0.5 motion-safe:-translate-y-0.5"
                            : "motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                        )}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* 4. Bottom Content Area: Short Orange Line + Title + Description */}
                  <div className="relative z-10 flex flex-col items-start mt-auto pt-10">
                    {/* Short Orange Horizontal Accent Line above Title */}
                    <span
                      className={cn(
                        "h-[4.5px] bg-orange-500 rounded-full mb-3 shrink-0 transition-[width] duration-300",
                        isHovered ? "w-14" : "w-11 sm:w-12"
                      )}
                      aria-hidden="true"
                    />

                    {/* Service Title */}
                    <h3 className="font-display font-bold leading-[1.2] tracking-[-0.015em] text-white mb-2 text-[24px] sm:text-[26px] lg:text-[28px]">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans leading-[1.6] text-slate-100/95 font-normal text-[14.5px] sm:text-[15px] lg:text-[15.5px] line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* 5. Entire Card Accessible Target */}
                  <Link
                    href={service.href}
                    className="absolute inset-0 z-20 rounded-[22px] sm:rounded-[24px] lg:rounded-[26px] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    aria-label={`Explore ${service.title}`}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile View: "View all services" CTA button moved below cards */}
        <Reveal delay={200} y={12} className="mt-8 flex justify-center md:hidden relative z-10 px-5 sm:px-0">
          <Link href="/services" className="w-full max-w-[360px] sm:w-auto">
            <Button
              variant="primary"
              size="default"
              className="w-full sm:w-auto shadow-sm justify-center"
            >
              View all services
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
