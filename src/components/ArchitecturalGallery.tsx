'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryItem, GalleryCategory } from '@/lib/types';
import { Maximize2, X, Compass } from 'lucide-react';

interface ArchitecturalGalleryProps {
  items: GalleryItem[];
}

const CATEGORIES: { label: string; value: GalleryCategory | 'all' }[] = [
  { label: 'All Showcase', value: 'all' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Interiors', value: 'interiors' },
  { label: 'Bedrooms', value: 'bedrooms' },
  { label: 'Living Spaces', value: 'living spaces' },
  { label: 'Kitchens', value: 'kitchens' },
  { label: 'Views', value: 'views' },
  { label: 'Amenities', value: 'amenities' },
  { label: 'Lifestyle', value: 'lifestyle' },
];

export default function ArchitecturalGallery({ items }: ArchitecturalGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | 'all'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium transition-all cursor-pointer ${
                isActive
                  ? 'text-[#DFC7A5] border-b-2 border-[#C5A880] bg-[#141820]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative aspect-[4/3] bg-[#141820] border border-[#242A35] hover:border-[#C5A880]/60 overflow-hidden cursor-pointer transition-all duration-300"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Top Category Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] font-medium bg-[#080B0E]/80 backdrop-blur-md text-[#DFC7A5] border border-white/10">
                {item.category}
              </span>
            </div>

            {/* Bottom Caption & Location */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">
                <Compass className="w-3 h-3" />
                <span>{item.locationName}</span>
              </div>
              <h4 className="text-sm font-serif text-white group-hover:text-[#DFC7A5] transition-colors mt-0.5 line-clamp-1">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-1 font-light">
                  {item.caption}
                </p>
              )}
            </div>

            {/* Hover Action Pill */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="p-2 bg-[#080B0E]/80 backdrop-blur-md text-white border border-white/20 inline-flex">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-[#0E1217] border border-white/20 overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Image View */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Modal Info Footer */}
            <div className="p-5 sm:p-6 bg-[#12161E] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono">
                    {activeItem.category} • {activeItem.locationName}
                  </span>
                </div>
                <h3 className="text-lg font-serif text-white mt-1">
                  {activeItem.title}
                </h3>
                {activeItem.caption && (
                  <p className="text-xs text-gray-300 mt-1 font-light">
                    {activeItem.caption}
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2.5 bg-[#1B212B] hover:bg-[#C5A880] hover:text-[#080B0E] text-xs uppercase tracking-widest font-semibold text-white transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
