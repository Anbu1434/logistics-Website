import * as React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Factory,
  ShieldAlert,
  Snowflake,
  Cpu,
  Package,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Industries Served",
  description:
    "Tailored freight forwarding, customs clearance, and cold-chain supply chain management engineered for retail, automotive, pharma, manufacturing, and e-commerce.",
};

interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
  description: string;
  image: string;
  features: string[];
  serviceLink: string;
  serviceName: string;
}

const industries: IndustryItem[] = [
  {
    id: "retail",
    name: "Retail & Consumer Goods",
    tagline: "High-Volume Omnichannel Distribution",
    icon: ShoppingBag,
    description:
      "Reliable multimodal transport, seasonal peak capacity surges, and direct-to-store distribution for fast-moving retail brands.",
    image: "/images/Warehouse Loading Dock Operations.png",
    features: [
      "Vendor consolidation & cross-docking",
      "Peak season volume guarantees",
      "Real-time carton-level tracking",
      "Automated EDI order reconciliation",
    ],
    serviceLink: "/services/road-freight",
    serviceName: "Explore Road Haulage",
  },
  {
    id: "manufacturing",
    name: "Industrial Manufacturing",
    tagline: "Just-In-Time Component Logistics",
    icon: Factory,
    description:
      "Precision-scheduled raw material and machinery shipping designed to synchronize directly with production line schedules.",
    image: "/images/Modern Orange Container Truck on Highway.png",
    features: [
      "Out-of-gauge (OOG) & project cargo",
      "JIT raw materials delivery schedules",
      "Bonded customs clearance at ports",
      "Dedicated heavy-haul flatbed trailers",
    ],
    serviceLink: "/services/ocean-freight",
    serviceName: "Explore Ocean Corridors",
  },
  {
    id: "pharma",
    name: "Pharma & Healthcare",
    tagline: "GDP-Compliant Temperature Control",
    icon: ShieldAlert,
    description:
      "Certified cold-chain air and ocean corridors engineered for pharmaceuticals, active ingredients, and delicate biomedical shipments.",
    image: "/images/Stormy-Blue-Hour-Cargo-Ramp.png",
    features: [
      "Continuous data-logger temperature telemetry",
      "Priority ramp tarmac transfer & expedited customs",
      "Strict GDP and WHO protocol adherence",
      "Tamper-evident cargo sealing & chain of custody",
    ],
    serviceLink: "/services/air-freight",
    serviceName: "Explore Priority Air",
  },
  {
    id: "cold-chain",
    name: "Food & Perishables",
    tagline: "Controlled-Atmosphere Transit",
    icon: Snowflake,
    description:
      "Specialized reefer containers and refrigerated trucks ensuring uninterrupted freshness from harvest and port to supermarket shelf.",
    image: "/images/Container Ship Cutting Through Blue Seas.png",
    features: [
      "Multi-temp refrigerated reefer units",
      "Pre-trip inspection (PTI) certified equipment",
      "Port agricultural & phytosanitary clearance",
      "Expedited port terminal gate passes",
    ],
    serviceLink: "/services/ocean-freight",
    serviceName: "Explore Reefer Ocean",
  },
  {
    id: "automotive",
    name: "Automotive & Technology",
    tagline: "High-Value Critical Freight",
    icon: Cpu,
    description:
      "Fast, time-critical shipping of automotive assemblies, microchips, and high-tech components requiring expedited handling.",
    image: "/images/Cinematic-Twilight-Semi-Truck-Highway.png",
    features: [
      "Next-Flight-Out (NFO) air charters",
      "Dedicated air-ride logistics trailers",
      "Secure geo-fenced high-security corridors",
      "White-glove inside delivery options",
    ],
    serviceLink: "/services/air-freight",
    serviceName: "Explore Air Expedite",
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Fulfillment",
    tagline: "Rapid B2C & B2B Inventory Logistics",
    icon: Package,
    description:
      "Integrated port-to-warehouse drayage, high-bay inventory staging, and synchronized parcel distribution for digital merchants.",
    image: "/images/Forklift-Navigating-a-Bright-Warehouse-Aisle.png",
    features: [
      "Cloud WMS inventory visibility & API sync",
      "Fast deconsolidation & FBA replenishment",
      "Returns processing & quality grading",
      "Same-day dispatch cutoffs",
    ],
    serviceLink: "/services/warehousing",
    serviceName: "Explore Warehousing",
  },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        eyebrow="Industry Solutions"
        title="Built for the way your industry ships."
        highlight="industry ships"
        description="Specialized freight corridors, temperature-controlled transit, and dedicated customs compliance engineered around the unique regulatory and operational needs of your sector."
        breadcrumbs={[{ label: "Industries" }]}
      />

      {/* Industries Grid */}
      <section className="py-16 sm:py-24 border-b border-line bg-sky-50/50">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {industries.map((ind, index) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.id}
                  id={ind.id}
                  className="group relative bg-white rounded-[20px] overflow-hidden border border-line shadow-soft flex flex-col justify-between transition-all duration-300 hover:shadow-lift hover:-translate-y-1"
                >
                  {/* Top Image Banner with Soft Gradient */}
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Badge Icon Top Left */}
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-[12px] bg-white/95 backdrop-blur-sm text-navy-900 flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-orange-500" strokeWidth={1.75} />
                    </div>

                    {/* Tagline Bottom Left */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-white/90 font-medium">
                        {ind.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-[20px] sm:text-[21px] text-navy-900 tracking-tight leading-snug group-hover:text-orange-500 transition-colors">
                        {ind.name}
                      </h3>
                      <p className="font-sans text-[14px] text-slate-600 leading-[1.65] mt-2.5 mb-5">
                        {ind.description}
                      </p>

                      {/* Capabilities Checklist */}
                      <ul className="space-y-2 pt-4 border-t border-line/60">
                        {ind.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-snug"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-orange-500 shrink-0 mt-0.5"
                              strokeWidth={2}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Link to Related Service */}
                    <div className="mt-6 pt-4 border-t border-line">
                      <Link
                        href={ind.serviceLink}
                        className="inline-flex items-center gap-1.5 font-sans font-semibold text-[13.5px] text-ocean-600 hover:text-orange-500 transition-colors"
                      >
                        <span>{ind.serviceName}</span>
                        <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <FinalCTA />
    </main>
  );
}
