import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getAgentBySlug } from '@/lib/agents-data';
import { requireAuth } from '@/lib/require-auth';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    // Bug fix #1: Require authenticated user — no more anonymous purchases
    const authResult = await requireAuth();
    if ('error' in authResult) return authResult.error;

    const userId = authResult.session.user.id;
    const userEmail = authResult.session.user.email;

    const { agentSlug, priceId } = await req.json();

    const agent = getAgentBySlug(agentSlug);
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const agentId = agent.slug;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      allow_promotion_codes: true,
      line_items: [{ price: priceId || agent.stripePriceId, quantity: 1 }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&agent=${agentSlug}`,
      cancel_url: `${origin}/agents/${agentSlug}`,
      customer_email: userEmail,
      metadata: { agentSlug, agentId, userId },
      subscription_data: {
        metadata: { agentSlug, agentId, userId },
      },
    };

    // Reuse existing Stripe customer if we have one
    const userRow = await db.select({ stripeCustomerId: users.stripeCustomerId }).from(users).where(eq(users.id, userId)).limit(1);
    if (userRow.length > 0 && userRow[0].stripeCustomerId) {
      sessionParams.customer = userRow[0].stripeCustomerId;
      delete sessionParams.customer_email; // can't use both
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
