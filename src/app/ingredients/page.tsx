import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import brandConfig from "@/config/brand";
import { getIngredients } from "@/services/catalog.service";

export const metadata: Metadata = {
  title: `Ingredients Glossary | ${brandConfig.name}`,
  description: `Full transparency: discover our clinically proven botanical actives, INCI names, and benefits.`,
};

export default async function IngredientsPage() {
  const ingredients = await getIngredients();

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Ingredients Glossary", current: true },
            ]}
          />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-pill bg-sage-100 border border-sage-300 text-xs font-semibold uppercase tracking-wider text-forest-800">
              Complete Formulation Transparency
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink-900 tracking-tight">
              The Verdéa Botanical Formulary
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">
              We list every single component with its botanical origin, scientific INCI designation,
              and mechanism of cellular action. Zero undisclosed fragrances or hidden fillers.
            </p>
          </div>

          {/* Standards strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-cream-100/70 p-4 rounded-hero border border-cream-200 text-xs text-ink-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
              <span>Bio-Compatible Lipid Extraction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
              <span>100% Non-Comedogenic & Non-Irritating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
              <span>EWG Verified Safety Rating of 1</span>
            </div>
          </div>

          {/* Ingredients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ingredients.map((ing) => (
              <div
                key={ing.id}
                className="p-6 rounded-card bg-cream-100/50 border border-cream-200 space-y-3 hover:border-forest-600/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-ink-900">{ing.name}</h2>
                    {ing.inciName && (
                      <p className="text-[11px] font-mono text-ink-500 italic mt-0.5">
                        INCI: {ing.inciName}
                      </p>
                    )}
                  </div>
                  <Badge variant="forest" size="sm">
                    Active Phyto
                  </Badge>
                </div>

                <p className="text-xs text-ink-500 leading-relaxed">{ing.description}</p>

                {ing.benefits && (
                  <div className="pt-2 border-t border-cream-200/70 flex items-center gap-2 text-xs text-forest-800 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                    <span>Benefit: {ing.benefits}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Formulations link */}
          <div className="p-8 text-center rounded-hero bg-cream-100 border border-cream-200 space-y-3">
            <h3 className="font-serif text-xl font-bold text-ink-900">
              Experience these bio-actives in our clinical routines
            </h3>
            <p className="text-xs text-ink-500 max-w-md mx-auto">
              Every formula is compounded at optimal physiological pH to ensure maximum bioavailability.
            </p>
            <div className="pt-2">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-forest-800 text-cream-50 text-xs font-semibold uppercase tracking-wider hover:bg-forest-600 transition-colors"
              >
                Explore All Formulations
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
