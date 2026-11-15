'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RotateCcw } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { INITIAL_PROPERTIES } from '@/lib/data/properties';
import { formatNaira } from '@/lib/data/business-config';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialLoc = searchParams.get('location') || '';
  const initialBeds = searchParams.get('bedrooms') || '';

  const [selectedLocation, setSelectedLocation] = useState(initialLoc);
  const [selectedBedrooms, setSelectedBedrooms] = useState(initialBeds);
  const [maxPrice, setMaxPrice] = useState<number>(800000);
  const [searchQuery, setSearchQuery] = useState('');

  const locations = ['All', 'Eko Atlantic', 'Victoria Island', 'Lekki', 'Ikeja', 'Ikoyi'];

  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((property) => {
      // Location Filter
      if (selectedLocation && selectedLocation !== 'All') {
        const matchesNeighborhood = property.neighborhood.toLowerCase() === selectedLocation.toLowerCase();
        const matchesLocation = property.location.toLowerCase().includes(selectedLocation.toLowerCase());
        if (!matchesNeighborhood && !matchesLocation) {
          return false;
        }
      }

      // Bedrooms Filter
      if (selectedBedrooms) {
        if (property.bedrooms < Number(selectedBedrooms)) {
          return false;
        }
      }

      // Max Price Filter
      if (property.pricePerNight > maxPrice) {
        return false;
      }

      // Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchTitle = property.title.toLowerCase().includes(query);
        const matchLoc = property.location.toLowerCase().includes(query);
        const matchTag = property.tagline.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchTag) return false;
      }

      return true;
    });
  }, [selectedLocation, selectedBedrooms, maxPrice, searchQuery]);

  const handleReset = () => {
    setSelectedLocation('');
    setSelectedBedrooms('');
    setMaxPrice(800000);
    setSearchQuery('');
  };

  return (
    <div className="py-12 bg-[#080B0E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
            <span>Portfolio • Ikeja | Lekki | Eko Atlantic | Lagos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Apartment Residences
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Select your private penthouse, waterfront suite, or diplomatic residence in Lagos. Guaranteed 24/7 power, Starlink satellite WiFi, and dedicated concierge protocol.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-12 bg-[#0C0F14] border border-[#242A35] p-6 space-y-6">
          
          {/* Location Quick Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 mr-2 shrink-0 font-mono">
              Hub:
            </span>
            {locations.map((loc) => {
              const active = (loc === 'All' && !selectedLocation) || selectedLocation === loc;
              return (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc === 'All' ? '' : loc)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#C5A880] text-[#080B0E] font-bold'
                      : 'bg-[#141820] text-gray-300 hover:text-white border border-white/5'
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>

          {/* Detailed Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.16em] text-gray-400 font-medium block">
                Search Suite / Keyword
              </label>
              <input
                type="text"
                placeholder="e.g. Oceanfront, Penthouse, Maisonette..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141820] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* Bedrooms Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.16em] text-gray-400 font-medium block">
                Minimum Bedrooms
              </label>
              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                className="w-full bg-[#141820] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="">Any Bedroom Count</option>
                <option value="1">1+ Bedroom</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-[0.16em] text-gray-400 font-medium">
                  Max Nightly Rate
                </label>
                <span className="text-xs font-mono text-[#DFC7A5]">
                  {formatNaira(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={150000}
                max={900000}
                step={50000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <div>
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#141820] hover:bg-[#1C222D] border border-white/10 text-gray-400 hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>

          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-gray-500 border-t border-white/5">
            <span>Showing {filteredProperties.length} available residence{filteredProperties.length !== 1 ? 's' : ''}</span>
            <span>All residences backed by 24/7 power warranty</span>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} priority={idx < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0C0F14] border border-white/10 p-8 space-y-4">
            <h3 className="text-xl font-serif text-white">No residences match your filter criteria</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Please adjust your filters or contact our concierge directly via WhatsApp for off-market suites.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-widest cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-gray-400 font-mono">Loading residences...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
