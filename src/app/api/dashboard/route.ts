import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db, subscriptions, agents } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userSubs = await db
      .select({
        subscriptionId: subscriptions.id,
        status: subscriptions.status,
        currentPeriodEnd: subscriptions.currentPeriodEnd,
        currentPeriodStart: subscriptions.currentPeriodStart,
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
      .where(eq(subscriptions.userId, session.user.id));

    return NextResponse.json({ subscriptions: userSubs });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
