import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building } from 'lucide-react';
import PropertiesCatalog from '@/components/PropertiesCatalog';
import { getProperties } from '@/lib/data/store';

export const metadata: Metadata = {
  title: 'Luxury Serviced Residences & Penthouses | Lagos | 21st Century Apartments',
  description: 'Explore verified luxury short-stay serviced apartments and penthouses in Lagos across Eko Atlantic Boulevard, Victoria Island, Lekki Phase 1, and Ikeja GRA. 24/7 power, high-speed Starlink WiFi, and dedicated concierge.',
  alternates: {
    canonical: '/properties',
  },
  openGraph: {
    title: 'Luxury Serviced Residences in Lagos | 21st Century Apartments',
    description: 'Explore verified luxury short-stay serviced apartments across Eko Atlantic Boulevard, Victoria Island, Lekki, and Ikeja GRA.',
    url: '/properties',
    siteName: '21ST CENTURY APARTMENTS',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: '21st Century Luxury Serviced Apartments in Lagos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Serviced Residences in Lagos | 21st Century Apartments',
    description: 'Verified luxury short-stay apartments across Eko Atlantic, Victoria Island, Lekki, and Ikeja GRA.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
};

interface PropertiesPageProps {
  searchParams?: Promise<{
    location?: string;
    bedrooms?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const properties = await getProperties();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://21st-century-apartments.vercel.app';

  // Schema.org ItemList for Rich Search Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Luxury Serviced Apartments in Lagos',
    description: 'Verified executive short-stay residences across Eko Atlantic, Victoria Island, Lekki, and Ikeja GRA.',
    numberOfItems: properties.length,
    itemListElement: properties.map((property, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Apartment',
        name: property.title,
        description: property.tagline,
        url: `${baseUrl}/properties/${property.slug}`,
        image: property.images[0],
        numberOfRooms: property.bedrooms,
        occupancy: {
          '@type': 'QuantitativeValue',
          maxValue: property.maxGuests,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: property.address,
          addressLocality: 'Lagos',
          addressRegion: 'Lagos State',
          addressCountry: 'NG',
        },
        offers: {
          '@type': 'Offer',
          price: property.pricePerNight,
          priceCurrency: 'NGN',
          availability: property.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          validFrom: new Date().toISOString().split('T')[0],
        },
      },
    })),
  };

  return (
    <div className="py-12 bg-[#080B0E] min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-[#DFC7A5] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#DFC7A5]">Residences</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">
            <Building className="w-3.5 h-3.5" />
            <span>Curated Portfolio • Lagos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight">
            Luxury Serviced Residences <br />
            <span className="italic font-normal text-gray-400">across Lagos.</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-300 font-light leading-relaxed">
            Positioned in four premier districts: Eko Atlantic Boulevard, Victoria Island, Lekki Phase 1, and Ikeja GRA. Engineered for executive business transit, diaspora returns, and diplomatic privacy with continuous 24/7 power and dedicated concierge.
          </p>

          {/* District Quick Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-gray-500">Explore Hubs:</span>
            <Link href="/locations/eko-atlantic" className="text-[#DFC7A5] hover:underline">Eko Atlantic</Link>
            <span className="text-gray-600">•</span>
            <Link href="/locations/victoria-island" className="text-[#DFC7A5] hover:underline">Victoria Island</Link>
            <span className="text-gray-600">•</span>
            <Link href="/locations/lekki" className="text-[#DFC7A5] hover:underline">Lekki Phase 1</Link>
            <span className="text-gray-600">•</span>
            <Link href="/locations/ikeja" className="text-[#DFC7A5] hover:underline">Ikeja GRA</Link>
          </div>
        </header>

        {/* Interactive Catalog Component with Pre-rendered Properties */}
        <PropertiesCatalog
          initialProperties={properties}
          initialLocation={resolvedParams?.location}
          initialBedrooms={resolvedParams?.bedrooms}
        />
      </div>
    </div>
  );
}
