import * as React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Ship, Plane, Truck, Warehouse, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our complete suite of global freight forwarding services: ocean FCL/LCL, priority air freight, interstate road haulage, and high-bay warehousing.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Ocean Freight",
      slug: "ocean-freight",
      icon: Ship,
      tag: "FCL & LCL Maritime",
      image: "/images/Container-Ship-at-Twilight.png",
      description:
        "Cost-effective Full Container Load (FCL) and Less than Container Load (LCL) consolidation across 200+ primary maritime corridors.",
      capabilities: [
        "FCL & LCL multi-buyer consolidation",
        "Temperature-mapped refrigerated containers (Reefers)",
        "Direct ISF, AMS & electronic Bill of Lading filing",
        "Port-to-port and inland multimodal delivery",
      ],
      transitSpeed: "12 - 25 Days",
    },
    {
      title: "Air Freight",
      slug: "air-freight",
      icon: Plane,
      tag: "Expedited & Charter",
      image: "/images/Stormy-Blue-Hour-Cargo-Ramp.png",
      description:
        "Priority commercial lift, dedicated air charters, and guaranteed flight schedules for time-critical high-value cargo.",
      capabilities: [
        "Next-flight-out (NFO) emergency dispatch",
        "GDP-certified pharmaceutical cold chain",
        "Airport-to-airport and expedited door-to-door delivery",
        "Full and split air charter availability",
      ],
      transitSpeed: "1 - 5 Days",
    },
    {
      title: "Road Freight",
      slug: "road-freight",
      icon: Truck,
      tag: "FTL, LTL & Drayage",
      image: "/images/Cinematic-Twilight-Semi-Truck-Highway.png",
      description:
        "Flexible Full Truckload (FTL) and Less Than Truckload (LTL) ground transport with real-time GPS fleet telemetry and dedicated haulage.",
      capabilities: [
        "Dedicated interstate dry van & flatbed fleet",
        "Port terminal drayage and container de-vanning",
        "Hazardous materials (HAZMAT) certified drivers",
        "Automated electronic proof of delivery (e-POD)",
      ],
      transitSpeed: "2 - 5 Days",
    },
    {
      title: "Warehousing & Fulfillment",
      slug: "warehousing",
      icon: Warehouse,
      tag: "Storage & Distribution",
      image: "/images/Forklift-Navigating-a-Bright-Warehouse-Aisle.png",
      description:
        "Secure bonded storage, high-bay inventory control, temperature-controlled staging, and rapid multi-channel order fulfillment.",
      capabilities: [
        "Bonded customs warehouse staging",
        "Automated high-density pallet racking",
        "Cross-docking and pick-and-pack fulfillment",
        "Real-time WMS cloud inventory portal",
      ],
      transitSpeed: "Same-Day Dispatch",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        eyebrow="Our Capabilities"
        title="Comprehensive freight services built for global reach."
        highlight="Comprehensive freight services"
        description="End-to-end freight, customs brokerage, and supply chain solutions designed for maximum speed, strict compliance, and predictable transit times."
        breadcrumbs={[{ label: "Services" }]}
      />

      {/* Services Grid */}
      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.slug}
                  className="rounded-[22px] border border-line bg-white shadow-soft overflow-hidden flex flex-col justify-between group hover:border-orange-500/50 hover:shadow-lift transition-all duration-300"
                >
                  {/* Photo Header */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-navy-900">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent"
                      aria-hidden="true"
                    />

                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-navy-900 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold shadow-soft">
                      <Icon className="w-4 h-4 text-orange-500" />
                      <span>{service.tag}</span>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-navy-900/90 text-white border border-navy-700 px-3 py-1 rounded text-xs font-mono">
                      Transit: {service.transitSpeed}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-display font-bold text-2xl text-ink mb-3 group-hover:text-orange-500 transition-colors">
                        <Link href={`/services/${service.slug}`} className="focus:outline-none">
                          {service.title}
                        </Link>
                      </h2>
                      <p className="font-sans text-[15px] text-slate-600 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="space-y-2.5 pt-4 border-t border-line">
                        {service.capabilities.map((cap) => (
                          <div key={cap} className="flex items-center gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Links */}
                    <div className="mt-8 pt-6 border-t border-line flex items-center justify-between">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 hover:text-orange-500 transition-colors"
                      >
                        <span>View service specifications</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      <Link href={`/quote?service=${service.slug}`}>
                        <Button variant="primary" className="h-[40px] px-4 text-xs font-semibold">
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Service Standards */}
      <section className="py-16 sm:py-20 bg-sky-50">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-10">
            Included with every shipment across all modes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <Card className="p-6 bg-white border border-line shadow-soft">
              <Clock className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-display font-semibold text-lg text-ink mb-1">
                Live 5-Min Telematics
              </h3>
              <p className="font-sans text-sm text-slate-600">
                Automated satellite GPS milestone tracking and proactive exception alerts sent to your operations team.
              </p>
            </Card>

            <Card className="p-6 bg-white border border-line shadow-soft">
              <ShieldCheck className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-display font-semibold text-lg text-ink mb-1">
                Zero-Loss Protocols
              </h3>
              <p className="font-sans text-sm text-slate-600">
                Verified chain of custody, tamper-evident digital seals, and complete cargo coverage on all transit corridors.
              </p>
            </Card>

            <Card className="p-6 bg-white border border-line shadow-soft">
              <Ship className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-display font-semibold text-lg text-ink mb-1">
                Single Point of Contact
              </h3>
              <p className="font-sans text-sm text-slate-600">
                A dedicated freight coordinator handles booking, documentation, customs entry, and final mile dispatch.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

