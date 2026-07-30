'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { MessageSquare, Send, Sparkles, X, AlertCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState, FormEvent, KeyboardEvent } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300, staggerChildren: 0.05 } },
  exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } },
};

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 10, x: -10 },
  visible: { opacity: 1, y: 0, x: 0, transition: { type: "spring", stiffness: 500, damping: 30 } },
};

const SUGGESTED_QUESTIONS = [
  "What is your primary expertise?",
  "Can I hire you for a freelance project?",
  "What technologies do you use?",
  "How can I contact you?"
];

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Zahid's AI Assistant. I can help you learn about his experience, projects, technical skills, WordPress development, frontend work and SEO expertise. Feel free to ask anything."
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isLoading, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const sendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    setError(null);
    const userMsg: ChatMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error('Network response error');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
          return updated;
        });
      }
    } catch (err) {
      console.error('AI Chat Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Muhammad Zahid Iqbal is a WordPress Developer and Technical SEO Specialist based in Chitral, Pakistan. You can reach him directly at **mzahidiqbal129@gmail.com** or WhatsApp at **+92 348 6377723**."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e?: FormEvent) => {
    if (e) e.preventDefault();
    sendMessage(inputVal);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-[380px] sm:w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B1021]/95 shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="relative border-b border-white/10 bg-white/[0.03] p-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-50" />
              <div className="relative flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#0B1021] shadow-sm">
                      <Image
                        src="/images/profile-1.jpg"
                        alt="Muhammad Zahid Iqbal"
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0B1021] bg-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                      Muhammad Zahid Iqbal
                      <Sparkles className="w-3.5 h-3.5 text-[#80FFDB]" />
                    </h3>
                    <span className="text-xs text-[#8A94A7]">AI Representative</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-white/10 text-white cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex h-[360px] flex-col gap-4 overflow-y-auto p-4 bg-gradient-to-b from-[#050816]/40 to-[#0B1021]/80 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id || i}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" && "flex-row-reverse self-end"
                  )}
                >
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10 shadow-sm flex items-center justify-center bg-white/5">
                    {msg.role === 'assistant' ? (
                      <Image src="/images/profile-1.jpg" alt="Zahid" fill sizes="32px" className="object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-white">ME</span>
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex max-w-[85%] flex-col gap-1",
                      msg.role === "user" && "items-end"
                    )}
                  >
                    <span className="text-xs font-semibold text-[#8A94A7]">
                      {msg.role === 'assistant' ? 'Zahid AI' : 'You'}
                    </span>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-[14px] sm:text-[15px] font-medium leading-relaxed shadow-sm backdrop-blur-sm border border-white/10 prose prose-invert max-w-none prose-p:my-1 prose-a:text-[#80FFDB] prose-strong:text-white prose-ul:my-1 prose-li:my-0",
                        msg.role === 'assistant'
                          ? "rounded-tl-none bg-white/[0.05] text-[#E2E8F0]"
                          : "rounded-tr-none bg-gradient-to-br from-[#7400B8] to-[#5E60CE] text-white border-transparent"
                      )}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Suggested Questions (only show if just the welcome message exists) */}
              {messages.length === 1 && !isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-2 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-[#8A94A7] text-center mb-1">Suggested Questions</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSuggestedClick(q)}
                        className="text-xs px-3 py-1.5 rounded-full border border-[#7400B8]/40 bg-[#7400B8]/10 text-[#B8C0D4] hover:bg-[#7400B8]/30 hover:text-white transition-colors cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Loading Indicator */}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10 shadow-sm">
                    <Image src="/images/profile-1.jpg" alt="Typing..." fill sizes="32px" className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="rounded-2xl rounded-tl-none bg-white/[0.05] px-4 py-3 shadow-sm border border-white/10 w-16 flex items-center justify-center gap-1.5 h-[42px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#80FFDB] animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#80FFDB] animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#80FFDB] animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div ref={messagesEndRef} className="h-px w-full" />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-[#0B1021]/80 p-3 backdrop-blur-md">
              <form className="relative flex items-end gap-2" onSubmit={handleSend}>
                <textarea
                  ref={inputRef}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask me anything... (Shift+Enter for new line)"
                  className="flex-1 max-h-[120px] min-h-[44px] resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white outline-none transition-all placeholder:text-[#8A94A7] focus:border-[#7400B8] focus:ring-1 focus:ring-[#7400B8]/50 scrollbar-thin"
                  rows={1}
                />
                <Button
                  size="icon"
                  type="submit"
                  className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-[#7400B8] to-[#5E60CE] text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                  disabled={!inputVal.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
        aria-label="Toggle AI Assistant"
        className={cn(
          "cursor-pointer group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300",
          isOpen
            ? "bg-red-600 text-white rotate-90"
            : "bg-gradient-to-br from-[#7400B8] to-[#5E60CE] text-white hover:shadow-[0_0_30px_rgba(116,0,184,0.4)]"
        )}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-inherit opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative w-full h-full p-0.5 rounded-full overflow-hidden">
             <Image src="/images/profile-1.jpg" alt="Chat" fill className="object-cover rounded-full" />
             <div className="absolute inset-0 bg-[#7400B8]/20 rounded-full mix-blend-overlay" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
