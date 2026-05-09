"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getAgent } from "@/lib/agents";
import {
  loadBirthData,
  loadComputedChart,
  clearBirthData,
} from "@/components/BirthDetailsForm";
import type { BirthData } from "@/components/BirthDetailsForm";
import type { ComputedChart, Message } from "@/types";
import { supabase } from "@/lib/supabase";

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

/** Serialize a computed chart into a rich text block for the system prompt */
function formatChartContext(chart: ComputedChart, system: "vedic" | "kp"): string {
  const c    = system === "vedic" ? chart.vedic : chart.kp;
  const asc  = c.ascendant;
  const meta = chart.meta;

  const todayISO = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const lines: string[] = [
    `=== ${system.toUpperCase()} BIRTH CHART ===`,
    `Chart computed on: ${todayISO} (use this as TODAY for all timing)`,
    `Name: ${meta.name || "Not provided"}`,
    `Date of birth: ${meta.dob}  Time: ${meta.tob}  Place: ${meta.city}, ${meta.country}`,
    `Coordinates: ${meta.lat}, ${meta.lng}  Ayanamsa: ${c.ayanamsa.toFixed(4)}°`,
    ``,
    `ASCENDANT (LAGNA): ${asc.sign} ${(asc.degree % 30).toFixed(2)}°`,
    `  Nakshatra: ${asc.nakshatra} (lord: ${asc.nakshatraLord})  Pada: ${asc.pada}`,
    ...("subLord" in asc && asc.subLord ? [`  KP Sub-lord: ${asc.subLord}`] : []),
    ``,
    `PLANETS:`,
    ...c.planets.map(p =>
      `  ${p.name.padEnd(9)} ${p.sign.padEnd(13)} ${(p.sidereal % 30).toFixed(2).padStart(6)}°` +
      `  House: ${p.house}  Nakshatra: ${p.nakshatra} (lord: ${p.nakshatraLord})` +
      (p.retrograde ? "  [Retrograde]" : "")
    ),
  ];

  if (system === "vedic") {
    lines.push(``, `WHOLE-SIGN HOUSES:`);
    for (const h of chart.vedic.houses) {
      lines.push(`  House ${h.house}: ${h.sign}`);
    }
  } else {
    lines.push(``, `KP HOUSE CUSPS (Placidus):`);
    for (const cusp of chart.kp.cusps) {
      lines.push(
        `  H${cusp.house}: ${cusp.sign} ${(cusp.degree % 30).toFixed(2)}°` +
        `  Star Lord: ${cusp.nakshatraLord}  Sub Lord: ${cusp.subLord}`
      );
    }
  }

  // ── Divisional Charts (Vedic only) ───────────────────────────────────────
  if (system === "vedic" && chart.vedic.divisional) {
    const div = chart.vedic.divisional;
    const divEntries = [
      { key: "d9",  label: "NAVAMSHA (D-9) — Marriage, Dharma, Soul",       d: div.d9  },
      { key: "d10", label: "DASHAMSHA (D-10) — Career, Status, Public Life", d: div.d10 },
      { key: "d3",  label: "DREKKANA (D-3) — Siblings, Courage, Enterprise", d: div.d3  },
      { key: "d4",  label: "CHATURTHAMSHA (D-4) — Property, Fortune, Home",  d: div.d4  },
      { key: "d7",  label: "SAPTAMSHA (D-7) — Children, Creativity",         d: div.d7  },
      { key: "d12", label: "DWADASHAMSHA (D-12) — Parents, Ancestry",        d: div.d12 },
      { key: "d2",  label: "HORA (D-2) — Wealth, Financial Strength",        d: div.d2  },
    ];

    for (const { label, d } of divEntries) {
      lines.push(``, `${label}:`);
      lines.push(`  Lagna: ${d.ascendant.sign}`);
      // Group planets by house for compact display
      const byHouse: Record<number, string[]> = {};
      for (const p of d.planets) {
        if (!byHouse[p.house]) byHouse[p.house] = [];
        byHouse[p.house].push(p.name);
      }
      const placed = Object.entries(byHouse)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([h, names]) => `H${h}(${names.join(",")})`);
      lines.push(`  Planets: ${placed.join("  ")}`);
      // Full sign placement for reference
      lines.push(
        `  Signs: ` +
        d.planets.map(p => `${p.name}→${p.sign}`).join(", ")
      );
    }
  }

  const currentDasha = c.dashas.find(d => d.isCurrent);
  const currentAntar = currentDasha?.antardashas.find(a => a.isCurrent);

  lines.push(``, `VIMSHOTTARI DASHA TIMELINE (as of ${todayISO}):`);

  if (currentDasha) {
    lines.push(
      `  ★ ACTIVE Mahadasha: ${currentDasha.planet} — runs from ${currentDasha.startDate} to ${currentDasha.endDate}`,
    );
    if (currentAntar) {
      lines.push(
        `  ★ ACTIVE Antardasha (Bhukti): ${currentDasha.planet}/${currentAntar.planet} — from ${currentAntar.startDate} to ${currentAntar.endDate}`
      );
    }
    const idx      = currentDasha.antardashas.findIndex(a => a.isCurrent);
    const upcoming = currentDasha.antardashas.slice(idx + 1, idx + 4);
    if (upcoming.length) {
      lines.push(`  Upcoming Bhuktis within this Mahadasha:`);
      for (const a of upcoming) {
        lines.push(`    - ${currentDasha.planet}/${a.planet}: ${a.startDate} → ${a.endDate}`);
      }
    }
    const dashaIdx  = c.dashas.findIndex(d => d.isCurrent);
    const nextDasha = c.dashas[dashaIdx + 1];
    if (nextDasha) {
      lines.push(`  Next Mahadasha: ${nextDasha.planet} begins ${nextDasha.startDate}`);
    }
  } else {
    lines.push(`  (No active dasha found — check birth data)`);
    // Still list all dashas for reference
    for (const d of c.dashas) {
      lines.push(`  ${d.planet}: ${d.startDate} → ${d.endDate}`);
    }
  }

  return lines.join("\n");
}

