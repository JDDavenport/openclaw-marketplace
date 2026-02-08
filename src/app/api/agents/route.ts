import { NextResponse } from "next/server";
import { db, agents } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allAgents = await db
      .select({
        id: agents.id,
        name: agents.name,
        slug: agents.slug,
        description: agents.description,
        longDescription: agents.longDescription,
        category: agents.category,
        priceMonthly: agents.priceMonthly,
        botUsername: agents.botUsername,
        imageUrl: agents.imageUrl,
        features: agents.features,
        isActive: agents.isActive,
        createdAt: agents.createdAt,
      })
      .from(agents)
      .where(eq(agents.isActive, true));

    return NextResponse.json({ agents: allAgents, total: allAgents.length });
  } catch (err) {
    console.error("Failed to fetch agents:", err);
    return NextResponse.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}
