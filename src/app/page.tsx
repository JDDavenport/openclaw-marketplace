import Link from 'next/link';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { FAQ } from '@/components/landing/faq';
import { NewsletterSignup } from '@/components/landing/newsletter-signup';
import { AgentGrid } from '@/components/agents/agent-grid';
import { Button } from '@/components/ui/button';
import { getFeaturedAgents, agents, getAgentsByTier, tierInfo } from '@/lib/agents-data';

function FeaturedAgents() {
  const featured = getFeaturedAgents();
  return (
    <section className="py-24 md:py-32 bg-gray-900/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Your <span className="gradient-text">Worker Agents</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Each agent runs autonomously — delivering real work to your Telegram every day.
          </p>
        </div>
        <AgentGrid agents={featured} />
        <div className="mt-12 text-center">
          <Link href="/agents">
            <Button variant="outline" size="lg">
              View All {agents.length} Agents →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { key: 'monitors' as const, icon: '👁️', featured: false },
    { key: 'workers' as const, icon: '⚒️', featured: false },
    { key: 'career' as const, icon: '💼', featured: true },
    { key: 'premium' as const, icon: '⚡', featured: false },
    { key: 'builders' as const, icon: '👨‍💻', featured: false },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Pay for the work you need. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto">
          {tiers.map(({ key, icon, featured }) => {
            const info = tierInfo[key];
            const tierAgents = getAgentsByTier(key);
            return (
              <div
                key={key}
                className={`rounded-2xl border p-8 transition-all duration-300 ${
                  featured
                    ? 'border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-violet-500/10 scale-105 shadow-xl shadow-blue-500/10'
                    : 'border-gray-800 bg-gray-900/30 hover:border-gray-700'
                }`}
              >
                {featured && (
                  <div className="text-xs font-medium text-blue-400 mb-4 uppercase tracking-wider">Best Value</div>
                )}
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">{info.label}</div>
                <div className="mb-4">
                  {info.priceLabel ? (
                    <>
                      <span className="text-4xl font-bold text-white">{info.priceLabel}</span>
                      <span className="text-gray-500">/mo</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-white">${info.price}</span>
                      <span className="text-gray-500">/mo per agent</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-6">{info.description}</p>
                <ul className="space-y-2">
                  {tierAgents.map(a => (
                    <li key={a.slug} className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{a.emoji}</span> {a.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 flex flex-wrap justify-center gap-6">
          <span>✓ Cancel anytime</span>
          <span>✓ 7-day free trial</span>
          <span>✓ Secure Stripe payments</span>
          <span>✓ Daily deliverables from day 1</span>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: 'Sarah K.', role: 'Startup Founder', text: 'The Morning Briefing Agent replaced 30 minutes of doom-scrolling. I get exactly what I need at 7:30 AM and start working immediately.', emoji: '👩‍💼' },
    { name: 'Mike R.', role: 'Product Manager', text: 'Competitor Watch caught a pricing change from our main rival within hours. That intel alone was worth a year of subscription.', emoji: '👨‍💻' },
    { name: 'Lisa T.', role: 'Content Creator', text: 'The Content Engine writes drafts that actually sound like me. I went from posting twice a month to daily — and grew 4x in 3 months.', emoji: '👩‍🎨' },
  ];

  return (
    <section className="py-24 md:py-32 bg-gray-900/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Real Work, <span className="gradient-text">Real Results</span>
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-gray-800 bg-gray-900/30 p-8">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">★★★★★</div>
              <p className="text-gray-300 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{t.emoji}</span>
                <div>
                  <div className="font-medium text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold md:text-5xl mb-6">
          Put Your <span className="gradient-text">Agents to Work</span>
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Stop doing work that an agent can do better, faster, and cheaper. Subscribe today and get your first deliverable tomorrow morning.
        </p>
        <Link href="/agents">
          <Button variant="gradient" size="lg">
            Browse Worker Agents →
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedAgents />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <NewsletterSignup />
      <CTA />
    </>
  );
}
