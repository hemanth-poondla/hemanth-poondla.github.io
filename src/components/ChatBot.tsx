import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

/**
 * Cloudflare Worker that holds the Groq API key server-side.
 * The key must never live in this bundle — see worker/README.md.
 */
const CHAT_API_URL = "https://hp-chat.poondlahemanth1.workers.dev";

// The system prompt lives in the Worker, not here, so a caller can't replace it.

const SUGGESTIONS = [
  "What did he build at Temenos?",
  "Ask about RAG & LangGraph",
  "Why hire him for GenAI?",
];

/** Small HP monogram avatar — branded, not a generic robot. */
function Avatar({ size = 36 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: "linear-gradient(150deg, var(--accent), #5a4be0)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 6px 16px -6px rgba(139,125,255,0.8)",
      }}
    >
      <span className="mono" style={{ fontSize: size * 0.36, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>HP</span>
    </span>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(() => {
    const hasBeenClosed = localStorage.getItem("chatbot-closed");
    const isDesktop = typeof window !== "undefined" && window.innerWidth > 820;
    // Don't auto-open on mobile (covers the page) or on /contact (competes with the form).
    const onContact = typeof window !== "undefined" && window.location.pathname.startsWith("/contact");
    return !hasBeenClosed && isDesktop && !onContact;
  });
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi — I'm Hemanth's portfolio assistant. Ask me about his GenAI work, the products he's shipped, or what he did at Temenos." },
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

  const send = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || isLoading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // No API key here by design — the Worker adds it server-side.
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage },
          ],
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.reply) {
        console.error("Chat proxy error:", { status: response.status, data });
        const fallback =
          response.status === 429
            ? "I'm getting a lot of questions right now. Please try again in a moment 🙏"
            : data?.error || "Sorry, I couldn't process that. Please try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Oops — something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuggestions = messages.length === 1 && !isLoading;

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
        className="chat-fab"
        style={{
          position: "fixed",
          bottom: "max(24px, env(safe-area-inset-bottom))",
          right: "max(24px, env(safe-area-inset-right))",
          zIndex: 60,
          width: 54,
          height: 54,
          borderRadius: 999,
          border: "none",
          background: isOpen ? "var(--solid)" : "linear-gradient(150deg, var(--accent), #5a4be0)",
          color: isOpen ? "var(--text)" : "#fff",
          boxShadow: isOpen ? "var(--shadow)" : "0 16px 40px -12px rgba(139,125,255,0.75)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: isOpen ? "1px solid var(--border)" : "none",
          transition: "transform 0.2s ease",
        }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          className="chatwin"
          style={{
            position: "fixed",
            bottom: "calc(max(24px, env(safe-area-inset-bottom)) + 66px)",
            right: "max(24px, env(safe-area-inset-right))",
            zIndex: 60,
            width: 372,
            maxWidth: "calc(100vw - 32px)",
            background: "var(--solid)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            boxShadow: "var(--shadow)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "fadeUp 0.28s cubic-bezier(0.2,0.7,0.2,1) both",
          }}
        >
          {/* Header */}
          <div style={{ background: "linear-gradient(160deg, rgba(139,125,255,0.2), transparent)", borderBottom: "1px solid var(--border)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar size={38} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14.5, fontWeight: 600, margin: 0, color: "var(--text)" }}>Ask about Hemanth</h3>
              <p className="mono" style={{ fontSize: 10.5, color: "var(--mute)", margin: "3px 0 0", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--signal)", animation: "livePulse 2.4s ease-in-out infinite" }} />
                trained on his real work
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ height: 330, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", gap: 8, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.role === "assistant" && <Avatar size={26} />}
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 13px",
                    borderRadius: 14,
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                    background: msg.role === "user" ? "var(--accent)" : "var(--surface2)",
                    color: msg.role === "user" ? "#fff" : "var(--text)",
                    borderBottomRightRadius: msg.role === "user" ? 5 : 14,
                    borderBottomLeftRadius: msg.role === "assistant" ? 5 : 14,
                    boxShadow: msg.role === "user" ? "0 8px 20px -12px rgba(139,125,255,0.9)" : "none",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <Avatar size={26} />
                <div style={{ background: "var(--surface2)", padding: "12px 14px", borderRadius: 14, borderBottomLeftRadius: 5, display: "flex", gap: 5 }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: "var(--mute)",
                        animation: "typingBounce 1.2s ease-in-out infinite",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested prompts */}
            {showSuggestions && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, paddingLeft: 34 }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="mono"
                    style={{
                      cursor: "pointer",
                      fontSize: 11,
                      padding: "7px 11px",
                      borderRadius: 999,
                      border: "1px solid var(--border-strong)",
                      background: "rgba(139,125,255,0.08)",
                      color: "var(--accent)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            style={{ padding: 12, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about his work..."
              disabled={isLoading}
              style={{ flex: 1, height: 42, padding: "0 14px", background: "var(--field)", border: "1px solid var(--border)", borderRadius: 11, color: "var(--text)", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 11, border: "none", background: "var(--accent)", color: "#fff", cursor: isLoading || !input.trim() ? "default" : "pointer", opacity: isLoading || !input.trim() ? 0.55 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
