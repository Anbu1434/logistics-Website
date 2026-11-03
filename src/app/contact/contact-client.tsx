"use client";

import * as React from "react";
import { Mail, MapPin, CheckCircle2, Clock, Loader2, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand";

export function ContactClient() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    orderNumber: "",
    topic: "routine",
    message: "",
    honeypot: "", // Bot spam protection
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bots

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us", current: true },
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-pill bg-sage-100 border border-sage-300 text-xs font-semibold uppercase tracking-wider text-forest-800">
          We Are Here For You
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink-900 tracking-tight">
          Connect With Our Skin Educators
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">
          Whether you need a tailored ingredient consultation, order assistance, or wholesale
          inquiries, our concierge team is delighted to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Contact Details & Service Hours */}
        <div className="lg:col-span-5 space-y-6 bg-cream-100/60 p-6 sm:p-8 rounded-card border border-cream-200">
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-ink-900">Concierge Desk</h2>
            <p className="text-xs text-ink-500 leading-relaxed">
              Every inquiry is answered directly by a certified cosmetic chemist or skincare
              specialist within one business day.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-cream-200 text-xs text-ink-900">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-forest-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Email Concierge</p>
                <p className="text-ink-500">{brandConfig.supportEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-forest-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Operational Hours</p>
                <p className="text-ink-500">Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                <p className="text-ink-500">Saturday: 10:00 AM – 2:00 PM EST</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-forest-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Formulation Laboratory</p>
                <p className="text-ink-500">
                  {brandConfig.address.street}, {brandConfig.address.city},{" "}
                  {brandConfig.address.state} {brandConfig.address.postalCode}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-sage-100/60 border border-sage-300 text-xs text-forest-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" />
              Need quick formula advice?
            </p>
            <p className="text-[11px] leading-relaxed">
              Take our 2-minute diagnostic skin quiz for automated routine recommendations matched
              to your specific barrier concerns.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <div className="lg:col-span-7 bg-cream-50 p-6 sm:p-8 rounded-card border border-cream-200 shadow-soft">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-sage-100 border border-sage-300 flex items-center justify-center mx-auto text-forest-800 shadow-subtle">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-ink-900">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-ink-500 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our care team will review your message
                  and reply to <strong>{formData.email}</strong> within 24 hours.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-pill mt-2"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    orderNumber: "",
                    topic: "routine",
                    message: "",
                    honeypot: "",
                  });
                }}
              >
                Send Another Note
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bot trap honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink-900">
                    Your Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-pill bg-cream-100 border border-cream-200 text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink-900">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 px-3 rounded-pill bg-cream-100 border border-cream-200 text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink-900">Inquiry Topic</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full h-10 px-3 rounded-pill bg-cream-100 border border-cream-200 text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  >
                    <option value="routine">Routine & Ingredient Consultation</option>
                    <option value="order">Order Status & Tracking</option>
                    <option value="returns">Returns & 30-Day Guarantee</option>
                    <option value="wholesale">Wholesale & Partnership</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink-900">
                    Order Number <span className="text-ink-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ORD-1004"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full h-10 px-3 rounded-pill bg-cream-100 border border-cream-200 text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink-900">
                  How May We Assist You? <span className="text-danger">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your skin goals, inquiry, or question..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-cream-100 border border-cream-200 text-xs text-ink-900 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="default"
                disabled={isSubmitting}
                className="w-full rounded-pill mt-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Send Note to Care Concierge"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
