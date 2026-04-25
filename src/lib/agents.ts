import type { Agent } from "@/types";

// ─── Vedic Advisors — Life Guidance ───────────────────────────────────────────

export const VEDIC_AGENTS: Agent[] = [
  {
    id: "dhruva",
    system: "vedic",
    name: "Dhruva",
    title: "Career & Life Purpose",
    specialty: "Work, calling, professional growth",
    description:
      "Not sure which career path is right for you? Dhruva reads your birth chart to reveal your natural strengths, ideal work environment, and the best years ahead for professional growth.",
    icon: "🌟",
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    tier: "free",
    sampleQuestions: [
      "What career suits me best?",
      "When will my career take off?",
      "Should I switch jobs right now?",
      "Am I in the right field for me?",
    ],
  },
  {
    id: "ananya",
    system: "vedic",
    name: "Ananya",
    title: "Love & Relationships",
    specialty: "Marriage, partnerships, compatibility",
    description:
      "Wondering when you'll find love, or why past relationships haven't worked out? Ananya explores your chart to reveal relationship patterns, ideal partner qualities, and when marriage is most likely.",
    icon: "💑",
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
    tier: "free",
    sampleQuestions: [
      "When will I find my life partner?",
      "Why do my relationships keep failing?",
      "Are my partner and I compatible?",
      "What kind of person is right for me?",
    ],
  },
  {
    id: "lakshmi",
    system: "vedic",
    name: "Lakshmi",
    title: "Money & Wealth",
    specialty: "Financial growth, investments, abundance",
    description:
      "Your birth chart contains wealth patterns that most people never discover. Lakshmi identifies your financial strengths, the best periods to earn and invest, and what may be blocking abundance.",
    icon: "💰",
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    tier: "pro",
    sampleQuestions: [
      "Will I become financially successful?",
      "When is a good time to invest?",
      "Why do I struggle with saving money?",
      "Is my business idea financially promising?",
    ],
  },
  {
    id: "arogya",
    system: "vedic",
    name: "Ārogya",
    title: "Health & Wellbeing",
    specialty: "Physical health, lifestyle, vitality",
    description:
      "Your chart reveals your body's natural constitution and areas that need extra care. Ārogya identifies health-sensitive periods and suggests lifestyle adjustments to support long-term wellbeing.",
    icon: "🌿",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
    tier: "pro",
    sampleQuestions: [
      "What health issues should I watch out for?",
      "When will my health improve?",
      "What lifestyle suits my constitution?",
      "Is this a risky period for my health?",
    ],
  },
  {
    id: "kala",
    system: "vedic",
    name: "Kāla",
    title: "Life Timing & Cycles",
    specialty: "Major life events, lucky periods, challenges ahead",
    description:
      "Life moves in cycles — and your chart maps them precisely. Kāla identifies your upcoming peak periods, challenging phases, and the key windows for major decisions like marriage, business, or moving.",
    icon: "⏳",
    color: "#8b5cf6",
    gradient: "from-violet-500 to-purple-600",
    tier: "pro",
    sampleQuestions: [
      "What major changes are coming for me?",
      "Is this a good year for me overall?",
      "When will things get easier?",
      "What does the next 2 years look like?",
    ],
  },
  {
    id: "jyoti",
    system: "vedic",
    name: "Jyoti",
    title: "Spiritual Growth & Soul Path",
    specialty: "Life purpose, karma, inner growth",
    description:
      "Why are you here? What patterns keep repeating in your life? Jyoti uses your chart to illuminate your soul's journey, uncover karmic patterns, and guide you toward deeper meaning and purpose.",
    icon: "🕯️",
    color: "#f97316",
    gradient: "from-orange-400 to-amber-600",
    tier: "pro",
    sampleQuestions: [
      "What is my true life purpose?",
      "Why do I keep repeating the same patterns?",
      "How can I grow spiritually?",
      "What lessons am I here to learn?",
    ],
  },
  {
    id: "vastu",
    system: "vedic",
    name: "Vastu",
    title: "Remedies & Solutions",
    specialty: "Practical remedies, gemstones, positive changes",
    description:
      "If certain areas of life feel stuck or difficult, your chart can point to why — and what to do about it. Vastu recommends practical, personalised remedies based on your specific planetary patterns.",
    icon: "💎",
    color: "#6366f1",
    gradient: "from-indigo-500 to-violet-600",
    tier: "premium",
    sampleQuestions: [
      "What can I do to improve my luck?",
      "Is a gemstone right for me?",
      "How can I overcome this difficult period?",
      "What simple changes will make a difference?",
    ],
  },
  {
    id: "vidya",
    system: "vedic",
    name: "Vidyā",
    title: "Education & Skills",
    specialty: "Learning strengths, studies, right field of knowledge",
    description:
      "Not everyone learns the same way — your chart reveals how your mind works best. Vidyā identifies your natural aptitudes, best fields of study, and the right timing for exams, degrees, and new skills.",
    icon: "📚",
    color: "#0ea5e9",
    gradient: "from-sky-500 to-cyan-600",
    tier: "pro",
    sampleQuestions: [
      "What am I naturally gifted at?",
      "Should I pursue higher education?",
      "Which subjects will I excel in?",
      "When is a good time to start a course?",
    ],
  },
  {
    id: "pravasa",
    system: "vedic",
    name: "Pravāsa",
    title: "Travel & Living Abroad",
    specialty: "Foreign opportunities, relocation, best countries",
    description:
      "Some people are destined for life abroad — your chart shows whether that's you. Pravāsa identifies the best countries and timing for travel, immigration, and building a life in a new place.",
    icon: "✈️",
    color: "#14b8a6",
    gradient: "from-teal-500 to-emerald-600",
    tier: "premium",
    sampleQuestions: [
      "Will I settle in another country?",
      "When is the best time to move abroad?",
      "Which countries are good for me?",
      "Is immigration on the cards for me?",
    ],
  },
  {
    id: "muhurta",
    system: "vedic",
    name: "Muhūrta",
    title: "Best Time to Act",
    specialty: "Auspicious timing for big decisions",
    description:
      "Timing is everything. Muhūrta finds the most favourable dates for life's biggest moments — starting a business, getting married, signing a contract, buying property, or beginning something new.",
    icon: "🗓️",
    color: "#d97706",
    gradient: "from-yellow-500 to-amber-600",
    tier: "premium",
    sampleQuestions: [
      "What's the best date to launch my business?",
      "Find me a good date for my wedding.",
      "When should I sign this contract?",
      "Is this month good for starting something new?",
    ],
  },
];

