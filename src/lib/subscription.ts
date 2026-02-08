import { db, subscriptions, agents } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { nowUnix } from "@/lib/utils";

/**
 * Check if a user has an active subscription to a specific agent.
 * Used by bots to verify access before responding.
 */
export async function checkSubscription(
  userId: string,
  agentId: string
): Promise<boolean> {
  const result = await db
    .select({ status: subscriptions.status, currentPeriodEnd: subscriptions.currentPeriodEnd })
    .from(subscriptions)
    .where(
      and(eq(subscriptions.userId, userId), eq(subscriptions.agentId, agentId))
    )
    .limit(1);

  if (result.length === 0) return false;

  const sub = result[0];
  const isActiveStatus = sub.status === "active" || sub.status === "trialing";
  const isPeriodValid =
    !sub.currentPeriodEnd || sub.currentPeriodEnd > nowUnix();

  return isActiveStatus && isPeriodValid;
}

/**
 * Get all active subscriptions for a user with agent details.
 * Returns subscriptions that are active or trialing and not expired.
 */
export async function getActiveSubscriptions(userId: string) {
  const result = await db
    .select({
      subscriptionId: subscriptions.id,
      status: subscriptions.status,
      currentPeriodStart: subscriptions.currentPeriodStart,
      currentPeriodEnd: subscriptions.currentPeriodEnd,
      stripeSubscriptionId: subscriptions.stripeSubscriptionId,
      agentId: agents.id,
      agentName: agents.name,
      agentSlug: agents.slug,
      agentDescription: agents.description,
      agentCategory: agents.category,
      agentPrice: agents.priceMonthly,
      agentBotUsername: agents.botUsername,
      agentImageUrl: agents.imageUrl,
    })
    .from(subscriptions)
    .innerJoin(agents, eq(subscriptions.agentId, agents.id))
    .where(eq(subscriptions.userId, userId));

  const now = nowUnix();

  return result.filter((sub) => {
    const isActiveStatus = sub.status === "active" || sub.status === "trialing";
    const isPeriodValid = !sub.currentPeriodEnd || sub.currentPeriodEnd > now;
    return isActiveStatus && isPeriodValid;
  });
}
