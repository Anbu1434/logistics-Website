"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import brandConfig from "@/config/brand";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/collections/all" },
  { label: "Skincare", href: "/collections/skincare" },
  { label: "Makeup", href: "/collections/makeup" },
  { label: "Haircare", href: "/collections/haircare" },
  { label: "Combos", href: "/collections/combos" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Track scroll for sticky navbar shadow
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip to Content for WCAG 2.2 AA accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest-800 focus:text-cream-50 focus:rounded-pill focus:shadow-floating focus:outline-none"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 bg-cream-50/95 backdrop-blur-md border-b",
          isScrolled
            ? "border-cream-200/90 shadow-subtle py-3"
            : "border-cream-200/40 py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2 -ml-2 text-ink-900 rounded-full hover:bg-cream-100 focus:outline-none focus:ring-2 focus:ring-forest-800"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 rounded-pill px-1"
            >
              <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-cream-50 transition-transform group-hover:scale-105">
                <Sparkles className="w-4 h-4 text-sage-300" />
              </div>
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-ink-900">
                {brandConfig.name}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-ink-900/80"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative py-1 transition-colors hover:text-forest-800 focus:outline-none focus-visible:text-forest-800",
                      isActive && "text-forest-800 font-bold"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-800 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Search */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Pill Search bar (desktop) */}
              <div className="relative hidden md:block">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="relative flex items-center"
                >
                  <Search className="w-4 h-4 text-ink-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="search"
                    placeholder="Search skincare..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 lg:w-60 h-10 pl-9 pr-4 rounded-pill bg-cream-100 border border-cream-200/80 text-xs text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:ring-2 focus:ring-forest-800 focus:w-64 transition-all"
                  />
                </form>
              </div>

              {/* Mobile Search Icon Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Open search dialog"
                className="md:hidden p-2 text-ink-900 rounded-full hover:bg-cream-100 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/account/wishlist"
                aria-label="View Wishlist (0 items)"
                className="relative p-2 text-ink-900 rounded-full hover:bg-cream-100 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-800"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Shopping Bag / Cart Drawer Trigger */}
              <Link
                href="/cart"
                aria-label="View Cart (2 items)"
                className="relative p-2 text-ink-900 rounded-full hover:bg-cream-100 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-800"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-forest-800 text-cream-50 text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* User Account */}
              <Link
                href="/account"
                aria-label="Account profile"
                className="p-2 text-ink-900 rounded-full hover:bg-cream-100 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-800"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile search drop-down */}
          {searchOpen && (
            <div className="md:hidden pt-3 pb-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="relative flex items-center"
              >
                <Search className="w-4 h-4 text-ink-500 absolute left-3.5 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search skincare, serums, moisturizers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full h-10 pl-9 pr-4 rounded-pill bg-cream-100 border border-cream-200 text-xs text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile slide-over navigation drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-cream-50 shadow-floating p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-cream-200">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-forest-800 flex items-center justify-center text-cream-50">
                      <Sparkles className="w-3.5 h-3.5 text-sage-300" />
                    </div>
                    <span className="font-serif text-2xl font-bold">{brandConfig.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation drawer"
                    className="p-1.5 rounded-full hover:bg-cream-100 text-ink-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col space-y-3">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-2 text-sm font-semibold tracking-wider uppercase text-ink-900 hover:text-forest-800 border-b border-cream-200/50",
                        pathname === link.href && "text-forest-800 font-bold"
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 text-cream-200" />
                    </Link>
                  ))}
                  <Link
                    href="/quiz"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 py-2 text-sm font-semibold text-clay-500 flex items-center justify-between"
                  >
                    <span>Skin Routine Quiz</span>
                    <Sparkles className="w-4 h-4 text-clay-400" />
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-cream-200 text-xs text-ink-500 space-y-2">
                <p className="font-medium text-ink-900">{brandConfig.tagline}</p>
                <p>Support: {brandConfig.supportEmail}</p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
