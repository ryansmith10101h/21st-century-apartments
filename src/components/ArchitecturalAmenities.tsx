'use client';

import React from 'react';
import { Zap, Wifi, ShieldCheck, Waves, Utensils, Key, Car, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ArchitecturalAmenities() {
  const amenitiesList = [
    {
      title: 'Guaranteed 24/7 Power',
      desc: 'Subterranean municipal grid at Eko Atlantic backed by dual silent sync generators and lithium inverters. Zero voltage surge.',
      icon: Zap,
    },
    {
      title: 'Enterprise Starlink WiFi',
      desc: 'Dedicated low-latency 250+ Mbps satellite internet paired with high-speed fiber lines for multi-guest video conferencing.',
      icon: Wifi,
    },
    {
      title: 'Armed Security & Biometrics',
      desc: 'Estate checkpoint clearance, armed personnel detachment, biometric door locks, and 24/7 internal CCTV surveillance.',
      icon: ShieldCheck,
    },
    {
      title: 'Waterfront Ocean & Marina Balconies',
      desc: 'Generous private outdoor terraces framing uninterrupted vistas of the Atlantic horizon and Lekki-Ikoyi Link Bridge.',
      icon: Waves,
    },
    {
      title: 'Designer Induction Kitchens',
      desc: 'Fully equipped Miele and Boffi kitchens with induction hobs, microwave ovens, wine chillers, and Nespresso stations.',
      icon: Utensils,
    },
    {
      title: 'Private In-House Chef Service',
      desc: 'Tailored private culinary service on request, preparing contemporary Nigerian gourmet specialties and continental dining.',
      icon: Sparkles,
    },
    {
      title: 'Executive Chauffeur Protocol',
      desc: 'Airport protocol from Murtala Muhammed International Airport (MMIA) with chauffeured executive SUVs available on booking.',
      icon: Car,
    },
    {
      title: 'Keyless Contactless Arrival',
      desc: 'Encrypted digital mobile credentials and discreet physical cards for effortless 24/7 self-check-in without reception queues.',
      icon: Key,
    },
  ];

  return (
    <section className="py-24 bg-[#0A0D11] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Standard in Every Residence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
              Architectural Amenities
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl font-light">
              Every amenity is verified, redundant, and built to withstand local infrastructure demands without interrupting your stay.
            </p>
          </div>

          <div className="text-xs font-mono text-[#DFC7A5] bg-[#141820] px-4 py-2 border border-white/10 self-start md:self-auto">
            100% Guaranteed Uptime Commitment
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenitiesList.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <div
                key={amenity.title}
                className="bg-[#0E1217] border border-[#242A35] p-6 hover:border-[#C5A880]/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#161C24] border border-white/10 flex items-center justify-center text-[#C5A880]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif text-white">
                    {amenity.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {amenity.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
