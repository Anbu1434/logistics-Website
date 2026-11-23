import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Truck, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { LineDraw } from "@/components/motion/line-draw";
import { cn } from "@/lib/utils";

interface FeatureCardItem {
  step: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  imageSrc: string;
  imageAlt: string;
  isFeatured?: boolean;
}

export function WhyChooseUs() {
  const features: FeatureCardItem[] = [
    {
      step: "01",
      title: "Real-Time Tracking",
      description:
        "Track shipments at every stage with clear, timely status updates and live satellite telemetry.",
      icon: MapPin,
      iconBg: "bg-[#EAF2F9]",
      iconColor: "text-ocean-600",
      imageSrc: "/images/Aerial Container Port Panorama.png",
      imageAlt: "Aerial view of container port terminal with gantry cranes",
    },
    {
      step: "02",
      title: "Reliable Delivery",
      description:
        "Optimized routes and dependable operations help shipments arrive consistently on schedule.",
      icon: Truck,
      iconBg: "bg-[#FDF0E7]",
      iconColor: "text-orange-500",
      imageSrc: "/images/Modern Orange Container Truck on Highway.png",
      imageAlt: "Modern orange container freight truck driving on highway",
      isFeatured: true,
    },
    {
      step: "03",
      title: "Secure Handling",
      description:
        "Careful cargo handling and monitoring help protect every shipment across all transit legs.",
      icon: ShieldCheck,
      iconBg: "bg-[#EAF2F9]",
      iconColor: "text-ocean-600",
      imageSrc: "/images/Warehouse Loading Dock Operations.png",
      imageAlt: "Warehouse loading dock and logistics cargo handling",
    },
    {
      step: "04",
      title: "Global Network",
      description:
        "Connected freight partners support smooth, frictionless international transportation.",
      icon: Globe,
      iconBg: "bg-[#FDF0E7]",
      iconColor: "text-orange-500",
      imageSrc: "/images/Container Ship Cutting Through Blue Seas.png",
      imageAlt: "Commercial container vessel cutting through open sea water",
    },
  ];

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-line">
      {/* Subtle atmospheric wave in the lower-right corner */}
      <div
        className="absolute -bottom-10 -right-10 w-[500px] h-[350px] pointer-events-none select-none z-0 opacity-60 overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(242,246,251,1)_0%,_rgba(242,246,251,0.6)_50%,_transparent_75%)]" />
      </div>

      <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Top Area: Two-Column Introduction (50/50 Split on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Eyebrow + Headline + Description + CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-[580px]">
            {/* Eyebrow with orange dash */}
            <div className="flex items-center gap-2 mb-3">
              <LineDraw
                className="w-5 h-[2px] bg-orange-500 rounded-full shrink-0"
                duration={300}
              />
              <span className="font-sans font-bold text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-orange-500">
                WHY CHOOSE US
              </span>
            </div>

            {/* Main Headline with Orange Accent */}
            <Reveal
              as="h2"
              delay={60}
              y={16}
              className="font-display font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.16] tracking-[-0.02em] text-navy-900 [text-wrap:balance]"
            >
              Our commitment to excellence powers every{" "}
              <span className="text-orange-500">delivery.</span>
            </Reveal>

            {/* Supporting Description Paragraph */}
            <Reveal
              as="p"
              delay={120}
              y={16}
              className="font-sans text-[15px] sm:text-[16px] leading-[1.65] text-slate-600 mt-4 max-w-[520px]"
            >
              Reliable logistics, real-time shipment visibility, and a global network
              keep your cargo moving safely, efficiently, and always on schedule.
            </Reveal>

            {/* Primary Orange CTA Button */}
            <Reveal delay={200} y={12} className="mt-6 sm:mt-7">
              <Link href="/about">
                <Button
                  variant="primary"
                  size="default"
                  className="rounded-btn shadow-sm"
                >
                  Discover Our Advantages
                </Button>
              </Link>
            </Reveal>
          </div>

          {/* Right Column: High-Quality Modern Port Photography */}
          <div className="lg:col-span-6 w-full">
            <ImageReveal
              direction="right"
              duration={700}
              className="group relative w-full h-[260px] sm:h-[320px] lg:h-[350px] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-line shadow-soft"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/why-choose-us-port.jpg"
                  alt="Freight containers and cargo handling operations at a modern maritime terminal"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
                  priority={false}
                />
                {/* Subtle top/bottom contrast overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/10 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </ImageReveal>
          </div>
        </div>

        {/* Bottom Area: Four Redesigned Feature Cards Matching Reference Layout */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6 xl:gap-7">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isFeatured = feature.isFeatured;

            return (
              <Reveal key={feature.title} delay={index * 80} y={20}>
                <div
                  className={cn(
                    "group relative h-full bg-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 xl:p-8 flex flex-col justify-between overflow-hidden min-h-[420px] sm:min-h-[450px] lg:min-h-[470px] xl:min-h-[490px]",
                    "border-2 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    "motion-safe:hover:-translate-y-2 sm:motion-safe:hover:-translate-y-2.5",
                    isFeatured
                      ? "border-orange-500 shadow-[0_12px_36px_rgba(11,31,58,0.10),0_4px_14px_rgba(232,89,12,0.08)] hover:shadow-[0_24px_50px_rgba(11,31,58,0.15),0_8px_24px_rgba(232,89,12,0.14)]"
                      : "border-slate-200/80 shadow-[0_4px_24px_rgba(11,31,58,0.05)] hover:border-orange-500 hover:shadow-[0_22px_48px_rgba(11,31,58,0.13),0_6px_20px_rgba(232,89,12,0.10)]"
                  )}
                >
                  {/* Upper Content Area */}
                  <div className="flex flex-col">
                    {/* Top Bar: Icon Squircle + Step Number */}
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                      <div
                        className={cn(
                          "w-12 h-12 sm:w-[52px] sm:h-[52px] lg:w-14 lg:h-14 rounded-[16px] flex items-center justify-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:group-hover:scale-110 shadow-sm",
                          feature.iconBg,
                          feature.iconColor
                        )}
                      >
                        <Icon className="w-6 h-6 sm:w-[26px] sm:h-[26px]" strokeWidth={2.2} />
                      </div>
                      <span
                        className={cn(
                          "font-display font-bold text-[18px] sm:text-[20px] lg:text-[21px] tracking-tight transition-colors duration-300 ease-out",
                          isFeatured
                            ? "text-orange-500"
                            : "text-slate-400 group-hover:text-orange-500"
                        )}
                      >
                        {feature.step}
                      </span>
                    </div>

                    {/* Feature Title */}
                    <h3 className="font-display font-bold text-[20px] sm:text-[21px] lg:text-[22px] xl:text-[23px] text-navy-900 mb-2.5 sm:mb-3 leading-snug group-hover:text-orange-500 transition-colors duration-300 ease-out">
                      {feature.title}
                    </h3>

                    {/* Feature Description */}
                    <p className="font-sans text-[14px] sm:text-[14.5px] lg:text-[15px] text-slate-600 leading-[1.65] mb-6 sm:mb-7">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Photo Container with Soft Top Gradient Blend */}
                  <div className="relative w-[calc(100%+48px)] sm:w-[calc(100%+56px)] xl:w-[calc(100%+64px)] -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 xl:-mx-8 xl:-mb-8 h-[165px] sm:h-[185px] lg:h-[200px] xl:h-[215px] overflow-hidden mt-auto">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:group-hover:scale-105"
                    />

                    {/* Soft top gradient blend into white card body */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/95 pointer-events-none z-[1]"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
