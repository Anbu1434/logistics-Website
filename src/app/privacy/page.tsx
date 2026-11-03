import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand";

export const metadata: Metadata = {
  title: `Privacy & Data Protection Policy | ${brandConfig.name}`,
  description: `How ${brandConfig.name} protects your personal information in compliance with GDPR, CCPA, and India DPDP standards.`,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-sage-300 selection:text-forest-900">
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1 py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy", current: true },
            ]}
          />

          <div className="space-y-2 border-b border-cream-200 pb-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900">
              Privacy & Data Protection Policy
            </h1>
            <p className="text-xs text-ink-500">
              Effective Date: November 3, 2026 • Compliant with GDPR, CCPA, and India DPDP 2023.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-ink-500 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-ink-900">1. Data Controller</h2>
              <p>
                {brandConfig.name} operates the platform located at {brandConfig.domain}. We are
                committed to respecting your privacy rights and ensuring that personal information
                entrusted to us is treated with strict confidentiality.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-ink-900">
                2. Information We Collect
              </h2>
              <p>We collect information directly provided by you, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-ink-900">Identity and Contact Data:</strong> Name, email
                  address, telephone number, shipping, and billing addresses.
                </li>
                <li>
                  <strong className="text-ink-900">Payment Information:</strong> Card and UPI
                  details are processed solely by certified PCI-DSS Level 1 payment processors
                  (Stripe and Razorpay). We never receive or store raw payment card data on our
                  servers (PCI SAQ-A compliant).
                </li>
                <li>
                  <strong className="text-ink-900">Diagnostic Skin Profiles:</strong> Optional
                  answers submitted through our diagnostic Skin Routine Quiz to generate
                  personalized recommendations.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-ink-900">
                3. Your Rights (GDPR & Data Portability)
              </h2>
              <p>
                Under global privacy legislation, you maintain the right to access, rectify, export,
                or erase your stored personal data at any time. You can trigger an automated data
                export or account erasure request directly through your customer dashboard or by
                emailing <strong>{brandConfig.supportEmail}</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

