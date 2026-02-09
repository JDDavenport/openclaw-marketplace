'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'What do these agents actually DO?',
    answer: 'They do real work, autonomously. A Morning Briefing Agent delivers a personalized news digest at 7:30 AM. A Job Hunter searches job boards and writes cover letters. A Content Engine writes and schedules social media posts. They\'re not chatbots — they\'re workers that deliver tangible output every day.',
  },
  {
    question: 'Do I need to prompt them every day?',
    answer: 'No. That\'s the whole point. Your agents work on autopilot — scheduled tasks run automatically, and deliverables arrive in your Telegram without any input. You can ask follow-up questions anytime, but the core work happens whether you interact or not.',
  },
  {
    question: 'How much time will I actually save?',
    answer: 'It depends on the agent. Monitors ($9/mo) save 2-4 hours per week on information gathering. Workers ($15/mo) save 5-10 hours per week on active tasks. Premium agents ($25/mo) save 10-20 hours per week on complex workflows. Most users report the time savings justify the cost within the first week.',
  },
  {
    question: 'Is my data private?',
    answer: 'Absolutely. Each agent runs in a completely isolated workspace. Your data, preferences, and deliverables are never shared with other users or used to train models. Your privacy is non-negotiable.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, no questions asked. Cancel your subscription anytime and you won\'t be charged again. Your data will be retained for 30 days in case you change your mind.',
  },
  {
    question: 'What makes this different from ChatGPT or Claude?',
    answer: 'General AI tools require you to prompt them every time. Our agents work autonomously on a schedule — they monitor, research, write, and deliver without being asked. Plus, each agent is specialized with the right tools, data sources, and workflows for its specific job.',
  },
  {
    question: 'Can I subscribe to multiple agents?',
    answer: 'Yes! Subscribe to as many agents as you want. Each one operates independently with its own Telegram bot and workspace. Many users start with one and add more as they see the value.',
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
            Everything you need to know about OpenClaw worker agents.
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
