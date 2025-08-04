import { useState, useEffect, useRef } from "react";
import chatbot from '../assets/chatbotImg/chat-lines-solid.svg';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    // try {
    //   const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ message: input }),
    //   });
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            history: newMessages.map(msg => ({
              role: msg.sender === 'bot' ? 'model' : 'user',
              parts: [{ text: msg.text }]
            })),
            message: input
          }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong." }]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-[500px] flex flex-col bg-white rounded-full rounded-b-[2rem] shadow-2xl transition-all animate-fade-in-up">
          <div className="flex items-center px-4 py-2 bg-gray-100 rounded-t-full">
            <span
              className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
              onClick={() => setIsOpen(false)}
              title="Close chatbot"
            />
            <h3 className="text-sm font-semibold ml-3 text-gray-700">ChatBot</h3>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white text-sm scroll-smooth">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-xl px-4 py-2 max-w-[75%] ${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm italic">
                  Bot is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-gray-200 px-4 py-3 bg-white rounded-b-[2rem]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-grow text-sm border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition"
              title="Send message"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-blue-600 shadow-lg p-3 hover:scale-110 transition-transform"
          aria-label="Open chatbot"
        >
          <img src={chatbot} alt="Chat Icon" className="w-6 h-6 invert" />
        </button>
      )}
    </div>
  );
}


export default ChatBot;
