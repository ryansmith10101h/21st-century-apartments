'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Bed, Search } from 'lucide-react';

interface SearchFilterBarProps {
  initialLocation?: string;
  initialBedrooms?: string;
  onFilterChange?: (filters: { location: string; bedrooms: string }) => void;
  isHero?: boolean;
}

export default function SearchFilterBar({
  initialLocation = '',
  initialBedrooms = '',
  onFilterChange,
  isHero = false,
}: SearchFilterBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(initialLocation);
  const [bedrooms, setBedrooms] = useState(initialBedrooms);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({ location, bedrooms });
    } else {
      const params = new URLSearchParams();
      if (location) params.append('location', location);
      if (bedrooms) params.append('bedrooms', bedrooms);
      if (checkIn) params.append('checkIn', checkIn);
      if (checkOut) params.append('checkOut', checkOut);
      router.push(`/properties?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full ${
        isHero
          ? 'bg-[#0E1217]/95 backdrop-blur-xl border border-white/20 p-4 sm:p-6 shadow-2xl'
          : 'bg-[#0E1217] border border-[#242A35] p-4'
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        
        {/* Neighborhood / Location */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono tracking-widest text-[#DFC7A5] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Prime Location</span>
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-[#141820] border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
          >
            <option value="">All Hubs (Ikeja • Lekki • Eko Atlantic • Lagos)</option>
            <option value="Eko Atlantic">Eko Atlantic Boulevard</option>
            <option value="Victoria Island">Victoria Island Enclave</option>
            <option value="Lekki">Lekki Phase 1 (Admiralty)</option>
            <option value="Ikeja">Ikeja GRA (Airport Proximity)</option>
            <option value="Ikoyi">Banana Island & Ikoyi</option>
          </select>
        </div>

        {/* Bedroom Layout */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono tracking-widest text-[#DFC7A5] flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Bedrooms & Layout</span>
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-[#141820] border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
          >
            <option value="">Any Layout (1 - 4 Bedrooms)</option>
            <option value="1">1 Bedroom Suite</option>
            <option value="2">2 Bedrooms Executive Residence</option>
            <option value="3">3 Bedrooms Waterfront Maisonette</option>
            <option value="4">4 Bedrooms Oceanfront Penthouse</option>
          </select>
        </div>

        {/* Check-In / Check-Out Dates */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono tracking-widest text-[#DFC7A5] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Requested Dates</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#141820] border border-white/10 px-2 py-2 text-[11px] text-white focus:outline-none focus:border-[#C5A880]"
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#141820] border border-white/10 px-2 py-2 text-[11px] text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>

        {/* Search CTA */}
        <div className="sm:col-span-2 lg:col-span-1 sm:self-end">
          <button
            type="submit"
            className="w-full h-[40px] flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#DFC7A5] text-[#080B0E] font-bold text-xs uppercase tracking-[0.16em] shadow-lg transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Apartments</span>
          </button>
        </div>
      </div>
    </form>
  );
}
