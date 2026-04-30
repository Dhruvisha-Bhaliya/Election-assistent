'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' }
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn-ghost"
        aria-label="Switch Language"
        style={{
          padding: '0.625rem 1.25rem',
          borderRadius: '12px',
          gap: '0.75rem',
          border: '1px solid var(--border)',
          background: 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <Globe size={18} style={{ color: 'var(--primary)' }} />
        <span style={{ fontWeight: '600' }}>{currentLang.name}</span>
        <ChevronDown size={16} style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'none', 
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: 0.5
        }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              style={{ position: 'fixed', inset: 0, zIndex: 90 }} 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 0.75rem)',
                right: 0,
                width: '200px',
                background: 'var(--surface)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                zIndex: 100,
                padding: '0.5rem'
              }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  aria-label={`Switch to ${lang.name}`}
                  onClick={() => {
                    setLocale(lang.code as any);
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: locale === lang.code ? 'var(--primary-glow)' : 'transparent',
                    border: 'none',
                    color: locale === lang.code ? 'var(--primary)' : 'var(--text)',
                    fontSize: '0.9375rem',
                    fontWeight: locale === lang.code ? '700' : '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: '10px',
                    transition: 'all 0.2s',
                    marginBottom: '2px'
                  }}
                  onMouseEnter={(e) => {
                    if (locale !== lang.code) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    if (locale !== lang.code) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.125rem' }}>{lang.flag}</span>
                    {lang.name}
                  </div>
                  {locale === lang.code && <Check size={16} strokeWidth={3} />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
