export type Category = 'All' | 'Productivity' | 'Health' | 'Finance' | 'Education' | 'Creative';

export interface Agent {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  longDescription: string;
  category: Exclude<Category, 'All'>;
  priceMonthly: number;
  stripePriceId: string;
  features: string[];
  botUsername: string;
  faq: { question: string; answer: string }[];
}

export const agents: Agent[] = [
  {
    name: 'Study Buddy',
    slug: 'study-buddy',
    emoji: '📚',
    description: 'Your personal AI tutor that adapts to your learning style and helps you ace any subject.',
    longDescription: 'Study Buddy is your always-available personal tutor that breaks down complex topics into digestible explanations. Whether you\'re preparing for exams, learning a new skill, or tackling homework, Study Buddy adapts to your pace and learning style. It creates flashcards, quizzes you on material, explains concepts multiple ways until they click, and tracks your progress over time. Think of it as having a brilliant friend who never gets tired of explaining things.',
    category: 'Education',
    priceMonthly: 9,
    stripePriceId: 'price_1SygbgEyHRuiEtXMyD6sATeP',
    features: [
      'Adaptive learning that matches your pace',
      'Instant explanations for any subject',
      'Auto-generated flashcards and quizzes',
      'Progress tracking across topics',
      'Exam prep with practice questions',
      'Explains concepts in multiple ways',
      'Available 24/7 — study whenever inspiration strikes',
      'Supports math, science, history, languages & more',
    ],
    botUsername: 'openclaw_study_bot',
    faq: [
      { question: 'What subjects can Study Buddy help with?', answer: 'Study Buddy covers virtually any academic subject — math, science, history, literature, programming, economics, and more. It adapts its teaching style to the subject matter.' },
      { question: 'Can it help with college-level courses?', answer: 'Absolutely. Study Buddy handles everything from high school to graduate-level material. It adjusts complexity based on your needs.' },
      { question: 'How does progress tracking work?', answer: 'Study Buddy remembers what you\'ve studied, identifies weak areas, and suggests review sessions. Your learning history is private and persistent.' },
    ],
  },
  {
    name: 'Fitness Coach',
    slug: 'fitness-coach',
    emoji: '💪',
    description: 'A personal trainer in your pocket — custom workouts, form tips, and motivation on demand.',
    longDescription: 'Fitness Coach designs personalized workout plans based on your goals, equipment, and fitness level. Whether you\'re training at home with no equipment or hitting the gym, it creates structured programs that progressively challenge you. Get real-time form tips, alternative exercises for injuries, warm-up and cool-down routines, and the accountability you need to stay consistent. It\'s like having a personal trainer available 24/7 without the $100/hour price tag.',
    category: 'Health',
    priceMonthly: 9,
    stripePriceId: 'price_1SygbhEyHRuiEtXMbndRZOoO',
    features: [
      'Custom workout plans for your goals',
      'Home & gym workout options',
      'Progressive overload tracking',
      'Form tips and injury prevention',
      'Warm-up and cool-down routines',
      'Alternative exercises for equipment/injuries',
      'Weekly check-ins and plan adjustments',
      'Motivation and accountability partner',
    ],
    botUsername: 'openclaw_fitness_bot',
    faq: [
      { question: 'Do I need gym equipment?', answer: 'Not at all. Fitness Coach creates effective bodyweight routines for home workouts, and can also design plans for fully-equipped gyms or anything in between.' },
      { question: 'Can it help with specific goals like weight loss or muscle gain?', answer: 'Yes. Tell Fitness Coach your goals and it will tailor your program accordingly — including workout structure, volume, and exercise selection.' },
      { question: 'Is this safe for beginners?', answer: 'Absolutely. Fitness Coach starts at your level and progressively increases difficulty. It always emphasizes proper form and includes modification options.' },
    ],
  },
  {
    name: 'Meal Planner',
    slug: 'meal-planner',
    emoji: '🍽️',
    description: 'Weekly meal plans, grocery lists, and recipes tailored to your diet and preferences.',
    longDescription: 'Meal Planner takes the stress out of "what\'s for dinner?" by creating personalized weekly meal plans that match your dietary preferences, allergies, budget, and cooking skill level. Get complete recipes with step-by-step instructions, auto-generated grocery lists organized by store aisle, and meal prep strategies to save time. Whether you\'re keto, vegan, gluten-free, or just trying to eat better, Meal Planner makes healthy eating effortless.',
    category: 'Health',
    priceMonthly: 7,
    stripePriceId: 'price_1SygbiEyHRuiEtXMtjEn18F9',
    features: [
      'Personalized weekly meal plans',
      'Auto-generated grocery lists',
      'Dietary restriction support (keto, vegan, etc.)',
      'Budget-friendly meal options',
      'Step-by-step cooking instructions',
      'Meal prep strategies for busy weeks',
      'Nutritional info for every meal',
      'Swap suggestions for ingredients you don\'t have',
    ],
    botUsername: 'openclaw_meals_bot',
    faq: [
      { question: 'Can it handle multiple dietary restrictions?', answer: 'Yes. Meal Planner supports combinations like dairy-free + low-carb, or vegan + nut-free. Just tell it your restrictions and it adapts.' },
      { question: 'Does it consider my budget?', answer: 'Absolutely. You can set a weekly food budget and Meal Planner will prioritize affordable ingredients and suggest cost-saving tips.' },
      { question: 'Can I cook for a family?', answer: 'Yes. Specify your household size and Meal Planner scales recipes and grocery lists accordingly.' },
    ],
  },
  {
    name: 'Crypto Tracker',
    slug: 'crypto-tracker',
    emoji: '📈',
    description: 'Real-time crypto insights, portfolio tracking, and market analysis at your fingertips.',
    longDescription: 'Crypto Tracker keeps you informed about the crypto market without the noise. Get personalized alerts for price movements on coins you care about, daily market summaries, technical analysis breakdowns, and portfolio tracking — all through simple Telegram messages. No more refreshing CoinGecko every 5 minutes. Crypto Tracker distills market data into actionable insights so you can make informed decisions without being glued to charts all day.',
    category: 'Finance',
    priceMonthly: 12,
    stripePriceId: 'price_1SygbiEyHRuiEtXMehFIKIa8',
    features: [
      'Real-time price alerts for your watchlist',
      'Daily market summary and trends',
      'Portfolio value tracking',
      'Technical analysis breakdowns',
      'News sentiment analysis',
      'DeFi yield opportunities',
      'Risk assessment for new tokens',
      'Historical performance comparisons',
    ],
    botUsername: 'openclaw_crypto_bot',
    faq: [
      { question: 'Does it provide financial advice?', answer: 'Crypto Tracker provides market data, analysis, and educational insights — not financial advice. Always do your own research before making investment decisions.' },
      { question: 'Which exchanges and coins are supported?', answer: 'Crypto Tracker covers all major cryptocurrencies and tokens listed on major exchanges. It pulls data from multiple sources for accuracy.' },
      { question: 'Can I track my actual portfolio?', answer: 'Yes. Tell Crypto Tracker your holdings and it will track your portfolio value, gains/losses, and allocation in real-time.' },
    ],
  },
  {
    name: 'Accountability Partner',
    slug: 'accountability-partner',
    emoji: '✅',
    description: 'Set goals, build habits, and stay on track with daily check-ins and smart reminders.',
    longDescription: 'Accountability Partner is the nudge you need to actually follow through on your goals. Set personal goals, break them into daily habits, and get consistent check-ins that keep you on track. It celebrates your wins, helps you recover from setbacks without judgment, and uses proven behavioral science techniques to build lasting habits. Whether it\'s reading more, exercising daily, or finishing a project, Accountability Partner makes sure you show up for yourself.',
    category: 'Productivity',
    priceMonthly: 7,
    stripePriceId: 'price_1SygbjEyHRuiEtXMrtkVRSLO',
    features: [
      'Goal setting with milestone breakdowns',
      'Daily habit tracking and check-ins',
      'Smart reminders at optimal times',
      'Streak tracking with celebrations',
      'Setback recovery without judgment',
      'Weekly progress reports',
      'Behavioral science-backed techniques',
      'Multiple goals and habits simultaneously',
    ],
    botUsername: 'openclaw_accountability_bot',
    faq: [
      { question: 'How many goals can I track at once?', answer: 'As many as you want, though we recommend starting with 2-3 key goals and adding more as habits solidify. Quality over quantity.' },
      { question: 'What time do check-ins happen?', answer: 'You set your preferred check-in times. Accountability Partner adapts to your schedule and timezone.' },
      { question: 'What if I miss a day?', answer: 'No guilt trips here. Accountability Partner helps you understand what happened and get back on track with a positive, supportive approach.' },
    ],
  },
  {
    name: 'Journal Buddy',
    slug: 'journal-buddy',
    emoji: '📝',
    description: 'Guided journaling with thoughtful prompts, mood tracking, and personal insights.',
    longDescription: 'Journal Buddy makes journaling effortless and meaningful. Each day, it offers thoughtful prompts tailored to your mood and life situation, gently guiding you to reflect, process emotions, and gain clarity. Over time, it identifies patterns in your mood and thoughts, offering insights you might miss on your own. Whether you\'re processing a tough day, celebrating a win, or just need to think out loud, Journal Buddy is a judgment-free space that helps you understand yourself better.',
    category: 'Creative',
    priceMonthly: 7,
    stripePriceId: 'price_1SygbjEyHRuiEtXMkG3eUx9m',
    features: [
      'Daily personalized journal prompts',
      'Mood tracking and pattern analysis',
      'Gratitude journaling exercises',
      'Emotional processing support',
      'Monthly reflection summaries',
      'Private and secure — your thoughts stay yours',
      'Morning and evening journaling modes',
      'Insight generation from your entries',
    ],
    botUsername: 'openclaw_journal_bot',
    faq: [
      { question: 'Is my journal private?', answer: 'Completely. Your entries are stored in an isolated workspace that only you can access. We take privacy extremely seriously.' },
      { question: 'Do I have to write a lot?', answer: 'Not at all. Even a sentence or two counts. Journal Buddy adapts to your style — some days you might write paragraphs, other days just a few words.' },
      { question: 'Can I journal multiple times a day?', answer: 'Yes! Journal Buddy is available whenever you want to reflect. Many users check in morning and evening.' },
    ],
  },
  {
    name: 'Career Coach',
    slug: 'career-coach',
    emoji: '💼',
    description: 'Resume reviews, interview prep, salary negotiation tips, and career strategy guidance.',
    longDescription: 'Career Coach is your secret weapon for professional growth. Get expert-level resume and cover letter reviews, practice tough interview questions with realistic feedback, learn salary negotiation tactics, and develop a strategic career plan. Whether you\'re job hunting, angling for a promotion, or considering a career change, Career Coach provides personalized guidance based on your industry, experience level, and goals. It\'s like having a career counselor and interview coach available whenever you need one.',
    category: 'Productivity',
    priceMonthly: 12,
    stripePriceId: 'price_1SygbkEyHRuiEtXMXQN35JOw',
    features: [
      'Resume and cover letter optimization',
      'Mock interview practice with feedback',
      'Salary negotiation strategies',
      'Career path planning and advice',
      'LinkedIn profile optimization',
      'Industry-specific guidance',
      'Networking tips and templates',
      'Job search strategy and tracking',
    ],
    botUsername: 'openclaw_career_bot',
    faq: [
      { question: 'Can it help with my specific industry?', answer: 'Yes. Career Coach adapts its advice to your industry, whether that\'s tech, finance, healthcare, creative fields, or anything else.' },
      { question: 'How does mock interview practice work?', answer: 'Career Coach asks you real interview questions for your target role, then provides detailed feedback on your answers with suggestions for improvement.' },
      { question: 'Can it actually review my resume?', answer: 'Absolutely. Send your resume text and Career Coach will provide specific, actionable feedback on formatting, content, keywords, and impact.' },
    ],
  },
  {
    name: 'Budget Buddy',
    slug: 'budget-buddy',
    emoji: '💰',
    description: 'Track spending, set budgets, and get smart money insights to reach your financial goals.',
    longDescription: 'Budget Buddy makes personal finance simple and stress-free. Log your expenses through quick Telegram messages, set category budgets, and get clear visibility into where your money goes. It identifies spending patterns, suggests areas to save, and helps you work toward financial goals like building an emergency fund or saving for a vacation. No complicated spreadsheets or apps to learn — just chat naturally about your finances and Budget Buddy handles the rest.',
    category: 'Finance',
    priceMonthly: 9,
    stripePriceId: 'price_1SygblEyHRuiEtXMu5n1UXeH',
    features: [
      'Quick expense logging via chat',
      'Category-based budget tracking',
      'Spending pattern analysis',
      'Savings goal tracking',
      'Bill reminder alerts',
      'Monthly spending reports',
      'Smart saving suggestions',
      'Financial goal planning',
    ],
    botUsername: 'openclaw_budget_bot',
    faq: [
      { question: 'How do I log expenses?', answer: 'Just send a message like "Coffee $4.50" or "Groceries $87" and Budget Buddy categorizes and logs it instantly. It\'s that simple.' },
      { question: 'Does it connect to my bank account?', answer: 'No — and that\'s by design. Budget Buddy works through manual logging, which actually increases financial awareness and doesn\'t require sharing sensitive banking credentials.' },
      { question: 'Can it help me save for something specific?', answer: 'Yes. Set savings goals and Budget Buddy tracks your progress, suggests amounts to set aside, and celebrates milestones along the way.' },
    ],
  },
  {
    name: 'Writing Assistant',
    slug: 'writing-assistant',
    emoji: '✍️',
    description: 'Overcome writer\'s block with brainstorming, editing, and creative writing support.',
    longDescription: 'Writing Assistant is your creative partner for any writing project. Whether you\'re working on a novel, blog post, email, or social media content, it helps you brainstorm ideas, overcome writer\'s block, polish your prose, and find your voice. Get real-time feedback on clarity, tone, and structure. It can help you outline stories, develop characters, write compelling hooks, and edit for conciseness. Think of it as a supportive writing workshop partner who\'s always available and never judgmental.',
    category: 'Creative',
    priceMonthly: 9,
    stripePriceId: 'price_1SygblEyHRuiEtXMi2gY5kls',
    features: [
      'Brainstorming and idea generation',
      'Writer\'s block breakthrough techniques',
      'Tone and style adjustment',
      'Grammar and clarity editing',
      'Story outlining and structure',
      'Character development assistance',
      'Multiple formats (blog, email, social, fiction)',
      'Feedback on drafts with specific suggestions',
    ],
    botUsername: 'openclaw_writing_bot',
    faq: [
      { question: 'Does it write content for me?', answer: 'Writing Assistant is a collaborator, not a ghostwriter. It helps you develop ideas, provides feedback, suggests improvements, and helps you find your own voice.' },
      { question: 'What types of writing does it support?', answer: 'Everything from fiction and creative writing to professional emails, blog posts, social media content, academic papers, and more.' },
      { question: 'Can it help with editing existing work?', answer: 'Absolutely. Send your draft and Writing Assistant provides detailed feedback on clarity, structure, tone, grammar, and overall impact.' },
    ],
  },
  {
    name: 'Language Tutor',
    slug: 'language-tutor',
    emoji: '🌍',
    description: 'Learn any language through conversation practice, vocab drills, and grammar lessons.',
    longDescription: 'Language Tutor makes language learning feel natural and fun by turning your Telegram into an immersive practice environment. Have real conversations in your target language, get instant corrections with explanations, build vocabulary through contextual learning, and master grammar through practice — not memorization. It adapts to your proficiency level and learning goals, whether you\'re a complete beginner or polishing advanced skills. It\'s like having a patient native speaker available for practice anytime.',
    category: 'Education',
    priceMonthly: 9,
    stripePriceId: 'price_1SygbmEyHRuiEtXM7Xtu8ihO',
    features: [
      'Conversational practice in your target language',
      'Instant corrections with explanations',
      'Vocabulary building with spaced repetition',
      'Grammar lessons through context',
      'Pronunciation tips and guides',
      'Cultural context and idioms',
      'Progress tracking by skill area',
      'Multiple languages supported',
    ],
    botUsername: 'openclaw_language_bot',
    faq: [
      { question: 'Which languages are supported?', answer: 'Language Tutor supports all major world languages including Spanish, French, German, Japanese, Mandarin, Korean, Portuguese, Italian, and many more.' },
      { question: 'What level do I need to be?', answer: 'Any level works. Language Tutor adapts from complete beginner (starting with basics) to advanced (nuanced conversation practice and idioms).' },
      { question: 'Can I practice conversation?', answer: 'Yes! That\'s the core experience. Have natural conversations in your target language and get real-time corrections and suggestions.' },
    ],
  },
];

export const categories: Category[] = ['All', 'Productivity', 'Health', 'Finance', 'Education', 'Creative'];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find(a => a.slug === slug);
}

export function getAgentsByCategory(category: Category): Agent[] {
  if (category === 'All') return agents;
  return agents.filter(a => a.category === category);
}

export function getFeaturedAgents(): Agent[] {
  return agents.slice(0, 6);
}
