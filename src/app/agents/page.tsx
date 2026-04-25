import Link from "next/link";
import { AGENTS } from "@/lib/agents";

export const metadata = {
  title: "AI Advisors — Jyotish AI",
  description: "Browse all 10 specialized Vedic astrology AI advisors.",
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
            Your AI Advisory Council
          </h1>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
            Ten specialists. Each trained in their domain of classical Jyotiṣa.
            Choose the right advisor for your question.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {AGENTS.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="group rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
            >
              <div className="text-4xl mb-3">{agent.icon}</div>
              <h2 className="font-playfair text-xl font-semibold text-neutral-100">
                {agent.name}
              </h2>
              <p className="mt-1 text-sm text-amber-400">{agent.title}</p>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                {agent.description}
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-800 text-sm text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Consult {agent.name} →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
