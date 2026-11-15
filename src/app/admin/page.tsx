'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut, Phone, RefreshCw, Plus, Edit2, Check, X } from 'lucide-react';
import { BookingRequest, Property, GalleryItem, ContactMessage } from '@/lib/types';
import { formatNaira } from '@/lib/data/business-config';
import { INITIAL_PROPERTIES, GALLERY_ITEMS } from '@/lib/data/properties';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'properties' | 'gallery' | 'messages'>('requests');

  // Data States
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [loading, setLoading] = useState(false);

  // Modals
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPriceValue, setNewPriceValue] = useState<number>(0);

  // New Property Form State
  const [newProperty, setNewProperty] = useState({
    title: '',
    tagline: '',
    location: 'Eko Atlantic Boulevard, Victoria Island / Eti-Osa, Lagos',
    neighborhood: 'Eko Atlantic' as Property['neighborhood'],
    address: 'Eko Atlantic Boulevard, Lagos, Nigeria',
    pricePerNight: 350000,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    squareMeters: 180,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    description: '',
  });

  // New Gallery Photo Form State
  const [newGalleryPhoto, setNewGalleryPhoto] = useState({
    title: '',
    category: 'architecture' as GalleryItem['category'],
    imageUrl: '',
    locationName: 'Eko Atlantic Boulevard, Lagos',
    caption: '',
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [bookRes, msgRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/enquiries'),
      ]);
      const bookData = await bookRes.json();
      const msgData = await msgRes.json();

      if (bookData.success && (bookData.requests || bookData.bookings)) {
        setBookingRequests(bookData.requests || bookData.bookings);
      }
      if (msgData.success && (msgData.messages || msgData.enquiries)) {
        setMessages(msgData.messages || msgData.enquiries);
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Authentication check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('century21_admin_auth');
      if (isAuth !== 'true') {
        router.push('/admin/login');
      } else {
        Promise.resolve().then(() => {
          setAuthenticated(true);
          fetchData();
        });
      }
    }
  }, [router, fetchData]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('century21_admin_auth');
      localStorage.removeItem('century21_admin_email');
    }
    router.push('/admin/login');
  };

  // 1. Toggle Property Availability
  const handleToggleAvailability = async (id: string, current: boolean) => {
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_availability',
          id,
          isAvailable: !current,
        }),
      });

      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isAvailable: !current } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 2. Save Updated Property Price
  const handleSavePrice = async (id: string) => {
    if (!newPriceValue || newPriceValue <= 0) return;
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_price',
          id,
          pricePerNight: newPriceValue,
        }),
      });

      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, pricePerNight: newPriceValue } : p))
      );
      setEditingPriceId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Create New Apartment
  const handleAddPropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProperty.title || !newProperty.pricePerNight) return;

    const propertyPayload = {
      slug: newProperty.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      title: newProperty.title,
      tagline: newProperty.tagline || 'Modern Serviced Apartment in Lagos',
      description: newProperty.description || 'Premium short-stay apartment with guaranteed 24/7 power and Starlink WiFi.',
      location: newProperty.location,
      neighborhood: newProperty.neighborhood,
      address: newProperty.address,
      pricePerNight: Number(newProperty.pricePerNight),
      bedrooms: Number(newProperty.bedrooms),
      bathrooms: Number(newProperty.bathrooms),
      maxGuests: Number(newProperty.maxGuests),
      squareMeters: Number(newProperty.squareMeters),
      featured: true,
      isAvailable: true,
      rating: 5.0,
      reviewCount: 1,
      cautionDeposit: 100000,
      cleaningFee: 20000,
      images: [newProperty.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'],
      amenities: [
        '24/7 Redundant Power (CAT Gens + Solar)',
        'Starlink Satellite 250+ Mbps Broadband',
        'Armed Estate Security & Biometrics',
        'Fully Fitted Chef Kitchen',
      ],
      keyFeatures: [
        {
          title: 'Prime Lagos Address',
          description: newProperty.location,
          icon: 'MapPin',
        },
      ],
      houseRules: [
        'Strictly non-smoking interior',
        'Check-in: 2:00 PM | Check-out: 11:00 AM',
      ],
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      coordinates: { lat: 6.4178, lng: 3.4091 },
    };

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_property',
          property: propertyPayload,
        }),
      });

      const data = await res.json();
      if (data.success && data.property) {
        setProperties((prev) => [data.property, ...prev]);
        setShowAddPropertyModal(false);
        // Reset form
        setNewProperty({
          title: '',
          tagline: '',
          location: 'Eko Atlantic Boulevard, Victoria Island / Eti-Osa, Lagos',
          neighborhood: 'Eko Atlantic',
          address: 'Eko Atlantic Boulevard, Lagos, Nigeria',
          pricePerNight: 350000,
          bedrooms: 2,
          bathrooms: 2,
          maxGuests: 4,
          squareMeters: 180,
          imageUrl: '',
          description: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Update Request Status
  const handleUpdateRequestStatus = async (id: string, status: BookingRequest['status']) => {
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_request',
          id,
          status,
        }),
      });

      setBookingRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Add New Gallery Photo
  const handleAddGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryPhoto.title || !newGalleryPhoto.imageUrl) return;

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_gallery_item',
          item: newGalleryPhoto,
        }),
      });

      const data = await res.json();
      if (data.success && data.item) {
        setGallery((prev) => [data.item, ...prev]);
        setShowAddGalleryModal(false);
        setNewGalleryPhoto({
          title: '',
          category: 'architecture',
          imageUrl: '',
          locationName: 'Eko Atlantic Boulevard, Lagos',
          caption: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!authenticated) {
    return null;
  }

  return (
    <div className="py-8 bg-[#080B0E] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#DFC7A5] font-mono">
                Staff & Concierge Administration
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white mt-1">
              21st Century Operations Portal
            </h1>
            <p className="text-xs text-gray-400">
              Eko Atlantic Boulevard • Lagos, Nigeria
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#141820] hover:bg-[#1B222C] text-gray-300 text-xs uppercase tracking-wider font-semibold border border-white/10 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C5A880] ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1B171D] hover:bg-rose-950/40 text-rose-300 text-xs uppercase tracking-wider font-semibold border border-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#0E1217] border border-[#242A35] space-y-1">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Availability Requests</span>
            <div className="text-2xl font-serif font-bold text-white">
              {bookingRequests.length}
            </div>
            <p className="text-[10px] text-[#DFC7A5]">
              {bookingRequests.filter((r) => r.status === 'pending').length} awaiting response
            </p>
          </div>

          <div className="p-5 bg-[#0E1217] border border-[#242A35] space-y-1">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Active Residences</span>
            <div className="text-2xl font-serif font-bold text-white">
              {properties.filter((p) => p.isAvailable).length} / {properties.length}
            </div>
            <p className="text-[10px] text-emerald-400">Eko Atlantic, VI, Lekki, Ikeja</p>
          </div>

          <div className="p-5 bg-[#0E1217] border border-[#242A35] space-y-1">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Client Messages</span>
            <div className="text-2xl font-serif font-bold text-[#DFC7A5]">
              {messages.length}
            </div>
            <p className="text-[10px] text-gray-400">Direct enquiries received</p>
          </div>

          <div className="p-5 bg-[#0E1217] border border-[#242A35] space-y-1">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Curated Photos</span>
            <div className="text-2xl font-serif font-bold text-white">
              {gallery.length}
            </div>
            <p className="text-[10px] text-gray-400">8 architectural categories</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'requests'
                ? 'bg-[#C5A880] text-[#080B0E] font-bold'
                : 'text-gray-400 hover:text-white bg-[#141820]'
            }`}
          >
            Availability Requests ({bookingRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'properties'
                ? 'bg-[#C5A880] text-[#080B0E] font-bold'
                : 'text-gray-400 hover:text-white bg-[#141820]'
            }`}
          >
            Apartments & Pricing ({properties.length})
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-[#C5A880] text-[#080B0E] font-bold'
                : 'text-gray-400 hover:text-white bg-[#141820]'
            }`}
          >
            Manage Gallery ({gallery.length})
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'messages'
                ? 'bg-[#C5A880] text-[#080B0E] font-bold'
                : 'text-gray-400 hover:text-white bg-[#141820]'
            }`}
          >
            Contact Enquiries ({messages.length})
          </button>
        </div>

        {/* TAB 1: AVAILABILITY REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-lg font-serif text-white">Guest Availability Enquiries</h3>
              <span className="text-xs text-gray-400 font-mono">Real-time submissions</span>
            </div>

            <div className="space-y-3">
              {bookingRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#0E1217] border border-[#242A35] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#DFC7A5]">{req.id}</span>
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                        req.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                        req.status === 'contacted' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                        'bg-amber-950 text-amber-400 border border-amber-500/30'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <h4 className="text-base font-serif text-white">
                      {req.guestName} <span className="text-xs font-mono text-gray-400">({req.guestPhone} • {req.guestEmail})</span>
                    </h4>

                    <p className="text-xs text-gray-300">
                      Residence: <strong className="text-white">{req.propertyTitle || req.apartmentType}</strong> | Dates: <strong className="text-[#DFC7A5]">{req.checkInDate} to {req.checkOutDate}</strong> ({req.guestCount} guests)
                    </p>

                    {req.notes && (
                      <p className="text-xs text-gray-400 italic">
                        &quot;{req.notes}&quot;
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`https://wa.me/${req.guestPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${req.guestName}, this is 21st Century Apartments Concierge following up on your availability request for ${req.propertyTitle}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#141820] text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs uppercase tracking-wider font-semibold"
                    >
                      WhatsApp Guest
                    </a>

                    <select
                      value={req.status}
                      onChange={(e) => handleUpdateRequestStatus(req.id, e.target.value as BookingRequest['status'])}
                      className="bg-[#141820] border border-white/10 text-xs px-2.5 py-1.5 text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: APARTMENTS & PRICING */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif text-white">Serviced Residences Inventory</h3>
                <p className="text-xs text-gray-400">Update nightly prices, toggle availability, or add new suites.</p>
              </div>

              <button
                onClick={() => setShowAddPropertyModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-[0.16em] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Apartment</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-[#0E1217] border border-[#242A35] p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 bg-gray-900 shrink-0 border border-white/10">
                      <Image
                        src={prop.images[0]}
                        alt={prop.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-[#C5A880] block">
                        {prop.neighborhood} • {prop.bedrooms} Bed • {prop.bathrooms} Bath
                      </span>
                      <h4 className="text-base font-serif text-white">{prop.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-1">{prop.location}</p>
                    </div>
                  </div>

                  {/* Price & Availability Control Row */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-mono block">Nightly Price</span>
                      {editingPriceId === prop.id ? (
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="number"
                            value={newPriceValue}
                            onChange={(e) => setNewPriceValue(Number(e.target.value))}
                            className="w-28 bg-[#141820] border border-[#C5A880] text-xs px-2 py-1 text-white"
                          />
                          <button
                            onClick={() => handleSavePrice(prop.id)}
                            className="p-1.5 bg-emerald-600 text-white cursor-pointer"
                            title="Save Price"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingPriceId(null)}
                            className="p-1.5 bg-gray-700 text-white cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-base font-serif font-bold text-white">
                            {formatNaira(prop.pricePerNight)}
                          </span>
                          <button
                            onClick={() => {
                              setEditingPriceId(prop.id);
                              setNewPriceValue(prop.pricePerNight);
                            }}
                            className="text-gray-400 hover:text-[#DFC7A5] cursor-pointer"
                            title="Edit Price"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {prop.isAvailable ? 'Available' : 'Booked / Maintenance'}
                      </span>
                      <button
                        onClick={() => handleToggleAvailability(prop.id, prop.isAvailable)}
                        className={`px-3 py-1 text-xs uppercase font-bold tracking-wider cursor-pointer ${
                          prop.isAvailable
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {prop.isAvailable ? 'Mark Occupied' : 'Mark Available'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif text-white">Architectural Gallery Monograph</h3>
                <p className="text-xs text-gray-400">Curate photos across all 8 architectural categories.</p>
              </div>

              <button
                onClick={() => setShowAddGalleryModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-[0.16em] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((photo) => (
                <div key={photo.id} className="bg-[#0E1217] border border-[#242A35] p-3 space-y-2">
                  <div className="relative aspect-[4/3] bg-gray-900 border border-white/5 overflow-hidden">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] uppercase font-mono bg-black/80 text-[#DFC7A5]">
                      {photo.category}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-serif text-white line-clamp-1">{photo.title}</h5>
                    <p className="text-[10px] text-gray-400 font-mono">{photo.locationName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT ENQUIRIES */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-white">Client Inquiries & Messages</h3>
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-[#0E1217] border border-[#242A35] p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-serif text-white">
                      {msg.name} <span className="text-xs font-mono text-gray-400">({msg.email} • {msg.phone})</span>
                    </h4>
                    <span className="text-[10px] font-mono text-gray-500">{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                  <div className="text-xs font-mono text-[#DFC7A5]">Subject: {msg.subject}</div>
                  <p className="text-xs text-gray-300 leading-relaxed">&ldquo;{msg.message}&rdquo;</p>
                  <div className="pt-2">
                    <a
                      href={`tel:${msg.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#DFC7A5] hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Client Back</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: ADD APARTMENT */}
        {showAddPropertyModal && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0E1217] border border-white/20 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xl font-serif text-white">Add New Serviced Apartment</h3>
                <button
                  onClick={() => setShowAddPropertyModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddPropertySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-gray-400">Apartment Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Marina Waterfront Suite"
                    value={newProperty.title}
                    onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                    className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-400">Neighborhood</label>
                    <select
                      value={newProperty.neighborhood}
                      onChange={(e) => setNewProperty({ ...newProperty, neighborhood: e.target.value as Property['neighborhood'] })}
                      className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                    >
                      <option value="Eko Atlantic">Eko Atlantic</option>
                      <option value="Victoria Island">Victoria Island</option>
                      <option value="Lekki">Lekki</option>
                      <option value="Ikeja">Ikeja</option>
                      <option value="Ikoyi">Ikoyi</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-400">Nightly Rate (NGN)</label>
                    <input
                      type="number"
                      required
                      value={newProperty.pricePerNight}
                      onChange={(e) => setNewProperty({ ...newProperty, pricePerNight: Number(e.target.value) })}
                      className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-400">Bedrooms</label>
                    <input
                      type="number"
                      value={newProperty.bedrooms}
                      onChange={(e) => setNewProperty({ ...newProperty, bedrooms: Number(e.target.value) })}
                      className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-400">Bathrooms</label>
                    <input
                      type="number"
                      value={newProperty.bathrooms}
                      onChange={(e) => setNewProperty({ ...newProperty, bathrooms: Number(e.target.value) })}
                      className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-400">Max Guests</label>
                    <input
                      type="number"
                      value={newProperty.maxGuests}
                      onChange={(e) => setNewProperty({ ...newProperty, maxGuests: Number(e.target.value) })}
                      className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-400">Area (m²)</label>
                    <input
                      type="number"
                      value={newProperty.squareMeters}
                      onChange={(e) => setNewProperty({ ...newProperty, squareMeters: Number(e.target.value) })}
                      className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-gray-400">Photo URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newProperty.imageUrl}
                    onChange={(e) => setNewProperty({ ...newProperty, imageUrl: e.target.value })}
                    className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-gray-400">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe architectural features, views, and power specifications..."
                    value={newProperty.description}
                    onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                    className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddPropertyModal(false)}
                    className="px-4 py-2 border border-white/10 text-xs uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-wider"
                  >
                    Save Apartment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD GALLERY PHOTO */}
        {showAddGalleryModal && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0E1217] border border-white/20 p-6 sm:p-8 max-w-lg w-full space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xl font-serif text-white">Add Photo to Gallery</h3>
                <button
                  onClick={() => setShowAddGalleryModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddGallerySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-gray-400">Photo Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ocean Terrace Twilight"
                    value={newGalleryPhoto.title}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, title: e.target.value })}
                    className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-gray-400">Category</label>
                  <select
                    value={newGalleryPhoto.category}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, category: e.target.value as GalleryItem['category'] })}
                    className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                  >
                    <option value="architecture">Architecture</option>
                    <option value="interiors">Interiors</option>
                    <option value="bedrooms">Bedrooms</option>
                    <option value="living spaces">Living Spaces</option>
                    <option value="kitchens">Kitchens</option>
                    <option value="views">Views</option>
                    <option value="amenities">Amenities</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-gray-400">Photo URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newGalleryPhoto.imageUrl}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, imageUrl: e.target.value })}
                    className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-gray-400">Location Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Eko Atlantic Boulevard, Lagos"
                    value={newGalleryPhoto.locationName}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, locationName: e.target.value })}
                    className="w-full bg-[#141820] border border-white/10 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddGalleryModal(false)}
                    className="px-4 py-2 border border-white/10 text-xs uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#C5A880] text-[#080B0E] font-bold text-xs uppercase tracking-wider"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
