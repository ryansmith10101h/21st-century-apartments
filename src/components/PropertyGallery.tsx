'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  title: string;
  images: string[];
}

export default function PropertyGallery({ title, images }: PropertyGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setActiveIdx(idx);
  const closeLightbox = () => setActiveIdx(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + images.length) % images.length);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % images.length);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setActiveIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
      if (e.key === 'ArrowRight') setActiveIdx((prev) => (prev !== null ? (prev + 1) % images.length : null));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, images.length]);

  return (
    <>
      {/* Editorial Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 overflow-hidden border border-[#242A35]">
        {/* Main Hero Image */}
        <div
          onClick={() => openLightbox(0)}
          className="md:col-span-2 md:row-span-2 relative aspect-[16/10] md:aspect-auto min-h-[320px] md:min-h-[460px] bg-[#12161E] overflow-hidden group cursor-pointer"
        >
          <Image
            src={images[0]}
            alt={`${title} - Primary Architectural View`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1 bg-[#080B0E]/85 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-mono text-[#DFC7A5] border border-white/10 flex items-center gap-1.5">
              <Maximize2 className="w-3 h-3" />
              <span>View Gallery ({images.length} Photos)</span>
            </span>
          </div>
        </div>

        {/* Secondary Thumbnails */}
        {images.slice(1, 5).map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx + 1)}
            className="relative aspect-[16/10] min-h-[160px] md:min-h-[222px] bg-[#12161E] overflow-hidden group cursor-pointer"
          >
            <Image
              src={img}
              alt={`${title} - Interior Detail ${idx + 2}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="p-1.5 bg-black/70 text-white text-[10px] inline-flex">
                <Maximize2 className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full bg-[#0E1217] border border-white/20 overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Top Bar */}
            <div className="p-4 bg-[#12161E] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                <span className="text-[#C5A880]">{title}</span>
                <span>•</span>
                <span>{activeIdx + 1} of {images.length}</span>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close image viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage with Nav Buttons */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center">
              <Image
                src={images[activeIdx]}
                alt={`${title} - Photo ${activeIdx + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
