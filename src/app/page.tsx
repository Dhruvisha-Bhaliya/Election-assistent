'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LoginForm, RegisterForm } from '@/components/Auth/AuthForms';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Dynamic imports for heavy components to speed up initial load
const VoterProfile = dynamic(() => import('@/components/Dashboard/VoterProfile'), { ssr: false });
const Assistant = dynamic(() => import('@/components/Assistant'), { ssr: false });
const ElectionRoadmap = dynamic(() => import('@/components/ElectionRoadmap'), { ssr: false });
const LiveVoting = dynamic(() => import('@/components/LiveVoting'), { ssr: false });
import { 
  Vote, LogOut, ChevronRight, Menu, X, Award, Zap, Shield, Sparkles, Activity, 
  LayoutDashboard, Map, BarChart3, MessageSquare, Search, Bell, Settings, UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { user, logout, isLoading } = useAuth();
  const { t } = useLanguage();
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [voterCount, setVoterCount] = useState(24500120);

  useEffect(() => {
    const interval = setInterval(() => {
      setVoterCount(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) return null;

  if (user) {
    return (
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Vote size={24} color="#020617" />
              </div>
              <span style={{ fontWeight: '900', fontSize: '1.25rem' }}>VoterConnect</span>
            </div>
            <button className="mobile-only" onClick={() => setIsSidebarOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
          </div>

          <nav className="sidebar-nav">
            <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }} role="button" aria-label="Go to Overview">
              <LayoutDashboard size={20} /> <span>{t('nav_overview')}</span>
            </div>
            <div className={`nav-item ${activeTab === 'ballot' ? 'active' : ''}`} onClick={() => { setActiveTab('ballot'); setIsSidebarOpen(false); }} role="button" aria-label="Go to Digital Ballot">
              <Shield size={20} /> <span>{t('nav_ballot')}</span>
            </div>
            <div className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`} onClick={() => { setActiveTab('roadmap'); setIsSidebarOpen(false); }} role="button" aria-label="Go to Roadmap">
              <Map size={20} /> <span>{t('nav_roadmap')}</span>
            </div>
            <div className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => { setActiveTab('stats'); setIsSidebarOpen(false); }} role="button" aria-label="Go to Analytics">
              <BarChart3 size={20} /> <span>{t('nav_analytics')}</span>
            </div>
            <div className={`nav-item ${activeTab === 'assistant' ? 'active' : ''}`} onClick={() => { setActiveTab('assistant'); setIsSidebarOpen(false); }} role="button" aria-label="Go to AI Assistant">
              <MessageSquare size={20} /> <span>{t('nav_assistant')}</span>
            </div>
          </nav>

          <nav style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            <div className="nav-item" onClick={logout} style={{ color: 'var(--danger)' }} role="button" aria-label="Sign Out">
              <LogOut size={20} /> <span>{t('sign_out')}</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="mobile-only" onClick={() => setIsSidebarOpen(true)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--text)' }}>
                <Menu size={24} />
              </button>
              <div className="search-wrapper desktop-only">
                <Search className="search-icon" size={18} />
                <input type="text" placeholder={t('search_placeholder')} className="search-input" aria-label="Search Dashboard" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div className="desktop-only"><LanguageSwitcher /></div>
              <div style={{ position: 'relative', cursor: 'pointer' }}>
                <Bell size={22} color="var(--text-muted)" />
                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div className="desktop-only" style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '800' }}>{user.name}</div>
                  <div className="live-indicator">Online</div>
                </div>
                <UserCircle size={32} color="var(--primary)" />
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ minHeight: 'calc(100vh - 200px)' }}
            >
              {activeTab === 'overview' && <VoterProfile />}
              {activeTab === 'ballot' && <LiveVoting />}
              {activeTab === 'roadmap' && <ElectionRoadmap />}
              {activeTab === 'stats' && <VoterProfile />} 
              {activeTab === 'assistant' && (
                <div style={{ height: '75vh', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <Assistant mode="inline" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--text)' }}>
      {/* Landing Page Content */}
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
