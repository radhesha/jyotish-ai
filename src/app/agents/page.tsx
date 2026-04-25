"use client";

import { useState } from "react";
import Link from "next/link";
import { VEDIC_AGENTS, KP_AGENTS } from "@/lib/agents";
import type { Agent, AstroSystem } from "@/types";

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.id}`}
      className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
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
      <div className="text-4xl mb-3">{agent.icon}</div>
      <h2 className="font-playfair text-xl font-semibold text-neutral-100">
        {agent.name}
      </h2>
      <p className="mt-1 text-sm font-medium" style={{ color: agent.color }}>
        {agent.title}
      </p>
      <p className="mt-2 text-xs text-neutral-600 uppercase tracking-wider font-medium">
        {agent.specialty}
      </p>
      <p className="mt-3 text-sm text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
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
      <div className="mt-4 pt-3 border-t border-neutral-800 text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: agent.color }}>
        Consult {agent.name} →
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

        {/* Back link */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors">
            ← Back to home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
            Your AI Advisory Council
          </h1>
          <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
            Two complete systems, each with 10 specialist advisors. Choose the right system and expert for your question.
          </p>
        </div>

        {/* System tabs */}
        <div className="mt-10 mb-12 flex justify-center">
          <div className="inline-flex rounded-xl border border-neutral-800 bg-neutral-900/60 p-1 gap-1">
            <button
              onClick={() => setActiveSystem("vedic")}
              className={`rounded-lg px-8 py-3 text-sm font-semibold transition-all ${
                activeSystem === "vedic"
                  ? "bg-amber-500 text-neutral-950 shadow"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <span className="mr-2">☉</span>
              Vedic Astrology
              <span className="ml-2 text-xs opacity-70">10 advisors</span>
            </button>
            <button
              onClick={() => setActiveSystem("kp")}
              className={`rounded-lg px-8 py-3 text-sm font-semibold transition-all ${
                activeSystem === "kp"
                  ? "bg-violet-500 text-white shadow"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <span className="mr-2">⊕</span>
              KP Astrology
              <span className="ml-2 text-xs opacity-70">10 advisors</span>
            </button>
          </div>
        </div>

        {/* System description */}
        <div className="mb-10 mx-auto max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900/40 px-8 py-5 text-center">
          {activeSystem === "vedic" ? (
            <>
              <p className="text-sm font-medium text-amber-400 mb-1">☉ Classical Vedic / Parashara & Jaimini System</p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Based on the <em>Bṛhat Parāśara Horā Śāstra</em> and Jaimini Sūtras. Uses sidereal signs, whole/bhāva houses, Vimshottari Daśā, Navāṃśa, and Yogas for holistic life analysis and spiritual guidance.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-violet-400 mb-1">⊕ Krishnamurti Paddhati (KP) System</p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Developed by Prof. K.S. Krishnamurti. Uses Placidus cusps, KP ayanamsa, the 249 sub-lord table, and cuspal interlink theory for <em>precise event prediction and timing</em>.
              </p>
            </>
          )}
        </div>

        {/* Advisors grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Switch system CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-neutral-600 mb-3">
            {activeSystem === "vedic"
              ? "Looking for precise event timing and horary analysis?"
              : "Looking for Yogas, Daśā guidance, and spiritual insights?"}
          </p>
          <button
            onClick={() => setActiveSystem(activeSystem === "vedic" ? "kp" : "vedic")}
            className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-colors ${
              activeSystem === "vedic"
                ? "border-violet-700 text-violet-400 hover:bg-violet-500/10"
                : "border-amber-700 text-amber-400 hover:bg-amber-500/10"
            }`}
          >
            {activeSystem === "vedic" ? "Switch to KP Advisors ⊕" : "Switch to Vedic Advisors ☉"}
          </button>
        </div>

      </div>
    </div>
  );
}
