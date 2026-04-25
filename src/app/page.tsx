import Link from "next/link";
import { VEDIC_AGENTS, KP_AGENTS } from "@/lib/agents";
import { PRICING_PLANS } from "@/lib/pricing";
import type { Agent } from "@/types";

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.id}`}
      className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200"
    >
      {agent.tier !== "free" && (
        <span
          className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-xs font-medium ${
            agent.tier === "premium"
              ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
              : "bg-sky-500/20 text-sky-400 border border-sky-500/30"
          }`}
        >
          {agent.tier === "premium" ? "Premium" : "Pro"}
        </span>
      )}
      <div className="mb-3 text-3xl">{agent.icon}</div>
      <h3 className="font-semibold text-neutral-100">{agent.name}</h3>
      <p className="mt-0.5 text-xs font-medium" style={{ color: agent.color }}>
        {agent.title}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors line-clamp-2">
        {agent.description}
      </p>
      <div className="mt-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: agent.color }}>
        Chat now →
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">

      {/* NAV */}
      <nav className="fixed top-0 z-50 w-full border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☸</span>
            <span className="font-playfair text-xl font-bold tracking-wide text-amber-400">
              Astro AI
            </span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-neutral-400 md:flex">
            <Link href="#advisors" className="hover:text-neutral-100 transition-colors">Advisors</Link>
            <Link href="#how" className="hover:text-neutral-100 transition-colors">How It Works</Link>
            <Link href="/pricing" className="hover:text-neutral-100 transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-400 transition-colors"
            >
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute left-1/3 top-2/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
            <span>✦</span>
            <span>Personal AI advisors powered by Vedic astrology</span>
          </div>

          <h1 className="font-playfair text-5xl font-bold leading-tight tracking-tight text-neutral-100 md:text-7xl">
            Get answers about{" "}
            <span className="text-gradient">your life</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Talk to 20 AI advisors — each a specialist in a different area of life.
            Career, love, money, health, travel, timing, and more.
            All based on your personal birth chart.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="rounded-full bg-amber-500 px-8 py-3.5 text-base font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
            >
              Start for Free →
            </Link>
            <Link
              href="#advisors"
              className="rounded-full border border-neutral-700 px-8 py-3.5 text-base text-neutral-300 hover:border-neutral-500 hover:text-neutral-100 transition-colors"
            >
              Meet the Advisors
            </Link>
          </div>
          <p className="mt-4 text-sm text-neutral-600">No credit card needed · Free plan available</p>
        </div>

        {/* Chat demo */}
        <div className="relative mt-16 w-full max-w-2xl">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-2xl backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-neutral-800">
              <span className="text-xl">🎯</span>
              <div>
                <p className="text-sm font-semibold text-neutral-200">Kriya</p>
                <p className="text-xs text-amber-400">Career Advisor</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-br-none bg-neutral-700 px-4 py-2.5 text-sm text-neutral-200 max-w-xs">
                  Will I get the job I just interviewed for?
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xl shrink-0 mt-1">🎯</span>
                <div className="rounded-2xl rounded-bl-none border border-amber-500/20 bg-neutral-800/60 px-4 py-3 text-sm text-neutral-300 leading-relaxed max-w-sm">
                  Based on your chart, this looks{" "}
                  <strong className="text-green-400">very promising</strong>. Your career planets are active right now and pointing toward a new opportunity. I&apos;d expect a positive outcome within the{" "}
                  <strong className="text-amber-400">next 3 to 5 weeks</strong>. This also lines up with a strong earning period starting next month…
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TRUST */}
      <section className="py-12 px-6 border-y border-neutral-800/40">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { stat: "20", label: "Specialist Advisors" },
              { stat: "Career · Love · Money", label: "Topics covered" },
              { stat: "Vedic & KP", label: "Astrology systems" },
              { stat: "Free", label: "To get started" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xl font-bold text-amber-400">{item.stat}</p>
                <p className="text-sm text-neutral-600 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CAN YOU ASK */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl font-bold text-neutral-100 md:text-4xl">
            What do you want to know?
          </h2>
          <p className="mt-4 text-neutral-500 max-w-lg mx-auto">
            Pick a question and we&apos;ll connect you to the right advisor.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              { q: "When will I find love?", emoji: "💑", href: "/agents/ananya" },
              { q: "Should I change careers?", emoji: "🌟", href: "/agents/dhruva" },
              { q: "Will I get this job?", emoji: "🎯", href: "/agents/kriya" },
              { q: "When will I earn more?", emoji: "💰", href: "/agents/lakshmi" },
              { q: "Will my visa be approved?", emoji: "🌏", href: "/agents/yatra" },
              { q: "What's my life purpose?", emoji: "🕯️", href: "/agents/jyoti" },
              { q: "When should I start my business?", emoji: "🗓️", href: "/agents/muhurta" },
              { q: "Will I buy a house soon?", emoji: "🏠", href: "/agents/chaya" },
              { q: "How's my health this year?", emoji: "🌿", href: "/agents/arogya" },
              { q: "When will things get better?", emoji: "⏳", href: "/agents/kala" },
            ].map((item) => (
              <Link
                key={item.q}
                href={item.href}
                className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-5 py-2.5 text-sm text-neutral-400 hover:border-neutral-600 hover:text-neutral-200 transition-all"
              >
                <span>{item.emoji}</span>
                {item.q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORS SECTION */}
      <section id="advisors" className="py-16 px-6 border-t border-neutral-800/40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
              Your Advisor Team
            </h2>
            <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
              Each advisor is a specialist. Pick the one that matches your question — not a one-size-fits-all chatbot.
            </p>
          </div>

          {/* Life Guidance advisors */}
          <div className="mb-14">
            <div className="mb-5 flex items-center gap-4">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 shrink-0">
                <span className="text-amber-400 font-semibold text-sm">Life Guidance</span>
                <span className="ml-2 text-xs text-amber-700">Big picture · Patterns · Purpose</span>
              </div>
              <div className="flex-1 h-px bg-neutral-800" />
              <Link href="/agents" className="shrink-0 text-sm text-neutral-600 hover:text-amber-400 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {VEDIC_AGENTS.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>

          {/* Precise Predictions advisors */}
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 shrink-0">
                <span className="text-violet-400 font-semibold text-sm">Precise Predictions</span>
                <span className="ml-2 text-xs text-violet-700">Yes/No answers · Exact timing</span>
              </div>
              <div className="flex-1 h-px bg-neutral-800" />
              <Link href="/agents" className="shrink-0 text-sm text-neutral-600 hover:text-violet-400 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {KP_AGENTS.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 border-t border-neutral-800/40">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                step: "1",
                icon: "📅",
                title: "Enter your birth details",
                desc: "Your date, time, and place of birth. That's all we need to build your personal birth chart — the map that makes every reading personal to you.",
              },
              {
                step: "2",
                icon: "🎯",
                title: "Pick your advisor",
                desc: "Choose the specialist that matches your question. Career worries? Talk to Dhruva. Want to know when you'll marry? Ask Ananya or Bandhu. Need a yes/no answer fast? Try Prashna.",
              },
              {
                step: "3",
                icon: "💬",
                title: "Get your answer",
                desc: "Chat naturally — no astrology knowledge needed. Your advisor reads your chart and gives you clear, personalised insights in plain English.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-2xl">
                  {item.icon}
                </div>
                <div className="mb-2 text-sm font-bold text-amber-400 uppercase tracking-wider">Step {item.step}</div>
                <h3 className="text-lg font-semibold text-neutral-100 mb-2">{item.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Two types callout */}
          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <p className="text-amber-400 font-semibold mb-2">✦ Life Guidance advisors</p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Best for understanding your life path, relationship patterns, career direction, spiritual growth, and long-term cycles. Great for big-picture questions.
              </p>
            </div>
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
              <p className="text-violet-400 font-semibold mb-2">⊕ Precise Prediction advisors</p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Best for specific, timed questions — will this happen? When? These advisors give direct answers using a system built for accurate event prediction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 border-t border-neutral-800/40">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
            Simple Pricing
          </h2>
          <p className="mt-4 text-neutral-500">Start free. No credit card needed.</p>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-8 text-left ${
                  plan.highlight
                    ? "border-amber-500/40 bg-amber-500/5"
                    : "border-neutral-800 bg-neutral-900/50"
                }`}
              >
                {plan.highlight && (
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-medium text-amber-400">
                    ✦ Most Popular
                  </div>
                )}
                <h3 className="font-playfair text-2xl font-bold text-neutral-100">{plan.name}</h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-bold text-neutral-100">${plan.price}</span>
                  {plan.price > 0 && <span className="mb-1.5 text-neutral-500">/month</span>}
                </div>
                <p className="mt-3 text-sm text-neutral-500">{plan.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-400">
                      <span className="mt-0.5 text-amber-400 shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.price === 0 ? "/signup" : "/pricing"}
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? "bg-amber-500 text-neutral-950 hover:bg-amber-400"
                      : "border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-neutral-100"
                  }`}
                >
                  {plan.price === 0 ? "Start Free" : `Get ${plan.name}`}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-neutral-800/40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-5xl mb-6">☸</div>
          <h2 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
            Your questions deserve real answers
          </h2>
          <p className="mt-4 text-lg text-neutral-500 max-w-xl mx-auto">
            Not vague horoscopes. Not generic advice. Personal insights from your birth chart — answered by a specialist who knows exactly what to look for.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-10 py-4 text-base font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
          >
            Chat with an Advisor Free →
          </Link>
          <p className="mt-3 text-sm text-neutral-700">Free to start · No astrology knowledge required</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800/40 py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl text-amber-400">☸</span>
            <span className="font-playfair font-semibold text-neutral-500">Astro AI</span>
          </div>
          <p className="text-sm text-neutral-700">
            Personalised Vedic astrology guidance, powered by AI. For reflective and educational purposes.
          </p>
          <div className="flex gap-6 text-sm text-neutral-700">
            <Link href="/pricing" className="hover:text-neutral-400 transition-colors">Pricing</Link>
            <Link href="/agents" className="hover:text-neutral-400 transition-colors">Advisors</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
