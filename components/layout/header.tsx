"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Ship,
  Plane,
  Truck,
  Warehouse,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/quote-modal-context";

export function Header() {
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Section 6: Transparent over hero (no border), switches to white background with navy text & bottom border after 40px of scroll
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close dropdown on outside click or escape
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isHome = pathname === "/";
  // Transparent only when on home page AND unscrolled (<= 40px)
  const showWhiteNav = isScrolled || !isHome;

  const serviceIcons = {
    "Ocean Freight": Ship,
    "Air Freight": Plane,
    "Road Freight": Truck,
    Warehousing: Warehouse,
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 select-none",
          showWhiteNav
            ? "bg-white/95 backdrop-blur-md border-b border-line shadow-soft text-navy-900"
            : "bg-transparent text-white"
        )}
      >
        <div className="max-w-[1320px] mx-auto h-full px-5 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-ocean-600 rounded"
              aria-label={`${siteConfig.name} Home`}
            >
              <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt={`${siteConfig.name} logo`}
                  fill
                  sizes="44px"
                  priority
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-display font-bold text-[19px] md:text-[18px] tracking-tight leading-none transition-colors",
                    showWhiteNav ? "text-navy-900" : "text-white"
                  )}
                >
                  {siteConfig.name}
                </span>
                <span
                  className={cn(
                    "font-sans text-[10px] tracking-[0.16em] uppercase font-semibold mt-1 leading-none",
                    showWhiteNav ? "text-slate-600" : "text-white/90"
                  )}
                >
                  GLOBAL LOGISTICS
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Main Navigation */}
          <nav
            className="hidden md:flex items-center justify-center gap-6 lg:gap-8 flex-1"
            aria-label="Main Navigation"
          >
            {siteConfig.nav.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen((prev) => !prev)}
                      aria-expanded={isServicesOpen}
                      className={cn(
                        "inline-flex items-center gap-1 text-[15px] font-semibold tracking-[0] transition-colors duration-150 py-2",
                        showWhiteNav
                          ? "text-navy-900 hover:text-orange-500"
                          : "text-white hover:text-orange-500",
                        isServicesOpen && "text-orange-500"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isServicesOpen && "rotate-180"
                        )}
                        strokeWidth={1.5}
                      />
                    </button>

                    {/* Services Dropdown Panel */}
                    {isServicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="bg-white rounded-card border border-line shadow-lift p-2 flex flex-col gap-1 text-ink">
                          {item.children.map((subItem) => {
                            const IconComponent =
                              serviceIcons[
                                subItem.label as keyof typeof serviceIcons
                              ] || Ship;
                            return (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                onClick={() => setIsServicesOpen(false)}
                                className="flex items-start gap-3 p-3 rounded-input hover:bg-sky-50 transition-colors group"
                              >
                                <div className="w-9 h-9 rounded-md bg-sky-50 border border-line flex items-center justify-center text-ocean-600 shrink-0 group-hover:bg-white group-hover:border-ocean-600/30 transition-colors">
                                  <IconComponent
                                    className="w-5 h-5 text-ocean-600"
                                    strokeWidth={1.5}
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-sans font-semibold text-[14px] tracking-[0] text-ink group-hover:text-ocean-600 transition-colors">
                                    {subItem.label}
                                  </span>
                                  {subItem.description && (
                                    <span className="text-[12px] text-slate-600 leading-snug line-clamp-1 mt-0.5">
                                      {subItem.description}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-[15px] font-semibold tracking-[0] transition-colors duration-150 py-2",
                    showWhiteNav
                      ? "text-navy-900 hover:text-orange-500"
                      : "text-white hover:text-orange-500"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Phone, Quote button, and Mobile Hamburger */}
          <div className="flex items-center justify-end gap-3 lg:gap-4 shrink-0">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className={cn(
                "hidden md:inline-flex items-center gap-2 text-[14px] font-semibold tracking-[0] transition-colors p-2 rounded focus-visible:outline-2 focus-visible:outline-ocean-600",
                showWhiteNav
                  ? "text-navy-900 hover:text-orange-500"
                  : "text-white hover:text-orange-500"
              )}
              aria-label={`Call dispatch: ${siteConfig.contact.phone}`}
            >
              <Phone className="w-4 h-4 text-orange-500 shrink-0" strokeWidth={1.5} />
              <span className="hidden lg:inline font-mono text-[13px] tracking-[0] whitespace-nowrap">
                {siteConfig.contact.phone}
              </span>
            </a>

            {/* Primary Get a Quote button */}
            <Button
              variant="primary"
              size="sm"
              onClick={openQuoteModal}
              className="hidden md:inline-flex"
            >
              Get a Quote
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className={cn(
                "md:hidden w-10 h-10 rounded-input flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600",
                showWhiteNav
                  ? "text-navy-900 hover:bg-sky-50"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Menu className="w-8 h-8" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Drawer (Navy-900) */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-navy-900 text-white flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt={`${siteConfig.name} logo`}
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-[20px] tracking-[0] text-white">
                {siteConfig.name}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-input bg-white/10 text-white hover:bg-white/20 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-ocean-600"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Large Navigation Links */}
          <nav className="flex flex-col gap-6 py-8">
            {siteConfig.nav.map((item) => (
              <div key={item.label} className="flex flex-col gap-3">
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-semibold text-[28px] tracking-[0] text-white hover:text-orange-500 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-6 h-6 text-white/40" strokeWidth={1.5} />
                </Link>

                {item.children && (
                  <div className="grid grid-cols-2 gap-2 pl-2 pt-1 border-l-2 border-white/10">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[15px] font-sans tracking-[0] text-slate-300 hover:text-white py-1"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Pinned Bottom Area with Contact & Get a Quote Button */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-[15px] font-mono tracking-[0]"
            >
              <Phone className="w-4 h-4 text-orange-500" strokeWidth={1.5} />
              <span>{siteConfig.contact.phone}</span>
            </a>

            <Button
              variant="primary"
              className="w-full h-[52px] text-[16px]"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openQuoteModal();
              }}
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
