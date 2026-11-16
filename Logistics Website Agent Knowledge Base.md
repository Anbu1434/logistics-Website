# Logistics Website: Agent Knowledge Base

This file is the single source of truth for building the logistics website. Read it fully before writing code. When a rule here conflicts with a default habit, follow this file.

Placeholder brand: **Your Brand**. Replace it in one place (`/lib/site.ts`) so renaming is a one-line change.

## 1. Goal and audience

- **Goal:** turn visitors into quote requests and shipment-tracking lookups.
- **Audience:** business shippers, SMEs, importers and exporters, e-commerce sellers.
- **Primary conversion:** Get a Quote. **Secondary:** Track Shipment, Contact.
- **Tone:** confident, precise, calm. No hype, no exclamation marks, no buzzword soup.
- Most leads arrive on mobile, so design mobile first and verify at 375px.

## 2. Tech stack

The whole stack is Next.js and MongoDB. There is no separate backend service.

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS |
| Animation | Framer Motion (sparingly), CSS for simple transitions |
| Icons | lucide-react, stroke width 1.5 |
| Forms | react-hook-form + zod validation |
| Backend | Next.js Route Handlers + MongoDB with Mongoose (quote requests, contact messages, tracking lookup) |
| Email | SMTP or Resend for quote notifications |
| Hosting | Vercel (app and API routes) + MongoDB Atlas (database) |
| Fonts | `next/font` with Sora, Inter, JetBrains Mono |

## 3. Anti-slop rules (read twice)

The site must look designed by a person with taste, not generated. Never do the following:

1. No purple-to-blue or rainbow gradients. Gradients are allowed only as navy photo overlays.
2. No glassmorphism, neon glows, or floating blurred blobs.
3. No emoji anywhere in the UI or copy.
4. No generic centered hero with three identical feature cards under it as the whole page.
5. No lorem ipsum. Use the copy in this file, or realistic logistics copy.
6. No stock icons in colored circles repeated 6 times with identical weight. Vary layout: bento grids, split sections, numbered steps.
7. No default Tailwind blue (`blue-500`) or default shadows. Use the tokens below only.
8. No more than one accent color. Orange is the only accent.
9. No text over busy imagery without an overlay that passes contrast.
10. No placeholder-gray image boxes in the final build. Use real photography (see section 4.6).
11. No "Welcome to", "Unlock the power of", "Elevate", "Seamless", "Revolutionize", "Cutting-edge", "Next-gen" in copy.
12. No bouncing, spinning, or auto-playing attention animations.

Do instead: strong typographic hierarchy, generous whitespace, consistent grid, real imagery with one color grade, restrained motion, and specific numbers and facts in copy.

## 4. Design tokens

### 4.1 Color

Navy is the brand. Orange is for action only.

| Token | Hex | Use |
|---|---|---|
| `navy-900` | `#0B1F3A` | Hero overlay, footer, dark bands |
| `navy-700` | `#12335C` | Headings on light, hover on dark |
| `ocean-600` | `#1F5F9E` | Links, icons, focus ring |
| `orange-500` | `#E8590C` | Primary CTA, highlight word, key icons |
| `orange-600` | `#C94A08` | CTA hover and pressed |
| `sky-50` | `#F2F6FB` | Alternate section background |
| `ink` | `#0F172A` | Headings (light surfaces) |
| `slate-600` | `#475569` | Body text |
| `line` | `#E2E8F0` | Borders, dividers |
| `success` | `#16A34A` | Delivered status only |
| `white` | `#FFFFFF` | Base surface |

Distribution: about 60% white and sky tint, 30% navy, 10% orange. Orange appears on buttons, one highlighted phrase per heading, and small icons. Nothing else.

Contrast: body text on white must be at least 4.5:1 (slate-600 passes). White text on orange-500 is for large or bold text only (buttons at 600 weight are fine). White on navy always passes.

