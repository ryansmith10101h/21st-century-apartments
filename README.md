# 21ST CENTURY APARTMENTS — Lagos, Nigeria

> **Stay Above Ordinary.**  
> High-specification short-term serviced apartments designed for modern Lagos living across Eko Atlantic Boulevard, Victoria Island, Lekki Phase 1, and Ikeja GRA.

---

## 🌟 Overview

21st Century Apartments is a commercial-grade, production-ready web application built for a premier Nigerian luxury hospitality brand. Engineered specifically for the Nigerian business context, the platform delivers an architectural, editorial experience with instant booking calculations, WhatsApp concierge integration, ₦ (Naira) currency formatting, multi-office operations desks, verified guest reviews, and a non-technical staff CMS.

### Core Business Specifications
- **Brand Descriptor:** 21st Century Apartments in | Ikeja | Lekki | Eko Atlantic | Lagos
- **Headquarters:** Eko Atlantic Boulevard, Victoria Island / Eti-Osa, Lagos, Nigeria
- **Direct Phone:** `+234 817 611 5993`
- **WhatsApp Concierge:** `+234 817 611 5993`
- **Official Email:** `reservations@21stcenturyapartments.ng`

---

## 🏗️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Runtime & React:** React 19, TypeScript 5
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database & Auth:** [Supabase](https://supabase.com/) PostgreSQL + Row Level Security (with resilient in-memory fallback for offline/preview environments)
- **Deployment:** [Vercel](https://vercel.com/) Ready
- **SEO & Structured Data:** Semantic HTML5, Schema.org `LodgingBusiness`, OpenGraph, Twitter Cards, dynamic `sitemap.xml`, and `robots.txt`

---

## 🚀 Key Features

### 1. Architectural Editorial Design
- Custom luxury aesthetic with midnight charcoal `#080B0E`, refined bronze-gold `#C5A880`, and warm ivory typography.
- Zero generic boilerplate: strictly angular, intentional lines, high-contrast photography, and subtle micro-interactions.
- Full compliance with `prefers-reduced-motion` for accessibility.

### 2. Nigerian Hospitality UX
- **Live ₦ (Naira) Pricing & Instant Quoting:** Transparent calculation of nightly rates, refundable caution deposits, sanitization fees, and optional add-ons (VIP MMIA Airport Chauffeur, Private In-House Chef).
- **Direct WhatsApp Concierge:** Pre-populated, formatted WhatsApp deep links with apartment title, check-in/out dates, guest count, and calculated totals for Nigerian travelers who prefer conversational booking.
- **Physical Operations Footprint:** Dedicated operations cards and direct navigation for 4 strategic Lagos hubs (Eko Atlantic Flagship, VI Walter Carrington Desk, Lekki Admiralty Desk, Ikeja GRA Isaac John Desk).
- **One-Tap Mobile Actions:** Floating VIP concierge button and sticky mobile navigation (`Call Desk`, `WhatsApp`, `Directions`, `Check Availability`).

### 3. Comprehensive Data & Admin CMS
- **Protected Operations Portal:** `/admin` dashboard for reservation management, availability toggles, inline price overrides, gallery additions, and customer enquiries.
- **Dual-Mode Persistence:** Supabase PostgreSQL with RLS policies, coupled with robust in-memory fallbacks ensuring zero 500 crashes even before database keys are provisioned.

---

## 📁 Project Structure

```
├── public/                 # Static assets & brand media
├── src/
│   ├── app/
│   │   ├── about/          # Corporate story, infrastructure, & 4 Lagos hubs
│   │   ├── admin/          # Protected CMS dashboard & login portal
│   │   ├── api/
│   │   │   ├── admin/      # Secure mutations (pricing, availability, gallery)
│   │   │   ├── bookings/   # Availability request handling
│   │   │   └── enquiries/  # Contact & concierge dispatch
│   │   ├── booking/        # Multi-step checkout & reservation confirmation
│   │   ├── contact/        # Direct enquiry form & location cards
│   │   ├── experience/     # Dedicated amenities, airport protocol, chef service
│   │   ├── properties/     # Filterable residences catalog ([slug] detail views)
│   │   ├── globals.css     # Luxury theme variables & accessibility overrides
│   │   ├── layout.tsx      # Root layout, fonts, & schema.org JSON-LD
│   │   ├── page.tsx        # Editorial 9-section homepage
│   │   ├── robots.ts       # SEO crawler rules
│   │   └── sitemap.ts      # Automated sitemap generator
│   ├── components/         # Reusable modular components
│   └── lib/
│       ├── data/           # Business constants, properties data, & store
│       ├── supabase/       # PostgreSQL schema & SSR client
│       └── types/          # Strict TypeScript interfaces
└── .env.example            # Environment variable template
```

---

## 🛠️ Getting Started

### 1. Installation
```bash
git clone https://github.com/your-username/21st-century-apartments.git
cd 21st-century-apartments
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project credentials (optional for initial local development, as the in-memory fallback will automatically activate).

### 3. Database Setup (Supabase)
Run the migration script provided in [`src/lib/supabase/schema.sql`](file:///c:/Users/user/Documents/21ST%20CENTURY/src/lib/supabase/schema.sql) in your Supabase SQL Editor.

### 4. Running Locally
```bash
npm run dev
```
Visit `http://localhost:3000` to preview the site.

---

## 🔒 Admin CMS Access
- **URL:** `/admin/login`
- **Default Email:** `admin@21stcenturyapartments.ng`
- **Default Password:** `LagosLuxury2026!`

---

## 🚢 Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Configure Environment Variables from `.env.local` in the Vercel dashboard.
4. Deploy! Builds pass with zero warnings or errors.
