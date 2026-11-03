"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Leaf,
  ShieldCheck,
  HeartHandshake,
  Recycle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Droplet,
  Sun,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { PriceBlock } from "@/components/ui/price-block";

const CATEGORIES = [
  {
    id: "cleansers",
    name: "Cleansers",
    slug: "cleansers",
    description: "Gentle balancing gels & clarifying botanical waters",
    itemCount: "6 Products",
    gradient: "from-[#E6ECDD] via-[#F4EEE4] to-[#E9DFD0]",
    icon: Droplet,
  },
  {
    id: "moisturizers",
    name: "Moisturizers",
    slug: "moisturizers",
    description: "Ceramide creams & lightweight hydra repair emulsions",
    itemCount: "8 Products",
    gradient: "from-[#F4EEE4] via-[#EAE1D2] to-[#E6ECDD]",
    icon: Sparkles,
  },
  {
    id: "serums",
    name: "Serums",
    slug: "serums",
    description: "Concentrated Vitamin C, Niacinamide & Peptides",
    itemCount: "9 Products",
    gradient: "from-[#F7EFE1] via-[#F4EEE4] to-[#E6ECDD]",
    icon: Flame,
  },
  {
    id: "sunscreens",
    name: "Sunscreens",
    slug: "sunscreens",
    description: "Zero-white-cast invisible SPF 50+ mineral shields",
    itemCount: "4 Products",
    gradient: "from-[#E6ECDD] via-[#E2EADA] to-[#F4EEE4]",
    icon: Sun,
  },
];

const BEST_SELLERS = [
  {
    id: "prod-1",
    slug: "glow-boost-vitamin-c-serum",
    name: "Glow Boost Vitamin C Serum",
    subtitle: "Antioxidant Radiance",
    price: 899,
    compareAtPrice: 1199,
    rating: 4.9,
    reviewCount: 128,
    badge: "Best Seller",
  },
  {
    id: "prod-2",
    slug: "hydra-repair-gel-cream",
    name: "Hydra Repair Barrier Gel Cream",
    subtitle: "Deep Cellular Moisture",
    price: 749,
    compareAtPrice: 999,
    rating: 4.8,
    reviewCount: 96,
    badge: "Award Winner",
  },
  {
    id: "prod-3",
    slug: "calm-balance-clarifying-toner",
    name: "Calm Balance Clarifying Toner",
    subtitle: "Pore Refining Complex",
    price: 699,
    compareAtPrice: 849,
    rating: 4.7,
    reviewCount: 75,
    badge: "Clinical Favorite",
  },
  {
    id: "prod-4",
    slug: "velvet-botanical-lip-cheek-tint",
    name: "Velvet Botanical Lip & Cheek Tint",
    subtitle: "Bio-Pigment Flush",
    price: 599,
    compareAtPrice: 799,
    rating: 4.8,
    reviewCount: 64,
    badge: "Clean Makeup",
  },
];

const SKIN_CONCERNS = [
  { name: "Dullness & Dark Spots", icon: "✨", count: "8 remedies", href: "/concerns/dullness" },
  { name: "Dehydration & Dryness", icon: "💧", count: "11 remedies", href: "/concerns/dryness" },
  { name: "Acne & Blemish Control", icon: "🌿", count: "7 remedies", href: "/concerns/acne" },
  { name: "Compromised Barrier", icon: "🛡️", count: "6 remedies", href: "/concerns/barrier" },
  { name: "Fine Lines & Elasticity", icon: "🌸", count: "9 remedies", href: "/concerns/aging" },
];

