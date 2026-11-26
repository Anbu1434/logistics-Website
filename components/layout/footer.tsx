"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Linkedin,
  Facebook,
  Instagram,
  Loader2,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { newsletterSchema } from "@/lib/validators";
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

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubscribed(true);
        setNewsletterEmail("");
      } else {
        setNewsletterError(
          data.message || "Unable to complete subscription. Please try again."
        );
      }
    } catch {
      setNewsletterError(
        "Network error. Subscription service is temporarily unavailable."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <Linkedin className="w-4 h-4" strokeWidth={1.75} />,
    },
    {
      name: "X",
      href: "https://x.com",
      icon: (
        <svg
          className="w-3.5 h-3.5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: <Instagram className="w-4 h-4" strokeWidth={1.75} />,
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: <Facebook className="w-4 h-4" strokeWidth={1.75} />,
    },
  ];

  return (
    <footer className="relative bg-[#0B1F3A] text-white border-t border-slate-800/80 overflow-hidden select-none">
      {/* Subtle orange ambient glow in bottom corners */}
      <div
        className="pointer-events-none absolute -bottom-12 -left-12 w-[320px] h-[220px] bg-[#F45B0B]/[0.035] blur-[90px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-12 -right-12 w-[320px] h-[220px] bg-[#F45B0B]/[0.035] blur-[90px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-14 sm:pb-16">
          {/* Column 1: Brand */}
          <div className="flex flex-col items-start col-span-1 md:col-span-2 lg:col-span-3 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
              aria-label={`${siteConfig.name} Home`}
            >
              {/* Brand Logo */}
              <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt={`${siteConfig.name} logo`}
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-display font-bold text-[21px] md:text-[22px] tracking-tight leading-none text-white group-hover:text-white transition-colors">
                  {siteConfig.name}
                </span>
                <span className="font-sans text-[10px] tracking-[0.16em] uppercase font-semibold mt-1 leading-none text-slate-400">
                  GLOBAL LOGISTICS
                </span>
              </div>
            </Link>

            <p className="mt-4 font-sans text-[14px] leading-[1.65] text-slate-400 max-w-[320px]">
              {siteConfig.footerBlurb}
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col col-span-1 md:col-span-1 lg:col-span-2 min-w-0">
            <h4 className="font-display font-semibold text-[15px] sm:text-[16px] text-white tracking-wide mb-4 sm:mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-[14px] text-slate-400">
              <li>
                <Link
                  href="/services/ocean-freight"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  Ocean Freight
                </Link>
              </li>
              <li>
                <Link
                  href="/services/air-freight"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  Air Freight
                </Link>
              </li>
              <li>
                <Link
                  href="/services/road-freight"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  Road Freight
                </Link>
              </li>
              <li>
                <Link
                  href="/services/warehousing"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  Warehousing & Distribution
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  All Logistics Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col col-span-1 md:col-span-1 lg:col-span-2 min-w-0">
            <h4 className="font-display font-semibold text-[15px] sm:text-[16px] text-white tracking-wide mb-4 sm:mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-[14px] text-slate-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  Industries Served
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openTrackingModal()}
                  className="hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  Track Shipment
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openQuoteModal}
                  className="hover:text-white transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  Request a Quote
                </button>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col col-span-1 md:col-span-1 lg:col-span-2 min-w-0">
            <h4 className="font-display font-semibold text-[15px] sm:text-[16px] text-white tracking-wide mb-4 sm:mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-3 font-sans text-[13.5px] text-slate-400">
              {/* Address */}
              <div className="flex items-start gap-2.5 min-w-0">
                <MapPin
                  className="w-4 h-4 text-[#F45B0B] shrink-0 mt-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="leading-snug">
                  {siteConfig.contact.address.street},{" "}
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.state}{" "}
                  {siteConfig.contact.address.zip}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5 min-w-0">
                <Phone
                  className="w-4 h-4 text-[#F45B0B] shrink-0"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-mono text-[13px] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5 min-w-0">
                <Mail
                  className="w-4 h-4 text-[#F45B0B] shrink-0 mt-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors break-words [overflow-wrap:anywhere] min-w-0 focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-2.5 min-w-0 pt-0.5">
                <Clock
                  className="w-4 h-4 text-[#F45B0B] shrink-0 mt-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div className="flex flex-col text-[12.5px] leading-snug text-slate-400">
                  <span>{siteConfig.contact.hoursLine1}</span>
                  <span>{siteConfig.contact.hoursLine2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 5: Newsletter */}
          <div className="flex flex-col col-span-1 md:col-span-1 lg:col-span-3 min-w-0">
            <h4 className="font-display font-semibold text-[15px] sm:text-[16px] text-white tracking-wide uppercase mb-4 sm:mb-5">
              NEWSLETTER
            </h4>
            <p className="font-sans text-[13.5px] text-slate-400 leading-relaxed mb-4">
              Subscribe for trade updates, logistics insights, and company news.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col gap-2.5 w-full"
              noValidate
            >
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterError) setNewsletterError("");
                  }}
                  placeholder="Enter your email"
                  aria-invalid={!!newsletterError}
                  aria-describedby={
                    newsletterError
                      ? "newsletter-error"
                      : isSubscribed
                      ? "newsletter-success"
                      : undefined
                  }
                  className="w-full h-[44px] px-3.5 rounded-input bg-[#122744] border border-white/15 text-white placeholder:text-slate-400 text-[14px] focus:outline-none focus:border-[#F45B0B] focus:ring-2 focus:ring-[#F45B0B]/30 transition-colors"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[42px] rounded-btn bg-[#F45B0B] hover:bg-[#d94d07] active:bg-[#c34305] text-white font-sans font-semibold text-[14px] tracking-wide flex items-center justify-center transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-white"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Subscribing...</span>
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {newsletterError && (
                <p
                  id="newsletter-error"
                  className="text-[12.5px] text-orange-400 font-medium"
                  role="alert"
                >
                  {newsletterError}
                </p>
              )}

              {isSubscribed && (
                <p
                  id="newsletter-success"
                  className="text-[12.5px] text-emerald-400 font-medium flex items-center gap-1.5"
                  role="status"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed successfully! Thank you.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Thin Horizontal Divider */}
        <div className="w-full h-px bg-white/10" aria-hidden="true" />

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 font-sans text-[13.5px] text-slate-400 text-center md:text-left">
          {/* Left: Copyright */}
          <div>
            © 2026 {siteConfig.name}. All rights reserved.
          </div>

          {/* Center: Legal Links */}
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
            >
              Terms of Carriage
            </Link>
          </div>

          {/* Right: Circular Outline Social Icons */}
          <div className="flex items-center justify-center gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#F45B0B] hover:bg-[#F45B0B]/10 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-ocean-600"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized Background Wordmark: YOUBAY */}
      <div
        className="pointer-events-none select-none absolute bottom-[-14%] sm:bottom-[-18%] lg:bottom-[-22%] left-1/2 -translate-x-1/2 z-0 overflow-hidden leading-none opacity-[0.05] text-white"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[18vw] sm:text-[16.5vw] lg:text-[15vw] tracking-[-0.04em] whitespace-nowrap block">
          YOUBAY
        </span>
      </div>
    </footer>
  );
}
