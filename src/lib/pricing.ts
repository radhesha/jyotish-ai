import type { PricingPlan } from "@/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Seeker",
    price: 0,
    priceId: "",
    description: "Start with 4 foundational advisors — 2 Vedic, 2 KP.",
    limit: 20,
    features: [
      "20 messages per month",
      "Vedic: Dhruva (Career) & Ananya (Relationships)",
      "KP: Kriya (Career) & Bandhu (Relationships)",
      "Birth chart context awareness",
      "Conversation history (7 days)",
    ],
  },
  {
    id: "pro",
    name: "Practitioner",
    price: 19,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
    description: "Unlock 14 advisors across both Vedic and KP systems.",
    limit: 300,
    highlight: true,
    features: [
      "300 messages per month",
      "14 AI advisors unlocked (7 Vedic + 7 KP)",
      "Vedic: Dhruva, Ananya, Lakshmi, Ārogya, Kāla, Jyoti, Vidyā",
      "KP: Kriya, Bandhu, Artha, Swastha, Kairos, Prashna, Chāyā",
      "Full Daśā, transit & cuspal interlink analysis",
      "Conversation history (90 days)",
      "PDF consultation reports",
      "Priority response speed",
    ],
  },
  {
    id: "premium",
    name: "Jyotiṣī",
    price: 49,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ?? "",
    description: "The complete platform — all 20 advisors, both systems.",
    limit: 1000,
    features: [
      "1,000 messages per month",
      "All 20 AI advisors unlocked",
      "All 10 Vedic + All 10 KP advisors",
      "KP: Rekhā (BTR), Nādi (Ruling Planets), Yātra (Travel)",
      "Vedic: Vastu (Remedies), Pravāsa (Travel), Muhūrta (Timing)",
      "Unlimited conversation history",
      "Downloadable PDF reports",
      "Early access to new features",
      "Priority support",
    ],
  },
];

export const getPlan = (tier: string) =>
  PRICING_PLANS.find((p) => p.id === tier) ?? PRICING_PLANS[0];
