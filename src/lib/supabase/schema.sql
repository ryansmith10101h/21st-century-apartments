-- ==============================================================================
-- 21ST CENTURY APARTMENTS - PRODUCTION SUPABASE DATABASE SCHEMA (POSTGRESQL)
-- Locations: Ikeja | Lekki | Eko Atlantic | Lagos
-- Headquarters: Eko Atlantic Boulevard, Victoria Island / Eti-Osa, Lagos, Nigeria
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL, -- 'Eko Atlantic', 'Victoria Island', 'Lekki', 'Ikeja', 'Ikoyi'
    address TEXT NOT NULL,
    price_per_night NUMERIC(12, 2) NOT NULL,
    discounted_weekly_rate NUMERIC(12, 2),
    bedrooms INTEGER NOT NULL DEFAULT 1,
    bathrooms NUMERIC(3, 1) NOT NULL DEFAULT 1.0,
    max_guests INTEGER NOT NULL DEFAULT 2,
    square_meters INTEGER,
    featured BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    caution_deposit NUMERIC(12, 2) DEFAULT 50000,
    cleaning_fee NUMERIC(12, 2) DEFAULT 15000,
    images JSONB DEFAULT '[]'::jsonb,
    amenities JSONB DEFAULT '[]'::jsonb,
    key_features JSONB DEFAULT '[]'::jsonb,
    house_rules JSONB DEFAULT '[]'::jsonb,
    check_in_time VARCHAR(20) DEFAULT '2:00 PM',
    check_out_time VARCHAR(20) DEFAULT '11:00 AM',
    coordinates JSONB DEFAULT '{"lat": 6.4178, "lng": 3.4091}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. UNITS TABLE
CREATE TABLE IF NOT EXISTS public.units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    unit_number VARCHAR(50) NOT NULL,
    floor INTEGER DEFAULT 1,
    view_type VARCHAR(100), -- 'Ocean View', 'Marina Promenade', 'Skyline', 'Garden'
    status VARCHAR(50) DEFAULT 'available', -- 'available', 'occupied', 'maintenance', 'reserved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. AMENITIES TABLE
CREATE TABLE IF NOT EXISTS public.amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Power & Utilities', 'Connectivity', 'Security', 'Wellness', 'Culinary'
    icon VARCHAR(50) DEFAULT 'Check',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS public.availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    is_available BOOLEAN DEFAULT true,
    custom_price NUMERIC(12, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(property_id, date)
);

-- 5. BOOKING_REQUESTS TABLE (formerly bookings / request availability)
CREATE TABLE IF NOT EXISTS public.booking_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    property_title VARCHAR(255),
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    guest_count INTEGER NOT NULL DEFAULT 1,
    apartment_type VARCHAR(100),
    total_nights INTEGER NOT NULL DEFAULT 1,
    price_per_night NUMERIC(12, 2) DEFAULT 0,
    estimated_total NUMERIC(12, 2) DEFAULT 0,
    payment_method VARCHAR(50) DEFAULT 'bank_transfer',
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'verified', 'paid', 'cancelled'
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'contacted', 'confirmed', 'declined'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'architecture', 'interiors', 'bedrooms', 'living spaces', 'kitchens', 'views', 'amenities', 'lifestyle'
    image_url TEXT NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    caption TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. CONTACT_MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread', -- 'unread', 'read', 'replied'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Properties: Public read access, Admin write
CREATE POLICY "Public properties are viewable by everyone" 
ON public.properties FOR SELECT USING (true);

CREATE POLICY "Authenticated admins can modify properties" 
ON public.properties FOR ALL USING (auth.role() = 'authenticated');

-- Units: Public read access, Admin write
CREATE POLICY "Public units are viewable by everyone" 
ON public.units FOR SELECT USING (true);

CREATE POLICY "Authenticated admins can manage units" 
ON public.units FOR ALL USING (auth.role() = 'authenticated');

-- Amenities: Public read access
CREATE POLICY "Public amenities are viewable by everyone" 
ON public.amenities FOR SELECT USING (true);

-- Availability: Public read access
CREATE POLICY "Public availability is viewable by everyone" 
ON public.availability FOR SELECT USING (true);

CREATE POLICY "Authenticated admins can manage availability" 
ON public.availability FOR ALL USING (auth.role() = 'authenticated');

-- Booking Requests: Anyone can submit a booking request, admins can view/manage
CREATE POLICY "Anyone can create a booking request" 
ON public.booking_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated admins can view booking requests" 
ON public.booking_requests FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins can update booking requests" 
ON public.booking_requests FOR UPDATE USING (auth.role() = 'authenticated');

-- Gallery: Public read access, Admin write
CREATE POLICY "Public gallery is viewable by everyone" 
ON public.gallery FOR SELECT USING (true);

CREATE POLICY "Authenticated admins can manage gallery" 
ON public.gallery FOR ALL USING (auth.role() = 'authenticated');

-- Contact Messages: Anyone can send a message, admins can view/manage
CREATE POLICY "Anyone can submit a contact message" 
ON public.contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated admins can view contact messages" 
ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins can update contact messages" 
ON public.contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_neighborhood ON public.properties(neighborhood);
CREATE INDEX IF NOT EXISTS idx_booking_requests_created ON public.booking_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);
