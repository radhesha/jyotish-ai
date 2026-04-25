import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "@/lib/system-prompts";
import type { AgentId } from "@/types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, agentId, chartContext } = await req.json();

    if (!agentId || !messages?.length) {
      return NextResponse.json({ error: "Missing agentId or messages" }, { status: 400 });
    }

    const systemPrompt = getSystemPrompt(agentId as AgentId);

    // Inject birth chart context as the first user message if provided
    const contextBlock = chartContext
      ? `[Birth Chart Data]\n${JSON.stringify(chartContext, null, 2)}\n\n`
      : "";

    // Prepend context to the first user message for prompt caching
    const messagesWithContext = messages.map(
      (m: { role: string; content: string }, i: number) =>
        i === 0 && m.role === "user"
          ? { ...m, content: contextBlock + m.content }
          : m
    );

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1500,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messagesWithContext,
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    return NextResponse.json({
      content: content.text,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
