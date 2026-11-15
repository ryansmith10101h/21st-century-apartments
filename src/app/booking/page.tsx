'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Mail, 
  User, 
  MessageCircle, 
  Lock
} from 'lucide-react';
import { INITIAL_PROPERTIES } from '@/lib/data/properties';
import { Property } from '@/lib/types';
import { formatNaira, BUSINESS_CONFIG, generateWhatsAppBookingLink } from '@/lib/data/business-config';

function BookingFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const propertyIdParam = searchParams.get('propertyId');
  const slugParam = searchParams.get('slug');
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const guestsParam = searchParams.get('guests');
  const airportParam = searchParams.get('airportPickup') === 'true';
  const chefParam = searchParams.get('privateChef') === 'true';

  // Selected Property
  const [selectedProperty, setSelectedProperty] = useState<Property>(
    INITIAL_PROPERTIES.find((p) => p.id === propertyIdParam || p.slug === slugParam) || INITIAL_PROPERTIES[0]
  );

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(() => checkInParam || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(() => checkOutParam || new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]);
  const [guestCount, setGuestCount] = useState(Number(guestsParam) || 2);
  const [airportPickup, setAirportPickup] = useState(airportParam);
  const [privateChef, setPrivateChef] = useState(chefParam);
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'paystack' | 'cash_on_arrival'>('bank_transfer');
  const [specialRequests, setSpecialRequests] = useState('');

  // States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate pricing
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const subtotal = nights * selectedProperty.pricePerNight;
  const cautionDeposit = selectedProperty.cautionDeposit;
  const serviceFee = selectedProperty.cleaningFee;
  const airportFee = airportPickup ? 85000 : 0;
  const chefFee = privateChef ? nights * 50000 : 0;
  const totalAmount = subtotal + cautionDeposit + serviceFee + airportFee + chefFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !phone) {
      setErrorMsg('Please complete all required contact fields.');
      return;
    }

    if (phone.length < 10) {
      setErrorMsg('Please enter a valid phone number (e.g. +234 803 000 0000).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: selectedProperty.id,
          propertyTitle: selectedProperty.title,
          propertySlug: selectedProperty.slug,
          guestName: fullName,
          guestEmail: email,
          guestPhone: phone,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          totalNights: nights,
          guestCount,
          pricePerNight: selectedProperty.pricePerNight,
          subtotal,
          cautionDeposit,
          serviceFee,
          totalAmount,
          paymentMethod,
          specialRequests,
          airportPickupRequired: airportPickup,
          privateChefRequired: privateChef,
        }),
      });

      const data = await res.json();

      if (data.success && data.booking) {
        // Redirect to confirmation page with booking ID
        router.push(
          `/booking/confirmation?id=${data.booking.id}&property=${encodeURIComponent(selectedProperty.title)}&total=${totalAmount}&payment=${paymentMethod}`
        );
      } else {
        setErrorMsg(data.error || 'Failed to submit reservation. Please try again or reserve via WhatsApp.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Please try again or use the WhatsApp reservation button below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-[#080B0E] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 space-y-2">
          <Link href="/properties" className="inline-flex items-center gap-1.5 text-xs text-[#DFC7A5] font-semibold uppercase tracking-wider hover:underline">
            ← Back to Residences
          </Link>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Reserve Your Luxury Residence
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Guaranteed 24/7 Power • Starlink 300Mbps • Armed Security Clearance • Concierge Desk
          </p>
        </div>

        {errorMsg && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left 2 Columns: Guest Details & Payment Preferences */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Guest Contact Information */}
            <div className="p-6 rounded-3xl bg-[#12171D] border border-white/10 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 text-white">
                <div className="w-7 h-7 rounded-full bg-[#182028] border border-[#C5A880] text-[#DFC7A5] flex items-center justify-center text-xs font-bold font-mono">
                  1
                </div>
                <h2 className="text-base font-serif font-bold">Primary Guest Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Full Legal Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Babatunde Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#182028] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Email Address (For Confirmation) *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#182028] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Phone Number / WhatsApp *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#182028] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Stay Itinerary & Add-ons */}
            <div className="p-6 rounded-3xl bg-[#12171D] border border-white/10 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 text-white">
                <div className="w-7 h-7 rounded-full bg-[#182028] border border-[#C5A880] text-[#DFC7A5] flex items-center justify-center text-xs font-bold font-mono">
                  2
                </div>
                <h2 className="text-base font-serif font-bold">Stay Schedule & Add-on Services</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Select Residence</span>
                  </label>
                  <select
                    value={selectedProperty.id}
                    onChange={(e) => {
                      const p = INITIAL_PROPERTIES.find((item) => item.id === e.target.value);
                      if (p) setSelectedProperty(p);
                    }}
                    className="w-full bg-[#182028] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    {INITIAL_PROPERTIES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.neighborhood}) — {formatNaira(p.pricePerNight)}/night
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#182028] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#182028] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">Total Guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#182028] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    {[...Array(selectedProperty.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Guest{i > 0 ? 's' : ''} (Maximum {selectedProperty.maxGuests})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* VIP Addons */}
              <div className="pt-3 border-t border-white/5 space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#182028] border border-white/5 cursor-pointer hover:border-[#C5A880]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={airportPickup}
                      onChange={(e) => setAirportPickup(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C5A880] focus:ring-[#C5A880] bg-[#12171D] border-white/20"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">MMIA Airport VIP Protocol & Chauffeur</p>
                      <p className="text-[11px] text-gray-400">Tarmac meet, luggage handling, and direct luxury transit to residence</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#DFC7A5] font-mono font-bold">+₦85,000</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#182028] border border-white/5 cursor-pointer hover:border-[#C5A880]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={privateChef}
                      onChange={(e) => setPrivateChef(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C5A880] focus:ring-[#C5A880] bg-[#12171D] border-white/20"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Private In-House Resident Chef</p>
                      <p className="text-[11px] text-gray-400">Authentic gourmet Nigerian & continental meal service</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#DFC7A5] font-mono font-bold">+₦50,000/day</span>
                </label>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">Special Requests / Flight Details</label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Flight arrival time at MMIA, dietary preferences, early check-in request..."
                  className="w-full bg-[#182028] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="p-6 rounded-3xl bg-[#12171D] border border-white/10 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 text-white">
                <div className="w-7 h-7 rounded-full bg-[#182028] border border-[#C5A880] text-[#DFC7A5] flex items-center justify-center text-xs font-bold font-mono">
                  3
                </div>
                <h2 className="text-base font-serif font-bold">Payment Method & Settlement</h2>
              </div>

              <div className="space-y-3">
                {/* Bank Transfer Option */}
                <label
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-[#182028] border-[#C5A880] shadow-lg'
                      : 'bg-[#182028]/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="mt-1 w-4 h-4 text-[#C5A880] focus:ring-[#C5A880]"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Direct Nigerian Bank Transfer (Zenith / GTBank)
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#C5A880]/20 text-[#DFC7A5]">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      Transfer directly to our verified corporate bank account. Instant reservation hold generated upon submission.
                    </p>

                    {paymentMethod === 'bank_transfer' && (
                      <div className="p-3 rounded-xl bg-[#080B0E] border border-white/10 text-xs text-gray-300 space-y-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Zenith Bank PLC:</span>
                          <span className="font-mono text-white font-bold">1018942100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">GTBank:</span>
                          <span className="font-mono text-white font-bold">0238491210</span>
                        </div>
                        <div className="flex justify-between border-t border-white/5 pt-1.5">
                          <span className="text-gray-400">Account Name:</span>
                          <span className="text-[#DFC7A5] font-semibold">{BUSINESS_CONFIG.legalName}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Paystack Online Payment Option */}
                <label
                  onClick={() => setPaymentMethod('paystack')}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'paystack'
                      ? 'bg-[#182028] border-[#C5A880] shadow-lg'
                      : 'bg-[#182028]/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'paystack'}
                    onChange={() => setPaymentMethod('paystack')}
                    className="mt-1 w-4 h-4 text-[#C5A880] focus:ring-[#C5A880]"
                  />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Paystack Card & Online Payment (Mastercard / Visa / Verve)
                    </span>
                    <p className="text-xs text-gray-400">
                      Instant card billing with 3D Secure verification. Supports Nigerian and International cards.
                    </p>
                  </div>
                </label>

                {/* Cash On Arrival with deposit */}
                <label
                  onClick={() => setPaymentMethod('cash_on_arrival')}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_arrival'
                      ? 'bg-[#182028] border-[#C5A880] shadow-lg'
                      : 'bg-[#182028]/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cash_on_arrival'}
                    onChange={() => setPaymentMethod('cash_on_arrival')}
                    className="mt-1 w-4 h-4 text-[#C5A880] focus:ring-[#C5A880]"
                  />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Corporate Billing / Check-In Settlement
                    </span>
                    <p className="text-xs text-gray-400">
                      Requires advance reservation confirmation through our Ikoyi Concierge desk.
                    </p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Instant Action */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              
              <div className="p-6 rounded-3xl bg-[#12171D] border border-[#C5A880]/40 shadow-2xl space-y-6">
                
                {/* Residence Preview */}
                <div className="flex gap-3 pb-4 border-b border-white/10">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-gray-900 shrink-0">
                    <Image
                      src={selectedProperty.images[0]}
                      alt={selectedProperty.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-serif line-clamp-1">
                      {selectedProperty.title}
                    </h3>
                    <p className="text-[11px] text-[#DFC7A5]">{selectedProperty.neighborhood}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{nights} Night{nights > 1 ? 's' : ''} • {guestCount} Guests</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>{formatNaira(selectedProperty.pricePerNight)} × {nights} nights</span>
                    <span className="font-mono">{formatNaira(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-gray-400">
                    <span>Caution Deposit (Refundable)</span>
                    <span className="font-mono">{formatNaira(cautionDeposit)}</span>
                  </div>

                  <div className="flex justify-between text-gray-400">
                    <span>Cleaning & Sanitization</span>
                    <span className="font-mono">{formatNaira(serviceFee)}</span>
                  </div>

                  {airportPickup && (
                    <div className="flex justify-between text-[#DFC7A5]">
                      <span>MMIA Airport Chauffeur</span>
                      <span className="font-mono">{formatNaira(airportFee)}</span>
                    </div>
                  )}

                  {privateChef && (
                    <div className="flex justify-between text-[#DFC7A5]">
                      <span>Private Chef ({nights} days)</span>
                      <span className="font-mono">{formatNaira(chefFee)}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 flex justify-between items-baseline text-white">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#DFC7A5]">Total Payable</span>
                      <p className="text-[10px] text-gray-400">Includes VAT & Redundant Power</p>
                    </div>
                    <div className="text-2xl font-bold font-serif text-white">
                      {formatNaira(totalAmount)}
                    </div>
                  </div>
                </div>

                {/* Submit Reservation Button */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#DFCAAB] via-[#C5A880] to-[#A6875C] hover:opacity-95 text-[#080B0E] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:shadow-[#C5A880]/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Generating Reservation...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Confirm Reservation</span>
                      </>
                    )}
                  </button>

                  <a
                    href={generateWhatsAppBookingLink(
                      selectedProperty.title,
                      checkIn,
                      checkOut,
                      guestCount,
                      formatNaira(totalAmount)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#182028] hover:bg-[#202b36] border border-emerald-500/40 text-emerald-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant WhatsApp Verification</span>
                  </a>
                </div>

                {/* Guarantee */}
                <div className="pt-2 text-center text-[10px] text-gray-400 space-y-1">
                  <p className="flex items-center justify-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>24/7 Power & High-Speed Starlink Guaranteed</span>
                  </p>
                  <p>Full caution deposit refunded within 24h of check-out</p>
                </div>

              </div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-[#DFC7A5]">Loading Reservation Portal...</div>}>
      <BookingFormContent />
    </Suspense>
  );
}
