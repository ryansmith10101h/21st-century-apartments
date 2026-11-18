import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ChevronRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/data/business-config';

export const metadata: Metadata = {
  title: 'Terms & Conditions | 21st Century Apartments Lagos',
  description: 'Terms and Conditions of stay for 21ST CENTURY APARTMENTS. Booking guidelines, security protocols, cancellation policies, and caution deposits.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="py-16 bg-[#080B0E] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-[#DFC7A5] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#DFC7A5]">Terms of Service</span>
        </nav>

        {/* Header */}
        <header className="space-y-3 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>Guest Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Terms & Conditions of Stay
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light">
            Effective Date: January 1, 2026 • 21st Century Serviced Apartments & Hospitality Ltd
          </p>
        </header>

        {/* Content */}
        <div className="space-y-10 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              1. Reservation & Confirmation Protocol
            </h2>
            <p>
              Submissions made through our availability forms or WhatsApp concierge constitute an <em>Availability Request</em>. A booking is formally confirmed only upon verification of dates, issuance of an official booking voucher by our reservations officer, and receipt of the agreed deposit or bank transfer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              2. Check-In & Check-Out Timelines
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li>Standard Check-In: <strong className="text-white">2:00 PM (14:00 WAT)</strong>. Early check-in is subject to prior availability.</li>
              <li>Standard Check-Out: <strong className="text-white">11:00 AM (11:00 WAT)</strong>. Late departures past 1:00 PM will incur a half-day fee.</li>
              <li>Valid government-issued photo identification (Passport, National ID, or Driver’s License) must be presented upon compound entry.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              3. Caution Deposit Policy
            </h2>
            <p>
              A refundable security caution deposit is mandatory for all reservations. This deposit is strictly held in escrow against property damages or smoking violations and is refunded in full via bank transfer within 24 hours following checkout inspection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              4. House Conduct & Noise Policy
            </h2>
            <p>
              To maintain the exclusive residential character of our compounds:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li>Loud commercial filming, disruptive parties, and unapproved public gatherings are strictly prohibited.</li>
              <li>Indoor smoking of cigarettes, cigars, or electronic devices is strictly prohibited. Smoking is permitted on private outdoor balconies only.</li>
              <li>Pets are permitted only in designated residences with prior written authorization.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of the Federal Republic of Nigeria, and any legal matters shall be subject to the jurisdiction of the High Court of Lagos State.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-white border-l-2 border-[#C5A880] pl-3">
              6. Contact & Legal Enquiries
            </h2>
            <p>
              For questions regarding these terms, contact {BUSINESS_CONFIG.legalName} at{' '}
              <a href={`mailto:${BUSINESS_CONFIG.emailPrimary}`} className="text-[#DFC7A5] hover:underline">
                {BUSINESS_CONFIG.emailPrimary}
              </a>{' '}
              or speak with our concierge desk at{' '}
              <a href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`} className="text-[#DFC7A5] hover:underline">
                {BUSINESS_CONFIG.phonePrimary}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
