import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import brandConfig from "@/config/brand";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${brandConfig.name}`,
  description: `Answers regarding our clean botanical formulas, shipping timelines, order tracking, and returns.`,
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Frequently Asked Questions", current: true },
            ]}
          />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-pill bg-sage-100 border border-sage-300 text-xs font-semibold uppercase tracking-wider text-forest-800">
              Customer Support & Knowledge Base
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink-900 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">
              Find instant answers about our botanical formulations, ordering, shipping, and 30-day
              guarantee.
            </p>
          </div>

          {/* Section 1: Formulations & Ingredients */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-ink-900 border-b border-cream-200 pb-2">
              Formulation & Botanical Science
            </h2>
            <Accordion type="single" collapsible defaultValue="faq-1">
              <AccordionItem
                value="faq-1"
                title="Are Verdéa formulations safe for ultra-sensitive or reactive skin?"
              >
                <p className="text-xs text-ink-500 leading-relaxed pt-1">
                  Yes. All Verdéa formulas are formulated without synthetic fragrances, drying
                  alcohols, parabens, or harsh sulfates. Every batch undergoes rigorous
                  dermatological patch testing on human volunteers with verified reactive skin
                  barriers.
                </p>
              </AccordionItem>

              <AccordionItem
                value="faq-2"
                title="How long before I notice visible results in my skin barrier?"
              >
                <p className="text-xs text-ink-500 leading-relaxed pt-1">
                  In independent clinical trials, 94% of participants noted immediate soothing and
                  decreased trans-epidermal water loss within 24 hours. Visible improvements in
                  radiance, tone, and skin elasticity typically emerge within 14 to 21 days of
                  consistent routine use.
                </p>
              </AccordionItem>

              <AccordionItem
                value="faq-3"
                title="Are your botanical ingredients vegan and cruelty-free?"
              >
                <p className="text-xs text-ink-500 leading-relaxed pt-1">
                  100%. We are Leaping Bunny certified cruelty-free and certified vegan. We never
                  test on animals, use animal by-products (such as beeswax, lanolin, or carmine), or
                  license formulas to territories requiring animal testing.
                </p>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Section 2: Shipping & Delivery */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-ink-900 border-b border-cream-200 pb-2">
              Shipping & Delivery
            </h2>
            <Accordion type="single" collapsible>
              <AccordionItem
                value="faq-ship-1"
                title="How long does standard shipping take?"
              >
                <p className="text-xs text-ink-500 leading-relaxed pt-1">
                  Orders placed before 2:00 PM EST ship same-day from our climate-controlled
                  fulfillment facility. Standard domestic delivery takes 2 to 4 business days.
                </p>
              </AccordionItem>

              <AccordionItem
                value="faq-ship-2"
                title="What is your threshold for complimentary free shipping?"
              >
                <p className="text-xs text-ink-500 leading-relaxed pt-1">
                  We offer Free Complimentary Standard Shipping on all orders of $50 or more (₹999 in
                  India). Orders below this threshold ship for a flat nominal rate of $5.
                </p>
              </AccordionItem>

              <AccordionItem
                value="faq-ship-3"
                title="How do I track my order once it has shipped?"
              >
                <p className="text-xs text-ink-500 leading-relaxed pt-1">
                  As soon as your parcel is scanned by our carrier, you will receive an email and
                  SMS with live tracking milestones and estimated delivery window. You can also view
                  tracking in your customer portal.
                </p>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Section 3: Returns & Happiness Guarantee */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-ink-900 border-b border-cream-200 pb-2">
              Returns & 30-Day Guarantee
            </h2>
            <Accordion type="single" collapsible>
              <AccordionItem
                value="faq-ret-1"
                title="What is the 30-Day Gentle Guarantee?"
              >
                <p className="text-xs text-ink-500 leading-relaxed pt-1">
                  Skin chemistry is unique. If a formulation does not work harmoniously with your
                  skin, simply contact our support team within 30 days of receiving your order for a
                  prepaid return label and full refund.
                </p>
              </AccordionItem>

              <AccordionItem
                value="faq-ret-2"
                title="How do I initiate a return or exchange?"
              >
                <p className="text-xs text-ink-500 leading-relaxed pt-1">
                  Visit our <Link href="/contact" className="text-forest-800 underline">Contact page</Link> or email us at{" "}
                  <strong>{brandConfig.supportEmail}</strong> with your order number. Our care team
                  will issue a prepaid shipping label within 24 hours.
                </p>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Still have questions? */}
          <div className="p-8 text-center rounded-hero bg-cream-100 border border-cream-200 space-y-3">
            <h3 className="font-serif text-xl font-bold text-ink-900">
              Have a question that is not covered here?
            </h3>
            <p className="text-xs text-ink-500 max-w-sm mx-auto">
              Our botanical educators and customer concierge team are available Monday through Friday.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-forest-800 text-cream-50 text-xs font-semibold uppercase tracking-wider hover:bg-forest-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Our Care Concierge
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