### 4.2 Tailwind config

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: "#0B1F3A", 700: "#12335C" },
        ocean: { 600: "#1F5F9E" },
        orange: { 500: "#E8590C", 600: "#C94A08" },
        sky: { 50: "#F2F6FB" },
        ink: "#0F172A",
        slate: { 600: "#475569" },
        line: "#E2E8F0",
        success: "#16A34A",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: { card: "12px", input: "8px", btn: "10px" },
      boxShadow: {
        soft: "0 8px 30px rgba(11,31,58,0.08)",
        lift: "0 14px 40px rgba(11,31,58,0.14)",
      },
      maxWidth: { container: "1200px" },
    },
  },
} satisfies Config;
```

### 4.3 Typography

- **Headings:** Sora, weights 600 and 700.
- **Body and UI:** Inter, weights 400, 500, 600.
- **Tracking IDs, data, stats labels:** JetBrains Mono, 400 and 500.
- Load all three with `next/font/google`, `display: "swap"`, only the weights listed.

| Element | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| H1 | `clamp(40px, 6vw, 72px)` | 700 | 1.05 | -0.02em |
| H2 | `clamp(30px, 4vw, 48px)` | 700 | 1.15 | -0.015em |
| H3 | 22 to 24px | 600 | 1.3 | -0.01em |
| Body large | 18px | 400 | 1.65 | 0 |
| Body | 16px | 400 | 1.65 | 0 |
| Small | 14px | 400 | 1.5 | 0 |
| Eyebrow | 12 to 13px, uppercase | 600 | 1.2 | 0.12em |
| Button | 15 to 16px | 600 | 1 | 0 |

Rules: max line length 65 characters for body copy. Headings use `text-wrap: balance`. One highlighted phrase per heading is wrapped in a span colored `orange-500`. Eyebrows sit above every H2 in `orange-500`.

### 4.4 Spacing, layout, shape

- 8px spacing grid. Section padding: 96 to 120px desktop, 64px mobile.
- Container: max 1200px, 24px side padding on mobile, 12-column grid on desktop.
- Radius: 12px cards, 8px inputs, 10px buttons, full pill for badges and chips.
- Shadows: only `soft` at rest and `lift` on hover. No other shadows.
- Borders: 1px `line`. Cards on white use border plus `soft`; cards on `sky-50` use white background plus `soft`.
- Breakpoints: 640, 768, 1024, 1280.

### 4.5 Motion

- Fade-up on scroll: 400ms, ease-out, 16px travel, once per element, stagger 60ms inside a group.
- Card image zoom to 1.05 on hover, 500ms.
- Stat counters animate once when 40% visible, 1.2s.
- Marquee scrolls at about 40px per second and pauses on hover.
- Honor `prefers-reduced-motion`: disable all of the above except opacity fades.

### 4.6 Imagery

- Real photographs only: container ships, ports, trucks, warehouses, forklifts, workers in hi-vis. No illustrations, no 3D renders.
- One color grade across all photos: cool blue shadows, warm highlights, slightly lifted blacks.
- Dark hero photos get a navy gradient overlay: `linear-gradient(90deg, rgba(11,31,58,0.85), rgba(11,31,58,0.45))`.
- Export WebP or AVIF. Hero 1920px wide, cards 800px, thumbnails 400px. Use `next/image` with explicit sizes.
- Use licensed sources (Unsplash, Pexels, or the client's own). Download and optimize into `/public/images` (no hotlinking). Keep a `CREDITS.md` for attributions.

### 4.7 Icons

lucide-react only, 1.5 stroke, 24px default, `ocean-600` on light and white on dark. Suggested set: `Ship`, `Plane`, `Truck`, `Warehouse`, `MapPin`, `Clock`, `ShieldCheck`, `FileCheck`, `Headphones`, `BadgeDollarSign`, `PackageSearch`, `Phone`, `ArrowUpRight`.

## 5. Components

Build these once in `/components/ui` and reuse everywhere.

**Button**
- Variants: `primary` (orange-500 background, white text, hover orange-600), `secondary` (navy-900 background, white text), `ghost` (transparent, 1px white border on dark or 1px navy border on light), `link` (text with arrow).
- Height 48px (40px small). Padding 0 24px. Radius 10px. Trailing `ArrowUpRight` icon at 16px on primary and link.
- Focus: 2px outline `ocean-600`, 2px offset. Disabled: 50% opacity, no hover.

**Eyebrow:** orange uppercase label with a 24px line before it.

**SectionHeading:** eyebrow, H2 with optional highlighted phrase, optional one-sentence sub in slate-600, max width 640px.

**Card (service):** image with gradient overlay, icon chip top-left (white 40px rounded square), title and one-line description at the bottom in white, "Explore" link with arrow. Hover: image zoom, card lifts 4px with `lift` shadow.

**Input:** 48px high, 8px radius, 1px `line` border, label above in 14px 500 weight, focus border `ocean-600` plus 3px ring at 20% opacity. Error: red-600 border and message below in 13px. Never rely on placeholder alone.

**StatBlock:** large number in Sora 700, 40 to 56px, label in slate-600 below. Dividers between blocks on desktop.

**StepItem:** numbered circle (navy-900, white number), title, one line of copy, connected by a 1px dashed `line` rule.

**Badge:** pill, 12px 600 weight, navy-900 on sky-50. Status badge variants: in transit (ocean-600 tint), delivered (success tint), delayed (orange tint).

**Marquee:** full-width navy-900 or orange-500 band, uppercase 14px 600 weight with 0.08em tracking, items separated by a four-point star glyph (SVG, not emoji).

## 6. Global layout

**Header (sticky, 72px)**
- Transparent over the hero, switches to white with a bottom border after 40px of scroll.
- Left: logo. Center: Home, About, Services (dropdown: Ocean, Air, Road, Warehousing), Industries, Track, Contact. Right: phone link and primary **Get a Quote** button.
- Mobile: hamburger opens a full-screen navy panel, large links at 28px Sora, Get a Quote button pinned at the bottom.

**Footer (navy-900)**
- Five columns: logo and two-line blurb; Services; Company; Contact (address, phone, email, hours); Newsletter (email input and orange button).
- Bottom row: copyright, Privacy, Terms, social icons.
- Text in white at 70% for links, 100% on hover.

**Floating elements:** a WhatsApp click-to-chat button (bottom-right, 56px, green is allowed here only because it is the WhatsApp brand) and, on mobile only, a sticky bottom bar with **Get a Quote** and **Call** buttons.

## 7. Home page sections (build in this order)

### 7.1 Hero
- Full-bleed container-ship photo, min height 100svh (max 880px), navy overlay.
- Eyebrow: *Real-time tracking*
- H1: **Where Logistics Meets Precision.** ("Meets Precision" can carry the orange highlight, pick one phrase only.)
- Sub: *Fast, secure, end-to-end freight across cities, countries, and continents.*
- Buttons: **Get a Quote** (primary), **Track Shipment** (ghost white).
- Social proof line: small avatar stack and *15k businesses shipped with us*.
- Desktop right: white quote card, 440px wide, `soft` shadow, title **Get a Free Quote**, fields: Full name, Phone, Email, Shipment type (select: Ocean, Air, Road, Warehousing), Pickup location, Delivery location, Weight or volume, Additional notes. Submit: navy **Get Instant Quote** button.
- Mobile: card moves below the headline and buttons, full width.

### 7.2 Trust bar
- Eyebrow-style line: *Trusted by growing businesses worldwide*
- 5 to 6 client logos, greyscale at 60% opacity, full color not needed. Slow marquee on mobile.

### 7.3 Services marquee
- Navy band: AIR FREIGHT, OCEAN FREIGHT, LAND TRANSPORT, WAREHOUSING, GLOBAL LOGISTICS separated by star glyphs.

### 7.4 About
- Eyebrow *About us*. H2: **A logistics partner built on speed, technology, and trust.**
- Body: *We combine live tracking, a dedicated team, and deep route expertise so every shipment reaches its destination safely and on time.*
- Layout: asymmetric two-column. Left: tall port photo (4:5) with a navy stat card overlapping its bottom-left corner showing **98%** and *on-time delivery*. Right: heading, copy, a second smaller warehouse photo, and a **More About Us** link button.
- Stats row below: **29K+** workers, **150K** tons moved, **139K+** clients, **50+** cities. Animated counters.

### 7.5 Services
- Eyebrow *Our services*. H2: **Logistics solutions that move you forward.** Right-aligned **View all services** link.
- Desktop: three image cards in a row (4:5), plus an optional fourth. Mobile: horizontal snap carousel.
- Ocean Freight: *Cost-effective container and bulk cargo shipping across global ports.*
- Air Freight: *When speed matters, get priority handling and tight schedules.*
- Road Freight: *Flexible FTL and LTL transport with real-time GPS.*
- Warehousing (optional): *Secure storage, inventory control, and fast fulfillment.*

### 7.6 Why choose us
- `sky-50` background. H2: **We combine technology with industry expertise.**
- Use a bento grid, not six identical tiles: one large feature tile (Real-time tracking, with a small mock tracking timeline) and five smaller tiles of varied sizes.
- Tiles: Real-time tracking, Fast delivery, Secure handling, Customs support, 24/7 support, Transparent pricing. One line of copy each, stated concretely (for example *Live GPS updates every 5 minutes*).

### 7.7 How it works
- Eyebrow *Process*. H2: **From request to delivery in four steps.**
- Horizontal on desktop, vertical on mobile: **1 Request a quote**, **2 Plan and pickup**, **3 Transit and tracking**, **4 Delivery and confirmation**. One sentence each.
- Beside it, a wide photo (forklift or loading dock) with a small play badge if a video exists; otherwise omit the badge.

### 7.8 Track your shipment
- Full-width navy-900 band. H2: **Track your shipment.** Sub: *Enter your tracking ID for live status.*
- One large input (JetBrains Mono, placeholder `LG-2026-004981`) with an orange **Track** button attached on the right.
- Result view (on `/track`): status badge, origin to destination, progress line with checkpoints and timestamps in mono.

### 7.9 Industries
- H2: **Built for the way your industry ships.**
- Six cards with image backgrounds: Retail, Manufacturing, Pharma, Food and cold chain, Automotive, E-commerce. Each links to a short industry page or an anchor on Services.

### 7.10 Fleet and global reach
- Wide fleet photo (trucks lined up) with rounded 12px corners.
- Side panel: *Door-to-door across 50+ cities and 30+ countries.* with a simple route-line SVG or dotted world map in navy tints (no heavy map library).

### 7.11 Testimonials
- `sky-50` background. H2: **What our customers say.**
- Three cards: photo, name, role and company, 5-star row in orange, quote under 30 words. Use clearly marked placeholder quotes until real ones arrive, and flag them in a `TODO.md`.

### 7.12 Insights
- H2: **Shipping insights.** Three article cards: image, category badge, title, read time. Topics: customs documentation, freight cost guide, choosing between air and ocean.

### 7.13 Final CTA
- Navy-900 block, 12px radius, inside the container. Left: H2 **Ready to move your business forward?** and buttons **Get a Free Quote** (primary) and **Talk to an Expert** (ghost). Right: cropped photo bleeding to the edge.

## 8. Inner pages

- **/about:** story, mission, leadership, certifications, timeline of milestones.
- **/services:** overview grid. **/services/[slug]:** hero, what is included, how it works, FAQ (accordion), related quote form, CTA.
- **/industries:** grid with detail anchors.
- **/track:** tracking form and result view.
- **/quote:** full multi-step form (Shipment, Route, Contact), progress indicator, summary before submit.
- **/blog** and **/blog/[slug]:** MDX posts, table of contents, related posts.
- **/contact:** form, map embed (lazy), address, phone, email, hours.
- **/privacy, /terms:** plain text templates.
- Every inner page starts with a compact navy header band (240px) containing breadcrumb, H1, and one sentence.

## 9. Backend and data

### 9.1 Collections (MongoDB)

The whole stack is Next.js and MongoDB. There is no separate backend service. Use Mongoose with a cached connection in `/lib/db.ts` (reuse the connection across hot reloads and serverless calls) and read `MONGODB_URI` from environment variables. Local development: a `docker-compose.yml` with a `mongo` service, or a free MongoDB Atlas cluster.

```ts
// /models/QuoteRequest.ts   (collection: quote_requests)
{
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  shipmentType: { type: String, enum: ["ocean", "air", "road", "warehousing"], required: true },
  pickupLocation: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
  weightVolume: String,
  notes: String,
  status: { type: String, enum: ["new", "contacted", "quoted", "closed"], default: "new" },
}  // { timestamps: true } adds createdAt and updatedAt

