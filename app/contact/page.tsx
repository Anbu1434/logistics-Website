"use client";

import * as React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "Rate Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate or call /api/contact
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "Rate Inquiry",
        message: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        eyebrow="24/7 Operations Desk"
        title="Connect with our global freight dispatch team."
        highlight="freight dispatch team."
        description="Whether booking space on an urgent flight or inquiring about bulk ocean container schedules, our coordinators are on standby around the clock."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Direct Info & Operational Hubs */}
            <Reveal delay={60} y={20} className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">
                  Direct Inquiries
                </span>
                <Reveal as="h2" delay={60} y={16} className="font-display font-bold text-3xl text-ink mt-2 mb-4">
                  Speak directly with an operations coordinator.
                </Reveal>
                <Reveal as="p" delay={120} y={12} className="font-sans text-base text-slate-600 leading-relaxed">
                  We don&apos;t use automated phone trees. You will be connected directly to an experienced logistics coordinator based in your regional timezone.
                </Reveal>
              </div>

              <Reveal delay={180} y={12} className="space-y-6 pt-6 border-t border-line">
                {/* Phone */}
                <Reveal y={8} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-line flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-mono block">Telephone</span>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="font-display font-bold text-lg text-ink hover:text-orange-500 transition-colors"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                    <span className="text-xs text-slate-500 block mt-0.5">Toll-free dispatch & rate desk</span>
                  </div>
                </Reveal>

                {/* Email */}
                <Reveal delay={60} y={8} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-line flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-mono block">Email Inquiries</span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-display font-bold text-lg text-ink hover:text-orange-500 transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <span className="text-xs text-slate-500 block mt-0.5">Average response time: &lt; 20 minutes</span>
                  </div>
                </Reveal>

                {/* Address */}
                <Reveal delay={120} y={8} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-line flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-mono block">Headquarters</span>
                    <p className="font-sans text-sm text-ink font-semibold">
                      {siteConfig.contact.address.street}
                    </p>
                    <p className="font-sans text-xs text-slate-600">
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}, {siteConfig.contact.address.country}
                    </p>
                  </div>
                </Reveal>

                {/* Hours */}
                <Reveal delay={180} y={8} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-line flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-mono block">Operating Hours</span>
                    <p className="font-sans text-sm text-ink font-semibold">
                      {siteConfig.contact.hours}
                    </p>
                    <span className="text-xs text-emerald-600 font-semibold block mt-0.5">
                      24/7 Emergency Line available for active shipments
                    </span>
                  </div>
                </Reveal>

              </Reveal>
            </Reveal>

            {/* Right Column: Contact Message Form */}
            <Reveal delay={120} y={20} className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-[22px] border border-line bg-white shadow-soft">
                <Reveal as="h3" y={16} className="font-display font-bold text-2xl text-ink mb-2">
                  Send a Message
                </Reveal>
                <Reveal as="p" delay={60} y={12} className="font-sans text-sm text-slate-600 mb-8">
                  Fill out the form below and an operational specialist will reach out promptly.
                </Reveal>

                {isSubmitted ? (
                  <div className="motion-rise p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex flex-col items-center text-center gap-3"
                       style={{ "--motion-delay": "0ms", "--rise-distance": "8px", "--rise-duration": "300ms" } as React.CSSProperties}>
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" aria-hidden="true" />
                    <h4 className="font-display font-bold text-lg">Message Received</h4>
                    <p className="text-sm text-emerald-700 max-w-[420px]">
                      Thank you for contacting us. A logistics coordinator will review your inquiry and reply within 30 minutes.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-2 text-xs font-semibold text-emerald-800 underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase font-mono text-slate-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="John Smith"
                          className="w-full h-[48px] px-4 rounded-lg border border-line bg-sky-50 text-ink placeholder:text-slate-400 transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase font-mono text-slate-700 mb-1.5">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full h-[48px] px-4 rounded-lg border border-line bg-sky-50 text-ink placeholder:text-slate-400 transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase font-mono text-slate-700 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full h-[48px] px-4 rounded-lg border border-line bg-sky-50 text-ink placeholder:text-slate-400 transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase font-mono text-slate-700 mb-1.5">
                          Inquiry Type
                        </label>
                        <select
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          className="w-full h-[48px] px-4 rounded-lg border border-line bg-sky-50 text-ink transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-sans"
                        >
                          <option value="Rate Inquiry">Rate Quote Request</option>
                          <option value="Tracking Status">Active Shipment Support</option>
                          <option value="Customs Brokerage">Customs & Compliance</option>
                          <option value="Partnership">Carrier Partnership</option>
                          <option value="Other">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase font-mono text-slate-700 mb-1.5">
                        Shipment Details or Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Please include origin, destination, cargo type, and any handling requirements..."
                        className="w-full p-4 rounded-lg border border-line bg-sky-50 text-ink placeholder:text-slate-400 transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-sans resize-y"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className="w-full h-[48px] text-sm font-semibold"
                    >
                      {isSubmitting ? "Sending..." : "Submit Inquiry"}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

