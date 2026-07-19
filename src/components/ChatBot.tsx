import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { getApiKey } from "@/lib/crypto";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Hemanth Poondla's portfolio assistant. You help visitors learn about Hemanth.

About Hemanth:
- AI/GenAI engineer based in Hyderabad, India (born and raised there), with 6+ years of product engineering at Temenos
- At Temenos he built an AI-assisted code review tool and a retrieval-based (RAG) documentation assistant, and iterated on prompt design for internal LLM tooling
- Passionate about building elegant, user-focused products around LLMs
- Won office-level chess championships twice; cricket enthusiast and avid traveler

Projects (all live):
1. FinX (https://finx.werde.app/) - AI finance tracker; an LLM auto-categorizes expenses from Gmail & SMS.
2. Trip Captain (https://tripcaptain.werde.app/) - itinerary generator built on the OpenAI API, with real-time collaboration and weather-aware planning.
3. Wardrobe by werde (https://wardrobe.werde.app/) - AI/ML outfit recommendations by weather, occasion and personal style.
4. Settle by werde (https://settle.werde.app/) - expense splitting; a sharper Splitwise with automatic balances.
5. mywayaround (https://mywayaround.blog/) - full-stack travel journal on Supabase with auth, newsletter and a trip-matching quiz.

Building next: a Document RAG Assistant, an MCP tool server over real FinX/Settle data, and a LangGraph agentic trip planner.

Skills:
- AI/GenAI: LangChain, RAG, OpenAI API, vector search, MCP, prompting
- Frontend: React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Supabase, REST APIs

Keep responses friendly, concise, and helpful. If asked something you don't know about Hemanth, politely say you don't have that information.`;

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(() => {
    const hasBeenClosed = localStorage.getItem("chatbot-closed");
    // Don't auto-open on small screens — it would cover the whole page.
    const isDesktop = typeof window !== "undefined" && window.innerWidth > 820;
    return !hasBeenClosed && isDesktop;
  });
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Hemanth's portfolio assistant. Ask me about his work, projects, travels, or skills! 👋" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("chatbot-closed", "true");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = getApiKey();
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage },
          ],
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      if (response.status === 429 || data.error?.code === 429) {
        setMessages((prev) => [...prev, { role: "assistant", content: "I'm getting too many requests right now. Please try again in a moment! 🙏" }]);
        return;
      }
      const assistantMessage = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Oops! Something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        aria-label="Chat"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 60,
          width: 56,
          height: 56,
          borderRadius: 999,
          border: "none",
          background: "var(--accent)",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 16px 40px -12px rgba(139,125,255,0.7)",
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="chatwin"
          style={{
            position: "fixed",
            bottom: 92,
            right: 24,
            zIndex: 60,
            width: 380,
            maxWidth: "calc(100vw - 32px)",
            background: "var(--solid)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            boxShadow: "var(--shadow)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{ background: "linear-gradient(160deg,rgba(139,125,255,0.22),var(--surface))", borderBottom: "1px solid var(--border)", padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <Bot size={20} />
              </div>
              <div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, margin: 0, color: "var(--text)" }}>Portfolio Assistant</h3>
                <p className="mono" style={{ fontSize: 11, color: "var(--mute)", margin: "2px 0 0" }}>Ask me about Hemanth!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ height: 340, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", gap: 8, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.role === "assistant" && (
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(139,125,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--accent)" }}>
                    <Bot size={15} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "9px 13px",
                    borderRadius: 14,
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                    background: msg.role === "user" ? "var(--accent)" : "var(--surface2)",
                    color: msg.role === "user" ? "#fff" : "var(--text)",
                    borderBottomRightRadius: msg.role === "user" ? 4 : 14,
                    borderBottomLeftRadius: msg.role === "assistant" ? 4 : 14,
                  }}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>
                    <User size={15} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(139,125,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                  <Bot size={15} />
                </div>
                <div style={{ background: "var(--surface2)", padding: "10px 13px", borderRadius: 14, borderBottomLeftRadius: 4, display: "flex", gap: 4 }}>
                  {[0, 150, 300].map((d) => (
                    <span key={d} style={{ width: 7, height: 7, borderRadius: 999, background: "var(--mute)", animation: "livePulse 1.2s ease-in-out infinite", animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            style={{ padding: 14, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, travel..."
              disabled={isLoading}
              style={{ flex: 1, height: 42, padding: "0 14px", background: "var(--field)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 10, border: "none", background: "var(--accent)", color: "#fff", cursor: isLoading || !input.trim() ? "default" : "pointer", opacity: isLoading || !input.trim() ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
