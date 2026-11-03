import type { Metadata } from "next";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand";

export const metadata: Metadata = {
  title: `Shipping & Returns Policy | ${brandConfig.name}`,
  description: `Transparent delivery timelines, complimentary shipping thresholds, and our 30-day gentle guarantee.`,
};

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Shipping & Returns", current: true },
            ]}
          />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-pill bg-sage-100 border border-sage-300 text-xs font-semibold uppercase tracking-wider text-forest-800">
              Clear & Reliable Fulfillment
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink-900 tracking-tight">
              Shipping & Returns Policy
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">
              We package every botanical formula with extreme care in insulated, 100% recyclable
              packaging.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-card bg-cream-100/60 border border-cream-200 space-y-3">
              <Truck className="w-6 h-6 text-forest-800" />
              <h3 className="font-serif text-base font-bold text-ink-900">
                Complimentary Shipping
              </h3>
              <p className="text-xs text-ink-500 leading-relaxed">
                Free standard shipping on all orders over $50 (₹999). Fast 2-4 business day domestic
                transit.
              </p>
            </div>

            <div className="p-6 rounded-card bg-cream-100/60 border border-cream-200 space-y-3">
              <RotateCcw className="w-6 h-6 text-forest-800" />
              <h3 className="font-serif text-base font-bold text-ink-900">
                30-Day Gentle Guarantee
              </h3>
              <p className="text-xs text-ink-500 leading-relaxed">
                Try any formulation for 30 days. If your skin is not completely satisfied, return it
                for a full refund.
              </p>
            </div>

            <div className="p-6 rounded-card bg-cream-100/60 border border-cream-200 space-y-3">
              <ShieldCheck className="w-6 h-6 text-forest-800" />
              <h3 className="font-serif text-base font-bold text-ink-900">
                Eco-Insulated Transit
              </h3>
              <p className="text-xs text-ink-500 leading-relaxed">
                Bio-active lipids and vitamin formulas are shielded from ambient heat in amber glass
                and recycled cardboard.
              </p>
            </div>
          </div>

          {/* Detailed Policy Text */}
          <div className="space-y-6 text-xs sm:text-sm text-ink-500 leading-relaxed border-t border-cream-200 pt-8">
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-ink-900">
                1. Domestic Delivery Options & Timelines
              </h2>
              <p>
                All orders are dispatched from our central formulation laboratory within 24 hours of
                order placement on business days.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-ink-900">Standard Delivery (2–4 Business Days):</strong>{" "}
                  Free on orders $50 and above. Flat rate of $5 for orders under $50.
                </li>
                <li>
                  <strong className="text-ink-900">Express Priority (1–2 Business Days):</strong>{" "}
                  $12 flat rate nationwide. Orders placed by 1:00 PM EST ship same day.
                </li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-cream-200/80">
              <h2 className="font-serif text-xl font-bold text-ink-900">
                2. Order Tracking & Status Notifications
              </h2>
              <p>
                Upon shipment confirmation, you will receive an email containing your carrier tracking
                number (FedEx, UPS, Delhivery, or BlueDart depending on destination region). You can
                track real-time transit updates directly from the carrier portal or through your
                Verdéa customer account.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-cream-200/80">
              <h2 className="font-serif text-xl font-bold text-ink-900">
                3. The 30-Day Gentle Happiness Guarantee
              </h2>
              <p>
                We stand behind our clinical botanical formulations. If any product causes
                irritation or does not produce the expected equilibrium, we gladly provide a prepaid
                return shipping label and issue a complete refund back to your original payment method.
              </p>
              <div className="p-4 rounded-xl bg-sage-100/60 border border-sage-300 text-xs text-forest-900 space-y-1">
                <p className="font-bold">How to initiate a return:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>
                    Email our support concierge at <strong>{brandConfig.supportEmail}</strong> with
                    your order number.
                  </li>
                  <li>Receive your prepaid shipping label via email within 24 hours.</li>
                  <li>Drop off the package at any carrier location.</li>
                  <li>Refund is processed within 3 business days of parcel receipt.</li>
                </ol>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

