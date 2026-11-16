import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "flat" | "elevated";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-white transition-all duration-300",
        variant === "default" && "shadow-soft hover:shadow-lift",
        variant === "elevated" && "shadow-lift",
        variant === "flat" && "shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  className,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[22px] sm:rounded-[24px] border border-white/85 shadow-soft transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lift hover:border-orange-500 min-h-[490px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-between p-6 sm:p-7 lg:p-8 select-none bg-navy-900",
        className
      )}
    >
      {/* Background Image with Hover Zoom */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
        />
      </div>

      {/* Navy gradient overlay for legibility */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-900 via-navy-900/85 via-45% to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Top-Right: Circular Arrow Button */}
      <div className="relative z-10 self-end">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-navy-900 group-hover:bg-orange-500 group-hover:text-white shadow-soft flex items-center justify-center transition-all duration-300 ease-out">
          <ArrowUpRight
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Bottom Content Area: Short Orange Line + Title + Description */}
      <div className="relative z-10 flex flex-col items-start mt-auto pt-10">
        <span
          className="w-10 sm:w-12 h-[5px] bg-orange-500 rounded-full mb-3.5 shrink-0"
          aria-hidden="true"
        />

        <h3 className="font-display font-bold text-[24px] md:text-[26px] lg:text-[28px] leading-[1.25] tracking-[-0.015em] text-white mb-2.5">
          {title}
        </h3>

        <p className="font-sans text-[15px] sm:text-[15.5px] lg:text-[16px] leading-[1.6] text-slate-100/95 font-normal line-clamp-3">
          {description}
        </p>
      </div>

      {/* Full Card Accessible Target */}
      <Link
        href={href}
        className="absolute inset-0 z-20 rounded-[22px] sm:rounded-[24px] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        aria-label={`Explore ${title}`}
      />
    </div>
  );
}

