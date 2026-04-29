'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: string;
}

interface AssistantProps {
  mode?: 'bubble' | 'inline';
}

const useAssistantLogic = () => {
  const { locale } = useLanguage();
  
  const getBotResponse = (input: string) => {
    const low = input.toLowerCase();
    
    if (low.includes('how to vote') || low.includes('process')) {
      return locale === 'en' 
        ? "The voting process is: 1. Verify your name in the list. 2. Visit your polling station. 3. Carry your Voter ID. 4. Cast your vote on the EVM."
        : "मतदान प्रक्रिया: 1. सूची में अपना नाम जांचें। 2. अपने मतदान केंद्र पर जाएं। 3. अपना वोटर आईडी साथ रखें। 4. ईवीएम पर अपना वोट डालें।";
    }
    
    if (low.includes('registration') || low.includes('register')) {
      return locale === 'en'
        ? "You can register to vote via the 'Registration' form on our home page. You'll need a valid ID and proof of residence."
        : "आप हमारे होम पेज पर 'पंजीकरण' फॉर्म के माध्यम से मतदान के लिए पंजीकरण कर सकते हैं। आपको एक वैध आईडी और निवास के प्रमाण की आवश्यकता होगी।";
    }
    
    if (low.includes('date') || low.includes('when')) {
      return locale === 'en'
        ? "The general elections are scheduled for May 17, 2026. Phase 1 begins at 7:00 AM."
        : "आम चुनाव 17 मई, 2026 के लिए निर्धारित हैं। चरण 1 सुबह 7:00 बजे शुरू होता है।";
    }

    return locale === 'en' 
      ? "I specialize in election procedures, registration, and voting schedules. How else can I assist you today?"
      : "मैं चुनाव प्रक्रियाओं, पंजीकरण और मतदान कार्यक्रमों में विशेषज्ञ हूं। मैं आज आपकी और कैसे सहायता कर सकता हूं?";
  };

  return { getBotResponse };
};

export default function Assistant({ mode = 'bubble' }: AssistantProps) {
  const { locale } = useLanguage();
  const { getBotResponse } = useAssistantLogic();
  const [isOpen, setIsOpen] = useState(mode === 'inline');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        role: 'bot', 
        text: locale === 'en' ? "Welcome to VoterConnect AI. Ask me about registration, dates, or the voting process." : "वोटरकनेक्ट एआई में आपका स्वागत है। मुझसे पंजीकरण, तारीखों या मतदान प्रक्रिया के बारे में पूछें।",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [locale, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userInput = input;
    setMessages(prev => [...prev, { role: 'user', text: userInput, time: currentTime }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: getBotResponse(userInput),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 800);
  };

  const chatContent = (
    <motion.div
      initial={mode === 'bubble' ? { opacity: 0, y: 50, scale: 0.9 } : { opacity: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="glass-card"
      style={{ 
        width: mode === 'bubble' ? '420px' : '100%', 
        height: mode === 'bubble' ? '600px' : '100%', 
        padding: 0, overflow: 'hidden', 
        display: 'flex', flexDirection: 'column', 
        border: '1px solid var(--primary)',
        position: 'relative',
        background: 'var(--surface)'
      }}
    >
      <div style={{ padding: '1.5rem', background: 'var(--surface-light)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="live-dot" />
          <h3 style={{ fontWeight: '800' }}>VoterConnect AI Assistant</h3>
        </div>
        {mode === 'bubble' && (
          <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        )}
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            <div style={{ 
              padding: '1rem 1.25rem', 
              borderRadius: '1rem',
              background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface-light)',
              color: msg.role === 'user' ? '#020617' : 'var(--text)',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              {msg.text}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.4rem', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem', background: 'var(--surface)' }}>
        <input 
          className="search-input" 
          style={{ paddingLeft: '1.25rem', flex: 1 }}
          placeholder="Ask about voting..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="btn-primary" style={{ padding: '0 1.25rem' }}>
          <Send size={18} />
        </button>
      </div>
    </motion.div>
  );

  if (mode === 'inline') return chatContent;

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="btn-primary"
            style={{ width: '64px', height: '64px', borderRadius: '50%', padding: 0, boxShadow: '0 10px 30px var(--primary-glow)' }}
          >
            <MessageCircle size={28} />
          </motion.button>
        ) : chatContent}
      </AnimatePresence>
    </div>
  );
}
