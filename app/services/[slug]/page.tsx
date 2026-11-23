import * as React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Ship,
  Plane,
  Truck,
  Warehouse,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Accordion } from "@/components/motion/accordion";

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  tag: string;
  transitSpeed: string;
  telemetry: string;
  capacity: string;
  coverage: string;
  features: { title: string; desc: string }[];
  steps: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const SERVICES_REGISTRY: Record<string, ServiceData> = {
  "ocean-freight": {
    title: "Ocean Freight Solutions",
    subtitle: "Global Maritime & Container Shipping",
    description:
      "Cost-effective Full Container Load (FCL) and Less than Container Load (LCL) consolidation across 200+ primary maritime corridors, featuring automated vessel tracking and customs clearance.",
    image: "/images/service-ocean.webp",
    icon: Ship,
    tag: "FCL & LCL Maritime",
    transitSpeed: "12 - 25 Days",
    telemetry: "Satellite AIS every 15 min",
    capacity: "Up to 24,000 TEU per vessel",
    coverage: "200+ Global Commercial Ports",
    features: [
      {
        title: "FCL & LCL Multi-Buyer Consolidation",
        desc: "Optimize shipping spend by booking full containers or shared consolidated pallet space with dedicated container stuffing.",
      },
      {
        title: "Reefer & Climate-Controlled Containers",
        desc: "State-of-the-art refrigerated units with live temperature and humidity telemetry for perishables and pharmaceuticals.",
      },
      {
        title: "Electronic Customs & ISF Filing",
        desc: "Automated 10+2 Importer Security Filing, AMS declarations, and digital Bill of Lading transmission to avoid port holds.",
      },
      {
        title: "Port-to-Door Intermodal Drayage",
        desc: "Seamless terminal drayage and rail ramp connectivity directly to inland distribution centers.",
      },
      {
        title: "Breakbulk & Project Cargo",
        desc: "Dedicated engineering and crane operations for oversized machinery, steel, and industrial infrastructure.",
      },
      {
        title: "Comprehensive Marine Cargo Insurance",
        desc: "All-risk marine cargo coverage protecting your freight against general average, loss, or transit damage.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Booking & Container Allocation",
        desc: "Specify origin, destination, cargo volume, and container type for guaranteed space allocation.",
      },
      {
        step: "02",
        title: "Port Drayage & Stuffing",
        desc: "Cargo is picked up, inspected, and stuffed into containers at our bonded terminal facility.",
      },
      {
        step: "03",
        title: "Vessel Transit & Telematics",
        desc: "Real-time vessel tracking via satellite AIS with scheduled arrival forecasts and weather routing.",
      },
      {
        step: "04",
        title: "Customs Release & Final Delivery",
        desc: "Electronic customs clearance prior to vessel berthing, followed by priority terminal gate-out and delivery.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between FCL and LCL ocean shipping?",
        a: "FCL (Full Container Load) reserves an entire 20ft or 40ft container exclusively for your cargo. LCL (Less than Container Load) consolidates your pallets into a shared container, making it economical for shipments under 15 CBM.",
      },
      {
        q: "When must the Importer Security Filing (ISF 10+2) be submitted?",
        a: "U.S. Customs requires ISF filing at least 24 hours prior to cargo loading onto the vessel at the foreign port of departure. Our operations team files this electronically as part of standard booking.",
      },
      {
        q: "Can I ship temperature-sensitive products via ocean freight?",
        a: "Yes. Our refrigerated container fleet (Reefers) maintains temperatures ranging from -30°C to +30°C with automated datalogging and alerts.",
      },
    ],
  },
  "air-freight": {
    title: "Air Freight Forwarding",
    subtitle: "High-Speed Priority Global Air Cargo",
    description:
      "When speed matters, our priority commercial lift, dedicated air charters, and guaranteed flight schedules ensure your urgent cargo reaches its global destination on time.",
    image: "/images/service-air.webp",
    icon: Plane,
    tag: "Expedited Air Cargo",
    transitSpeed: "1 - 5 Days",
    telemetry: "Flight radar telemetry",
    capacity: "Palletized & full freighter charters",
    coverage: "300+ International Airports",
    features: [
      {
        title: "Next Flight Out (NFO) Priority",
        desc: "Immediate pickup and placement on the earliest commercial departure for mission-critical parts and medical shipments.",
      },
      {
        title: "Full & Split Freighter Charters",
        desc: "Dedicated Boeing 747/777 freighter charters for outsized machinery or urgent high-volume seasonal inventory.",
      },
      {
        title: "GDP-Certified Cold Chain Staging",
        desc: "Temperature-controlled airport tarmac handling with thermal blankets, dry ice replenishment, and continuous data loggers.",
      },
      {
        title: "Dangerous Goods (HAZMAT) Certified",
        desc: "IATA-certified specialists managing packaging, labeling, and documentation for chemical and lithium battery shipments.",
      },
      {
        title: "Airport-to-Door White Glove Service",
        desc: "Fast customs clearance and dedicated sprinter van dispatch for direct final-mile facility drop-off.",
      },
      {
        title: "Consolidated Air Freight",
        desc: "Scheduled weekly air consolidations offering premium speed at balanced market freight rates.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Immediate Space Confirmation",
        desc: "Flight allocation locked with tier-1 airline partners within 45 minutes of booking request.",
      },
      {
        step: "02",
        title: "Tarmac Transfer & Screening",
        desc: "TSA security screening, pallet buildup (ULD), and secure ramp transfer directly to the aircraft.",
      },
      {
        step: "03",
        title: "Flight Transit & Pre-Clearance",
        desc: "Real-time flight telematics while destination customs entry is filed mid-air.",
      },
      {
        step: "04",
        title: "Expedited De-Consolidation & Drop",
        desc: "Immediate airport recovery upon touchdown and final direct delivery to your receiver.",
      },
    ],
    faqs: [
      {
        q: "How is chargeable weight calculated for air freight?",
        a: "Air freight uses volumetric weight (Length x Width x Height in cm / 6000). The chargeable weight is the greater of actual gross weight or volumetric weight.",
      },
      {
        q: "How fast can you arrange an emergency air charter?",
        a: "Our global aircraft charter desk operates 24/7 and can position an aircraft and arrange flight permits within 4 to 6 hours.",
      },
      {
        q: "Can you handle lithium batteries under air transport?",
        a: "Yes. Our IATA-certified dangerous goods team prepares Section IA/IB/II declarations and UN-rated packaging in compliance with current ICAO technical instructions.",
      },
    ],
  },
  "road-freight": {
    title: "Road Freight & Haulage",
    subtitle: "Over-the-Road Interstate & Regional Transport",
    description:
      "Flexible Full Truckload (FTL) and Less Than Truckload (LTL) ground transport with real-time GPS fleet telemetry, port drayage, and dedicated regional haulage.",
    image: "/images/service-road.webp",
    icon: Truck,
    tag: "FTL, LTL & Drayage",
    transitSpeed: "2 - 5 Days",
    telemetry: "Live 5-min GPS beacons",
    capacity: "Dry van, reefer & flatbed",
    coverage: "Nationwide & cross-border lanes",
    features: [
      {
        title: "Full Truckload (FTL) Dedicated Haul",
        desc: "Exclusive trailer use with non-stop point-to-point transit, minimizing handling and maximizing delivery speed.",
      },
      {
        title: "Optimized LTL Freight Networks",
        desc: "Consolidated freight lanes for 1 to 6 pallets with automated terminal cross-docking.",
      },
      {
        title: "Intermodal Rail Ramp & Port Drayage",
        desc: "Fast ocean container turnaround and chassis positioning at major maritime terminals.",
      },
      {
        title: "Climate-Controlled Reefer Trailers",
        desc: "Continuous temperature monitoring for refrigerated foods, pharmaceuticals, and temperature-sensitive chemicals.",
      },
      {
        title: "Electronic Proof of Delivery (e-POD)",
        desc: "Instant digital signatures, photos, and time-stamped delivery receipts accessible from your client dashboard.",
      },
      {
        title: "Heavy Haul & Specialized Flatbed",
        desc: "Step-deck, RGN, and permitted oversize transport for heavy industrial and construction equipment.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Dispatch & Equipment Assignment",
        desc: "Dedicated driver and tractor-trailer assigned based on freight weight and handling requirements.",
      },
      {
        step: "02",
        title: "Origin Loading & Verification",
        desc: "Driver inspects cargo, applies tamper-evident security seal, and records initial bill of lading.",
      },
      {
        step: "03",
        title: "Express Highway Transit",
        desc: "Continuous telematics tracking with geofence notifications along optimized highway routes.",
      },
      {
        step: "04",
        title: "Delivery Sign-Off & e-POD",
        desc: "Receiver digital sign-off and instant document generation sent to shipper within minutes.",
      },
    ],
    faqs: [
      {
        q: "What is your coverage area for road freight?",
        a: "We provide nationwide 48-state interstate coverage in the US, plus cross-border transport into Canada and Mexico.",
      },
      {
        q: "Do your trucks have live GPS tracking?",
        a: "Yes. Every tractor and trailer is equipped with live satellite GPS beacons updating coordinates every 5 minutes.",
      },
      {
        q: "Can you provide liftgate service for facilities without loading docks?",
        a: "Yes. We offer hydraulic liftgate trailers and pallet jack delivery for retail locations and ground-level facilities.",
      },
    ],
  },
  "warehousing": {
    title: "Warehousing & Fulfillment",
    subtitle: "Bonded Storage, Staging & Distribution",
    description:
      "Secure bonded storage, high-bay inventory control, temperature-controlled staging, and rapid multi-channel order fulfillment across strategic logistics corridors.",
    image: "/images/service-warehouse.webp",
    icon: Warehouse,
    tag: "Bonded Logistics Hub",
    transitSpeed: "Same-Day Fulfillment",
    telemetry: "Real-time WMS cloud inventory",
    capacity: "500,000+ sq ft high-bay storage",
    coverage: "Multi-node distribution hubs",
    features: [
      {
        title: "Bonded Customs Storage",
        desc: "Defer duty and tax payments while inventory is staged securely within our certified bonded warehouse facilities.",
      },
      {
        title: "High-Bay Pallet Racking",
        desc: "High-density automated racking with barcode-verified bin tracking and FIFO inventory rotation.",
      },
      {
        title: "Cross-Docking & Transloading",
        desc: "Fast container devanning and direct cargo transloading onto outbound highway trailers within 4 hours.",
      },
      {
        title: "Pick, Pack & Kitting",
        desc: "Custom packaging, labeling, barcode generation, and multi-item assembly for commercial distributors.",
      },
      {
        title: "Temperature-Controlled Storage",
        desc: "Validated 15°C–25°C ambient and 2°C–8°C cold rooms with backup generator redundancy.",
      },
      {
        title: "Cloud Warehouse Management System",
        desc: "Direct API integration into your ERP/e-commerce platform for live inventory visibility and automated order injection.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Inbound Receiving & Inspection",
        desc: "Containers or trailers unloaded, count-verified against packing lists, and palletized.",
      },
      {
        step: "02",
        title: "Barcode Labeling & Putaway",
        desc: "Every pallet scanned and assigned an optimized racking slot in our digital warehouse map.",
      },
      {
        step: "03",
        title: "Real-Time Cloud Inventory",
        desc: "Stock levels update instantly in your dashboard with automated reorder alerts.",
      },
      {
        step: "04",
        title: "Order Picking & Outbound Dispatch",
        desc: "Same-day order picking, custom labeling, and handover to line-haul carriers.",
      },
    ],
    faqs: [
      {
        q: "What is a bonded warehouse and how does it save on duties?",
        a: "A bonded warehouse is a secured area where imported goods can be stored, handled, or undergo manufacturing operations without payment of duty until goods are released for domestic consumption.",
      },
      {
        q: "Can your warehouse system integrate with our ERP?",
        a: "Yes. Our cloud WMS supports direct REST APIs and EDI integrations (EDI 856, 940, 945) with SAP, Oracle, NetSuite, and Shopify.",
      },
      {
        q: "What security measures protect stored inventory?",
        a: "Facilities operate 24/7 CCTV surveillance, biometric badge access control, laser perimeter security, and dry-pipe fire suppression.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return [
    { slug: "ocean-freight" },
    { slug: "air-freight" },
    { slug: "road-freight" },
    { slug: "warehousing" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = SERVICES_REGISTRY[params.slug];
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title}`,
    description: service.description,
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = SERVICES_REGISTRY[params.slug];
  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        eyebrow={service.tag}
        title={service.title}
        highlight={service.title.split(" ")[0]}
        description={service.subtitle}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Hero Overview Bar */}
      <section className="py-14 border-b border-line bg-sky-50">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Transit Speed", value: service.transitSpeed },
              { label: "Telemetry Monitoring", value: service.telemetry },
              { label: "Equipment Capacity", value: service.capacity },
              { label: "Global Network", value: service.coverage },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 60} y={12}>
                <div className="h-full p-4 bg-white rounded-xl border border-line shadow-soft">
                  <span className="text-xs text-slate-500 block mb-1">{stat.label}</span>
                  <span className="font-display font-bold text-lg text-ink block">{stat.value}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Overview & Image */}
      <section className="py-16 sm:py-24 border-b border-line bg-white">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <ImageReveal
              direction="left"
              duration={800}
              className="lg:col-span-6 relative aspect-[4/3] rounded-[22px] overflow-hidden border border-line shadow-soft bg-navy-900"
            >
              <div className="relative h-full w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </ImageReveal>

            <div className="lg:col-span-6 flex flex-col gap-6">
              <Reveal y={12}>
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-line flex items-center justify-center text-orange-500">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
              </Reveal>
              <Reveal
                as="h2"
                delay={60}
                y={16}
                className="font-display font-bold text-3xl sm:text-4xl text-ink leading-tight"
              >
                Engineered for speed, compliance, and guaranteed reliability.
              </Reveal>
              <Reveal
                as="p"
                delay={120}
                y={12}
                className="font-sans text-base text-slate-600 leading-relaxed"
              >
                {service.description}
              </Reveal>
              <Reveal delay={180} y={12} className="pt-2">
                <Link href={`/quote?service=${params.slug}`}>
                  <Button variant="primary" className="h-[48px] px-8 text-sm font-semibold">
                    Request a {service.title.split(" ")[0]} Quote
                  </Button>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 sm:py-24 border-b border-line bg-sky-50">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-[640px] mb-12 sm:mb-16">
            <Reveal as="span" y={8} className="block text-orange-500 font-bold uppercase tracking-wider text-xs">
              Service Scope
            </Reveal>
            <Reveal as="h2" delay={60} y={16} className="font-display font-bold text-3xl text-ink mt-2">
              What is included in our {service.title}
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat, index) => (
              <Reveal key={feat.title} delay={index * 60} y={16} className="h-full">
                <Card className="h-full p-6 bg-white border border-line shadow-soft flex flex-col justify-between">
                  <div>
                    <CheckCircle2 className="w-6 h-6 text-orange-500 mb-3" aria-hidden="true" />
                    <h3 className="font-display font-semibold text-lg text-ink mb-2">
                      {feat.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works / 4-Step Pipeline */}
      <section className="py-16 sm:py-24 border-b border-line bg-white">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-[640px] mb-12 sm:mb-16">
            <Reveal as="span" y={8} className="block text-orange-500 font-bold uppercase tracking-wider text-xs">
              Operational Process
            </Reveal>
            <Reveal as="h2" delay={60} y={16} className="font-display font-bold text-3xl text-ink mt-2">
              How it works from request to delivery
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.steps.map((st, index) => (
              <Reveal key={st.step} delay={index * 70} y={16} className="h-full">
                <div className="h-full p-6 rounded-[20px] border border-line bg-sky-50 flex flex-col justify-between">
                  <div>
                    <span className="font-mono font-bold text-2xl text-orange-500 block mb-3">
                      {st.step}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-ink mb-2">
                      {st.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-24 border-b border-line bg-sky-50">
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Reveal as="span" y={8} className="block text-orange-500 font-bold uppercase tracking-wider text-xs">
              Knowledge Base
            </Reveal>
            <Reveal as="h2" delay={60} y={16} className="font-display font-bold text-3xl text-ink mt-2">
              Frequently Asked Questions
            </Reveal>
          </div>

          <Reveal y={16}>
            <Accordion
              items={service.faqs.map((faq) => ({
                question: faq.q,
                answer: faq.a,
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <Reveal as="h2" y={16} className="font-display font-bold text-3xl sm:text-4xl text-white">
            Ready to book your next shipment?
          </Reveal>
          <Reveal as="p" delay={60} y={12} className="font-sans text-base text-slate-300 max-w-[560px]">
            Speak with our logistics coordinators today to receive a guaranteed rate quote.
          </Reveal>
          <Reveal delay={120} y={12} className="flex flex-col sm:flex-row gap-4">
            <Link href={`/quote?service=${params.slug}`}>
              <Button variant="primary" className="h-[48px] px-8 text-sm font-semibold">
                Get an Instant Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" showArrow={false} className="h-[48px] px-8 text-sm font-semibold border-white/30 text-white hover:bg-white/10">
                Contact Operations
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

