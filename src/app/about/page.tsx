import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, ShieldCheck, HeartHandshake, Recycle } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand";

export const metadata: Metadata = {
  title: `Our Philosophy & Story | ${brandConfig.name}`,
  description: `Learn how ${brandConfig.name} unites quiet luxury with clinically verified botanical science.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "About Verdéa", current: true },
            ]}
          />

          {/* Hero Header */}
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <span className="px-3.5 py-1 rounded-pill bg-sage-100 border border-sage-300 text-xs font-semibold uppercase tracking-wider text-forest-800">
              Quiet Luxury Meets Botanical Science
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-semibold text-ink-900 tracking-tight leading-[1.1]">
              Skincare for a <span className="italic text-forest-600 font-serif">Kinder Tomorrow</span>
            </h1>
            <p className="text-sm sm:text-base text-ink-500 leading-relaxed">
              We founded {brandConfig.name} on a singular premise: that high-performance clinical
              efficacy and pure botanical stewardship can exist in total harmony.
            </p>
          </div>

          {/* Core Philosophy Banner */}
          <div className="rounded-hero bg-gradient-to-br from-[#E6ECDD] via-[#F4EEE4] to-[#EAE1D2] p-8 sm:p-12 border border-cream-200 shadow-soft space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
              The Verdéa Formulation Standard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-ink-500 leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-serif text-base font-bold text-ink-900 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-forest-600" />
                  Bio-Compatible Plant Actives
                </h3>
                <p>
                  We prioritize cold-pressed, unadulterated plant botanicals whose lipid structures
                  naturally mirror the human stratum corneum, enabling rapid absorption without
                  irritation.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-base font-bold text-ink-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-forest-600" />
                  Independent Clinical Testing
                </h3>
                <p>
                  Zero untested claims. Every active serum and barrier cream is dermatologist
                  tested on sensitive human panels, proving measurable increases in trans-epidermal
                  hydration and cellular elasticity.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-base font-bold text-ink-900 flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-forest-600" />
                  Circular & Conscious Design
                </h3>
                <p>
                  Housed exclusively in heavy UV-protective amber glass containers and recycled
                  aluminum pumps. We use 100% post-consumer FSC-certified paper and soy vegetable
                  inks.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-base font-bold text-ink-900 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-forest-600" />
                  Leaping Bunny Certified
                </h3>
                <p>
                  We never test on animals, nor do we sell in markets where third-party animal
                  testing is legally mandated. Our formulations are 100% vegan.
                </p>
              </div>
            </div>
          </div>

          {/* Three Pillars */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-900 text-center">
              Our Science & Formulation Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-card bg-cream-100/60 border border-cream-200 space-y-3">
                <span className="font-serif text-3xl font-bold text-forest-800">01</span>
                <h3 className="font-serif text-base font-bold text-ink-900">
                  Targeted Phyto-Nutrients
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">
                  Extracted at sub-zero temperatures to preserve heat-sensitive flavonoids,
                  carotenoids, and polyphenols.
                </p>
              </div>

              <div className="p-6 rounded-card bg-cream-100/60 border border-cream-200 space-y-3">
                <span className="font-serif text-3xl font-bold text-forest-800">02</span>
                <h3 className="font-serif text-base font-bold text-ink-900">
                  Biomimetic Lipid Delivery
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">
                  Encapsulated in bio-fermented sphingolipids that fuse with the intercellular lipid
                  matrix for sustained 72-hour moisture.
                </p>
              </div>

              <div className="p-6 rounded-card bg-cream-100/60 border border-cream-200 space-y-3">
                <span className="font-serif text-3xl font-bold text-forest-800">03</span>
                <h3 className="font-serif text-base font-bold text-ink-900">
                  Sensory Equilibrium
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">
                  Lightweight, quick-absorbing textures formulated to soothe the senses with natural
                  botanical aromas and no synthetic perfumes.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 sm:p-12 text-center rounded-hero bg-forest-800 text-cream-50 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
              Ready to meet your barrier equilibrium?
            </h2>
            <p className="text-xs sm:text-sm text-cream-100/80 max-w-md mx-auto">
              Explore our complete catalogue or take our diagnostic quiz to curate your customized
              routine.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link href="/collections/all">
                <Button className="rounded-pill bg-cream-50 text-forest-900 hover:bg-sage-100" withArrow>
                  Shop Formulations
                </Button>
              </Link>
              <Link href="/ingredients">
                <Button variant="secondary" className="rounded-pill text-cream-50 border-cream-200/40 hover:bg-forest-600">
                  Ingredients Glossary
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

