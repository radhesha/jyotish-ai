export type AgentId =
  | "dhruva"
  | "ananya"
  | "lakshmi"
  | "arogya"
  | "kala"
  | "jyoti"
  | "vastu"
  | "vidya"
  | "pravasa"
  | "muhurta";

export interface Agent {
  id: AgentId;
  name: string;
  title: string;
  specialty: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  tier: "free" | "pro" | "premium";
  sampleQuestions: string[];
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  agentId: AgentId;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export type PricingTier = "free" | "pro" | "premium";

export interface PricingPlan {
  id: PricingTier;
  name: string;
  price: number;
  priceId: string; // Stripe price ID
  description: string;
  features: string[];
  limit: number; // messages per month
  highlight?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  tier: PricingTier;
  messagesUsed: number;
  messagesLimit: number;
  createdAt: string;
}
