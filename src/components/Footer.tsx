import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MessageCircle, ShieldCheck, Zap, Wifi, Navigation, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG, GOOGLE_MAPS_DIRECTIONS_URL, generateWhatsAppGeneralLink } from '@/lib/data/business-config';

export default function Footer() {
  return (
    <footer className="bg-[#05070A] border-t border-white/10 text-gray-400 pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#10141C] border border-white/10 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">24/7 Power</h4>
              <p className="text-[10px] text-gray-400">Subterranean Grid + CAT Gens</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#10141C] border border-white/10 flex items-center justify-center shrink-0">
              <Wifi className="w-4 h-4 text-[#DFC7A5]" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Starlink 250Mbps</h4>
              <p className="text-[10px] text-gray-400">Dedicated Enterprise Bandwidth</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#10141C] border border-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#DFC7A5]" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Armed Security</h4>
              <p className="text-[10px] text-gray-400">Estate Checkpoints & Biometrics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#10141C] border border-white/10 flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4 text-[#DFC7A5]" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Eko Atlantic Hub</h4>
              <p className="text-[10px] text-gray-400">Victoria Island / Eti-Osa</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Column 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DFC7A5] to-[#9E8159] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#080B0E] rounded-lg flex items-center justify-center">
                  <span className="font-serif text-[#DFC7A5] font-bold text-lg">21</span>
                </div>
              </div>
              <div>
                <span className="text-white font-serif font-bold text-base tracking-[0.2em] uppercase">
                  21ST CENTURY
                </span>
                <p className="text-[9px] text-[#C5A880] tracking-[0.2em] uppercase font-sans">
                  Apartments • Lagos
                </p>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-light">
              21st Century Apartments in | Ikeja | Lekki | Eko Atlantic | Lagos. Premium short-term apartment rentals and serviced residences designed for modern Lagos living.
            </p>

            <div className="pt-2 text-xs text-gray-400 space-y-1 font-mono">
              <p>
                <strong className="text-white font-sans">Headquarters:</strong> {BUSINESS_CONFIG.headquarters.address}, {BUSINESS_CONFIG.headquarters.city}, Nigeria
              </p>
              <p>
                <strong className="text-white font-sans">Phone:</strong> {BUSINESS_CONFIG.phonePrimary}
              </p>
            </div>
          </div>

          {/* Column 3: Prime Locations */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 border-l border-[#C5A880] pl-2.5">
              Locations
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/properties?location=Eko+Atlantic" className="hover:text-[#DFC7A5] transition-colors">
                  Eko Atlantic Boulevard
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Victoria+Island" className="hover:text-[#DFC7A5] transition-colors">
                  Victoria Island Enclave
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Lekki" className="hover:text-[#DFC7A5] transition-colors">
                  Admiralty Way, Lekki Phase 1
                </Link>
              </li>
              <li>
                <Link href="/properties?location=Ikeja" className="hover:text-[#DFC7A5] transition-colors">
                  Isaac John Street, Ikeja GRA
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#DFC7A5] hover:text-white transition-colors"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 border-l border-[#C5A880] pl-2.5">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/properties" className="hover:text-[#DFC7A5] transition-colors">
                  All Apartments
                </Link>
              </li>
              <li>
                <Link href="/#availability" className="hover:text-[#DFC7A5] transition-colors">
                  Request Availability
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-[#DFC7A5] transition-colors">
                  The Experience
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-[#DFC7A5] transition-colors">
                  Architectural Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#DFC7A5] transition-colors">
                  About 21st Century
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DFC7A5] transition-colors">
                  Contact & Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Inquiries */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 border-l border-[#C5A880] pl-2.5">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 hover:text-[#DFC7A5] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span className="font-mono">{BUSINESS_CONFIG.phonePrimary}</span>
                </a>
              </li>
              <li>
                <a
                  href={generateWhatsAppGeneralLink('Footer')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_CONFIG.emailPrimary}`}
                  className="flex items-center gap-2 hover:text-[#DFC7A5] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span className="font-mono truncate">{BUSINESS_CONFIG.emailPrimary}</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors block"
                >
                  Admin / Staff Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} 21ST CENTURY APARTMENTS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Africa/Lagos Timezone (WAT)</span>
            <span>•</span>
            <span>Prices in Nigerian Naira (₦)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
