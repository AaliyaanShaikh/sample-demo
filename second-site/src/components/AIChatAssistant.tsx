"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BRAND_NAME } from "@/lib/brand";
import { easeOut } from "@/components/Reveal";

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

export default function AIChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: `Hi! I'm the ${BRAND_NAME} assistant. I can help with collections, materials, sizing, and anything else about this sample jewelry storefront. How can I help?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            data.reply ??
            "I couldn't complete that just now. Please try again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "I'm temporarily unavailable. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[100] pb-[env(safe-area-inset-bottom)] sm:bottom-8 sm:right-8 md:bottom-12 md:right-12">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="flex h-[min(100dvh-6rem,560px)] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-paper shadow-[0_24px_60px_rgba(28,25,22,0.18)] sm:h-[550px] sm:w-[350px] sm:rounded-[2rem] md:w-[400px] md:rounded-[2.5rem]"
          >
          <div className="flex items-center justify-between border-b border-ink/10 bg-paper p-5 sm:p-8">
            <div className="flex items-center space-x-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-paper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <div>
                <span className="block text-sm font-medium tracking-tight text-ink">
                  Let's Chat
                </span>
                <span className="block text-[9px] font-medium uppercase tracking-widest text-ink/45">
                  Ask Me Anything
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mist text-ink transition-colors hover:bg-ink/10"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto bg-paper p-5 sm:p-8">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-ink font-medium text-paper"
                      : "border border-ink/10 bg-mist text-ink/80"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className="flex justify-start">
                <div className="rounded-[1.5rem] border border-ink/10 bg-mist px-5 py-4">
                  <div className="flex items-center">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            ) : null}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-ink/10 bg-paper p-5 sm:p-8"
          >
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about collections or jewelry..."
                className="flex-1 rounded-2xl border border-ink/10 bg-mist px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-ink/30 focus:outline-none sm:px-6 sm:py-4"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-paper transition-all hover:scale-105 active:scale-95 disabled:opacity-20"
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 rotate-90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
          </motion.div>
        ) : (
          <motion.button
            key="fab"
            type="button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper shadow-[0_16px_40px_rgba(28,25,22,0.22)] transition-transform duration-500 hover:scale-110 active:scale-95 sm:h-14 sm:w-14 md:h-16 md:w-16"
            aria-label="Open chat"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
