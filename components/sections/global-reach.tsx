"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { CountUp } from "@/components/motion/count-up";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const routeNodes = [
  { cx: 40, cy: 212, label: "Long Beach", sub: "US" },
  { cx: 208, cy: 128, label: "Rotterdam", sub: "NL" },
  { cx: 356, cy: 160, label: "Dubai", sub: "AE" },
  { cx: 486, cy: 72, label: "Shanghai", sub: "CN" },
];

export function GlobalReach() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reducedMotion = useReducedMotion();
  const active = reducedMotion || inView;

  return (
    <section className="relative bg-sky-50 py-16 sm:py-20 lg:py-24 border-b border-line overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(#1F5F9E_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
        aria-hidden="true"
      />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Fleet photography */}
          <div className="lg:col-span-7">
            <ImageReveal
              direction="left"
              duration={800}
              className="group relative h-[280px] sm:h-[360px] lg:h-full lg:min-h-[440px] rounded-[18px] sm:rounded-[22px] overflow-hidden border border-line shadow-soft"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/Cinematic-Twilight-Semi-Truck-Highway.png"
                  alt="Company fleet trucks moving freight on a highway at twilight"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/75 via-navy-900/10 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/70">
                      Fleet operations
                    </span>
                    <p className="mt-1 font-display font-semibold text-[18px] sm:text-[20px] leading-snug text-white">
                      Owned linehaul and vetted partner capacity.
                    </p>
                  </div>
                  <span
                    className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
              </div>
            </ImageReveal>
          </div>

          {/* Route panel */}
          <div ref={ref} className="lg:col-span-5 flex">
            <Reveal
              delay={120}
              y={20}
              className="flex h-full w-full flex-col justify-between gap-8 rounded-[18px] sm:rounded-[22px] bg-navy-900 text-white border border-navy-700 shadow-lift p-6 sm:p-8 overflow-hidden"
            >
            <div>
              <Eyebrow>Global reach</Eyebrow>
              <h2 className="mt-3 font-display font-bold text-[26px] sm:text-[30px] leading-[1.18] tracking-[-0.015em] text-white [text-wrap:balance]">
                Door-to-door across{" "}
                <span className="text-orange-500">
                  <CountUp value={50} suffix="+" />
                </span>{" "}
                cities and{" "}
                <span className="text-orange-500">
                  <CountUp value={30} suffix="+" />
                </span>{" "}
                countries.
              </h2>
              <p className="mt-3 max-w-[380px] font-sans text-[14px] sm:text-[15px] leading-[1.65] text-slate-300">
                One accountable partner from origin pickup to final delivery,
                with a 24/7 control tower watching every handoff.
              </p>
            </div>

            {/* Animated route map */}
            <div className="relative -mx-2">
              <svg
                viewBox="0 0 526 250"
                role="img"
                aria-label="Illustrative route from Long Beach to Rotterdam, Dubai, and Shanghai"
                className="w-full h-auto"
              >
                <defs>
                  <linearGradient id="route-stroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1F5F9E" />
                    <stop offset="55%" stopColor="#7FB2E5" />
                    <stop offset="100%" stopColor="#E8590C" />
                  </linearGradient>
                </defs>

                {/* Faint latitude / longitude guides */}
                <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
                  <line x1="16" y1="60" x2="510" y2="60" />
                  <line x1="16" y1="130" x2="510" y2="130" />
                  <line x1="16" y1="200" x2="510" y2="200" />
                  <line x1="120" y1="24" x2="120" y2="226" />
                  <line x1="260" y1="24" x2="260" y2="226" />
                  <line x1="400" y1="24" x2="400" y2="226" />
                </g>

                {/* Route line */}
                <path
                  d="M40 212 C 96 118, 156 88, 208 128 S 300 214, 356 160 S 436 48, 486 72"
                  fill="none"
                  stroke="url(#route-stroke)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1"
                  style={{
                    strokeDashoffset: active ? 0 : 1,
                    transition: "stroke-dashoffset 1500ms cubic-bezier(0.22, 1, 0.36, 1) 150ms",
                  }}
                />

                {routeNodes.map((node, index) => (
                  <g
                    key={node.label}
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? "translateY(0)" : "translateY(6px)",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      transition: `opacity 300ms linear ${
                        350 + index * 180
                      }ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) ${
                        350 + index * 180
                      }ms`,
                    }}
                  >
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="7"
                      fill="rgba(232,89,12,0.18)"
                    />
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="3.5"
                      fill="#E8590C"
                      stroke="#0B1F3A"
                      strokeWidth="1.5"
                    />
                    <text
                      x={node.cx}
                      y={node.cy - 14}
                      textAnchor={index === routeNodes.length - 1 ? "end" : "middle"}
                      className="fill-white font-sans text-[10px] font-semibold"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.cx}
                      y={node.cy + 18}
                      textAnchor={index === routeNodes.length - 1 ? "end" : "middle"}
                      className="fill-slate-400 font-mono text-[8.5px] tracking-[0.14em]"
                    >
                      {node.sub}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "24/7", label: "Control tower" },
                  { value: "98%", label: "On-time" },
                  { value: "5 min", label: "Telemetry" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[15px] sm:text-[16px] font-semibold text-white">
                      {item.value}
                    </span>
                    <span className="font-sans text-[10.5px] sm:text-[11px] uppercase tracking-[0.08em] text-slate-400">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-orange-500 transition-colors duration-150 hover:text-orange-400"
              >
                <span>Plan your route with a specialist</span>
                <ArrowUpRight
                  className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
