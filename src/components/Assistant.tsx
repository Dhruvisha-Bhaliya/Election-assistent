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
    
    // Help & Greetings
    if (low.match(/\b(hi|hello|hey|help|who are you|greetings)\b/)) {
      return locale === 'en'
        ? "Hello! I am your VoterConnect AI. I can help with registration, polling locations, election dates, and digital security. What's on your mind?"
        : "नमस्ते! मैं आपका वोटरकनेक्ट एआई हूं। मैं पंजीकरण, मतदान स्थानों, चुनाव तिथियों और डिजिटल सुरक्षा में मदद कर सकता हूं। आपके मन में क्या है?";
    }

    // Voting Process & Booths
    if (low.includes('vote') || low.includes('voting') || low.includes('booth') || low.includes('station') || low.includes('how to')) {
      return locale === 'en' 
        ? "To vote securely: 1. Complete your registration on this dashboard. 2. Use the 'Digital Ballot' tab to verify your assigned polling station. 3. On election day (May 17), present your ID at the booth and cast your vote on the secure EVM terminal."
        : "सुरक्षित रूप से मतदान करने के लिए: 1. इस डैशबोर्ड पर अपना पंजीकरण पूरा करें। 2. अपने आवंटित मतदान केंद्र को सत्यापित करने के लिए 'डिजिटल बैलेट' टैब का उपयोग करें। 3. चुनाव के दिन (17 मई), बूथ पर अपनी आईडी प्रस्तुत करें और सुरक्षित ईवीएम टर्मिनल पर अपना वोट डालें।";
    }
    
    // Registration & Account
    if (low.includes('register') || low.includes('account') || low.includes('profile') || low.includes('sign up') || low.includes('email')) {
      return locale === 'en'
        ? "Registration requires a valid @gmail.com address for security. Once registered, you can manage your voter profile, view your digital ID, and track election updates directly from the 'Overview' tab."
        : "सुरक्षा के लिए पंजीकरण के लिए एक वैध @gmail.com पते की आवश्यकता होती है। एक बार पंजीकृत होने के बाद, आप अपने मतदाता प्रोफाइल का प्रबंधन कर सकते हैं, अपना डिजिटल आईडी देख सकते हैं, और सीधे 'अवलोकन' टैब से चुनाव अपडेट ट्रैक कर सकते हैं।";
    }
    
    // Dates & Important info
    if (low.includes('when') || low.includes('date') || low.includes('time') || low.includes('schedule') || low.includes('calendar')) {
      return locale === 'en'
        ? "The main General Election event is scheduled for May 17, 2026. Different regions may have slightly different local timings, which you can find in the 'Election Roadmap' section."
        : "मुख्य आम चुनाव कार्यक्रम 17 मई, 2026 के लिए निर्धारित है। विभिन्न क्षेत्रों में थोड़े अलग स्थानीय समय हो सकते हैं, जिन्हें आप 'चुनाव रोडमैप' अनुभाग में पा सकते हैं।";
    }

    // Security
    if (low.includes('safe') || low.includes('secure') || low.includes('security') || low.includes('hack') || low.includes('private')) {
      return locale === 'en'
        ? "Our system uses AES-256 encryption and a private blockchain ledger. This means your identity is verified, but your actual vote choice remains anonymous and cannot be altered by anyone."
        : "हमारा सिस्टम AES-256 एन्क्रिप्शन और एक निजी ब्लॉकचेन लेजर का उपयोग करता है। इसका मतलब है कि आपकी पहचान सत्यापित है, लेकिन आपकी वास्तविक वोट पसंद गुमनाम रहती है और इसे किसी के द्वारा बदला नहीं जा सकता है।";
    }

    // Fallback for everything else
    return locale === 'en' 
      ? "That's a great question! While I'm currently focused on election procedures, I can tell you that this platform is designed to make voting accessible for everyone. You should check the 'Resources' tab for more in-depth guides, or ask me about registration!"
      : "यह एक बेहतरीन सवाल है! हालांकि मैं वर्तमान में चुनाव प्रक्रियाओं पर ध्यान केंद्रित कर रहा हूं, मैं आपको बता सकता हूं कि यह प्लेटफॉर्म सभी के लिए मतदान को सुलभ बनाने के लिए डिज़ाइन किया गया है। आपको अधिक गहन गाइड के लिए 'संसाधन' टैब की जांच करनी चाहिए, या मुझसे पंजीकरण के बारे में पूछना चाहिए!";
  };

  return { getBotResponse };
};

export default function Assistant({ mode = 'bubble' }: AssistantProps) {
  const { locale } = useLanguage();
  const { getBotResponse } = useAssistantLogic();
  const [isOpen, setIsOpen] = useState(mode === 'inline');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        role: 'bot', 
        text: locale === 'en' ? "Welcome! I'm your VoterConnect AI. Ask me about registration, voting, or election security." : "स्वागत है! मैं आपका वोटरकनेक्ट एआई हूं। मुझसे पंजीकरण, मतदान या चुनाव सुरक्षा के बारे में पूछें।",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [locale, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userInput = input;
    setMessages(prev => [...prev, { role: 'user', text: userInput, time: currentTime }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput, locale })
      });
      
      const data = await response.json();
      
      if (data.response) {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: data.response,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else if (data.isFallback || response.status === 401) {
        // Silent fallback to local keywords
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: getBotResponse(userInput),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        throw new Error('No response');
      }
    } catch (err) {
      // Fallback to local logic if API fails or key is missing
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: getBotResponse(userInput),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const chatContent = (
    <motion.div
      initial={mode === 'bubble' ? { opacity: 0, y: 50, scale: 0.9 } : { opacity: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="glass-card"
      style={{ 
        width: mode === 'bubble' ? '90vw' : '100%', 
        maxWidth: mode === 'bubble' ? '420px' : '100%',
        height: mode === 'bubble' ? 'min(600px, 80vh)' : '100%', 
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
          <button onClick={() => setIsOpen(false)} aria-label="Close Assistant" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
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
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ alignSelf: 'flex-start', background: 'var(--surface-light)', padding: '0.75rem 1.25rem', borderRadius: '1rem', display: 'flex', gap: '4px' }}>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }}>.</motion.span>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>.</motion.span>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>.</motion.span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem', background: 'var(--surface)' }}>
        <input 
          className="search-input" 
          style={{ paddingLeft: '1.25rem', flex: 1 }}
          placeholder="Ask about voting..."
          aria-label="Ask AI Assistant"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="btn-primary" aria-label="Send Message" style={{ padding: '0 1.25rem' }}>
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
            aria-label="Open AI Assistant"
            style={{ width: '64px', height: '64px', borderRadius: '50%', padding: 0, boxShadow: '0 10px 30px var(--primary-glow)' }}
          >
            <MessageCircle size={28} />
          </motion.button>
        ) : chatContent}
      </AnimatePresence>
    </div>
  );
}
