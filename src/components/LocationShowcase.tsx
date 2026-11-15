'use client';

import React from 'react';
import { MapPin, Navigation, Compass, Building, Waves, Plane, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GOOGLE_MAPS_DIRECTIONS_URL, BUSINESS_CONFIG } from '@/lib/data/business-config';

export default function LocationShowcase() {
  const hubs = [
    {
      title: 'Eko Atlantic Boulevard (Flagship)',
      badge: 'Waterfront & Diplomatic Hub',
      address: 'Eko Atlantic Boulevard, Victoria Island / Eti-Osa, Lagos',
      description: 'The architectural symbol of modern coastal Lagos. Features independent subterranean municipal power, state-of-the-art water purification, pristine walking boulevards, and oceanfront breeze.',
      icon: Waves,
      advantages: [
        'Zero blackout tolerance on independent city power grid',
        'Direct coastal waterfront views & marina promenade',
        'Direct connection to Victoria Island financial district',
      ],
    },
    {
      title: 'Victoria Island Enclave',
      badge: 'Corporate & Embassy District',
      address: 'Walter Carrington & Ahmadu Bello Way, Victoria Island',
      description: 'Nigeria’s premier financial engine. Home to international bank headquarters, high-commission consulates, upscale art galleries, and fine dining establishments.',
      icon: Building,
      advantages: [
        'Walking proximity to leading multinational offices & consulates',
        'Overlooking Five Cowrie Creek water channels',
        'Access to Lagos’ most prestigious private dining clubs',
      ],
    },
    {
      title: 'Lekki Phase 1 Waterfront',
      badge: 'Culinary & Lifestyle Corridor',
      address: 'Admiralty Way, Lekki Phase 1, Lagos',
      description: 'The creative and lifestyle pulse of Lagos. Home to vibrant waterfront dining, specialty coffee houses, and immediate transit to Ikoyi via the Lekki-Ikoyi Link Bridge.',
      icon: Compass,
      advantages: [
        'Direct sunset views of Lekki-Ikoyi Link Bridge',
        '2 minutes to Circa Lagos, RSVP, and rooftop lounges',
        'Quick access to water taxi jetties',
      ],
    },
    {
      title: 'Ikeja GRA Sanctuary',
      badge: 'Mainland & Airport Proximity',
      address: 'Isaac John Street, GRA Ikeja, Lagos',
      description: 'The historic, leafy mainland residential enclave. Selected specifically for visiting executives, aviation crews, and diaspora families desiring rapid access to international flights.',
      icon: Plane,
      advantages: [
        'Only 12 minutes to Murtala Muhammed International Airport (MMIA)',
        'Peaceful, guarded estate streets shielded from traffic',
        'Convenient mainland business meetings and transit',
      ],
    },
  ];

  return (
    <section id="location" className="py-24 bg-[#0A0D11] border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Confirmed Prime Locations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
              Modern Lagos, <span className="italic font-normal text-gray-400">Positioned with Intent</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl font-light">
              We operate exclusively within four secured, infrastructure-rich zones across Lagos: Eko Atlantic, Victoria Island, Lekki, and Ikeja GRA.
            </p>
          </div>

          {/* Primary Action: GET DIRECTIONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={GOOGLE_MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5A880] hover:bg-[#DFC7A5] text-[#080B0E] font-bold text-xs uppercase tracking-[0.18em] transition-all shadow-xl"
            >
              <Navigation className="w-4 h-4 fill-current" />
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Flagship Address Feature Card */}
        <div className="bg-[#10141C] border border-[#242A35] p-6 sm:p-10 mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#DFC7A5] bg-[#161D27] px-3 py-1 border border-white/10 inline-block font-mono">
                Flagship Headquarters
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                Eko Atlantic Boulevard, Victoria Island / Eti-Osa, Lagos
              </h3>
              <p className="text-xs text-gray-400 max-w-2xl">
                Our central concierge desk and primary oceanfront suites are stationed directly along Eko Atlantic Boulevard, welcoming guests 24 hours a day with private security protocol.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="text-right hidden lg:block pr-4 border-r border-white/10">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block">24/7 Desk Phone</span>
                <span className="text-sm font-mono text-white font-semibold">{BUSINESS_CONFIG.phonePrimary}</span>
              </div>

              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#18202A] hover:bg-[#202B39] text-[#DFC7A5] text-xs uppercase tracking-wider font-semibold border border-white/10 transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#C5A880]" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Strategic Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hubs.map((hub) => {
            const Icon = hub.icon;
            return (
              <div
                key={hub.title}
                className="bg-[#0E1217] border border-[#242A35] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#C5A880]/50 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono">
                      {hub.badge}
                    </span>
                    <Icon className="w-4 h-4 text-[#C5A880]" />
                  </div>

                  <h3 className="text-xl font-serif text-white">
                    {hub.title}
                  </h3>

                  <div className="text-xs font-mono text-gray-400">
                    {hub.address}
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {hub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  {hub.advantages.map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