// /models/Shipment.ts   (collection: shipments, events embedded)
{
  trackingId: { type: String, required: true, unique: true, index: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ["booked", "in_transit", "delivered", "delayed"], required: true },
  eta: Date,
  events: [{ label: String, location: String, occurredAt: Date }],
}  // { timestamps: true }

// /models/ContactMessage.ts   (collection: contact_messages)
{ name: String, email: String, message: String }  // { timestamps: true }

// /models/Subscriber.ts   (collection: newsletter_subscribers)
{ email: { type: String, required: true, unique: true, lowercase: true } }  // { timestamps: true }
```

Seed script: `/scripts/seed.ts` inserts one shipment with `trackingId: "LG-2026-004981"` and four events (booked, picked up, in transit, out for delivery) so the tracking page works from the first run.

### 9.2 Endpoints (Next.js Route Handlers)

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/quotes` | Create quote request, email the team |
| GET | `/api/track/{tracking_id}` | Shipment status and events |
| POST | `/api/contact` | Save contact message, email the team |
| POST | `/api/newsletter` | Subscribe an email |
| GET | `/api/health` | Health check |

Rules: zod validation for every request body (the same schemas the forms use, kept in /lib/validators.ts), rate limit POST routes (5 per minute per IP), same-origin API only, no open CORS, honeypot field plus optional Turnstile or reCAPTCHA on forms, never return Mongo _id values from the tracking endpoint, log errors without personal data.

### 9.3 Form behavior

- Validate on blur and on submit with zod. Inline errors, focus moves to the first invalid field.
- Submit button shows a spinner and disables during the request.
- Success: replace the form with a confirmation ("Thanks, we will reply within 2 business hours") and a reference number. Failure: keep the data and show a retry message.

## 10. Project structure

```
/app
  layout.tsx            fonts, metadata, header, footer
  page.tsx              home
  about/ services/ industries/ track/ quote/ blog/ contact/
  api/
    quotes/route.ts     POST create quote request
    track/[trackingId]/route.ts   GET shipment status and events
    contact/route.ts    POST contact message
    newsletter/route.ts POST subscribe
    health/route.ts     GET health check
/components
  ui/                   Button, Input, Card, Badge, Marquee, StatBlock
  sections/             Hero, TrustBar, About, Services, WhyUs, Process, TrackBand, ...
/lib
  site.ts               brand name, nav, contact details, social links
  db.ts                 cached Mongoose connection
  validators.ts         zod schemas shared by forms and API routes
  mail.ts               email sending for quote and contact notifications
/models                 QuoteRequest, Shipment, ContactMessage, Subscriber
/scripts/seed.ts        seeds the test shipment LG-2026-004981
/content/blog           MDX posts
/public/images          optimized photos
CREDITS.md  TODO.md  .env.example  docker-compose.yml
```

All copy that may change lives in `/lib/site.ts` or `/content`, never hardcoded deep in components.

## 11. SEO, performance, accessibility

**SEO**
- One H1 per page. Unique title (under 60 characters) and meta description (under 155) per page.
- JSON-LD: `Organization`, `LocalBusiness`, `Service` on service pages, `FAQPage` where FAQs exist, `BreadcrumbList`.
- One page per service, each targeting a phrase like *freight forwarding in [city]* or *air cargo [route]*.
- Generate `sitemap.xml` and `robots.txt`. Add Open Graph and Twitter images.

**Performance targets (mobile):** LCP under 2.5s, CLS under 0.1, INP under 200ms, Lighthouse performance 90 or higher.
- Preload the hero image and fonts. Lazy-load everything below the fold. No layout shift: set image dimensions.
- Ship minimal client JS: server components by default, `use client` only for forms, carousel, counters, and header scroll state.

**Accessibility (WCAG 2.2 AA)**
- Semantic landmarks, skip link, visible focus states, labels on every input.
- Alt text on all images, `aria-label` on icon-only buttons, marquee pauses on hover and focus.
- Full keyboard operation for menu, dropdown, carousel, and accordion.
- Respect reduced motion.

## 12. Build order for the agent

1. Scaffold Next.js with TypeScript and Tailwind. Install fonts, add the Tailwind config and CSS variables from section 4.
2. Build the UI primitives from section 5 and a `/styleguide` page showing every token and component. Review it before continuing.
3. Build header and footer.
4. Build home sections 7.1 to 7.13 in order, mobile first, checking each at 375, 768, and 1280px.
5. Build inner pages from section 8 using the same components.
6. Build the MongoDB connection, models, seed script, and API route handlers, then wire the quote, contact, and tracking forms.
7. Add SEO, schema, sitemap, and metadata.
8. Run the performance and accessibility pass. Fix everything under target.
9. Write `README.md` with setup, environment variables, and deploy steps.

## 13. Definition of done

- [ ] Every color, radius, and shadow comes from the tokens. No stray hex values.
- [ ] Only Sora, Inter, and JetBrains Mono are used, at the sizes in section 4.3.
- [ ] Orange appears only on actions, one highlight per heading, and small icons.
- [ ] None of the anti-slop rules in section 3 are broken.
- [ ] Layout holds at 375, 768, 1024, and 1440px with no horizontal scroll.
- [ ] All forms validate, submit, and show success and failure states.
- [ ] Tracking returns data for a seeded test ID (`LG-2026-004981`).
- [ ] Lighthouse mobile: performance 90+, accessibility 95+, SEO 95+.
- [ ] No lorem ipsum, no emoji, no placeholder gray boxes left.
- [ ] `TODO.md` lists every piece of placeholder content still needing the client.

## 14. Open inputs to confirm with the owner

Company name and logo, services and regions actually offered, real client logos, real photography, contact details, certifications, and whether to use the navy and orange palette (default) or navy and red. Until these arrive, use the placeholders in this file and log them in `TODO.md`.