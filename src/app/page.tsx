import Link from 'next/link';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { FAQ } from '@/components/landing/faq';
import { AgentGrid } from '@/components/agents/agent-grid';
import { Button } from '@/components/ui/button';
import { getFeaturedAgents, agents } from '@/lib/agents-data';

function FeaturedAgents() {
  const featured = getFeaturedAgents();
  return (
    <section className="py-24 md:py-32 bg-gray-900/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Meet Your <span className="gradient-text">AI Agents</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Each agent is a specialist — trained for one job and excellent at it.
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
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            No hidden fees. No long-term contracts. Cancel anytime.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {[
            { price: 7, label: 'Starting at', agents: 'Meal Planner, Accountability Partner, Journal Buddy', desc: 'Perfect for building daily habits' },
            { price: 9, label: 'Most popular', agents: 'Study Buddy, Fitness Coach, Budget Buddy, Writing Assistant, Language Tutor', desc: 'The sweet spot for most users', featured: true },
            { price: 12, label: 'Premium', agents: 'Crypto Tracker, Career Coach', desc: 'Advanced AI for complex tasks' },
          ].map((tier) => (
            <div
              key={tier.price}
              className={`rounded-2xl border p-8 transition-all duration-300 ${
                tier.featured
                  ? 'border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-violet-500/10 scale-105 shadow-xl shadow-blue-500/10'
                  : 'border-gray-800 bg-gray-900/30 hover:border-gray-700'
              }`}
            >
              {tier.featured && (
                <div className="text-xs font-medium text-blue-400 mb-4 uppercase tracking-wider">Most Popular</div>
              )}
              <div className="text-sm text-gray-500 mb-2">{tier.label}</div>
              <div className="mb-4">
                <span className="text-5xl font-bold text-white">${tier.price}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">{tier.desc}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{tier.agents}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 flex flex-wrap justify-center gap-6">
          <span>✓ Cancel anytime</span>
          <span>✓ 7-day free trial</span>
          <span>✓ Secure Stripe payments</span>
          <span>✓ Instant access</span>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: 'Sarah K.', role: 'Marketing Manager', text: 'Study Buddy helped me pass my PMP certification on the first try. Having a tutor available at midnight when I actually study? Game changer.', emoji: '👩‍💼' },
    { name: 'Mike R.', role: 'Software Engineer', text: 'Budget Buddy finally made me aware of where my money goes. Just texting my expenses made me spend 30% less in the first month.', emoji: '👨‍💻' },
    { name: 'Lisa T.', role: 'Freelance Designer', text: 'Accountability Partner keeps me on track with my freelance goals. It\'s like having a supportive friend who actually follows up.', emoji: '👩‍🎨' },
  ];

  return (
    <section className="py-24 md:py-32 bg-gray-900/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Loved by <span className="gradient-text">Early Users</span>
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
          Ready to Get Your <span className="gradient-text">AI Agent</span>?
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Join hundreds of users who&apos;ve already made their daily routine smarter with personal AI agents on Telegram.
        </p>
        <Link href="/agents">
          <Button variant="gradient" size="lg">
            Browse All Agents →
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
      <CTA />
    </>
  );
}
