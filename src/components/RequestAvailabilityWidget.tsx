'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, MessageCircle, ArrowRight, Clock } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatNaira, BUSINESS_CONFIG, generateWhatsAppBookingLink } from '@/lib/data/business-config';

interface RequestAvailabilityWidgetProps {
  properties: Property[];
  selectedPropertySlug?: string;
}

export default function RequestAvailabilityWidget({
  properties,
  selectedPropertySlug,
}: RequestAvailabilityWidgetProps) {
  const initialProperty = properties.find((p) => p.slug === selectedPropertySlug) || properties[0];

  const [selectedPropertyId, setSelectedPropertyId] = useState(initialProperty?.id || '');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const activeProperty = properties.find((p) => p.id === selectedPropertyId) || initialProperty;

  // Calculate estimated nights & total
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const estimatedTotal = activeProperty ? activeProperty.pricePerNight * nights : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !phone || !checkIn || !checkOut) {
      setErrorMsg('Please complete all contact and date fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: activeProperty?.id,
          propertyTitle: activeProperty?.title,
          guestName: name,
          guestEmail: email,
          guestPhone: phone,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guestCount: guests,
          apartmentType: activeProperty?.title,
          estimatedTotal,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit availability request.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. You can also contact us immediately on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappDirectUrl = activeProperty
    ? generateWhatsAppBookingLink(
        activeProperty.title,
        checkIn || 'To be specified',
        checkOut || 'To be specified',
        guests,
        formatNaira(estimatedTotal)
      )
    : `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`;

  return (
    <div id="availability" className="bg-[#0C0E12] border border-[#242A35] p-6 sm:p-10 relative overflow-hidden">
      {/* Top Banner Notice: Honest Availability */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono">
            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Direct Concierge Verification</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
            Request Availability
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            To ensure zero double-booking and preserve private guest security, our on-site team confirms real-time suite inventory and check-in clearance within 15 minutes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#141820] hover:bg-[#1B222C] border border-emerald-500/30 text-emerald-400 text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Instant WhatsApp Query</span>
          </a>
        </div>
      </div>

      {submitted ? (
        <div className="py-12 px-6 bg-[#12161E] border border-emerald-500/30 text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xl font-serif text-white">Availability Request Received</h4>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-lg mx-auto">
              Thank you, <strong className="text-white">{name}</strong>. Our reservations officer at Eko Atlantic is reviewing dates for <strong className="text-white">{activeProperty?.title}</strong> and will reach out via WhatsApp / phone ({phone}) shortly.
            </p>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#1C2430] hover:bg-[#253040] text-emerald-400 text-xs uppercase tracking-wider font-bold border border-emerald-500/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Fast-Track On WhatsApp</span>
            </a>

            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-3 bg-transparent text-gray-400 hover:text-white text-xs uppercase tracking-widest border border-white/10"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Apartment Selection */}
            <div className="space-y-1.5 lg:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                Select Apartment Residence
              </label>
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full bg-[#131720] border border-white/15 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#0C0E12] text-white">
                    {p.title} ({p.neighborhood}) — {formatNaira(p.pricePerNight)}/night
                  </option>
                ))}
              </select>
            </div>

            {/* Check-In Date */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                Check-In Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
            </div>

            {/* Check-Out Date */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                Check-Out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  required
                  className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
            </div>

            {/* Guests Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                  <option key={num} value={num} className="bg-[#0C0E12] text-white">
                    {num} Guest{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Tayo Adeleke"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. adeleke@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                Phone Number (WhatsApp Preferred)
              </label>
              <input
                type="tel"
                placeholder="e.g. +234 817 611 5993"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          {/* Special Notes & Estimates Row */}
          <div className="pt-2 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Any special requests? (Airport chauffeur, private chef, Starlink dedicated line...)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            {/* Estimated Total Card */}
            <div className="p-3 bg-[#131720] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gray-500 block">
                  Estimated Total ({nights} night{nights > 1 ? 's' : ''})
                </span>
                <span className="text-base font-serif font-bold text-white">
                  {formatNaira(estimatedTotal)}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">
                {activeProperty ? `${formatNaira(activeProperty.pricePerNight)}/nt` : ''}
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>No instant deduction. We verify dates and provide direct bank / card invoice.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C5A880] hover:bg-[#DFC7A5] text-[#080B0E] font-bold text-xs uppercase tracking-[0.18em] transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Verifying Availability...' : 'Request Availability'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
