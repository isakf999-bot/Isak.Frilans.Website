import {
  buildChatKnowledge,
  type ChatMessage,
} from "@/lib/chatKnowledge";
import { answerFromSiteKnowledge } from "@/lib/chatLocal";

export const runtime = "nodejs";
export const maxDuration = 30;

type Body = {
  messages?: ChatMessage[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const lastUser = [...messages].reverse().find((m) => m.role === "user");

    if (!lastUser?.content?.trim()) {
      return Response.json(
        { error: "Skriv en fråga först." },
        { status: 400 },
      );
    }

    const trimmed = messages.slice(-12).map((m) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content).slice(0, 2000),
    }));

    const apiKey = process.env.OPENAI_API_KEY?.trim();

    // Utan nyckel: lokal, frågeanpassad fallback (fortfarande bara sajtfakta).
    if (!apiKey) {
      return Response.json({
        reply: answerFromSiteKnowledge(lastUser.content, trimmed),
        source: "site",
      });
    }

    const knowledge = buildChatKnowledge();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
        temperature: 0.35,
        presence_penalty: 0.2,
        frequency_penalty: 0.2,
        max_tokens: 550,
        messages: [
          { role: "system", content: knowledge },
          ...trimmed,
        ],
      }),
    });

    if (!response.ok) {
      return Response.json({
        reply: answerFromSiteKnowledge(lastUser.content, trimmed),
        source: "site-fallback",
      });
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    return Response.json({
      reply: reply || answerFromSiteKnowledge(lastUser.content, trimmed),
      source: reply ? "ai" : "site-fallback",
    });
  } catch {
    return Response.json(
      {
        error:
          "Chatten kunde inte svara just nu. Mejla info@isakweb.se eller använd kontaktformuläret.",
      },
      { status: 500 },
    );
  }
}
