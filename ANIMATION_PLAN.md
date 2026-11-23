# Animation Plan — Your Brand Logistics

Status: planning document. No runtime code has been changed yet.

Scope: every route, global component, home-page section, inner-page section, and shared UI primitive. The plan also covers sections specified in the knowledge base but not yet built, so animation work does not have to be redesigned when those sections land.

---

## 1. Codebase snapshot

### 1.1 Stack

| Layer | Current implementation |
|---|---|
| Framework | Next.js 14.2 App Router, React 18, TypeScript |
| Styling | Tailwind CSS 3.4 with custom navy/ocean/orange tokens |
| Icons | lucide-react, mostly 1.5 to 2.2 stroke |
| Forms | react-hook-form + zod |
| Motion | CSS transitions, CSS marquee keyframes, Tailwind `animate-pulse`, `animate-spin` |
| Framer Motion | Not installed |
| `tailwindcss-animate` | Not installed, although `animate-in`, `fade-in`, `zoom-in-95`, and `slide-in-from-top-2` are used |
| Media | Local images in `/public/images`, hero MP4 in `/public/videos` |

### 1.2 Routes

| Route | State |
|---|---|
| `/` | Implemented, but only 9 of the 13 home sections from the knowledge base |
| `/about` | Implemented |
| `/services` | Implemented |
| `/services/[slug]` | Implemented for ocean, air, road, warehousing |
| `/industries` | Implemented |
| `/contact` | Implemented with simulated submit |
| `/privacy`, `/terms` | Implemented |
| `/styleguide` | Implemented |
| `/track` | Redirects to `/?track=open`; no dedicated tracking page |
| `/quote` | Redirects to `/?quote=open`; no multi-step quote page |
| `/blog`, `/blog/[slug]` | Missing |
| `/api/quotes` | Mock response only |

### 1.3 Home sections present

1. Hero (`components/sections/hero.tsx`)
2. Trust bar (`components/sections/trust-bar.tsx`)
3. Services marquee (`components/sections/services-marquee.tsx`)
4. About (`components/sections/about.tsx`)
5. Services (`components/sections/services.tsx`)
6. Why choose us (`components/sections/why-choose-us.tsx`)
7. How it works (`components/sections/how-it-works.tsx`)
8. Tracking CTA (`components/sections/tracking-cta.tsx`)
9. Testimonials (`components/sections/testimonials.tsx`)

### 1.4 Home sections missing from the knowledge base

10. Industries (6 image cards)
11. Fleet and global reach (fleet photo plus route-line SVG)
12. Insights (3 article cards)
13. Final CTA (navy block with cropped photo)

The design reference confirms these sections are part of the intended page. Their animation plan is included below.

### 1.5 Global components

- Header: transparent over hero, white after 40px scroll, services dropdown, full-screen mobile menu.
- Footer: five columns, newsletter form, social links.
- Floating elements: WhatsApp button and mobile sticky quote/call bar.
- Quote modal and tracking modal.
- Page header for inner pages.
- UI primitives: Button, Card, ServiceCard, Input, Badge, Eyebrow, SectionHeading, StatBlock, StepItem, Marquee.

---

## 2. Current motion audit

### 2.1 What already works

| Area | Existing motion |
|---|---|
| Header | Background and text color transition on scroll, logo scale on hover, chevron rotation |
| Hero | Autoplaying background video, button hovers, form focus states |
| Trust bar | Mobile logo marquee |
| Services marquee | Continuous navy ticker |
| About | Image zoom on hover |
| Services cards | Desktop flex expansion, image zoom, arrow nudge, accent-line width, font-size changes |
| Why choose us | Card lift, border and title color changes, icon scale, image zoom |
| How it works | Image zoom only |
| Tracking CTA | Input focus ring, quick-fill hover |
| Testimonials | Infinite card marquee, card lift on hover |
| Footer | Link, social, and input hover/focus colors |
| Floating elements | WhatsApp hover and active scale |
| Forms | Loading spinner, focus rings, dropdown chevron rotation |
| Global CSS | Blunt `prefers-reduced-motion` override, marquee keyframes |

### 2.2 Gaps and defects that must be fixed before adding motion

1. **Dead animation utilities.** `animate-in`, `fade-in`, `zoom-in-95`, and `slide-in-from-top-2` are used in the header dropdown, mobile menu, both modals, quote-form success state, and quote-form dropdown. `tailwindcss-animate` is not installed or configured, so these entrances currently happen instantly. Either install and configure the plugin, or replace them with the motion primitives in section 7.
2. **Invalid Tailwind motion classes.** `duration-400`, `scale-108`, `w-6.5`, `h-6.5`, `sm:w-13`, `sm:h-13`, and `p-5.5` are not default Tailwind utilities. The intended icon and image hover effects in `why-choose-us.tsx` do not run, and color transitions fall back to the default duration.
3. **No scroll-reveal system.** Nothing fades or rises on scroll. The site feels static below the hero.
4. **No animated counters.** The About stats and About-page stats are static, despite the knowledge base requiring counters that start once at 40% visibility.
5. **No image reveal language.** Images appear immediately. Only hover zoom exists.
6. **No page or section transition.** Route changes and section entries are abrupt.
7. **Auto-playing content lacks a pause control.** The hero video, trust marquee, services marquee, and testimonial marquee all exceed five seconds and none has a visible pause mechanism. Hover pause is not enough for keyboard and touch users.
8. **Infinite attention animation.** `animate-pulse` is used on tracking status dots in `tracking-modal.tsx` and `badge.tsx`. The knowledge base prohibits auto-playing attention animations. Replace with a static dot or a slow opacity change that is not used to signal importance.
9. **Inconsistent timing.** Durations range from 150ms to 700ms with no shared tokens. Easings mix `ease-out`, `ease-in-out`, and a custom cubic-bezier. Some elements use `transition-all`.
10. **Layout animation in service cards.** The desktop flex expansion animates `flex`, which triggers layout on every frame. It is acceptable on desktop but must be tested on low-end devices. Font-size changes and `line-clamp` changes cause additional reflow. The plan keeps the expansion but removes animated typography.
11. **Blunt reduced-motion handling.** The global CSS sets every animation and transition to `0.01ms`. This disables functional transitions as well as decorative ones and does not stop future JavaScript-driven motion.
12. **Modal accessibility is incomplete.** Focus is not trapped, focus is not restored on close, and there is no exit animation. `aria-modal` is present but not enough by itself.
13. **Mobile menu appears instantly.** Same dead `animate-in` issue.
14. **Hero video has no reduced-motion fallback.** Users who request reduced motion still get an autoplaying video.
15. **Marquees do not pause on keyboard focus.** They pause on hover only.
16. **Newsletter success and form errors appear instantly.** No feedback transition.

### 2.3 Anti-slop issues adjacent to motion

These affect the motion pass because they change what should animate:

- `backdrop-blur` is used in the header, modals, tracking form, quick-fill pills, and a few overlays. The knowledge base forbids glassmorphism. Replace with solid or near-solid surfaces before adding entrance animations.
- The hero uses a video, which is allowed, but the knowledge base asks for real photography and restrained motion. Keep the video, add a pause control, and use the poster for reduced motion.
- The services section has a blurred background map. Keep it static. Do not animate the blur.
- Several hard-coded hex values remain. Motion work should not add more.

---

## 3. Motion principles

The site should feel like precision logistics: controlled, directional, quiet, and confident. Motion is used to explain sequence and hierarchy, not to decorate.

### 3.1 Rules

1. One motion idea per section. A section may have a reveal, a draw, or a counter, but not all three competing for attention.
2. Motion follows reading order: top to bottom, left to right.
3. Default reveal is a 16px rise plus opacity. It is used once per element.
4. Images use a clip-path wipe or a scale settle, not both.
5. Data uses count-up only when the number is a real metric. Labels and body copy always fade.
6. Process and route content use line draws to show sequence.
7. Continuous motion is limited to the hero video and the two brand marquees. Every continuous element has a pause control.
8. No bouncing, spring overshoot, spinning, shaking, flashing, text scrambling, or auto-rotating carousels.
9. No scroll-jacking. No parallax on text. No scroll-linked opacity that hides content.
10. Animate only `transform` and `opacity` where possible. Shadow and color transitions are allowed on small interactive elements.
11. Every animation has a reduced-motion equivalent: opacity only, 150ms, or a static final state.
12. Content must remain readable and focusable before, during, and after animation.

### 3.2 Motion tokens

Add these to `lib/motion.ts` and mirror the durations in CSS variables.

| Token | Value | Use |
|---|---|---|
| `instant` | 100ms | Press feedback, color snap |
| `fast` | 150ms | Hover, focus, chevron, small state changes |
| `base` | 250ms | Dropdowns, accordions, modal exit, form feedback |
| `reveal` | 400ms | Default scroll reveal |
| `image` | 700ms | Image wipe and zoom settle |
| `counter` | 1200ms | Stat counters |
| `routeDraw` | 1400ms | SVG route line |
| `marquee` | 32s to 36s per loop | Brand tickers |
| `stagger` | 60ms | Default group stagger |
| `staggerDense` | 40ms | Dense lists and timeline events |
| `staggerCards` | 80ms | Card grids |
| `revealY` | 16px | Default rise |
| `revealYSmall` | 8px | Dropdowns and compact UI |
| `modalScale` | 0.96 | Modal entrance start |
| `modalY` | 8px | Modal entrance offset |

Easing:

| Token | Value |
|---|---|
| `easeOut` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `easeInOut` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `linear` | `linear` |

### 3.3 Trigger rules

- Hero and header animate on mount.
- Everything below the hero animates when 15% of the element is visible, with `rootMargin: "0px 0px -10% 0px"`.
- Counters start when 40% of the stat block is visible.
- Line draws start when the container is 30% visible.
- Reveals fire once. They do not replay when scrolling back up.
- Stagger resets only if the component remounts because of a route change.
- Modals and menus animate on open and close.
- Forms animate state changes, not every keystroke.

### 3.4 Reduced-motion contract

When `prefers-reduced-motion: reduce` is active:

- All transforms are removed.
- Opacity transitions are allowed at 150ms.
- Counters show the final value immediately.
- Line draws show the completed line immediately.
- Marquees stop and become horizontally scrollable rows with snap points.
- The hero video is replaced by its poster image.
- Modals and menus appear and disappear with a 150ms opacity change.
- Hover effects still change color and border, but do not move or scale.
- No element is hidden or delayed.

---

## 4. Global animation plan

### 4.1 Header

File: `components/layout/header.tsx`

**On mount**

- Header fades down from `translateY(-8px)` to `0` over 300ms with `easeOut`.
- Logo and navigation do not animate separately; the whole bar moves once.
- On inner pages, the white header appears with the same entrance.

**On scroll past 40px**

- Background changes from transparent to solid white, border-bottom fades in, and text switches from white to navy.
- Animate `background-color`, `border-color`, `color`, and `box-shadow` over 250ms. Do not use `transition-all`.
- Remove `backdrop-blur-md`. Use `bg-white` or `bg-white/98` to comply with the anti-slop rule.
- The logo mark does not animate on scroll.

**Desktop navigation**

- Link hover: color to orange over 150ms. No underline sweep, no letter spacing change.
- Phone link: icon stays static; text color changes over 150ms.
- Quote button: background changes over 200ms; arrow nudges 2px up-right over 150ms.
- Services dropdown:
  - Trigger opens on hover after 80ms intent delay to prevent accidental opens.
  - Panel fades in and moves from `translateY(-6px)` and `scale(0.98)` to `0` and `1` over 180ms.
  - Items stagger 25ms with a 4px rise.
  - Chevron rotates 180 degrees over 180ms.
  - On close, panel fades out over 120ms.
  - Keyboard: Enter or Space opens, Escape closes, arrow keys move through items, focus returns to the trigger.
  - Replace the dead `animate-in fade-in slide-in-from-top-2` classes.

**Mobile header**

- Hamburger icon changes to orange on hover over 150ms.
- No scale or rotation on the icon.

**Reduced motion**

- Header appears immediately.
- Scroll state changes color without transition.
- Dropdown fades only, 150ms.

### 4.2 Mobile navigation drawer

File: `components/layout/header.tsx`

**Open**

- Backdrop fades from transparent to navy at 60% over 200ms.
- Panel enters from `translateY(-12px)` with opacity over 280ms.
- Top bar fades in at 80ms.
- Navigation links stagger 40ms, each rising 12px over 300ms.
- Service sub-links stagger 30ms after their parent.
- Contact row and pinned quote button rise 8px and fade at 180ms after the links.
- Close button is always visible and focusable.

**Close**

- Reverse over 180ms. Do not wait for every child; fade the panel and backdrop together.
- Restore focus to the hamburger button.
- Unlock body scroll after the exit completes.

**Interaction**

- Link hover: text to orange over 150ms; arrow moves 2px up-right.
- No accordion animation for service sub-links; they are always visible.
- Focus is trapped inside the drawer while open.

**Reduced motion**

- Fade only, 150ms. Links appear together.

### 4.3 Footer

File: `components/layout/footer.tsx`

**On first view**

- Five columns fade up 16px and stagger 60ms over 400ms.
- The bottom row fades in 100ms after the columns.
- The border-top line fades in with the first column.

**Interaction**

- Links: color to white over 150ms. No movement.
- Social icons: border and background change over 200ms; icon color to white.
- Newsletter input: focus border and ring over 150ms.
- Subscribe button: background change over 200ms; loading spinner while submitting.
- Success message: fade and rise 4px over 200ms.
- Error message: fade and rise 4px over 150ms. No shake.

**Reduced motion**

- Columns appear immediately or fade only.

### 4.4 Floating elements

File: `components/layout/floating-elements.tsx`

**WhatsApp button**

- Appears 800ms after page load with opacity and scale from `0.9` to `1` over 300ms.
- Hover: scale to `1.05` over 200ms.
- Active: scale to `0.95` over 100ms.
- No pulse, no bounce.
- Hide or fade out when a modal or mobile menu is open, so it does not compete with the overlay.

**Mobile sticky bar**

- Slides up from `translateY(100%)` to `0` over 300ms on mount, after a 200ms delay.
- Hides by sliding down 200ms when the mobile menu or a modal opens.
- Buttons keep their existing color transitions.
- Safe-area padding is preserved.

**Reduced motion**

- Fade in and out only.

### 4.5 Modals: quote and tracking

Files: `components/modal/quote-modal.tsx`, `components/modal/tracking-modal.tsx`

**Backdrop**

- Fade from 0 to `bg-navy-900/80` over 200ms.
- Remove `backdrop-blur-md`; use a solid navy overlay.
- Click outside closes only when the press starts and ends on the backdrop.

**Dialog**

- Enter: opacity 0 to 1, `scale(0.96)` to `1`, `translateY(8px)` to `0` over 240ms with `easeOut`.
- Exit: opacity to 0, `scale(0.98)` over 160ms.
- On mobile, keep the centered dialog but ensure `max-h-[92vh]` and internal scroll. Do not animate height.
- Close button: hover scale `1.05`, active `0.95`; these are small and allowed.
- Focus trap: first focusable element receives focus. Escape closes. Focus returns to the trigger.

**Quote form inside the modal**

- Form fields are already visible when the modal opens; do not stagger all eight fields. The dialog entrance is enough.
- Dropdown: 150ms fade and `scale(0.97)`; options stagger 20ms if the list is short.
- Error banner: fade and slide down 4px over 180ms.
- Submit: spinner continues for the request duration; button stays disabled.
- Success: crossfade the form out and the confirmation in over 250ms. The reference number fades in 100ms after the confirmation.
- "Submit another request": crossfade back over 200ms.

**Tracking modal**

- When a lookup completes, the result block fades and rises 8px over 250ms.
- Timeline events stagger 40ms, each fading and rising 8px.
- The vertical timeline line draws from top to bottom over 500ms.
- Status dots are static. Remove `animate-pulse`.
- The search button shows "Searching..." while the lookup runs; no skeleton needed.
- Quick-fill pills: background change over 150ms; clicking one fills the input and gives the input a 300ms orange ring fade.

**Reduced motion**

- Backdrop and dialog fade only, 150ms.
- Timeline events appear together.
- No scale or movement.

### 4.6 Page transitions

Optional, recommended only after the section work is stable.

- Add `app/template.tsx` with a client component that fades the page from 0 to 1 over 200ms on route change.
- Do not translate the page; translation can cause scroll position jumps.
- Do not animate the header or footer with the page.
- Respect reduced motion by disabling the fade.
- If this adds perceived delay, remove it. Section-level motion is more important than route transitions.

### 4.7 Page header for inner pages

File: `components/layout/page-header.tsx`

**On mount**

- Background grid stays static.
- Breadcrumb fades in over 200ms.
- Eyebrow line draws from 0 to 24px over 300ms; label fades in at the same time.
- H1 uses a line-mask reveal: each line moves from `translateY(16px)` and opacity 0 to its final position over 500ms, with 80ms between lines.
- Description fades up 12px over 400ms, 120ms after the H1 starts.
- A 32px orange rule under the H1 can draw from left to right over 300ms, 200ms after the H1. This is optional; if used, it replaces the eyebrow line draw so there are not two line animations.

**Reduced motion**

- All content visible immediately; opacity fade only.

### 4.8 Forms and validation states

Files: `components/sections/quote-form.tsx`, `app/contact/page.tsx`, `components/layout/footer.tsx`

- Focus: border and ring transition over 150ms.
- Error message: fade and slide down 4px over 150ms.
- Error border: color change over 150ms. No shake.
- Submit button: spinner is functional and allowed. Keep the spinner at 16px and do not animate the button size.
- Success state: crossfade and scale from `0.98` to `1` over 250ms.
- Reference number: fade in 100ms after the success panel.
- Newsletter success: fade and rise 4px over 200ms.
- Multi-step quote page, when built: horizontal slide plus fade between steps over 250ms; progress bar width over 300ms; summary rows stagger 40ms.

### 4.9 Shared UI primitives

| Primitive | Motion |
|---|---|
| Button | Background 200ms; arrow nudge 2px over 150ms; active scale 0.98 over 100ms; focus ring static |
| Card | Lift 4px and shadow change over 300ms; border color 200ms |
| ServiceCard | Image zoom to 1.05 over 500ms; arrow nudge; lift 4px; no text reflow |
| Input | Border and ring 150ms; error message 150ms |
| Badge | No pulse; status dot static; color changes only |
| Eyebrow | Line draws 0 to 24px over 300ms on first view; text fades with it |
| SectionHeading | Eyebrow, H2, and description stagger 60ms on first view |
| StatBlock | Count-up 1200ms at 40% visibility; label fades; dividers fade |
| StepItem | Node scale 0.85 to 1 over 200ms; connector draws; content fades up 8px |
| Marquee | Continuous linear scroll; pauses on hover and focus; visible pause button; reduced motion becomes a scrollable row |

### 4.10 FAQ accordion

File: `app/services/[slug]/page.tsx`

The current FAQ is a static list. Convert it to an accordion before animating it.

- Trigger is a full-width button with `aria-expanded` and `aria-controls`.
- Open: content grid row expands from `0fr` to `1fr` over 250ms; content fades in over 200ms with a 50ms delay.
- Close: reverse over 200ms.
- Chevron rotates 180 degrees over 180ms.
- Only one item open at a time.
- Focus ring remains visible.
- Reduced motion: instant open and close, or a 150ms opacity change.

---

## 5. Home page animation plan, section by section

### 5.1 Hero

File: `components/sections/hero.tsx`

**Intent**

The hero should feel like arrival, not a showreel. The ship and the headline establish the brand, then the quote card becomes the action. Motion is a single timed sequence on first load.

**Load timeline**

| Time | Element | Motion |
|---|---|---|
| 0ms | Background video/poster | Fades from navy-900 to full opacity over 700ms. No zoom. |
| 100ms | Eyebrow | Line draws to 20px and label fades in over 300ms. |
| 180ms | H1 line 1 "Where Logistics" | Mask reveal: `translateY(20px)` and opacity 0 to final over 600ms. |
| 280ms | H1 line 2 "Meets Precision." | Same reveal, 600ms. |
| 420ms | Description | Fade up 12px over 400ms. |
| 500ms | Primary button | Fade up 12px over 350ms. |
| 560ms | Ghost button | Fade up 12px over 350ms. |
| 650ms | Avatar stack | Avatars scale from 0.9 to 1 and fade over 250ms, staggered 50ms. |
| 700ms | Trust line | Fades in over 300ms. |
| 350ms | Desktop quote card | Fades up 16px and scales from 0.985 to 1 over 500ms. |
| 500ms | Quote card fields | Do not stagger every field; the card entrance is enough. The submit button can fade in 100ms after the card. |

**Scroll behavior**

- No parallax on the headline or quote card.
- Pause the hero video when it leaves the viewport.
- Optional: after 200px of scroll, the hero content can fade to 0.92 and move up 8px. This is subtle but not necessary. Skip it if it causes any jank.

**Interaction**

- Primary button: arrow nudge 2px up-right over 150ms.
- Ghost button: background tint over 150ms.
- Avatars: no hover animation. They are not interactive.
- Quote card: focus states only. The card itself does not float.
- Video pause control: small, bottom-left or bottom-right, 40px, white icon on navy/60, `aria-label="Pause background video"`. It appears at 900ms with a fade. On mobile it can sit above the sticky bar.

**Reduced motion**

- Show the poster image only; do not load or play the video.
- All text and buttons visible immediately.
- No mask reveals, no movement.
- The pause control is hidden.

**Performance**

- Keep `preload="metadata"` and the poster.
- Consider a 720p mobile source and a 1080p desktop source.
- Pause the video with IntersectionObserver when offscreen.
- Do not animate the video scale.

### 5.2 Trust bar

File: `components/sections/trust-bar.tsx`

**On view**

- Label fades up 12px over 300ms.
- Desktop logos fade in and rise 8px, staggered 50ms, from 0.6 opacity to their resting 0.6. The stagger is the motion; the opacity itself stays at the brand-approved 60%.
- On hover, a logo goes to 100% opacity over 200ms. No scale.

**Mobile marquee**

- Keep the slow marquee at 25s.
- Pause on hover, focus, and touch start.
- Add a small pause/play button at the right edge, 32px, with `aria-pressed`.
- Add left and right fade masks so logos do not clip abruptly.
- On reduced motion, remove the marquee and show a horizontally scrollable row with snap points.

**Reduced motion**

- Static row. No stagger.

### 5.3 Services marquee

File: `components/sections/services-marquee.tsx`

**On view**

- The navy band fades in over 300ms.
- The ticker begins immediately but should only run when the section is in view. Use IntersectionObserver to toggle `animation-play-state`.
- Pause on hover, focus, and touch.
- Add a visible pause/play control at the right edge, 32px, matching the band. This satisfies the pause requirement for moving content.

**Interaction**

- Star glyphs stay static. Do not rotate or pulse them.
- The band does not react to scroll.

**Reduced motion**

- Static row with horizontal scroll if content overflows.
- No star animation.

### 5.4 About

File: `components/sections/about.tsx`

**On view**

| Element | Motion |
|---|---|
| Port photo | Clip-path reveal from the bottom: `inset(100% 0 0 0)` to `inset(0 0 0 0)` over 800ms, with a 1.04 to 1 scale settle. |
| Photo overlay | Fades in with the image. |
| 98% stat card | Fades up 12px and scales from 0.94 to 1 over 400ms, 250ms after the photo starts. |
| 98% number | Counts from 0 to 98 over 1200ms, starting when 40% visible. |
| Eyebrow line | Draws from 0 to 20px over 300ms. |
| Heading | Fades up 16px over 400ms. |
| Body copy | Fades up 16px over 400ms, 60ms after the heading. |
| Stats grid | Four stats stagger 80ms, each fading up 12px over 400ms. |
| Stat numbers | Count up over 1200ms with a 40ms stagger. Suffixes stay fixed. |
| Labels and sublabels | Fade in with their stat. |
| CTA button | Fades up 12px over 350ms, after the stats. |

**Interaction**

- Photo hover: scale to 1.05 over 500ms.
- Stat card does not move on hover.
- CTA arrow nudges.

**Counter implementation notes**

- Parse `29K+`, `150K`, `139K+`, `50+` into value and suffix. Animate only the numeric part.
- Use `font-variant-numeric: tabular-nums` and reserve width so CLS is zero.
- Render the final value for screen readers in a visually hidden span; mark the animated number `aria-hidden`.
- Start at the final value if reduced motion is active.

**Reduced motion**

- Image appears without wipe.
- Counters show final values.
- All text visible immediately.

### 5.5 Services

File: `components/sections/services.tsx`

**On view**

- Background map fades from 0 to its resting opacity over 800ms. No scale, no blur animation.
- Eyebrow line draws; heading and description fade up 16px with a 60ms stagger.
- "View all services" button fades up 12px, 100ms after the description.
- Cards fade up 24px and stagger 80ms over 500ms.
- The first card's orange border and accent line fade in 250ms after the cards settle, so the eye lands on it.

**Desktop interaction**

- Hover or focus a card: flex expands from 1 to 1.85 over 500ms with `easeOut`; siblings shrink to 0.8.
- Image scales to 1.05 over 700ms.
- Arrow button scales to 1.05 over 200ms; arrow moves 2px up-right.
- Accent line grows from 44px to 56px over 300ms.
- Border changes to orange over 200ms; card lifts 6px over 300ms.
- **Do not animate font size or line-clamp.** The current implementation changes both, which causes reflow and text jumping. Keep the title and description at fixed sizes. If the full description must appear, crossfade between a clamped and an unclamped copy, or simply let the expanded card show the same three-line description with more breathing room.
- Focus-visible triggers the same state as hover, so keyboard users see the expansion.

**Mobile**

- Horizontal snap carousel. No flex expansion.
- Each card fades up 16px when it enters the viewport, with no more than 80ms between visible cards.
- No auto-scroll. No scroll hint animation.

**Reduced motion**

- Cards appear immediately.
- No flex expansion, image zoom, arrow movement, or accent-line growth.
- Border and shadow changes remain.

### 5.6 Why choose us

File: `components/sections/why-choose-us.tsx`

**On view**

- Eyebrow, heading, description, and CTA stagger 60ms and fade up 16px over 400ms.
- Photo wipes in from the right over 700ms with a 1.03 to 1 scale settle.
- Four feature cards fade up 20px and stagger 80ms over 450ms.
- Icon chips scale from 0.9 to 1 over 250ms as their card appears.
- Step numbers fade in with their cards.
- The featured card does not get a separate glow or pulse. Its orange border is enough.

**Interaction**

- Card hover: lift 8px over 500ms; border to orange; title to orange over 300ms.
- Icon chip: scale to 1.08 over 500ms.
- Image: scale to 1.05 over 700ms. Fix the invalid `scale-108` class.
- Fix `duration-400` to `duration-300`.
- The number changes to orange over 300ms.

**Reduced motion**

- No lift, scale, or image zoom.
- Border and color changes only.

### 5.7 How it works

File: `components/sections/how-it-works.tsx`

**On view**

- Header eyebrow, heading, and description stagger 60ms.
- The vertical dashed line draws from top to bottom over 700ms.
- Each step node scales from 0.85 to 1 and fades in over 200ms, staggered 120ms.
- Step content fades up 8px, 60ms after its node.
- The photo wipes in from the right over 700ms.
- The "Verified Port & Dock Operations" badge fades in 250ms after the photo, rising 4px.
- The green dot is static. No pulse.

**Optional enhancement**

- On desktop, the dashed line can fill with a solid navy line as the user scrolls through the steps. Use a scroll progress value and `scaleY`. This is a nice storytelling device, but it adds JavaScript and must be disabled for reduced motion. The one-shot draw is the safer default.

**Interaction**

- Photo hover: scale to 1.05 over 500ms.
- Steps are not hover targets.

**Reduced motion**

- Line and nodes are fully visible.
- Photo appears without wipe.

### 5.8 Track your shipment

File: `components/sections/tracking-cta.tsx`

**On view**

- Background photo scales from 1.04 to 1 over 1200ms. This is a single settle, not a continuous pan.
- Overlay stays static.
- Eyebrow, heading, and description stagger 60ms and fade up 16px.
- Form fades up 12px and scales from 0.985 to 1 over 400ms, 100ms after the description.
- Quick-fill row fades in 100ms after the form.

**Interaction**

