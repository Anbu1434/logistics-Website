"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE } from "@/lib/motion";

const DROPDOWN_OPEN_DELAY = 80;
const DROPDOWN_CLOSE_DELAY = 120;

export function Header() {
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();
  const reducedMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const dropdownPanelRef = React.useRef<HTMLDivElement>(null);
  const servicesButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const hoverTimer = React.useRef<number | null>(null);
  const openByKeyboard = React.useRef(false);

  const closeMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useBodyScrollLock(isMobileMenuOpen);
  useFocusTrap(isMobileMenuOpen, mobileMenuRef, closeMobileMenu);

  // Scroll state, throttled to one update per frame.
  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 40);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Reset overlays on route change.
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  // Close dropdown on outside pointer press.
  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  // Move focus into the dropdown only when it was opened from the keyboard.
  React.useEffect(() => {
    if (!isServicesOpen || !openByKeyboard.current) return;
    const frame = window.requestAnimationFrame(() => {
      const firstItem =
        dropdownPanelRef.current?.querySelector<HTMLElement>("a");
      firstItem?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isServicesOpen]);

  React.useEffect(() => {
    return () => {
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    };
  }, []);

  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const scheduleOpen = () => {
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(
      () => setIsServicesOpen(true),
      DROPDOWN_OPEN_DELAY
    );
  };

  const scheduleClose = () => {
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(
      () => setIsServicesOpen(false),
      DROPDOWN_CLOSE_DELAY
    );
  };

  const closeServices = () => {
    clearHoverTimer();
    setIsServicesOpen(false);
  };

  const handleDropdownKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeServices();
      servicesButtonRef.current?.focus();
    }
  };

  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    const items = Array.from(
      dropdownPanelRef.current?.querySelectorAll<HTMLElement>("a") ?? []
    );
    if (!items.length) return;

    event.preventDefault();
    const currentIndex = items.indexOf(
      document.activeElement as HTMLElement
    );
    const nextIndex =
      event.key === "ArrowDown"
        ? (currentIndex + 1) % items.length
        : (currentIndex - 1 + items.length) % items.length;
    items[nextIndex]?.focus();
  };

  const isHome = pathname === "/";
  const showWhiteNav = isScrolled || !isHome;

  const serviceIcons = {
    "Ocean Freight": Ship,
    "Air Freight": Plane,
    "Road Freight": Truck,
    Warehousing: Warehouse,
  };

  const dropdownMotion = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: -6, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: 0.18, ease: EASE.out },
      };

  return (
    <>
      <header
        className={cn(
          "header-enter fixed top-0 left-0 right-0 z-50 h-[72px]",
          "transition-[background-color,color,border-color,box-shadow] duration-300",
          showWhiteNav
            ? "bg-white border-b border-line shadow-soft text-navy-900"
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
              <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-105">
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
                    "font-display font-bold text-[19px] md:text-[18px] tracking-tight leading-none transition-colors duration-300",
                    showWhiteNav ? "text-navy-900" : "text-white"
                  )}
                >
                  {siteConfig.name}
                </span>
                <span
                  className={cn(
                    "font-sans text-[10px] tracking-[0.16em] uppercase font-semibold mt-1 leading-none transition-colors duration-300",
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
                    onMouseEnter={scheduleOpen}
                    onMouseLeave={scheduleClose}
                    onFocusCapture={() => {
                      clearHoverTimer();
                      setIsServicesOpen(true);
                    }}
                    onBlurCapture={(event) => {
                      if (
                        !event.currentTarget.contains(
                          event.relatedTarget as Node | null
                        )
                      ) {
                        setIsServicesOpen(false);
                      }
                    }}
                    onKeyDown={handleDropdownKeyDown}
                  >
                    <button
                      ref={servicesButtonRef}
                      type="button"
                      onClick={() => setIsServicesOpen((prev) => !prev)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowDown") {
                          event.preventDefault();
                          openByKeyboard.current = true;
                          setIsServicesOpen(true);
                        }
                      }}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      className={cn(
                        "inline-flex items-center gap-1 text-[15px] font-semibold tracking-[0] transition-colors duration-150 py-2 rounded",
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
                        aria-hidden="true"
                      />
                    </button>

                    {/* Services Dropdown Panel */}
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          ref={dropdownPanelRef}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] pt-2 z-50"
                          {...dropdownMotion}
                          onKeyDown={handlePanelKeyDown}
                        >
                          <div className="bg-white rounded-card border border-line shadow-lift p-2 flex flex-col gap-1 text-ink">
                            {item.children.map((subItem, index) => {
                              const IconComponent =
                                serviceIcons[
                                  subItem.label as keyof typeof serviceIcons
                                ] || Ship;
                              return (
                                <motion.div
                                  key={subItem.label}
                                  initial={
                                    reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }
                                  }
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.18,
                                    delay: reducedMotion ? 0 : index * 0.025,
                                    ease: EASE.out,
                                  }}
                                >
                                  <Link
                                    href={subItem.href}
                                    onClick={closeServices}
                                    className="flex items-start gap-3 p-3 rounded-input hover:bg-sky-50 transition-colors group"
                                  >
                                    <div className="w-9 h-9 rounded-md bg-sky-50 border border-line flex items-center justify-center text-ocean-600 shrink-0 group-hover:bg-white group-hover:border-ocean-600/30 transition-colors">
                                      <IconComponent
                                        className="w-5 h-5 text-ocean-600"
                                        strokeWidth={1.5}
                                        aria-hidden="true"
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
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
              <Phone className="w-4 h-4 text-orange-500 shrink-0" strokeWidth={1.5} aria-hidden="true" />
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
              aria-expanded={isMobileMenuOpen}
              className={cn(
                "md:hidden w-10 h-10 rounded-input flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-ocean-600",
                showWhiteNav
                  ? "text-navy-900 hover:bg-sky-50"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Menu className="w-8 h-8" strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Drawer (Navy-900) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-0 z-[55] bg-navy-900 text-white flex flex-col justify-between p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top Bar inside Drawer */}
            <motion.div
              className="flex items-center justify-between border-b border-white/10 pb-5"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0.15 : 0.28,
                ease: EASE.out,
              }}
            >
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
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="w-10 h-10 rounded-input bg-white/10 text-white hover:bg-white/20 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-ocean-600 transition-colors"
              >
                <X className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </motion.div>

            {/* Large Navigation Links */}
            <nav className="flex flex-col gap-6 py-8">
              {siteConfig.nav.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col gap-3"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0.15 : 0.3,
                    delay: reducedMotion ? 0 : 0.08 + index * 0.04,
                    ease: EASE.out,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="font-display font-semibold text-[28px] tracking-[0] text-white hover:text-orange-500 transition-colors flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className="w-6 h-6 text-white/40 motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </Link>

                  {item.children && (
                    <div className="grid grid-cols-2 gap-2 pl-2 pt-1 border-l-2 border-white/10">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={closeMobileMenu}
                          className="text-[15px] font-sans tracking-[0] text-slate-300 hover:text-white py-1 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Pinned Bottom Area with Contact & Get a Quote Button */}
            <motion.div
              className="flex flex-col gap-4 border-t border-white/10 pt-6"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0.15 : 0.24,
                delay: reducedMotion ? 0 : 0.08 + siteConfig.nav.length * 0.04,
                ease: EASE.out,
              }}
            >
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-[15px] font-mono tracking-[0] transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500" strokeWidth={1.5} aria-hidden="true" />
                <span>{siteConfig.contact.phone}</span>
              </a>

              <Button
                variant="primary"
                className="w-full h-[52px] text-[16px]"
                onClick={() => {
                  closeMobileMenu();
                  openQuoteModal();
                }}
              >
                Get a Quote
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
