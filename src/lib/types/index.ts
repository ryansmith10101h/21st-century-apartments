export type Neighborhood = 'Eko Atlantic' | 'Victoria Island' | 'Lekki' | 'Ikeja' | 'Ikoyi';

export type GalleryCategory = 
  | 'architecture' 
  | 'interiors' 
  | 'bedrooms' 
  | 'living spaces' 
  | 'kitchens' 
  | 'views' 
  | 'amenities' 
  | 'lifestyle';

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  neighborhood: Neighborhood;
  address: string;
  pricePerNight: number; // in NGN
  discountedWeeklyRate?: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  squareMeters: number;
  featured: boolean;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  cautionDeposit: number; // Refundable deposit in NGN
  cleaningFee: number;
  images: string[];
  floorPlanImage?: string;
  videoTourUrl?: string;
  amenities: string[];
  keyFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
  houseRules: string[];
  checkInTime: string;
  checkOutTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  floor: number;
  viewType: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertySlug: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  guestCount: number;
  pricePerNight: number;
  subtotal: number;
  cautionDeposit: number;
  serviceFee: number;
  totalAmount: number;
  paymentMethod: 'bank_transfer' | 'paystack' | 'cash_on_arrival';
  paymentStatus: 'pending' | 'verified' | 'paid' | 'cancelled';
  bookingStatus: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  specialRequests?: string;
  airportPickupRequired?: boolean;
  privateChefRequired?: boolean;
  createdAt: string;
}

export interface BookingRequest {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  apartmentType?: string;
  estimatedTotal?: number;
  notes?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'declined';
  createdAt: string;
}

export interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: 'shortlet_booking' | 'corporate_stay' | 'relocation' | 'executive_stay' | 'vip_concierge';
  preferredLocation?: string;
  preferredDates?: string;
  budget?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  locationName: string;
  caption?: string;
}

export interface AmenityCategory {
  category: string;
  items: {
    name: string;
    icon: string;
    description?: string;
  }[];
}

export interface Review {
  id: string;
  propertyId: string;
  author: string;
  authorRole?: string;
  authorLocation: string;
  rating: number;
  date: string;
  comment: string;
  verifiedStay: boolean;
}

export interface BusinessConfig {
  name: string;
  legalName: string;
  tagline: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  emailPrimary: string;
  emailConcierge: string;
  currency: string;
  currencySymbol: string;
  headquarters: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  officeLocations: {
    name: string;
    address: string;
    phone: string;
  }[];
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  }[];
  socials: {
    instagram: string;
    twitter: string;
    linkedin: string;
    facebook: string;
  };
}
