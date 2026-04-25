import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "@/lib/system-prompts";
import type { AgentId } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, agentId, chartContext } = await req.json();

    if (!agentId || !messages?.length) {
      return NextResponse.json({ error: "Missing agentId or messages" }, { status: 400 });
    }

    const systemPrompt = getSystemPrompt(agentId as AgentId);

    // Build system message — prepend birth chart data if provided
    const fullSystem = chartContext
      ? `${systemPrompt}\n\n[User's Birth Chart Data]\n${chartContext}`
      : systemPrompt;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
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
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
