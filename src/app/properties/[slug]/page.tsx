import React from 'react';
import { notFound } from 'next/navigation';
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
  Clock,
  ShieldCheck
} from 'lucide-react';
import PropertyBookingWidget from '@/components/PropertyBookingWidget';
import PropertyCard from '@/components/PropertyCard';
import PropertyGallery from '@/components/PropertyGallery';
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
      title: 'Residence Not Found | 21st Century Apartments Lagos',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://21st-century-apartments.vercel.app';
  const canonicalUrl = `${baseUrl}/properties/${property.slug}`;

  return {
    title: `${property.title} | ${property.neighborhood}, Lagos Serviced Residence`,
    description: `${property.tagline}. ${property.bedrooms} Bed, ${property.bathrooms} Bath executive residence in ${property.neighborhood}, Lagos. Guaranteed 24/7 power, Starlink internet & private concierge.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${property.title} | 21st Century Apartments Lagos`,
      description: property.tagline,
      url: canonicalUrl,
      siteName: '21ST CENTURY APARTMENTS',
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: `${property.title} - Luxury Serviced Apartment in ${property.neighborhood}, Lagos`,
        },
      ],
      locale: 'en_NG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} | ${property.neighborhood}, Lagos`,
      description: property.tagline,
      images: [property.images[0]],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://21st-century-apartments.vercel.app';
  const allProperties = await getProperties();
  const relatedProperties = allProperties
    .filter((p) => p.id !== property.id && (p.neighborhood === property.neighborhood || p.featured))
    .slice(0, 2);

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Residences',
            item: `${baseUrl}/properties`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: property.title,
            item: `${baseUrl}/properties/${property.slug}`,
          },
        ],
      },
      {
        '@type': 'Apartment',
        name: property.title,
        description: property.description,
        url: `${baseUrl}/properties/${property.slug}`,
        image: property.images,
        numberOfRooms: property.bedrooms,
        occupancy: {
          '@type': 'QuantitativeValue',
          maxValue: property.maxGuests,
        },
        floorSize: {
          '@type': 'QuantitativeValue',
          value: property.squareMeters,
          unitCode: 'MTK',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: property.address,
          addressLocality: property.neighborhood,
          addressRegion: 'Lagos State',
          addressCountry: 'NG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng,
        },
        offers: {
          '@type': 'Offer',
          price: property.pricePerNight,
          priceCurrency: 'NGN',
          availability: property.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          validFrom: new Date().toISOString().split('T')[0],
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: property.pricePerNight,
            priceCurrency: 'NGN',
            unitText: 'night',
          },
        },
        amenityFeature: property.amenities.map((amenity) => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity,
          value: true,
        })),
      },
    ],
  };

  return (
    <div className="bg-[#080B0E] py-8 sm:py-12 min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-mono">
          <Link href="/" className="hover:text-[#DFC7A5] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/properties" className="hover:text-[#DFC7A5] transition-colors">Residences</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#DFC7A5] truncate">{property.title}</span>
        </nav>

        {/* Top Title & Location Bar */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#141820] text-[#DFC7A5] border border-white/15">
                {property.neighborhood}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                <Zap className="w-3 h-3 fill-emerald-400" />
                <span>24/7 Power Warranty</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              {property.title}
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-1.5 font-light">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#141820] hover:bg-[#1B222C] text-xs font-semibold text-gray-200 border border-white/10 transition-colors uppercase tracking-wider font-mono"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Google Maps</span>
            </a>

            <a
              href={generateWhatsAppGeneralLink(`Inquiry for ${property.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#141820] hover:bg-[#1B222C] text-xs font-semibold text-emerald-400 border border-emerald-500/30 transition-colors uppercase tracking-wider font-mono"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </header>

        {/* Interactive Image Gallery with Lightbox */}
        <PropertyGallery title={property.title} images={property.images} />

        {/* Main Content & Sticky Booking Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left 2 Columns: Description, Amenities, Specs, Rules */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#0E1217] border border-[#242A35] text-center font-mono">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Bedrooms</span>
                <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-medium text-white">
                  <Bed className="w-4 h-4 text-[#C5A880]" />
                  <span>{property.bedrooms} Ensuite</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Bathrooms</span>
                <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-medium text-white">
                  <Bath className="w-4 h-4 text-[#C5A880]" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Max Occupancy</span>
                <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-medium text-white">
                  <Users className="w-4 h-4 text-[#C5A880]" />
                  <span>{property.maxGuests} Guests</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Living Area</span>
                <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-medium text-white">
                  <Maximize className="w-4 h-4 text-[#C5A880]" />
                  <span>{property.squareMeters} m²</span>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-white border-l-2 border-[#C5A880] pl-3">
                Residence Overview
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {property.description}
              </p>
            </section>

            {/* Key Features */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-white border-l-2 border-[#C5A880] pl-3">
                Architectural Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="p-5 bg-[#0E1217] border border-[#242A35] space-y-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#DFC7A5] font-mono">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities Grid */}
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-white border-l-2 border-[#C5A880] pl-3">
                Confirmed Amenities & Hospitality Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 bg-[#0E1217] border border-white/5 text-xs text-gray-200">
                    <div className="w-5 h-5 bg-[#182028] text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* House Rules & Guest Guidelines */}
            <section className="space-y-4 p-6 bg-[#0E1217] border border-[#242A35]">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-4 h-4 text-[#C5A880]" />
                <h3 className="text-base font-serif font-bold">House Policies & Access Protocol</h3>
              </div>
              <ul className="space-y-2 text-xs text-gray-300 font-light">
                {property.houseRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C5A880] font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 font-mono">
                <span>Check-in: <strong className="text-white">{property.checkInTime}</strong></span>
                <span>Check-out: <strong className="text-white">{property.checkOutTime}</strong></span>
                <span>Caution Deposit: <strong className="text-[#DFC7A5]">{formatNaira(property.cautionDeposit)} (Refundable)</strong></span>
              </div>
            </section>

            {/* Location & Neighborhood Map Note */}
            <section className="space-y-4 p-6 bg-[#0E1217] border border-[#242A35]">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <h3 className="text-base font-serif font-bold">Arrival & Neighborhood Security</h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Located at <strong>{property.address}</strong>. Confirmed guests receive secure compound clearance codes via WhatsApp 2 hours prior to arrival. Our 24/7 on-site concierge desk is stationed at the property entrance to handle welcoming and baggage protocol.
              </p>
              <div className="pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[#DFC7A5] font-semibold uppercase tracking-wider hover:underline font-mono"
                >
                  <span>Open Directions in Google Maps</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking / Availability Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <PropertyBookingWidget property={property} />

              {/* Direct Call Concierge Card */}
              <div className="p-5 bg-[#0E1217] border border-[#242A35] text-center space-y-3">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Corporate Invoicing & Tailored Stays</span>
                </div>
                <p className="text-xs text-gray-400 font-light">
                  Need custom monthly rates, multi-suite corporate bookings, or embassy security protocols?
                </p>
                <a
                  href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#141820] hover:bg-[#1B222C] text-xs font-semibold text-white border border-white/10 hover:border-[#C5A880] transition-colors font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Call Concierge Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Residences */}
        {relatedProperties.length > 0 && (
          <section className="pt-20 border-t border-white/10 mt-20 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">Discover More</span>
                <h2 className="text-2xl font-serif text-white mt-1">
                  Similar Luxury Residences in Lagos
                </h2>
              </div>
              <Link
                href="/properties"
                className="text-xs font-semibold uppercase tracking-widest text-[#DFC7A5] hover:text-white transition-colors"
              >
                View All Residences →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
