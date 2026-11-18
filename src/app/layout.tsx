import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { BUSINESS_CONFIG } from '@/lib/data/business-config';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '21ST CENTURY APARTMENTS | Short-Stay Serviced Apartments | Ikeja • Lekki • Eko Atlantic • Lagos',
    template: '%s | 21ST CENTURY APARTMENTS Lagos',
  },
  description: 'Stay Above Ordinary. Premium short-stay serviced apartments designed for modern Lagos living across Eko Atlantic Boulevard, Victoria Island, Lekki Phase 1, and Ikeja GRA. Guaranteed 24/7 power, Starlink high-speed internet, and private concierge.',
  keywords: [
    'shortlet apartments in Eko Atlantic',
    'serviced apartments Victoria Island',
    'short stay apartments Lagos',
    'luxury apartments Lagos',
    '21st Century Apartments Lagos',
    'shortlet apartments Ikeja GRA',
    'Lekki Phase 1 luxury apartments',
    'serviced penthouses Lagos Nigeria',
    'waterfront shortlet Lagos',
    'business travel apartments Lagos',
  ],
  authors: [{ name: '21ST CENTURY APARTMENTS' }],
  creator: '21ST CENTURY APARTMENTS',
  publisher: '21st Century Serviced Apartments & Hospitality Ltd',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://21st-century-apartments.vercel.app'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    title: '21ST CENTURY APARTMENTS | Stay Above Ordinary',
    description: 'Premium short-stay serviced apartments designed for modern Lagos living across Eko Atlantic, Victoria Island, Lekki, and Ikeja. 24/7 power, Starlink internet, waterfront views.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://21st-century-apartments.vercel.app',
    siteName: '21ST CENTURY APARTMENTS',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: '21ST CENTURY APARTMENTS - Modern Lagos Luxury Living',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '21ST CENTURY APARTMENTS | Stay Above Ordinary',
    description: 'Premium short-stay apartments designed for modern Lagos living. Eko Atlantic Boulevard, Victoria Island, Lekki & Ikeja.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: BUSINESS_CONFIG.name,
    legalName: BUSINESS_CONFIG.legalName,
    description: 'Premium short-stay serviced apartments designed for modern Lagos living in Ikeja, Lekki, Eko Atlantic, and Victoria Island.',
    telephone: BUSINESS_CONFIG.phonePrimary,
    email: BUSINESS_CONFIG.emailPrimary,
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://21st-century-apartments.vercel.app',
    currenciesAccepted: 'NGN, USD, GBP, EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    priceRange: '₦195,000 - ₦580,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_CONFIG.headquarters.address,
      addressLocality: BUSINESS_CONFIG.headquarters.city,
      addressRegion: BUSINESS_CONFIG.headquarters.state,
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.4178,
      longitude: 3.4091,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: '24/7 Uninterrupted Clean Power (Subterranean Grid + Dual CAT Generators)',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Starlink Enterprise Satellite Broadband',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Armed Compound Security & Biometric Elevator Access',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Waterfront Ocean & Marina Balconies',
        value: true,
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#080B0E] text-gray-100 antialiased selection:bg-[#C5A880] selection:text-[#080B0E]">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <MobileStickyCTA />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
