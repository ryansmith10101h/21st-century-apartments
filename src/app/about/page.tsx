import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building, ArrowRight, Navigation } from 'lucide-react';
import { BUSINESS_CONFIG, GOOGLE_MAPS_DIRECTIONS_URL } from '@/lib/data/business-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About 21st Century Apartments | Modern Lagos Luxury Living',
  description: 'About 21ST CENTURY APARTMENTS: Serviced short-stay apartment operator with flagship residences at Eko Atlantic Boulevard, Victoria Island, Lekki, and Ikeja GRA.',
};

export default function AboutPage() {
  return (
    <div className="py-12 bg-[#080B0E] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
            <Building className="w-3.5 h-3.5" />
            <span>Corporate Monograph</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight">
            Stay Above <br />
            <span className="italic font-normal text-gray-400">Ordinary.</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-300 font-light leading-relaxed">
            {BUSINESS_CONFIG.name} is a premier serviced residences operator founded to provide world-class, architectural short-stay living across Lagos: Ikeja, Lekki, Eko Atlantic, and Victoria Island.
          </p>
        </div>

        {/* Brand Story & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] bg-[#141820] border border-[#242A35] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85"
              alt="21st Century Apartments Eko Atlantic Boulevard"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#080B0E]/85 backdrop-blur-md border border-white/10">
              <p className="text-[10px] text-[#DFC7A5] font-mono uppercase tracking-widest">Central Flagship</p>
              <p className="text-sm font-serif text-white">Eko Atlantic Boulevard, Victoria Island / Eti-Osa</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                Infrastructure & Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-snug">
                Engineered for Uncompromising Reliability
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              In Lagos, high-end short-term rentals often promise luxury but falter on power stability, internet speed, or gatehouse security. 21st Century Apartments was engineered around foundational infrastructure: independent power grids, redundant heavy-duty CAT generators, Victron solar banks, and dedicated enterprise Starlink satellite connections.
            </p>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              From our flagship oceanfront high-rises at Eko Atlantic Boulevard to diplomatic residences in Victoria Island, waterfront maisonettes in Lekki, and airport-proximate executive residences in Ikeja GRA, every property is maintained to international standards.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-[#0E1217] border border-white/10 space-y-1">
                <span className="text-xl font-serif text-white">100%</span>
                <p className="text-gray-400 text-[11px]">Guaranteed Power Uptime</p>
              </div>
              <div className="p-4 bg-[#0E1217] border border-white/10 space-y-1">
                <span className="text-xl font-serif text-white">250+ Mbps</span>
                <p className="text-gray-400 text-[11px]">Starlink Satellite WiFi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Desks & Locations */}
        <div className="space-y-8 pt-6 border-t border-white/10">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
              Physical Footprint
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">
              Operations Desks Across Lagos
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_CONFIG.officeLocations.map((office, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#0E1217] border border-[#242A35] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#C5A880]">
                    0{idx + 1}
                  </span>
                  <h4 className="text-base font-serif text-white">
                    {office.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {office.address}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, '')}`}
                    className="text-xs font-mono text-gray-300 hover:text-white"
                  >
                    {office.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Action */}
        <div className="bg-[#0C0F14] border border-[#242A35] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-serif text-white">Plan Your Visit to Lagos</h4>
            <p className="text-xs text-gray-400 font-light mt-1">Our central concierge desk is at your service 24/7.</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#141820] text-[#DFC7A5] text-xs uppercase tracking-wider font-semibold border border-white/10"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>

            <Link
              href="/#availability"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-[0.16em]"
            >
              <span>Request Availability</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
