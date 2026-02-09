import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-1.5 text-sm text-gray-400 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          9 worker agents — doing real work, every day
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          AI Agents That{' '}
          <span className="gradient-text">Do the Work</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed md:text-xl" style={{ animationDelay: '0.1s' }}>
          Autonomous agents that deliver real output every day — briefings, research, job applications, content, and more. Not chatbots. Workers.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.2s' }}>
          <Link href="/agents">
            <Button variant="gradient" size="lg">
              Browse Worker Agents
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg">
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Value props */}
        <div className="animate-fade-in mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2">
            <span>🤖</span>
            <span>Fully autonomous — no prompting needed</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-gray-700" />
          <div>📬 Daily deliverables to your Telegram</div>
          <div className="hidden sm:block h-4 w-px bg-gray-700" />
          <div>⏱️ Save 5-20 hours per week</div>
        </div>
      </div>
    </section>
  );
}
