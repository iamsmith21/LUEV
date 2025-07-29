import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import chatbot from '../assets/chatbotImg/chat-lines-solid.svg';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);


  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "👋 Hi there! I’m your friendly assistant. Ask me about our vehicles, support, or financing options."
        },
      ]);
    }
  }, [isOpen, messages.length]);

  function includesAny(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
  }
  

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const lower = input.toLowerCase();
    let response = "Sorry, I didn't understand that. Please try to type keywords (support/loan/Car name) etc.";


    const vehicleKeywords = ["vehicle", "car", "tesla", "lucid", 
                             "kia", "ev", "hyundai", "honda", 
                             "mazda", "porsche", "chevrolet", "bmw",
                             "nissan", "volkswagen", "polestar", "jaguar",
                             "ford", "chrysler", "audi", "suv", "coupe",
                             "sedan", "minivan", "hatchback", "electric"];

    if (includesAny(lower, vehicleKeywords)) {
      response = "Navigating to our car listings!";
      navigate("/cars");
    } else if (lower.includes("support") || lower.includes("help") || lower.includes("faq")) {
      response = "Taking you to the support page.";
      navigate("/contact");
    } else if (lower.includes("finance") || lower.includes("loan")) {
      response = "Here's how financing works.";
      navigate("/how-financing-works");
    }

    setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-white p-4 rounded-xl shadow-xl border border-gray-200 transition-all duration-300">

  
          <h3 className="text-lg font-semibold text-gray-800 mb-2">ChatBot</h3>

        
          <div className="h-48 overflow-y-auto mb-3 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-line ${
                  msg.sender === "bot"
                    ? "text-gray-800 bg-gray-200 px-3 py-1.5 rounded-lg self-start max-w-[90%]"
                    : "text-white bg-blue-500 px-3 py-1.5 rounded-lg self-end text-right max-w-[90%] ml-auto"
                }`}
              >
                <strong>{msg.sender === "bot" ? "Bot: " : "You: "}</strong> {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

    
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something..."
            className="w-full border border-gray-300 text-gray-800 rounded-md px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

   
          <button
            onClick={handleSend}
            className="hover:bg-blue-700 bg-blue-600 text-white text-sm font-medium transition px-2 py-1 rounded m-1"
          >
            Send
          </button>
                    <button 
            onClick={() => setIsOpen(false)}
            className="hover:bg-red-700 bg-red-500 text-white text-sm font-medium transition px-2 py-1 rounded m-1"
          >
            Close
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-0 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-150"
          aria-label="Open chatbot"
        >
          <img src={chatbot} alt="Chat" className="w-10 h-10" />
        </button>
      )}
    </div>
  );
}

export default ChatBot;
