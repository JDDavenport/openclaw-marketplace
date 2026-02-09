export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '🔍',
      title: 'Pick Your Agent',
      description: 'Browse 9 worker agents across 3 tiers. Monitors ($9), Workers ($15), and Premium ($25). Each agent is built for a specific job.',
    },
    {
      number: '02',
      icon: '💳',
      title: 'Subscribe',
      description: 'Subscribe with a simple monthly payment. Your agent starts working immediately — first deliverable arrives within 24 hours. Cancel anytime.',
    },
    {
      number: '03',
      icon: '📬',
      title: 'Get Daily Deliverables',
      description: 'Your agent works autonomously — briefings, reports, alerts, and drafts delivered straight to Telegram. No prompting needed. Just results.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Subscribe today, get your first deliverable tomorrow morning.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative group">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-gray-700 to-transparent" />
              )}

              <div className="rounded-2xl border border-gray-800 bg-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/60">
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-4xl">{step.icon}</span>
                  <span className="text-sm font-mono text-gray-600">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
