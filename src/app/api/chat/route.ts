import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "@/lib/system-prompts";
import type { AgentId } from "@/types";

// Gemini via its OpenAI-compatible endpoint — no extra package needed
const openai = new OpenAI({
  apiKey:  process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req: NextRequest) {
  try {
    const { messages, agentId, chartContext } = await req.json();

    if (!agentId || !messages?.length) {
      return NextResponse.json({ error: "Missing agentId or messages" }, { status: 400 });
    }

    const systemPrompt = getSystemPrompt(agentId as AgentId);

    // Always stamp the real current date — prevents the model using stale training knowledge
    const today = new Date();
    const todayStr = today.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    }); // e.g. "26 April 2026"

    const dateStamp = `TODAY'S DATE: ${todayStr}. Use this date for all timing, transit, and dasha calculations. Do not refer to any dates in the past as "upcoming" or "current" unless they are genuinely in the future relative to ${todayStr}.`;

    // Build system message
    const fullSystem = chartContext
      ? `${systemPrompt}\n\n${dateStamp}\n\n[User's Birth Chart Data]\n${chartContext}`
      : `${systemPrompt}\n\n${dateStamp}`;

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      max_tokens: 1500,
      messages: [
        { role: "system", content: fullSystem },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "No response from model" }, { status: 500 });
    }

    return NextResponse.json({
      content,
      inputTokens: response.usage?.prompt_tokens,
      outputTokens: response.usage?.completion_tokens,
    });
  } catch (err: unknown) {
    console.error("Chat API error:", err);
    // OpenAI SDK wraps HTTP errors as APIError objects with a .status property
    const status = (err as { status?: number })?.status;
    const msg    = err instanceof Error ? err.message : String(err);

    if (status === 429 || msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json(
        { error: "The AI advisor is temporarily unavailable — daily quota reached. Please try again later or contact support." },
        { status: 429 }
      );
    }
    if (status === 401 || status === 403 || msg.includes("API key") || msg.includes("auth")) {
      return NextResponse.json(
        { error: "AI service configuration error. Please contact support." },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: `Service error: ${msg}` }, { status: 500 });
  }
}
