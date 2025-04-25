import { ContactFormData } from '@/@types';
import { sendAdminNotification, sendClientEmail } from '@/services/sendEmailService';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    
    await Promise.all([
      sendClientEmail(data),
      sendAdminNotification(data)
    ]);

    return NextResponse.json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}