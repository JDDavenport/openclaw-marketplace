"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { formatCents } from "@/lib/utils";

interface AgentSubscription {
  subscriptionId: string;
  status: string;
  currentPeriodEnd: number | null;
  agentId: string;
  agentName: string;
  agentSlug: string;
  agentDescription: string;
  agentCategory: string;
  agentPrice: number;
  agentBotUsername: string;
  agentImageUrl: string | null;
}

const STATUS_STYLES: Record<string, { label: string; classes: string }> = {
  active: { label: "Active", classes: "bg-green-500/20 text-green-400" },
  trialing: { label: "Trial", classes: "bg-blue-500/20 text-blue-400" },
  past_due: { label: "Past Due", classes: "bg-yellow-500/20 text-yellow-400" },
  canceled: { label: "Cancelled", classes: "bg-red-500/20 text-red-400" },
};

// Emoji map for known agents (matches agents-data.ts)
const AGENT_EMOJI: Record<string, string> = {
  "study-buddy": "📚",
  "fitness-coach": "💪",
  "meal-planner": "🍽️",
  "crypto-tracker": "📈",
  "accountability-partner": "✅",
  "journal-buddy": "📝",
  "career-coach": "💼",
  "budget-buddy": "💰",
  "writing-assistant": "✍️",
  "language-tutor": "🌍",
};

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [subs, setSubs] = useState<AgentSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingLoading, setBillingLoading] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      setLoading(false);
      return;
    }
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => setSubs(data.subscriptions ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session, isPending]);

  const openBillingPortal = useCallback(async () => {
    setBillingLoading(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error || "Could not open billing portal");
    } catch {
      alert("Something went wrong");
    } finally {
      setBillingLoading(false);
    }
  }, []);

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Please sign in to view your dashboard.</p>
        <Link href="/signin" className="rounded-md bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700">
          Sign In
        </Link>
      </div>
    );
  }

  const activeSubs = subs.filter((s) => s.status === "active" || s.status === "trialing");
  const totalSpend = activeSubs.reduce((sum, s) => sum + s.agentPrice, 0);

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">My Dashboard</h1>
          <div className="flex gap-3">
            {subs.length > 0 && (
              <button
                onClick={openBillingPortal}
                disabled={billingLoading}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white font-medium hover:bg-gray-700 disabled:opacity-50"
              >
                {billingLoading ? "Opening…" : "Manage Billing"}
              </button>
            )}
            <Link
              href="/agents"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white font-medium hover:bg-blue-700"
            >
              Browse Agents
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-lg border border-gray-800 p-6">
            <p className="text-sm text-gray-400">Active Agents</p>
            <p className="text-2xl font-bold">{activeSubs.length}</p>
          </div>
          <div className="rounded-lg border border-gray-800 p-6">
            <p className="text-sm text-gray-400">Total Subscriptions</p>
            <p className="text-2xl font-bold">{subs.length}</p>
          </div>
          <div className="rounded-lg border border-gray-800 p-6">
            <p className="text-sm text-gray-400">Monthly Spend</p>
            <p className="text-2xl font-bold">{formatCents(totalSpend * 100)}</p>
          </div>
        </section>

        {/* Agents */}
        <section>
          <h2 className="text-lg font-semibold mb-4">My Agents</h2>

          {subs.length === 0 ? (
            <div className="rounded-lg border border-gray-800 p-12 text-center">
              <p className="text-4xl mb-4">🤖</p>
              <p className="text-gray-400 mb-4">You don&apos;t have any agents yet.</p>
              <Link
                href="/agents"
                className="inline-block rounded-md bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700"
              >
                Get Your First Agent
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subs.map((sub) => {
                const statusInfo = STATUS_STYLES[sub.status] ?? {
                  label: sub.status,
                  classes: "bg-gray-500/20 text-gray-400",
                };
                const emoji = AGENT_EMOJI[sub.agentSlug] ?? "🤖";
                const nextBilling = sub.currentPeriodEnd
                  ? new Date(sub.currentPeriodEnd * 1000).toLocaleDateString()
                  : "—";

                return (
                  <div
                    key={sub.subscriptionId}
                    className="rounded-lg border border-gray-800 p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{emoji}</span>
                        <div>
                          <h3 className="font-semibold">{sub.agentName}</h3>
                          <p className="text-sm text-gray-400">{sub.agentCategory}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusInfo.classes}`}>
                        {statusInfo.label}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2">{sub.agentDescription}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-2 border-t border-gray-800">
                      <span>{formatCents(sub.agentPrice * 100)}/mo</span>
                      <span>Next billing: {nextBilling}</span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={`https://t.me/${sub.agentBotUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white font-medium hover:bg-blue-700"
                      >
                        Open in Telegram
                      </a>
                      <Link
                        href={`/agents/${sub.agentSlug}`}
                        className="rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
