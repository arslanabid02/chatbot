// "use client";

// import { useEffect, useState } from "react";

// type Product = {
//   _id: string;
//   product_name: string;
//   price: string;
//   image_link: string;
//   product_description: string;
// };

// type Message = {
//   response_text: string;
//   sender: "user" | "bot";
//   items?: Product[];
// };

// export default function EcommerceChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const callWebhook = async (userMessage: string) => {
//     try {
//       const response = await fetch(
//         "https://n8n.srv692405.hstgr.cloud/webhook/c05edd7a-d800-4610-8ea3-18c7e2d32cd4",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ message: userMessage }),
//         }
//       );


//       if (!response.ok) throw new Error("Webhook failed");

//       const rawText = await response.text(); // response is text (but JSON inside)

//       let parsedData: any = {};
//       try {
//         parsedData = JSON.parse(rawText); // Convert string to JSON
//       } catch (e) {
//         console.error("Failed to parse response JSON", e);
//         return { response_text: "Failed to understand the server response.", items: [] };
//       }

//       // Extract items intelligently
//       let items: Product[] = [];
//       try {
//         const rawItems = parsedData.items;

//         if (typeof rawItems === "string") {
//           items = JSON.parse(rawItems);
//         } else if (Array.isArray(rawItems)) {
//           items = rawItems;
//         } else if (typeof rawItems === "object") {
//           items = Object.values(rawItems);
//         }
//       } catch (err) {
//         console.error("Failed to parse items", err);
//       }

//       return {
//         response_text: parsedData.response_text ?? "No response text found.",
//         items,
//       };
//     } catch (err) {
//       console.error("Error calling webhook:", err);
//       return { response_text: "Sorry, something went wrong.", items: [] };
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const userMsg = { response_text: inputMessage, sender: "user" as const };
//     setMessages((prev) => [...prev, userMsg]);
//     setInputMessage("");
//     setLoading(true);

//     const response = await callWebhook(inputMessage);
//     const botMsg: Message = {
//       response_text: response.response_text,
//       sender: "bot",
//       items: response.items,
//     };
//     console.log("response.response_text", response);

//     setMessages((prev) => [...prev, botMsg]);
//     setLoading(false);
//   };

//   return (
//     <>
//       <div className="fixed bottom-3 right-4 z-50 flex flex-col items-end gap-4">
//         {isOpen && (
//           <div className="w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden animate-slide-up">
//             {/* Header */}
//             <div className="sticky top-0 bg-orange-500 px-4 py-4 flex justify-between items-center">
//               <span className="text-white font-semibold text-lg leading-tight">
//                 Sales Agent <br />
//                 <span className="text-sm">{loading ? "Typing..." : "🟢 Online"}</span>
//               </span>
//               <button onClick={() => setIsOpen(false)} className="text-orange-100 text-xl hover:text-white">✕</button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gray-50">
//               {messages.map((msg, idx) => (
//                 <div key={idx}>
//                   <div className={`mb-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
//                     <div className={`inline-block px-4 py-3 rounded-xl max-w-[85%] ${msg.sender === "user" ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-900"}`}>
//                       <div dangerouslySetInnerHTML={{ __html: msg.response_text }} />
//                     </div>
//                   </div>

//                   {/* Product Cards */}
//                   {msg.items && msg.items.length > 0 && (
//                     <div className="flex gap-3 overflow-x-auto py-2">
//                       {msg.items.map((item) => (
//                         <div key={item._id} className="min-w-[140px] border rounded-lg bg-white shadow-md">
//                           <img src={item.image_link} alt={item.product_name} className="w-full h-24 object-cover rounded-t-lg" />
//                           <div className="p-2 text-xs">
//                             <div className="font-semibold mb-1 truncate">{item.product_name}</div>
//                             <div className="text-gray-600 mb-1">Price: {item.price}</div>
//                             <a
//                               href={`http://localhost:3000/Products/${item._id}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="block text-center bg-orange-500 text-white rounded-md py-1 mt-2 hover:bg-orange-600 transition text-xs"
//                             >
//                               View Product
//                             </a>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex items-center py-4">
//                   {[0, 1, 2].map((i) => (
//                     <div
//                       key={i}
//                       className="h-[10px] w-[10px] bg-gray-900 rounded-full animate-bounce mx-1"
//                       style={{ animationDelay: `${-i * 0.15}s` }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Input */}
//             <div className="p-2 border-t bg-white">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   placeholder="Type a message..."
//                   className="flex-1 p-2 text-sm border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="bg-orange-500 text-white px-4 py-2 text-sm rounded-md hover:bg-orange-600 transition"
//                 >
//                   ➤
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Toggle Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-14 h-14 bg-orange-500 rounded-full shadow-xl flex items-center justify-center text-white text-3xl hover:bg-orange-600 transition"
//         >
//           💬
//         </button>
//       </div>

//       <style jsx>{`
//         .animate-slide-up {
//           animation: slide-up 0.3s ease-out;
//         }
//         @keyframes slide-up {
//           from {
//             transform: translateY(40px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </>
//   );
// }
