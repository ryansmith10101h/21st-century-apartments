'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Navigation
} from 'lucide-react';
import { BUSINESS_CONFIG, GOOGLE_MAPS_DIRECTIONS_URL, generateWhatsAppGeneralLink } from '@/lib/data/business-config';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Short-Stay Apartment Booking');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
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
        setSuccess(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit enquiry. Please use WhatsApp.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Please reach us via WhatsApp or Phone below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-[#080B0E] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
            <Phone className="w-3.5 h-3.5" />
            <span>24/7 Operations & Concierge Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Contact 21st Century
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Headquarters at Eko Atlantic Boulevard, Victoria Island / Eti-Osa, Lagos. Servicing luxury apartments in Ikeja, Lekki, Eko Atlantic, and Victoria Island.
          </p>
        </div>

        {/* Main Grid: Form + Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0E1217] border border-[#242A35] p-8 sm:p-10 space-y-6">
              <h2 className="text-xl font-serif text-white">
                Submit an Inquiry
              </h2>

              {success ? (
                <div className="p-8 bg-[#12161E] border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif text-white">Inquiry Received</h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{name}</strong>. Our team is reviewing your message and will respond via phone ({phone}) or email promptly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
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
                      <label className="text-[10px] uppercase font-mono text-gray-400 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tayo Adeleke"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#141820] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono text-gray-400 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 817 611 5993"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#141820] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono text-gray-400 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. adeleke@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#141820] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono text-gray-400 block">
                        Service Required
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#141820] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Short-Stay Apartment Booking">Short-Stay Apartment Booking</option>
                        <option value="Corporate Extended Stay">Corporate Extended Stay</option>
                        <option value="Airport Protocol & Chauffeur">Airport Protocol & Chauffeur</option>
                        <option value="Private Filming / Venue Hire">Private Filming / Venue Hire</option>
                        <option value="General Concierge">General Concierge</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-gray-400 block">
                      Message / Preferred Location & Dates
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Specify required location (Eko Atlantic, Victoria Island, Lekki, or Ikeja), number of bedrooms, and arrival dates..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#141820] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#C5A880] hover:bg-[#DFC7A5] text-[#080B0E] font-bold text-xs uppercase tracking-[0.18em] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Transmitting Message...' : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0E1217] border border-[#242A35] p-8 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                  Central Address
                </span>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-base font-serif text-white">Eko Atlantic Boulevard</h4>
                    <p className="text-xs text-gray-400">Victoria Island / Eti-Osa, Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={GOOGLE_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#DFC7A5] hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                  Direct Line
                </span>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <a
                    href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                    className="text-lg font-mono text-white hover:text-[#DFC7A5]"
                  >
                    {BUSINESS_CONFIG.phonePrimary}
                  </a>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                  WhatsApp Concierge
                </span>
                <a
                  href={generateWhatsAppGeneralLink('Contact Page')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#141820] text-emerald-400 border border-emerald-500/30 text-xs uppercase tracking-wider font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+234 817 611 5993)</span>
                </a>
              </div>

              <div className="space-y-1 pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                  Email
                </span>
                <p className="text-xs font-mono text-gray-300">
                  {BUSINESS_CONFIG.emailPrimary}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
