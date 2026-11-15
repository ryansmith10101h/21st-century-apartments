'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Building2, Phone, MessageCircle, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';
import { BUSINESS_CONFIG, formatNaira } from '@/lib/data/business-config';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id') || 'BK-2026-9812';
  const propertyTitle = searchParams.get('property') || '21st Century Luxury Penthouse';
  const totalParam = Number(searchParams.get('total')) || 650000;
  const paymentMethod = searchParams.get('payment') || 'bank_transfer';

  const [copiedZenith, setCopiedZenith] = React.useState(false);
  const [copiedGTB, setCopiedGTB] = React.useState(false);

  const copyToClipboard = (text: string, bank: 'zenith' | 'gtb') => {
    navigator.clipboard.writeText(text);
    if (bank === 'zenith') {
      setCopiedZenith(true);
      setTimeout(() => setCopiedZenith(false), 2000);
    } else {
      setCopiedGTB(true);
      setTimeout(() => setCopiedGTB(false), 2000);
    }
  };

  const whatsappReceiptUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello 21st Century Concierge,\n\nI have submitted my reservation:\n🔖 *Booking ID:* ${bookingId}\n🏛 *Property:* ${propertyTitle}\n💰 *Total:* ${formatNaira(totalParam)}\n💳 *Payment Method:* ${paymentMethod.toUpperCase()}\n\nPlease verify my reservation and gatehouse security clearance.`
  )}`;

  return (
    <div className="py-16 bg-[#080B0E] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#12171D] border border-[#C5A880]/50 shadow-2xl space-y-8 text-center">
          
          {/* Badge Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#DFC7A5] font-semibold">
              Reservation Generated
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Thank You for Choosing 21st Century
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
              Your reservation reference is <strong className="text-white font-mono">{bookingId}</strong>. Our VIP concierge team is currently processing your reservation hold for <strong className="text-white">{propertyTitle}</strong>.
            </p>
          </div>

          {/* Amount Box */}
          <div className="p-6 rounded-2xl bg-[#0A0D10] border border-white/10 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Total Payable</span>
              <p className="text-xs text-emerald-400">Includes Caution Deposit & Redundant Power</p>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#DFC7A5]">
              {formatNaira(totalParam)}
            </div>
          </div>

          {/* Bank Transfer Details */}
          <div className="p-6 rounded-2xl bg-[#182028] border border-white/10 text-left space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Building2 className="w-5 h-5 text-[#C5A880]" />
              <h3 className="text-sm font-serif font-bold">Official Bank Transfer Instructions</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Please transfer the total amount to either of our verified corporate Nigerian bank accounts using your Booking ID <strong className="text-white font-mono">({bookingId})</strong> as the payment reference:
            </p>

            <div className="space-y-3 pt-1">
              {/* Zenith Bank */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#12171D] border border-white/5">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Zenith Bank PLC</span>
                  <div className="text-sm sm:text-base font-mono font-bold text-white tracking-wider">
                    1018942100
                  </div>
                  <span className="text-[10px] text-[#DFC7A5]">{BUSINESS_CONFIG.legalName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('1018942100', 'zenith')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182028] text-xs text-gray-200 hover:text-white border border-white/10 cursor-pointer"
                >
                  {copiedZenith ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedZenith ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* GTBank */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#12171D] border border-white/5">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Guaranty Trust Bank (GTBank)</span>
                  <div className="text-sm sm:text-base font-mono font-bold text-white tracking-wider">
                    0238491210
                  </div>
                  <span className="text-[10px] text-[#DFC7A5]">{BUSINESS_CONFIG.legalName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('0238491210', 'gtb')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182028] text-xs text-gray-200 hover:text-white border border-white/10 cursor-pointer"
                >
                  {copiedGTB ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedGTB ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappReceiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#DFCAAB] via-[#C5A880] to-[#A6875C] hover:opacity-95 text-[#080B0E] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:shadow-[#C5A880]/30 transition-all text-center"
            >
              <MessageCircle className="w-4 h-4 text-[#080B0E]" />
              <span>Confirm via WhatsApp Concierge (+234)</span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#182028] text-gray-200 hover:text-white border border-white/10 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>Call Front Desk: {BUSINESS_CONFIG.phonePrimary}</span>
              </a>

              <Link
                href="/properties"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#182028] text-[#DFC7A5] hover:text-white border border-[#C5A880]/30 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Return to Residences</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Security Guarantee */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Estate security access pass and PIN will be dispatched once payment is acknowledged.</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-[#DFC7A5]">Loading Confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
