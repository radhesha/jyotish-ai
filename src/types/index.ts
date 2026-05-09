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

// ── Chart computation types ──────────────────────────────────────────────────

export interface Planet {
  name: string;
  tropical: number;   // degrees 0–360
  sidereal: number;   // tropical − ayanamsa
  retrograde: boolean;
  nakshatra: string;
  nakshatraLord: string;
  pada: number;       // 1–4
  sign: string;
  signNum: number;    // 1–12
  house: number;      // 1–12 (whole-sign for Vedic, Placidus cusp for KP)
}

export interface HouseCusp {
  house: number;      // 1–12
  degree: number;     // sidereal degrees of cusp
  sign: string;
  signNum: number;
  nakshatra: string;
  nakshatraLord: string;
  subLord: string;    // KP sub-lord
}

export interface DashaPeriod {
  planet: string;
  startDate: string;  // ISO date
  endDate: string;
  isCurrent: boolean;
  antardashas: AntardashaPeriod[];
}

export interface AntardashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface DivisionalPlanet {
  name: string;
  signNum: number;
  sign: string;
  house: number;       // 1–12, whole-sign from divisional lagna
}

export interface DivisionalChart {
  division: number;    // e.g. 9 for Navamsha
  name: string;        // e.g. "Navamsha (D-9)"
  ascendant: { signNum: number; sign: string };
  planets: DivisionalPlanet[];
}

export interface VedicChart {
  system: "vedic";
  ayanamsa: number;
  ascendant: { degree: number; sign: string; signNum: number; nakshatra: string; nakshatraLord: string; pada: number };
  planets: Planet[];
  houses: { house: number; sign: string; signNum: number }[];  // whole-sign
  dashas: DashaPeriod[];
  divisional?: {
    d2:  DivisionalChart;  // Hora
    d3:  DivisionalChart;  // Drekkana
    d4:  DivisionalChart;  // Chaturthamsha
    d7:  DivisionalChart;  // Saptamsha
    d9:  DivisionalChart;  // Navamsha (most important)
    d10: DivisionalChart;  // Dashamsha
    d12: DivisionalChart;  // Dwadashamsha
  };
}

export interface KPChart {
  system: "kp";
  ayanamsa: number;
  ascendant: { degree: number; sign: string; signNum: number; nakshatra: string; nakshatraLord: string; subLord: string; pada: number };
  planets: Planet[];
  cusps: HouseCusp[];
  dashas: DashaPeriod[];
}

export interface ComputedChart {
  vedic: VedicChart;
  kp: KPChart;
  meta: {
    name: string;
    dob: string;
    tob: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    timezone: string;
    julianDay: number;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  tier: PricingTier;
  messagesUsed: number;
  messagesLimit: number;
  createdAt: string;
}
