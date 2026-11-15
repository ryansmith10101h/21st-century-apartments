import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Users, 
  Maximize, 
  Zap, 
  Check, 
  ChevronRight, 
  Phone, 
  MessageCircle,
  Clock
} from 'lucide-react';
import PropertyBookingWidget from '@/components/PropertyBookingWidget';
import PropertyCard from '@/components/PropertyCard';
import { getPropertyBySlug, getProperties } from '@/lib/data/store';
import { formatNaira, BUSINESS_CONFIG, generateWhatsAppGeneralLink } from '@/lib/data/business-config';
import type { Metadata } from 'next';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Residence Not Found | 21st Century Luxury Living',
    };
  }

  return {
    title: `${property.title} - ${property.neighborhood}, Lagos`,
    description: `${property.tagline}. ${property.bedrooms} Bedrooms, ${property.bathrooms} Baths in ${property.location}. Guaranteed 24/7 Power, Starlink WiFi & Armed Security.`,
    openGraph: {
      title: `${property.title} | 21st Century Luxury Residences Lagos`,
      description: property.tagline,
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const allProperties = await getProperties();
  const relatedProperties = allProperties
    .filter((p) => p.id !== property.id)
    .slice(0, 2);

  return (
    <div className="bg-[#080B0E] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
          <Link href="/" className="hover:text-[#DFC7A5]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/properties" className="hover:text-[#DFC7A5]">Residences</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#DFC7A5] truncate">{property.title}</span>
        </nav>

        {/* Top Title & Location Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#182028] text-[#DFC7A5] border border-[#C5A880]/30">
                {property.neighborhood}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                <Zap className="w-3.5 h-3.5" />
                <span>24/7 Power Guaranteed</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {property.title}
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#12171D] hover:bg-[#182028] text-xs font-semibold text-gray-200 border border-white/10 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Google Maps</span>
            </a>

            <a
              href={generateWhatsAppGeneralLink(`Inquiry for ${property.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#12171D] hover:bg-[#182028] text-xs font-semibold text-emerald-400 border border-emerald-500/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask Concierge</span>
            </a>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 rounded-3xl overflow-hidden">
          {/* Main Large Image */}
          <div className="md:col-span-2 md:row-span-2 relative aspect-[16/10] md:aspect-auto min-h-[320px] md:min-h-[480px] bg-gray-900 overflow-hidden group">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Secondary Thumbnails */}
          {property.images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="relative aspect-[16/10] min-h-[160px] md:min-h-[232px] bg-gray-900 overflow-hidden group">
              <Image
                src={img}
                alt={`${property.title} view ${idx + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>

        {/* Main Content & Sticky Booking Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left 2 Columns: Description, Amenities, Specs, Rules */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#12171D] border border-white/10 text-center">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Bedrooms</span>
                <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-serif font-bold text-white">
                  <Bed className="w-4 h-4 text-[#C5A880]" />
                  <span>{property.bedrooms} Ensuite</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Bathrooms</span>
                <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-serif font-bold text-white">
                  <Bath className="w-4 h-4 text-[#C5A880]" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Capacity</span>
                <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-serif font-bold text-white">
                  <Users className="w-4 h-4 text-[#C5A880]" />
                  <span>Up to {property.maxGuests} Guests</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Floor Space</span>
                <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-serif font-bold text-white">
                  <Maximize className="w-4 h-4 text-[#C5A880]" />
                  <span>{property.squareMeters} m²</span>
                </div>
              </div>
            </div>

            {/* About the Residence */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white border-l-3 border-[#C5A880] pl-3">
                About this Residence
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white border-l-3 border-[#C5A880] pl-3">
                Residence Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#12171D] border border-white/5 space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC7A5]">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white border-l-3 border-[#C5A880] pl-3">
                Included Amenities & Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#12171D]/60 border border-white/5 text-xs text-gray-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules & Guest Guidelines */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#12171D] border border-white/10">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-[#C5A880]" />
                <h3 className="text-base font-serif font-bold">House Rules & Check-In Policies</h3>
              </div>
              <ul className="space-y-2 text-xs text-gray-300">
                {property.houseRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C5A880] font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400">
                <span>Check-in: <strong className="text-white">{property.checkInTime}</strong></span>
                <span>Check-out: <strong className="text-white">{property.checkOutTime}</strong></span>
                <span>Caution Deposit: <strong className="text-[#DFC7A5]">{formatNaira(property.cautionDeposit)} (Refundable)</strong></span>
              </div>
            </div>

            {/* Location & Neighborhood Map Note */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#12171D] border border-white/10">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-[#C5A880]" />
                <h3 className="text-base font-serif font-bold">Neighborhood & Security Clearance</h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Located at <strong>{property.address}</strong>. Guests receive estate gatehouse security access codes via WhatsApp 2 hours prior to arrival. Our 24/7 reception desk will be on-site to assist with your check-in.
              </p>
              <div className="pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[#DFC7A5] font-semibold uppercase tracking-wider hover:underline"
                >
                  <span>Open Directions in Google Maps</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <PropertyBookingWidget property={property} />

              {/* Direct Call Concierge Card */}
              <div className="p-5 rounded-2xl bg-[#0F141A] border border-white/10 text-center space-y-3">
                <p className="text-xs text-gray-400">Have customized or corporate invoicing questions?</p>
                <a
                  href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#182028] text-xs font-semibold text-white border border-white/10 hover:border-[#C5A880] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Call Concierge: {BUSINESS_CONFIG.phonePrimary}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Related Residences */}
        {relatedProperties.length > 0 && (
          <div className="pt-20 border-t border-white/10 mt-20 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-white">
                Similar Luxury Residences
              </h2>
              <Link href="/properties" className="text-xs font-semibold uppercase tracking-widest text-[#DFC7A5] hover:text-white">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
