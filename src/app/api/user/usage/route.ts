import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { db, userAgents, costTracking } from "@/lib/db";
import { eq, and, gte, sql } from "drizzle-orm";

/** GET /api/user/usage — Get usage/cost data for current user */
export async function GET() {
  const result = await requireAuth();
  if ("error" in result) return result.error;
  const userId = result.session.user.id;

  // Get current month start
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

  // Get all user agents
  const uas = await db
    .select({ id: userAgents.id, agentId: userAgents.agentId })
    .from(userAgents)
    .where(eq(userAgents.userId, userId));

  const uaIds = uas.map((ua) => ua.id);
  if (uaIds.length === 0) {
    return NextResponse.json({ usage: [] });
  }

  // Get cost data per user_agent for current month
  const costs = await db
    .select({
      userAgentId: costTracking.userAgentId,
      totalCost: sql<number>`sum(${costTracking.costUsd})`,
      totalInputTokens: sql<number>`sum(${costTracking.inputTokens})`,
      totalOutputTokens: sql<number>`sum(${costTracking.outputTokens})`,
    })
    .from(costTracking)
    .where(
      and(
        sql`${costTracking.userAgentId} IN (${sql.join(uaIds.map(id => sql`${id}`), sql`, `)})`,
        gte(costTracking.date, monthStart),
      )
    )
    .groupBy(costTracking.userAgentId);

  return NextResponse.json({ usage: costs, period: monthStart });
}
