import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatMessage, User } from '../types';
import { streamAgentResponse } from '../services/agentservice';

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
    <div className={`space-y-3 ${isUser ? 'text-white' : 'text-[#D1D1D6]'}`}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-3" />;

        const formattedLine = trimmed.replace(
          /\*\*(.*?)\*\*/g,
          `<strong class="text-white font-semibold">$1</strong>`
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
  const location = useLocation();

  /* --------- HARD CONTROLS --------- */
  const isProcessingRef = useRef(false);
  const hasAutoQueried = useRef(false);

  /* --------- AUTO SCROLL --------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

        // Pass history (excluding the very last user message we just added, 
        // because the backend might expect previous history + current prompt, 
        // or just history including current. My backend implementation splits 
        // history and prompt, so let's pass `messages` as history and `messageText` as prompt.
        const historyForBackend = messages; // current messages before this new one

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
    [input, messages] // Added messages dependency for history
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
    <div className="flex h-screen bg-[#0B0C10] text-white">
      <div className="flex flex-col flex-1">

        {/* HEADER */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-white/10">
          <h1 className="text-lg font-semibold">AI Agent</h1>
          <button
            onClick={onLogout}
            className="text-sm text-red-400 hover:text-red-300 transition"
          >
            Logout
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-[#1C1F26] text-gray-200 rounded-bl-md'
                  }`}
              >
                <FormattedMessage
                  content={msg.content}
                  isUser={msg.role === 'user'}
                  accentColor="#3B82F6"
                />
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#1C1F26] text-gray-400 px-4 py-2 rounded-2xl text-sm animate-pulse">
                AI is typing…
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="border-t border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message…"
              className="flex-1 bg-[#161A20] text-white px-4 py-3 rounded-xl outline-none placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-5 py-3 rounded-xl transition"
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiAgentPage;