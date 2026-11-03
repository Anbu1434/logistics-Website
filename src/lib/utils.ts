import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import brandConfig from "@/config/brand";

/**
 * Combines class names with tailwind-merge and clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a monetary value according to brand currency rules
 * Defaults to INR (₹) or USD based on currency param
 */
export function formatCurrency(
  amount: number,
  currencyCode = brandConfig.currency.code,
  locale = brandConfig.currency.locale
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    // Fallback if Intl fails
    const symbol = currencyCode === "INR" ? "₹" : "$";
    return `${symbol}${amount.toLocaleString()}`;
  }
}

/**
 * Calculates discount percentage
 */
export function calculateDiscountPercent(regularPrice: number, compareAtPrice: number): number {
  if (!compareAtPrice || compareAtPrice <= regularPrice) return 0;
  return Math.round(((compareAtPrice - regularPrice) / compareAtPrice) * 100);
}

/**
 * Slugifies a string for clean URL paths
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

