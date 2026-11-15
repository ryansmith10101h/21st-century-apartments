'use client';

import React from 'react';
import { Quote, ShieldCheck, CheckCircle } from 'lucide-react';
import { REVIEWS } from '@/lib/data/properties';

export default function GuestExperienceSection() {
  return (
    <section className="py-24 bg-[#080B0E] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Guest Perspectives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
              Guest Experience
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl font-light">
              Reflections from international consultants, diaspora families, and business executives who make 21st Century Apartments their residence in Lagos.
            </p>
          </div>

          <div className="text-xs text-gray-400 font-mono self-start md:self-auto">
            4.96/5.0 Overall Guest Satisfaction
          </div>
        </div>

        {/* Quotes Grid with Thin Architectural Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="bg-[#0E1217] border border-[#242A35] p-8 flex flex-col justify-between space-y-6 hover:border-[#C5A880]/40 transition-colors"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#C5A880]/30" />
                <p className="text-sm sm:text-base font-serif text-gray-200 leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-sans font-semibold text-white">
                    {review.author}
                  </h4>
                  <div className="text-xs text-gray-400 font-light">
                    {review.authorRole} • <span className="text-[#C5A880]">{review.authorLocation}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Stay</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
