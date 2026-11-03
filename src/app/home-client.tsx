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
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  Droplet,
  Sun,
  Flame,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { PriceBlock } from "@/components/ui/price-block";

interface SerializedProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  image?: string;
  variantId?: string;
  size?: string;
}

interface SerializedCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  image?: string | null;
}

interface SerializedConcern {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  productCount: number;
}

interface HomeClientProps {
  initialBestSellers?: SerializedProduct[];
  initialCategories?: SerializedCategory[];
  initialConcerns?: SerializedConcern[];
}

const HERO_SLIDES = [
  {
    eyebrow: "Clean • Natural • Clinically Proven",
    titlePart1: "Glow",
    titleItalic: "Naturally",
    description:
      "Pure botanical bio-actives backed by rigorous clinical trials. Zero synthetic fillers, cruelty-free, and crafted for a resilient skin barrier.",
    primaryCta: { label: "Shop Best Sellers", href: "/collections/all" },
    secondaryCta: { label: "Take Skin Quiz", href: "/quiz" },
    floatingBadge: "Clinical Trial: 98% Barrier Repair",
    featuredProduct: {
      name: "Glow Boost Vitamin C Serum",
      tagline: "Antioxidant Radiance Complex",
      price: 899,
      compareAtPrice: 1199,
      rating: "4.9 ★ (128)",
      href: "/products/glow-boost-vitamin-c-serum",
      badge: "Best Seller",
    },
    bgGradient: "from-[#FBF8F3] via-[#F4EEE4] to-[#E6ECDD]/60",
    accentGradient: "from-[#E6ECDD] via-[#F4EEE4] to-[#E9DFD0]",
  },
  {
    eyebrow: "Deep Barrier Hydration",
    titlePart1: "Restore",
    titleItalic: "Equilibrium",
    description:
      "Triple ceramide complexes and cold-pressed botanical squalane that lock in 72 hours of cellular moisture without clogging pores.",
    primaryCta: { label: "Explore Hydration", href: "/collections/moisturizers" },
    secondaryCta: { label: "View Ingredients", href: "/ingredients" },
    floatingBadge: "72h Cellular Moisture Lock",
    featuredProduct: {
      name: "Hydra Repair Barrier Gel Cream",
      tagline: "Ceramide NP & Centella Asiatica",
      price: 749,
      compareAtPrice: 999,
      rating: "4.8 ★ (96)",
      href: "/products/hydra-repair-gel-cream",
      badge: "Award Winner",
    },
    bgGradient: "from-[#F4EEE4] via-[#EAE1D2] to-[#E6ECDD]/70",
    accentGradient: "from-[#EAE1D2] via-[#D5DFC9] to-[#F4EEE4]",
  },
  {
    eyebrow: "Invisible Mineral Defense",
    titlePart1: "Shield",
    titleItalic: "Effortlessly",
    description:
      "Broad-spectrum SPF 50+ non-nano zinc oxide shields against UV and blue light with absolute zero white cast or greasy residue.",
    primaryCta: { label: "Shop Sunscreens", href: "/collections/sunscreens" },
    secondaryCta: { label: "Read SPF Guide", href: "/journal" },
    floatingBadge: "PA++++ Zero White Cast",
    featuredProduct: {
      name: "Mineral Silk Sheer Sunscreen SPF 50+",
      tagline: "Non-Nano Zinc Oxide & Green Tea",
      price: 699,
      compareAtPrice: 849,
      rating: "4.9 ★ (112)",
      href: "/products/mineral-silk-sheer-sunscreen-spf-50",
      badge: "Editor's Pick",
    },
    bgGradient: "from-[#FBF8F3] via-[#E8EFE2] to-[#F4EEE4]",
    accentGradient: "from-[#E8EFE2] via-[#DCE8D4] to-[#FBF8F3]",
  },
];

