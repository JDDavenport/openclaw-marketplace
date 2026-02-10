/**
 * Telegram update handler — thin wrapper that will call into the runtime
 * telegram-router once it's bundled. For now, provides the interface
 * that the webhook route expects.
 */

import { db, agents, userAgents, users, subscriptions } from "@/lib/db";
import { eq, and } from "drizzle-orm";

const TELEGRAM_API = "https://api.telegram.org";

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from?: { id: number; first_name: string; username?: string };
    chat: { id: number; type: string };
    text?: string;
    date: number;
  };
}

/** Cache: botToken → agent row */
const agentCache = new Map<string, { id: string; name: string; slug: string; botUsername: string }>();

async function resolveAgent(botToken: string) {
  if (agentCache.has(botToken)) return agentCache.get(botToken)!;
  const rows = await db
    .select({ id: agents.id, name: agents.name, slug: agents.slug, botUsername: agents.botUsername })
    .from(agents)
    .where(eq(agents.botToken, botToken))
    .limit(1);
  if (rows.length === 0) return null;
  agentCache.set(botToken, rows[0]);
  return rows[0];
}

async function sendMessage(botToken: string, chatId: number, text: string) {
  await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function handleTelegramUpdate(botToken: string, update: TelegramUpdate): Promise<void> {
  const message = update.message;
  if (!message?.from) return;

  const telegramUserId = String(message.from.id);
  const chatId = message.chat.id;

  const agent = await resolveAgent(botToken);
  if (!agent) {
    console.error(`[telegram-handler] Unknown bot token`);
    return;
  }

  // Find user's subscription for this agent
  const rows = await db
    .select({
      uaId: userAgents.id,
      onboardingCompleted: userAgents.onboardingCompleted,
      subStatus: subscriptions.status,
    })
    .from(userAgents)
    .innerJoin(users, eq(users.id, userAgents.userId))
    .innerJoin(subscriptions, and(
      eq(subscriptions.userId, userAgents.userId),
      eq(subscriptions.agentId, userAgents.agentId),
    ))
    .where(and(
      eq(users.telegramUserId, telegramUserId),
      eq(userAgents.agentId, agent.id),
    ))
    .limit(1);

  if (rows.length === 0) {
    await sendMessage(botToken, chatId,
      `👋 Hey! I'm the ${agent.name} bot.\n\nYou don't have an active subscription. Visit https://openclaw.com/agents/${agent.slug} to get started!`
    );
    return;
  }

  const row = rows[0];
  if (row.subStatus !== "active" && row.subStatus !== "trialing") {
    await sendMessage(botToken, chatId,
      `⚠️ Your subscription is ${row.subStatus}. Visit https://openclaw.com/dashboard to update billing.`
    );
    return;
  }

  // TODO: Route to session-manager / onboarding once runtime is fully integrated
  await sendMessage(botToken, chatId,
    `✅ Message received! Agent session routing coming soon.`
  );
}
