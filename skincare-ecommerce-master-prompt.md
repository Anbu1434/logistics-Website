# MASTER PROMPT: Build a Premium, Production-Ready Skincare E-Commerce Platform

You are a senior full-stack engineer, product designer, and DevOps lead. Build a complete, fully functional, production-ready e-commerce platform for a premium natural skincare brand. This is NOT a prototype or static mockup. Every feature below must work end to end with real data, real persistence, real payments (test mode until keys are supplied), real emails, and real security.

Work autonomously, in phases. After each phase, run lint, type-check, tests, and a build, fix failures, then continue. Do not leave TODOs, placeholder handlers, fake buttons, or lorem ipsum in shipped UI (use realistic seed content). Ask me only if you are truly blocked; otherwise make sensible decisions and document them in `docs/DECISIONS.md`.

Brand placeholders: `[BRAND_NAME]`, `[TAGLINE]`, `[SUPPORT_EMAIL]`, `[DOMAIN]`. Centralize them in `src/config/brand.ts` and env vars so they can be swapped in one place. Default brand name for seed/demo: "Verdéa" (original, not a copy of any reference).

---

## 1. Design References and What to Learn From Them

I have two reference images. Use them as **inspiration only**. The result must be an original design, not a clone. Do not reuse their brand names, copy, or imagery.

**Reference A (green/sage storefront, "PureLuxe"-style):**
- Slim dark-green announcement bar (free shipping message).
- Clean white header: centered or left logo, uppercase small nav with active underline, search/account/bag icons with a cart count badge.
- Full-width hero on a soft sage gradient: eyebrow text ("CLEAN. NATURAL. EFFECTIVE."), large serif headline with an *italic green second line*, short supporting copy, solid dark-green CTA, a row of 4 trust icons (natural ingredients, dermatologically tested, cruelty free, vegan), hero carousel dots and arrow.
- "Shop by category" row of 4 square image tiles with a label and "Shop Now →".
- "Best Sellers" grid: soft neutral product image tiles, name, star rating with review count, price, full-width "Add to Bag" button, "View All" outlined button.
- Promo banner ("Limited Time Offer") with botanical product flat-lay.
- Footer trust strip: free delivery, easy returns, secure payments, customer support.

**Reference B (cream/beige hero, "Nuvéa"-style):**
- Warm cream canvas, very large rounded container (about 28 to 32px radius), soft layered shadows.
- Oversized elegant serif headline, quiet sans-serif body, dark pill CTA with an arrow in a circle.
- Hero portrait photography with a floating, overlapping "Best Seller" product card and a small circular badge ("Skincare for a Kinder Tomorrow").
- Search as a rounded pill in the header; wishlist heart, bag with count, avatar.
- Category tiles with photo background and a frosted/glass label bar containing a round arrow button.

**Synthesis (the original direction):** "Quiet luxury meets botanical science." Warm cream surfaces from B, deep botanical green accents and trust-signal structure from A. Generous whitespace, large serif display type, rounded cards, soft depth, subtle motion. Premium, calm, clinical-but-warm. Conversion elements (reviews, trust badges, free-shipping threshold, bundles) must be present but never loud.

---

## 2. Recommended Tech Stack (use unless you have a strong, documented reason to deviate)

- **Framework:** Next.js (latest stable, App Router) + React + TypeScript (strict).
- **Styling:** Tailwind CSS + CSS variables for design tokens; shadcn/ui or Radix primitives for accessible components; `lucide-react` icons; Framer Motion (respect `prefers-reduced-motion`).
- **Database:** PostgreSQL + Prisma ORM, with migrations and seed scripts.
- **Auth:** Auth.js (NextAuth) or Better Auth: email/password (argon2id), magic link, Google OAuth; email verification, password reset, session management, optional TOTP 2FA for admins.
- **Payments:** Stripe (cards, wallets, Payment Element) as the global default, plus Razorpay (UPI, cards, netbanking, wallets) for India. Provider selected by currency/region via config. Cash on Delivery as an optional toggle in admin settings. Webhooks are the source of truth for payment status.
- **Cache / rate limiting / queues:** Redis (Upstash or self-hosted) for rate limits, cart/session caching, and a job queue (BullMQ or Inngest/Trigger.dev) for emails, inventory sync, and webhooks retries.
- **Search:** Meilisearch (or Algolia) with typo tolerance, facets, and synonyms (e.g. "moisturiser"/"moisturizer"); Postgres full-text fallback.
- **Media:** S3-compatible storage or Cloudinary; automatic AVIF/WebP, responsive `srcset`, blur placeholders via `next/image`.
- **Email:** Resend or Postmark with React Email templates.
- **Shipping/tax:** Pluggable adapters (Shiprocket/Delhivery for India, Shippo/EasyPost for global). Tax engine supports GST (India) and VAT/sales tax via configurable rules.
- **Observability:** Sentry (errors), OpenTelemetry/Vercel Analytics or PostHog (product analytics), structured logging (pino), uptime health endpoint.
- **Testing:** Vitest (unit), Playwright (E2E), Testing Library (components), axe (a11y), k6 or Artillery (basic load test).
- **Tooling:** pnpm, ESLint, Prettier, Husky + lint-staged, Commitlint, GitHub Actions CI.
- **Deploy:** Vercel (app) + managed Postgres (Neon/Supabase/RDS) + Upstash Redis, OR Docker Compose / Kubernetes-ready containers. Provide both a Dockerfile and a Vercel path.

