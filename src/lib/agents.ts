import type { Agent } from "@/types";

// ─── Vedic (Parashara / Jaimini) Agents ───────────────────────────────────────

export const VEDIC_AGENTS: Agent[] = [
  {
    id: "dhruva",
    system: "vedic",
    name: "Dhruva",
    title: "Career & Life Purpose",
    specialty: "10th house, Ātmakāraka, Daśāṃśa (D-10), Rāja Yogas",
    description:
      "Analyzes your 10th house, Ātmakāraka, and Vimshottari Daśā periods to reveal your dharmic career path, peak professional windows, and ideal fields of work.",
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
    system: "vedic",
    name: "Ananya",
    title: "Relationships & Marriage",
    specialty: "7th house, Venus, Navāṃśa (D-9), Upapada Lagna",
    description:
      "Reads your 7th house, Venus placement, and Navāṃśa chart to assess relationship patterns, marriage timing, spouse qualities, and compatibility.",
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
    system: "vedic",
    name: "Lakshmi",
    title: "Wealth & Finance",
    specialty: "2nd & 11th house, Dhana Yogas, Jupiter, Artha Trines",
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
    system: "vedic",
    name: "Ārogya",
    title: "Health & Vitality",
    specialty: "Lagna lord, 6th & 8th house, planetary afflictions",
    description:
      "Studies your Lagna, 6th house, and planetary afflictions to identify health sensitivities, recovery windows, and preventative Āyurvedic lifestyle guidance.",
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
    system: "vedic",
    name: "Kāla",
    title: "Timing & Prediction",
    specialty: "Vimshottari Daśā, transits, Varṣaphal, Aṣṭakavarga",
    description:
      "Specializes in precise event timing using Vimshottari Daśā layers, Gochara transits, Varṣaphal, and Ashtakavarga to map upcoming life windows.",
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
    system: "vedic",
    name: "Jyoti",
    title: "Spiritual Path & Soul",
    specialty: "Mokṣa houses, Ketu, Ātmakāraka, Jaimini Chara Karakas",
    description:
      "Illuminates your spiritual evolution through 12th house, Ketu, Ātmakāraka, and Jaimini indicators — revealing past-life karma and the soul's current journey.",
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
    system: "vedic",
    name: "Vastu",
    title: "Remedies & Gemstones",
    specialty: "Upayas, gemstone prescriptions, mantras, Yantras",
    description:
      "Prescribes targeted Jyotiṣa remedies — gemstones, mantras, rituals, and Upayas — based on your specific planetary afflictions and Daśā lord.",
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
    system: "vedic",
    name: "Vidyā",
    title: "Education & Skills",
    specialty: "4th & 5th house, Mercury, Jupiter, learning aptitude",
    description:
      "Maps your 4th and 5th houses, Mercury, and Jupiter to guide academic pursuits, natural aptitudes, skill development timing, and best fields of learning.",
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
    system: "vedic",
    name: "Pravāsa",
    title: "Travel & Relocation",
    specialty: "12th house, Rāhu, foreign Yogas, Daśā for settlement",
    description:
      "Analyzes your 12th house, Rāhu, and Daśā periods for ideal relocation timing, favorable countries, and foreign opportunities encoded in your birth chart.",
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
    system: "vedic",
    name: "Muhūrta",
    title: "Auspicious Timing",
    specialty: "Electional astrology, Pañchāṅga, Lagna selection",
    description:
      "Uses classical Muhūrta principles and Pañchāṅga to identify the most auspicious moments for marriage, business launch, property purchase, and major decisions.",
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

// ─── KP (Krishnamurti Paddhati) Agents ────────────────────────────────────────

export const KP_AGENTS: Agent[] = [
  {
    id: "kriya",
    system: "kp",
    name: "Kriya",
    title: "Career & Profession (KP)",
    specialty: "10th cusp sub-lord, career significators, D-10 KP analysis",
    description:
      "Uses KP sub-lord theory to analyze the 10th cusp sub-lord and its house connections to identify your most suitable profession and career breakthrough windows.",
    icon: "🎯",
    color: "#f59e0b",
    gradient: "from-amber-500 to-yellow-600",
    tier: "free",
    sampleQuestions: [
      "What does my 10th cusp sub-lord say about my career?",
      "Is a job change promised in my chart right now?",
      "Which profession is best suited for me via KP?",
      "When will I get a promotion per KP timing?",
    ],
  },
  {
    id: "bandhu",
    system: "kp",
    name: "Bandhu",
    title: "Relationships & Marriage (KP)",
    specialty: "7th cusp sub-lord, marriage significators, Ruling Planets",
    description:
      "Applies KP sub-lord and significator analysis to the 7th cusp to pinpoint marriage timing with precision and assess relationship compatibility.",
    icon: "💞",
    color: "#f43f5e",
    gradient: "from-rose-500 to-pink-600",
    tier: "free",
    sampleQuestions: [
      "What does my 7th cusp sub-lord say about marriage?",
      "When exactly will I get married per KP?",
      "Are there any delays in my marriage indicated?",
      "What kind of spouse does my KP chart show?",
    ],
  },
  {
    id: "artha",
    system: "kp",
    name: "Artha",
    title: "Wealth & Finance (KP)",
    specialty: "2nd & 11th cusp sub-lords, financial significators",
    description:
      "Reads the 2nd and 11th cusp sub-lords and their significators to time financial gains, identify wealth periods, and assess income sources through KP methodology.",
    icon: "📈",
    color: "#22c55e",
    gradient: "from-green-500 to-emerald-600",
    tier: "pro",
    sampleQuestions: [
      "When will I experience financial gains per KP?",
      "What do my 2nd and 11th cusp sub-lords indicate?",
      "Is a windfall or inheritance promised in my chart?",
      "How can I time my investments using KP?",
    ],
  },
  {
    id: "swastha",
    system: "kp",
    name: "Swastha",
    title: "Health & Recovery (KP)",
    specialty: "6th & 8th cusp sub-lords, hospitalization significators",
    description:
      "Analyzes 6th and 8th cusp sub-lords in KP to identify health vulnerabilities, surgical periods, recovery windows, and the nature of potential ailments.",
    icon: "🩺",
    color: "#38bdf8",
    gradient: "from-sky-400 to-cyan-600",
    tier: "pro",
    sampleQuestions: [
      "What does my 6th cusp sub-lord indicate for health?",
      "Is surgery or hospitalization indicated in my chart?",
      "When is my recovery period as per KP?",
      "Which body systems are vulnerable per my KP chart?",
    ],
  },
  {
    id: "kairos",
    system: "kp",
    name: "Kairos",
    title: "Precise Event Timing (KP)",
    specialty: "Cuspal interlinks, Ruling Planets, transit triggers",
    description:
      "Master of KP event timing — uses cuspal interlinks, Ruling Planets at query time, Vimshottari sub-lords, and transit triggers to pinpoint exact event windows.",
    icon: "🔬",
    color: "#a855f7",
    gradient: "from-purple-500 to-violet-600",
    tier: "pro",
    sampleQuestions: [
      "When exactly will this event happen as per KP?",
      "What are the cuspal interlinks for this matter?",
      "Which Ruling Planets confirm this event?",
      "Is the event promised at all in my chart?",
    ],
  },
  {
    id: "prashna",
    system: "kp",
    name: "Prashna",
    title: "KP Horary Specialist",
    specialty: "249 KP sub-lords, horary chart, Prashna Lagna analysis",
    description:
      "Answers specific life questions through KP Horary (Prashna) — using the 249 sub-lord table, the Prashna Lagna, and significators to give clear yes/no and timing answers.",
    icon: "🔮",
    color: "#8b5cf6",
    gradient: "from-violet-500 to-indigo-600",
    tier: "pro",
    sampleQuestions: [
      "Will I get this job? (KP Horary)",
      "Will my business deal succeed?",
      "Is my missing item recoverable?",
      "Will I travel abroad this year per Prashna?",
    ],
  },
  {
    id: "chaya",
    system: "kp",
    name: "Chāyā",
    title: "Education & Property (KP)",
    specialty: "4th & 5th cusp sub-lords, academic & real estate significators",
    description:
      "Uses KP analysis of the 4th and 5th cusp sub-lords to time academic success, property acquisition, vehicle purchase, and educational breakthroughs.",
    icon: "🏠",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-600",
    tier: "pro",
    sampleQuestions: [
      "When will I buy a house per KP analysis?",
      "Will I pass my exam this attempt?",
      "What does my 4th cusp sub-lord say about property?",
      "Is higher education indicated in my KP chart?",
    ],
  },
  {
    id: "rekha",
    system: "kp",
    name: "Rekhā",
    title: "Birth Time Rectification (KP)",
    specialty: "KP BTR, cuspal sub-lord verification, past event matching",
    description:
      "Specializes in KP Birth Time Rectification — cross-references your life events against cuspal sub-lord changes to pinpoint your accurate birth time to the minute.",
    icon: "⏱️",
    color: "#e11d48",
    gradient: "from-rose-600 to-red-700",
    tier: "premium",
    sampleQuestions: [
      "I don't know my exact birth time — can KP help?",
      "How does KP Birth Time Rectification work?",
      "Which life events are used to rectify birth time?",
      "My chart results seem off — could my birth time be wrong?",
    ],
  },
  {
    id: "nadi",
    system: "kp",
    name: "Nādi",
    title: "Ruling Planets & Transit (KP)",
    specialty: "Ruling Planets selection, KP transit triggers, Dasha-transit links",
    description:
      "Expert in KP Ruling Planets — identifies the Moon sign, star, and sub lords at query time to verify event promises and confirm timing through transit triggers.",
    icon: "🪐",
    color: "#64748b",
    gradient: "from-slate-500 to-gray-600",
    tier: "premium",
    sampleQuestions: [
      "What are my Ruling Planets today?",
      "How do I use Ruling Planets to confirm an event?",
      "Which transit will trigger my pending matter?",
      "Explain Ruling Planets for my current query.",
    ],
  },
  {
    id: "yatra",
    system: "kp",
    name: "Yātra",
    title: "Travel & Foreign Settlement (KP)",
    specialty: "12th & 9th cusp sub-lords, foreign significators, KP relocation",
    description:
      "Reads 12th and 9th cusp sub-lords and their connections to foreign houses to time overseas travel, immigration, and foreign settlement through KP methodology.",
    icon: "🌏",
    color: "#0d9488",
    gradient: "from-teal-600 to-cyan-700",
    tier: "premium",
    sampleQuestions: [
      "Will I settle abroad? What does KP say?",
      "When will my visa be approved per KP?",
      "What do my 12th cusp sub-lord and significators show?",
      "Is foreign travel promised in my current Dasha?",
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
