'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Vote, ChevronRight, Sparkles, Activity, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LoginForm, RegisterForm } from '@/components/Auth/AuthForms';

interface LandingPageProps {
  authMode: 'login' | 'register' | null;
  setAuthMode: (mode: 'login' | 'register' | null) => void;
  voterCount: number;
}

export default function LandingPage({ authMode, setAuthMode, voterCount }: LandingPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--text)' }}>
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")', opacity: 0.05 }} />
        <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} style={{ position: 'absolute', top: '-20%', right: '-10%', width: '70%', height: '70%', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', filter: 'blur(120px)', borderRadius: '50%' }} />
      </div>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: 'blur(24px)', borderBottom: '1px solid var(--border)', background: 'rgba(2, 6, 23, 0.8)' }}>
        <div className="container" style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => setAuthMode(null)}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Vote size={22} color="#020617" />
            </div>
            <span style={{ fontWeight: '900', fontSize: '1.25rem' }}>VoterConnect</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <LanguageSwitcher />
            <button onClick={() => setAuthMode('login')} className="btn-ghost" aria-label="Login" style={{ padding: '0.5rem 1rem' }}>{t('login')}</button>
            <button onClick={() => setAuthMode('register')} className="btn-primary" aria-label="Register" style={{ padding: '0.5rem 1.25rem' }}>{t('register')}</button>
          </div>
        </div>
      </nav>

      <main className="container" style={{ position: 'relative', paddingTop: '160px', paddingBottom: '100px', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {!authMode ? (
            <motion.section key="hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                <div className="badge" style={{ color: 'var(--accent)', marginBottom: '2rem', border: '1px solid var(--accent)' }}>
                  <Sparkles size={14} /> Next Phase: May 17, 2026
                </div>
                <h1 className="heading-hero gradient-text">{t('hero_title')}</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>{t('hero_subtitle')}</p>
                <button className="btn-primary" onClick={() => setAuthMode('register')} aria-label="Get Started" style={{ padding: '1rem 3rem', fontSize: '1.125rem', margin: '0 auto' }}>
                  {t('get_started')} <ChevronRight size={20} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '100px' }}>
                {[
                  { label: t('active_voters'), val: voterCount.toLocaleString(), icon: Activity, color: 'var(--primary)' },
                  { label: t('polling_stations'), val: "12,400", icon: Shield, color: 'var(--secondary)' },
                  { label: t('secure_votes'), val: "100%", icon: Zap, color: 'var(--accent)' }
                ].map((stat, i) => (
                  <div key={i} className="glass-card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text)', marginBottom: '0.5rem' }}>{stat.val}</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '480px', margin: '0 auto' }}>
              <button onClick={() => setAuthMode(null)} className="btn-ghost" aria-label="Go Back" style={{ marginBottom: '2rem', border: 'none' }}>← Back</button>
              {authMode === 'login' ? <LoginForm onToggle={() => setAuthMode('register')} /> : <RegisterForm onToggle={() => setAuthMode('login')} />}
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
