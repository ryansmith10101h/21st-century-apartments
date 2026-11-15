import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Utensils, 
  Waves, 
  ShieldCheck, 
  Plane, 
  Phone, 
  MessageCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_CONFIG, generateWhatsAppGeneralLink } from '@/lib/data/business-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The 21st Century Experience | Modern Lagos Luxury Living',
  description: 'Stay Above Ordinary. Serviced short-stay residences across Eko Atlantic, Victoria Island, Lekki, and Ikeja GRA. Airport protocol, Starlink high-speed internet, 24/7 power, and private chefs.',
};

export default function ExperiencePage() {
  const experiences = [
    {
      icon: Plane,
      title: 'Airport MMIA Protocol & Chauffeur Transit',
      tag: 'Airport Mobility',
      description: 'Avoid airport delays upon arrival at Murtala Muhammed International Airport (MMIA). Our airport liaison officer meets guests at the terminal gate, coordinates expedited baggage clearance, and transitions you into an air-conditioned executive vehicle with direct transit to your apartment in Ikeja, Eko Atlantic, or Victoria Island.',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
      rate: 'From ₦85,000 / airport transfer',
    },
    {
      icon: Utensils,
      title: 'Private In-House Resident Chef',
      tag: 'Gourmet Culinary',
      description: 'Dine privately inside your apartment with a personal chef preparing contemporary Nigerian cuisine (seafood okra with tiger prawns, charcoal-smoked native jollof rice, grilled peppered croaker fish) and continental delicacies according to your dietary preferences.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
      rate: 'From ₦50,000 / day + ingredient pass-through',
    },
    {
      icon: Waves,
      title: 'Waterfront & Marina Living',
      tag: 'Coastal Lagos',
      description: 'Live adjacent to the open Atlantic Ocean at Eko Atlantic Boulevard or enjoy tranquil lagoon channels from our Victoria Island and Lekki residences. Private chartered speedboats to Tarkwa Bay and Ilashe luxury beach houses can be arranged on request.',
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1200&q=85',
      rate: 'Custom Charter Quotation',
    },
    {
      icon: ShieldCheck,
      title: 'Discreet Close Protection & Security Clearance',
      tag: 'High-Level Security',
      description: 'Created for international corporate executives, visiting diaspora families, and diplomatic delegates. Gated checkpoint clearance, biometric access, 24/7 CCTV surveillance, and optional mobile armed escorts across Lagos.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85',
      rate: 'Direct Desk Coordination',
    },
  ];

  return (
    <div className="py-12 bg-[#080B0E] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Banner */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The 21st Century Standard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight">
            Designed for Modern <br />
            <span className="italic font-normal text-gray-400">Lagos Living.</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-300 font-light leading-relaxed">
            Every apartment in our portfolio reflects the same rigorous standards: guaranteed 24/7 clean power, Starlink satellite internet, armed estate gate clearance, and dedicated concierge support.
          </p>
        </div>

        {/* Experience Services Grid */}
        <div className="space-y-16">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Image */}
                <div className={`relative aspect-[16/10] bg-[#141820] border border-[#242A35] overflow-hidden ${isEven ? '' : 'lg:col-start-2'}`}>
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md text-[10px] uppercase font-mono text-[#DFC7A5] border border-white/10">
                    {exp.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#12161E] border border-white/10 flex items-center justify-center text-[#C5A880]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-2xl font-serif text-white">
                    {exp.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                    {exp.description}
                  </p>

                  <div className="pt-2 text-xs font-mono text-[#DFC7A5]">
                    {exp.rate}
                  </div>

                  <div className="pt-2">
                    <a
                      href={generateWhatsAppGeneralLink(exp.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141820] hover:bg-[#C5A880] hover:text-[#080B0E] text-white text-xs uppercase tracking-wider font-semibold border border-white/10 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Inquire via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-[#0C0F14] border border-[#242A35] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-white">Experience Lagos on Your Terms</h3>
            <p className="text-xs text-gray-400 max-w-xl font-light">
              Speak with our reservations desk at Eko Atlantic Boulevard for bespoke corporate and extended stay pricing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/#availability"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-[0.18em]"
            >
              <span>Check Availability</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#141820] text-white text-xs uppercase tracking-[0.18em] border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{BUSINESS_CONFIG.phonePrimary}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