Use a clean, modular architecture (feature folders, service layer, repository layer, Zod validation at all boundaries, shared types). Keep server logic out of components.

---

## 3. Design System

### 3.1 Color tokens (define as CSS variables; light theme required, dark theme optional but nice)
| Token | Hex | Use |
|---|---|---|
| `--cream-50` | `#FBF8F3` | page background |
| `--cream-100` | `#F4EEE4` | cards, hero container |
| `--cream-200` | `#E9DFD0` | borders, dividers |
| `--sage-100` | `#E6ECDD` | soft sections, hero gradient |
| `--sage-300` | `#B9C8A8` | badges, hover tints |
| `--forest-600` | `#3F5A2E` | secondary buttons, links |
| `--forest-800` | `#24351B` | primary buttons, announcement bar |
| `--ink-900` | `#1C1F1A` | headings and body text |
| `--ink-500` | `#5E655A` | secondary text |
| `--clay-400` | `#C98F72` | warm accent (sale, highlights, lipstick/blush tones) |
| `--gold-500` | `#B8935A` | rating stars, premium accents |
| `--success` / `--warning` / `--danger` | `#2E7D4F` / `#B7791F` / `#B3392F` | states |

Verify WCAG AA contrast (4.5:1 body, 3:1 large text/UI) for every pairing and document it.

### 3.2 Typography
- **Display (headlines):** a high-contrast serif such as *Cormorant Garamond*, *Fraunces*, or *Playfair Display* (self-host via `next/font`). Use italics with the green accent color for emphasis words.
- **Body/UI:** *Inter* or *Manrope*.
- Fluid scale with `clamp()`: H1 56 to 96px desktop / 40 to 52px mobile, H2 36 to 56px, H3 24 to 32px, body 16 to 18px, small 13 to 14px. Eyebrows: 12px uppercase, letter-spacing 0.14em.
- Line-height: 1.05 to 1.15 for display, 1.6 for body. Max line length about 65ch.

### 3.3 Shape, depth, motion
- Radii: 12px (inputs), 20px (cards), 28 to 32px (hero and large containers), full pill (buttons, search, badges).
- Shadows: soft, low-opacity, layered (e.g. `0 1px 2px rgba(28,31,26,.04), 0 12px 32px rgba(28,31,26,.08)`).
- Buttons: primary = forest-800 pill with arrow-in-circle icon; secondary = outlined pill; tertiary = text link with animated underline. Min touch target 44x44px. Clear focus rings (2px offset, high contrast).
- Motion: 200 to 400ms ease-out, subtle fade-up on scroll, image hover zoom (1.04), cart drawer slide, skeleton loaders. Disable non-essential motion when `prefers-reduced-motion`.
- Imagery: soft natural light, botanicals, textures (cream swatches, droplets, stone podiums). Provide an `ImageSlot` system so I can drop in real photography; generate tasteful placeholder images/gradients for seed data.

### 3.4 Component library (build and document in a `/styleguide` route, noindex)
Announcement bar, header (desktop mega-menu + mobile drawer), search pill with live suggestions, cart drawer, product card, rating stars, price block (with compare-at and savings), badge, quantity stepper, variant selector (swatches/sizes), accordion, tabs, breadcrumb, filter sidebar/sheet, sort dropdown, pagination/infinite scroll, review card, review form, newsletter form, toast, modal, form fields with validation, skeletons, empty states, error states, 404/500 pages.

---

## 4. Information Architecture and Pages

