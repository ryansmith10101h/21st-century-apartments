'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar, Navigation } from 'lucide-react';
import { BUSINESS_CONFIG, GOOGLE_MAPS_DIRECTIONS_URL } from '@/lib/data/business-config';

interface MobileStickyCTAProps {
  propertySlug?: string;
  propertyTitle?: string;
}

export default function MobileStickyCTA({ propertySlug, propertyTitle }: MobileStickyCTAProps) {
  const whatsappUrl = propertyTitle
    ? `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello 21st Century Apartments, I am requesting availability for *${propertyTitle}*. Please confirm rates and dates.`)}`
    : `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello 21st Century Apartments, I would like to check short-stay apartment availability in Lagos.`)}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0D11]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2.5 shadow-2xl safe-area-bottom">
      <div className="flex items-center gap-2">
        {/* Call Now */}
        <a
          href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
          aria-label="Call 21st Century Apartments"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#141820] border border-white/10 text-gray-200 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-[#C5A880] mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">CALL</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp 21st Century Apartments"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#141820] border border-emerald-500/30 text-emerald-400 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">WHATSAPP</span>
        </a>

        {/* Directions */}
        <a
          href={GOOGLE_MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get Directions"
          className="flex-none flex flex-col items-center justify-center py-2 px-2.5 rounded-lg bg-[#141820] border border-white/10 text-gray-300 active:scale-95 transition-transform"
          title="Get Directions"
        >
          <Navigation className="w-4 h-4 text-[#DFC7A5] mb-0.5" />
          <span className="text-[9px] font-medium uppercase tracking-wider">MAP</span>
        </a>

        {/* Check Availability */}
        <Link
          href={propertySlug ? `#booking-section` : '/#availability'}
          className="flex-[1.8] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#DFCAAB] via-[#C5A880] to-[#A6875C] text-[#080B0E] font-bold text-[11px] uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span className="truncate">CHECK AVAILABILITY</span>
        </Link>
      </div>
    </div>
  );
}
