import Link from "next/link";
import { PRICING_PLANS } from "@/lib/pricing";
import { AGENTS } from "@/lib/agents";

export const metadata = {
  title: "Pricing — Astro AI",
  description: "Choose the right plan for your Vedic astrology consultation needs.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-4 text-center">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors">
            ← Back to home
          </Link>
        </div>
        <div className="mb-16 text-center">
          <h1 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
            Begin your journey free. Upgrade to unlock more advisors and deeper consultations.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-amber-500/40 bg-amber-500/5 shadow-2xl shadow-amber-500/10"
                  : "border-neutral-800 bg-neutral-900/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-neutral-950">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h2 className="font-playfair text-2xl font-bold text-neutral-100">{plan.name}</h2>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-5xl font-bold text-neutral-100">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="mb-2 text-neutral-500">/month</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-neutral-500">{plan.description}</p>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <span className="mt-0.5 shrink-0 text-amber-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.price === 0 ? "/signup" : `/signup?plan=${plan.id}`}
                className={`mt-8 block rounded-full py-3.5 text-center text-sm font-semibold transition-all ${
                  plan.highlight
                    ? "bg-amber-500 text-neutral-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20"
                    : "border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-neutral-100"
                }`}
              >
                {plan.price === 0 ? "Start Free — No Card Required" : `Get ${plan.name}`}
              </Link>
            </div>
          ))}
        </div>

        {/* Advisor access table */}
        <div className="mt-20">
          <h2 className="font-playfair text-2xl font-semibold text-neutral-100 mb-8 text-center">
            Advisor Access by Plan
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-neutral-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/60">
                  <th className="px-6 py-4 text-left text-neutral-400 font-medium">Advisor</th>
                  <th className="px-6 py-4 text-center text-neutral-400 font-medium">Seeker (Free)</th>
                  <th className="px-6 py-4 text-center text-amber-400 font-medium">Practitioner ($19)</th>
                  <th className="px-6 py-4 text-center text-violet-400 font-medium">Jyotiṣī ($49)</th>
                </tr>
              </thead>
              <tbody>
                {AGENTS.map((agent, i) => (
                  <tr
                    key={agent.id}
                    className={`border-b border-neutral-800/50 ${i % 2 === 0 ? "" : "bg-neutral-900/20"}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{agent.icon}</span>
                        <div>
                          <p className="font-medium text-neutral-200">{agent.name}</p>
                          <p className="text-xs text-neutral-600">{agent.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {agent.tier === "free" ? (
                        <span className="text-amber-400">✓</span>
                      ) : (
                        <span className="text-neutral-700">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {agent.tier === "free" || agent.tier === "pro" ? (
                        <span className="text-amber-400">✓</span>
                      ) : (
                        <span className="text-neutral-700">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-amber-400">✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="font-playfair text-2xl font-semibold text-neutral-100 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do I need to know my exact birth time?",
                a: "An accurate birth time (within 15 minutes) gives the best results — it determines your Lagna (Ascendant) and house system. If you don't have it, advisors can still provide meaningful guidance based on your Moon sign and planetary positions.",
              },
              {
                q: "What astrological system do the advisors use?",
                a: "All advisors use the Vedic (Jyotiṣa) sidereal system — not Western tropical astrology. They apply classical principles from Bṛhat Parāśara Horā Śāstra, Jaimini Sūtras, and KP methodology as appropriate.",
              },
              {
                q: "Can I switch plans at any time?",
                a: "Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the start of the next billing cycle.",
              },
              {
                q: "Are the responses AI-generated?",
                a: "Yes — each advisor is powered by Claude (Anthropic's AI) with deep, specialist system prompts encoding classical Jyotiṣa principles. Responses are for educational and reflective purposes and should not replace decisions about health, legal, or financial matters.",
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-neutral-800 pb-6">
                <h3 className="font-medium text-neutral-100 mb-2">{item.q}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