- Input focus: orange ring over 150ms.
- Track button: arrow nudge; background change over 200ms.
- On submit: button shows a spinner and disables while the modal opens. Do not animate the section.
- Quick-fill pill hover: background change over 150ms.
- Quick-fill click: fill the input and flash a 2px orange ring that fades over 300ms. This confirms the value was inserted.
- The two sample IDs are mono; do not animate the characters.

**Reduced motion**

- Background static.
- Form visible immediately.
- No ring flash; the value simply appears.

### 5.9 Testimonials

File: `components/sections/testimonials.tsx`

**On view**

- Header eyebrow, heading, and description stagger 60ms.
- The marquee track fades in over 400ms.
- Cards are already in continuous motion; do not add an entrance stagger on top of the marquee.

**Marquee**

- Keep the 36s loop.
- Pause on hover, focus, and touch.
- Add a visible pause/play button at the top-right of the section or at the right edge of the track.
- Duplicate track remains `aria-hidden`.
- Edge fade masks stay static.

**Interaction**

- Card hover: lift 8px over 500ms; border to orange; quote mark color; avatar ring to orange; bottom dot scales to 1.25.
- These are small, local effects and are allowed.
- No text movement.

**Reduced motion**

- Stop the marquee. Show a horizontally scrollable row with snap points.
- Cards keep hover color changes but no lift.

### 5.10 Industries (missing)

New file: `components/sections/industries.tsx`

**On view**

- Header eyebrow, heading, and description stagger 60ms.
- Six cards fade up 20px and stagger 70ms over 450ms.
- Card images scale from 1.05 to 1 over 700ms as they appear. This is a settle, not a continuous zoom.
- Icons fade and scale from 0.9 to 1 over 250ms.

**Interaction**

- Card hover: image scales to 1.05 over 500ms; navy overlay darkens slightly over 300ms; arrow moves 2px up-right; title gets an orange underline that draws left to right over 250ms.
- Card lift 4px over 300ms.
- No tilt, no 3D.

**Mobile**

- Two columns if space allows, otherwise one column. Stagger only the cards currently in view.
- No horizontal carousel.

**Reduced motion**

- No image scale, no underline draw, no lift.
- Color and overlay changes only.

### 5.11 Fleet and global reach (missing)

New file: `components/sections/global-reach.tsx`

**On view**

- Wide fleet photo wipes in from the left over 800ms with a 1.03 to 1 settle.
- Side panel heading and copy fade up 16px with a 60ms stagger.
- Route SVG draws from origin to destination over 1400ms.
- Route dots fade and scale from 0.8 to 1, staggered 100ms, after the line passes them.
- "50+ cities" and "30+ countries" count up over 1200ms when 40% visible.
- The dotted map stays static.

**Interaction**

- Photo hover: scale to 1.03 over 700ms.
- No moving vehicle dot. A continuously traveling dot would be an attention animation and is not needed.
- Route line does not replay.

**Reduced motion**

- Photo static.
- Route line fully drawn.
- Numbers show final values.

### 5.12 Insights (missing)

New file: `components/sections/insights.tsx`

**On view**

- Header fades up.
- Three article cards fade up 20px and stagger 80ms over 450ms.
- Card images scale from 1.04 to 1 over 700ms.
- Category badges fade in 100ms after their card.

**Interaction**

- Card hover: lift 4px; image scale to 1.05 over 500ms; title color to orange over 200ms; arrow moves 2px up-right.
- Read-time stays mono and static.
- No auto-rotating featured article.

**Reduced motion**

- No image scale or lift.

### 5.13 Final CTA (missing)

New file: `components/sections/final-cta.tsx`

**On view**

- Navy block fades up 20px and scales from 0.995 to 1 over 500ms.
- Left heading and copy stagger 60ms.
- Buttons stagger 60ms after the copy.
- Right photo wipes in from the right over 700ms.
- No background pattern animation.

**Interaction**

- Primary button arrow nudge; background change.
- Ghost button background tint.
- Photo scales to 1.03 on hover over 700ms.
- No floating or pulsing.

**Reduced motion**

- All content visible immediately; no scale or wipe.

---

## 6. Inner page animation plan

### 6.1 About page

File: `app/about/page.tsx`

**Page header**

- Use the global PageHeader plan.

**Story and mission**

- Photo wipes in from the left over 700ms with a 1.03 to 1 settle.
- The 98% badge fades up 8px, 200ms after the photo.
- Eyebrow, heading, and two paragraphs stagger 60ms.
- The two protocol rows (shield and clock) stagger 80ms.
- Icons scale from 0.9 to 1 over 200ms.

**Stats bar**

- Four StatBlocks count up over 1200ms when 40% visible, staggered 60ms.
- Dividers fade in with their blocks.
- No background animation.

**Timeline**

- A horizontal line draws behind the four milestone cards on desktop over 800ms.
- On mobile, the line is vertical and draws top to bottom.
- Cards fade up 16px and stagger 100ms.
- Years fade in with their cards. Do not count years up; it reads as a gimmick.
- Card hover: lift 4px and border to orange over 300ms.

**Leadership**

- Three cards fade up 20px and stagger 80ms.
- Avatars scale from 0.9 to 1 over 250ms.
- Card hover: lift 4px; avatar ring to orange over 300ms.

**Certifications**

- Four cards fade up 16px and stagger 70ms.
- Award icons scale from 0.9 to 1 over 200ms.
- Card hover: border to orange over 200ms. No lift; these are small.

**Final CTA**

- Fade up 16px; button arrow nudge.

**Reduced motion**

- No wipes, lifts, or counters. Static final values.

### 6.2 Services overview page

File: `app/services/page.tsx`

**Page header**

- Use the global PageHeader plan.

**Service cards**

- Two-column cards fade up 20px and stagger 100ms over 450ms.
- Image header scales from 1.04 to 1 over 700ms.
- Capability checklist items fade in with their card; do not stagger every item, or the section becomes noisy.
- Transit badge fades in 100ms after the card.
- Card hover: lift 4px; image scale to 1.05 over 500ms; border to orange; title to orange.
- "View service specifications" link arrow moves 2px up-right.
- "Get Quote" button arrow nudges.

**Standards row**

- Three cards fade up 16px and stagger 80ms.
- Icons scale from 0.9 to 1 over 200ms.
- Card hover: lift 4px.

**Reduced motion**

- Static cards; color changes only.

### 6.3 Service detail page

File: `app/services/[slug]/page.tsx`

**Page header**

- Use the global PageHeader plan. The highlighted first word of the title is static; do not animate the color separately.

**Stat bar**

- Four white stat cards fade up 12px and stagger 60ms.
- Values fade in; they are text, not numbers to count.
- Cards do not lift on hover; they are informational.

**Overview**

- Image wipes in from the left over 700ms with a 1.03 to 1 settle.
- Icon chip scales from 0.9 to 1 over 200ms.
- Heading and description fade up 16px with a 60ms stagger.
- CTA fades up 12px, 100ms after the description.
- Image hover: scale to 1.03 over 700ms.

**What is included**

- Six feature cards fade up 16px and stagger 60ms over 400ms.
- Check icons scale from 0.9 to 1 over 200ms.
- Card hover: lift 4px and border to orange over 300ms.

**Process**

- Four step cards fade up 16px and stagger 80ms.
- A connector line draws behind them on desktop over 800ms.
- Step numbers fade in with their cards.
- No icon spin or number flip.

**FAQ**

