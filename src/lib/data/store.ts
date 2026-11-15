import { Property, BookingRequest, GalleryItem, ContactMessage } from '../types';
import { INITIAL_PROPERTIES, GALLERY_ITEMS } from './properties';
import { supabase, isSupabaseConfigured } from '../supabase/client';

// In-memory fallback stores
let mockBookingRequests: BookingRequest[] = [
  {
    id: 'REQ-2026-9812',
    propertyId: 'prop-eko-atlantic-oceanfront-penthouse',
    propertyTitle: 'The Eko Atlantic Oceanfront Penthouse',
    guestName: 'Engr. Tayo Adeleke',
    guestEmail: 'tayo.adeleke@energycap.ng',
    guestPhone: '+234 817 611 5993',
    checkInDate: '2026-11-20',
    checkOutDate: '2026-11-25',
    guestCount: 4,
    apartmentType: 'Oceanfront Penthouse (4-Bed)',
    estimatedTotal: 2900000,
    notes: 'Require Starlink verified 280+ Mbps bandwidth and airport protocol from MMIA.',
    status: 'confirmed',
    createdAt: '2026-10-15T14:30:00Z',
  },
  {
    id: 'REQ-2026-9813',
    propertyId: 'prop-vi-walter-carrington-diplomatic',
    propertyTitle: 'The Walter Carrington Diplomatic Residence',
    guestName: 'Mrs. Somto Okoye',
    guestEmail: 'somto.okoye@investcorp.com',
    guestPhone: '+234 818 999 1122',
    checkInDate: '2026-11-28',
    checkOutDate: '2026-12-02',
    guestCount: 3,
    apartmentType: 'Diplomatic Residence (3-Bed)',
    estimatedTotal: 1560000,
    notes: 'Diplomatic delegation visit. Quiet executive stay required.',
    status: 'contacted',
    createdAt: '2026-10-18T09:15:00Z',
  },
  {
    id: 'REQ-2026-9814',
    propertyId: 'prop-ikeja-gra-diplomatic-residence',
    propertyTitle: 'The Isaac John Presidential Residence',
    guestName: 'David O. Mensah',
    guestEmail: 'david.mensah@fintechafrica.com',
    guestPhone: '+234 803 555 0192',
    checkInDate: '2026-12-05',
    checkOutDate: '2026-12-10',
    guestCount: 2,
    apartmentType: 'Presidential Residence (3-Bed)',
    estimatedTotal: 1600000,
    notes: 'Airport proximity stay. Transit schedule.',
    status: 'pending',
    createdAt: '2026-10-20T11:00:00Z',
  },
];

const mockContactMessages: ContactMessage[] = [
  {
    id: 'MSG-001',
    name: 'Chief Babatunde Alabi',
    email: 'babatunde@alabicapital.com',
    phone: '+234 802 333 4455',
    subject: 'Corporate Extended Stay Enquiry - Eko Atlantic',
    message: 'We require a 2-month executive serviced apartment in Eko Atlantic for our incoming international directors starting next month. Please share long-term rates.',
    status: 'read',
    createdAt: '2026-10-19T16:40:00Z',
  },
];

const mockGalleryItems: GalleryItem[] = [...GALLERY_ITEMS];
let mockProperties: Property[] = [...INITIAL_PROPERTIES];

// Properties Fetching
export async function getProperties(): Promise<Property[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as Property[];
      }
    } catch (err) {
      console.warn('Supabase properties fetch fallback to local data:', err);
    }
  }
  return mockProperties;
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('properties').select('*').eq('slug', slug).single();
      if (!error && data) {
        return data as Property;
      }
    } catch (err) {
      console.warn('Supabase single property fetch fallback:', err);
    }
  }
  const prop = mockProperties.find((p) => p.slug === slug);
  return prop || null;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const all = await getProperties();
  return all.filter((p) => p.featured);
}

// Booking Requests Management
export async function getBookingRequests(): Promise<BookingRequest[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data as BookingRequest[];
      }
    } catch (err) {
      console.warn('Supabase booking requests fetch fallback:', err);
    }
  }
  return mockBookingRequests;
}

export async function createBookingRequest(requestData: Omit<BookingRequest, 'id' | 'createdAt'>): Promise<{ success: boolean; data?: BookingRequest; error?: string }> {
  const newRequest: BookingRequest = {
    ...requestData,
    id: `REQ-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .insert([
          {
            property_id: newRequest.propertyId || null,
            property_title: newRequest.propertyTitle,
            guest_name: newRequest.guestName,
            guest_email: newRequest.guestEmail,
            guest_phone: newRequest.guestPhone,
            check_in_date: newRequest.checkInDate,
            check_out_date: newRequest.checkOutDate,
            guest_count: newRequest.guestCount,
            apartment_type: newRequest.apartmentType,
            estimated_total: newRequest.estimatedTotal,
            notes: newRequest.notes,
            status: newRequest.status,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        return { success: true, data: data as BookingRequest };
      }
    } catch (err: unknown) {
      console.warn('Supabase insert failed, saving to memory fallback:', err);
    }
  }

  mockBookingRequests.unshift(newRequest);
  return { success: true, data: newRequest };
}

export async function updateBookingRequestStatus(id: string, status: BookingRequest['status']): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('booking_requests').update({ status }).eq('id', id);
    } catch (err) {
      console.warn('Supabase update failed:', err);
    }
  }

  mockBookingRequests = mockBookingRequests.map((b) => (b.id === id ? { ...b, status } : b));
  return true;
}

// Contact Messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as ContactMessage[];
    } catch (err) {
      console.warn('Supabase messages fallback:', err);
    }
  }
  return mockContactMessages;
}

export async function createContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<{ success: boolean; data?: ContactMessage }> {
  const newMsg: ContactMessage = {
    ...msg,
    id: `MSG-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('contact_messages').insert([msg]).select().single();
      if (!error && data) return { success: true, data: data as ContactMessage };
    } catch (err) {
      console.warn('Supabase message create fallback:', err);
    }
  }

  mockContactMessages.unshift(newMsg);
  return { success: true, data: newMsg };
}

// Gallery Management
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('gallery').select('*').eq('is_active', true).order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as GalleryItem[];
      }
    } catch (err) {
      console.warn('Supabase gallery fetch fallback:', err);
    }
  }
  return mockGalleryItems;
}

export async function addGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
  const newItem: GalleryItem = {
    ...item,
    id: `gal-${Date.now()}`,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('gallery').insert([item]);
    } catch (err) {
      console.warn('Supabase gallery insert fallback:', err);
    }
  }

  mockGalleryItems.push(newItem);
  return newItem;
}

// Property Mutations for Admin
export async function updatePropertyAvailability(id: string, isAvailable: boolean): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('properties').update({ is_available: isAvailable }).eq('id', id);
    } catch (err) {
      console.warn(err);
    }
  }
  mockProperties = mockProperties.map((p) => (p.id === id ? { ...p, isAvailable } : p));
  return true;
}

export async function updatePropertyPrice(id: string, pricePerNight: number): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('properties').update({ price_per_night: pricePerNight }).eq('id', id);
    } catch (err) {
      console.warn(err);
    }
  }
  mockProperties = mockProperties.map((p) => (p.id === id ? { ...p, pricePerNight } : p));
  return true;
}

export async function createProperty(prop: Omit<Property, 'id'>): Promise<Property> {
  const newProp: Property = {
    ...prop,
    id: `prop-${Date.now()}`,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('properties').insert([newProp]);
    } catch (err) {
      console.warn(err);
    }
  }

  mockProperties.unshift(newProp);
  return newProp;
}
