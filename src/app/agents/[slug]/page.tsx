import { notFound } from 'next/navigation';
import Link from 'next/link';
import { agents, getAgentBySlug } from '@/lib/agents-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckoutButton } from '@/components/agents/checkout-button';

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const isComingSoon = agent.status === 'coming_soon';

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Coming Soon Banner */}
        {isComingSoon && (
          <div className="mb-8 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-6 py-4 text-center">
            <span className="text-yellow-400 font-semibold text-lg">🚧 Coming Soon</span>
            <p className="text-yellow-400/80 text-sm mt-1">This agent is currently in development. Check back soon!</p>
          </div>
        )}

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
                <Badge>{agent.category} — ${agent.priceMonthly}/mo</Badge>
                <h1 className="text-4xl font-bold mt-2">{agent.name}</h1>
              </div>
            </div>

            {/* Key stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2">
                <div className="text-xs text-green-400 font-medium">Time Saved</div>
                <div className="text-lg font-bold text-white">{agent.timeSaved}</div>
              </div>
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2">
                <div className="text-xs text-blue-400 font-medium">Daily Deliverable</div>
                <div className="text-sm font-medium text-white">{agent.dailyDeliverable}</div>
              </div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed mb-6">{agent.description}</p>
            <p className="text-gray-400 leading-relaxed">{agent.longDescription}</p>
          </div>

          {/* Pricing card */}
          <div className="lg:col-span-2">
            {agent.tiers ? (
              <div className="sticky top-24 space-y-4">
                <div className="text-sm text-gray-500 mb-2">Choose your plan</div>
                {agent.tiers.map((tier) => {
                  const isPopular = tier.name === 'Pro';
                  return (
                    <Card
                      key={tier.name}
                      className={`p-6 border-gray-700 relative ${isPopular ? 'border-blue-500 ring-1 ring-blue-500/50' : ''}`}
                    >
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Most Popular
                        </div>
                      )}
                      <div className="flex items-baseline justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                        <div>
                          <span className="text-3xl font-bold">${tier.price}</span>
                          <span className="text-gray-500">/mo</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-5">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="text-green-400 mt-0.5">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      {isComingSoon ? (
                        <Button variant="outline" size="lg" className="w-full" disabled>
                          Coming Soon
                        </Button>
                      ) : (
                        <CheckoutButton
                          agentSlug={agent.slug}
                          agentName={agent.name}
                          stripePriceId={tier.stripePriceId}
                          label={`Get ${tier.name} — $${tier.price}/mo`}
                        />
                      )}
                    </Card>
                  );
                })}
                <div className="text-center text-xs text-gray-500 mt-2">
                  7-day free trial • Cancel anytime • Secure payment
                </div>
              </div>
            ) : (
              <Card className="p-8 sticky top-24 border-gray-700">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Monthly subscription</div>
                  <div>
                    <span className="text-5xl font-bold">${agent.priceMonthly}</span>
                    <span className="text-gray-500 text-lg">/mo</span>
                  </div>
                </div>

                {isComingSoon ? (
                  <Button variant="outline" size="lg" className="w-full mb-4" disabled>
                    Coming Soon
                  </Button>
                ) : (
                  <CheckoutButton agentSlug={agent.slug} agentName={agent.name} />
                )}

                <div className="text-center text-xs text-gray-500 mb-6">
                  {isComingSoon ? 'This agent is under development' : '7-day free trial • Cancel anytime • Secure payment'}
                </div>

                <div className="border-t border-gray-800 pt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-green-400">✓</span> Fully autonomous — works while you sleep
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-green-400">✓</span> Daily deliverables to your Telegram
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-green-400">✓</span> Persistent memory across sessions
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-green-400">✓</span> Saves {agent.timeSaved} of your time
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">What {agent.name} Delivers</h2>
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

        {/* How it works preview */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <Card className="p-8 border-gray-700">
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm bg-gray-800 border border-gray-700 px-4 py-3 text-sm text-gray-200 max-w-xs">
                  {agent.emoji} Good morning! Here&apos;s your daily deliverable — ready for review. No action needed unless you want to dig deeper.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm bg-blue-500/20 border border-blue-500/30 px-4 py-3 text-sm text-gray-200 max-w-xs">
                  This is great — tell me more about item #3.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm bg-gray-800 border border-gray-700 px-4 py-3 text-sm text-gray-200 max-w-xs">
                  Here&apos;s the deep dive on that. I&apos;ll keep monitoring and update you if anything changes. 📊
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
              Your agent works autonomously and delivers results daily. Ask follow-ups anytime.
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
