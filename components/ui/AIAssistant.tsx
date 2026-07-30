'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, User, RefreshCw, ArrowUpRight, MessageSquareCode } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface PromptCard {
  title: string;
  subtitle: string;
  query: string;
}

const PRESET_PROMPTS: PromptCard[] = [
  {
    title: 'WordPress & WooCommerce',
    subtitle: 'Themes, plugins & custom PHP',
    query: 'What experience does Zahid have with WordPress and WooCommerce?',
  },
  {
    title: 'Technical SEO & Speed',
    subtitle: '90+ Lighthouse & Schema setup',
    query: 'How does Zahid optimize sites for Technical SEO and Core Web Vitals?',
  },
  {
    title: 'Featured Projects',
    subtitle: 'Upper Hand, Chitrali Saughat & more',
    query: 'What are some of Zahid’s featured projects?',
  },
  {
    title: 'Hire & Availability',
    subtitle: 'Freelance, remote & full-time',
    query: 'Is Zahid currently available for hire or remote contracts?',
  },
];

/**
 * Human Conversation Engine for Muhammad Zahid Iqbal.
 * Enforces:
 * - 40 to 120 words conversational responses.
 * - No bullet points unless requested.
 * - No robotic introductions or repetitive follow-up prompts.
 * - Natural human software developer tone.
 */
