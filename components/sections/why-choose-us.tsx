import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Truck, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-line select-none">
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
              <span
                className="w-5 h-[2px] bg-orange-500 rounded-full inline-block shrink-0"
                aria-hidden="true"
              />
              <span className="font-sans font-bold text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-orange-500">
                WHY CHOOSE US
              </span>
            </div>

            {/* Main Headline with Orange Accent */}
            <h2 className="font-display font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.16] tracking-[-0.02em] text-navy-900 [text-wrap:balance]">
              Our commitment to excellence powers every{" "}
              <span className="text-orange-500">delivery.</span>
            </h2>

            {/* Supporting Description Paragraph */}
            <p className="font-sans text-[15px] sm:text-[16px] leading-[1.65] text-slate-600 mt-4 max-w-[520px]">
              Reliable logistics, real-time shipment visibility, and a global network
              keep your cargo moving safely, efficiently, and always on schedule.
            </p>

            {/* Primary Orange CTA Button */}
            <div className="mt-6 sm:mt-7">
              <Link href="/about">
                <Button
                  variant="primary"
                  size="default"
                  className="rounded-btn shadow-sm"
                >
                  Discover Our Advantages
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: High-Quality Modern Port Photography */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[350px] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-line shadow-soft group">
              <Image
                src="/images/why-choose-us-port.jpg"
                alt="Freight containers and cargo handling operations at a modern maritime terminal"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority={false}
              />
              {/* Subtle top/bottom contrast overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-900/10 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Bottom Area: Four Redesigned Feature Cards Matching Reference Layout */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6 xl:gap-7">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isFeatured = feature.isFeatured;

            return (
              <div
                key={feature.title}
                className={cn(
                  "group relative bg-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 xl:p-8 flex flex-col justify-between overflow-hidden select-none min-h-[420px] sm:min-h-[450px] lg:min-h-[470px] xl:min-h-[490px]",
                  "border-2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform",
                  "hover:-translate-y-2 sm:hover:-translate-y-2.5",
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
                        "w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-[16px] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 shadow-sm",
                        feature.iconBg,
                        feature.iconColor
                      )}
                    >
                      <Icon className="w-6 h-6 sm:w-6.5 sm:h-6.5" strokeWidth={2.2} />
                    </div>
                    <span
                      className={cn(
                        "font-display font-bold text-[18px] sm:text-[20px] lg:text-[21px] tracking-tight transition-colors duration-400 ease-out",
                        isFeatured
                          ? "text-orange-500"
                          : "text-slate-400 group-hover:text-orange-500"
                      )}
                    >
                      {feature.step}
                    </span>
                  </div>

                  {/* Feature Title */}
                  <h3 className="font-display font-bold text-[20px] sm:text-[21px] lg:text-[22px] xl:text-[23px] text-navy-900 mb-2.5 sm:mb-3 leading-snug group-hover:text-orange-500 transition-colors duration-400 ease-out">
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
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-108"
                  />

                  {/* Soft top gradient blend into white card body */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/95 pointer-events-none z-[1]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
