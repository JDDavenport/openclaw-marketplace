import { NextRequest, NextResponse } from "next/server";
import { db, agents } from "@/lib/db";
import { eq } from "drizzle-orm";

/**
 * Telegram Bot Webhook Handler
 * POST /api/bot/webhook/[token]
 *
 * Each agent product has its own bot token. Telegram sends updates here.
 * We validate the token, then route to the telegram-router logic.
 */

/** Cache of known bot tokens for fast validation */
const knownTokens = new Set<string>();
let tokensCached = false;

async function loadKnownTokens() {
  if (tokensCached) return;

  // Load from DB
  try {
    const rows = await db.select({ botToken: agents.botToken }).from(agents);
    for (const row of rows) {
      if (row.botToken) knownTokens.add(row.botToken);
    }
  } catch {
    // DB might not have agents table seeded yet
  }

  // Bug fix #4: Always load from env — primary fallback when DB agents table is empty
  const envTokens = process.env.TELEGRAM_BOT_TOKENS?.split(",") ?? [];
  for (const t of envTokens) {
    if (t.trim()) knownTokens.add(t.trim());
  }
  tokensCached = true;
  // Refresh cache every 5 minutes
  setTimeout(() => { tokensCached = false; }, 5 * 60 * 1000);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token: botToken } = await params;

  // Validate token
  await loadKnownTokens();
  if (!knownTokens.has(botToken)) {
    // Don't reveal whether token format is wrong vs unknown
    return NextResponse.json({ ok: true });
  }

  // Parse update — return 200 quickly regardless of processing outcome
  // (Telegram retries on non-2xx and we don't want that)
  try {
    const update = await request.json();

    // Dynamic import to keep the route handler light and avoid
    // pulling in runtime deps at module level
    const { handleTelegramUpdate } = await import("@/lib/telegram-handler");
    
    // Fire and forget — don't block the response
    handleTelegramUpdate(botToken, update).catch((err) => {
      console.error("[bot/webhook] Error handling update:", err);
    });
  } catch (err) {
    console.error("[bot/webhook] Failed to parse update:", err);
  }

  return NextResponse.json({ ok: true });
}
