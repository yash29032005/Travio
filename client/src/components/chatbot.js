import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ChatBot() {
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I can help you with anything related to travelling",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/prompt`,
        {
          userPrompt: userMessage,
        }
      );

      const reply = res.data.result;

      // Optional: Check for keywords and add route links
      const lower = userMessage.toLowerCase();
      const dynamicLinks = [];

      if (lower.includes("flight")) {
        dynamicLinks.push({
          from: "bot",
          type: "link",
          text: "✈️ Explore Flights",
          route: "/flights",
        });
      } else if (lower.includes("train")) {
        dynamicLinks.push({
          from: "bot",
          type: "link",
          text: "🚆 Explore Trains",
          route: "/trains",
        });
      } else if (lower.includes("package")) {
        dynamicLinks.push({
          from: "bot",
          type: "link",
          text: "🏖️ View Packages",
          route: "/packages",
        });
      }

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: reply },
        ...dynamicLinks,
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "❌ Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="btn btn-primary rounded-circle bounce"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            zIndex: 9998,
            fontSize: "1.5rem",
            animation: "bounce 2s infinite",
          }}
          onClick={() => setIsOpen(true)}
        >
          🤖
        </button>
      )}

      {isOpen && (
        <div
          className="chatbot shadow rounded-3"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 320,
            height: "60vh",
            background: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            border: "1px solid #ccc",
          }}
        >
          {/* Header */}
          <div
            className="chatbot-header bg-primary text-white py-2 px-3 d-flex justify-content-between align-items-center rounded-top"
            style={{ fontWeight: "bold", fontSize: "1rem" }}
          >
            <span>🗺️ Travel Assistant</span>
            <button
              className="btn btn-sm btn-light"
              onClick={() => setIsOpen(false)}
              style={{
                fontWeight: "bold",
                lineHeight: "1rem",
                padding: "2px 8px",
              }}
            >
              ×
            </button>
          </div>

          {/* Chat Window */}
          <div
            className="chat-window flex-grow-1 px-3 py-2"
            style={{ overflowY: "auto", width: "100%", fontSize: "0.9rem" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 d-flex ${
                  msg.from === "bot"
                    ? "justify-content-start"
                    : "justify-content-end"
                }`}
              >
                {msg.type === "link" ? (
                  <Link
                    to={msg.route}
                    className="btn btn-sm btn-outline-primary"
                  >
                    {msg.text}
                  </Link>
                ) : (
                  <span
                    className={`px-3 py-2 rounded-3 ${
                      msg.from === "bot"
                        ? "bg-light text-dark"
                        : "bg-primary text-white"
                    }`}
                  >
                    {msg.text}
                  </span>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-muted small">Bot is typing...</div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input p-2 border-top d-flex">
            <input
              className="form-control form-control-sm"
              placeholder="Ask me about travel..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button
              className="btn btn-sm btn-primary ms-2"
              onClick={handleSend}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
