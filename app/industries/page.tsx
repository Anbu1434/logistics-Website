import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingBag,
  Factory,
  Activity,
  Apple,
  Car,
  Boxes,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Industries Served",
  description:
    "Tailored logistics and supply chain management for Retail, Manufacturing, Pharma & Healthcare, Cold Chain Food, Automotive, and E-commerce sectors.",
};

export default function IndustriesPage() {
  const industries = [
    {
      id: "retail",
      title: "Retail & Consumer Goods",
      icon: ShoppingBag,
      tag: "Omnichannel Distribution",
      summary:
        "High-velocity supply chains engineered for seasonal demand spikes, omnichannel order staging, and guaranteed delivery windows to major retail distribution centers.",
      features: [
        "Floor-ready merchandise packaging and custom ticketing",
        "EDI-compliant electronic ASN (Advanced Shipping Notice) transmission",
        "Cross-docking and multi-vendor container de-consolidation",
        "Strict appointment scheduling avoiding costly retailer chargebacks",
      ],
    },
    {
      id: "manufacturing",
      title: "Industrial Manufacturing",
      icon: Factory,
      tag: "Just-In-Time (JIT) Supply",
      summary:
        "Time-critical movement of raw materials, industrial sub-assemblies, and heavy equipment ensuring production lines operate without unexpected halts.",
      features: [
        "Direct plant-to-plant heavy haul and specialized flatbed transport",
        "Milestone telemetry monitoring for critical assembly components",
        "Port customs pre-clearance preventing demurrage and production downtime",
        "Oversize, breakbulk, and permitted heavy machinery logistics",
      ],
    },
    {
      id: "pharma",
      title: "Pharmaceuticals & Healthcare",
      icon: Activity,
      tag: "GDP Cold Chain Certified",
      summary:
        "Strict Good Distribution Practice (GDP) compliant transport with active continuous temperature monitoring, dry-ice replenishment, and validated thermal packaging.",
      features: [
        "Validated 2°C–8°C and 15°C–25°C thermal transit environments",
        "Automated NIST-calibrated dataloggers with cloud temperature alarms",
        "Expedited tarmac clearance for temperature-critical biologics and vaccines",
        "Comprehensive chain-of-custody documentation and tamper-evident seals",
      ],
    },
    {
      id: "food",
      title: "Food, Beverage & Cold Chain",
      icon: Apple,
      tag: "Perishables & FSMA Compliant",
      summary:
        "End-to-end refrigerated intermodal transport and bonded cold-storage facilities ensuring freshness and zero temperature excursions from harvest to shelf.",
      features: [
        "Reefer ocean containers with live satellite telematics and atmospheric control",
        "Rapid USDA and FDA port inspection coordination and clearance",
        "Dedicated refrigerated interstate tractor-trailers with pre-cooling protocols",
        "FIFO inventory rotation and fast cross-dock transfer",
      ],
    },
    {
      id: "automotive",
      title: "Automotive Logistics",
      icon: Car,
      tag: "Tier-1 Sequencing",
      summary:
        "Specialized transportation for Tier-1 automotive components, sequenced subassemblies, emergency air charters, and finished vehicle logistics.",
      features: [
        "Synchronized just-in-sequence (JIS) line-side delivery",
        "Emergency Next-Flight-Out (NFO) air charters for plant-critical parts",
        "Reusable packaging and returnable container management",
        "Dedicated team drivers on cross-border North American routes",
      ],
    },
    {
      id: "ecommerce",
      title: "E-Commerce & High-Volume",
      icon: Boxes,
      tag: "Cross-Border Ready",
      summary:
        "High-density fulfillment, multi-node warehouse staging, and fast last-mile injection for cross-border retailers and high-volume brands.",
      features: [
        "Direct injection into regional courier networks for 2-day delivery",
        "Bonded warehouse storage deferring import duty until final retail sale",
        "Automated barcode scanning, kitting, and custom branded packaging",
        "Reverse logistics and streamlined customer returns management",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        eyebrow="Specialized Verticals"
        title="Engineered for the exact way your industry ships."
        highlight="your industry ships."
        description="We tailor handling protocols, customs clearance, and dedicated equipment to meet the strict regulatory and operational demands of your sector."
        breadcrumbs={[{ label: "Industries" }]}
      />

      {/* Industry Detail Cards */}
      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.id}
                  id={ind.id}
                  className="p-8 sm:p-10 rounded-[22px] border border-line bg-white shadow-soft scroll-mt-28"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    {/* Left: Info */}
                    <div className="flex-1 max-w-[680px]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-sky-50 border border-line flex items-center justify-center text-orange-500 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-sky-50 text-slate-700 border border-line">
                          {ind.tag}
                        </span>
                      </div>

                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
                        {ind.title}
                      </h2>
                      <p className="font-sans text-base text-slate-600 leading-relaxed mb-6">
                        {ind.summary}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-line">
                        {ind.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Quick CTA Card */}
                    <div className="lg:w-[320px] shrink-0 p-6 rounded-xl bg-sky-50 border border-line flex flex-col justify-between gap-6">
                      <div>
                        <span className="text-xs text-slate-500 uppercase font-mono font-semibold block mb-1">
                          Industry Coordinator
                        </span>
                        <h3 className="font-display font-bold text-lg text-ink">
                          Talk to an expert in {ind.title.split(" ")[0]}
                        </h3>
                        <p className="font-sans text-xs text-slate-600 mt-2">
                          Get custom rate sheets and route feasibility assessments for your supply chain.
                        </p>
                      </div>

                      <Link href={`/quote?industry=${ind.id}`}>
                        <Button variant="primary" className="w-full h-[44px] text-xs font-semibold">
                          Get Sector Quote
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

      {/* Global Compliance Row */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-4">
            Unified by strict global compliance standards
          </h2>
          <p className="font-sans text-base text-slate-600 max-w-[620px] mx-auto mb-10">
            Regardless of industry, every shipment is handled under ISO 9001 quality systems, tamper-evident digital tracking, and licensed customs brokerage.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/?quote=open">
              <Button variant="primary" className="h-[48px] px-8 text-sm font-semibold">
                Request a Custom Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" showArrow={false} className="h-[48px] px-8 text-sm font-semibold border-navy-900/30 text-navy-900 hover:bg-white">
                Contact Industry Specialist
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

