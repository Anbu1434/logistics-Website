import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy outlines how we collect, protect, and use shipment data, telemetry, and enterprise client information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Privacy Policy"
        description="How we collect, manage, and safeguard commercial shipping data, telematics, and enterprise client credentials."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-8 space-y-8 font-sans text-slate-700 leading-relaxed text-base">
          <Reveal y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">1. Information Collection</h2>
              <p>
                When you request a rate quote, track a consignment, or contact our dispatch team, we collect necessary business details including corporate email addresses, phone numbers, origin/destination facility coordinates, and commercial cargo descriptions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={60} y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">2. Use of Telematics & Sensor Data</h2>
              <p>
                GPS coordinates, temperature telemetry, and container seal status are collected exclusively to provide real-time tracking, generate automated electronic Proof of Delivery (e-POD), and ensure regulatory compliance for GDP pharmaceutical and food shipments.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">3. Customs & Regulatory Disclosures</h2>
              <p>
                Cargo manifests, bills of lading, and commercial invoices are transmitted securely to authorized customs authorities (such as U.S. Customs and Border Protection) solely to satisfy statutory import/export clearance requirements.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180} y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">4. Data Security & Storage</h2>
              <p>
                All client data is encrypted in transit using TLS 1.3 and at rest using AES-256 standards. We never sell, rent, or monetize client shipping records.
              </p>
            </div>
          </Reveal>

          <Reveal delay={240} y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">5. Contact Our Privacy Officer</h2>
              <p>
                For data access requests or inquiries regarding our data management practices, contact{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-orange-500 font-semibold underline">
                  {siteConfig.contact.email}
                </a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

