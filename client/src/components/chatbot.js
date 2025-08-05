import { useState } from "react";
import { Link } from "react-router-dom";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I can help you find Flights, Trains, or Packages.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // chatbot visibility

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();

    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      let response = [];

      const msg = userMessage.toLowerCase();

      if (msg.includes("flight")) {
        response = [
          { from: "bot", text: "✈️ Here are some flights you might like:" },
          {
            from: "bot",
            type: "link",
            text: "Explore Flights",
            route: "/flights",
          },
        ];
      } else if (msg.includes("train")) {
        response = [
          { from: "bot", text: "🚆 Check out our train options:" },
          {
            from: "bot",
            type: "link",
            text: "Explore Trains",
            route: "/trains",
          },
        ];
      } else if (msg.includes("package")) {
        response = [
          { from: "bot", text: "🏝️ Try one of these amazing packages:" },
          {
            from: "bot",
            type: "link",
            text: "View Packages",
            route: "/packages",
          },
        ];
      } else {
        response = [
          {
            from: "bot",
            text: "🤔 Sorry, I didn't get that. Try typing 'flight', 'train', or 'package'.",
          },
        ];
      }

      setMessages((prev) => [...prev, ...response]);
    }, 700); // slight delay for realistic effect
  };

  return (
    <>
      {/* Floating Button to Toggle */}
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
          }}
          onClick={() => setIsOpen(true)}
        >
          🤖
        </button>
      )}

      {/* Chatbot Window */}
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
          {/* Header with Close */}
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

          {/* Chat Area */}
          <div
            className="chat-window flex-grow-1 px-3 py-2"
            style={{ overflowY: "auto", fontSize: "0.9rem" }}
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
          </div>

          {/* Input */}
          <div className="chatbot-input p-2 border-top d-flex">
            <input
              className="form-control form-control-sm"
              placeholder="Ask me about travel..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="btn btn-sm btn-primary ms-2"
              onClick={handleSend}
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
