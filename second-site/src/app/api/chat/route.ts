import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { BRAND_NAME, CONTACT } from "@/lib/brand";

type ChatTurn = {
  role: string;
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: unknown;
      history?: unknown;
    };
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    if (!message) {
      return NextResponse.json(
        { reply: "Please enter a message." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({
        reply:
          "This sample chat is ready, but a Gemini API key is not configured. Add GEMINI_API_KEY to .env.local to enable live answers.",
      });
    }

    const history = Array.isArray(body.history)
      ? (body.history as ChatTurn[])
      : [];

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: `You are the AI chat assistant for ${BRAND_NAME}, a sample jewelry storefront demo. Help with collections (rings, necklaces, earrings, bracelets), materials, anti-tarnish care, sizing, and shopping questions. Be friendly, concise, and professional. This demo does not show prices. Contact: ${CONTACT.email}, ${CONTACT.phone}.`,
    });

    const formattedHistory: Array<{
      role: "user" | "model";
      parts: Array<{ text: string }>;
    }> = [];
    let lastRole: "user" | "model" | null = null;

    for (const msg of history) {
      const role = msg.role === "user" ? "user" : "model";
      if (formattedHistory.length === 0 && role === "model") continue;
      if (lastRole === role) continue;
      if (typeof msg.content !== "string") continue;
      formattedHistory.push({
        role,
        parts: [{ text: msg.content }],
      });
      lastRole = role;
    }

    const chat = model.startChat(
      formattedHistory.length > 0 ? { history: formattedHistory } : {},
    );
    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({
      reply: text || "I couldn't process that just now. Please try again.",
    });
  } catch (error) {
    const err = error as { message?: string; status?: number };
    if (err.status === 429) {
      return NextResponse.json({
        reply: "Too many requests right now. Please try again shortly.",
      });
    }
    console.error("Chat API error:", err.message ?? error);
    return NextResponse.json({
      reply:
        "I'm temporarily unavailable. Please try again, or use the Contact page.",
    });
  }
}
