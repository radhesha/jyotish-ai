import type { PricingPlan } from "@/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Seeker",
    price: 0,
    priceId: "", // No Stripe price needed
    description: "Begin your Jyotiṣa journey with two foundational advisors.",
    limit: 20,
    features: [
      "20 messages per month",
      "Access to Dhruva (Career) & Ananya (Relationships)",
      "Birth chart context awareness",
      "Conversation history (7 days)",
    ],
  },
  {
    id: "pro",
    name: "Practitioner",
    price: 19,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
    description: "Unlock 7 specialized AI advisors for deep life guidance.",
    limit: 300,
    highlight: true,
    features: [
      "300 messages per month",
      "7 AI advisors unlocked",
      "Dhruva, Ananya, Lakshmi, Ārogya, Kāla, Jyoti, Vidyā",
      "Full Daśā & transit analysis",
      "Birth chart context awareness",
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
    description: "The complete platform — all 10 advisors with unlimited depth.",
    limit: 1000,
    features: [
      "1,000 messages per month",
      "All 10 AI advisors unlocked",
      "Vastu (Remedies), Pravāsa (Travel), Muhūrta (Timing)",
      "Muhūrta date-finding for events",
      "Navāṃśa & divisional chart analysis",
      "Unlimited conversation history",
      "Downloadable PDF reports",
      "Early access to new features",
      "Priority support",
    ],
  },
];

export const getPlan = (tier: string) =>
  PRICING_PLANS.find((p) => p.id === tier) ?? PRICING_PLANS[0];
