import { db, subscriptions } from "@/lib/db";
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