function generateZahidResponse(query: string, history: Message[]): string {
  const lower = query.toLowerCase();

  // Who is Zahid?
  if (lower.includes('who is') || lower.includes('about zahid') || lower.includes('tell me about zahid') || lower.includes('who are you')) {
    return "Muhammad Zahid Iqbal is a WordPress Developer based in Chitral, Pakistan. He mainly works on WordPress, WooCommerce and Technical SEO, and is currently expanding his expertise in modern frontend development with React and Next.js. He enjoys building fast, user friendly websites that are optimized for both visitors and search engines.";
  }

  // Hire / Availability
  if (
    lower.includes('hire') ||
    lower.includes('available') ||
    lower.includes('freelance') ||
    lower.includes('remote') ||
    lower.includes('full time') ||
    lower.includes('job') ||
    lower.includes('opportunity')
  ) {
    return "Absolutely. Zahid is available for freelance projects, remote work and full time opportunities. If you'd like to discuss a project, you can contact him through WhatsApp, email or the contact form on this website.";
  }

  // Contact / Phone / Email
  if (
    lower.includes('phone') ||
    lower.includes('number') ||
    lower.includes('email') ||
    lower.includes('whatsapp') ||
    lower.includes('contact') ||
    lower.includes('reach')
  ) {
    if (lower.includes('list') || lower.includes('bullet')) {
      return "Here is Zahid's contact information:\n• Phone & WhatsApp: +92 348 6377723\n• Email: mzahidiqbal129@gmail.com\n• Alternate Email: mzihml7@gmail.com\n• GitHub: https://github.com/zahidhml\n• Portfolio: https://mzahid.is-a.dev";
    }
    return "Sure! You can contact Zahid directly at +92 348 6377723. If you prefer email, you can reach him at mzahidiqbal129@gmail.com. He usually replies within 24 hours.";
  }

  // Technologies / Stack
  if (
    lower.includes('technology') ||
    lower.includes('tech') ||
    lower.includes('stack') ||
    lower.includes('react') ||
    lower.includes('next') ||
    lower.includes('tailwind') ||
    lower.includes('javascript') ||
    lower.includes('js')
  ) {
    return "His primary expertise is WordPress and WooCommerce. On the frontend he works with HTML, CSS, JavaScript, React, Next.js and Tailwind CSS. He also has strong experience in Technical SEO, website performance optimization and Core Web Vitals.";
  }

  // WordPress & WooCommerce
  if (
    lower.includes('word') ||
    lower.includes('woo') ||
    lower.includes('php') ||
    lower.includes('plugin') ||
    lower.includes('theme') ||
    lower.includes('elementor')
  ) {
    return "Zahid has been building WordPress and WooCommerce platforms professionally at HindukushSoft Technologies since early 2025. He works on custom theme configurations, WooCommerce shop architectures, PHP hooks, Elementor designs, and payment gateway integrations.";
  }

  // SEO & Speed
  if (
    lower.includes('seo') ||
    lower.includes('speed') ||
    lower.includes('lighthouse') ||
    lower.includes('performance') ||
    lower.includes('core web')
  ) {
    return "Performance is a major priority for Zahid. He builds and optimizes websites targeting 90+ Google Lighthouse scores. He configures Schema.org structured data, fixes canonical indexing issues, and optimizes Core Web Vitals to improve search rankings.";
  }

  // Projects
  if (
    lower.includes('project') ||
    lower.includes('built') ||
    lower.includes('work') ||
    lower.includes('portfolio') ||
    lower.includes('saughat') ||
    lower.includes('upper hand')
  ) {
    return "Some of his notable projects include Upper Hand Organization, Chitrali Saughat, A One Patti Chitral, and his personal portfolio website. He focuses on building fast, mobile responsive e-commerce stores, landing pages, and business websites.";
  }

  // Education
  if (
    lower.includes('education') ||
    lower.includes('degree') ||
    lower.includes('university') ||
    lower.includes('study') ||
    lower.includes('chitral') ||
    lower.includes('bscs')
  ) {
    return "Zahid graduated in 2024 with a Bachelor of Science in Computer Science (BSCS) from the University of Chitral. His studies gave him a strong foundation in web technologies, database management, and software engineering.";
  }

  // Default natural answer
  return "Muhammad Zahid Iqbal is a WordPress Developer and Technical SEO Specialist based in Chitral, Pakistan. He builds fast, responsive websites for business clients and international projects. Feel free to ask about his technical stack, recent work, or availability.";
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Exact requested initial greeting — shown ONCE at start
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-greeting',
      sender: 'ai',
      text: "Hi! I'm Zahid's AI Assistant. I can tell you about his projects, experience, technical skills, WordPress development, SEO expertise and anything else related to his professional work. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = typeof textToSend === 'string' ? textToSend.trim() : input.trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateZahidResponse(query, messages);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger Button — Hidden when chat modal is open */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-3.5 px-5 py-3.5 rounded-full text-white font-bold text-sm sm:text-base shadow-2xl transition-all duration-200 cursor-pointer border overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #7400B8, #5E60CE)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 30px rgba(116, 0, 184, 0.45), 0 0 20px rgba(128, 255, 219, 0.25)',
            }}
            aria-label="Open AI Assistant"
          >
            {/* Crisp Native Profile Image */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/40 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile-1.jpg"
                alt="Muhammad Zahid Iqbal"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="tracking-wide font-bold">Ask Zahid AI</span>
          </motion.button>
        </div>
      )}

      {/* Main AI Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[500px] md:w-[560px] h-[calc(100vh-4rem)] max-h-[700px] rounded-3xl flex flex-col overflow-hidden border shadow-2xl"
            style={{
              background: '#0B1021',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(116, 0, 184, 0.3)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between border-b flex-shrink-0"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex items-center gap-4">
                {/* Sharp Native Avatar Photo */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#7400B8] flex-shrink-0 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/profile-1.jpg"
                    alt="Muhammad Zahid Iqbal"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0B1021]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Muhammad Zahid Iqbal</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      AI Rep
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#8A94A7] font-medium">WordPress & Technical SEO Specialist</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#8A94A7] hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conversation Messages Container */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* AI Message Avatar */}
                  {msg.sender === 'ai' && (
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 flex-shrink-0 mt-0.5 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/profile-1.jpg"
                        alt="Zahid Iqbal"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Message Content Bubble */}
                  <div
                    className={`max-w-[82%] p-4.5 rounded-2xl text-base leading-relaxed ${
                      msg.sender === 'user'
                        ? 'text-white font-medium rounded-tr-xs'
                        : 'text-[#E2E8F0] font-normal rounded-tl-xs border'
                    }`}
                    style={
                      msg.sender === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #7400B8, #5E60CE)',
                            boxShadow: '0 4px 16px rgba(116, 0, 184, 0.35)',
                          }
                        : {
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'rgba(255, 255, 255, 0.08)',
                          }
                    }
                  >
                    <p className="whitespace-pre-wrap text-base sm:text-[15px] leading-relaxed">{msg.text}</p>
                    <span className="block text-xs mt-2 opacity-50 text-right font-medium">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/10 border border-white/15">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-3.5 justify-start">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 flex-shrink-0 mt-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/profile-1.jpg"
                      alt="Zahid Iqbal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="p-4 rounded-2xl rounded-tl-xs border text-base text-[#8A94A7] flex items-center gap-2.5"
                    style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.08)' }}
                  >
                    <RefreshCw className="w-4 h-4 animate-spin text-[#80FFDB]" />
                    <span className="text-base font-medium">Zahid is typing a response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Cards */}
            {messages.length <= 2 && (
              <div className="px-6 py-3.5 border-t border-white/[0.06] bg-black/30">
                <p className="text-xs sm:text-sm text-[#8A94A7] font-semibold mb-2.5 flex items-center gap-1.5">
                  <MessageSquareCode className="w-4 h-4 text-[#5E60CE]" />
                  Suggested Questions
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {PRESET_PROMPTS.map((p) => (
                    <button
                      key={p.title}
                      type="button"
                      onClick={() => handleSend(p.query)}
                      className="group p-3.5 rounded-xl text-left transition-colors duration-150 border cursor-pointer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderColor: 'rgba(255, 255, 255, 0.08)',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(128, 255, 219, 0.4)';
                        el.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        el.style.background = 'rgba(255, 255, 255, 0.04)';
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#80FFDB] transition-colors">
                          {p.title}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#8A94A7] group-hover:text-[#80FFDB] transition-colors" />
                      </div>
                      <p className="text-xs text-[#8A94A7] line-clamp-1">{p.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Composer Input Form */}
            <div
              className="p-4 border-t flex-shrink-0"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative flex items-center gap-2.5 p-2 rounded-2xl border transition-colors"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                }}
              >
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-base bg-transparent text-white placeholder-[#8A94A7] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-3 rounded-xl text-white transition-opacity disabled:opacity-40 cursor-pointer flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #7400B8, #5E60CE)',
                    boxShadow: '0 2px 12px rgba(116, 0, 184, 0.4)',
                  }}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
