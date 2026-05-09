"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getAgent } from "@/lib/agents";

interface SavedReading {
  agent_id: string;
  updated_at: string;
  messages: Array<{ role: string; content: string; timestamp: string }>;
}

export default function ReadingsPage() {
  const router = useRouter();
  const [readings, setReadings] = useState<SavedReading[]>([]);
  const [loading, setLoading]   = useState(true);
  const [authed, setAuthed]     = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setAuthed(true);

      const { data: rows } = await supabase
        .from("readings")
        .select("agent_id, updated_at, messages")
        .eq("user_id", data.user.id)
        .order("updated_at", { ascending: false });

      setReadings((rows ?? []).filter((r: SavedReading) => r.messages?.length > 0));
      setLoading(false);
    });
  }, [router]);

  if (!authed || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 rounded-full border-2 border-zinc-800 border-t-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Nav */}
      <div className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl text-amber-400">☸</span>
          <span className="font-playfair font-bold text-amber-400">Astro AI</span>
        </Link>
        <div className="h-4 w-px bg-zinc-800" />
        <span className="text-sm text-zinc-500">My Readings</span>
        <div className="ml-auto">
          <Link href="/agents" className="text-sm text-amber-400 hover:underline">
            + New Reading
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-playfair text-3xl font-bold text-zinc-100 mb-2">My Readings</h1>
        <p className="text-zinc-500 text-sm mb-10">Your saved conversations with each advisor.</p>

        {readings.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <div className="text-4xl mb-4">✦</div>
            <p className="text-zinc-400 font-medium mb-2">No readings yet</p>
            <p className="text-zinc-600 text-sm mb-6">Start a conversation with any advisor to save your first reading.</p>
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400 transition-colors"
            >
              Browse Advisors →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {readings.map((reading) => {
              const agent       = getAgent(reading.agent_id);
              const lastMsg     = reading.messages[reading.messages.length - 1];
              const userMsgs    = reading.messages.filter(m => m.role === "user");
              const lastUserMsg = userMsgs[userMsgs.length - 1];
              const lastAiMsg   = reading.messages.filter(m => m.role === "assistant").at(-1);
              const updatedDate = new Date(reading.updated_at).toLocaleDateString("en-GB", {
                day: "numeric", month: "short", year: "numeric",
              });

              return (
                <Link
                  key={reading.agent_id}
                  href={`/agents/${reading.agent_id}`}
                  className="block rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 hover:border-zinc-700 hover:bg-zinc-900 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700/60 text-xl shrink-0">
                        {agent?.icon ?? "✦"}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-100 text-sm">
                          {agent?.name ?? reading.agent_id}
                        </p>
                        <p className="text-xs font-medium" style={{ color: agent?.color ?? "#f59e0b" }}>
                          {agent?.title ?? ""}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-600">{updatedDate}</p>
                      <p className="text-xs text-zinc-700 mt-0.5">{reading.messages.length} messages</p>
                    </div>
                  </div>

                  {/* Last question */}
                  {lastUserMsg && (
                    <div className="mb-2">
                      <p className="text-xs text-zinc-600 mb-1">Last question</p>
                      <p className="text-sm text-zinc-300 line-clamp-1">
                        &ldquo;{lastUserMsg.content}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Last answer preview */}
                  {lastAiMsg && (
                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mt-2 border-t border-zinc-800/60 pt-2">
                      {lastAiMsg.content.slice(0, 180)}…
                    </p>
                  )}

                  <p className="mt-3 text-xs text-amber-500/60">Continue conversation →</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
