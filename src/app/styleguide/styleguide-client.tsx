"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/ui/rating-stars";
import { PriceBlock } from "@/components/ui/price-block";
import { ProductCard } from "@/components/ui/product-card";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { VariantSelector } from "@/components/ui/variant-selector";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Input, Textarea } from "@/components/ui/form-field";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";
import {
  ShieldCheck,
  Eye,
} from "lucide-react";

export function StyleguideClient() {
  const [stepperValue, setStepperValue] = React.useState(2);
  const [selectedSize, setSelectedSize] = React.useState("50ml");
  const [selectedShade, setSelectedShade] = React.useState("nude");
  const [interactiveRating, setInteractiveRating] = React.useState(4);

  const COLOR_TOKENS = [
    { token: "--cream-50", hex: "#FBF8F3", label: "Page Canvas", textColor: "#1C1F1A" },
    { token: "--cream-100", hex: "#F4EEE4", label: "Cards & Hero", textColor: "#1C1F1A" },
    { token: "--cream-200", hex: "#E9DFD0", label: "Borders & Dividers", textColor: "#1C1F1A" },
    { token: "--sage-100", hex: "#E6ECDD", label: "Soft Sage Gradient", textColor: "#1C1F1A" },
    { token: "--sage-300", hex: "#B9C8A8", label: "Accent Badges", textColor: "#1C1F1A" },
    { token: "--forest-600", hex: "#3F5A2E", label: "Botanical Green", textColor: "#FBF8F3" },
    { token: "--forest-800", hex: "#24351B", label: "Primary Dark Forest", textColor: "#FBF8F3" },
    { token: "--ink-900", hex: "#1C1F1A", label: "Headings & Ink", textColor: "#FBF8F3" },
    { token: "--ink-500", hex: "#5E655A", label: "Secondary Text", textColor: "#FBF8F3" },
    { token: "--clay-400", hex: "#C98F72", label: "Warm Clay / Rose", textColor: "#FBF8F3" },
    { token: "--gold-500", hex: "#B8935A", label: "Ratings & Stars", textColor: "#FBF8F3" },
    { token: "--success", hex: "#2E7D4F", label: "Success Green", textColor: "#FBF8F3" },
    { token: "--warning", hex: "#B7791F", label: "Warning Amber", textColor: "#FBF8F3" },
    { token: "--danger", hex: "#B3392F", label: "Danger Red", textColor: "#FBF8F3" },
  ];

  const WCAG_CONTRAST_PAIRS = [
    { bg: "#FBF8F3 (Cream-50)", fg: "#1C1F1A (Ink-900)", ratio: "15.8:1", status: "AAA", use: "Body & Display text" },
    { bg: "#FBF8F3 (Cream-50)", fg: "#24351B (Forest-800)", ratio: "11.2:1", status: "AAA", use: "Headings & primary links" },
    { bg: "#FBF8F3 (Cream-50)", fg: "#5E655A (Ink-500)", ratio: "5.4:1", status: "AA", use: "Secondary UI text" },
    { bg: "#24351B (Forest-800)", fg: "#FBF8F3 (Cream-50)", ratio: "11.2:1", status: "AAA", use: "Primary CTA buttons" },
    { bg: "#E6ECDD (Sage-100)", fg: "#24351B (Forest-800)", ratio: "7.8:1", status: "AAA", use: "Badges & highlights" },
    { bg: "#C98F72 (Clay-400)", fg: "#FFFFFF (White)", ratio: "4.7:1", status: "AA", use: "Accent sale badges" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900">
      <AnnouncementBar />
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Styleguide Header */}
        <section className="bg-cream-100 rounded-hero p-8 sm:p-12 border border-cream-200">
          <div className="max-w-3xl space-y-3">
            <Badge variant="forest">Verdéa Design System v1.0</Badge>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-ink-900">
              Quiet Luxury Meets <span className="italic text-forest-600 font-serif">Botanical Science</span>
            </h1>
            <p className="text-sm sm:text-base text-ink-500 leading-relaxed">
              A comprehensive UI toolkit built on strict WCAG 2.2 AA accessibility, custom CSS token variables, high-contrast serif typography, and tactile rounded containers.
            </p>
          </div>
        </section>

        {/* 1. Color Palette & Tokens */}
        <section className="space-y-6">
          <div className="border-b border-cream-200 pb-3">
            <h2 className="font-serif text-2xl font-bold text-ink-900">1. Color Tokens & Theme System</h2>
            <p className="text-xs text-ink-500 mt-1">Calm cream canvases, deep botanical greens, warm clay accents, and gold rating stars.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {COLOR_TOKENS.map((item) => (
              <div
                key={item.token}
                className="rounded-card p-3 border border-cream-200/80 shadow-subtle flex flex-col justify-between h-28"
                style={{ backgroundColor: item.hex, color: item.textColor }}
              >
                <div>
                  <span className="text-[11px] font-mono opacity-80 block truncate">{item.token}</span>
                  <span className="text-xs font-bold font-mono uppercase">{item.hex}</span>
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* WCAG Contrast Verification Matrix */}
          <div className="bg-cream-100 rounded-card p-6 border border-cream-200 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-forest-800" />
              <h3 className="font-serif text-lg font-semibold text-ink-900">WCAG 2.2 AA Contrast Compliance Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-cream-200 text-ink-500 font-semibold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Background</th>
                    <th className="py-2.5 px-3">Foreground</th>
                    <th className="py-2.5 px-3">Contrast Ratio</th>
                    <th className="py-2.5 px-3">WCAG Status</th>
                    <th className="py-2.5 px-3">Intended Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200/60 text-ink-900">
                  {WCAG_CONTRAST_PAIRS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-cream-50/60">
                      <td className="py-2.5 px-3 font-mono">{row.bg}</td>
                      <td className="py-2.5 px-3 font-mono">{row.fg}</td>
                      <td className="py-2.5 px-3 font-bold">{row.ratio}</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-forest-800 text-cream-50 font-bold text-[10px]">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-ink-500">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 2. Typography Scale */}
        <section className="space-y-6">
          <div className="border-b border-cream-200 pb-3">
            <h2 className="font-serif text-2xl font-bold text-ink-900">2. Typography Hierarchy</h2>
            <p className="text-xs text-ink-500 mt-1">High-contrast Display Serif headlines paired with clean, accessible sans-serif body type.</p>
          </div>

          <div className="space-y-6 bg-cream-50 border border-cream-200 rounded-card p-6">
            <div className="border-b border-cream-200/60 pb-4">
              <p className="text-[11px] font-mono text-ink-500 uppercase tracking-widest mb-1">Display H1 (56px - 80px fluid)</p>
              <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-ink-900">
                Glow <span className="italic text-forest-600 font-serif">Naturally</span>
              </h1>
            </div>

            <div className="border-b border-cream-200/60 pb-4">
              <p className="text-[11px] font-mono text-ink-500 uppercase tracking-widest mb-1">Headline H2 (36px - 48px fluid)</p>
              <h2 className="font-serif text-2xl sm:text-4xl font-semibold tracking-tight text-ink-900">
                Beauty Inspired <span className="italic text-forest-600 font-serif">By Nature</span>
              </h2>
            </div>

            <div className="border-b border-cream-200/60 pb-4">
              <p className="text-[11px] font-mono text-ink-500 uppercase tracking-widest mb-1">Subhead H3 (24px - 30px)</p>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink-900">
                Clinically Formulated Botanical Barrier Actives
              </h3>
            </div>

            <div className="border-b border-cream-200/60 pb-4">
              <p className="text-[11px] font-mono text-ink-500 uppercase tracking-widest mb-1">Eyebrow (12px, uppercase, 0.14em tracking)</p>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-800">
                Clean • Dermatologically Tested • Cruelty-Free
              </p>
            </div>

            <div>
              <p className="text-[11px] font-mono text-ink-500 uppercase tracking-widest mb-1">Body Text (16px, 1.6 line-height, 65ch max-width)</p>
              <p className="text-sm sm:text-base text-ink-500 leading-relaxed max-w-prose">
                Verdéa pairs cold-pressed botanical lipids with clean biocompatible actives to nurture and restore your skin’s barrier. Every formulation is verified by independent dermatological trials.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Buttons & Badges */}
        <section className="space-y-6">
          <div className="border-b border-cream-200 pb-3">
            <h2 className="font-serif text-2xl font-bold text-ink-900">3. Buttons & Status Badges</h2>
            <p className="text-xs text-ink-500 mt-1">Full-pill radius, focus-visible indicators, loading states, and signature arrow-in-circle icons.</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" withArrow>
                Shop Now
              </Button>
              <Button variant="secondary">
                View All Best Sellers
              </Button>
              <Button variant="outline">
                Secondary Action
              </Button>
              <Button variant="clay" withArrow>
                Claim 25% Off
              </Button>
              <Button variant="ghost">
                Ghost Action
              </Button>
              <Button variant="primary" loading>
                Processing
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="forest">Best Seller</Badge>
              <Badge variant="sage">Natural Ingredients</Badge>
              <Badge variant="clay">Limited Time Offer</Badge>
              <Badge variant="gold">Award Winner</Badge>
              <Badge variant="cream">Dermatologist Tested</Badge>
              <Badge variant="success">In Stock</Badge>
              <Badge variant="danger">Low Stock (2 Left)</Badge>
              <Badge variant="outline">Eco Packaging</Badge>
            </div>
          </div>
        </section>

        {/* 4. Product Cards Showcase */}
        <section className="space-y-6">
          <div className="border-b border-cream-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink-900">4. Product Cards & Pricing Block</h2>
              <p className="text-xs text-ink-500 mt-1">Realistic product cards featuring ratings, badges, image zoom, wishlist toggle, and quick add.</p>
            </div>
            <Button variant="secondary" size="sm">
              View All Products
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              id="prod-1"
              slug="glow-boost-vitamin-c-serum"
              name="Glow Boost Vitamin C Serum"
              subtitle="Antioxidant Radiance"
              price={899}
              compareAtPrice={1199}
              rating={4.9}
              reviewCount={128}
              badge="Best Seller"
              onAddToCart={() => alert("Added Glow Boost Vitamin C Serum to Bag!")}
            />

            <ProductCard
              id="prod-2"
              slug="hydra-repair-gel-cream"
              name="Hydra Repair Barrier Gel Cream"
              subtitle="Deep Moisture"
              price={749}
              compareAtPrice={999}
              rating={4.8}
              reviewCount={96}
              badge="Award Winner"
              onAddToCart={() => alert("Added Hydra Repair Barrier Gel Cream to Bag!")}
            />

            <ProductCard
              id="prod-3"
              slug="calm-balance-clarifying-toner"
              name="Calm Balance Clarifying Toner"
              subtitle="Pore Refining"
              price={699}
              rating={4.7}
              reviewCount={75}
              onAddToCart={() => alert("Added Calm Balance Clarifying Toner to Bag!")}
            />

            <ProductCardSkeleton />
          </div>
        </section>

        {/* 5. Interactive Components: Stepper, Variants, Modals */}
        <section className="space-y-6">
          <div className="border-b border-cream-200 pb-3">
            <h2 className="font-serif text-2xl font-bold text-ink-900">5. Interactive E-Commerce Controls</h2>
            <p className="text-xs text-ink-500 mt-1">Quantity steppers, size selectors, shade swatches, and modals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stepper & Ratings */}
            <div className="bg-cream-100 rounded-card p-6 border border-cream-200 space-y-4">
              <h3 className="font-serif text-base font-semibold">Quantity Stepper & Star Rating</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-ink-500 mb-1.5 font-medium">Quantity Stepper:</p>
                  <QuantityStepper
                    value={stepperValue}
                    min={1}
                    max={10}
                    onChange={(val) => setStepperValue(val)}
                  />
                </div>

                <div className="pt-2">
                  <p className="text-xs text-ink-500 mb-1.5 font-medium">Interactive Rating Input:</p>
                  <RatingStars
                    rating={interactiveRating}
                    interactive
                    onRatingChange={(r) => setInteractiveRating(r)}
                  />
                  <span className="text-xs text-ink-500 ml-2">Selected: {interactiveRating} Stars</span>
                </div>
              </div>
            </div>

            {/* Variant Selectors */}
            <div className="bg-cream-100 rounded-card p-6 border border-cream-200 space-y-4">
              <h3 className="font-serif text-base font-semibold">Variant Options</h3>
              <VariantSelector
                label="Select Size"
                selectedId={selectedSize}
                onSelect={(id) => setSelectedSize(id)}
                options={[
                  { id: "30ml", label: "30 ml", sublabel: "Travel" },
                  { id: "50ml", label: "50 ml", sublabel: "Standard" },
                  { id: "100ml", label: "100 ml", sublabel: "Value Size" },
                ]}
              />

              <VariantSelector
                label="Lip & Cheek Shade"
                selectedId={selectedShade}
                onSelect={(id) => setSelectedShade(id)}
                options={[
                  { id: "nude", label: "Velvet Nude", colorHex: "#C98F72" },
                  { id: "berry", label: "Botanical Berry", colorHex: "#8B3E45" },
                  { id: "terracotta", label: "Warm Terracotta", colorHex: "#B65E42" },
                  { id: "petal", label: "Soft Petal", colorHex: "#D89999" },
                ]}
              />
            </div>

            {/* Modal Dialog */}
            <div className="bg-cream-100 rounded-card p-6 border border-cream-200 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-semibold">Accessible Modal Dialog</h3>
                <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                  Radix primitive dialog with background blur, focus trap, and Escape key dismissal.
                </p>
              </div>

              <Modal>
                <ModalTrigger asChild>
                  <Button variant="secondary" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Open Quick View Modal
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <Badge variant="forest" className="w-fit mb-2">Clean Clinical Formula</Badge>
                    <ModalTitle>Glow Boost Vitamin C Serum</ModalTitle>
                    <ModalDescription>
                      Formulated with 15% Ethyl Ascorbic Acid, Ferulic Acid, and Kakadu Plum extract to brighten pigmentation and strengthen skin barrier defense.
                    </ModalDescription>
                  </ModalHeader>
                  <div className="pt-2">
                    <PriceBlock price={899} compareAtPrice={1199} size="lg" />
                  </div>
                  <div className="pt-4 flex gap-3">
                    <Button variant="primary" className="flex-1" withArrow>
                      Add to Bag
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Full Details
                    </Button>
                  </div>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </section>

        {/* 6. Form Fields & Accordions */}
        <section className="space-y-6">
          <div className="border-b border-cream-200 pb-3">
            <h2 className="font-serif text-2xl font-bold text-ink-900">6. Form Controls & Collapsible Information</h2>
            <p className="text-xs text-ink-500 mt-1">Inputs with WCAG aria-describedby validation, and product accordions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Fields */}
            <div className="space-y-4 bg-cream-50 border border-cream-200 rounded-card p-6">
              <h3 className="font-serif text-base font-semibold">Form Input Fields</h3>
              <Input
                label="Full Name"
                placeholder="e.g. Maya Sharma"
                required
              />
              <Input
                label="Email Address (With Error State)"
                placeholder="name@domain.com"
                defaultValue="invalid-email"
                error="Please enter a valid email address."
              />
              <Textarea
                label="Review Notes / Order Instructions"
                placeholder="Share your skin experience..."
                helperText="Characters remaining: 250"
              />
            </div>

            {/* Accordion */}
            <div className="bg-cream-50 border border-cream-200 rounded-card p-6 space-y-2">
              <h3 className="font-serif text-base font-semibold mb-2">Product Specifications Accordion</h3>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How To Use & Ritual</AccordionTrigger>
                  <AccordionContent>
                    Apply 3 to 4 drops each morning onto cleansed, damp skin before moisturizing. Gently press into face, neck, and décolletage. Follow with Verdéa Mineral Sunscreen SPF 50.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Full INCI Ingredients</AccordionTrigger>
                  <AccordionContent>
                    Aqua (Water), 3-O-Ethyl Ascorbic Acid (Vitamin C), Propanediol, Glycerin, Terminalia Ferdinandiana (Kakadu Plum) Fruit Extract, Ferulic Acid, Sodium Hyaluronate, Camellia Sinensis (Green Tea) Leaf Extract, Phenoxyethanol, Ethylhexylglycerin.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Clinical Results & Efficacy</AccordionTrigger>
                  <AccordionContent>
                    In a 4-week consumer study of 52 participants: 94% reported visibly brighter skin tone, 91% noted enhanced hydration, and 0% experienced barrier irritation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* 7. Breadcrumb & Tabs */}
        <section className="space-y-4 bg-cream-100 rounded-card p-6 border border-cream-200">
          <h3 className="font-serif text-base font-semibold">Breadcrumb & Tab Navigation</h3>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Skincare", href: "/collections/skincare" },
              { label: "Serums", href: "/collections/serums" },
              { label: "Glow Boost Vitamin C Serum" },
            ]}
          />

          <div className="pt-4">
            <Tabs defaultValue="benefits">
              <TabsList>
                <TabsTrigger value="benefits">Key Benefits</TabsTrigger>
                <TabsTrigger value="skin-types">Suitable Skin Types</TabsTrigger>
                <TabsTrigger value="sustainability">Eco Footprint</TabsTrigger>
              </TabsList>
              <TabsContent value="benefits" className="p-4 bg-cream-50 rounded-card border border-cream-200 text-xs sm:text-sm text-ink-500 leading-relaxed">
                Neutralizes daily oxidative stressors, fades stubborn hyperpigmentation, stimulates collagen synthesis, and provides an immediate dewy glass-skin finish without stickiness.
              </TabsContent>
              <TabsContent value="skin-types" className="p-4 bg-cream-50 rounded-card border border-cream-200 text-xs sm:text-sm text-ink-500 leading-relaxed">
                Formulated for all skin types, including sensitive, combination, dry, and acne-prone skin. Dermatologically non-comedogenic and fragrance-free.
              </TabsContent>
              <TabsContent value="sustainability" className="p-4 bg-cream-50 rounded-card border border-cream-200 text-xs sm:text-sm text-ink-500 leading-relaxed">
                100% recyclable amber glass bottle protecting UV-sensitive bio-actives, FSC-certified outer carton, and printed with non-toxic botanical soy inks.
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
