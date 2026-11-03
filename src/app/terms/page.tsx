import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand";

export const metadata: Metadata = {
  title: `Terms of Service | ${brandConfig.name}`,
  description: `Terms and conditions governing purchases, use of site, and consumer rights.`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Terms of Service", current: true },
            ]}
          />

          <div className="space-y-2 border-b border-cream-200 pb-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900">
              Terms of Service
            </h1>
            <p className="text-xs text-ink-500">Effective Date: November 3, 2026</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-ink-500 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-ink-900">1. Acceptance of Terms</h2>
              <p>
                By accessing or placing an order through {brandConfig.name} ({brandConfig.domain}),
                you agree to be bound by these Terms of Service. If you disagree with any portion of
                these terms, you may not access our services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-ink-900">2. Cosmetic Disclaimer</h2>
              <p>
                Our formulations are cosmetic skincare products intended to support skin appearance,
                hydration, and barrier wellness. None of the statements or descriptions on this site
                have been evaluated by the FDA or international drug authorities. Our products are
                not intended to diagnose, treat, cure, or prevent any medical condition or disease.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-ink-900">
                3. Order Verification & Pricing
              </h2>
              <p>
                All prices are stated in integer minor currency units. While we strive for accuracy,
                in the event of a pricing error caused by technical malfunction, we reserve the right
                to cancel unfulfilled orders with an immediate full refund.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