// ─── KP Advisors — Precise Predictions ────────────────────────────────────────

export const KP_AGENTS: Agent[] = [
  {
    id: "kriya",
    system: "kp",
    name: "Kriya",
    title: "Job & Career Predictions",
    specialty: "Job offers, promotions, business success",
    description:
      "Need a straight answer about your career? Kriya uses precise prediction techniques to tell you whether a job offer, promotion, or business venture is likely — and when to expect results.",
    icon: "🎯",
    color: "#f59e0b",
    gradient: "from-amber-500 to-yellow-600",
    tier: "free",
    sampleQuestions: [
      "Will I get this job offer?",
      "When will I get a promotion?",
      "Should I start my own business?",
      "Will this job interview go well?",
    ],
  },
  {
    id: "bandhu",
    system: "kp",
    name: "Bandhu",
    title: "Marriage & Love Predictions",
    specialty: "When you'll marry, relationship outcomes",
    description:
      "Asking when you'll get married or whether your current relationship will lead somewhere? Bandhu gives you clear, timed predictions about love and marriage based on your birth chart.",
    icon: "💞",
    color: "#f43f5e",
    gradient: "from-rose-500 to-pink-600",
    tier: "free",
    sampleQuestions: [
      "When exactly will I get married?",
      "Will this relationship work out?",
      "Is there a delay in my marriage?",
      "Will I meet someone special this year?",
    ],
  },
  {
    id: "artha",
    system: "kp",
    name: "Artha",
    title: "Money & Financial Gains",
    specialty: "When money comes, financial breakthroughs",
    description:
      "When will money flow in? Artha predicts specific windows for financial gains, salary increases, business profits, and unexpected windfalls — based on your chart's precise timing indicators.",
    icon: "📈",
    color: "#22c55e",
    gradient: "from-green-500 to-emerald-600",
    tier: "pro",
    sampleQuestions: [
      "When will I earn more money?",
      "Will this investment pay off?",
      "Am I going to receive a windfall soon?",
      "When will my financial situation improve?",
    ],
  },
  {
    id: "swastha",
    system: "kp",
    name: "Swastha",
    title: "Health Predictions",
    specialty: "Recovery timing, health risks, surgery windows",
    description:
      "Worried about a health issue? Swastha predicts the likely duration of illness, best periods for recovery, and whether any medical procedures are indicated in the coming months.",
    icon: "🩺",
    color: "#38bdf8",
    gradient: "from-sky-400 to-cyan-600",
    tier: "pro",
    sampleQuestions: [
      "When will I recover from this illness?",
      "Is surgery likely for me this year?",
      "Is this a risky period for my health?",
      "When will I feel strong and healthy again?",
    ],
  },
  {
    id: "kairos",
    system: "kp",
    name: "Kairos",
    title: "Exact Event Timing",
    specialty: "Precise timing — month and year",
    description:
      "If you need to know not just whether something will happen — but exactly when — Kairos is your advisor. Using advanced prediction techniques, Kairos narrows timing down to specific months.",
    icon: "🔬",
    color: "#a855f7",
    gradient: "from-purple-500 to-violet-600",
    tier: "pro",
    sampleQuestions: [
      "Exactly when will this happen?",
      "Give me a specific timeframe for this event.",
      "Which month is best for this decision?",
      "How soon will I see results?",
    ],
  },
  {
    id: "prashna",
    system: "kp",
    name: "Prashna",
    title: "Ask a Specific Question",
    specialty: "Yes/No answers, horary astrology",
    description:
      "Have one burning question you need answered right now? Prashna specialises in horary astrology — casting a chart for the moment you ask and delivering a clear, direct answer.",
    icon: "🔮",
    color: "#8b5cf6",
    gradient: "from-violet-500 to-indigo-600",
    tier: "pro",
    sampleQuestions: [
      "Will I get this job? Yes or no?",
      "Will this deal go through?",
      "Is my missing item recoverable?",
      "Will I travel abroad this year?",
    ],
  },
  {
    id: "chaya",
    system: "kp",
    name: "Chāyā",
    title: "Property & Education",
    specialty: "Buying a home, passing exams, vehicles",
    description:
      "Planning to buy a house, pass an exam, or purchase a vehicle? Chāyā predicts whether these events are likely and when the timing is right — based on your chart's property and education indicators.",
    icon: "🏠",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-600",
    tier: "pro",
    sampleQuestions: [
      "When will I be able to buy a home?",
      "Will I pass my exam this time?",
      "Is this a good year to buy property?",
      "Will I get into the college I applied for?",
    ],
  },
  {
    id: "rekha",
    system: "kp",
    name: "Rekhā",
    title: "Fix Your Birth Time",
    specialty: "Birth time rectification for accurate readings",
    description:
      "Don't know your exact birth time? An inaccurate birth time leads to inaccurate predictions. Rekhā uses life events to pinpoint your correct birth time, making all future readings far more accurate.",
    icon: "⏱️",
    color: "#e11d48",
    gradient: "from-rose-600 to-red-700",
    tier: "premium",
    sampleQuestions: [
      "I don't know my exact birth time — can you help?",
      "My predictions always seem off — could my birth time be wrong?",
      "How do I find my correct birth time?",
      "Can astrology still work without an accurate birth time?",
    ],
  },
  {
    id: "nadi",
    system: "kp",
    name: "Nādi",
    title: "Confirm Your Timing",
    specialty: "Verifying predictions, transit triggers",
    description:
      "Once a prediction is made, Nādi cross-checks it using the planetary positions at the exact moment you asked — confirming whether the timing is right and when the planets will trigger the event.",
    icon: "🪐",
    color: "#64748b",
    gradient: "from-slate-500 to-gray-600",
    tier: "premium",
    sampleQuestions: [
      "Is this the right time for this decision?",
      "Will things change for me this month?",
      "Are the planets supporting my plans right now?",
      "Why hasn't this happened yet even though it was predicted?",
    ],
  },
  {
    id: "yatra",
    system: "kp",
    name: "Yātra",
    title: "Visa, Travel & Abroad",
    specialty: "Visa approvals, immigration, foreign settlement",
    description:
      "Waiting on a visa or wondering if you'll be able to move abroad? Yātra predicts visa outcomes, immigration success, and the best timing for foreign travel and relocation.",
    icon: "🌏",
    color: "#0d9488",
    gradient: "from-teal-600 to-cyan-700",
    tier: "premium",
    sampleQuestions: [
      "Will my visa application be approved?",
      "When can I move abroad?",
      "Is immigration in my future?",
      "Which country should I move to?",
    ],
  },
];

// ─── Combined ──────────────────────────────────────────────────────────────────

export const ALL_AGENTS: Agent[] = [...VEDIC_AGENTS, ...KP_AGENTS];

export const getAgent = (id: string): Agent | undefined =>
  ALL_AGENTS.find((a) => a.id === id);

export const TIER_AGENTS: Record<string, string[]> = {
  free: ["dhruva", "ananya", "kriya", "bandhu"],
  pro: [
    "dhruva", "ananya", "lakshmi", "arogya", "kala", "jyoti", "vidya",
    "kriya", "bandhu", "artha", "swastha", "kairos", "prashna", "chaya",
  ],
  premium: ALL_AGENTS.map((a) => a.id),
};
