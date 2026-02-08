export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '🔍',
      title: 'Browse',
      description: 'Explore our collection of specialized AI agents. Each one is designed for a specific purpose — from fitness coaching to language learning.',
    },
    {
      number: '02',
      icon: '💳',
      title: 'Subscribe',
      description: 'Choose your agent and subscribe with a simple monthly payment. No long-term contracts, cancel anytime. Prices start at just $7/month.',
    },
    {
      number: '03',
      icon: '💬',
      title: 'Chat on Telegram',
      description: 'Get instant access to your personal AI agent on Telegram. Start chatting immediately — your agent remembers everything and gets smarter over time.',
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
            Getting started takes less than 2 minutes. Seriously.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative group">
              {/* Connector line */}
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
