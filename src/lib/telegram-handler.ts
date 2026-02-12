/**
 * Telegram update handler
 * Handles bot pairing via /start deep links and message routing.
 */

import { db, agents, userAgents, users, subscriptions } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { nowUnix } from "@/lib/utils";

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

  // Try DB first
  const rows = await db
    .select({ id: agents.id, name: agents.name, slug: agents.slug, botUsername: agents.botUsername })
    .from(agents)
    .where(eq(agents.botToken, botToken))
    .limit(1);

  if (rows.length > 0) {
    agentCache.set(botToken, rows[0]);
    return rows[0];
  }

  // Bug fix #4: Fall back to static agents-data by matching botUsername from token
  // Bot tokens contain the bot ID before the colon — we can't match statically without storing tokens.
  // The token was already validated by the webhook route, so we trust it.
  // Try to resolve agent from env mapping: AGENT_TOKEN_MAP=slug:token,slug:token
  const tokenMap = process.env.AGENT_TOKEN_MAP?.split(",") ?? [];
  for (const entry of tokenMap) {
    const [slug, token] = entry.split(":");
    if (token === botToken) {
      const { agents: staticAgents } = await import("@/lib/agents-data");
      const match = staticAgents.find((a) => a.slug === slug);
      if (match) {
        const result = { id: match.slug, name: match.name, slug: match.slug, botUsername: match.botUsername || "" };
        agentCache.set(botToken, result);
        return result;
      }
    }
  }

  return null;
}

async function sendMessage(botToken: string, chatId: number, text: string, parseMode?: string) {
  const body: Record<string, unknown> = { chat_id: chatId, text };
  if (parseMode) body.parse_mode = parseMode;
  await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function handleTelegramUpdate(botToken: string, update: TelegramUpdate): Promise<void> {
  const message = update.message;
  if (!message?.from) return;

  const telegramUserId = String(message.from.id);
  const chatId = message.chat.id;
  const text = message.text?.trim() || "";

  const agent = await resolveAgent(botToken);
  if (!agent) {
    console.error(`[telegram-handler] Unknown bot token`);
    return;
  }

  // ── Bug fix #3: Handle /start deep link for pairing ──
  // Format: /start <userId>
  // The checkout success page links to t.me/bot?start=<userId>
  if (text.startsWith("/start")) {
    const parts = text.split(/\s+/);
    const startParam = parts[1]; // userId from deep link

    if (startParam) {
      // Pair this Telegram account with the web user
      try {
        // Set telegramUserId on the user record
        const updated = await db
          .update(users)
          .set({ telegramUserId, updatedAt: nowUnix() })
          .where(eq(users.id, startParam))
          .returning({ id: users.id });

        if (updated.length > 0) {
          // Also update the userAgents record for this agent
          await db
            .update(userAgents)
            .set({
              telegramChatId: String(chatId),
              isPaired: true,
              updatedAt: nowUnix(),
            })
            .where(
              and(
                eq(userAgents.userId, startParam),
                eq(userAgents.agentId, agent.id)
              )
            );

          await sendMessage(botToken, chatId,
            `✅ Connected! I'm your ${agent.name} agent.\n\nYou're all set — just send me a message anytime and I'll get to work.`
          );
          return;
        } else {
          await sendMessage(botToken, chatId,
            `⚠️ Couldn't find your account. Make sure you signed up at the website first, then use the link from your confirmation page.`
          );
          return;
        }
      } catch (err) {
        console.error("[telegram-handler] Pairing error:", err);
        // If telegramUserId already taken (unique constraint), the user may already be paired
        await sendMessage(botToken, chatId,
          `⚠️ This Telegram account may already be linked to another user. Contact support@openclawmarketplace.ai for help.`
        );
        return;
      }
    }

    // Plain /start with no param — check if already paired
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.telegramUserId, telegramUserId))
      .limit(1);

    if (existingUser.length > 0) {
      await sendMessage(botToken, chatId,
        `👋 Welcome back! I'm your ${agent.name} agent. Send me a message and I'll get to work.`
      );
    } else {
      await sendMessage(botToken, chatId,
        `👋 Hey! I'm the ${agent.name} bot.\n\nTo get started, subscribe at https://openclawmarketplace.ai/agents/${agent.slug} — after checkout, you'll get a link that connects your Telegram to your account.`
      );
    }
    return;
  }

  // ── Regular messages: verify subscription ──
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
      `👋 Hey! I'm the ${agent.name} bot.\n\nYou don't have an active subscription. Visit https://openclawmarketplace.ai/agents/${agent.slug} to get started!`
    );
    return;
  }

  const row = rows[0];
  if (row.subStatus !== "active" && row.subStatus !== "trialing") {
    await sendMessage(botToken, chatId,
      `⚠️ Your subscription is ${row.subStatus}. Visit https://openclawmarketplace.ai/dashboard to update billing.`
    );
    return;
  }

  // TODO: Route to session-manager / OpenClaw runtime once integrated
  await sendMessage(botToken, chatId,
    `✅ Message received! Agent session routing coming soon.`
  );
}