**Storefront**
1. **Home**: announcement bar, hero (carousel with 3 slides, autoplay pausable, keyboard accessible), trust-icon row, shop by category (4 to 6 tiles), best sellers, "Shop by concern" (acne, dryness, dullness, sensitivity, aging, pigmentation), editorial/ingredient story block, bundle/promo banner, UGC/reviews strip, journal preview, newsletter signup, trust strip (delivery, returns, secure payments, support), footer.
2. **Category/Collection pages** (Skincare, Makeup, Haircare, Fragrance, Cleansers, Moisturizers, Serums, Sunscreens, Combos, New, Best Sellers, Sale): faceted filtering (skin type, concern, ingredient, price, rating, availability, vegan/cruelty-free), sorting, active filter chips, URL-synced state, SSR for SEO, pagination with canonical tags.
3. **Product detail page (PDP)**: gallery with zoom + thumbnails + video support, sticky buy box on desktop, variant/size selection, stock status + low-stock indicator, price and savings, rating summary, key benefits icons, "How to use", full ingredients (INCI) list with plain-language explanations, skin-type suitability, accordion for details/shipping/returns, subscribe-and-save option, "Complete the routine" cross-sell, reviews with photos/filters/helpful votes, Q&A, recently viewed, structured data. Sticky mobile add-to-bag bar.
4. **Search results page** with suggestions, facets, "no results" recovery.
5. **Cart** (drawer + full page): line items, quantity edit, remove, move to wishlist, free-shipping progress bar, coupon field, gift-wrap/sample opt-in, estimated shipping/tax, upsell row.
6. **Checkout** (see section 6).
7. **Account**: dashboard, orders (status timeline, invoice PDF, reorder, track), addresses, saved payment methods (via provider tokens only), wishlist, reviews written, subscriptions, loyalty points/referral, profile and security (password, 2FA, sessions), communication preferences, delete account / export data (GDPR/DPDP).
8. **Content**: About, Ingredients Glossary, Journal/Blog (MDX or DB-backed), FAQ, Shipping and Returns, Privacy, Terms, Cookie policy, Contact (form with spam protection), Store/Help center, Skin quiz ("Find your routine": 5 to 7 questions, recommends products, saves to profile).
9. **Utility**: 404, 500, maintenance, order-confirmation, email-verification, password-reset, unsubscribe.

---

## 5. Responsive and Accessibility Requirements

- Mobile-first. Breakpoints: 360, 640, 768, 1024, 1280, 1536. Test at 360px, 390px, 768px, 1024px, 1440px, 1920px.
- No horizontal scroll at any width. Touch-friendly spacing. Sticky header that shrinks on scroll. Bottom-sheet filters and cart on mobile.
- **WCAG 2.2 AA**: semantic landmarks, skip link, logical heading order, visible focus, full keyboard operation (menus, carousel, gallery, modals with focus trap and ESC), ARIA only where needed, alt text for all images (editable in admin), form labels and error association (`aria-describedby`), live regions for cart updates and errors, reduced-motion support, 200% zoom support, color never the only signal.
- Run axe in CI against key pages; zero critical/serious violations.
- i18n-ready (next-intl): English default, structure for adding Hindi/Tamil and other locales; multi-currency display (INR default if region = IN, USD fallback) with formatting via `Intl`.

---

## 6. Commerce Logic

### 6.1 Catalog data model (Prisma)
Product, ProductVariant (SKU, size, price, compareAtPrice, cost, weight, barcode), Category (tree), Collection, Brand, Ingredient (with INCI name, benefits, concerns, allergens), SkinConcern, ProductImage/Video, InventoryItem (per location), Bundle, Review (with media, verified-purchase flag, moderation status), Question/Answer, Wishlist, Cart/CartItem, Order/OrderItem, Payment, Refund, Shipment, Address, Coupon/Promotion, Customer, Subscription, LoyaltyLedger, Referral, EmailSubscriber, Page/Post (CMS), AuditLog, Setting, AdminUser/Role/Permission.

Use integer minor units for money, never floats. Use soft deletes where appropriate, indexes on all query paths, and unique constraints (SKU, slug, order number).

### 6.2 Cart
- Persistent for guests (secure cookie + Redis) and users; merge on login.
- Server-validated prices, stock, and promotions on every mutation (never trust client totals).
- Optimistic UI with rollback on failure; inventory reservation with timeout at checkout start.
- Promotions engine: percentage/fixed, free shipping, BOGO, tiered (spend X save Y), bundle discounts, first-order codes, usage limits, date windows, stackability rules, product/category scoping.

