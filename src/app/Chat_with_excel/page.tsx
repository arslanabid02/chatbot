"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  product_name: string;
  price: string;
  image_link: string;
  product_description: string;
};

type Message = {
  response_text: string;
  sender: "user" | "bot";
  items?: Product[];
};

export default function Chat_with_excel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const callWebhook = async (userMessage: string) => {
    try {
      const response = await fetch(
        "https://n8n.srv692405.hstgr.cloud/webhook/c1ce41b0-1500-4463-93c0-8086a7fcc139",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) throw new Error("Webhook failed");

      const rawText = await response.text();

      let parsedData: any = {};
      try {
        parsedData = JSON.parse(rawText);
      } catch (e) {
        console.error("Failed to parse response JSON", e);
        return { response_text: "Failed to understand the server response.", items: [] };
      }

      let items: Product[] = [];
      try {
        const rawItems = parsedData.items;
        if (typeof rawItems === "string") {
          items = JSON.parse(rawItems);
        } else if (Array.isArray(rawItems)) {
          items = rawItems;
        } else if (typeof rawItems === "object") {
          items = Object.values(rawItems);
        }
      } catch (err) {
        console.error("Failed to parse items", err);
      }

      return {
        response_text: parsedData.response_text ?? "No response text found.",
        items,
      };
    } catch (err) {
      console.error("Error calling webhook:", err);
      return { response_text: "Sorry, something went wrong.", items: [] };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = { response_text: inputMessage, sender: "user" as const };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    const response = await callWebhook(inputMessage);
    const botMsg: Message = {
      response_text: response.response_text,
      sender: "bot",
      items: response.items,
    };

    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  return (

    <div className="h-screen w-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-400 animate-gradient">
    <div className="w-full h-full bg-white border shadow-2xl flex flex-col">
  
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
        <div className="text-lg font-semibold">Chat with Excel Sheets</div>
      </div>
  
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-4 py-3 rounded-xl max-w-[80%] ${msg.sender === "user" ? "bg-indigo-500 text-white" : "bg-white border text-gray-800"}`}>
              <div dangerouslySetInnerHTML={{ __html: msg.response_text }} />
            </div>
  
            {msg.items && msg.items.length > 0 && (
              <div className="flex gap-3 overflow-x-auto py-2 mt-2">
                {msg.items.map((item) => (
                  <div key={item._id} className="min-w-[140px] border rounded-lg bg-white shadow">
                    <img src={item.image_link} alt={item.product_name} className="w-full h-24 object-cover rounded-t-lg" />
                    <div className="p-2 text-xs">
                      <div className="font-semibold mb-1 truncate">{item.product_name}</div>
                      <div className="text-gray-600 mb-1">Price: {item.price}</div>
                      <a
                        href={`http://localhost:3000/Products/${item._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-indigo-500 text-white rounded-md py-1 mt-2 hover:bg-indigo-600 transition text-xs"
                      >
                        View Product
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
  
        {loading && (
          <div className="flex justify-start items-center py-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-[10px] w-[10px] bg-indigo-600 rounded-full animate-bounce mx-1"
                style={{ animationDelay: `${-i * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>
  
      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 text-black text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-500 text-white px-4 py-2 text-sm rounded-md hover:bg-indigo-600 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  </div>
  


  );
}
