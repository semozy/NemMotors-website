"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { askAssistant } from "@/app/actions/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "Welkom bij NEM Motors 👋 Ik ben uw digitale assistent. Vraag me alles over onze voorraad, inruilen of diensten.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Openingsuren",
    "Inruilen",
    "Voorraad",
    "Contact",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Call the Server Action
      const responseText = await askAssistant(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: responseText },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: "Oeps, er ging iets mis met mijn verbinding. Probeer het straks opnieuw!" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950 text-white shadow-xl transition-transform hover:scale-110 active:scale-95 lg:bottom-6"
            aria-label="Open chat"
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[999999] flex h-[600px] max-h-[80vh] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] font-sans lg:bottom-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <span className="text-[13px] font-black text-neutral-950 tracking-widest">AI</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold tracking-tight text-white">NEM Assistent</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span className="text-[11px] text-neutral-400 font-medium">Online • antwoordt direct</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                aria-label="Close chat"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-neutral-900 p-5">
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-[85%] rounded-[20px] px-4 py-3 text-[14px] leading-relaxed tracking-normal ${
                        msg.role === "user"
                          ? "bg-white text-neutral-950 rounded-br-sm shadow-sm font-medium"
                          : "bg-neutral-800 text-white rounded-bl-sm border border-neutral-700 shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 rounded-[20px] rounded-bl-sm border border-neutral-700 bg-neutral-800 px-4 py-4 shadow-sm">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: "0ms" }}></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: "150ms" }}></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Replies */}
            {!isTyping && messages[messages.length - 1]?.role === "ai" && (
              <div className="bg-neutral-900 px-5 pb-4">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="rounded-full border border-neutral-700 bg-neutral-950 px-3.5 py-1.5 text-[12px] font-medium text-neutral-300 transition hover:border-neutral-500 hover:text-white shadow-sm"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-neutral-800 bg-neutral-950 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Stel uw vraag..."
                  className="h-12 w-full rounded-full border border-neutral-800 bg-neutral-900 pl-5 pr-12 text-[14px] text-white outline-none transition placeholder:text-neutral-500 focus:border-neutral-500 focus:bg-neutral-800 focus:ring-1 focus:ring-neutral-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-950 transition hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-white"
                >
                  <Send className="h-4 w-4 -translate-x-[1px] translate-y-[1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
