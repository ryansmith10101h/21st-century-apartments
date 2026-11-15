'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Menu, X, Calendar } from 'lucide-react';
import { BUSINESS_CONFIG, generateWhatsAppGeneralLink } from '@/lib/data/business-config';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Apartments', href: '/properties' },
    { name: 'Experience', href: '/experience' },
    { name: 'Location', href: '/#location' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B0E]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-[#080B0E]/95 via-[#080B0E]/60 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DFC7A5] to-[#9E8159] p-[1px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#080B0E] rounded-lg flex items-center justify-center">
                <span className="font-serif text-[#DFC7A5] font-bold text-lg tracking-wider">21</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm sm:text-base tracking-[0.2em] uppercase font-serif">
                21ST CENTURY
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#C5A880] tracking-[0.2em] uppercase -mt-0.5 font-sans font-medium">
                Apartments • Lagos
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-[#DFC7A5] border-b border-[#C5A880]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-300 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-sans text-[11px] font-medium">{BUSINESS_CONFIG.phonePrimary}</span>
            </a>

            <a
              href={generateWhatsAppGeneralLink('Concierge Desk')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-wider bg-[#12171D] hover:bg-[#182028] text-gray-200 px-3 py-2 rounded-lg border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-sans text-[11px] font-semibold text-emerald-400">WhatsApp</span>
            </a>

            <Link
              href="/#availability"
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest bg-gradient-to-r from-[#DFCAAB] via-[#C5A880] to-[#A6875C] hover:opacity-95 text-[#080B0E] font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Check Availability</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={generateWhatsAppGeneralLink('Mobile Quick Chat')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Concierge"
              className="p-2 rounded-lg bg-[#12171D] border border-emerald-500/30 text-emerald-400"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#12171D] border border-white/10 text-gray-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#DFC7A5]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0E12] border-b border-white/10 px-5 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-1 pb-3 border-b border-white/5">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">
              21st Century Apartments
            </span>
            <span className="text-xs text-gray-400">
              Ikeja • Lekki • Eko Atlantic • Lagos
            </span>
          </div>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider font-medium text-gray-200 hover:text-[#DFC7A5] py-1 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/#availability"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-[#DFCAAB] via-[#C5A880] to-[#A6875C] text-[#080B0E] font-bold text-xs uppercase tracking-wider shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Availability</span>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#12171D] border border-white/10 text-xs font-medium text-gray-300"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Call Desk</span>
              </a>

              <a
                href={generateWhatsAppGeneralLink('Mobile Navigation')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#12171D] border border-emerald-500/30 text-xs font-semibold text-emerald-400"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
