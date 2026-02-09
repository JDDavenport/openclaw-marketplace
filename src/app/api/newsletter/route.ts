import { db, newsletterSubscribers } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

async function ensureTable() {
  await db.run(sql`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'website',
    status TEXT DEFAULT 'active',
    created_at INTEGER NOT NULL
  )`);
}

export async function POST(req: NextRequest) {
  try {
    await ensureTable();
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email.toLowerCase().trim()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ message: "You're already subscribed!" });
    }

    await db.insert(newsletterSubscribers).values({
      id: crypto.randomUUID(),
      email: email.toLowerCase().trim(),
      source: "website",
      status: "active",
      createdAt: Date.now(),
    });

    return NextResponse.json({ message: "You're in! We'll notify you when new agents drop." });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
