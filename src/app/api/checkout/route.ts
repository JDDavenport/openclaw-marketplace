import { NextRequest, NextResponse } from 'next/server';
import { getAgentBySlug } from '@/lib/agents-data';
import { requireAuth } from '@/lib/require-auth';
import { db, subscriptions, userAgents } from '@/lib/db';
import { nowUnix } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    // Require authenticated user
    const authResult = await requireAuth();
    if ('error' in authResult) return authResult.error;

    const userId = authResult.session.user.id;
    const { agentSlug, promoCode } = await req.json();

    const agent = getAgentBySlug(agentSlug);
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    // Only BYUFREE promo code works — Stripe is offline
    if (!promoCode || promoCode.toUpperCase() !== 'BYUFREE') {
      return NextResponse.json({ error: 'Payment system offline. Enter access code to continue.' }, { status: 400 });
    }

    const agentId = agent.slug;
    const now = nowUnix();
    const subId = `free_${userId}_${agentId}_${now}`;

    // Create subscription record (no Stripe)
    await db.insert(subscriptions).values({
      id: subId,
      userId,
      agentId,
      stripeSubscriptionId: `promo_BYUFREE_${now}`,
      status: 'active',
      currentPeriodStart: now,
      currentPeriodEnd: now + (365 * 24 * 60 * 60), // 1 year
      createdAt: now,
      updatedAt: now,
    }).onConflictDoNothing();

    // Create userAgent record
    await db.insert(userAgents).values({
      id: `ua_${userId}_${agentId}_${now}`,
      userId,
      agentId,
      workspacePath: `/agents/${agentId}/${userId}`,
      isPaired: false,
      onboardingCompleted: false,
      createdAt: now,
      updatedAt: now,
    }).onConflictDoNothing();

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return NextResponse.json({ url: `${origin}/checkout/success?agent=${agentSlug}` });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to process registration' }, { status: 500 });
  }
}
