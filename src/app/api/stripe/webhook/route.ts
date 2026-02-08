import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";
import { db, subscriptions, userAgents, paymentEvents, users } from "@/lib/db";
import { eq } from "drizzle-orm";
import { generateId, nowUnix } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook verification failed: ${message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as unknown as {
          id: string;
          status: string;
          current_period_start: number;
          current_period_end: number;
          metadata: { userId: string; agentId: string };
          customer: string;
        };
        const { userId, agentId } = sub.metadata;

        if (!userId || !agentId) break;

        // Upsert subscription
        const existing = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.stripeSubscriptionId, sub.id))
          .limit(1);

        if (existing.length > 0) {
          await db
            .update(subscriptions)
            .set({
              status: sub.status,
              currentPeriodStart: sub.current_period_start,
              currentPeriodEnd: sub.current_period_end,
              updatedAt: nowUnix(),
            })
            .where(eq(subscriptions.stripeSubscriptionId, sub.id));
        } else {
          await db.insert(subscriptions).values({
            id: generateId(),
            userId,
            agentId,
            stripeSubscriptionId: sub.id,
            status: sub.status,
            currentPeriodStart: sub.current_period_start,
            currentPeriodEnd: sub.current_period_end,
            createdAt: nowUnix(),
            updatedAt: nowUnix(),
          });

          // Create user_agents record for workspace provisioning
          const workspacePath = `/data/users/${userId}/agents/${agentId}`;
          await db.insert(userAgents).values({
            id: generateId(),
            userId,
            agentId,
            workspacePath,
            isPaired: false,
            onboardingCompleted: false,
            createdAt: nowUnix(),
            updatedAt: nowUnix(),
          });
        }

        // Store Stripe customer ID on user if not already set
        await db
          .update(users)
          .set({
            stripeCustomerId: sub.customer as string,
            updatedAt: nowUnix(),
          })
          .where(eq(users.id, userId));

        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as unknown as { id: string };
        await db
          .update(subscriptions)
          .set({ status: "canceled", updatedAt: nowUnix() })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));
        break;
      }

      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const invoice = event.data.object as unknown as {
          customer: string;
          amount_paid: number;
          subscription: string;
        };
        await db.insert(paymentEvents).values({
          id: generateId(),
          stripeEventId: event.id,
          eventType: event.type,
          amount: invoice.amount_paid,
          metadata: { customer: invoice.customer, subscription: invoice.subscription },
          createdAt: nowUnix(),
        });
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
