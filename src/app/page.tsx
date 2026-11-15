import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Compass, ShieldCheck, Zap, Wifi } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import ExperienceSection from '@/components/ExperienceSection';
import LocationShowcase from '@/components/LocationShowcase';
import ArchitecturalAmenities from '@/components/ArchitecturalAmenities';
import ArchitecturalGallery from '@/components/ArchitecturalGallery';
import GuestExperienceSection from '@/components/GuestExperienceSection';
import RequestAvailabilityWidget from '@/components/RequestAvailabilityWidget';
import ContactSection from '@/components/ContactSection';
import { getFeaturedProperties, getGalleryItems, getProperties } from '@/lib/data/store';

export default async function HomePage() {
  const [featuredProperties, allProperties, galleryItems] = await Promise.all([
    getFeaturedProperties(),
    getProperties(),
    getGalleryItems(),
  ]);

  return (
    <div className="bg-[#080B0E] text-white selection:bg-[#C5A880] selection:text-[#080B0E]">
      
      {/* ========================================================================= */}
      {/* 1. HERO VIEWPORT (Full-Screen Architectural Image, Headline, CTAs) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-end px-4 sm:px-8 lg:px-16 pb-16 sm:pb-24 pt-32 overflow-hidden border-b border-white/10">
        
        {/* Full-Screen Architectural Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=85"
            alt="21st Century Apartments Eko Atlantic Boulevard Lagos"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.02] transition-transform duration-1000 ease-out"
          />
          {/* Architectural Film Gradient & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/60 to-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080B0E_90%)]" />
        </div>

        {/* Hero Editorial Typography Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Architectural Monogram & Location Pill */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#0C0F14]/90 border border-white/15 text-xs uppercase tracking-[0.22em] text-[#DFC7A5] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>21st Century Apartments • Ikeja | Lekki | Eko Atlantic | Lagos</span>
          </div>

          {/* Headline Direction: "Stay Above Ordinary." */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05]">
              Stay Above Ordinary.
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-300 font-sans font-light tracking-wide max-w-2xl leading-relaxed">
              Premium short-stay apartments designed for modern Lagos living.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="#apartments"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#C5A880] hover:bg-[#DFC7A5] text-[#080B0E] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl hover:gap-3"
            >
              <span>Explore Apartments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#availability"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#141820]/90 hover:bg-[#1C222D] text-white hover:text-[#DFC7A5] font-semibold text-xs uppercase tracking-[0.2em] border border-white/20 transition-all backdrop-blur-md"
            >
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              <span>Check Availability</span>
            </Link>
          </div>

          {/* Architectural Specs Ribbon */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-gray-300">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>24/7 Redundant Power</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-[#DFC7A5]" />
              <span>Starlink 250+ Mbps</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DFC7A5]" />
              <span>Armed Gate Clearance</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#DFC7A5]" />
              <span>Eko Atlantic Flagship</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED APARTMENTS (Architectural Portfolio) */}
      {/* ========================================================================= */}
      <section id="apartments" className="py-24 bg-[#0A0D11] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono mb-2">
                <span>Curated Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
                Featured Apartments
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl font-light">
                High-end residences across Eko Atlantic Boulevard, Victoria Island, Lekki Phase 1, and Ikeja GRA, tailored for short stays and executive travel.
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#DFC7A5] hover:text-white transition-colors self-start md:self-auto font-medium"
            >
              <span>View All Residences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} priority={idx < 2} />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 21ST CENTURY EXPERIENCE */}
      {/* ========================================================================= */}
      <ExperienceSection />

      {/* ========================================================================= */}
      {/* 4. LOCATION (Eko Atlantic Boulevard, Victoria Island / Eti-Osa, Lagos) */}
      {/* ========================================================================= */}
      <LocationShowcase />

      {/* ========================================================================= */}
      {/* 5. AMENITIES (Architectural Amenities) */}
      {/* ========================================================================= */}
      <ArchitecturalAmenities />

      {/* ========================================================================= */}
      {/* 6. GALLERY (Architecture, Interiors, Bedrooms, Living Spaces, Kitchens, Views, Amenities, Lifestyle) */}
      {/* ========================================================================= */}
      <section id="gallery" className="py-24 bg-[#080B0E] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono mb-2">
                <span>Visual Monograph</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
                Gallery
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl font-light">
                Explore the geometry, materials, and living spaces across our serviced residences in Lagos.
              </p>
            </div>

            <div className="text-xs font-mono text-gray-400 self-start md:self-auto">
              8 Architectural Categories
            </div>
          </div>

          {/* Interactive Filterable Gallery Component */}
          <ArchitecturalGallery items={galleryItems} />

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. GUEST EXPERIENCE */}
      {/* ========================================================================= */}
      <GuestExperienceSection />

      {/* ========================================================================= */}
      {/* 8. AVAILABILITY (Request Availability Calendar-Style Interface) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#0A0D11] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RequestAvailabilityWidget properties={allProperties} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CONTACT */}
      {/* ========================================================================= */}
      <ContactSection />

    </div>
  );
}
