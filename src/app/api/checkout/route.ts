import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getAgentBySlug } from '@/lib/agents-data';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const { agentSlug, userId, userEmail, priceId } = await req.json();

    const agent = getAgentBySlug(agentSlug);
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Use slug as agentId since we don't have DB agent IDs in the static data yet
    const agentId = agent.slug;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      allow_promotion_codes: true,
      line_items: [{ price: priceId || agent.stripePriceId, quantity: 1 }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&agent=${agentSlug}`,
      cancel_url: `${origin}/agents/${agentSlug}`,
      metadata: { agentSlug, agentId, userId: userId || 'anonymous' },
      subscription_data: {
        metadata: { agentSlug, agentId, userId: userId || 'anonymous' },
      },
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
