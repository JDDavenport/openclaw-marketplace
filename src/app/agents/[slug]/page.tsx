import { notFound } from 'next/navigation';
import Link from 'next/link';
import { agents, getAgentBySlug } from '@/lib/agents-data';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckoutButton } from '@/components/agents/checkout-button';

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/agents" className="hover:text-gray-300 transition-colors">Agents</Link>
          <span>/</span>
          <span className="text-gray-300">{agent.name}</span>
        </div>

        {/* Hero */}
        <div className="grid gap-12 lg:grid-cols-5 mb-20">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">{agent.emoji}</span>
              <div>
                <Badge>{agent.category}</Badge>
                <h1 className="text-4xl font-bold mt-2">{agent.name}</h1>
              </div>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">{agent.description}</p>
            <p className="text-gray-400 leading-relaxed">{agent.longDescription}</p>
          </div>

          {/* Pricing card */}
          <div className="lg:col-span-2">
            <Card className="p-8 sticky top-24 border-gray-700">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Monthly subscription</div>
                <div>
                  <span className="text-5xl font-bold">${agent.priceMonthly}</span>
                  <span className="text-gray-500 text-lg">/mo</span>
                </div>
              </div>

              <CheckoutButton agentSlug={agent.slug} agentName={agent.name} />

              <div className="text-center text-xs text-gray-500 mb-6">
                7-day free trial • Cancel anytime • Secure payment
              </div>

              <div className="border-t border-gray-800 pt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-green-400">✓</span> Personal Telegram bot
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-green-400">✓</span> Isolated private workspace
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-green-400">✓</span> Persistent memory
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-green-400">✓</span> Available 24/7
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">What {agent.name} Can Do</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {agent.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-gray-800 bg-gray-900/30 p-5 transition-colors hover:border-gray-700"
              >
                <span className="text-blue-400 mt-0.5">✦</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Demo preview */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">See It In Action</h2>
          <Card className="p-8 border-gray-700">
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm bg-blue-500/20 border border-blue-500/30 px-4 py-3 text-sm text-gray-200 max-w-xs">
                  Hey! I need help getting started.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm bg-gray-800 border border-gray-700 px-4 py-3 text-sm text-gray-200 max-w-xs">
                  {agent.emoji} Hi there! I&apos;m your {agent.name}. I&apos;m here to help! Let me learn a bit about you first — what are your main goals?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm bg-blue-500/20 border border-blue-500/30 px-4 py-3 text-sm text-gray-200 max-w-xs">
                  I want to get more organized and build better habits.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm bg-gray-800 border border-gray-700 px-4 py-3 text-sm text-gray-200 max-w-xs">
                  Great choice! Let&apos;s start by breaking that down. I&apos;ll create a personalized plan just for you. First question: what does your typical day look like? 📋
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
              This is a preview. Your actual conversations will be personalized to you.
            </div>
          </Card>
        </section>

        {/* FAQ */}
        {agent.faq.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {agent.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
                  <h3 className="font-medium text-white mb-2">{item.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
