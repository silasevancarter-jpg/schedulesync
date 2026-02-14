import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { priceId, userId, email } = await request.json();

    console.log('Creating checkout with:', { priceId, userId, email });

    // Create or retrieve customer first
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        userId: userId,
      },
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      client_reference_id: userId,
    });

    console.log('Session created:', session.url);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error.message);
    console.error('Full error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}