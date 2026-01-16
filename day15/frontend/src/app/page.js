"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export default function Home() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!joined) return;

    socket = io("http://localhost:3001");

    socket.emit("join_room", {
      roomId: "room-1",
      username,
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, [joined, username]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      roomId: "room-1",
      message,
    });

    setMessage("");
  };

  if (!joined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-900">
        <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            🚀 Join the Chat
          </h1>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-xl bg-black/40 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={() => setJoined(true)}
            disabled={!username}
            className="w-full mt-6 py-3 rounded-xl font-semibold text-white 
                       bg-indigo-600 hover:bg-indigo-700 
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-300"
          >
            Enter Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[85vh] rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/20 text-white text-xl font-semibold">
          💬 Room 1 <span className="text-indigo-400 ml-2">({username})</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => {
            const isMe = msg.username === username;

            return (
              <div
                key={i}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm
                    ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-black/40 text-gray-200 rounded-bl-none"
                    }`}
                >
                  {!isMe && (
                    <p className="text-xs text-indigo-400 mb-1">
                      {msg.username}
                    </p>
                  )}
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/20 flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl bg-black/40 text-white placeholder-gray-400
                       border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="px-6 py-3 rounded-xl font-semibold text-white
                       bg-indigo-600 hover:bg-indigo-700
                       transition-all duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
