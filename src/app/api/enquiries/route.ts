import { NextResponse } from 'next/server';
import { createContactMessage, getContactMessages } from '@/lib/data/store';

export async function GET() {
  try {
    const messages = await getContactMessages();
    return NextResponse.json({ success: true, enquiries: messages, messages });
  } catch (error) {
    console.error('Error fetching enquiries/messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, fullName, email, phone, subject, message, serviceType } = body;

    const contactName = name || fullName;
    if (!contactName || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields (Name, Email, Phone, Message)' },
        { status: 400 }
      );
    }

    const newMessage = await createContactMessage({
      name: contactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject || (serviceType ? `Enquiry: ${serviceType}` : 'General Booking Enquiry'),
      message: message.trim(),
      status: 'unread',
    });

    return NextResponse.json(
      {
        success: true,
        enquiry: newMessage.data,
        message: 'Your message has been received by 21st Century Apartments concierge.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Message submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error processing contact message' },
      { status: 500 }
    );
  }
}