### 6.3 Checkout (conversion-focused)
- Guest checkout by default with optional account creation after purchase; express checkout (Apple Pay, Google Pay, Link, UPI intent) at top.
- Single-page, 3 clear steps with progress: Contact and Shipping, Delivery method, Payment. Order summary always visible (collapsible on mobile).
- Address autocomplete (Google Places or similar), PIN/ZIP validation, serviceability and delivery-date estimates, saved addresses for users.
- Live totals: subtotal, discount, shipping, tax (GST-inclusive display for India), total. Clear free-shipping threshold messaging.
- Payment: Stripe Payment Element and Razorpay Checkout, 3-D Secure/SCA, idempotency keys, retry on failure with clear messages, COD option with fee and eligibility rules.
- Order creation is **atomic** with inventory decrement (DB transaction). Payment status updated **only via verified webhooks** (Stripe signature, Razorpay signature); handle `payment_succeeded`, `failed`, `refunded`, `dispute` events idempotently.
- Abandoned cart recovery: email sequence (1h, 24h, 72h) via queue, with unsubscribe and consent.
- Post-purchase: confirmation page + email, invoice PDF, tracking updates, review request after delivery, cross-sell/replenishment reminders.
- Handle edge cases: out-of-stock mid-checkout, price changes, expired coupons, duplicate submissions, payment pending, partial refunds, address changes before dispatch, order cancellation windows, returns/RMA flow.

---

## 7. Authentication, Authorization, Security

- Password hashing: argon2id. Enforce strong password rules + breach check (HIBP k-anonymity).
- Secure cookies (`HttpOnly`, `Secure`, `SameSite=Lax`), CSRF protection, short-lived access + rotating sessions, device/session list with revoke.
- RBAC for admin: Owner, Admin, Catalog Manager, Order Manager, Support, Marketing, Read-only. Enforce on server for every route/action; log to `AuditLog`.
- Rate limiting (login, signup, reset, checkout, review, contact, search), bot protection (Turnstile/hCaptcha) on public forms.
- Input validation with Zod everywhere; output encoding; sanitize rich text (DOMPurify/sanitize-html); parameterized queries only (Prisma).
- Security headers: strict CSP (nonce-based), HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors. Verify with securityheaders.com-style checks.
- Secrets only via env vars, validated at boot with a typed `env.ts` (fail fast). Never log PII, card data, or tokens. **No card data ever touches our servers** (PCI SAQ-A scope via hosted fields).
- File uploads: type/size validation, virus scan hook, signed URLs, private buckets for invoices.
- Privacy/compliance: cookie consent banner (granular), GDPR/CCPA/India DPDP-aligned data export and deletion, double opt-in for marketing, consent logs.
- Dependency hygiene: Dependabot/Renovate, `pnpm audit` in CI, lockfile committed, CodeQL scan.
- Produce `docs/SECURITY.md` with threat model summary (OWASP Top 10 mapping).

---

## 8. Admin Dashboard (`/admin`, separate layout, protected)

Clean, dense-but-calm UI using the same design tokens.
- **Overview:** revenue, orders, AOV, conversion rate, top products, low stock, recent orders, date-range filters, charts.
- **Products:** CRUD, variants, bulk edit/import/export (CSV), image/video upload with drag-reorder and alt text, SEO fields, ingredient linking, bundles, scheduling publish, duplicate product.
- **Inventory:** stock by variant/location, adjustments with reasons, low-stock alerts, import.
- **Orders:** list/filters/search, detail view with timeline, fulfill/ship (label generation via adapter), partial fulfillment, cancel, refund (full/partial via provider API), notes, resend emails, print invoice/packing slip, export.
- **Customers:** profiles, order history, segments, notes, GDPR export/delete actions.
- **Marketing:** coupons/promotions, banners/hero slides editor, email subscribers, campaigns hooks, abandoned-cart settings, loyalty/referral rules.
- **Reviews:** moderation queue, reply as brand, flag, bulk approve.
- **Content:** pages, journal posts (rich editor/MDX), FAQ, homepage section ordering.
- **Settings:** store details, taxes, shipping zones/rates, payment providers, email templates, roles/users, SEO defaults, integrations, maintenance mode.
- **Reports:** sales, products, customers, coupons, tax; CSV export.
- All lists: server-side pagination, sort, filter, search. All mutations: optimistic where safe, confirmations for destructive actions, audit log entries.

---

## 9. SEO, Content and Analytics

- SSR/ISR for catalog and content pages; `generateMetadata` for unique titles/descriptions; canonical URLs; handle faceted-filter URLs with `noindex,follow` or canonicalization to avoid duplicate content.
- JSON-LD: `Organization`, `WebSite` (SearchAction), `BreadcrumbList`, `Product` (offers, aggregateRating, review, availability), `FAQPage`, `Article`.
- Dynamic `sitemap.xml` (split for scale), `robots.txt`, clean slugs, 301 redirect manager in admin, OpenGraph/Twitter cards with dynamically generated OG images.
- Internal linking: related products, concern/ingredient hubs, breadcrumbs.
- Analytics: GA4 or PostHog with consent mode; ecommerce events (`view_item_list`, `view_item`, `add_to_cart`, `begin_checkout`, `add_payment_info`, `purchase`, `search`); server-side purchase event for accuracy.
- Core copy: benefit-led, ingredient-transparent, no unsubstantiated medical claims; include a content guideline file for compliant skincare claims.

