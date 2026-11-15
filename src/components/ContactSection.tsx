'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Navigation, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG, GOOGLE_MAPS_DIRECTIONS_URL, generateWhatsAppGeneralLink } from '@/lib/data/business-config';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Short-Stay Apartment Booking');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !phone || !message) {
      setErrorMsg('Please complete all fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to deliver message.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. You can also contact us immediately on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0D11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>Reservations & Concierge Desk</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Connect with 21st Century
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Our private client desk is available 24 hours a day to facilitate apartment reservations, corporate bookings, airport protocol, and confidential property viewings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0E1217] border border-[#242A35] p-6 sm:p-8 space-y-6">
              
              {/* Flagship Address */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                  Central Address
                </span>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-base font-serif text-white">Eko Atlantic Boulevard</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Victoria Island / Eti-Osa, Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={GOOGLE_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#DFC7A5] hover:text-white transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Telephone */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                  24/7 Phone Concierge
                </span>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <a
                    href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                    className="text-lg font-mono text-white hover:text-[#DFC7A5] transition-colors"
                  >
                    {BUSINESS_CONFIG.phonePrimary}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                  Instant WhatsApp Desk
                </span>
                <a
                  href={generateWhatsAppGeneralLink('Concierge Inquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#141820] hover:bg-[#1B222C] border border-emerald-500/30 text-emerald-400 text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+234 817 611 5993)</span>
                </a>
              </div>

              {/* Email */}
              <div className="space-y-1 pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                  Official Email
                </span>
                <p className="text-xs font-mono text-gray-300">
                  {BUSINESS_CONFIG.emailPrimary}
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0E1217] border border-[#242A35] p-6 sm:p-10">
              <h3 className="text-xl font-serif text-white mb-2">
                Send a Confidential Message
              </h3>
              <p className="text-xs text-gray-400 mb-6 font-light">
                For corporate rates, long-term lease arrangements, or custom stay requirements.
              </p>

              {submitted ? (
                <div className="py-10 text-center space-y-4 bg-[#12161E] border border-emerald-500/30 p-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-serif text-white">Message Dispatched</h4>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{name}</strong>. Our guest relations director has received your message and will respond via email or phone ({phone}) shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-transparent text-gray-400 hover:text-white text-xs uppercase tracking-widest border border-white/10"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Somto Okoye"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                        Phone Number
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. somto@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                        Subject / Request Type
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                      >
                        <option value="Short-Stay Apartment Booking">Short-Stay Apartment Booking</option>
                        <option value="Corporate Extended Stay">Corporate Extended Stay</option>
                        <option value="Airport Protocol & Chauffeur">Airport Protocol & Chauffeur</option>
                        <option value="Private Event / Filming Permit">Private Event / Filming Permit</option>
                        <option value="Other Concierge Service">Other Concierge Service</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-medium block">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify your preferred location (Eko Atlantic, VI, Lekki, or Ikeja), arrival dates, and any specific requests..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full bg-[#131720] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Encrypted & Confidential</span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] hover:bg-[#DFC7A5] text-[#080B0E] font-bold text-xs uppercase tracking-[0.16em] transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