/** Fallback when no computed chart is available */
function formatBirthContext(data: BirthData): string {
  return [
    `Name: ${data.name || "Not provided"}`,
    `Date of birth: ${data.dob}`,
    `Time of birth: ${data.tobUnknown ? "Unknown" : data.tob || "Not provided"}`,
    `Place of birth: ${data.city}, ${data.country}`,
  ].join("\n");
}

export default function AgentChatPage() {
  const params = useParams();
  const router = useRouter();
  const agent  = getAgent(params.id as string);

  const [birthData, setBirthData]         = useState<BirthData | null>(null);
  const [computedChart, setComputedChart] = useState<ComputedChart | null>(null);
  const [dataLoaded, setDataLoaded]       = useState(false);
  const [messages, setMessages]           = useState<Message[]>([]);
  const [input, setInput]                 = useState("");
  const [loading, setLoading]             = useState(false);
  const [userId, setUserId]               = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Save messages to Supabase (upsert by user + agent)
  const saveMessages = useCallback(async (msgs: Message[], uid: string, agentId: string) => {
    if (!uid) return;
    const payload = msgs.map(m => ({ role: m.role, content: m.content, timestamp: m.timestamp }));
    await supabase.from("readings").upsert(
      { user_id: uid, agent_id: agentId, messages: payload, updated_at: new Date().toISOString() },
      { onConflict: "user_id,agent_id" }
    );
  }, []);

  // Load chart data + auth state + previous messages
  useEffect(() => {
    setBirthData(loadBirthData());
    setComputedChart(loadComputedChart());
    setDataLoaded(true);

    // Check if user is logged in; if so, load saved messages
    supabase.auth.getUser().then(async ({ data }) => {
      const uid = data.user?.id ?? null;
      setUserId(uid);

      if (uid && agent) {
        const { data: row } = await supabase
          .from("readings")
          .select("messages")
          .eq("user_id", uid)
          .eq("agent_id", agent.id)
          .maybeSingle();

        if (row?.messages?.length) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setMessages(row.messages.map((m: any) => ({
            id: generateId(),
            role: m.role,
            content: m.content,
            timestamp: new Date(m.timestamp ?? Date.now()),
          })));
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!agent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Advisor not found.</p>
          <Link href="/agents" className="text-amber-400 hover:underline">
            Browse all advisors →
          </Link>
        </div>
      </div>
    );
  }

  if (dataLoaded && !birthData) {
    router.replace("/chart");
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <div className="h-8 w-8 rounded-full border-2 border-neutral-800 border-t-amber-500 animate-spin" />
      </div>
    );
  }

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      let chartContext: string | undefined;
      if (computedChart) {
        chartContext = formatChartContext(computedChart, agent.system);
      } else if (birthData) {
        chartContext = formatBirthContext(birthData);
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agent.id,
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          chartContext,
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: data.content ?? data.error ?? "I was unable to process that request.",
        timestamp: new Date(),
      };
      setMessages((prev) => {
        const next = [...prev, assistantMsg];
        if (userId && agent) saveMessages(next, userId, agent.id);
        return next;
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleResetBirthData = () => {
    clearBirthData();
    setBirthData(null);
    setComputedChart(null);
    setMessages([]);
  };

  const handleClearHistory = async () => {
    setMessages([]);
    if (userId && agent) {
      await supabase
        .from("readings")
        .update({ messages: [], updated_at: new Date().toISOString() })
        .eq("user_id", userId)
        .eq("agent_id", agent.id);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-950">

      {/* Header */}
      <div className="flex items-center gap-4 border-b border-zinc-800/60 bg-zinc-950 px-6 py-4">
        <Link href="/agents" className="text-zinc-600 hover:text-zinc-400 transition-colors text-sm">
          ← Advisors
        </Link>
        <div className="h-4 w-px bg-zinc-800" />
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800/60 text-xl">
            {agent.icon}
          </div>
          <div>
            <h1 className="font-playfair text-base font-semibold text-zinc-100 leading-none">{agent.name}</h1>
            <p className="text-[11px] mt-0.5 font-medium" style={{ color: agent.color }}>{agent.title}</p>
          </div>
        </div>

        {birthData && (
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/chart"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-zinc-800/60 bg-zinc-900/60 px-3 py-1.5 hover:border-zinc-700 transition-colors"
              title="View your birth chart"
            >
              <span className="text-[10px] text-amber-500/70">✦</span>
              <span className="text-xs text-zinc-500">
                {birthData.name ? `${birthData.name} · ` : ""}{birthData.dob} · {birthData.city}
              </span>
            </Link>
            {userId && messages.length > 0 && (
              <button
                onClick={handleClearHistory}
                title="Clear conversation history"
                className="text-xs text-zinc-700 hover:text-red-400 transition-colors px-2 py-1.5"
              >
                ✕ Clear
              </button>
            )}
            <button
              onClick={handleResetBirthData}
              title="Change birth details"
              className="text-xs text-zinc-700 hover:text-zinc-400 transition-colors px-2 py-1.5"
            >
              ✎ Edit
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800/60 text-4xl">
              {agent.icon}
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-zinc-100">
                {birthData?.name ? `Hi ${birthData.name}, I'm ${agent.name}` : `Hi, I'm ${agent.name}`}
              </h2>
              <p className="mt-1 text-sm font-medium" style={{ color: agent.color }}>
                {agent.title}
              </p>
              <p className="mt-3 text-zinc-500 max-w-md text-sm leading-relaxed">
                {agent.description}
              </p>
              {computedChart && (
                <p className="mt-3 text-xs text-amber-400/60 font-mono">
                  ✦ {agent.system === "vedic" ? "Vedic" : "KP"} chart loaded ·{" "}
                  {computedChart[agent.system].ascendant.sign} Asc ·{" "}
                  {computedChart[agent.system].planets.find(p => p.name === "Moon")?.sign} Moon
                </p>
              )}
              <p className="mt-3 text-xs text-zinc-700">
                Ask me anything — or pick a question below to get started.
              </p>
            </div>
            <div className="mt-1 grid grid-cols-1 gap-2 w-full max-w-lg sm:grid-cols-2">
              {agent.sampleQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-4 py-3 text-left text-sm text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 hover:bg-zinc-900/70 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="mt-1 shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800/60 text-base">
                {agent.icon}
              </div>
            )}
            <div className={`max-w-2xl rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-zinc-800/80 text-zinc-200 rounded-br-sm"
                : "border border-zinc-800/60 bg-zinc-900/50 text-zinc-300 rounded-bl-sm"
            }`}>
              {msg.content.split("\n").map((line, i) => (
                <p key={i} className={i > 0 && line !== "" ? "mt-2" : ""}>{line}</p>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="mt-1 shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800/60 text-base">
              {agent.icon}
            </div>
            <div className="rounded-2xl rounded-bl-sm border border-zinc-800/60 bg-zinc-900/50 px-5 py-4">
              <div className="flex gap-1.5 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800/60 bg-zinc-950 px-4 py-4">
        <div className="mx-auto flex max-w-3xl gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question…"
            rows={1}
            className="flex-1 resize-none rounded-xl border border-zinc-700/50 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/15 transition-all max-h-36 overflow-y-auto"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-zinc-800">
          Enter to send · Shift+Enter for new line
        </p>
      </div>

    </div>
  );
}
