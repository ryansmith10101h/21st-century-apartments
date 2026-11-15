import React from 'react';
import Link from 'next/link';
import { Home, Building2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/data/business-config';

export default function NotFound() {
  return (
    <div className="py-24 bg-[#080B0E] min-h-[80vh] flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full text-center space-y-6 p-8 sm:p-12 bg-[#0E1217] border border-[#242A35] shadow-2xl">
        <span className="font-mono text-6xl font-light text-[#C5A880] block">404</span>

        <div className="space-y-2">
          <h1 className="text-2xl font-serif text-white">Apartment Not Found</h1>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            The page or residence listing you are looking for has been moved or is currently off-market.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link
            href="/properties"
            className="w-full py-3.5 px-4 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            <span>Browse All Apartments</span>
          </Link>

          <Link
            href="/"
            className="w-full py-3 px-4 bg-[#141820] text-gray-200 hover:text-white border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#C5A880]" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        <p className="text-[11px] text-gray-500 pt-2 font-mono">
          24/7 Concierge: <a href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`} className="text-[#C5A880] hover:underline">{BUSINESS_CONFIG.phonePrimary}</a>
        </p>
      </div>
    </div>
  );
}