- Convert to the accordion described in section 4.10.
- First item can be open by default on desktop; if so, animate it open on mount with the same 250ms height transition. On mobile, start closed to keep the page compact.

**Bottom CTA**

- Fade up 16px; heading, copy, and buttons stagger 60ms.
- Button arrows nudge.

**Reduced motion**

- No wipes, lifts, or line draws. Accordion opens instantly.

### 6.4 Industries page

File: `app/industries/page.tsx`

**Page header**

- Use the global PageHeader plan.

**Industry panels**

- Each panel fades up 16px when it enters the viewport over 400ms.
- Icon chip scales from 0.9 to 1 over 200ms.
- Feature rows stagger 40ms within the panel, but only when the panel is in view. Limit to four rows per panel.
- Right CTA card slides in from the right 12px and fades over 300ms, 100ms after the panel.
- Panel hover: border to orange over 250ms. No lift; the panels are large.

**Compliance row**

- Heading and copy fade up 16px.
- Two buttons stagger 60ms.
- No background animation.

**Reduced motion**

- Panels and feature rows appear immediately.

### 6.5 Contact page

File: `app/contact/page.tsx`

**Page header**

- Use the global PageHeader plan.

**Left information column**

- Heading and copy fade up 16px.
- Four contact rows (phone, email, address, hours) stagger 70ms.
- Icons scale from 0.9 to 1 over 200ms.
- Links change to orange on hover over 150ms.

**Form**

- Form card fades up 16px over 400ms.
- Fields are visible with the card; do not stagger every field.
- Focus ring 150ms.
- Submit spinner while sending.
- Success panel crossfades in over 250ms and scales from 0.98 to 1.
- "Send another message" crossfades back over 200ms.
- If a map is added, lazy-load it and fade it in over 300ms once loaded.

**Reduced motion**

- Fade only; no scale.

### 6.6 Privacy and Terms

Files: `app/privacy/page.tsx`, `app/terms/page.tsx`

- Page header uses the global plan.
- Each policy block fades up 12px and staggers 60ms on first view.
- No counters, line draws, or hover effects.
- Anchor links, if added, scroll smoothly only when reduced motion is not requested.

### 6.7 Styleguide

File: `app/styleguide/page.tsx`

- Page header fades in.
- Each component group fades up 12px and staggers 40ms.
- No motion showcase animation loops. The styleguide should show static states.
- If motion tokens are documented, show a single "play" button per example rather than autoplaying.

### 6.8 Tracking page (missing)

New file: `app/track/page.tsx`

- Page header uses the global plan.
- Search form fades up 12px.
- On result:
  - Result card fades and rises 8px over 250ms.
  - Status badge fades in 100ms after the card.
  - Route line draws from origin to destination over 700ms.
  - Checkpoints stagger 60ms; completed nodes scale from 0.9 to 1; current node has a static orange ring; pending nodes are muted.
  - Timestamps fade in with their checkpoints.
- No map library animation. If a map is added, use a static route and a single fade.
- Reduced motion: all results appear at once; route line fully drawn.

### 6.9 Quote page (missing)

New file: `app/quote/page.tsx`

- Page header uses the global plan.
- Multi-step form:
  - Step change: current step fades and slides out 8px over 180ms; next step fades and slides in 8px over 250ms. Direction follows forward/back.
  - Progress bar width animates over 300ms; step labels fade between states.
  - Validation error: fade and slide 4px over 150ms; focus moves to the first invalid field without animation.
  - Summary rows stagger 40ms when the summary step appears.
  - Submit spinner; success crossfade.
- Reduced motion: crossfade only, 150ms; progress bar jumps to the new value.

### 6.10 Blog index and post (missing)

New files: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`

- Blog index:
  - Header fades up.
  - Article cards fade up 20px and stagger 80ms.
  - Image scale settle 1.04 to 1 over 700ms.
  - Hover: lift 4px; image scale 1.05; title to orange.
- Post page:
  - Header fades up.
  - Hero image wipes in over 700ms.
  - Body paragraphs fade up 8px and stagger 30ms, but cap the stagger so long articles do not feel slow. Only the first viewport of content should animate; the rest appears normally.
  - Reading progress bar at the top: 2px orange line, width tied to scroll progress, no transition lag. This is functional and allowed.
  - Table of contents active link indicator slides between items over 200ms.
  - Related posts stagger 60ms.

### 6.11 404 page (missing)

New file: `app/not-found.tsx`

- Simple fade and 8px rise over 300ms.
- One button arrow nudge.
- No route-line gimmick.

---

## 7. Implementation architecture

### 7.1 Recommended dependency decision

Use a hybrid approach:

- **CSS plus IntersectionObserver** for reveals, counters, line draws, and marquees. This keeps the JavaScript cost low and avoids shipping a full animation library for simple fades.
- **Framer Motion** only where exit animations, focus management, and presence are needed: modals, mobile menu, accordion, and optional page transitions. The knowledge base already names Framer Motion as the animation library, so adding it is consistent.
- If the performance budget is tight, the same behavior can be built with CSS classes and a small mount/unmount state machine. Framer Motion is the faster, safer path for accessible exit animations.

Add `framer-motion` to `package.json` only when implementation starts. Measure the bundle before and after.

### 7.2 New files

```
lib/motion.ts                       shared tokens and variants
components/motion/reveal.tsx        IntersectionObserver reveal wrapper
components/motion/stagger.tsx       stagger group and item
components/motion/count-up.tsx      animated metric
components/motion/line-draw.tsx     SVG path and CSS line draw
components/motion/pausable-marquee.tsx  marquee with pause control
components/motion/accordion.tsx     accessible FAQ accordion
components/motion/modal.tsx         shared modal shell with focus trap
hooks/use-in-view.ts                reusable observer
hooks/use-reduced-motion.ts         media query hook
hooks/use-scroll-progress.ts        optional route/blog progress
app/template.tsx                    optional page fade
```

### 7.3 `lib/motion.ts`

```ts
export const MOTION = {
  instant: 0.1,
  fast: 0.15,
  base: 0.25,
  reveal: 0.4,
  image: 0.7,
  counter: 1.2,
  routeDraw: 1.4,
  stagger: 0.06,
  staggerDense: 0.04,
  staggerCards: 0.08,
  revealY: 16,
  revealYSmall: 8,
  modalScale: 0.96,
  modalY: 8,
} as const;

export const EASE = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  linear: "linear",
} as const;
```

### 7.4 `Reveal` contract

```tsx
<Reveal as="div" delay={0.06} y={16} once>
  <SectionHeading ... />
