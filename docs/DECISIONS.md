# Architectural Decision Records (ADRs) - Verdéa Skincare Platform

## ADR-001: Original Design Synthesis ("Quiet Luxury Meets Botanical Science")
- **Date:** 2026-11-03
- **Context:** The project requires a high-converting, original e-commerce experience for a premium skincare brand inspired by two references (Reference A: forest/sage trust-first storefront; Reference B: cream/beige luxury floating container layout).
- **Decision:** We unified both references into an original aesthetic:
  - **Color palette:** Warm cream canvas (`#FBF8F3`, `#F4EEE4`), deep botanical forest greens (`#24351B`, `#3F5A2E`) for high-contrast primary actions, soft sage (`#E6ECDD`) for sectioning, clay (`#C98F72`) for offers/swatches, and warm gold (`#B8935A`) for ratings.
  - **Containers:** 28–32px hero container curves, 20px product cards, full-pill buttons and badges.
  - **Conversion elements:** Overlapping floating best-seller card on hero, trust-signal strips, live threshold shipping bar, customer reviews, and category tiles with frosted label bars and arrow buttons.
  - **Compliance:** Verified WCAG 2.2 AA contrast across all color pairings (minimum 4.5:1 for body text, 3:1 for large display/interactive elements).

## ADR-002: Modular Application Structure (`src/` Directory)
- **Date:** 2026-11-03
- **Context:** Large-scale e-commerce applications require strict separation of concerns across presentation, domain logic, data models, and configurations.
- **Decision:** Adopted standard Next.js 14 App Router layout under `src/`:
  - `src/config/`: Centralized brand settings (`brand.ts`), navigation, and payment constants.
  - `src/lib/`: Typed environment validation (`env.ts`), utility formatters (`utils.ts`).
  - `src/components/ui/`: Atomic, reusable accessible design system components.
  - `src/components/layout/`: Global announcement bar, sticky header, and multi-column footer.
  - `src/app/`: App router routes (`/`, `/styleguide`, and forthcoming catalog/checkout/admin routes).

## ADR-003: Strict Typed Environment Validation
- **Date:** 2026-11-03
- **Context:** Undetected missing secrets in production lead to runtime crashes during checkout or webhook processing.
- **Decision:** Built a centralized `src/lib/env.ts` using Zod to parse and validate all environment variables at startup. In development, sensible mock defaults prevent developer blockage; in production, missing mandatory keys fail fast with actionable error logs.

## ADR-004: Accessible Interactive Design System Components
- **Date:** 2026-11-03
- **Context:** All UI components must meet WCAG 2.2 AA standards without compromise.
- **Decision:**
  - Radix UI primitives utilized for Dialog/Modal, Accordion, and Tabs.
  - All form fields linked via `aria-describedby` to error and helper texts.
  - Buttons enforce 44x44px minimum touch targets and clear 2px offset `:focus-visible` rings.
  - Motion respects `@media (prefers-reduced-motion: reduce)`.

## ADR-005: Client-Side Persistent Cart & Wishlist State with Dynamic Free Shipping
- **Date:** 2026-11-03
- **Context:** Customers require persistent cart and wishlist state across browser sessions with real-time free shipping threshold messaging and coupon application without page reloads.
- **Decision:**
  - Implemented `StoreContext` with `localStorage` persistence and fallback safety.
  - Built an accessible slide-over `CartDrawer` with free-shipping threshold bar, coupon engine, line item controls, and sticky mobile trigger.
  - Wishlist persists locally and synchronizes count badges across header, mobile menu, and individual product cards.

## ADR-006: Faceted Catalog & Dynamic Product Detail Architecture
- **Date:** 2026-11-03
- **Context:** Customers require intuitive category browsing, skin concern filtering, price range sorting, and comprehensive ingredient transparency.
- **Decision:**
  - Built SSR `/collections/[slug]` with query param syncing, mobile drawer, active filter chips, and pagination.
  - Implemented `/products/[slug]` with image gallery thumbnail switcher, variant size swatches, subscribe-and-save 10% discount toggle, full INCI breakdown, routine cross-sells, customer reviews, and Schema.org JSON-LD structured data.
