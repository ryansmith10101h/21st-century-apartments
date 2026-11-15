import { NextResponse } from 'next/server';
import { createBookingRequest, getBookingRequests } from '@/lib/data/store';

export async function GET() {
  try {
    const bookings = await getBookingRequests();
    return NextResponse.json({ success: true, bookings, requests: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      guestCount,
      propertyId,
      propertyTitle,
      apartmentType,
      estimatedTotal,
      notes,
    } = body;

    if (!guestName || !guestEmail || !guestPhone || !checkInDate || !checkOutDate) {
      return NextResponse.json(
        { success: false, error: 'Please provide name, email, phone, and requested dates.' },
        { status: 400 }
      );
    }

    const cleanPhone = guestPhone.trim();
    if (cleanPhone.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number (e.g. +234 817 611 5993)' },
        { status: 400 }
      );
    }

    const result = await createBookingRequest({
      propertyId: propertyId || undefined,
      propertyTitle: propertyTitle || apartmentType || '21st Century Apartment',
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim().toLowerCase(),
      guestPhone: cleanPhone,
      checkInDate,
      checkOutDate,
      guestCount: Number(guestCount || 1),
      apartmentType: apartmentType || propertyTitle || 'Executive Apartment',
      estimatedTotal: Number(estimatedTotal || 0),
      notes: notes || '',
      status: 'pending',
    });

    return NextResponse.json(
      {
        success: true,
        booking: result.data,
        message: 'Availability request received. Our concierge will contact you within 15 minutes.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking request error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error processing availability request' },
      { status: 500 }
    );
  }
}
