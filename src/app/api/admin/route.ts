import { NextResponse } from 'next/server';
import { 
  updateBookingRequestStatus, 
  updatePropertyAvailability, 
  updatePropertyPrice,
  createProperty,
  addGalleryItem
} from '@/lib/data/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. Update Booking Request Status
    if (action === 'update_booking' || action === 'update_request') {
      const { id, status } = body;
      await updateBookingRequestStatus(id, status);
      return NextResponse.json({ success: true, message: 'Request status updated' });
    }

    // 2. Toggle Apartment Availability
    if (action === 'toggle_availability') {
      const { id, isAvailable } = body;
      await updatePropertyAvailability(id, isAvailable);
      return NextResponse.json({ success: true, message: 'Property availability updated' });
    }

    // 3. Update Apartment Price
    if (action === 'update_price') {
      const { id, pricePerNight } = body;
      await updatePropertyPrice(id, Number(pricePerNight));
      return NextResponse.json({ success: true, message: 'Property price updated' });
    }

    // 4. Add New Apartment
    if (action === 'add_property') {
      const { property } = body;
      if (!property || !property.title || !property.pricePerNight) {
        return NextResponse.json({ success: false, error: 'Property title and price are required' }, { status: 400 });
      }
      const newProp = await createProperty(property);
      return NextResponse.json({ success: true, property: newProp, message: 'New apartment created successfully' });
    }

    // 5. Add / Manage Gallery Photo
    if (action === 'add_gallery_item') {
      const { item } = body;
      if (!item || !item.imageUrl || !item.category) {
        return NextResponse.json({ success: false, error: 'Image URL and category are required' }, { status: 400 });
      }
      const newItem = await addGalleryItem(item);
      return NextResponse.json({ success: true, item: newItem, message: 'Gallery item added successfully' });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process admin action' }, { status: 500 });
  }
}
