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
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-mono">24/7 Power</h4>
              <p className="text-[10px] text-gray-400 font-light">Subterranean Grid + Dual CAT Gens</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#10141C] border border-white/10 flex items-center justify-center shrink-0">
              <Wifi className="w-4 h-4 text-[#DFC7A5]" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-mono">High-Speed WiFi</h4>
              <p className="text-[10px] text-gray-400 font-light">Starlink Satellite & Dedicated Fiber</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#10141C] border border-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#DFC7A5]" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-mono">Gated Security</h4>
              <p className="text-[10px] text-gray-400 font-light">Estate Checkpoints & Monitored Access</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#10141C] border border-white/10 flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4 text-[#DFC7A5]" />
            </div>
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-mono">Flagship Hub</h4>
              <p className="text-[10px] text-gray-400 font-light">Eko Atlantic Boulevard, Victoria Island</p>
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
                  <span className="font-serif text-[#DFC7A5] font-bold text-lg tracking-wider">21</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-base tracking-[0.2em] uppercase font-serif">
                  21ST CENTURY
                </span>
                <span className="text-[9px] text-[#C5A880] tracking-[0.2em] uppercase -mt-0.5 font-mono">
                  Apartments • Lagos
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-light">
              21st Century Apartments is a premier serviced residences operator providing architectural short stays, executive diplomatic accommodations, and waterfront penthouses across Lagos.
            </p>

            <div className="pt-2 text-xs font-mono space-y-1 text-gray-400">
              <p className="text-white font-medium">Headquarters & Flagship Reception:</p>
              <p>{BUSINESS_CONFIG.headquarters.address}</p>
              <p>{BUSINESS_CONFIG.headquarters.city}, {BUSINESS_CONFIG.headquarters.country}</p>
            </div>
          </div>

          {/* Column 3: Locations */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 border-l border-[#C5A880] pl-2.5 font-mono">
              Locations
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/locations/eko-atlantic" className="hover:text-[#DFC7A5] transition-colors">
                  Eko Atlantic Boulevard
                </Link>
              </li>
              <li>
                <Link href="/locations/victoria-island" className="hover:text-[#DFC7A5] transition-colors">
                  Victoria Island Enclave
                </Link>
              </li>
              <li>
                <Link href="/locations/lekki" className="hover:text-[#DFC7A5] transition-colors">
                  Admiralty Way, Lekki Phase 1
                </Link>
              </li>
              <li>
                <Link href="/locations/ikeja" className="hover:text-[#DFC7A5] transition-colors">
                  Isaac John Street, Ikeja GRA
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#DFC7A5] hover:text-white transition-colors font-mono"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 border-l border-[#C5A880] pl-2.5 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/properties" className="hover:text-[#DFC7A5] transition-colors">
                  Residences Portfolio
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
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 border-l border-[#C5A880] pl-2.5 font-mono">
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
                  className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors block font-mono"
                >
                  Admin / Operations Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} 21ST CENTURY APARTMENTS. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <span>•</span>
            <span>Africa/Lagos Timezone (WAT)</span>
            <span>•</span>
            <span>Prices in Nigerian Naira (₦)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
