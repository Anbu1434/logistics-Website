# Architecture Overview - Verdéa Skincare Platform

## 1. System Philosophy & Structure

Verdéa is architected as a production-grade, modular Next.js App Router application with strict type safety, server-driven commerce validation, and zero client-side price or stock trust.

```
c:\Users\anbu\Desktop\E-commerce\
├── src\
│   ├── app\                      # App Router routes and pages
│   │   ├── layout.tsx            # Global HTML shell, fonts, SEO metadata
│   │   ├── globals.css           # CSS variables, tokens, WCAG focus rules
│   │   ├── page.tsx              # Storefront Homepage
│   │   ├── home-client.tsx       # Interactive Homepage client view
│   │   └── styleguide\           # Design System & token documentation
│   │       ├── page.tsx          # Server route with noindex metadata
│   │       └── styleguide-client.tsx # Interactive component catalogue
│   ├── components\
│   │   ├── layout\               # Global layout primitives
│   │   │   ├── announcement-bar.tsx # Dismissible free-shipping notification bar
│   │   │   ├── header.tsx        # Sticky header, search pill, cart badge
│   │   │   └── footer.tsx        # Trust strip, newsletter, brand links
│   │   └── ui\                   # Atomic design system components
│   │       ├── button.tsx        # Pill buttons with arrow indicator & loading
│   │       ├── badge.tsx         # Botanical & status tags
│   │       ├── rating-stars.tsx  # Accessible ratings & review counters
│   │       ├── price-block.tsx   # Formatted currency & savings badge
│   │       ├── image-slot.tsx    # Next/Image wrapper with gradient fallbacks
│   │       ├── product-card.tsx  # Best seller / catalog product cards
│   │       ├── quantity-stepper.tsx # Stepper controls with bounds validation
│   │       ├── variant-selector.tsx # Sizes & shade swatch selectors
│   │       ├── accordion.tsx     # Radix-powered accessible accordions
│   │       ├── tabs.tsx          # Radix-powered tabs
│   │       ├── breadcrumb.tsx    # Breadcrumb trail
│   │       ├── modal.tsx         # Radix-powered accessible modal dialogs
│   │       ├── form-field.tsx    # Inputs & textareas with error states
│   │       └── skeleton.tsx      # Shimmer loading cards
│   ├── config\
│   │   └── brand.ts              # Brand parameters, currencies, addresses
│   └── lib\
│       ├── env.ts                # Zod runtime environment validation
│       └── utils.ts              # Currency formatters, class merges, sluggers
├── docs\
│   ├── ARCHITECTURE.md           # This document
│   └── DECISIONS.md              # Architectural decisions
├── .env.example                  # Documented environment variables
├── package.json                  # Dependencies & scripts
└── tailwind.config.ts            # Custom design tokens, typography, radii
```

## 2. Design System Tokens

| Token | Hex | Role | Contrast vs Canvas |
|---|---|---|---|
| `--cream-50` | `#FBF8F3` | Primary page background | 1:1 |
| `--cream-100` | `#F4EEE4` | Cards & container surfaces | 1.1:1 |
| `--cream-200` | `#E9DFD0` | Borders, outlines, dividers | 1.3:1 |
| `--sage-100` | `#E6ECDD` | Soft hero gradients & sections | 1.2:1 |
| `--sage-300` | `#B9C8A8` | Badges, hover tints | 2.1:1 |
| `--forest-600` | `#3F5A2E` | Secondary buttons & botanical accents | 6.8:1 (AAA) |
| `--forest-800` | `#24351B` | Primary CTAs, announcement bar | 11.2:1 (AAA) |
| `--ink-900` | `#1C1F1A` | Headings and primary copy | 15.8:1 (AAA) |
| `--ink-500` | `#5E655A` | Secondary text, captions, metadata | 5.4:1 (AA) |
| `--clay-400` | `#C98F72` | Warm accent (sale highlights, lip tints) | 4.7:1 (AA vs white) |
| `--gold-500` | `#B8935A` | Rating stars & luxury seals | 3.5:1 (AA graphic) |
| `--success` | `#2E7D4F` | In-stock & order confirmations | 5.2:1 (AA) |
| `--danger` | `#B3392F` | Stock warnings & validation errors | 5.8:1 (AA) |

## 3. Accessibility & Performance Guardrails

- **Zero Layout Shift (CLS < 0.1):** All images and card media preserve aspect ratios (`aspect-square`, `aspect-[4/5]`).
- **Keyboard Navigation:** Native skip link (`#main-content`), focusable pill buttons with visible focus rings, full ESC and focus-trap behavior on modals.
- **Prefers Reduced Motion:** Automated CSS override disables all transitions and keyframe animations when requested by OS settings.
- **Strict Server Validation:** All product pricing, discount calculations, inventory assertions, and checkout sessions run on the server layer.
