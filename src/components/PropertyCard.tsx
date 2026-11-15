'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Users, Zap, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatNaira, BUSINESS_CONFIG } from '@/lib/data/business-config';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello 21st Century Apartments,\nI would like to enquire about availability for *${property.title}* (${property.neighborhood}) at ${formatNaira(property.pricePerNight)}/night.\nPlease advise on open dates.`
  )}`;

  return (
    <article className="group bg-[#0E1217] border border-[#242A35] hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Architectural Image Showcase */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#151A22]">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subtle Architectural Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1217] via-transparent to-black/20" />

        {/* Neighborhood & Power Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#0A0D11]/90 backdrop-blur-md text-[#DFC7A5] border border-white/10">
            {property.neighborhood}
          </span>

          <div className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold bg-[#0A0D11]/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
            <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <span>24/7 Power</span>
          </div>
        </div>

        {/* Square Meters Tag */}
        <div className="absolute bottom-3 right-4 z-10">
          <span className="text-[10px] uppercase tracking-widest text-gray-300 bg-[#0A0D11]/85 backdrop-blur-md px-2.5 py-0.5 border border-white/10">
            {property.squareMeters} m²
          </span>
        </div>
      </div>

      {/* Editorial Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] mb-1 font-mono">
            {property.location}
          </div>
          <h3 className="text-xl font-serif text-white group-hover:text-[#DFC7A5] transition-colors leading-tight line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed font-sans font-light">
            {property.tagline}
          </p>
        </div>

        {/* Architectural Specs Divider */}
        <div className="grid grid-cols-3 divide-x divide-white/10 py-3 border-y border-white/10 text-xs text-gray-300">
          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Bedrooms</span>
            <div className="flex items-center gap-1 text-white font-medium mt-0.5">
              <Bed className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{property.bedrooms}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Baths</span>
            <div className="flex items-center gap-1 text-white font-medium mt-0.5">
              <Bath className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{property.bathrooms}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Guests</span>
            <div className="flex items-center gap-1 text-white font-medium mt-0.5">
              <Users className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{property.maxGuests}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500 block">Nightly Rate</span>
            <div className="text-xl font-serif font-bold text-white tracking-tight">
              {formatNaira(property.pricePerNight)}
              <span className="text-xs font-normal text-gray-400 font-sans"> / night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp about ${property.title}`}
              className="p-2.5 bg-[#141820] hover:bg-[#1C222D] border border-emerald-500/30 text-emerald-400 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Link
              href={`/properties/${property.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#171D26] hover:bg-[#C5A880] hover:text-[#080B0E] border border-white/10 hover:border-[#C5A880] text-xs uppercase tracking-[0.15em] font-semibold text-white transition-all group-hover:border-[#C5A880]/50"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
