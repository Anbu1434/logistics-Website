# Implementation TODO & Client Inputs Pending

This document tracks temporary placeholders, mock handlers, and required client inputs according to Sections 9, 13, and 14 of `Logistics Website Agent Knowledge Base.md`.

## Temporary Mock Implementations
- [ ] `/app/api/quotes/route.ts`: Currently returns mock reference ID. In Step 6, replace with real MongoDB Mongoose connection (`QuoteRequest` model) and email dispatch (SMTP/Resend).
- [ ] Newsletter Form (`components/layout/footer.tsx`): Form submit currently simulates a 400ms delay. In Step 6, wire to `/api/newsletter` route and `Subscriber` model.

## Inputs Pending Client Confirmation (Section 14)
- [ ] Official brand name & corporate logo vector (currently using "Your Brand" placeholder in `/lib/site.ts`).
- [ ] Actual telephone numbers, corporate physical addresses, and operational support hours.
- [ ] Final production client partner logos for the Trust Bar (Section 7.2).
- [ ] Production photography & video assets for fleet and loading docks.

