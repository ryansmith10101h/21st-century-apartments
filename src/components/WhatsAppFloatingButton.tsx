'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { generateWhatsAppGeneralLink } from '@/lib/data/business-config';

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40 flex items-end flex-col gap-2">
      {/* Tooltip on desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#12171D]/95 border border-[#C5A880]/40 text-gray-200 text-xs py-2 px-3.5 rounded-2xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>VIP Concierge Online • Lagos</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-white ml-1"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={generateWhatsAppGeneralLink('Floating Button Inquiry')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with 21st Century Concierge on WhatsApp"
        className="w-13 h-13 rounded-full bg-[#182028] border-2 border-[#C5A880] text-emerald-400 flex items-center justify-center shadow-2xl hover:scale-110 hover:border-emerald-400 transition-all duration-300 group"
      >
        <MessageCircle className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </a>
    </div>
  );
}
