'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { agents } from '@/lib/agents-data';

function SuccessContent() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const agentSlug = searchParams.get('agent');
  const agent = agentSlug ? agents.find(a => a.slug === agentSlug) : null;

  const botUsername = agent?.botUsername || 'openclaw_bot';
  const agentName = agent?.name || 'Your AI Agent';
  const agentEmoji = agent?.emoji || '🤖';

  // Bug fix #3: Deep link includes userId so the bot can pair Telegram ↔ web account
  const userId = session?.user?.id || '';
  const telegramDeepLink = `https://t.me/${botUsername}?start=${userId}`;

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        {/* Celebration */}
        <div className="mb-8">
          <span className="text-7xl inline-block animate-bounce">🎉</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">
          You&apos;re All <span className="gradient-text">Set!</span>
        </h1>
        <p className="text-lg text-gray-400 mb-10">
          {agentEmoji} <strong>{agentName}</strong> is ready and waiting for you on Telegram. Let&apos;s get you connected.
        </p>

        {/* Telegram CTA — deep link pairs Telegram account to web user */}
        <a
          href={telegramDeepLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="gradient" size="lg" className="text-lg px-12 py-5">
            💬 Open {agentName} on Telegram
          </Button>
        </a>

        <p className="text-sm text-gray-500 mt-4 mb-16">
          Click the button above to start chatting with your agent
        </p>

        {/* Setup Steps */}
        <Card className="p-8 text-left border-gray-700">
          <h2 className="text-xl font-bold mb-6">Quick Setup Guide</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Open the Telegram link',
                description: `Click the button above or search for @${botUsername} in Telegram.`,
              },
              {
                step: 2,
                title: 'Hit "Start"',
                description: `Press the Start button in Telegram. This links your Telegram account to your subscription automatically.`,
              },
              {
                step: 3,
                title: 'Introduce yourself',
                description: 'Tell your agent about your goals. The more context you give, the better it can help.',
              },
              {
                step: 4,
                title: 'Start chatting!',
                description: 'That\'s it! Your agent is ready. Chat anytime — it remembers everything and learns your preferences.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-8 text-left border-gray-700 mt-6">
          <h2 className="text-xl font-bold mb-4">💡 Pro Tips</h2>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              Be specific about your goals — your agent tailors its help to what you need.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              Chat daily for the best results. Consistency is key.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              Your agent remembers everything, so you can pick up right where you left off.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              Need help? Just ask your agent — or email support@openclawmarketplace.ai
            </li>
          </ul>
        </Card>

        <div className="mt-10">
          <Link href="/agents">
            <Button variant="ghost" size="md">
              ← Browse More Agents
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="pt-28 pb-20 text-center text-gray-400">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
