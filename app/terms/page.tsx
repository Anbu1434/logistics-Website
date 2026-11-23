import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Carriage & Service",
  description: "Standard terms and conditions governing international ocean, air, and highway freight forwarding and bonded warehousing.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Terms of Carriage & Service"
        description="Standard operating terms and conditions governing maritime bills of lading, airway bills, highway bills of lading, and bonded storage contracts."
        breadcrumbs={[{ label: "Terms of Carriage" }]}
      />

      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-8 space-y-8 font-sans text-slate-700 leading-relaxed text-base">
          <Reveal y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">1. Scope of Agreement</h2>
              <p>
                These Terms of Carriage apply to all bookings, transport movements, customs filings, and warehousing agreements executed by {siteConfig.legalName} as an authorized freight forwarder and licensed property broker.
              </p>
            </div>
          </Reveal>

          <Reveal delay={60} y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">2. Bills of Lading & Documentation</h2>
              <p>
                All ocean shipments are subject to the terms of the issued Ocean Bill of Lading and applicable maritime conventions (including the Carriage of Goods by Sea Act - COGSA). Air freight is governed by Montreal Convention protocols and standard IATA Air Waybills.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">3. Quotations & Rate Validity</h2>
              <p>
                Unless explicitly guaranteed in an active service contract, standard spot rate quotations remain valid for 14 calendar days from generation and exclude unforeseen port detention, demurrage, or customs examination charges resulting from regulatory holds.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180} y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">4. Carrier Cargo Liability</h2>
              <p>
                Standard carrier statutory liability is limited in accordance with relevant international conventions. Shippers are strongly encouraged to obtain comprehensive all-risk marine cargo insurance through our risk management desk prior to dispatch.
              </p>
            </div>
          </Reveal>

          <Reveal delay={240} y={16}>
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">5. Governing Law & Jurisdiction</h2>
              <p>
                These terms are governed by the laws of the State of California and applicable federal maritime statutes of the United States.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

