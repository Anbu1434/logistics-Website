import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StatBlock } from "@/components/ui/stat-block";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our mission, leadership team, ISO certifications, and decade-long history of delivering precision supply chain solutions.",
};

export default function AboutPage() {
  const milestones = [
    {
      year: "2014",
      title: "Company Founded",
      description:
        "Started with trans-Pacific ocean freight forwarding and bonded customs brokerage in Long Beach.",
    },
    {
      year: "2018",
      title: "Air & Intermodal Expansion",
      description:
        "Launched scheduled air charters and temperature-controlled cross-country trucking corridors.",
    },
    {
      year: "2022",
      title: "Satellite Telematics Rollout",
      description:
        "Introduced automated 5-minute GPS beacon tracking, electronic bills of lading, and API integration.",
    },
    {
      year: "2026",
      title: "50+ Global Hub Network",
      description:
        "Operating connected maritime terminals, bonded high-bay warehouses, and direct multimodal routes across 30+ nations.",
    },
  ];

  const leadership = [
    {
      name: "Marcus Vance",
      role: "Chief Executive Officer",
      bio: "22+ years overseeing international container shipping lines and port infrastructure development.",
      image: "/images/avatar-1.jpg",
    },
    {
      name: "Sarah Lin",
      role: "VP of Global Logistics",
      bio: "Specializes in multimodal route optimization, customs compliance, and supply chain continuity.",
      image: "/images/avatar-2.jpg",
    },
    {
      name: "David Morales",
      role: "Head of Operational Fleet",
      bio: "Directs highway operations, carrier network alliances, and GDP-certified cold chain safety.",
      image: "/images/avatar-3.jpg",
    },
  ];

  const certifications = [
    { title: "ISO 9001:2015", subtitle: "Quality Management Certified" },
    { title: "IATA Cargo Agent", subtitle: "International Air Transport Association" },
    { title: "AEO Certified", subtitle: "Authorized Economic Operator Tier 1" },
    { title: "GDP Compliant", subtitle: "Good Distribution Practice (Pharma)" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        eyebrow="Company Overview"
        title="Engineering certainty across global supply chains."
        highlight="Engineering certainty"
        description="We combine satellite telematics, dedicated ground coordinators, and deep international route expertise so every shipment arrives securely on schedule."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Story & Mission Section */}
      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Port Photography */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-[20px] overflow-hidden border border-line shadow-soft">
              <Image
                src="/images/about-port.webp"
                alt="Container port operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6 bg-navy-900/90 text-white backdrop-blur-md px-5 py-3 rounded-xl border border-navy-700">
                <span className="font-display font-bold text-xl block">98% On-Time</span>
                <span className="text-xs text-slate-300">Verified Maritime & Air Corridors</span>
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">
                Our Mission & Story
              </span>
              <h2 className="font-display font-bold text-[28px] sm:text-[36px] text-ink leading-tight">
                Built to eliminate delays, opacity, and supply chain fragmentation.
              </h2>
              <p className="font-sans text-[16px] text-slate-600 leading-relaxed">
                Founded on the principle that precision scheduling shouldn&apos;t be an exception in global freight,
                we engineered a modern logistics network integrating live satellite telemetry with seasoned terminal coordinators.
              </p>
              <p className="font-sans text-[16px] text-slate-600 leading-relaxed">
                Whether routing urgent air freight across transatlantic flight corridors or managing full container loads through busy maritime straits, our dedicated team ensures regulatory compliance, clear visibility, and zero guesswork.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-line">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm font-semibold text-ink">Zero-Loss Cargo Protocols</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm font-semibold text-ink">24/7 Global Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-sky-50 border-b border-line">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatBlock value="29K+" label="Specialists & Crew" hasDivider />
            <StatBlock value="150K" label="Tons Moved Annually" hasDivider />
            <StatBlock value="139K+" label="Active Enterprise Shippers" hasDivider />
            <StatBlock value="50+" label="Global Hub Cities" />
          </div>
        </div>
      </section>

      {/* Timeline of Milestones */}
      <section className="py-16 sm:py-24 border-b border-line bg-white">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-[640px] mb-12 sm:mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">
              Operational Growth
            </span>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] text-ink mt-2">
              A decade of continuous innovation.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item) => (
              <Card key={item.year} className="p-6 bg-white border border-line shadow-soft flex flex-col justify-between">
                <div>
                  <span className="font-display font-bold text-3xl text-orange-500 block mb-2">
                    {item.year}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 sm:py-24 border-b border-line bg-sky-50">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-[640px] mb-12 sm:mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">
              Leadership
            </span>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] text-ink mt-2">
              Guided by veteran logistics leaders.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {leadership.map((person) => (
              <Card key={person.name} className="p-6 sm:p-7 bg-white border border-line shadow-soft flex flex-col justify-between">
                <div>
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-5 border-2 border-orange-500/20">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display font-bold text-xl text-ink">
                    {person.name}
                  </h3>
                  <span className="text-xs font-semibold text-orange-600 block mb-3">
                    {person.role}
                  </span>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">
            Compliance & Standards
          </span>
          <h2 className="font-display font-bold text-[28px] sm:text-[36px] text-ink mt-2 mb-10">
            Certified for international trade compliance.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-5 rounded-xl border border-line bg-sky-50 flex flex-col items-center text-center justify-center gap-1"
              >
                <Award className="w-6 h-6 text-orange-500 mb-1" />
                <span className="font-display font-bold text-ink text-base">
                  {cert.title}
                </span>
                <span className="text-xs text-slate-500">
                  {cert.subtitle}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-14 inline-block">
            <Link href="/?quote=open">
              <Button variant="primary" className="h-[48px] px-8 text-sm font-semibold">
                Get a Quote for Your Freight
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

