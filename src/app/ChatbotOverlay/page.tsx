// "use client";

// import { useEffect, useState } from "react";

// export default function ChatbotOverlay() {
//   const [isOpen, setIsOpen] = useState(true);

//   useEffect(() => {
//     const open = localStorage.getItem("chatbotOpen");
//     setIsOpen(open !== "false"); // default to open
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("chatbotOpen", isOpen.toString());
//   }, [isOpen]);

//   return (
//     <>
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 z-[999999] bg-orange-500 text-white px-4 py-3 rounded-full shadow-xl hover:bg-orange-600 transition"
//       >
//         💬 Chat
//       </button>

//       {/* Chatbot Iframe */}
//       {isOpen && (
//         <iframe
//           src="http://localhost:3001/Chatbot-widget"
//           style={{
//             position: "fixed",
//             bottom: "80px",
//             right: "20px",
//             width: "800px",
//             height: "950px",
//             border: "none",
//             zIndex: 999998,
//           }}
//           allowtransparency={true}
//         />
//       )}
//     </>
//   );
// }
