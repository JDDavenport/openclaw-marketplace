'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'What exactly do I get when I subscribe?',
    answer: 'You get a personal AI agent on Telegram that\'s exclusively yours. It has its own isolated workspace, remembers your conversations, and is specialized for its specific purpose. Think of it as hiring a personal assistant that lives in your Telegram.',
  },
  {
    question: 'How quickly can I start using my agent?',
    answer: 'Instantly. After payment, you\'ll receive a link to your personal Telegram bot. Click it, hit "Start," and you\'re chatting with your agent. The whole process takes under 2 minutes.',
  },
  {
    question: 'Is my data private?',
    answer: 'Absolutely. Each agent runs in a completely isolated workspace. Your conversations, data, and preferences are never shared with other users or used to train models. Your privacy is non-negotiable.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, no questions asked. Cancel your subscription anytime and you won\'t be charged again. Your data will be retained for 30 days in case you change your mind.',
  },
  {
    question: 'Do I need to install anything?',
    answer: 'Just Telegram — which you probably already have. No apps to download, no accounts to create, no software to configure. Everything happens through Telegram chat.',
  },
  {
    question: 'What makes this different from ChatGPT?',
    answer: 'Our agents are specialized, not general-purpose. A Fitness Coach knows exercise science. A Budget Buddy understands personal finance. Plus, each agent has persistent memory, so it remembers your goals, preferences, and progress across sessions.',
  },
  {
    question: 'Can I switch agents or subscribe to multiple?',
    answer: 'Yes to both! Subscribe to as many agents as you want. Each one operates independently with its own Telegram bot and workspace.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Everything you need to know about OpenClaw agents.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-800 bg-gray-900/30 overflow-hidden transition-colors hover:border-gray-700"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left cursor-pointer"
              >
                <span className="font-medium text-white pr-4">{faq.question}</span>
                <span
                  className={cn(
                    'text-gray-500 transition-transform duration-200 flex-shrink-0 text-xl',
                    openIndex === i && 'rotate-45',
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300',
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
