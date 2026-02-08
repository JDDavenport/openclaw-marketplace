import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAgentBySlug } from '@/lib/agents-data';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(key);
}

export async function POST(req: NextRequest) {
  try {
    const { agentSlug, userEmail } = await req.json();

    const agent = getAgentBySlug(agentSlug);
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      line_items: [{ price: agent.stripePriceId, quantity: 1 }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&agent=${agentSlug}`,
      cancel_url: `${origin}/agents/${agentSlug}`,
      metadata: { agentSlug },
    };

    if (userEmail) {
      sessionParams.customer_email = userEmail;
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
