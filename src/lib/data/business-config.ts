import { BusinessConfig } from '../types';

export const BUSINESS_CONFIG: BusinessConfig = {
  name: '21ST CENTURY APARTMENTS',
  legalName: '21st Century Serviced Apartments & Hospitality Ltd',
  tagline: '21st Century Apartments in | Ikeja | Lekki | Eko Atlantic | Lagos',
  phonePrimary: '+234 817 611 5993',
  phoneSecondary: '+234 817 611 5993',
  whatsappNumber: '2348176115993',
  whatsappDisplay: '+234 817 611 5993',
  emailPrimary: 'reservations@21stcenturyapartments.ng',
  emailConcierge: 'concierge@21stcenturyapartments.ng',
  currency: 'NGN',
  currencySymbol: '₦',
  headquarters: {
    address: 'Eko Atlantic Boulevard, Victoria Island / Eti-Osa',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
  },
  officeLocations: [
    {
      name: 'Eko Atlantic Flagship Tower',
      address: 'Eko Atlantic Boulevard, Victoria Island / Eti-Osa, Lagos',
      phone: '+234 817 611 5993',
    },
    {
      name: 'Victoria Island Executive Desk',
      address: 'Ahmadu Bello Way / Walter Carrington, Victoria Island, Lagos',
      phone: '+234 817 611 5993',
    },
    {
      name: 'Lekki Phase 1 Waterfront Desk',
      address: 'Admiralty Way, Lekki Phase 1, Lagos',
      phone: '+234 817 611 5993',
    },
    {
      name: 'Ikeja GRA Diplomatic Residence Desk',
      address: 'Isaac John Street, GRA Ikeja, Lagos',
      phone: '+234 817 611 5993',
    },
  ],
  bankDetails: [
    {
      bankName: 'Zenith Bank PLC',
      accountName: '21st Century Serviced Apartments Ltd',
      accountNumber: '1018942100',
    },
    {
      bankName: 'Guaranty Trust Bank (GTBank)',
      accountName: '21st Century Serviced Apartments Ltd',
      accountNumber: '0238491210',
    },
  ],
  socials: {
    instagram: 'https://instagram.com/21stcenturyapartments',
    twitter: 'https://twitter.com/21stcentury_ng',
    linkedin: 'https://linkedin.com/company/21st-century-apartments',
    facebook: 'https://facebook.com/21stcenturyapartments',
  },
};

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦');
}

export function generateWhatsAppBookingLink(
  propertyTitle: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  totalNaira?: string
): string {
  const text = encodeURIComponent(
    `Hello 21st Century Apartments,\n\nI would like to inquire about booking:\n🏙️ *${propertyTitle}*\n📅 Check-in: ${checkIn || 'To be decided'}\n📅 Check-out: ${checkOut || 'To be decided'}\n👥 Guests: ${guests}\n${totalNaira ? `💰 Estimated Total: ${totalNaira}\n` : ''}\nPlease confirm availability and booking procedure.`
  );
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${text}`;
}

export function generateWhatsAppGeneralLink(inquiryTopic: string = 'General Inquiry'): string {
  const text = encodeURIComponent(
    `Hello 21st Century Apartments Concierge,\n\nI am contacting you regarding: *${inquiryTopic}*.\nI would like to inquire about short-stay apartment availability in Lagos.`
  );
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${text}`;
}

export const GOOGLE_MAPS_DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=Eko+Atlantic+Boulevard+Victoria+Island+Lagos+Nigeria';
