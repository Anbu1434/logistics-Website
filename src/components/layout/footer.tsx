"use client";

import * as React from "react";
import Link from "next/link";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import brandConfig from "@/config/brand";
import { formatCurrency } from "@/lib/utils";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setIsSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="mt-auto bg-cream-100 border-t border-cream-200 text-ink-900">
      {/* 1. Trust Signal Strip (Reference A & B footer) */}
      <section
        aria-label="Brand Commitments"
        className="border-b border-cream-200/80 py-8 bg-cream-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-forest-800 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900">
                  Free Delivery
                </h4>
                <p className="text-xs text-ink-500 mt-0.5">
                  On orders above {formatCurrency(brandConfig.currency.freeShippingThreshold)}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-forest-800 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900">
                  Easy Returns
                </h4>
                <p className="text-xs text-ink-500 mt-0.5">Within 7 days of delivery</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-forest-800 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900">
                  100% Secure
                </h4>
                <p className="text-xs text-ink-500 mt-0.5">Encrypted 256-bit checkout</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-forest-800 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900">
                  Skincare Concierge
                </h4>
                <p className="text-xs text-ink-500 mt-0.5">Dermatological guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-cream-50">
                <Sparkles className="w-4 h-4 text-sage-300" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                {brandConfig.name}
              </span>
            </div>

            <p className="text-sm text-ink-500 leading-relaxed max-w-sm">
              {brandConfig.description}
            </p>

            {/* Newsletter Subscription Box */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900 mb-2">
                Join The Botanical Journal
              </h4>
              <p className="text-xs text-ink-500 mb-3">
                Receive 15% off your first order, ingredient stories & routine guides.
              </p>

              {isSubscribed ? (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-pill bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-medium text-brand-success">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to Verdéa! Check your inbox for your code.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    aria-label="Email for newsletter subscription"
                    className="flex-1 h-11 px-4 rounded-pill bg-cream-50 border border-cream-200 text-xs text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="h-11 px-5 rounded-pill bg-forest-800 text-cream-50 text-xs font-semibold uppercase tracking-wider hover:bg-forest-900 transition-colors flex items-center justify-center shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Column 1: Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900 mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-500 font-medium">
              <li>
                <Link href="/collections/cleansers" className="hover:text-forest-800 transition-colors">
                  Cleansers & Toners
                </Link>
              </li>
              <li>
                <Link href="/collections/serums" className="hover:text-forest-800 transition-colors">
                  Antioxidant Serums
                </Link>
              </li>
              <li>
                <Link href="/collections/moisturizers" className="hover:text-forest-800 transition-colors">
                  Barrier Creams & Gels
                </Link>
              </li>
              <li>
                <Link href="/collections/sunscreens" className="hover:text-forest-800 transition-colors">
                  Mineral Sunscreens
                </Link>
              </li>
              <li>
                <Link href="/collections/combos" className="hover:text-forest-800 transition-colors">
                  Routine Sets & Combos
                </Link>
              </li>
              <li>
                <Link href="/collections/best-sellers" className="hover:text-forest-800 transition-colors">
                  Award Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Skin Concerns */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900 mb-4">
              Skin Concerns
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-500 font-medium">
              <li>
                <Link href="/concerns/dullness" className="hover:text-forest-800 transition-colors">
                  Dullness & Dark Spots
                </Link>
              </li>
              <li>
                <Link href="/concerns/dryness" className="hover:text-forest-800 transition-colors">
                  Dryness & Dehydration
                </Link>
              </li>
              <li>
                <Link href="/concerns/acne" className="hover:text-forest-800 transition-colors">
                  Blemish & Acne Prone
                </Link>
              </li>
              <li>
                <Link href="/concerns/barrier" className="hover:text-forest-800 transition-colors">
                  Compromised Barrier
                </Link>
              </li>
              <li>
                <Link href="/concerns/aging" className="hover:text-forest-800 transition-colors">
                  Fine Lines & Elasticity
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-clay-500 font-semibold hover:underline">
                  Take Routine Quiz →
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Customer Care & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900 mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-500 font-medium">
              <li>
                <Link href="/about" className="hover:text-forest-800 transition-colors">
                  Our Botanical Science
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="hover:text-forest-800 transition-colors">
                  Full INCI Glossary
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-forest-800 transition-colors">
                  Shipping & Tracking
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-forest-800 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-forest-800 transition-colors">
                  Contact Dermatologist Support
                </Link>
              </li>
              <li>
                <Link href="/styleguide" className="hover:text-forest-800 transition-colors text-ink-500/70">
                  Design System Styleguide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-cream-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
          <p>© {new Date().getFullYear()} {brandConfig.name} Skincare Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
