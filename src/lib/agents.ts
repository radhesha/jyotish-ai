import type { Agent } from "@/types";

export const AGENTS: Agent[] = [
  {
    id: "dhruva",
    name: "Dhruva",
    title: "Career & Life Purpose Advisor",
    specialty: "Career, dharma, 10th house, Daśā timing",
    description:
      "Analyzes your 10th house, Ātmakāraka, and Daśā periods to reveal your dharmic career path, peak professional windows, and ideal fields of work.",
    icon: "🌟",
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    tier: "free",
    sampleQuestions: [
      "Which career field suits my chart?",
      "When is my next professional growth period?",
      "Am I on my dharmic path?",
      "How to navigate a career transition in my current Daśā?",
    ],
  },
  {
    id: "ananya",
    name: "Ananya",
    title: "Relationships & Marriage Specialist",
    specialty: "7th house, Venus, Navāṃśa, compatibility",
    description:
      "Reads your 7th house, Venus placement, and Navāṃśa chart to assess relationship patterns, marriage timing, and compatibility dynamics.",
    icon: "💑",
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
    tier: "free",
    sampleQuestions: [
      "When will I meet my life partner?",
      "What qualities should I look for in a spouse?",
      "How compatible are my chart and my partner's?",
      "Why do I keep attracting difficult partners?",
    ],
  },
  {
    id: "lakshmi",
    name: "Lakshmi",
    title: "Wealth & Finance Oracle",
    specialty: "2nd & 11th house, Jupiter, Dhana Yogas",
    description:
      "Examines your Dhana Yogas, 2nd and 11th houses, and Jupiter transits to identify wealth-building periods and financial strategies aligned with your chart.",
    icon: "💰",
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    tier: "pro",
    sampleQuestions: [
      "What does my chart say about financial success?",
      "When are my best periods for investment?",
      "Do I have strong Dhana Yogas?",
      "How can I improve financial stability in my current Daśā?",
    ],
  },
  {
    id: "arogya",
    name: "Ārogya",
    title: "Health & Vitality Guide",
    specialty: "6th house, Lagna, Ascendant lord, medical astrology",
    description:
      "Studies your Lagna, 6th house, and planetary afflictions to identify health sensitivities, recovery windows, and preventative lifestyle guidance.",
    icon: "🌿",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
    tier: "pro",
    sampleQuestions: [
      "What health areas should I be mindful of?",
      "When is a good period to focus on healing?",
      "Which planets are affecting my vitality?",
      "What lifestyle changes does my chart suggest?",
    ],
  },
  {
    id: "kala",
    name: "Kāla",
    title: "Timing & Prediction Expert",
    specialty: "Daśā, Antardaśā, transits, Varṣaphal",
    description:
      "Specializes in precise event timing using Vimshottari Daśā, Antardaśā layers, Gochara transits, and annual Varṣaphal to identify key life windows.",
    icon: "⏳",
    color: "#8b5cf6",
    gradient: "from-violet-500 to-purple-600",
    tier: "pro",
    sampleQuestions: [
      "What major events are coming in the next 2 years?",
      "When does my current Daśā end and what follows?",
      "Is this a good year overall for me?",
      "What does Saturn's transit mean for me?",
    ],
  },
  {
    id: "jyoti",
    name: "Jyoti",
    title: "Spiritual Path & Soul Advisor",
    specialty: "Mokṣa houses, Ketu, Ātmakāraka, spiritual Daśā",
    description:
      "Illuminates your spiritual evolution through 12th house, Ketu, Ātmakāraka, and Jaimini indicators — revealing past-life patterns and the soul's current journey.",
    icon: "🕯️",
    color: "#f97316",
    gradient: "from-orange-400 to-amber-600",
    tier: "pro",
    sampleQuestions: [
      "What is my soul's purpose in this lifetime?",
      "What past-life patterns is Ketu showing?",
      "How can I deepen my spiritual practice?",
      "What does my Ātmakāraka reveal about my evolution?",
    ],
  },
  {
    id: "vastu",
    name: "Vastu",
    title: "Remedies & Gemstone Advisor",
    specialty: "Upayas, gemstones, mantras, planetary remedies",
    description:
      "Prescribes targeted Jyotiṣa remedies — gemstones, mantras, rituals, and lifestyle Upayas — based on your specific planetary afflictions and strengths.",
    icon: "💎",
    color: "#6366f1",
    gradient: "from-indigo-500 to-violet-600",
    tier: "premium",
    sampleQuestions: [
      "Which gemstone is right for me?",
      "What mantras should I recite for my chart?",
      "How can I strengthen a weak planet?",
      "What Upayas help with my current challenges?",
    ],
  },
  {
    id: "vidya",
    name: "Vidyā",
    title: "Education & Skills Consultant",
    specialty: "4th & 5th house, Mercury, Jupiter, learning styles",
    description:
      "Maps your 4th and 5th houses, Mercury, and Jupiter to guide academic pursuits, ideal study methods, skill development timing, and best fields of learning.",
    icon: "📚",
    color: "#0ea5e9",
    gradient: "from-sky-500 to-cyan-600",
    tier: "pro",
    sampleQuestions: [
      "What subjects or skills come naturally to me?",
      "Is now a good time to pursue higher education?",
      "How should I approach studying given my chart?",
      "When are my strongest periods for learning?",
    ],
  },
  {
    id: "pravasa",
    name: "Pravāsa",
    title: "Travel & Relocation Specialist",
    specialty: "12th house, foreign connections, Astrocartography",
    description:
      "Analyzes your 12th house, foreign planets, and Daśā periods for ideal relocation timing, favorable countries, and travel opportunities encoded in your chart.",
    icon: "✈️",
    color: "#14b8a6",
    gradient: "from-teal-500 to-emerald-600",
    tier: "premium",
    sampleQuestions: [
      "Which countries are favorable for me?",
      "Will I settle abroad? When?",
      "What does my chart say about long-distance travel?",
      "Is now a good time to relocate?",
    ],
  },
  {
    id: "muhurta",
    name: "Muhūrta",
    title: "Auspicious Timing Advisor",
    specialty: "Electional astrology, Pañchāṅga, Muhūrta selection",
    description:
      "Uses classical Muhūrta principles and Pañchāṅga to identify the most auspicious moments for marriage, business launch, property purchase, travel, and major decisions.",
    icon: "🗓️",
    color: "#d97706",
    gradient: "from-yellow-500 to-amber-600",
    tier: "premium",
    sampleQuestions: [
      "When is the best time to start my business?",
      "Find me an auspicious date for marriage next year.",
      "Is today favorable for signing contracts?",
      "What is the best Muhūrta for a property purchase?",
    ],
  },
];

export const getAgent = (id: string): Agent | undefined =>
  AGENTS.find((a) => a.id === id);

export const TIER_AGENTS: Record<string, string[]> = {
  free: ["dhruva", "ananya"],
  pro: ["dhruva", "ananya", "lakshmi", "arogya", "kala", "jyoti", "vidya"],
  premium: AGENTS.map((a) => a.id),
};
