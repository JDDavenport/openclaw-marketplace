import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";
import { db, subscriptions, userAgents, paymentEvents, users } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { generateId, nowUnix } from "@/lib/utils";
import { getAgentBySlug } from "@/lib/agents-data";

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
      // ── Checkout completed — create subscription + trigger bot pairing ──
      case "checkout.session.completed": {
        const session = event.data.object as unknown as {
          id: string;
          customer: string;
          subscription: string;
          metadata: { userId: string; agentId: string; agentSlug?: string };
        };
        const { userId, agentId } = session.metadata;
        const agentSlug = session.metadata.agentSlug || agentId;

        // Resolve bot invite link from agent data
        const agentData = getAgentBySlug(agentSlug);
        const botUsername = agentData?.botUsername;
        const telegramInviteLink = botUsername ? `https://t.me/${botUsername}` : null;

        console.log(`[webhook] checkout.session.completed: user=${userId} agent=${agentId} bot=${botUsername} invite=${telegramInviteLink}`);

        if (!userId || !agentId) break;

        // Store Stripe customer ID on user
        await db
          .update(users)
          .set({ stripeCustomerId: session.customer, updatedAt: nowUnix() })
          .where(eq(users.id, userId));

        // Check if subscription record already exists (may have been created by subscription.created event)
        const existing = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.stripeSubscriptionId, session.subscription))
          .limit(1);

        if (existing.length === 0) {
          // Create a placeholder — subscription.created webhook will fill in period dates
          await db.insert(subscriptions).values({
            id: generateId(),
            userId,
            agentId,
            stripeSubscriptionId: session.subscription,
            status: "active",
            currentPeriodStart: nowUnix(),
            currentPeriodEnd: null,
            createdAt: nowUnix(),
            updatedAt: nowUnix(),
          });
        }

        // Create user_agents record for workspace provisioning if not exists
        const existingUA = await db
          .select()
          .from(userAgents)
          .where(
            and(
              eq(userAgents.userId, userId),
              eq(userAgents.agentId, agentId)
            )
          )
          .limit(1);

        if (existingUA.length === 0) {
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

        break;
      }

      // ── Subscription created or updated — upsert record ──
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

        // Store Stripe customer ID on user
        await db
          .update(users)
          .set({ stripeCustomerId: sub.customer, updatedAt: nowUnix() })
          .where(eq(users.id, userId));

        break;
      }

      // ── Subscription deleted — mark inactive ──
      case "customer.subscription.deleted": {
        const sub = event.data.object as unknown as {
          id: string;
          metadata: { userId: string; agentId: string };
        };

        await db
          .update(subscriptions)
          .set({ status: "canceled", updatedAt: nowUnix() })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));

        // Log the cancellation event
        await db.insert(paymentEvents).values({
          id: generateId(),
          stripeEventId: event.id,
          eventType: event.type,
          amount: 0,
          metadata: { subscriptionId: sub.id },
          createdAt: nowUnix(),
        });

        break;
      }

      // ── Payment failed — mark as past_due ──
      case "invoice.payment_failed": {
        const invoice = event.data.object as unknown as {
          customer: string;
          amount_due: number;
          amount_paid: number;
          subscription: string;
        };

        // Mark subscription as past_due
        if (invoice.subscription) {
          await db
            .update(subscriptions)
            .set({ status: "past_due", updatedAt: nowUnix() })
            .where(
              eq(subscriptions.stripeSubscriptionId, invoice.subscription)
            );
        }

        await db.insert(paymentEvents).values({
          id: generateId(),
          stripeEventId: event.id,
          eventType: event.type,
          amount: invoice.amount_due,
          metadata: {
            customer: invoice.customer,
            subscription: invoice.subscription,
          },
          createdAt: nowUnix(),
        });
        break;
      }

      // ── Payment succeeded — log it ──
      case "invoice.payment_succeeded": {
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
          metadata: {
            customer: invoice.customer,
            subscription: invoice.subscription,
          },
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
