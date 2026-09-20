"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCompass, FiSend, FiX } from "react-icons/fi";
import type { ChatMessage } from "@/src/types";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hi! Tell me your budget, trip length, or the kind of trip you're after — I'll suggest a TravelGo package.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Sorry, I couldn't respond right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 flex h-[440px] w-[320px] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl sm:w-[360px]"
          >
            <div className="flex items-center gap-2 bg-brand-emerald px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <FiCompass className="h-4 w-4 text-white" />
              </span>
              <span className="text-sm font-semibold text-white">TravelGo assistant</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-white/80 hover:bg-white/10"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#F8FAFC] p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                    msg.role === "user"
                      ? "ml-auto rounded-br-sm bg-brand-emerald text-white"
                      : "rounded-bl-sm border border-slate-100 bg-white text-slate-700"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="w-fit rounded-2xl rounded-bl-sm border border-slate-100 bg-white px-3.5 py-2 text-sm text-slate-400">
                  Typing…
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-100 bg-white p-2.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message TravelGo assistant…"
                className="flex-1 rounded-full bg-[#F8FAFC] px-3.5 py-2 text-sm text-slate-800 outline-none placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-emerald text-white transition disabled:opacity-50"
              >
                <FiSend className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-emerald text-white shadow-lg transition hover:opacity-90"
      >
        {open ? <FiX className="h-5 w-5" /> : <FiCompass className="h-6 w-6" />}
      </button>
    </div>
  );
}