const FALLBACK_CATEGORIES = [
  {
    id: "cleansers",
    name: "Cleansers",
    slug: "cleansers",
    description: "Gentle balancing gels & clarifying botanical waters",
    productCount: 4,
    gradient: "from-[#E6ECDD] via-[#F4EEE4] to-[#E9DFD0]",
    icon: Droplet,
  },
  {
    id: "moisturizers",
    name: "Moisturizers",
    slug: "moisturizers",
    description: "Ceramide creams & lightweight hydra repair emulsions",
    productCount: 5,
    gradient: "from-[#F4EEE4] via-[#EAE1D2] to-[#E6ECDD]",
    icon: Sparkles,
  },
  {
    id: "serums",
    name: "Serums & Treatments",
    slug: "serums",
    description: "Concentrated Vitamin C, Niacinamide & Peptides",
    productCount: 6,
    gradient: "from-[#F7EFE1] via-[#F4EEE4] to-[#E6ECDD]",
    icon: Flame,
  },
  {
    id: "sunscreens",
    name: "Sunscreens",
    slug: "sunscreens",
    description: "Zero-white-cast invisible SPF 50+ mineral shields",
    productCount: 3,
    gradient: "from-[#E6ECDD] via-[#E2EADA] to-[#F4EEE4]",
    icon: Sun,
  },
  {
    id: "combos",
    name: "Routine Bundles",
    slug: "combos",
    description: "Synergistic botanical trios with up to 25% savings",
    productCount: 4,
    gradient: "from-[#F4EEE4] via-[#E8EFE2] to-[#E9DFD0]",
    icon: Leaf,
  },
  {
    id: "haircare",
    name: "Hair & Scalp",
    slug: "haircare",
    description: "Rosemary & peptide root serums for dense, healthy shine",
    productCount: 3,
    gradient: "from-[#EAE1D2] via-[#E6ECDD] to-[#FBF8F3]",
    icon: Recycle,
  },
];

const CONCERN_ICONS: Record<string, string> = {
  acne: "🌿",
  dryness: "💧",
  dullness: "✨",
  sensitivity: "🛡️",
  aging: "🌸",
  pigmentation: "☀️",
};

const UGC_REVIEWS = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    location: "Stockholm, Sweden",
    rating: 5,
    title: "Completely cleared my reactive flare-ups",
    comment:
      "I've struggled with barrier damage and redness for years. The Hydra Repair Cream and Calm Toner smoothed my skin texture within 10 days without any tingling.",
    product: "Hydra Repair Barrier Gel Cream",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Maya Chen",
    location: "Singapore",
    rating: 5,
    title: "Finally a Vitamin C that doesn't oxidize",
    comment:
      "The amber dropper bottle and lipid-soluble Vitamin C formula are exceptional. My post-acne dark spots faded noticeably by week three.",
    product: "Glow Boost Vitamin C Serum",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Priya Sundaram",
    location: "Bangalore, India",
    rating: 5,
    title: "Truly invisible mineral sunscreen",
    comment:
      "Zero white cast on my warm undertone! It blends like a light serum moisturizer and sits perfectly under light makeup.",
    product: "Mineral Silk Sheer Sunscreen SPF 50+",
    verified: true,
  },
];

const JOURNAL_ARTICLES = [
  {
    id: "art-1",
    slug: "botanical-squalane-vs-hyaluronic-acid",
    title: "Botanical Squalane vs. Hyaluronic Acid: Why Your Skin Needs Both",
    excerpt:
      "How humectants and lipid bio-actives cooperate to rebuild stratum corneum hydration.",
    date: "November 2, 2026",
    readTime: "4 min read",
    category: "Skin Biology",
  },
  {
    id: "art-2",
    slug: "layering-actives-without-barrier-irritation",
    title: "A Chemist's Guide to Layering Vitamin C, Niacinamide & Retinoids",
    excerpt:
      "Learn the exact pH windows and wait times to extract maximum potency without redness.",
    date: "October 28, 2026",
    readTime: "6 min read",
    category: "Routine Science",
  },
  {
    id: "art-3",
    slug: "clean-beauty-standards-beyond-marketing",
    title: "Cold-Pressing Botanicals: Preserving 99.4% Nutrient Potency",
    excerpt:
      "Inside our French laboratory extraction process that leaves plant cellular enzymes alive.",
    date: "October 19, 2026",
    readTime: "5 min read",
    category: "Formulation",
  },
];