</Reveal>
```

- Applies `opacity: 0` and `transform: translateY(var(--reveal-y))` only when JavaScript is available and motion is allowed.
- Adds `is-visible` when the element enters the viewport.
- Uses `transition: opacity 400ms var(--ease-out), transform 400ms var(--ease-out)`.
- `transition-delay` is set with a CSS variable.
- Removes `will-change` after the transition ends.
- Does not use `visibility: hidden` or `display: none`; content remains accessible.
- Includes a `<noscript>` fallback in `app/layout.tsx` that forces all `[data-reveal]` elements visible.

### 7.5 `CountUp` contract

```tsx
<CountUp value={98} suffix="%" duration={1.2} />
```

- Starts when 40% visible.
- Uses `requestAnimationFrame` and an ease-out cubic.
- Renders the final value immediately on the server.
- Uses `tabular-nums` and a reserved width.
- Marks the animated number `aria-hidden` and provides the final value in a visually hidden span.
- If reduced motion is active, renders the final value with no animation.

### 7.6 `PausableMarquee` contract

- Accepts `items`, `speedSeconds`, `variant`, and `label`.
- Renders two identical tracks; the second is `aria-hidden`.
- Pauses on mouse enter, focus within, and touch start.
- Exposes a visible pause/play button with `aria-pressed` and an accessible label.
- In reduced motion, renders a static horizontally scrollable row with snap points and no duplicate track.
- Does not use a `role="marquee"` because that role does not exist. Use `aria-label` on the container and `aria-live="off"`.

### 7.7 `Modal` contract

- Props: `open`, `onClose`, `labelledBy`, `children`, `size`.
- Uses `AnimatePresence` for exit.
- Focus trap, Escape handling, body scroll lock, focus restore.
- Backdrop click closes.
- Reduced motion uses opacity only.
- Keeps the current visual design, minus backdrop blur.

### 7.8 CSS additions

Add to `app/globals.css`:

```css
:root {
  --motion-fast: 150ms;
  --motion-base: 250ms;
  --motion-reveal: 400ms;
  --motion-image: 700ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}