---

## 10. Performance Budgets

- Lighthouse (mobile, production build): **Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95** on Home, Category, PDP, Cart, Checkout.
- Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Techniques: RSC and streaming, route-level code splitting, preload hero image + fonts (`font-display: swap`, subsetting), `next/image` with correct `sizes`, lazy-load below the fold, avoid layout shift with fixed aspect ratios, minimize client JS (islands only where interactive), cache headers + CDN, ISR/tag-based revalidation on product/inventory change, DB query optimization (indexes, N+1 prevention, select only needed fields), Redis caching for hot reads, bundle analysis in CI with size budget failing the build.
- Third-party scripts loaded deferred/after consent.

---

## 11. Testing and Quality Gates

- Unit tests for pricing, promotions, tax, inventory, and order state machine (aim for high coverage on business logic).
- Integration tests for API routes/server actions and webhooks (with mocked provider signatures).
- **Playwright E2E:** browse, filter, search, add to cart, apply coupon, guest checkout (test card), logged-in checkout, payment failure, order confirmation, account order view, admin login, create product, fulfill and refund an order.
- Visual checks at mobile/tablet/desktop; axe a11y checks; broken-link and image check.
- CI pipeline (GitHub Actions): install, lint, type-check, unit, build, E2E (against ephemeral DB), a11y, Lighthouse CI, security audit; block merge on failure.

---

## 12. DevOps and Deployment

- Environments: local, preview (per PR), staging, production. `.env.example` fully documented; typed env validation.
- Docker: multi-stage Dockerfile, `docker-compose.yml` for local dev (Postgres, Redis, Meilisearch, MailHog, MinIO). One command start: `pnpm setup && pnpm dev`.
- Database: migrations via Prisma, seed script with 30+ realistic products (cleansers, serums, moisturizers, sunscreens, makeup, haircare, fragrance, combos), reviews, coupons, an admin user, sample orders. Automated backups + documented restore. Zero-downtime migration practice.
- Production: HTTPS, custom domain `[DOMAIN]`, CDN, health check `/api/health`, graceful error pages, rate-limit at edge, log aggregation, alerting (Sentry + uptime monitor), cron jobs (abandoned carts, review requests, inventory sync, sitemap refresh).
- Provide `docs/DEPLOYMENT.md` with step-by-step instructions (Vercel + Neon + Upstash path, and Docker path), webhook setup for Stripe/Razorpay, DNS/email SPF/DKIM/DMARC setup, go-live checklist, and rollback procedure.

---

## 13. Delivery Phases (execute in order; commit per milestone with conventional commits)

1. **Foundation:** repo, tooling, design tokens, component library, layout shell, styleguide route, env validation, CI.
2. **Data and catalog:** schema, migrations, seed, catalog services, search indexing.
3. **Storefront:** Home, category, search, PDP, content pages, wishlist, reviews (read), full responsive polish.
4. **Cart, promotions, checkout, payments, webhooks, emails, order lifecycle.**
5. **Accounts and auth,** including 2FA for admins, GDPR tools, loyalty/referrals, skin quiz.
6. **Admin dashboard** with all modules and RBAC.
7. **SEO, analytics, performance and accessibility hardening.**
8. **Testing, security review, documentation, deployment, go-live checklist.**

---

## 14. Definition of Done

- A new visitor can browse, search, filter, read reviews, add to cart, pay (test mode), receive an email, and view the order in their account.
- An admin can add a product with images/variants, adjust stock, process and refund an order, moderate a review, and edit the homepage hero, all without touching code.
- All pages are responsive from 360px to 1920px, pass WCAG 2.2 AA checks, and meet the performance budgets.
- Payment status is driven by verified webhooks; no money-handling logic trusts the client.
- CI is green; E2E suite passes; no critical/high vulnerabilities; no console errors.
- README, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`, `docs/SECURITY.md`, `docs/DECISIONS.md`, and `.env.example` are complete and accurate.

At the end, give me: (1) a summary of what was built, (2) a list of the environment variables/API keys I must supply, (3) exact commands to run locally and deploy, and (4) any known limitations or recommended next steps.

Begin with Phase 1 now. Show your plan briefly, then execute.