export function HomeClient({
  initialBestSellers = [],
  initialCategories = [],
  initialConcerns = [],
}: HomeClientProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);

  // Auto carousel rotation with pause support
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Keyboard navigation for hero slider
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    } else if (e.key === "ArrowRight") {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) return;
    setNewsletterSubscribed(true);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  // Merge categories with styling
  const displayCategories =
    initialCategories.length > 0
      ? initialCategories.slice(0, 6).map((c, i) => {
          const fallback = FALLBACK_CATEGORIES[i % FALLBACK_CATEGORIES.length];
          return {
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            productCount: `${c.productCount} Products`,
            gradient: fallback.gradient,
            icon: fallback.icon,
          };
        })
      : FALLBACK_CATEGORIES;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION (Synthesis of Reference A & B, with 3 Accessible Slides) */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6"
        aria-roledescription="carousel"
        aria-label="Highlighted Botanical Collections"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div
          className={`relative overflow-hidden rounded-hero bg-gradient-to-br ${activeSlide.bgGradient} border border-cream-200 shadow-soft p-6 sm:p-10 lg:p-16 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between transition-colors duration-700`}
        >
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
                <span>{activeSlide.eyebrow}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-ink-900 leading-[1.08]">
                {activeSlide.titlePart1}{" "}
                <span className="italic text-forest-600 font-serif font-normal">
                  {activeSlide.titleItalic}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans max-w-md">
                {activeSlide.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href={activeSlide.primaryCta.href}>
                  <Button variant="primary" size="lg" withArrow>
                    {activeSlide.primaryCta.label}
                  </Button>
                </Link>
                <Link href={activeSlide.secondaryCta.href}>
                  <Button variant="secondary" size="lg">
                    {activeSlide.secondaryCta.label}
                  </Button>
                </Link>
              </div>

              {/* Trust highlights row */}
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
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[24px] overflow-hidden bg-gradient-to-b from-[#EAE1D2] to-[#D5DFC9] shadow-soft border border-cream-200/70 p-4 flex flex-col justify-between">
                <div
                  className={`relative w-full h-full rounded-[20px] overflow-hidden bg-gradient-to-tr ${activeSlide.accentGradient} flex flex-col items-center justify-center text-center p-8 transition-colors duration-500`}
                >
                  <div className="w-20 h-20 rounded-full bg-cream-50/80 backdrop-blur-md flex items-center justify-center text-forest-800 shadow-soft mb-4">
                    <Sparkles className="w-10 h-10 text-forest-600" />
                  </div>
                  <span className="font-serif text-2xl font-semibold text-ink-900 tracking-tight">
                    {activeSlide.titlePart1} {activeSlide.titleItalic}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-forest-800 mt-2 font-medium">
                    {activeSlide.floatingBadge}
                  </span>
                </div>

                {/* Overlapping Floating Best Seller Card (Reference B style) */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-8 z-30 w-64 sm:w-72 bg-cream-50/95 backdrop-blur-lg rounded-[20px] p-4 border border-cream-200/90 shadow-floating transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="forest" size="sm">
                      {activeSlide.featuredProduct.badge}
                    </Badge>
                    <span className="text-[11px] font-semibold text-forest-600">
                      {activeSlide.featuredProduct.rating}
                    </span>
                  </div>

                  <h3 className="font-serif text-sm font-semibold text-ink-900">
                    {activeSlide.featuredProduct.name}
                  </h3>
                  <p className="text-[11px] text-ink-500 mb-2.5">
                    {activeSlide.featuredProduct.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-cream-200/60">
                    <PriceBlock
                      price={activeSlide.featuredProduct.price}
                      compareAtPrice={activeSlide.featuredProduct.compareAtPrice}
                      size="sm"
                      showSavingsBadge={false}
                    />
                    <Link
                      href={activeSlide.featuredProduct.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-forest-800 hover:text-forest-900 hover:underline"
                    >
                      Shop Now <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls (Autoplay pause, arrow controls, dots indicator) */}
          <div className="flex items-center justify-between pt-6 border-t border-cream-200/60 z-10 mt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-8 bg-forest-800" : "w-2 bg-cream-200 hover:bg-forest-600"
                  }`}
                />
              ))}
            </div>

            {/* Arrows & Pause Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Play hero carousel" : "Pause hero carousel"}
                className="w-8 h-8 rounded-full bg-cream-50/80 border border-cream-200 flex items-center justify-center text-ink-900 hover:bg-cream-100 transition-colors"
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
                }
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full bg-cream-50/80 border border-cream-200 flex items-center justify-center text-ink-900 hover:bg-cream-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full bg-cream-50/80 border border-cream-200 flex items-center justify-center text-ink-900 hover:bg-cream-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
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
            <span>Explore All Products</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((category) => {
            const Icon = category.icon || Sparkles;
            return (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="group relative rounded-card overflow-hidden bg-cream-100 border border-cream-200/90 shadow-subtle p-5 transition-all duration-300 hover:shadow-soft hover:border-forest-600/40 flex flex-col justify-between min-h-[220px]"
              >
                {/* Visual Accent */}
                <div
                  className={`w-full h-28 rounded-[16px] bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-inner relative overflow-hidden`}
                >
                  <div className="w-12 h-12 rounded-full bg-cream-50/80 backdrop-blur-sm flex items-center justify-center text-forest-800 shadow-subtle group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-forest-600" />
                  </div>
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-ink-500 font-medium">
                    {category.productCount}
                  </span>
                </div>

                {/* Frosted Label Bar with Round Arrow Button */}
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

      {/* 3. BEST SELLERS GRID (Real DB Products with live Add to Bag & Wishlist) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-600 mb-1">
              Best Sellers
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900 tracking-tight">
              Clinically Formulated, Universally Loved
            </h2>
          </div>
          <Link href="/collections/best-sellers">
            <Button variant="secondary" size="sm">
              View All Best Sellers
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialBestSellers.slice(0, 8).map((prod) => (
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
              image={prod.image}
              variantId={prod.variantId}
              size={prod.size}
            />
          ))}
        </div>
      </section>

      {/* 4. SHOP BY SKIN CONCERN SECTION */}
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
              Target specific skin needs with concentrated bio-active formulations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {(initialConcerns.length > 0
              ? initialConcerns
              : [
                  { id: "1", name: "Dullness & Glow", slug: "dullness", productCount: 8 },
                  { id: "2", name: "Barrier Repair", slug: "barrier", productCount: 6 },
                  { id: "3", name: "Acne & Pores", slug: "acne", productCount: 7 },
                  { id: "4", name: "Fine Lines & Aging", slug: "aging", productCount: 9 },
                  { id: "5", name: "Dryness & Dehydration", slug: "dryness", productCount: 11 },
                ]
            ).map((concern) => (
              <Link
                key={concern.slug}
                href={`/collections/all?concern=${concern.slug}`}
                className="group flex flex-col items-center justify-center p-5 rounded-card bg-cream-50 border border-cream-200/80 text-center transition-all duration-200 hover:shadow-subtle hover:border-forest-600/40"
              >
                <span className="text-3xl mb-2.5 transition-transform group-hover:scale-110">
                  {CONCERN_ICONS[concern.slug] || "🌿"}
                </span>
                <span className="text-xs font-semibold text-ink-900 group-hover:text-forest-800 transition-colors">
                  {concern.name}
                </span>
                <span className="text-[11px] text-ink-500 mt-1">
                  {concern.productCount} remedies
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL / BOTANICAL SCIENCE STORY BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cream-100 rounded-hero p-8 sm:p-12 border border-cream-200">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-cream-50 border border-cream-200 text-xs font-semibold uppercase tracking-wider text-forest-800">
              <Leaf className="w-3.5 h-3.5 text-forest-600" />
              <span>Quiet Luxury Meets Botanical Science</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ink-900 leading-[1.15]">
              Formulated for maximum potency,{" "}
              <span className="italic text-forest-600 font-serif">calm by nature.</span>
            </h2>

            <p className="text-sm text-ink-500 leading-relaxed">
              We eliminate the false dilemma between natural purity and clinical efficacy. Every
              formula begins with nutrient-dense phyto-actives harvested sustainably, then
              stabilized through gentle lipid encapsulation so they reach your skin at peak potency.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="border-l-2 border-forest-800 pl-4 space-y-1">
                <span className="font-serif text-2xl font-bold text-ink-900">100%</span>
                <p className="text-xs text-ink-500">Vegan, Cruelty-Free & Dermatologically Verified</p>
              </div>
              <div className="border-l-2 border-forest-800 pl-4 space-y-1">
                <span className="font-serif text-2xl font-bold text-ink-900">0%</span>
                <p className="text-xs text-ink-500">Synthetic Parabens, Sulfates & Artificial Fragrance</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link href="/about">
                <Button variant="primary" size="default" withArrow>
                  Our Philosophy
                </Button>
              </Link>
              <Link href="/ingredients">
                <Button variant="secondary" size="default">
                  Ingredients Glossary
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-gradient-to-tr from-[#E6ECDD] via-[#F4EEE4] to-[#E9DFD0] border border-cream-200 p-8 flex flex-col justify-between shadow-soft">
              <div className="space-y-3">
                <Badge variant="forest">Lab Note #48</Badge>
                <h3 className="font-serif text-2xl font-bold text-ink-900">
                  Phyto-Lipid Delivery Architecture
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">
                  Bio-compatible biomimetic ceramides mimic your natural intercellular lipid cement,
                  preventing trans-epidermal water loss (TEWL) without creating a suffocating film.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-cream-200/80 text-xs font-semibold text-forest-800">
                <span>Verified in Independent Human Clinicals</span>
                <Sparkles className="w-4 h-4 text-forest-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROMOTIONAL BUNDLE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-hero bg-gradient-to-r from-[#E6ECDD] via-[#F4EEE4] to-[#EAE1D2] border border-cream-200 shadow-soft p-8 sm:p-12 lg:p-14">
          <div className="max-w-lg space-y-4">
            <Badge variant="clay">Routine Bundle Savings</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900 leading-tight">
              The 3-Step Radiance Ritual: <span className="italic text-forest-600 font-serif">Save 20%</span>
            </h2>
            <p className="text-sm text-ink-500 leading-relaxed">
              Cleanse, hydrate, and shield. Our synergistic botanical trio is formulated to work in
              unison to revive cellular glow and strengthen your lipid barrier.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link href="/collections/combos">
                <Button variant="primary" size="default" withArrow>
                  Shop The Bundle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER UGC & REVIEWS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-600">
            Real Results
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900">
            Stories From Our Community
          </h2>
          <div className="flex items-center justify-center gap-1.5 pt-1 text-gold-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs font-bold text-ink-900 ml-2">4.9 / 5 Overall Satisfaction</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UGC_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-card bg-cream-100/60 border border-cream-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif text-base font-bold text-ink-900">{rev.title}</h3>
                <p className="text-xs text-ink-500 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-ink-900 flex items-center gap-1">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
                    )}
                  </div>
                  <span className="text-[11px] text-ink-500">{rev.location}</span>
                </div>
                <span className="text-[11px] font-medium text-forest-800 bg-cream-50 px-2 py-1 rounded-pill border border-cream-200">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTANICAL JOURNAL / ARTICLES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-600 mb-1">
              Botanical Notes
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900 tracking-tight">
              From Our Formulation Lab
            </h2>
          </div>
          <Link
            href="/journal"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest-800 hover:text-forest-900"
          >
            <span>Read All Articles</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOURNAL_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group flex flex-col justify-between p-6 rounded-card bg-cream-50 border border-cream-200 transition-all duration-300 hover:shadow-soft hover:border-forest-600/30"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-ink-500">
                  <span className="font-semibold uppercase tracking-wider text-forest-800">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-ink-900 group-hover:text-forest-800 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">{article.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-cream-200/60 mt-4 flex items-center justify-between text-xs text-forest-800 font-semibold">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. NEWSLETTER SIGNUP WITH DISCOUNT INCENTIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-hero bg-forest-800 text-cream-50 p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <span className="px-3.5 py-1 rounded-pill bg-forest-600/60 text-sage-100 text-xs font-semibold uppercase tracking-wider">
              Exclusive Rituals & Offers
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight">
              Join the Verdéa Circle
            </h2>
            <p className="text-xs sm:text-sm text-cream-100/80 leading-relaxed">
              Receive 15% off your first botanical order with code <strong>WELCOME15</strong>, plus
              early access to seasonal formulations and skin health guides.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 bg-forest-600/40 rounded-xl border border-sage-300/30 text-xs space-y-1">
                <p className="font-bold text-sage-100">🎉 Welcome to the Verdéa Circle!</p>
                <p className="text-cream-100/80">
                  Use coupon code <strong className="text-cream-50">WELCOME15</strong> at checkout for 15% off.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 h-11 px-4 rounded-pill bg-cream-50 text-ink-900 placeholder:text-ink-500/70 text-xs focus:outline-none focus:ring-2 focus:ring-sage-300"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="default"
                  className="rounded-pill bg-sage-300 text-forest-900 hover:bg-cream-50 border-none font-semibold px-6"
                >
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-[11px] text-cream-100/60">
              We respect your privacy. Unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
