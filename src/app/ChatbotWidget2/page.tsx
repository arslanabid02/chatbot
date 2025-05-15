// "use client";
// import { useEffect, useState } from "react";

// type Message = {
//   response_text: string;
//   sender: "user" | "bot";
//   items?: {
//     _id: string;
//     title: string;
//     price: string;
//     description: string;
//     imageUrl: string;
//     visitLink: string;
//   }[];
// };

// export default function EcommerceChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   // const [uploadedImage, setUploadedImage] = useState<File | null>(null);

//   const callWebhook = async (userMessage: string) => {
//     try {
//       const response = await fetch(
//         "https://arslanabid027.app.n8n.cloud/webhook-test/c05edd7a-d800-4610-8ea3-18c7e2d32cd4",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ message: userMessage }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         throw new Error("Webhook failed");
//       }
//     } catch (err) {
//       return { response_text: "Sorry, something went wrong." };
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const userMsg = { response_text: inputMessage, sender: "user" as const };
//     setMessages((prev) => [...prev, userMsg]);
//     setInputMessage("");
//     setLoading(true);

//     const response = await callWebhook(inputMessage);
//     console.log("Webhook Response:", response);

//     const botMsg: Message = {
//       response_text: response?.response_text ?? "Sorry, I didn't get that.",
//       sender: "bot",
//       items: response?.items || [],
//     };

//     setMessages((prev) => [...prev, botMsg]);
//     setLoading(false);
//   };

//   return (
//     <>
//         {isOpen && (
//           <div className="w-[90vw] sm:w-[480px] h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden animate-slide-up">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-orange-500 px-4 py-6 border-b border-orange-300 flex justify-between items-center">
//               <span className="text-[30px] font-semibold text-white">
//                 Sales Agent <br/>
//                 {loading?(<span className="text-[20px]">Typing...</span>):(<span className="text-[20px] "> 🟢 Online</span>)}
//               </span>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-orange-100 hover:text-white text-xl"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm bg-gray-50">
//               {messages.map((msg, idx) => (
//                 <div key={idx}>
//                   <div
//                     className={`mb-1 ${
//                       msg.sender === "user"
//                         ? "text-right font-[1.6rem]"
//                         : "text-left font-[1.6rem]"
//                     }`}
//                   >
//                     <div
//                       className={`inline-block px-6 py-4 text-[23px] rounded-2xl max-w-[90%] ${
//                         msg.sender === "user"
//                           ? "bg-orange-500 text-white"
//                           : "bg-gray-200 border border-gray-200 text-gray-800"
//                       }`}
//                     >
//                       <div
//                         dangerouslySetInnerHTML={{
//                           __html: msg.response_text,
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* Product Cards */}
//                   {msg.items && (
//                     <div className="flex gap-4 overflow-x-auto py-2">
//                       {msg.items.map((items, cIdx) => (
//                         <div
//                           key={cIdx}
//                           className="min-w-[160px] border rounded-lg bg-white shadow-md"
//                         >
//                           <img
//                             src={items.imageUrl}
//                             alt={items.title}
//                             className="w-full h-28 object-cover rounded-t-lg"
//                           />
//                           <div className="p-2 text-xs">
//                             <div className="font-semibold mb-1">
//                               {items.title}
//                             </div>
//                             <div className="text-gray-500 mb-2">
//                               Price: {items.price}
//                             </div>
//                             <a
//                               href={items.visitLink}
//                               target="_blank"
//                               className="text-blue-500 block mb-1"
//                             >
//                               Buy Now
//                             </a>
//                             <a
//                               href={`http://localhost:3000/Products/${items._id}`}
//                               target="_blank"
//                               className="text-orange-500 font-semibold"
//                             >
//                               Purchase
//                             </a>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {/* Loader */}
//               {loading && (
//                 <div className="flex  items-center py-4">
//                   <span className="sr-only">Loading...</span>
//                   <div className="h-[15px] w-[15px] sm:h-[15px] sm:w-[15px] bg-gray-900 rounded-full animate-bounce [animation-delay:-0.3s] mx-1"></div>
//                   <div className="h-[15px] w-[15px] sm:h-[15px] sm:w-[15px] bg-gray-900 rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
//                   <div className="h-[15px] w-[15px] sm:h-[15px] sm:w-[15px] bg-gray-900 rounded-full animate-bounce mx-1"></div>
//                 </div>
//               )}
//             </div>

//             {/* Input Area */}
//             <div className="p-3 border-t bg-white space-y-3">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   placeholder="Type a message..."
//                   className="flex-1 p-3 text-[23px] border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="bg-orange-500 cursor-pointer text-white px-8 py-4 text-2xl rounded-xl hover:bg-orange-600 transition transform-gpu"
//                 >
//                   <span className="inline-block rotate-0">➤</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Floating Button */}


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
