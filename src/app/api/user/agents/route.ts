import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { db, userAgents, agents, subscriptions } from "@/lib/db";
import { eq, and } from "drizzle-orm";

/** GET /api/user/agents — List user's active agents with subscription info */
export async function GET() {
  const result = await requireAuth();
  if ("error" in result) return result.error;
  const userId = result.session.user.id;

  const rows = await db
    .select({
      userAgentId: userAgents.id,
      agentId: agents.id,
      agentName: agents.name,
      agentSlug: agents.slug,
      agentCategory: agents.category,
      agentBotUsername: agents.botUsername,
      agentImageUrl: agents.imageUrl,
      workspacePath: userAgents.workspacePath,
      isPaired: userAgents.isPaired,
      onboardingCompleted: userAgents.onboardingCompleted,
      subscriptionStatus: subscriptions.status,
      currentPeriodEnd: subscriptions.currentPeriodEnd,
    })
    .from(userAgents)
    .innerJoin(agents, eq(agents.id, userAgents.agentId))
    .innerJoin(subscriptions, and(
      eq(subscriptions.userId, userAgents.userId),
      eq(subscriptions.agentId, userAgents.agentId),
    ))
    .where(eq(userAgents.userId, userId));

  return NextResponse.json({ agents: rows });
}