export function HomeClient() {
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    setToastMessage(`Added "${productName}" to bag.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-pill bg-forest-800 text-cream-50 text-xs font-medium shadow-floating animate-fadeUp"
        >
          <CheckCircle2 className="w-4 h-4 text-sage-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO SECTION (Synthesis of Reference A & Reference B) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-hero bg-gradient-to-br from-[#FBF8F3] via-[#F4EEE4] to-[#E6ECDD]/60 border border-cream-200 shadow-soft p-6 sm:p-10 lg:p-16 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
          {/* Top Right Circular Badge (Reference B signature) */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 hidden md:block">
            <Link
              href="/about"
              className="group flex flex-col items-center justify-center w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-cream-50/90 backdrop-blur-md border border-cream-200/90 shadow-subtle text-center p-2 text-ink-900 transition-all duration-300 hover:scale-105 hover:border-forest-600/40"
            >
              <span className="font-serif text-[11px] lg:text-xs font-medium text-ink-900 leading-tight">
                Skincare for a Kinder Tomorrow
              </span>
              <span className="mt-1 w-6 h-6 rounded-full bg-forest-800 text-cream-50 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>

          {/* Hero Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill bg-cream-50/80 backdrop-blur-sm border border-cream-200 text-xs font-semibold uppercase tracking-wider text-forest-800 shadow-subtle">
                <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                <span>Clean • Natural • Clinically Proven</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-ink-900 leading-[1.08]">
                Glow <span className="italic text-forest-600 font-serif font-normal">Naturally</span>
              </h1>

              <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans max-w-md">
                Pure botanical bio-actives backed by rigorous clinical trials. Zero synthetic fillers, cruelty-free, and crafted for a radiant, resilient skin barrier.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/collections/all">
                  <Button variant="primary" size="lg" withArrow>
                    Shop Now
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="secondary" size="lg">
                    Take Skin Quiz
                  </Button>
                </Link>
              </div>

              {/* Trust highlights row (Reference A & B bottom badges) */}
              <div className="pt-6 border-t border-cream-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-ink-900 font-medium">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Natural Bio-Actives</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Dermatologist Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Cruelty-Free & Vegan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Eco-Glass Packaging</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual & Floating Best Seller Card (Reference B signature) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              {/* Main Model & Botanical Portrait Tile */}
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[24px] overflow-hidden bg-gradient-to-b from-[#EAE1D2] to-[#D5DFC9] shadow-soft border border-cream-200/70 p-4 flex flex-col justify-between">
                <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-cover bg-center flex flex-col items-center justify-center text-center p-8 bg-gradient-to-tr from-[#E6ECDD] via-[#F4EEE4] to-[#E9DFD0]">
                  <div className="w-20 h-20 rounded-full bg-cream-50/80 backdrop-blur-md flex items-center justify-center text-forest-800 shadow-soft mb-4">
                    <Sparkles className="w-10 h-10 text-forest-600" />
                  </div>
                  <span className="font-serif text-2xl font-semibold text-ink-900 tracking-tight">
                    Pure Botanical Glow
                  </span>
                  <span className="text-xs uppercase tracking-widest text-forest-800 mt-2 font-medium">
                    100% Active Phyto-Nutrients
                  </span>
                </div>

                {/* Overlapping Floating Best Seller Card (Reference B style) */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-8 z-30 w-64 sm:w-72 bg-cream-50/95 backdrop-blur-lg rounded-[20px] p-4 border border-cream-200/90 shadow-floating transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="forest" size="sm">
                      Best Seller
                    </Badge>
                    <span className="text-[11px] font-semibold text-forest-600">4.9 ★ (128)</span>
                  </div>

                  <h3 className="font-serif text-sm font-semibold text-ink-900">
                    Brightening Face Serum
                  </h3>
                  <p className="text-[11px] text-ink-500 mb-2.5">
                    Radiant skin with nature’s touch.
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-cream-200/60">
                    <PriceBlock price={899} compareAtPrice={1199} size="sm" showSavingsBadge={false} />
                    <Link
                      href="/products/glow-boost-vitamin-c-serum"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-forest-800 hover:text-forest-900 hover:underline"
                    >
                      Shop Now <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (Synthesis of Reference A 4-tile row & Reference B frosted labels) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-600 mb-1">
              Shop by Category
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900 tracking-tight">
              Find Your Everyday Essentials
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest-800 hover:text-forest-900"
          >
            <span>Explore All Categories</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="group relative rounded-card overflow-hidden bg-cream-100 border border-cream-200/90 shadow-subtle p-5 transition-all duration-300 hover:shadow-soft hover:border-forest-600/40 flex flex-col justify-between min-h-[260px]"
              >
                {/* Visual Accent */}
                <div
                  className={`w-full h-32 rounded-[16px] bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-inner relative overflow-hidden`}
                >
                  <div className="w-12 h-12 rounded-full bg-cream-50/80 backdrop-blur-sm flex items-center justify-center text-forest-800 shadow-subtle group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-forest-600" />
                  </div>
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-ink-500 font-medium">
                    {category.itemCount}
                  </span>
                </div>

                {/* Frosted Label Bar with Round Arrow Button (Reference B style) */}
                <div className="mt-4 pt-3 border-t border-cream-200/70 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-ink-900 group-hover:text-forest-800 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-ink-500 line-clamp-1 mt-0.5">
                      {category.description}
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-forest-800 text-cream-50 flex items-center justify-center shrink-0 ml-2 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. BEST SELLERS GRID (Reference A style: product cards with Add to Bag pills) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-600 mb-1">
              Best Sellers
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900 tracking-tight">
              Our Customers Love
            </h2>
          </div>
          <Link href="/collections/best-sellers">
            <Button variant="secondary" size="sm">
              View All Best Sellers
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BEST_SELLERS.map((prod) => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              slug={prod.slug}
              name={prod.name}
              subtitle={prod.subtitle}
              price={prod.price}
              compareAtPrice={prod.compareAtPrice}
              rating={prod.rating}
              reviewCount={prod.reviewCount}
              badge={prod.badge}
              onAddToCart={() => handleAddToCart(prod.name)}
            />
          ))}
        </div>
      </section>

      {/* 4. SHOP BY SKIN CONCERN SECTION (Prompt requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream-100/70 rounded-hero p-8 sm:p-12 border border-cream-200">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-600">
              Targeted Care
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900">
              Shop by Skin Concern
            </h2>
            <p className="text-xs sm:text-sm text-ink-500">
              Personalized routines designed to restore your barrier equilibrium.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SKIN_CONCERNS.map((concern) => (
              <Link
                key={concern.name}
                href={concern.href}
                className="group flex flex-col items-center justify-center p-5 rounded-card bg-cream-50 border border-cream-200/80 text-center transition-all duration-200 hover:shadow-subtle hover:border-forest-600/40"
              >
                <span className="text-3xl mb-2.5 transition-transform group-hover:scale-110">
                  {concern.icon}
                </span>
                <span className="text-xs font-semibold text-ink-900 group-hover:text-forest-800 transition-colors">
                  {concern.name}
                </span>
                <span className="text-[11px] text-ink-500 mt-1">{concern.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROMOTIONAL BANNER: LIMITED TIME OFFER (Reference A style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-hero bg-gradient-to-r from-[#E6ECDD] via-[#F4EEE4] to-[#EAE1D2] border border-cream-200 shadow-soft p-8 sm:p-12 lg:p-14">
          <div className="max-w-lg space-y-4">
            <Badge variant="clay">Limited Time Offer</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900 leading-tight">
              Glow Naturally, <span className="italic text-forest-600 font-serif">Save More</span>
            </h2>
            <p className="text-sm text-ink-500 leading-relaxed">
              Enjoy up to 25% OFF on our certified botanical trios and antioxidant serums. Cleanse, hydrate, and shield with pure peace of mind.
            </p>
            <div className="pt-2">
              <Link href="/collections/combos">
                <Button variant="primary" size="default" withArrow>
                  Shop The Offer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
