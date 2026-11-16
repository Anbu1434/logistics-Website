"use client";

import * as React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Linkedin,
  Facebook,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { newsletterSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { useQuoteModal } from "@/context/quote-modal-context";
import { useTrackingModal } from "@/context/tracking-modal-context";

export function Footer() {
  const { openQuoteModal } = useQuoteModal();
  const { openTrackingModal } = useTrackingModal();
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [newsletterError, setNewsletterError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = newsletterSchema.safeParse({ email: newsletterEmail });
    if (!result.success) {
      setNewsletterError(
        result.error.issues?.[0]?.message || "Please enter a valid email address."
      );
      setIsSubscribed(false);
      return;
    }
    setNewsletterError("");
    setIsSubmitting(true);

    // Simulated network submit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setNewsletterEmail("");
    }, 400);
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <Linkedin
          className="w-4 h-4 text-white/70 group-hover:text-white transition-colors"
          strokeWidth={1.75}
        />
      ),
    },
    {
      name: "X",
      href: "https://x.com",
      icon: (
        <svg
          className="w-3.5 h-3.5 fill-white/70 group-hover:fill-white transition-colors"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <Facebook
          className="w-4 h-4 text-white/70 group-hover:text-white transition-colors"
          strokeWidth={1.75}
        />
      ),
    },
  ];

  return (
    <footer className="bg-navy-900 text-white border-t border-navy-700 select-none">
      <div className="max-w-container mx-auto px-6 pt-16 pb-12">
        {/* Main Grid: On mobile (<768px) 2 columns; on lg (1024px+) 5 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr_1.3fr] gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Logo & Two-Line Blurb */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1 lg:col-span-1 min-w-0">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-orange-500 text-white font-display font-bold text-[18px] flex items-center justify-center">
                {siteConfig.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <span className="font-display font-bold text-[20px] text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="font-sans text-[14px] leading-relaxed text-white/70">
              {siteConfig.footerBlurb}
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-4 col-span-1 min-w-0">
            <h4 className="font-display font-semibold text-[15px] uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-[14px] text-white/70">
              <li>
                <Link
                  href="/services/ocean-freight"
                  className="hover:text-white transition-colors"
                >
                  Ocean Freight
                </Link>
              </li>
              <li>
                <Link
                  href="/services/air-freight"
                  className="hover:text-white transition-colors"
                >
                  Air Freight
                </Link>
              </li>
              <li>
                <Link
                  href="/services/road-freight"
                  className="hover:text-white transition-colors"
                >
                  Road Freight
                </Link>
              </li>
              <li>
                <Link
                  href="/services/warehousing"
                  className="hover:text-white transition-colors"
                >
                  Warehousing & Distribution
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  All Logistics Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-4 col-span-1 min-w-0">
            <h4 className="font-display font-semibold text-[15px] uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-[14px] text-white/70">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="hover:text-white transition-colors"
                >
                  Industries Served
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openTrackingModal()}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Shipment
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openQuoteModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Request a Quote
                </button>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1 lg:col-span-1 min-w-0">
            <h4 className="font-display font-semibold text-[15px] uppercase tracking-wider text-white">
              Contact
            </h4>
            <div className="flex flex-col gap-3 font-sans text-[14px] text-white/70">
              <div className="flex items-start gap-2.5 min-w-0">
                <MapPin
                  className="w-4 h-4 text-orange-500 shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <span className="leading-snug">
                  {siteConfig.contact.address.street},{" "}
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.state}{" "}
                  {siteConfig.contact.address.zip}
                </span>
              </div>
              <div className="flex items-center gap-2.5 min-w-0">
                <Phone
                  className="w-4 h-4 text-orange-500 shrink-0"
                  strokeWidth={1.5}
                />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-mono text-[13px] hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5 min-w-0">
                <Mail
                  className="w-4 h-4 text-orange-500 shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-white/70 hover:text-white transition-colors break-words [overflow-wrap:anywhere] min-w-0"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-[13px] text-white/70">
                <Clock
                  className="w-4 h-4 text-orange-500 shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-0.5">
                  <span>{siteConfig.contact.hoursLine1}</span>
                  <span>{siteConfig.contact.hoursLine2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 5: Newsletter */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-2 lg:col-span-1 min-w-0">
            <h4 className="font-display font-semibold text-[15px] uppercase tracking-wider text-white">
              Newsletter
            </h4>
            <p className="font-sans text-[13px] text-white/70 leading-relaxed">
              Subscribe for trade route alerts, freight indices, and customs
              regulatory updates.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col gap-2 w-full"
            >
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Corporate email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterError) setNewsletterError("");
                  }}
                  placeholder="Enter corporate email"
                  aria-invalid={!!newsletterError}
                  className="w-full h-[44px] px-3.5 rounded-input bg-navy-700 border border-white/20 text-white placeholder:text-white/40 text-[14px] focus:outline-none focus:border-ocean-600 focus:ring-2 focus:ring-ocean-600/30"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSubmitting}
                  className="w-full h-[42px] justify-center"
                  showArrow={false}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              {newsletterError && (
                <p
                  className="text-[12px] text-orange-400 font-medium"
                  role="alert"
                >
                  {newsletterError}
                </p>
              )}
              {isSubscribed && (
                <p
                  className="text-[12px] text-emerald-400 font-medium flex items-center gap-1.5"
                  role="status"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed successfully! Thank you.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Row: Copyright, Legal Links, Social Icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 font-sans text-[13px] text-white/70 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </div>

          <div className="flex items-center justify-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Carriage
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors hover:border-white/40 hover:bg-white/5"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
