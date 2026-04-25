export type VedicAgentId =
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

export type KPAgentId =
  | "kriya"
  | "bandhu"
  | "artha"
  | "swastha"
  | "kairos"
  | "prashna"
  | "chaya"
  | "rekha"
  | "nadi"
  | "yatra";

export type AgentId = VedicAgentId | KPAgentId;

export type AstroSystem = "vedic" | "kp";

export interface Agent {
  id: AgentId;
  system: AstroSystem;
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
  priceId: string;
  description: string;
  features: string[];
  limit: number;
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
