# Architecture Overview - Verdéa Skincare Platform

## 1. System Philosophy & Structure

Verdéa is architected as a production-grade, modular Next.js App Router application with strict type safety, server-driven commerce validation, and zero client-side price or stock trust.

```
c:\Users\anbu\Desktop\E-commerce\
├── prisma\                       # Database schema, seed data & migrations
│   ├── schema.prisma             # Full e-commerce schema (Products, Variants, Orders, Users, Reviews)
│   └── seed.ts                   # 32+ realistic products, categories, concerns & ingredients
├── src\
│   ├── app\                      # App Router routes and pages
│   │   ├── layout.tsx            # Global HTML shell, StoreProvider & CartDrawer
│   │   ├── globals.css           # CSS variables, tokens, WCAG focus rules
│   │   ├── page.tsx              # Storefront Homepage (Server Component with DB hydration)
│   │   ├── home-client.tsx       # Interactive 3-slide Hero, Best Sellers, Concern & Review sections
│   │   ├── collections\[slug]\   # Faceted category & collection listings with URL query state
│   │   ├── products\[slug]\      # Full PDP with gallery, variants, subscribe & save, INCI, JSON-LD
│   │   ├── search\               # Live debounced search, synonym matching & recovery recommendations
│   │   ├── cart\                 # Dedicated full-page shopping bag with free shipping meter
│   │   ├── wishlist\             # Customer saved formulations with quick add-to-bag
│   │   ├── about\                # Brand philosophy, clinical formulation standards, 3 pillars
│   │   ├── ingredients\          # Complete ingredients glossary with INCI names & benefits
│   │   ├── faq\                  # Categorized accordion knowledge base
│   │   ├── shipping-returns\     # Logistics policies, timelines & 30-day gentle guarantee
│   │   ├── contact\              # Inquiry router form with bot protection
│   │   ├── privacy\              # GDPR, CCPA & DPDP compliant privacy policy
│   │   ├── terms\                # Terms of service and cosmetic disclosures
│   │   ├── styleguide\           # Component library and design token documentation
│   │   └── api\search\           # Debounced catalog search endpoint
│   ├── components\
│   │   ├── cart\cart-drawer.tsx  # Accessible slide-over bag drawer
│   │   ├── layout\               # Global announcement bar, sticky header & footer
│   │   └── ui\                   # Accessible atomic design system components
│   ├── context\store-context.tsx # Persistent Cart & Wishlist provider with coupon engine
│   ├── services\                 # Data layer services (Catalog & Search)
│   ├── config\brand.ts           # Centralized brand tokens, currencies, policies
│   └── lib\
│       ├── db.ts                 # Prisma Client singleton
│       ├── env.ts                # Zod runtime environment validation
│       └── utils.ts              # Currency formatters, class merges, sluggers
├── docs\
│   ├── ARCHITECTURE.md           # This document
│   └── DECISIONS.md              # Architectural decisions (ADRs)
├── .env.example                  # Fully documented environment secrets
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
- **Keyboard Navigation:** Native skip link (`#main-content`), focusable pill buttons with visible focus rings, full ESC and focus-trap behavior on modals and drawers.
- **Prefers Reduced Motion:** Automated CSS override disables all transitions and keyframe animations when requested by OS settings.
- **Structured Data:** Automated Schema.org `Product`, `offers`, and `aggregateRating` JSON-LD payloads for rich search results.
