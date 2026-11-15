'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ExperienceSection() {
  const pillars = [
    {
      num: '01',
      title: 'Waterfront Serenity & Architectural Light',
      desc: 'Floor-to-ceiling panoramic glass facades framing uninterrupted vistas of the Atlantic Ocean and Five Cowrie Creek, infusing every residence with natural coastal light.',
    },
    {
      num: '02',
      title: 'Zero-Downtime Infrastructure',
      desc: 'Seamless subterranean municipal grid at Eko Atlantic backed by synchronized CAT generators and Victron lithium solar storage. True 24/7 continuous power for business travel.',
    },
    {
      num: '03',
      title: 'Discreet Security & Absolute Privacy',
      desc: 'Gated enclave protocols, 24-hour armed perimeter detachments, private biometric elevator access, and zero intrusive commercial filming or unsolicited visitors.',
    },
    {
      num: '04',
      title: 'Executive Business Velocity',
      desc: 'Enterprise Starlink satellite WiFi clocking 250+ Mbps low latency, ergonomic Herman Miller executive work suites, and 12-minute transit corridor to airport terminals.',
    },
  ];

  return (
    <section className="py-24 bg-[#080B0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
            <Sparkles className="w-3 h-3" />
            <span>The 21st Century Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-[1.15]">
            Crafted for Privacy, <br />
            <span className="italic font-normal text-gray-400">Engineered for Lagos Living.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light pt-2">
            We departed from conventional hotel limitations and noisy rental blocks. 21st Century Apartments delivers a curated collection of standalone serviced residences where international business leaders, diplomats, and discerning travelers experience true calm, uncompromised power, and tailored concierge support.
          </p>
        </div>

        {/* 4 Pillars Grid with Thin Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-b border-white/10 py-12">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="space-y-4 pr-4">
              <span className="font-mono text-2xl text-[#C5A880] font-light">
                {pillar.num}
              </span>
              <h3 className="text-base font-serif text-white leading-snug">
                {pillar.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Cinematic Dual Focus Image & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] bg-[#141820] border border-[#242A35] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
              alt="21st Century Luxury Living Room Lagos"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#DFC7A5] font-mono">
                Eko Atlantic Skyline
              </span>
              <p className="text-sm font-serif text-white mt-1">
                Refined minimalism where each detail serves comfort and peace of mind.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                Bespoke Guest Protocol
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
                From Airport Tarmac to Oceanfront Balcony
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Whether arriving from Heathrow, JFK, or Charles de Gaulle, our VIP desk coordinates private airport terminal clearance at MMIA, secured armored transport, and seamless contactless check-in to your suite.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/experience"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#161D27] hover:bg-[#C5A880] hover:text-[#080B0E] text-white text-xs uppercase tracking-[0.16em] font-semibold border border-white/10 transition-all"
              >
                <span>Read Full Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
