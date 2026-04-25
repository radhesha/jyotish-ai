import type { PricingPlan } from "@/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Starter",
    price: 0,
    priceId: "",
    description: "Try 4 advisors free — no credit card required.",
    limit: 20,
    features: [
      "20 conversations per month",
      "Career advisor (Dhruva & Kriya)",
      "Love & relationships advisor (Ananya & Bandhu)",
      "Based on your personal birth chart",
      "Chat history saved for 7 days",
    ],
  },
  {
    id: "pro",
    name: "Explorer",
    price: 19,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
    description: "Access 14 advisors covering every major area of life.",
    limit: 300,
    highlight: true,
    features: [
      "300 conversations per month",
      "14 advisors unlocked",
      "Career, Love, Money, Health, Timing, Purpose, Education",
      "Yes/No prediction advisors included",
      "Chat history saved for 90 days",
      "Download conversation as PDF",
      "Faster responses",
    ],
  },
  {
    id: "premium",
    name: "Full Access",
    price: 49,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ?? "",
    description: "Every advisor, every question — nothing held back.",
    limit: 1000,
    features: [
      "1,000 conversations per month",
      "All 20 advisors unlocked",
      "Remedies & gemstone advisor",
      "Travel & visa prediction advisor",
      "Best date finder for big decisions",
      "Birth time correction advisor",
      "Unlimited chat history",
      "PDF reports",
      "Priority support",
    ],
  },
];

export const getPlan = (tier: string) =>
  PRICING_PLANS.find((p) => p.id === tier) ?? PRICING_PLANS[0];
