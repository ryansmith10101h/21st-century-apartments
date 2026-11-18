'use client';

import React, { useState, useMemo } from 'react';
import { RotateCcw, Search, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/lib/types';
import { formatNaira } from '@/lib/data/business-config';

interface PropertiesCatalogProps {
  initialProperties: Property[];
  initialLocation?: string;
  initialBedrooms?: string;
}

export default function PropertiesCatalog({
  initialProperties,
  initialLocation = '',
  initialBedrooms = '',
}: PropertiesCatalogProps) {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedBedrooms, setSelectedBedrooms] = useState(initialBedrooms);
  const [maxPrice, setMaxPrice] = useState<number>(800000);
  const [searchQuery, setSearchQuery] = useState('');

  const locations = ['All', 'Eko Atlantic', 'Victoria Island', 'Lekki', 'Ikeja', 'Ikoyi'];

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
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
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = property.title.toLowerCase().includes(query);
        const matchLoc = property.location.toLowerCase().includes(query);
        const matchTag = property.tagline.toLowerCase().includes(query);
        const matchDesc = property.description.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchTag && !matchDesc) return false;
      }

      return true;
    });
  }, [initialProperties, selectedLocation, selectedBedrooms, maxPrice, searchQuery]);

  const handleReset = () => {
    setSelectedLocation('');
    setSelectedBedrooms('');
    setMaxPrice(800000);
    setSearchQuery('');
  };

  const isFiltered = Boolean(selectedLocation || selectedBedrooms || searchQuery || maxPrice < 800000);

  return (
    <div className="space-y-12">
      {/* Filter Controls Bar */}
      <div className="bg-[#0C0F14] border border-[#242A35] p-6 space-y-6">
        {/* Location Quick Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 mr-2 shrink-0 font-mono">
            District:
          </span>
          {locations.map((loc) => {
            const active = (loc === 'All' && !selectedLocation) || selectedLocation === loc;
            return (
              <button
                key={loc}
                type="button"
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

        {/* Detailed Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.16em] text-gray-400 font-medium block flex items-center gap-1.5">
              <Search className="w-3 h-3 text-[#C5A880]" />
              <span>Keyword Search</span>
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

          {/* Price Range */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.16em] text-gray-400 font-medium">
              <span>Max Nightly Rate</span>
              <span className="text-[#DFC7A5] font-mono">{formatNaira(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="200000"
              max="800000"
              step="25000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C5A880] cursor-pointer"
            />
          </div>

          {/* Reset Filters */}
          <div>
            <button
              type="button"
              onClick={handleReset}
              disabled={!isFiltered}
              className="w-full py-2.5 px-4 bg-[#141820] hover:bg-[#1B222C] text-gray-300 hover:text-white border border-white/10 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Counter and Guarantee */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-gray-400 border-t border-white/5">
          <span>
            Showing <strong className="text-white">{filteredProperties.length}</strong> verified residence{filteredProperties.length !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Independent Subterranean Power & Concierge Verification</span>
          </span>
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
          <div className="w-12 h-12 mx-auto rounded-full bg-[#182028] border border-white/10 flex items-center justify-center text-[#C5A880]">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif text-white">No residences match your current filters</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            Please reset your filters or contact our concierge desk directly via WhatsApp for unlisted penthouse availability and corporate executive packages.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-[#DFC7A5] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
