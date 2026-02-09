export type Tier = 'monitors' | 'workers' | 'premium';
export type Category = 'All' | 'Monitors' | 'Workers' | 'Premium';

export type AgentStatus = 'active' | 'coming_soon';

export interface AgentTier {
  name: string;
  price: number;
  stripePriceId: string;
  features: string[];
}

export interface Agent {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  longDescription: string;
  category: Exclude<Category, 'All'>;
  tier: Tier;
  priceMonthly: number;
  stripePriceId: string;
  features: string[];
  botUsername: string;
  timeSaved: string;
  dailyDeliverable: string;
  faq: { question: string; answer: string }[];
  status: AgentStatus;
  tiers?: AgentTier[];
}

export const agents: Agent[] = [
  // === TIER 1: MONITORS ($9/mo) ===
  {
    name: 'Canvas Study Agent',
    slug: 'canvas-bot',
    emoji: '📚',
    description: 'Your AI study assistant that connects to Canvas LMS. Daily briefs, deadline alerts, subject expertise, note uploads, and exam prep. Three tiers starting at $9/mo.',
    longDescription: 'Connect your Canvas LMS account and this agent becomes your personal study assistant. **Basic ($9/mo):** Every morning you get a brief with all upcoming assignments grouped by urgency, with clickable links straight to Canvas. Deadline alerts every 2 hours. Ask "What\'s due tomorrow?" or "Show my grades" anytime. **Pro ($15/mo):** Unlock Subject Expert mode — the bot ingests your course content and answers questions like a tutor. Upload handwritten notes (photo OCR), PDFs, or text and it remembers everything. Quiz mode tests you on course material. **Premium ($25/mo):** AI-generated study plans, exam prep mode, grade predictions, and priority support. Works with any school using Canvas. Setup takes 2 minutes — it auto-detects your current semester courses.',
    category: 'Monitors',
    tier: 'monitors',
    priceMonthly: 9,
    stripePriceId: 'price_1SyjJKEyHRuiEtXMQz2cHork',
    timeSaved: '20 min/day',
    dailyDeliverable: 'Morning assignment brief + deadline alerts every 2 hours',
    features: [
      '📋 Basic ($9/mo): Daily morning brief with clickable Canvas links',
      '📋 Basic: Deadline alerts every 2 hours for unsubmitted work',
      '📋 Basic: Chat commands — due dates, grades, course summaries',
      '📋 Basic: Auto-detects your semester courses on setup',
      '🎓 Pro ($15/mo): Subject Expert — ask questions, get answers from course content',
      '🎓 Pro: Upload notes (photos, PDFs, text) — bot remembers everything',
      '🎓 Pro: Quiz mode — test yourself on any topic',
      '🚀 Premium ($25/mo): AI study plans, exam prep, grade predictions',
    ],
    botUsername: 'openclaw_canvas_bot',
    status: 'active',
    tiers: [
      {
        name: 'Basic',
        price: 9,
        stripePriceId: 'price_1SyjJKEyHRuiEtXMQz2cHork',
        features: [
          'Daily morning brief with clickable Canvas links',
          'Deadline alerts every 2 hours',
          'Chat commands — due dates, grades, course summaries',
          'Auto-detects semester courses on setup',
        ],
      },
      {
        name: 'Pro',
        price: 15,
        stripePriceId: 'price_1SylMsEyHRuiEtXMPOhecOoE',
        features: [
          'Everything in Basic',
          'Subject Expert — ask questions from course content',
          'Upload notes (photos, PDFs, text) — bot remembers all',
          'Quiz mode — test yourself on any topic',
        ],
      },
      {
        name: 'Premium',
        price: 25,
        stripePriceId: 'price_1SylMsEyHRuiEtXMyWSACrqb',
        features: [
          'Everything in Pro',
          'AI-generated study plans',
          'Exam prep mode with practice questions',
          'Grade predictions and priority support',
        ],
      },
    ],
    faq: [
      { question: 'What schools does this work with?', answer: 'Any school that uses Canvas LMS (Instructure). This includes most US universities and many international ones. If your school\'s LMS URL contains "instructure.com" or "canvas", it will work.' },
      { question: 'Is my Canvas token safe?', answer: 'Your token is encrypted and stored securely. We never share it or use it for anything other than fetching your course data. You can revoke it anytime from Canvas settings.' },
      { question: 'What time does the morning brief arrive?', answer: '7:00 AM in your timezone by default, but you can customize this during setup. The deadline checker runs every 2 hours and only messages you when something urgent is coming up.' },
    ],
  },
  {
    name: 'Price Tracker',
    slug: 'price-tracker',
    emoji: '💰',
    description: 'Monitors product prices on Amazon, eBay, and more — alerts you instantly when prices drop. Tracks stocks and crypto too. Saves hours of manual price checking.',
    longDescription: 'Give this agent a list of products (Amazon links, stock symbols, crypto tokens) and it checks prices every 4 hours. When a price hits your target or drops significantly, you get an instant alert with buy links. It also sends a weekly summary with price trends, deals you caught, and deals you missed. Users save an average of $50-200/month on purchases they were going to make anyway.',
    category: 'Monitors',
    tier: 'monitors',
    priceMonthly: 9,
    stripePriceId: 'price_1SyjJKEyHRuiEtXMwb7KcZoV',
    timeSaved: '2-3 hrs/week',
    dailyDeliverable: 'Price checks every 4 hours + instant drop alerts',
    features: [
      'Monitors Amazon, eBay, Target, Best Buy prices',
      'Tracks stock prices and crypto tokens',
      'Instant alerts when prices hit your targets',
      'Historical price charts and trend analysis',
      'Weekly summary with all tracked items',
      'Customizable alert thresholds (10%, 20%, custom)',
      'Checks prices every 4 hours automatically',
      'One-tap buy links when deals hit',
    ],
    botUsername: 'openclaw_pricetrack_bot',
    status: 'coming_soon',
    faq: [
      { question: 'How many items can I track?', answer: 'Unlimited. Most users track 10-30 items across products, stocks, and crypto. Add items anytime by pasting a link or typing a stock symbol.' },
      { question: 'How fast are the alerts?', answer: 'Price checks run every 4 hours. When a drop is detected, you get a Telegram alert within minutes.' },
      { question: 'Does it work for international stores?', answer: 'Currently supports major US retailers. International Amazon stores (UK, DE, JP) are coming soon.' },
    ],
  },
  {
    name: 'Social Listener',
    slug: 'social-listener',
    emoji: '👂',
    description: 'Monitors Twitter, Reddit, and HackerNews for mentions of your name, brand, or topics. Alerts you to opportunities and threats in real-time. Weekly reputation report included.',
    longDescription: 'This agent searches Twitter, Reddit, HackerNews, and Google every 2 hours for mentions of your name, company, or products. It scores each mention for sentiment and urgency, alerts you instantly to important ones, and spots opportunities — like people asking questions you can answer or journalists looking for sources. Every Friday you get a weekly reputation report with sentiment trends and engagement opportunities.',
    category: 'Monitors',
    tier: 'monitors',
    priceMonthly: 9,
    stripePriceId: 'price_1SyjJLEyHRuiEtXMFXqifgGE',
    timeSaved: '3-4 hrs/week',
    dailyDeliverable: 'Mention alerts every 2 hours + Friday reputation report',
    features: [
      'Monitors Twitter, Reddit, HackerNews, LinkedIn',
      'Tracks your name, brand, and custom keywords',
      'Sentiment analysis on every mention',
      'Instant alerts for negative or viral mentions',
      'Opportunity alerts — people asking questions you can answer',
      'Weekly reputation report with trends',
      'Competitor mention tracking',
      'Checks every 2 hours automatically',
    ],
    botUsername: 'openclaw_listener_bot',
    status: 'coming_soon',
    faq: [
      { question: 'How many keywords can I track?', answer: 'Up to 10 keywords or phrases. Most users track their name, company name, product names, and a few competitor names.' },
      { question: 'Will I get spammed with alerts?', answer: 'No. The agent scores mentions by importance and only alerts you on significant ones. Routine mentions go into the weekly report.' },
      { question: 'Can it help me respond to mentions?', answer: 'It can draft responses for you to review before posting. You always have final say on what gets published.' },
    ],
  },

  // === TIER 2: WORKERS ($15/mo) ===
  {
    name: 'Job Hunter',
    slug: 'job-hunter',
    emoji: '🎯',
    description: 'Searches Indeed, LinkedIn, and AngelList daily for jobs matching your criteria. Scores every match, writes custom cover letters, and tracks your application pipeline. Like having a recruiter working for you 24/7.',
    longDescription: 'Every morning at 9 AM, this agent searches major job boards for roles matching your resume and criteria. It scores each job 0-100 on fit, writes personalized cover letters for your top matches (referencing specific company details), and tracks your entire application pipeline with follow-up reminders. It even researches salary ranges and prepares negotiation talking points. Users report landing interviews 3x faster.',
    category: 'Workers',
    tier: 'workers',
    priceMonthly: 15,
    stripePriceId: 'price_1SyjJMEyHRuiEtXMSFchXr24',
    timeSaved: '8-10 hrs/week',
    dailyDeliverable: 'Daily job report with scored matches + cover letter drafts',
    features: [
      'Daily job search across Indeed, LinkedIn, AngelList',
      'Every job scored 0-100 on fit to your profile',
      'Custom cover letters written for top matches',
      'Application pipeline tracking with follow-ups',
      'Salary research and negotiation talking points',
      'Weekly pipeline review with recommendations',
      'Company research and culture analysis',
      'Interview prep materials for scheduled interviews',
    ],
    botUsername: 'openclaw_jobhunt_bot',
    status: 'coming_soon',
    faq: [
      { question: 'How does job scoring work?', answer: 'The agent compares each job posting against your resume, skills, preferences, and salary targets. A 90+ score means near-perfect match. It explains why each score is what it is.' },
      { question: 'Are the cover letters actually personalized?', answer: 'Yes. Each cover letter references specific details from the job posting and company — not generic templates. Users report significantly higher response rates.' },
      { question: 'Can it actually apply for me?', answer: 'Not yet — we believe you should review and submit applications yourself. But it prepares everything so applying takes 2 minutes instead of 30.' },
    ],
  },
  {
    name: 'Competitor Watch',
    slug: 'competitor-watch',
    emoji: '🕵️',
    description: 'Monitors up to 5 competitor websites for pricing changes, new features, team hires, and marketing shifts. Visual diffs, strategic analysis, and a Monday morning intelligence briefing.',
    longDescription: 'Point this agent at up to 5 competitor websites and it monitors them every 4 hours for changes — pricing updates, new features, content changes, job postings, and marketing campaigns. It takes before/after screenshots with visual diffs so you can see exactly what changed. Every Monday morning you get a competitive intelligence briefing with strategic analysis and recommended actions. It\'s like having a competitive intelligence analyst working around the clock.',
    category: 'Workers',
    tier: 'workers',
    priceMonthly: 15,
    stripePriceId: 'price_1SyjJMEyHRuiEtXMP46Uxjnl',
    timeSaved: '5-8 hrs/week',
    dailyDeliverable: 'Real-time change alerts + Monday intelligence briefing',
    features: [
      'Monitors up to 5 competitor websites',
      'Detects pricing, feature, and content changes',
      'Before/after screenshots with visual diffs',
      'Tracks competitor hiring and team changes',
      'Marketing campaign analysis',
      'Monday morning intelligence briefing',
      'Strategic recommendations based on changes',
      'Checks every 4 hours automatically',
    ],
    botUsername: 'openclaw_compwatch_bot',
    status: 'coming_soon',
    faq: [
      { question: 'What kinds of changes does it detect?', answer: 'Pricing changes, new features, content updates, job postings, team page changes, marketing copy shifts, and new integrations or partnerships.' },
      { question: 'How accurate is the change detection?', answer: 'Very. It uses visual comparison plus content analysis to catch both obvious and subtle changes. False positives are rare — cosmetic-only changes are filtered out.' },
      { question: 'Can I add more than 5 competitors?', answer: 'The standard plan covers 5 competitors. Contact us if you need to monitor more — we can customize.' },
    ],
  },
  {
    name: 'Research Agent',
    slug: 'research-agent',
    emoji: '🔬',
    description: 'Send it any topic and get a comprehensive research report — multi-source, fact-checked, with executive summary and citations. 8 deep research reports per month included.',
    longDescription: 'Say "Research [topic]" and this agent goes to work — searching across web, news, academic sources, and forums to build a comprehensive report. Each report includes an executive summary, detailed findings, source credibility analysis, and full citations. It tracks your research history so follow-up questions build on previous work. Perfect for market research, due diligence, investment analysis, or any topic requiring thorough investigation.',
    category: 'Workers',
    tier: 'workers',
    priceMonthly: 15,
    stripePriceId: 'price_1SyjJNEyHRuiEtXMmws6C8AJ',
    timeSaved: '4-6 hrs/report',
    dailyDeliverable: 'On-demand research reports (up to 8/month)',
    features: [
      'Comprehensive multi-source research reports',
      'Executive summary + detailed findings',
      'Source credibility analysis and scoring',
      'Full citations for every claim',
      'Follow-up questions that build on prior research',
      'Research history preserved across sessions',
      'Market research, due diligence, competitive analysis',
      'Reports delivered in 10-15 minutes',
    ],
    botUsername: 'openclaw_research_bot',
    status: 'coming_soon',
    faq: [
      { question: 'What topics can it research?', answer: 'Anything — market sizing, competitive analysis, technology trends, investment due diligence, academic topics, industry reports. If it\'s on the internet, the Research Agent can investigate it.' },
      { question: 'How long does a report take?', answer: 'Most reports are delivered in 10-15 minutes. Complex topics with many sources may take up to 20 minutes.' },
      { question: 'Are the sources reliable?', answer: 'Every source is scored for credibility. The report clearly labels high, medium, and low credibility sources so you know what to trust.' },
    ],
  },
  {
    name: 'Personal CRM',
    slug: 'personal-crm',
    emoji: '🤝',
    description: 'Tracks your professional relationships — logs interactions, reminds you to follow up, surfaces context before meetings. Never forget a connection again.',
    longDescription: 'This agent acts as your relationship manager. Tell it about people you meet, conversations you have, and commitments you make. It logs everything, reminds you to follow up at the right time, and surfaces relevant context before meetings ("Last spoke 3 weeks ago about their Series A — they were deciding between two term sheets"). It helps you maintain hundreds of relationships without anything falling through the cracks.',
    category: 'Workers',
    tier: 'workers',
    priceMonthly: 15,
    stripePriceId: 'price_1SyjJOEyHRuiEtXMOWnZh3sG',
    timeSaved: '3-5 hrs/week',
    dailyDeliverable: 'Follow-up reminders + pre-meeting context briefs',
    features: [
      'Log interactions via quick Telegram messages',
      'Automatic follow-up reminders',
      'Pre-meeting context briefs with full history',
      'Tracks commitments and promises made',
      'Relationship strength scoring',
      'Birthday and milestone reminders',
      'Contact notes searchable by name or topic',
      'Weekly relationship maintenance suggestions',
    ],
    botUsername: 'openclaw_crm_bot',
    status: 'coming_soon',
    faq: [
      { question: 'How do I log interactions?', answer: 'Just message something like "Had coffee with Sarah Chen — she\'s raising Series A, intro to her co-founder next week." The agent extracts names, context, and follow-ups automatically.' },
      { question: 'Can it integrate with my calendar?', answer: 'Yes. It can pull upcoming meetings and prepare context briefs for each attendee based on your interaction history.' },
      { question: 'How many contacts can it manage?', answer: 'Unlimited. The agent is designed to help you maintain hundreds of relationships that would otherwise go cold.' },
    ],
  },

  // === TIER 3: PREMIUM ($25/mo) ===
  {
    name: 'Executive Assistant',
    slug: 'executive-assistant',
    emoji: '⚡',
    description: 'Your full-service digital chief of staff. Morning briefings, email draft management, calendar optimization, meeting prep, task tracking, and evening wrap-ups. Saves 2+ hours every day.',
    longDescription: 'This is the most comprehensive agent in the marketplace. Every morning at 7 AM you get a full executive briefing: calendar, priorities, weather, email summary, and action items. Throughout the day it drafts email responses, optimizes your calendar (blocking focus time, suggesting meeting consolidation), prepares briefing docs before meetings, tracks your commitments, and sends an evening wrap-up with tomorrow\'s prep. It\'s like having a $60K/year executive assistant for $25/month.',
    category: 'Premium',
    tier: 'premium',
    priceMonthly: 25,
    stripePriceId: 'price_1SyjJOEyHRuiEtXMdguhUua4',
    timeSaved: '2+ hrs/day',
    dailyDeliverable: 'Morning brief, email drafts, meeting prep, evening wrap-up',
    features: [
      '7 AM executive briefing with priorities',
      'Email draft management — responses ready for review',
      'Calendar optimization and focus time blocking',
      'Meeting prep with attendee research and agendas',
      'Task and commitment tracking with reminders',
      'Travel coordination and booking suggestions',
      'Evening wrap-up with tomorrow\'s prep',
      'Midday check-in with schedule adjustments',
    ],
    botUsername: 'openclaw_ea_bot',
    status: 'coming_soon',
    faq: [
      { question: 'Does it actually manage my email?', answer: 'It drafts responses for your review — you always approve before anything is sent. It also auto-archives newsletters and flags truly urgent messages.' },
      { question: 'How does calendar optimization work?', answer: 'The agent analyzes your meeting patterns and suggests consolidation, blocks focus time during your most productive hours, and alerts you to scheduling conflicts.' },
      { question: 'Is this really worth $25/month?', answer: 'If it saves you even 1 hour per day (most users report 2+), that\'s 30 hours/month. At any hourly rate, that\'s a massive ROI.' },
    ],
  },
  {
    name: 'Content Engine',
    slug: 'content-engine',
    emoji: '🚀',
    description: 'Plans, writes, and schedules content across Twitter, LinkedIn, blog, and newsletter. Manages your content calendar, tracks performance, and repurposes one piece into 5-10 formats. Your entire content team for $25/month.',
    longDescription: 'This agent runs your entire content operation. It maintains a content calendar across all your platforms, writes platform-specific drafts (Twitter threads, LinkedIn posts, blog articles, newsletter editions), incorporates trending topics, tracks engagement metrics, and repurposes top-performing content into new formats. Every morning you get today\'s content ready for review, and every evening you get a performance report. Users typically grow their audience 3-5x within 3 months.',
    category: 'Premium',
    tier: 'premium',
    priceMonthly: 25,
    stripePriceId: 'price_1SyjJPEyHRuiEtXMelsG3k87',
    timeSaved: '10+ hrs/week',
    dailyDeliverable: 'Daily content drafts + evening performance report',
    features: [
      'Multi-platform content calendar management',
      'Platform-specific drafts (Twitter, LinkedIn, blog, newsletter)',
      'Trending topic integration',
      'Engagement tracking and performance reports',
      'Content repurposing — 1 piece → 5-10 formats',
      'Audience research and growth strategy',
      'A/B testing recommendations',
      'Weekly content performance review',
    ],
    botUsername: 'openclaw_content_bot',
    status: 'coming_soon',
    faq: [
      { question: 'Does it post automatically?', answer: 'It prepares content for your review first. Once approved, it can schedule posts. You always have final say on what goes live.' },
      { question: 'What platforms does it support?', answer: 'Twitter/X, LinkedIn, blog (any platform), and email newsletters. Instagram and TikTok captions are coming soon.' },
      { question: 'Can it match my writing voice?', answer: 'Yes. During onboarding you share examples of your writing, and the agent learns your tone, vocabulary, and style. Most users say drafts sound like them within the first week.' },
    ],
  },
];

export const categories: Category[] = ['All', 'Monitors', 'Workers', 'Premium'];

export const tierInfo: Record<Tier, { label: string; price: number; description: string }> = {
  monitors: { label: 'Monitors', price: 9, description: 'Set it and forget it — agents that watch the world for you' },
  workers: { label: 'Workers', price: 15, description: 'Your personal workforce — agents that do actual work' },
  premium: { label: 'Premium', price: 25, description: 'Full-service automation — your virtual team' },
};

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find(a => a.slug === slug);
}

export function getAgentsByCategory(category: Category): Agent[] {
  if (category === 'All') return agents;
  return agents.filter(a => a.category === category);
}

export function getAgentsByTier(tier: Tier): Agent[] {
  return agents.filter(a => a.tier === tier);
}

export function getFeaturedAgents(): Agent[] {
  // One from each tier
  return [
    agents.find(a => a.slug === 'canvas-bot')!,
    agents.find(a => a.slug === 'price-tracker')!,
    agents.find(a => a.slug === 'job-hunter')!,
    agents.find(a => a.slug === 'research-agent')!,
    agents.find(a => a.slug === 'executive-assistant')!,
    agents.find(a => a.slug === 'content-engine')!,
  ];
}
