import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldCheck, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site";
import {
  Button,
  Eyebrow,
  SectionHeading,
  Card,
  ServiceCard,
  Input,
  StatBlock,
  StepItem,
  Badge,
  Marquee,
} from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Design System & Styleguide",
  description:
    "Single source of truth design tokens, typography, and UI primitives for Your Brand logistics platform.",
};

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const colorTokens = [
    {
      name: "navy-900",
      hex: "#0B1F3A",
      textClass: "text-white",
      bgClass: "bg-navy-900",
      role: "Hero overlay, footer, dark bands",
    },
    {
      name: "navy-700",
      hex: "#12335C",
      textClass: "text-white",
      bgClass: "bg-navy-700",
      role: "Headings on light, hover on dark",
    },
    {
      name: "ocean-600",
      hex: "#1F5F9E",
      textClass: "text-white",
      bgClass: "bg-ocean-600",
      role: "Links, icons, focus ring",
    },
    {
      name: "orange-500",
      hex: "#E8590C",
      textClass: "text-white",
      bgClass: "bg-orange-500",
      role: "Primary CTA, highlight word, key icons",
    },
    {
      name: "orange-600",
      hex: "#C94A08",
      textClass: "text-white",
      bgClass: "bg-orange-600",
      role: "CTA hover and pressed",
    },
    {
      name: "sky-50",
      hex: "#F2F6FB",
      textClass: "text-ink",
      bgClass: "bg-sky-50",
      border: true,
      role: "Alternate section background",
    },
    {
      name: "ink",
      hex: "#0F172A",
      textClass: "text-white",
      bgClass: "bg-ink",
      role: "Headings (light surfaces)",
    },
    {
      name: "slate-600",
      hex: "#475569",
      textClass: "text-white",
      bgClass: "bg-slate-600",
      role: "Body text",
    },
    {
      name: "line",
      hex: "#E2E8F0",
      textClass: "text-ink",
      bgClass: "bg-line",
      border: true,
      role: "Borders, dividers",
    },
    {
      name: "success",
      hex: "#16A34A",
      textClass: "text-white",
      bgClass: "bg-success",
      role: "Delivered status only",
    },
    {
      name: "white",
      hex: "#FFFFFF",
      textClass: "text-ink",
      bgClass: "bg-white",
      border: true,
      role: "Base surface",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Top Banner / System Notice */}
      <div className="border-b border-line bg-sky-50 py-3 px-6 text-sm text-slate-600">
        <div className="max-w-container mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-success inline-block" />
            <span>Design Tokens & UI Primitive Catalog</span>
            <span className="text-slate-600/60">•</span>
            <span className="font-mono text-xs text-navy-700 bg-white px-2 py-0.5 rounded border border-line">
              Brand: {siteConfig.name}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>Inter / Sora / JetBrains Mono</span>
            <span>•</span>
            <span>Section 4 & 5 Verification</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="border-b border-line bg-navy-900 text-white py-14 px-6">
        <div className="max-w-container mx-auto flex flex-col gap-4">
          <Eyebrow className="text-orange-500">Design System Specs</Eyebrow>
          <h1 className="font-display font-bold text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-0.02em] text-white">
            Precision Logistics <span className="text-orange-500">Styleguide</span>
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] text-slate-300 max-w-[65ch] leading-[1.65]">
            Strict implementation of sections 4 and 5 from the Knowledge Base. Every token,
            typography scale, button variant, form input state, card, badge, stat block, step
            item, and marquee strictly adheres to the anti-slop rules.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-container mx-auto px-6 py-16 flex flex-col gap-24">
        {/* ========================================================= */}
        {/* SECTION 1: COLOR TOKENS */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="colors" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 4.1"
            title="Design Tokens: Color Palette"
            highlight="Color Palette"
            description="Navy is the brand. Orange is for action only. Distribution: 60% white & sky-50, 30% navy, 10% orange."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {colorTokens.map((token) => (
              <div
                key={token.name}
                className="rounded-card border border-line overflow-hidden shadow-soft flex flex-col bg-white"
              >
                <div
                  className={`h-28 w-full ${token.bgClass} ${
                    token.border ? "border-b border-line" : ""
                  } p-4 flex flex-col justify-end`}
                >
                  <span
                    className={`font-mono text-xs font-semibold tracking-wider ${token.textClass}`}
                  >
                    {token.hex}
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-1 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-ink">
                      {token.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {token.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-card border border-line p-6 bg-sky-50 flex flex-col gap-3">
            <h4 className="font-display font-semibold text-ink text-[16px]">
              Contrast & Usage Guardrails
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-slate-600">
              <div className="p-3 bg-white rounded-input border border-line">
                <strong className="block text-ink mb-1">Body Text on Light</strong>
                Passes WCAG 4.5:1. Uses <code className="font-mono text-navy-700">slate-600</code> on white/sky-50.
              </div>
              <div className="p-3 bg-white rounded-input border border-line">
                <strong className="block text-ink mb-1">White on Navy</strong>
                High contrast. All headings on <code className="font-mono text-navy-700">navy-900</code> exceed 12:1 ratio.
              </div>
              <div className="p-3 bg-white rounded-input border border-line">
                <strong className="block text-ink mb-1">Orange Accent Rule</strong>
                Reserved strictly for CTAs, single highlighted heading phrase, and small icons.
              </div>
            </div>
          </div>
        </section>
        </Reveal>

        {/* ========================================================= */}
        {/* SECTION 2: TYPOGRAPHY HIERARCHY */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="typography" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 4.3"
            title="Typography Hierarchy & Scales"
            highlight="Hierarchy & Scales"
            description="Loaded via next/font: Sora (headings 600, 700), Inter (body 400, 500, 600), JetBrains Mono (data & tracking)."
          />

          <div className="rounded-card border border-line divide-y divide-line overflow-hidden shadow-soft bg-white">
            {/* H1 */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="w-48 shrink-0 flex flex-col">
                <span className="font-mono text-xs font-semibold text-ocean-600 uppercase">H1 Display</span>
                <span className="font-mono text-xs text-slate-600">clamp(40px, 6vw, 72px) / 700</span>
                <span className="font-mono text-[11px] text-slate-600/70">tracking: -0.02em</span>
              </div>
              <h1 className="font-display font-bold text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-0.02em] text-ink [text-wrap:balance]">
                Where Logistics <span className="text-orange-500">Meets Precision.</span>
              </h1>
            </div>

            {/* H2 */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="w-48 shrink-0 flex flex-col">
                <span className="font-mono text-xs font-semibold text-ocean-600 uppercase">H2 Section</span>
                <span className="font-mono text-xs text-slate-600">clamp(30px, 4vw, 48px) / 700</span>
                <span className="font-mono text-[11px] text-slate-600/70">tracking: -0.015em</span>
              </div>
              <h2 className="font-display font-bold text-[clamp(30px,4vw,48px)] leading-[1.15] tracking-[-0.015em] text-ink [text-wrap:balance]">
                Logistics solutions that <span className="text-orange-500">move you forward.</span>
              </h2>
            </div>

            {/* H3 */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="w-48 shrink-0 flex flex-col">
                <span className="font-mono text-xs font-semibold text-ocean-600 uppercase">H3 Card Title</span>
                <span className="font-mono text-xs text-slate-600">22px - 24px / 600</span>
                <span className="font-mono text-[11px] text-slate-600/70">tracking: -0.01em</span>
              </div>
              <h3 className="font-display font-semibold text-[24px] leading-[1.3] tracking-[-0.01em] text-ink">
                Ocean Freight & Intermodal Transit
              </h3>
            </div>

            {/* Body Large */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="w-48 shrink-0 flex flex-col">
                <span className="font-mono text-xs font-semibold text-ocean-600 uppercase">Body Large</span>
                <span className="font-mono text-xs text-slate-600">18px / 400</span>
                <span className="font-mono text-[11px] text-slate-600/70">line-height: 1.65</span>
              </div>
              <p className="font-sans text-[18px] leading-[1.65] text-slate-600 max-w-[65ch]">
                Fast, secure, end-to-end freight across cities, countries, and continents.
                Dedicated dispatch managers maintain direct oversight of every waypoint.
              </p>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="w-48 shrink-0 flex flex-col">
                <span className="font-mono text-xs font-semibold text-ocean-600 uppercase">Body Standard</span>
                <span className="font-mono text-xs text-slate-600">16px / 400</span>
                <span className="font-mono text-[11px] text-slate-600/70">line-height: 1.65</span>
              </div>
              <p className="font-sans text-[16px] leading-[1.65] text-slate-600 max-w-[65ch]">
                We combine live GPS tracking, a dedicated clearance team, and deep maritime
                route expertise so every shipment reaches its terminal safely and on time.
              </p>
            </div>

            {/* Small */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="w-48 shrink-0 flex flex-col">
                <span className="font-mono text-xs font-semibold text-ocean-600 uppercase">Small / Caption</span>
                <span className="font-mono text-xs text-slate-600">14px / 400</span>
                <span className="font-mono text-[11px] text-slate-600/70">line-height: 1.5</span>
              </div>
              <p className="font-sans text-[14px] leading-[1.5] text-slate-600">
                Container inspection completed at Port of Long Beach Terminal Pier G.
              </p>
            </div>

            {/* Eyebrow */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="w-48 shrink-0 flex flex-col">
                <span className="font-mono text-xs font-semibold text-ocean-600 uppercase">Eyebrow</span>
                <span className="font-mono text-xs text-slate-600">12px - 13px / 600</span>
                <span className="font-mono text-[11px] text-slate-600/70">tracking: 0.12em uppercase</span>
              </div>
              <Eyebrow>Real-Time Tracking & Telematics</Eyebrow>
            </div>

            {/* JetBrains Mono Data */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="w-48 shrink-0 flex flex-col">
                <span className="font-mono text-xs font-semibold text-ocean-600 uppercase">Mono Data</span>
                <span className="font-mono text-xs text-slate-600">JetBrains Mono / 400, 500</span>
                <span className="font-mono text-[11px] text-slate-600/70">tracking IDs & stats</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-mono text-[16px] font-medium text-ink bg-sky-50 px-3 py-1.5 rounded border border-line">
                  LG-2026-004981
                </span>
                <span className="font-mono text-[14px] text-slate-600">
                  ETA: 2026-11-08 14:30 UTC
                </span>
                <span className="font-mono text-[14px] text-slate-600">
                  WEIGHT: 18,450 KG
                </span>
              </div>
            </div>
          </div>
        </section>
        </Reveal>

        {/* ========================================================= */}
        {/* SECTION 3: BUTTON VARIANTS */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="buttons" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 5"
            title="Button Variants & Interactive States"
            highlight="Button Variants"
            description="Variants: primary, secondary, ghost (light/dark), link. Heights: 48px standard, 40px small. 10px radius."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light Surface Buttons */}
            <div className="rounded-card border border-line p-6 bg-white shadow-soft flex flex-col gap-6">
              <h4 className="font-display font-semibold text-ink text-[16px]">
                Light Surface Variants
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Get a Quote</Button>
                <Button variant="secondary">Contact Dispatch</Button>
                <Button variant="ghost">Track Shipment</Button>
                <Button variant="link">View all services</Button>
              </div>

              <div className="border-t border-line pt-4 flex flex-col gap-3">
                <span className="text-xs font-mono text-slate-600 uppercase">
                  Small Size (40px height, 16px padding)
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm">Get a Quote</Button>
                  <Button variant="secondary" size="sm">Contact Dispatch</Button>
                  <Button variant="ghost" size="sm">Track Shipment</Button>
                  <Button variant="link" size="sm">Explore</Button>
                </div>
              </div>

              <div className="border-t border-line pt-4 flex flex-col gap-3">
                <span className="text-xs font-mono text-slate-600 uppercase">
                  Disabled States (50% opacity, no hover)
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" disabled>Get a Quote</Button>
                  <Button variant="secondary" disabled>Contact Dispatch</Button>
                  <Button variant="ghost" disabled>Track Shipment</Button>
                  <Button variant="link" disabled>View all</Button>
                </div>
              </div>
            </div>

            {/* Dark Navy Surface Buttons */}
            <div className="rounded-card border border-navy-700 p-6 bg-navy-900 shadow-soft flex flex-col gap-6 text-white">
              <h4 className="font-display font-semibold text-white text-[16px]">
                Dark Surface (Navy-900) Variants
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Get a Free Quote</Button>
                <Button variant="ghost-white">Track Shipment</Button>
                <Button variant="ghost-white" showArrow={false}>Talk to an Expert</Button>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                <span className="text-xs font-mono text-slate-300 uppercase">
                  Small Size on Dark
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm">Get a Quote</Button>
                  <Button variant="ghost-white" size="sm">Track</Button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                <span className="text-xs font-mono text-slate-300 uppercase">
                  Disabled on Dark
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" disabled>Get a Quote</Button>
                  <Button variant="ghost-white" disabled>Track</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        </Reveal>

        {/* ========================================================= */}
        {/* SECTION 4: FORM INPUT STATES */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="inputs" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 5"
            title="Form Input States & Validation"
            highlight="Input States"
            description="48px height, 8px radius, 1px line border. Label above in 14px 500 weight. Ocean-600 focus ring. Error state in red-600."
          />

          <div className="rounded-card border border-line p-8 bg-white shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Default Idle State */}
              <Input
                label="Full Name"
                placeholder="e.g. Marcus Vance"
                required
              />

              {/* Helper text state */}
              <Input
                label="Pickup Location"
                defaultValue="Port of Long Beach, Pier J"
                helperText="Specify port, postal code, or facility address."
              />

              {/* Error state */}
              <Input
                label="Business Email"
                defaultValue="invalid-email-address"
                error="Please enter a valid commercial email address."
                required
              />

              {/* JetBrains Mono Tracking Input */}
              <Input
                label="Shipment Tracking Number"
                defaultValue="LG-2026-004981"
                isMono
                helperText="Format: LG-YYYY-XXXXXX"
              />

              {/* Disabled state */}
              <Input
                label="Customs Clearance Code"
                defaultValue="CC-EX-88210-LOCKED"
                disabled
                helperText="Assigned automatically upon manifest validation."
              />

              {/* Required field empty */}
              <Input
                label="Delivery Destination"
                placeholder="City, state, or container depot"
                required
              />
            </div>
          </div>
        </section>
        </Reveal>

        {/* ========================================================= */}
        {/* SECTION 5: CARD PRIMITIVES (SERVICE CARDS) */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="cards" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 5"
            title="Service Cards with Image & Navy Gradient Overlay"
            highlight="Service Cards"
            description="4:5 aspect ratio, white 40px icon chip top-left, title and description in white at bottom. Hover: image zoom 1.05 and card lifts 4px with lift shadow."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="Ocean Freight"
              description="Cost-effective container and bulk cargo shipping across global ports."
              imageSrc="/images/service-ocean.jpg"
              imageAlt="Container ship docked at port"
              href="/services/ocean-freight"
            />

            <ServiceCard
              title="Air Freight"
              description="When speed matters, get priority handling and tight flight schedules."
              imageSrc="/images/service-air.jpg"
              imageAlt="Air freight freighter plane loading cargo"
              href="/services/air-freight"
            />

            <ServiceCard
              title="Road Freight"
              description="Flexible FTL and LTL transport with real-time GPS tracking."
              imageSrc="/images/service-road.jpg"
              imageAlt="Commercial transport trucks on expressway"
              href="/services/road-freight"
            />
          </div>

          {/* Standard Content Card Example */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <Card className="p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-ocean-600">
                <ShieldCheck className="w-5 h-5 text-ocean-600" strokeWidth={1.5} />
              </div>
              <h4 className="font-display font-semibold text-[20px] text-ink">
                Bento Feature Card (Default Surface)
              </h4>
              <p className="font-sans text-[15px] text-slate-600 leading-relaxed">
                Standard content card container using 12px radius, 1px line border, and soft shadow at rest, lifting on hover.
              </p>
            </Card>

            <Card variant="flat" className="p-6 bg-sky-50 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-ocean-600 shadow-soft">
                <Clock className="w-5 h-5 text-ocean-600" strokeWidth={1.5} />
              </div>
              <h4 className="font-display font-semibold text-ink text-[20px]">
                Flat Sky-50 Card Surface
              </h4>
              <p className="font-sans text-[15px] text-slate-600 leading-relaxed">
                Used in alternating sections. Clean borderless contrast against white parent surfaces.
              </p>
            </Card>
          </div>
        </section>
        </Reveal>

        {/* ========================================================= */}
        {/* SECTION 6: BADGE PRIMITIVES */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="badges" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 5"
            title="Badge Tokens & Status Variants"
            highlight="Badge Tokens"
            description="Pill shape, 12px 600 weight. Variants: default (navy-900 on sky-50), in-transit (ocean-600), delivered (success), delayed (orange-500)."
          />

          <div className="rounded-card border border-line p-8 bg-white shadow-soft flex flex-wrap items-center gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-slate-600">Default (Section 5)</span>
              <Badge>Real-time tracking</Badge>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-slate-600">In Transit Variant</span>
              <Badge variant="in-transit" showDot>In Transit</Badge>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-slate-600">Delivered Variant</span>
              <Badge variant="delivered" showDot>Delivered</Badge>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-slate-600">Delayed Variant</span>
              <Badge variant="delayed" showDot>Customs Hold (Delayed)</Badge>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-slate-600">Outline Variant</span>
              <Badge variant="outline">ISO 9001 Certified</Badge>
            </div>
          </div>
        </section>
        </Reveal>

        {/* ========================================================= */}
        {/* SECTION 7: STAT BLOCK PRIMITIVES */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="stats" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 5"
            title="StatBlock Metric Rows"
            highlight="StatBlock Metric"
            description="Large numbers in Sora 700 (40px to 56px), labels in slate-600 below. Responsive dividers between blocks on desktop."
          />

          {/* Light Surface Stat Row */}
          <div className="rounded-card border border-line p-4 md:p-8 bg-white shadow-soft">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
              <StatBlock
                value="98%"
                label="On-time delivery"
                sublabel="Across all freight corridors"
                hasDivider
              />
              <StatBlock
                value="29K+"
                label="Active field crew"
                sublabel="Certified freight handlers"
                hasDivider
              />
              <StatBlock
                value="150K"
                label="Tons cargo moved"
                sublabel="Annual consolidated volume"
                hasDivider
              />
              <StatBlock
                value="50+"
                label="Global hub cities"
                sublabel="Direct port connections"
              />
            </div>
          </div>

          {/* Dark Navy Surface Stat Row */}
          <div className="rounded-card border border-navy-700 p-4 md:p-8 bg-navy-900 shadow-soft">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
              <StatBlock
                value="99.4%"
                label="Security compliance"
                sublabel="AEO certified handlers"
                dark
                hasDivider
              />
              <StatBlock
                value="12h"
                label="Average ocean turnaround"
                sublabel="Priority dock clearance"
                dark
                hasDivider
              />
              <StatBlock
                value="139K+"
                label="Commercial clients"
                sublabel="Global enterprise shippers"
                dark
                hasDivider
              />
              <StatBlock
                value="24/7"
                label="Operations dispatch"
                sublabel="Live GPS telematics team"
                dark
              />
            </div>
          </div>
        </section>
        </Reveal>

        {/* ========================================================= */}
        {/* SECTION 8: STEP ITEM (PROCESS STEPS) */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="steps" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 5"
            title="StepItem: Numbered Process Sequence"
            highlight="Numbered Process"
            description="Navy-900 circle with white numeral, title in Sora 600, one line of copy, connected by a 1px dashed line rule."
          />

          {/* Horizontal Desktop Chain */}
          <div className="rounded-card border border-line p-6 md:p-8 bg-white shadow-soft flex flex-col gap-6">
            <span className="text-xs font-mono text-slate-600 uppercase">
              Horizontal Flow (Desktop Layout)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StepItem
                stepNumber={1}
                title="Request a Quote"
                description="Submit route details, freight weight, and cargo type for instant estimation."
              />
              <StepItem
                stepNumber={2}
                title="Plan and Pickup"
                description="Our dispatch crew coordinates origin terminal pickup and container loading."
              />
              <StepItem
                stepNumber={3}
                title="Transit and Tracking"
                description="Live GPS and sensor telematics stream status updates directly to your dashboard."
              />
              <StepItem
                stepNumber={4}
                title="Delivery and Sign-off"
                description="Final destination clearance with digital proof of delivery and manifest archive."
                isLast
              />
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="rounded-card border border-line p-6 md:p-8 bg-white shadow-soft flex flex-col gap-6 max-w-xl">
            <span className="text-xs font-mono text-slate-600 uppercase">
              Vertical Flow (Mobile & Detail Views)
            </span>
            <div className="flex flex-col">
              <StepItem
                orientation="vertical"
                stepNumber={1}
                title="Customs Documentation Review"
                description="Commercial invoice, packing list, and bill of lading validated."
              />
              <StepItem
                orientation="vertical"
                stepNumber={2}
                title="Vessel Loading & Departure"
                description="Cargo container hoisted and secured aboard transatlantic vessel."
              />
              <StepItem
                orientation="vertical"
                stepNumber={3}
                title="Destination Port Arrival"
                description="Customs import clearance and dockside inspection completed."
              />
              <StepItem
                orientation="vertical"
                stepNumber={4}
                title="Final Depot Release"
                description="Delivered to distribution facility with digital receipt."
                isLast
              />
            </div>
          </div>
        </section>
        </Reveal>

        {/* ========================================================= */}
        {/* SECTION 9: MARQUEE TICKER BANDS */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="marquees" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 5"
            title="Marquee Ticker Bands"
            highlight="Marquee Ticker"
            description="Navy-900 or orange-500 full-width bands, uppercase 14px 600 weight with 0.08em tracking, separated by four-point SVG stars. Pauses on hover."
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-slate-600">
                Navy-900 Variant (Hover to pause, 40px/s scroll rate)
              </span>
              <div className="rounded-card overflow-hidden border border-line">
                <Marquee
                  variant="navy"
                  items={siteConfig.servicesMarquee}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-slate-600">
                Orange-500 Variant (Hover to pause, 40px/s scroll rate)
              </span>
              <div className="rounded-card overflow-hidden border border-line">
                <Marquee
                  variant="orange"
                  items={siteConfig.servicesMarquee}
                />
              </div>
            </div>
          </div>
        </section>
        </Reveal>

        {/* ========================================================= */}
        {/* SECTION 10: SECTION HEADING PRIMITIVE DEMO */}
        {/* ========================================================= */}
        <Reveal y={16}>
          <section id="headings" className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Section 5"
            title="SectionHeading Component Variations"
            highlight="SectionHeading Component"
            description="Consistent typographic wrapper supporting eyebrows, one highlighted phrase, and balanced subtitles."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-card border border-line p-8 bg-white shadow-soft">
              <SectionHeading
                eyebrow="Our Services"
                title="Logistics solutions that move you forward."
                highlight="move you forward."
                description="Cost-effective freight forwarding, customs clearance, and supply chain management across 50+ countries."
              />
            </div>

            <div className="rounded-card border border-navy-700 p-8 bg-navy-900 shadow-soft">
              <SectionHeading
                eyebrow="Track Your Shipment"
                title="Where logistics meets real-time clarity."
                highlight="real-time clarity."
                description="Enter your tracking ID for continuous GPS sensor status and checkpoint timestamps."
                dark
              />
            </div>
          </div>
        </section>
        </Reveal>
      </main>

      {/* Footer Note */}
      <footer className="border-t border-line py-8 px-6 bg-sky-50 text-center text-xs text-slate-600 font-mono">
        <p>Your Brand Design Tokens & UI Primitives • Section 12 Steps 1 & 2 Completed</p>
      </footer>
    </div>
  );
}

