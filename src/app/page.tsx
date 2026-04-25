import Link from "next/link";
import { AGENTS } from "@/lib/agents";
import { PRICING_PLANS } from "@/lib/pricing";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* NAV */}
      <nav className="fixed top-0 z-50 w-full border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☸</span>
            <span className="font-playfair text-xl font-bold tracking-wide text-amber-400">
              Jyotish AI
            </span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-neutral-400 md:flex">
            <Link href="#advisors" className="hover:text-neutral-100 transition-colors">
              Advisors
            </Link>
            <Link href="#how" className="hover:text-neutral-100 transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="hover:text-neutral-100 transition-colors">
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-400 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute left-1/3 top-2/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
            <span>✦</span>
            <span>10 Specialized AI Vedic Astrology Advisors</span>
          </div>

          <h1 className="font-playfair text-5xl font-bold leading-tight tracking-tight text-neutral-100 md:text-7xl">
            Ancient Wisdom,{" "}
            <span className="text-gradient">AI Precision</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Consult specialized AI advisors trained in classical Jyotiṣa — career,
            relationships, wealth, health, timing, spirituality, remedies, and more.
            Each advisor holds deep expertise in their domain.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="rounded-full bg-amber-500 px-8 py-3.5 text-base font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all hover:shadow-amber-500/30"
            >
              Start Free Consultation →
            </Link>
            <Link
              href="#advisors"
              className="rounded-full border border-neutral-700 px-8 py-3.5 text-base text-neutral-300 hover:border-neutral-500 hover:text-neutral-100 transition-colors"
            >
              Meet the Advisors
            </Link>
          </div>

          <p className="mt-4 text-sm text-neutral-600">
            Free tier available · No credit card required
          </p>
        </div>

        {/* Floating chart preview */}
        <div className="relative mt-16 w-full max-w-3xl">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3 text-sm text-neutral-500">Jyotish AI — Kāla (Timing Advisor)</span>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex gap-3">
                <span className="text-neutral-500 text-sm shrink-0">You</span>
                <p className="rounded-xl bg-neutral-800 px-4 py-2.5 text-sm text-neutral-300">
                  What major events are coming in the next 2 years for me?
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-400 text-sm shrink-0">Kāla</span>
                <div className="rounded-xl bg-neutral-800/60 border border-amber-500/20 px-4 py-2.5 text-sm text-neutral-300 leading-relaxed">
                  You are currently in{" "}
                  <strong className="text-amber-400">Jupiter Mahādaśā / Saturn Antardaśā</strong>{" "}
                  — a combination that brings structured expansion. The next 18 months carry
                  strong indicators for <em className="text-violet-400">career consolidation</em> and
                  possible <em className="text-violet-400">relocation or long-distance opportunity</em>.
                  Saturn transiting your 10th house in 2025 creates lasting professional foundations…
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVISORS GRID */}
      <section id="advisors" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
              Meet Your Advisors
            </h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
              Each advisor is a specialist — not a generalist. Consult the right
              expert for each area of your life.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {AGENTS.map((agent) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.id}`}
                className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200"
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
                <div className="mb-4 text-4xl">{agent.icon}</div>
                <h3 className="font-playfair text-xl font-semibold text-neutral-100">
                  {agent.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-amber-400">{agent.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors">
                  {agent.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {agent.sampleQuestions.slice(0, 2).map((q) => (
                    <span
                      key={q}
                      className="rounded-full border border-neutral-800 bg-neutral-800/60 px-3 py-1 text-xs text-neutral-500"
                    >
                      {q}
                    </span>
                  ))}
                </div>
                <div className="mt-5 text-sm text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Consult {agent.name} →
                </div>
              </Link>
            ))}
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

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Enter Your Birth Details",
                desc: "Provide your date, time, and place of birth. Jyotish AI computes your sidereal Vedic chart — Lagna, planetary positions, Daśā balance, and more.",
                icon: "🌍",
              },
              {
                step: "02",
                title: "Choose Your Advisor",
                desc: "Select the specialist matching your question — Dhruva for career, Ananya for relationships, Kāla for timing. Each advisor has deep domain expertise.",
                icon: "🎯",
              },
              {
                step: "03",
                title: "Get Classical Insights",
                desc: "Your advisor analyzes your actual chart — not generic sun signs. Receive Daśā timing, house-by-house analysis, and actionable guidance.",
                icon: "✦",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-4xl font-bold text-neutral-800">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-100 mb-2">{item.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-24 px-6 border-t border-neutral-800/40">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
            Simple Pricing
          </h2>
          <p className="mt-4 text-neutral-400">
            Start free. Upgrade when you need deeper guidance.
          </p>

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
                  <span className="text-4xl font-bold text-neutral-100">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="mb-1.5 text-neutral-500">/month</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-neutral-500">{plan.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-400">
                      <span className="mt-0.5 text-amber-400 shrink-0">✓</span>
                      {f}
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
            Begin Your Jyotiṣa Journey
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto">
            Your birth chart is a map of your karma, dharma, and potential.
            Let AI-powered classical Jyotiṣa illuminate the path.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-10 py-4 text-base font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
          >
            Consult Your First Advisor Free →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800/40 py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl text-amber-400">☸</span>
            <span className="font-playfair font-semibold text-neutral-400">Jyotish AI</span>
          </div>
          <p className="text-sm text-neutral-600">
            Classical Jyotiṣa wisdom, powered by AI. For educational and reflective purposes.
          </p>
          <div className="flex gap-6 text-sm text-neutral-600">
            <Link href="/pricing" className="hover:text-neutral-400 transition-colors">Pricing</Link>
            <Link href="/agents" className="hover:text-neutral-400 transition-colors">Advisors</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
