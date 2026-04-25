"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAgent } from "@/lib/agents";
import BirthDetailsForm, { loadBirthData, clearBirthData } from "@/components/BirthDetailsForm";
import type { BirthData } from "@/components/BirthDetailsForm";
import type { Message } from "@/types";

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

function formatBirthContext(data: BirthData): string {
  const lines = [
    `Name: ${data.name || "Not provided"}`,
    `Date of birth: ${data.dob}`,
    `Time of birth: ${data.tobUnknown ? "Unknown" : data.tob || "Not provided"}`,
    `Place of birth: ${data.city}, ${data.country}`,
  ];
  return lines.join("\n");
}

export default function AgentChatPage() {
  const params = useParams();
  const agent = getAgent(params.id as string);

  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [birthDataLoaded, setBirthDataLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load birth data from localStorage on mount
  useEffect(() => {
    const saved = loadBirthData();
    setBirthData(saved);
    setBirthDataLoaded(true);
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

  // Show birth form until we have data
  if (birthDataLoaded && !birthData) {
    return (
      <div className="flex h-screen flex-col bg-neutral-950">
        {/* Minimal header */}
        <div className="flex items-center gap-4 border-b border-neutral-800 px-6 py-4">
          <Link href="/agents" className="text-neutral-600 hover:text-neutral-400 transition-colors text-sm">
            ← Advisors
          </Link>
          <div className="h-4 w-px bg-neutral-800" />
          <div className="flex items-center gap-3">
            <span className="text-2xl">{agent.icon}</span>
            <div>
              <h1 className="font-playfair text-lg font-semibold text-neutral-100 leading-none">{agent.name}</h1>
              <p className="text-xs mt-0.5" style={{ color: agent.color }}>{agent.title}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <BirthDetailsForm
            agentName={agent.name}
            agentIcon={agent.icon}
            agentColor={agent.color}
            onComplete={(data) => setBirthData(data)}
          />
        </div>
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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agent.id,
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          chartContext: birthData ? formatBirthContext(birthData) : undefined,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: data.content ?? "I was unable to process that request.",
          timestamp: new Date(),
        },
      ]);
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
    setMessages([]);
  };

  return (
    <div className="flex h-screen flex-col bg-neutral-950">

      {/* Header */}
      <div className="flex items-center gap-4 border-b border-neutral-800 px-6 py-4">
        <Link href="/agents" className="text-neutral-600 hover:text-neutral-400 transition-colors text-sm">
          ← Advisors
        </Link>
        <div className="h-4 w-px bg-neutral-800" />
        <div className="flex items-center gap-3">
          <span className="text-2xl">{agent.icon}</span>
          <div>
            <h1 className="font-playfair text-lg font-semibold text-neutral-100 leading-none">{agent.name}</h1>
            <p className="text-xs mt-0.5" style={{ color: agent.color }}>{agent.title}</p>
          </div>
        </div>

        {/* Birth data pill */}
        {birthData && (
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5">
              <span className="text-xs text-neutral-500">📍</span>
              <span className="text-xs text-neutral-500">
                {birthData.name ? `${birthData.name} · ` : ""}{birthData.dob} · {birthData.city}
              </span>
            </div>
            <button
              onClick={handleResetBirthData}
              title="Change birth details"
              className="text-xs text-neutral-700 hover:text-neutral-500 transition-colors"
            >
              ✎ Edit
            </button>
          </div>
        )}

        {agent.tier !== "free" && !birthData && (
          <span className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${
            agent.tier === "premium"
              ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
              : "bg-sky-500/20 text-sky-400 border border-sky-500/30"
          }`}>
            {agent.tier === "premium" ? "Premium" : "Pro"} Plan
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4">
            <div className="text-5xl">{agent.icon}</div>
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-neutral-100">
                {birthData?.name ? `Hi ${birthData.name}, I'm ${agent.name}` : `Hi, I'm ${agent.name}`}
              </h2>
              <p className="mt-1 text-sm font-medium" style={{ color: agent.color }}>
                {agent.title}
              </p>
              <p className="mt-3 text-neutral-500 max-w-md text-sm leading-relaxed">
                {agent.description}
              </p>
              <p className="mt-3 text-xs text-neutral-700">
                Ask me anything — or pick a question below to get started.
              </p>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 w-full max-w-lg sm:grid-cols-2">
              {agent.sampleQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-left text-sm text-neutral-400 hover:border-neutral-700 hover:text-neutral-300 transition-all"
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
              <div className="mt-1 shrink-0 text-xl">{agent.icon}</div>
            )}
            <div className={`max-w-2xl rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-neutral-800 text-neutral-200 rounded-br-none"
                : "border border-neutral-800 bg-neutral-900/60 text-neutral-300 rounded-bl-none"
            }`}>
              {msg.content.split("\n").map((line, i) => (
                <p key={i} className={i > 0 && line !== "" ? "mt-2" : ""}>{line}</p>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="mt-1 shrink-0 text-xl">{agent.icon}</div>
            <div className="rounded-2xl rounded-bl-none border border-neutral-800 bg-neutral-900/60 px-5 py-4">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400/60 animate-bounce [animation-delay:0ms]" />
                <span className="h-2 w-2 rounded-full bg-amber-400/60 animate-bounce [animation-delay:150ms]" />
                <span className="h-2 w-2 rounded-full bg-amber-400/60 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-neutral-800 px-4 py-4">
        <div className="mx-auto flex max-w-3xl gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question…"
            rows={1}
            className="flex-1 resize-none rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 outline-none focus:border-amber-500/60 transition-colors max-h-36 overflow-y-auto"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-neutral-700">
          Enter to send · Shift+Enter for new line
        </p>
      </div>

    </div>
  );
}
