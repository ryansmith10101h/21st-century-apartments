import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ChevronRight, CheckCircle2, Phone, MessageCircle, ArrowRight, Compass } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { getLocationHubBySlug, getLocationHubs, getPropertiesByNeighborhood } from '@/lib/data/store';
import { BUSINESS_CONFIG, generateWhatsAppGeneralLink } from '@/lib/data/business-config';
import type { Metadata } from 'next';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const hubs = await getLocationHubs();
  return hubs.map((hub) => ({ slug: hub.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = await getLocationHubBySlug(slug);

  if (!hub) {
    return {
      title: 'Location Not Found | 21st Century Apartments Lagos',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://21st-century-apartments.vercel.app';
  const canonicalUrl = `${baseUrl}/locations/${hub.slug}`;

  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      url: canonicalUrl,
      siteName: '21ST CENTURY APARTMENTS',
      images: [
        {
          url: hub.image,
          width: 1200,
          height: 630,
          alt: `${hub.title} - Serviced Apartments in Lagos`,
        },
      ],
      locale: 'en_NG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: hub.metaTitle,
      description: hub.metaDescription,
      images: [hub.image],
    },
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const hub = await getLocationHubBySlug(slug);

  if (!hub) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://21st-century-apartments.vercel.app';
  const residences = await getPropertiesByNeighborhood(hub.neighborhood);
  const allHubs = await getLocationHubs();
  const otherHubs = allHubs.filter((h) => h.slug !== hub.slug);

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
            name: 'Locations',
            item: `${baseUrl}/#location`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: hub.title,
            item: `${baseUrl}/locations/${hub.slug}`,
          },
        ],
      },
      {
        '@type': 'Place',
        name: hub.title,
        description: hub.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: hub.address,
          addressLocality: 'Lagos',
          addressRegion: 'Lagos State',
          addressCountry: 'NG',
        },
      },
      {
        '@type': 'ItemList',
        name: `Serviced Residences in ${hub.title}`,
        itemListElement: residences.map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Apartment',
            name: p.title,
            url: `${baseUrl}/properties/${p.slug}`,
          },
        })),
      },
    ],
  };

  return (
    <div className="py-12 bg-[#080B0E] min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <Link href="/" className="hover:text-[#DFC7A5] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/#location" className="hover:text-[#DFC7A5] transition-colors">Locations</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#DFC7A5]">{hub.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141820] border border-[#C5A880]/30 text-[10px] uppercase tracking-[0.2em] text-[#DFC7A5] font-mono">
              <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{hub.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
              {hub.title}
            </h1>

            <p className="text-base sm:text-lg text-[#DFC7A5] font-light leading-relaxed">
              {hub.tagline}
            </p>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              {hub.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono">
              <a
                href={generateWhatsAppGeneralLink(`Inquiry for residences in ${hub.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#141820] hover:bg-[#1B222C] text-emerald-400 text-xs uppercase tracking-wider font-semibold border border-emerald-500/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Concierge Desk</span>
              </a>

              <a
                href={`tel:${BUSINESS_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#141820] hover:bg-[#1B222C] text-gray-300 hover:text-white text-xs uppercase tracking-wider font-semibold border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{BUSINESS_CONFIG.phonePrimary}</span>
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] bg-[#141820] border border-[#242A35] overflow-hidden">
            <Image
              src={hub.image}
              alt={`${hub.title} Architectural Location View`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#080B0E]/90 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-1.5 text-[10px] text-[#DFC7A5] uppercase tracking-widest font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Official Location Desk</span>
              </div>
              <p className="text-xs text-white mt-1 font-mono">{hub.address}</p>
            </div>
          </div>
        </div>

        {/* District Infrastructure & Advantages */}
        <section className="space-y-6 pt-6 border-t border-white/10">
          <h2 className="text-2xl font-serif text-white">
            District Infrastructure & Security Clearances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hub.advantages.map((adv, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-[#0E1217] border border-[#242A35]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-gray-300 font-light leading-relaxed">{adv}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Available Residences in this District */}
        <section className="space-y-8 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                {hub.neighborhood} Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                Serviced Residences in {hub.neighborhood}
              </h2>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#DFC7A5] hover:text-white transition-colors"
            >
              <span>View All Lagos Suites</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {residences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {residences.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-[#0E1217] border border-white/10 text-center space-y-3">
              <p className="text-xs text-gray-400">
                Residences in this district are currently on executive hold. Please contact our concierge for unlisted off-market penthouses.
              </p>
              <Link
                href="/properties"
                className="inline-block px-5 py-2.5 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-wider"
              >
                Browse All Suites
              </Link>
            </div>
          )}
        </section>

        {/* Other Lagos Hubs Navigation */}
        <section className="pt-12 border-t border-white/10 space-y-6">
          <h2 className="text-xl font-serif text-white">
            Explore Other Lagos Districts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherHubs.map((other) => (
              <Link
                key={other.slug}
                href={`/locations/${other.slug}`}
                className="p-5 bg-[#0E1217] border border-[#242A35] hover:border-[#C5A880]/60 transition-colors space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">
                    {other.badge}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-serif text-white group-hover:text-[#DFC7A5] transition-colors">
                  {other.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 font-light">
                  {other.tagline}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
