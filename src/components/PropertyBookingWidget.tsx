'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, ShieldCheck, Zap, MessageCircle, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatNaira, generateWhatsAppBookingLink } from '@/lib/data/business-config';

interface PropertyBookingWidgetProps {
  property: Property;
}

export default function PropertyBookingWidget({ property }: PropertyBookingWidgetProps) {
  const router = useRouter();

  // Dates defaults: today + 2 days, check-out today + 5 days
  const today = new Date().toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(() => new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(() => new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]);
  const [guestCount, setGuestCount] = useState(2);
  const [airportPickup, setAirportPickup] = useState(false);
  const [privateChef, setPrivateChef] = useState(false);

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const subtotal = nights * property.pricePerNight;
  const cautionDeposit = property.cautionDeposit;
  const serviceFee = property.cleaningFee;
  const airportFee = airportPickup ? 85000 : 0;
  const chefFee = privateChef ? nights * 50000 : 0;
  const grandTotal = subtotal + cautionDeposit + serviceFee + airportFee + chefFee;

  const handleProceedToBooking = () => {
    const params = new URLSearchParams({
      propertyId: property.id,
      slug: property.slug,
      checkIn,
      checkOut,
      guests: guestCount.toString(),
      airportPickup: airportPickup.toString(),
      privateChef: privateChef.toString(),
    });
    router.push(`/booking?${params.toString()}`);
  };

  const whatsappUrl = generateWhatsAppBookingLink(
    property.title,
    checkIn,
    checkOut,
    guestCount,
    formatNaira(grandTotal)
  );

  return (
    <div id="booking-section" className="bg-[#0C0E12] border border-[#242A35] p-6 sm:p-7 relative shadow-2xl">
      {/* Price Header */}
      <div className="flex items-baseline justify-between pb-5 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#DFC7A5] font-semibold font-mono">Nightly Rate</span>
          <div className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight mt-0.5">
            {formatNaira(property.pricePerNight)}
            <span className="text-xs font-normal text-gray-400 font-sans"> / night</span>
          </div>
        </div>
        <div className="text-right font-mono">
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <Zap className="w-3 h-3 fill-emerald-400" />
            <span>24/7 Power Included</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">VAT & Concierge Protocol</p>
        </div>
      </div>

      {/* Date & Guest Selectors */}
      <div className="py-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-300 flex items-center gap-1 font-mono">
              <Calendar className="w-3 h-3 text-[#C5A880]" />
              <span>Check-in (2PM)</span>
            </label>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-300 flex items-center gap-1 font-mono">
              <Calendar className="w-3 h-3 text-[#C5A880]" />
              <span>Check-out (11AM)</span>
            </label>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>

        {/* Guests Selector */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-300 flex items-center gap-1 font-mono">
            <Users className="w-3 h-3 text-[#C5A880]" />
            <span>Guests (Max {property.maxGuests})</span>
          </label>
          <select
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
          >
            {[...Array(property.maxGuests)].map((_, i) => (
              <option key={i + 1} value={i + 1} className="bg-[#0C0E12] text-white">
                {i + 1} Guest{i > 0 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* VIP Add-ons Checkboxes */}
        <div className="pt-2 space-y-2 border-t border-white/5">
          <label className="flex items-center justify-between p-2.5 bg-[#141820] border border-white/5 cursor-pointer hover:border-[#C5A880]/30 transition-colors">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={airportPickup}
                onChange={(e) => setAirportPickup(e.target.checked)}
                className="w-4 h-4 text-[#C5A880] focus:ring-[#C5A880] bg-[#12171D] border-white/20"
              />
              <span className="text-xs text-gray-200">MMIA Airport Chauffeur Protocol</span>
            </div>
            <span className="text-[11px] text-[#DFC7A5] font-mono">+₦85,000</span>
          </label>

          <label className="flex items-center justify-between p-2.5 bg-[#141820] border border-white/5 cursor-pointer hover:border-[#C5A880]/30 transition-colors">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={privateChef}
                onChange={(e) => setPrivateChef(e.target.checked)}
                className="w-4 h-4 text-[#C5A880] focus:ring-[#C5A880] bg-[#12171D] border-white/20"
              />
              <span className="text-xs text-gray-200">Private Resident Chef Service</span>
            </div>
            <span className="text-[11px] text-[#DFC7A5] font-mono">+₦50,000/day</span>
          </label>
        </div>
      </div>

      {/* Breakdown Calculation */}
      <div className="py-4 border-t border-white/10 space-y-2 text-xs text-gray-300">
        <div className="flex justify-between">
          <span>{formatNaira(property.pricePerNight)} × {nights} night{nights > 1 ? 's' : ''}</span>
          <span className="font-mono text-white">{formatNaira(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-400">
          <span className="flex items-center gap-1">
            <span>Refundable Caution Deposit</span>
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
          </span>
          <span className="font-mono">{formatNaira(cautionDeposit)}</span>
        </div>

        <div className="flex justify-between text-gray-400">
          <span>Sanitization & Housekeeping Fee</span>
          <span className="font-mono">{formatNaira(serviceFee)}</span>
        </div>

        {airportPickup && (
          <div className="flex justify-between text-[#DFC7A5]">
            <span>Airport VIP Protocol (LOS)</span>
            <span className="font-mono">{formatNaira(airportFee)}</span>
          </div>
        )}

        {privateChef && (
          <div className="flex justify-between text-[#DFC7A5]">
            <span>In-House Chef Service ({nights} days)</span>
            <span className="font-mono">{formatNaira(chefFee)}</span>
          </div>
        )}

        {/* Total */}
        <div className="pt-3 mt-3 border-t border-white/10 flex justify-between items-baseline text-white">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#DFC7A5] font-mono">Estimated Total</span>
            <p className="text-[10px] text-gray-400 font-light">(Includes Refundable Deposit)</p>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-white">
            {formatNaira(grandTotal)}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 space-y-2.5">
        <button
          onClick={handleProceedToBooking}
          className="w-full py-3.5 px-4 bg-[#C5A880] hover:bg-[#DFC7A5] text-[#080B0E] font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span>Request Dates & Invoice</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 bg-[#141820] hover:bg-[#1C222C] border border-emerald-500/40 text-emerald-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors font-mono"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Inquire via WhatsApp Concierge</span>
        </a>
      </div>

      {/* Trust Badges */}
      <div className="pt-4 text-center space-y-1">
        <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
          <span>Zero instant charge • Verified availability within 15 mins</span>
        </p>
        <p className="text-[9px] text-gray-500 font-light">
          Caution deposit fully refundable within 24 hours of checkout
        </p>
      </div>
    </div>
  );
}
