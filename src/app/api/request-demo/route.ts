import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@updates.cmehub.net';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, demoType, message } = body;

    if (!fullName) {
      return NextResponse.json(
        { success: false, error: 'Full Name is required.' },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone Number is required.' },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email Address is required.' },
        { status: 400 }
      );
    }
    if (!demoType) {
      return NextResponse.json(
        { success: false, error: 'Demo type is required.' },
        { status: 400 }
      );
    }
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required.' },
        { status: 400 }
      );
    }

    // Read and validate the TO_DEMO
    if (!process.env.TO_DEMO) {
      const errorMessage = 'Missing TO_DEMO environment variable';
      console.error(errorMessage); // Log the error
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      ); // Return error response
    }
    const TO_DEMO = process.env.TO_DEMO.split(',');

    const data = await resend.emails.send({
      from: fromEmail,
      to: TO_DEMO,
      subject: `New Demo Type Submission from ${fullName}`,
      html: `
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Select a Demo Type:</strong> ${demoType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email.' },
      { status: 500 }
    );
  }
}