[data-reveal] {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: no-preference) {
  [data-reveal][data-reveal-ready="true"] {
    opacity: 0;
    transform: translateY(var(--reveal-y, 16px));
    transition:
      opacity var(--motion-reveal) var(--ease-out),
      transform var(--motion-reveal) var(--ease-out);
    transition-delay: var(--reveal-delay, 0ms);
  }

  [data-reveal][data-reveal-ready="true"].is-visible {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal],
  [data-reveal].is-visible {
    opacity: 1 !important;
    transform: none !important;
    transition: opacity 150ms linear !important;
  }
}
```

Refine the existing global reduced-motion block so it does not kill functional transitions such as focus rings. Keep the universal fallback for CSS animations, but let the explicit reduced-motion rules above handle reveals.

### 7.9 Tailwind cleanup

- Either install and configure `tailwindcss-animate` or remove every `animate-in`, `fade-in`, `zoom-in-95`, and `slide-in-from-top-2` class. The plan recommends removing them in favor of the shared motion primitives so the behavior is controlled in one place.
- Replace `duration-400` with `duration-300` or `duration-500`.
- Replace `scale-108` with `scale-105`.
- Replace `w-6.5`, `h-6.5`, `sm:w-13`, `sm:h-13`, and `p-5.5` with valid spacing values or arbitrary values if the design truly needs them.
- Replace `transition-all` on cards and header with explicit property lists to avoid accidental layout animation.

### 7.10 Client/server boundaries

- Keep `app/page.tsx` and inner page files as server components.
- Add `"use client"` only to motion wrappers and interactive sections.
- A server section can wrap its content in a client `Reveal` component; the content remains server-rendered.
- Lazy-load the quote modal, tracking modal, and mobile menu with `next/dynamic` if the initial JS budget needs it.
- Do not turn the whole page into a client component to add scroll reveals.

---

## 8. Accessibility and reduced motion

### 8.1 Requirements

- WCAG 2.2.2: any moving content that starts automatically and lasts more than five seconds must have a pause, stop, or hide mechanism. This applies to the hero video, trust marquee, services marquee, and testimonial marquee.
- WCAG 2.3.3: no motion animation triggered by interaction unless it is essential. Hover lifts and small arrow nudges are acceptable; large parallax or zoom is not.
- WCAG 2.4.7: visible focus. Do not animate focus rings away.
- WCAG 1.4.13: hover and focus content must be dismissible, hoverable, and persistent. The services dropdown must remain open while the pointer moves into it.
- WCAG 2.2.1: no time limits on form steps or animations that block content.

### 8.2 Focus management

- Modals: trap focus, set initial focus, restore focus to the trigger on close.
- Mobile menu: same.
- Services dropdown: arrow-key navigation, Escape closes, focus returns to the trigger.
- Accordion: Enter or Space toggles; focus stays on the trigger.
- Marquee pause buttons: visible focus ring, `aria-pressed` state.
- Service cards: the whole card is a link; focus-visible triggers the expanded state.

### 8.3 Screen readers

- Counters: final value in a visually hidden span; animated number `aria-hidden`.
- Marquees: `aria-live="off"`; duplicate track `aria-hidden`.
- Status dots: decorative, `aria-hidden`.
- Timeline: ordered list semantics; event status conveyed in text, not color alone.
- Form errors: `role="alert"` and linked with `aria-describedby`.
- Success: `role="status"`.

### 8.4 Reduced motion implementation

- Use the CSS media query for CSS-only motion.
- Use `useReducedMotion` or a `matchMedia` hook for JavaScript-driven counters, line draws, and scroll progress.
- Test with the OS setting enabled, not just a CSS class.
- Do not rely on the global `0.01ms` override alone.

---

## 9. Performance plan

### 9.1 Budgets

| Metric | Target |
|---|---|
| Animation frame rate | 60fps on mid-tier mobile for transform and opacity animations |
| Added JS for motion | Under 15KB gzip if CSS-only; under 45KB gzip if Framer Motion is added |
| LCP | Under 2.5s on mobile |
| CLS | Under 0.1 |
| INP | Under 200ms |
| Hero video | Poster under 200KB; video compressed and optionally served at 720p on mobile |
| Simultaneous animations | No more than 8 transform/opacity animations at once |

### 9.2 Rules

- Animate `transform` and `opacity` only. Avoid `width`, `height`, `top`, `left`, `margin`, and `filter`.
- The service card flex expansion is the one layout animation. Keep it desktop-only and test on low-end hardware. If it janks, replace it with a transform-based width change or a grid template animation.
- Do not animate `backdrop-filter`. Remove backdrop blur from modals and header.
- Use `will-change` only on elements that are about to animate; remove it after.
- Pause the hero video when offscreen.
- Do not animate below-fold sections until they enter the viewport.
- Use `next/image` with explicit sizes; already done.
- Lazy-load the modals and mobile menu if bundle size becomes a problem.
- Avoid animating large background images continuously. One settle is enough.
- Keep the marquee tracks duplicated only once; do not render four copies of a long list.
- Test with CPU throttling 4x and network throttling Fast 3G.

### 9.3 CLS protection

- Reserve width for counters with `tabular-nums` and `min-width`.
- Do not animate font size or line height.
- Do not animate elements that change document height.
- Accordion height animation must use `grid-template-rows` or a measured max-height, not a jump.
- Modals must not shift the page behind them. Use scroll lock and a fixed overlay.

---

## 10. QA matrix

### 10.1 Viewports

- 375 x 812
- 390 x 844
- 768 x 1024
- 1024 x 768
- 1280 x 800
- 1440 x 900

### 10.2 Browsers

- Chrome desktop and Android
- Safari macOS and iOS
- Firefox desktop
- Edge desktop

### 10.3 States to test

- Reduced motion on and off
- Keyboard only
- Screen reader on the quote form, tracking modal, and FAQ
- Hero video paused, playing, and offscreen
- Marquees hovered, focused, paused, and reduced motion
- Services dropdown opened by mouse and keyboard
- Mobile menu opened, closed, Escape, focus restore
- Quote modal opened from header, hero, footer, mobile bar, and `?quote=open`
- Tracking modal opened from hero, tracking section, footer, and `?track=open&id=...`
- Quote form success, error, and retry
- Newsletter success and error
- Contact form success
- FAQ open and close
- Service card hover and focus
- Route change with page transition enabled and disabled

### 10.4 Acceptance criteria

- No animation runs more than once per element on scroll.
- No horizontal scrollbar at any tested width.
- No layout shift from counters or accordions.
- All continuous motion can be paused.
- All motion is disabled or reduced under `prefers-reduced-motion`.
- Every interactive element has a visible focus state.
- Modals trap and restore focus.
- The hero video does not play when reduced motion is enabled.
- The site remains usable with JavaScript disabled; content is visible even if reveals do not run.
- Lighthouse mobile performance remains 90 or higher after the motion pass.

---

## 11. Suggested implementation order

### Phase 0 — Foundation

1. Add motion tokens to `lib/motion.ts`.
2. Build `Reveal`, `Stagger`, `CountUp`, `LineDraw`, and `useInView`.
3. Build `PausableMarquee` and the pause control.
4. Refine the global reduced-motion CSS.
5. Remove dead `animate-in` classes or install the plugin. Prefer removal.
6. Fix invalid Tailwind motion utilities.
7. Remove backdrop blur from surfaces that will animate.

### Phase 1 — Global shell

1. Header entrance and scroll transition.
2. Services dropdown.
3. Mobile menu with focus trap and exit.
4. Footer reveals and newsletter feedback.
5. Floating elements entrance and modal-aware hiding.
6. Shared modal shell; migrate quote and tracking modals.
7. PageHeader entrance.

### Phase 2 — Home above the fold

1. Hero load timeline.
2. Hero video pause control and reduced-motion poster.
3. Trust bar.
4. Services marquee.

### Phase 3 — Home core

1. About image reveal and counters.
2. Services cards.
3. Why choose us.
4. How it works.

### Phase 4 — Home conversion and missing sections

1. Tracking CTA.
2. Testimonials and marquee pause.
3. Industries.
4. Fleet and global reach.
5. Insights.
6. Final CTA.

### Phase 5 — Inner pages

1. About.
2. Services overview.
3. Service detail and FAQ accordion.
4. Industries.
5. Contact.
6. Privacy and terms.
7. Styleguide.
8. Tracking, quote, blog, and 404 when those pages are built.

### Phase 6 — QA and polish

1. Reduced-motion pass.
2. Keyboard and screen-reader pass.
3. Performance profiling and bundle check.
4. Cross-browser testing.
5. Final timing adjustment. Remove any animation that does not earn its place.

---

## 12. Risks and decisions needed

| Decision | Recommendation |
|---|---|
| Framer Motion or CSS-only | Hybrid. Framer Motion for modals, mobile menu, and accordion; CSS/IntersectionObserver for reveals, counters, and line draws. |
| Hero video pause control | Add a small control. It is required for accessibility and does not hurt the design if kept minimal. |
| Marquee pause controls | Add visible pause/play buttons to all three marquees. This is the cleanest accessibility solution. |
| Service card flex expansion | Keep on desktop, remove animated typography, test on low-end devices. Replace with transform if it janks. |
| Backdrop blur | Remove. The knowledge base forbids glassmorphism, and it is expensive on mobile. |
| Missing home sections | Build them with the planned motion from the start rather than retrofitting. |
| Missing inner pages | The animation plan is ready, but implementation depends on content and page structure. |
| Page transitions | Optional. Add only if they do not delay content or cause scroll jumps. |
| Counters | Use only for real metrics. Do not animate years, phone numbers, or tracking IDs. |

---

## 13. Section quick reference

| Section | Primary motion | Trigger | Reduced motion |
|---|---|---|---|
| Header | Fade-down; scroll color transition; dropdown fade/scale | Mount, scroll, hover | Instant color change |
| Mobile menu | Panel fade/slide; link stagger | Open | Fade only |
| Footer | Column stagger reveal | In view | Instant |
| Floating elements | Fade/scale entrance; sticky bar slide-up | Mount | Fade only |
| Quote modal | Backdrop fade; dialog scale/rise; success crossfade | Open, submit | Fade only |
| Tracking modal | Result fade; timeline draw and stagger | Lookup | Static timeline |
| PageHeader | Breadcrumb fade; H1 mask reveal | Mount | Instant |
| Hero | Timed load sequence; video fade; quote card rise | Mount | Poster only |
| Trust bar | Logo stagger; marquee | In view | Static row |
| Services marquee | Band fade; ticker | In view | Static row |
| About | Image wipe; stat card rise; counters | In view | Static values |
| Services | Card stagger; flex expansion; image zoom | In view, hover | No expansion |
| Why choose us | Card stagger; icon scale; hover lift | In view, hover | Color only |
| How it works | Line draw; node stagger; photo wipe | In view | Static line |
| Tracking CTA | Background settle; form rise | In view | Static background |
| Testimonials | Marquee; card hover lift | In view, hover | Static scroll row |
| Industries | Card stagger; image settle; hover zoom | In view, hover | No zoom |
| Fleet and global reach | Photo wipe; route draw; counters | In view | Static route |
| Insights | Card stagger; image settle | In view | No zoom |
| Final CTA | Block rise; photo wipe | In view | Instant |
| About page | Story wipe; counters; timeline draw | In view | Static |
| Services overview | Card stagger; image zoom | In view, hover | Color only |
| Service detail | Image wipe; feature stagger; FAQ accordion | In view, click | Instant accordion |
| Industries page | Panel stagger; feature stagger; CTA slide | In view | Instant |
| Contact | Info stagger; form rise; success crossfade | In view, submit | Fade only |
| Privacy and terms | Block stagger | In view | Instant |
| Styleguide | Group stagger | In view | Instant |
| Tracking page | Result fade; route draw; checkpoint stagger | Lookup | Static result |
| Quote page | Step slide; progress bar; summary stagger | Step change | Crossfade only |
| Blog index | Card stagger; image settle | In view | No zoom |
| Blog post | Hero wipe; first-viewport paragraph stagger; reading progress | Mount, scroll | Static |
| 404 | Fade and rise | Mount | Instant |

---

## 14. Definition of done for the motion pass

- [ ] Every section in this document has an implemented entrance, interaction, and reduced-motion state.
- [ ] No dead animation utility classes remain.
- [ ] No invalid Tailwind motion classes remain.
- [ ] No `animate-pulse` remains on status dots.
- [ ] Every continuous animation has a visible pause control.
- [ ] The hero video respects reduced motion and pauses offscreen.
- [ ] Counters fire once at 40% visibility and do not shift layout.
- [ ] Modals and the mobile menu trap and restore focus and animate out.
- [ ] The FAQ is an accessible accordion.
- [ ] `prefers-reduced-motion` is verified on every page.
- [ ] The site is fully usable with keyboard only.
- [ ] No horizontal scroll at 375, 768, 1024, or 1440px.
- [ ] Lighthouse mobile performance is 90 or higher.
- [ ] The motion pass adds no layout shift.
- [ ] The site still looks calm, precise, and free of attention-seeking effects.
