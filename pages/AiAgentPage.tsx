import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatMessage, User } from '../types';
import { streamAgentResponse } from '../services/agentservice';
import { BackgroundBeams } from '../components/ui/background-beams';
import Lenis from 'lenis';

interface AiAgentPageProps {
  user: User | null;
  onLogout: () => void;
}

/* ---------------- FORMATTED MESSAGE ---------------- */

const FormattedMessage: React.FC<{
  content: string;
  isUser: boolean;
  accentColor: string;
}> = ({ content, isUser }) => {
  const lines = content.split('\n');

  return (
    <div className={`space-y-3 ${isUser ? '!text-[#000000]' : 'text-[#D1D1D6]'}`}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-3" />;

        const formattedLine = trimmed.replace(
          /\*\*(.*?)\*\*/g,
          `<strong class="${isUser ? '!text-[#000000]' : 'text-white'} font-semibold">$1</strong>`
        );

        return (
          <p
            key={index}
            className="leading-relaxed text-[15px]"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      })}
    </div>
  );
};

/* ---------------- AI AGENT PAGE ---------------- */

const AiAgentPage: React.FC<AiAgentPageProps> = ({ user, onLogout }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  /* --------- HARD CONTROLS --------- */
  const isProcessingRef = useRef(false);
  const hasAutoQueried = useRef(false);

  /* --------- SMOOTH SCROLL SETUP --------- */
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current, // Target the same element if it's the scroller
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Organic easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* --------- AUTO SCROLL --------- */
  useEffect(() => {
    if (lenisRef.current && messagesEndRef.current) {
      lenisRef.current.scrollTo(messagesEndRef.current, { immediate: false });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  /* --------- SEND MESSAGE --------- */
  const handleSend = useCallback(
    async (text?: string) => {
      const messageText = text ?? input.trim();
      if (!messageText || isProcessingRef.current) return;

      isProcessingRef.current = true;
      setIsLoading(true);

      // Add user message immediately
      const newHistory: ChatMessage[] = [
        ...messages,
        { role: 'user', content: messageText },
      ];

      setMessages(newHistory);
      setInput('');

      try {
        // Add placeholder for assistant response
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: '' },
        ]);

        let fullReply = "";

        // Pass history
        const historyForBackend = messages;

        for await (const chunk of streamAgentResponse(messageText, historyForBackend)) {
          fullReply += chunk;
          setMessages(prev => {
            const last = prev[prev.length - 1];
            // Update the last message (assistant placeholder)
            if (last.role === 'assistant') {
              return [
                ...prev.slice(0, -1),
                { ...last, content: fullReply }
              ];
            }
            return prev;
          });
        }

      } catch (err) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: '⚠️ AI failed to respond. Please try again.',
          },
        ]);
      } finally {
        isProcessingRef.current = false;
        setIsLoading(false);
      }
    },
    [input, messages]
  );

  /* --------- AUTO QUERY FROM ROUTER --------- */
  useEffect(() => {
    const autoPrompt = (location.state as any)?.autoPrompt;

    if (autoPrompt && !hasAutoQueried.current) {
      hasAutoQueried.current = true;
      handleSend(autoPrompt);
    }
  }, [location.state, handleSend]);

  /* ---------------- UI ---------------- */

  return (
    <div className="flex h-screen bg-[#0B0C10] text-white relative w-full antialiased overflow-hidden">
      <BackgroundBeams className="opacity-40" />
      <div className="flex flex-col flex-1 z-10 relative">

        {/* HEADER */}
        <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
            <h1 className="text-sm font-bold tracking-widest text-gray-300">
              ONBOARD <span className="text-white">HUB</span>
            </h1>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div ref={scrollContainerRef} className="flex-1 flex flex-col w-full px-4 pb-24 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-500/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">

          {messages.length === 0 ? (
            /* EMPTY STATE - HERO SECTION */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in duration-700">
              <div className="mb-2">
                <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-2xl ring-1 ring-white/10">
                  <span className="text-4xl">✨</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight relative">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    ASK ME
                  </span>
                  <br />
                  <span className="text-white">QUESTIONS.</span>
                </h2>
                <p className="text-gray-400 text-xl font-medium tracking-wide max-w-lg mx-auto">
                  Your dedicated <span className="text-cyan-400">Backend</span> & <span className="text-blue-400">Architecture</span> guide.
                </p>
              </div>

              <div className="flex justify-center gap-6 mb-10 pt-8 w-full max-w-4xl mx-auto">
                {[
                  { label: "PROTOCOL: /GETTING-STARTED", prompt: "How do I get started?" },
                  { label: "STACK TRACE: BACKEND", prompt: "Explain the backend architecture" },
                  { label: "TECHNICAL FAQ", prompt: "Common issues and fixes" }
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(item.prompt)}
                    className="group relative px-6 py-4 rounded-xl bg-[#161A20] border border-white/5 overflow-hidden transition-all hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative text-xs font-bold tracking-widest text-gray-400 group-hover:text-cyan-400 uppercase">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* MESSAGES LIST */
            <div className="w-full max-w-5xl mx-auto px-4 space-y-6 pb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-lg ${msg.role === 'user' ? 'message-bubble sent' : 'bg-[#1C1F26]/80 backdrop-blur-md text-gray-200 border border-white/5'}`}
                  >
                    <FormattedMessage
                      content={msg.content}
                      isUser={msg.role === 'user'}
                      accentColor={msg.role === 'user' ? '#000' : '#3B82F6'}
                    />
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1C1F26] text-gray-400 px-5 py-3 rounded-3xl text-sm animate-pulse border border-white/5">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

        </div>

        {/* FLOATING INPUT CAPSULE */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[800px] px-4 z-50">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur"></div>
            <div className="relative flex items-center justify-center bg-[#161A20]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl p-2 pl-6">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={messages.length === 0 ? "Ask a question..." : "Type a follow-up..."}
                className="flex-1 bg-transparent text-black placeholder-gray-500 focus:text-black outline-none text-base font-medium text-center transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading}
                className="ml-2 w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200 disabled:opacity-50 transition-all font-bold"
              >
                Let's Go
              </button>
            </div>

            {/* Input Footer Text */}
            <div className="absolute -bottom-6 left-0 w-full text-center">
              <p className="text-[10px] text-gray-600 tracking-widest uppercase font-semibold">
                Running w/ Gemini 2.5 Flash
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiAgentPage;