"use client";
import { useState, useRef } from "react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function GenAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: "assistant", content: data.reply || "[No response]" }]);
    } catch (err: any) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: "[Error: " + (err.message || "Unknown error") + "]" }]);
    } finally {
      setLoading(false);
    }
    inputRef.current?.focus();
  };

  const handleQuickPrompt = async (prompt: string) => {
    setInput("");
    const newMessages = [...messages, { role: "user", content: prompt }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: "assistant", content: data.reply || "[No response]" }]);
    } catch (err: any) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: "[Error: " + (err.message || "Unknown error") + "]" }]);
    } finally {
      setLoading(false);
    }
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-lg text-sm font-medium"
          onClick={() => handleQuickPrompt("Generate a crypto trading strategy for BTC/ETH/SOL with entry, exit, and risk management rules.")}
          disabled={loading}
        >
          Generate Strategy
        </button>
        <button
          type="button"
          className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-lg text-sm font-medium"
          onClick={() => handleQuickPrompt("Backtest the last suggested strategy using recent price data. Provide a risk score and simulated performance.")}
          disabled={loading}
        >
          Backtest Strategy
        </button>
      </div>
      <div className="flex-1 overflow-y-auto mb-4 bg-neutral-900 rounded-lg p-4 border border-neutral-800" style={{ minHeight: 200, maxHeight: 300 }}>
        {messages.length === 0 && <div className="text-neutral-400">Ask the AI assistant about trading strategies...</div>}
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 text-sm ${msg.role === "user" ? "text-blue-300 text-right" : "text-green-300 text-left"}`}>
            <span className="block whitespace-pre-line">{msg.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          ref={inputRef}
          className="flex-1 rounded-lg px-3 py-2 bg-neutral-800 text-white border border-neutral-700 focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
} 