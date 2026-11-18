import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/data/business-config';

export const metadata: Metadata = {
  title: 'Privacy Policy | 21st Century Apartments Lagos',
  description: 'Privacy Policy for 21ST CENTURY APARTMENTS. Our commitment to guest confidentiality, personal data security, and communication protocols.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-[#080B0E] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-[#DFC7A5] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#DFC7A5]">Privacy Policy</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Corporate Governance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Privacy Policy & Data Discretion
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light">
            Effective Date: January 1, 2026 • 21st Century Serviced Apartments & Hospitality Ltd
          </p>
        </header>

        {/* Policy Content */}
        <div className="space-y-10 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              1. Our Discretion Commitment
            </h2>
            <p>
              At {BUSINESS_CONFIG.name}, we host international executives, diplomatic personnel, and discerning private travelers. Confidentiality and discretion are foundational pillars of our hospitality service. We do not sell, rent, monetize, or publicly disclose the personal identities, travel schedules, or booking history of our guests under any circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              2. Information We Collect
            </h2>
            <p>
              When you submit an availability request, complete a reservation, or communicate with our concierge desk, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li>Full name, official telephone number, and email address.</li>
              <li>Requested check-in/check-out dates, guest counts, and special accommodations (e.g. airport protocol, dietary requests).</li>
              <li>Government-issued identification details required exclusively for estate gatehouse access clearance.</li>
              <li>Billing and corporate invoicing information for bank wire and authorized payment confirmation.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              3. Purpose of Processing
            </h2>
            <p>
              Your information is utilized solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li>Process, confirm, and manage your accommodation request.</li>
              <li>Transmit pre-arrival compound access security codes via WhatsApp or SMS.</li>
              <li>Coordinate authorized VIP airport chauffeur pickups and concierge services.</li>
              <li>Comply with Nigerian hospitality industry regulations and taxation standards.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              4. Data Retention & Erasure
            </h2>
            <p>
              Guest records are retained only for the duration required for accounting compliance and security verification. Guests may request full erasure of their contact records from our direct reservation systems following the conclusion of their stay by contacting <strong className="text-white">{BUSINESS_CONFIG.emailPrimary}</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              5. Contact Our Privacy Officer
            </h2>
            <p>
              If you have any questions regarding this privacy policy or our data handling standards, please contact our legal desk at <strong className="text-white">{BUSINESS_CONFIG.emailConcierge}</strong> or visit our flagship desk at {BUSINESS_CONFIG.headquarters.address}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
