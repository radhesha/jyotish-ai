"use client";

import { useState } from "react";
import Link from "next/link";
import { VEDIC_AGENTS, KP_AGENTS } from "@/lib/agents";
import type { Agent, AstroSystem } from "@/types";

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.id}`}
      className="group relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
    >
      {agent.tier !== "free" && (
        <span
          className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-xs font-medium ${
            agent.tier === "premium"
              ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
              : "bg-sky-500/20 text-sky-400 border border-sky-500/30"
          }`}
        >
          {agent.tier === "premium" ? "Premium" : "Pro"}
        </span>
      )}
      <div className="text-4xl mb-4">{agent.icon}</div>
      <h2 className="text-lg font-semibold text-neutral-100">{agent.name}</h2>
      <p className="mt-1 text-sm font-medium" style={{ color: agent.color }}>
        {agent.title}
      </p>
      <p className="mt-3 text-sm text-neutral-500 leading-relaxed flex-1 group-hover:text-neutral-400 transition-colors">
        {agent.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {agent.sampleQuestions.slice(0, 2).map((q) => (
          <span
            key={q}
            className="rounded-full border border-neutral-800 bg-neutral-800/60 px-3 py-1 text-xs text-neutral-600"
          >
            {q}
          </span>
        ))}
      </div>
      <div
        className="mt-4 pt-3 border-t border-neutral-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: agent.color }}
      >
        Chat with {agent.name} →
      </div>
    </Link>
  );
}

export default function AgentsPage() {
  const [activeSystem, setActiveSystem] = useState<AstroSystem>("vedic");
  const agents = activeSystem === "vedic" ? VEDIC_AGENTS : KP_AGENTS;

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-16">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors">
            ← Home
          </Link>
        </div>

        <div className="mb-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
            Choose Your Advisor
          </h1>
          <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
            20 specialists, each focused on a different area of life. Pick the one that fits your question.
          </p>
        </div>

        {/* System tabs */}
        <div className="mt-10 mb-6 flex justify-center">
          <div className="inline-flex rounded-xl border border-neutral-800 bg-neutral-900/60 p-1 gap-1">
            <button
              onClick={() => setActiveSystem("vedic")}
              className={`rounded-lg px-7 py-3 text-sm font-semibold transition-all ${
                activeSystem === "vedic"
                  ? "bg-amber-500 text-neutral-950 shadow"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              ✦ Life Guidance
              <span className="ml-2 text-xs opacity-70">10 advisors</span>
            </button>
            <button
              onClick={() => setActiveSystem("kp")}
              className={`rounded-lg px-7 py-3 text-sm font-semibold transition-all ${
                activeSystem === "kp"
                  ? "bg-violet-500 text-white shadow"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              ⊕ Precise Predictions
              <span className="ml-2 text-xs opacity-70">10 advisors</span>
            </button>
          </div>
        </div>

        {/* System explanation */}
        <div className="mb-10 mx-auto max-w-2xl text-center">
          {activeSystem === "vedic" ? (
            <p className="text-sm text-neutral-600 leading-relaxed">
              <span className="text-amber-400 font-medium">Life Guidance advisors</span> are best for understanding your patterns, purpose, and long-term life direction. Great for open-ended questions like <em className="text-neutral-500">"What career suits me?"</em> or <em className="text-neutral-500">"Why do relationships keep failing?"</em>
            </p>
          ) : (
            <p className="text-sm text-neutral-600 leading-relaxed">
              <span className="text-violet-400 font-medium">Precise Prediction advisors</span> are best when you want a direct answer — yes or no — and an exact timeframe. Great for questions like <em className="text-neutral-500">"Will I get this job?"</em> or <em className="text-neutral-500">"When will I get married?"</em>
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Switch CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-neutral-600 mb-4">
            {activeSystem === "vedic"
              ? "Need a specific yes/no answer or exact timing?"
              : "Looking for deeper insights into your life patterns?"}
          </p>
          <button
            onClick={() => setActiveSystem(activeSystem === "vedic" ? "kp" : "vedic")}
            className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-colors ${
              activeSystem === "vedic"
                ? "border-violet-700 text-violet-400 hover:bg-violet-500/10"
                : "border-amber-700 text-amber-400 hover:bg-amber-500/10"
            }`}
          >
            {activeSystem === "vedic"
              ? "Switch to Precise Prediction Advisors →"
              : "Switch to Life Guidance Advisors →"}
          </button>
        </div>

      </div>
    </div>
  );
}
