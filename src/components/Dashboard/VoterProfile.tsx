'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import useTranslation from '@/hooks/useTranslation';
import { User, CheckCircle, Calendar, MapPin, ExternalLink, Shield, Zap, Bell, Download, QrCode, Activity, Newspaper, Radio, ArrowUpRight, Info, AlertTriangle, Clock, Search, Globe, Server, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic imports for sub-components to optimize dashboard performance
const TurnoutAnalytics = dynamic(() => import('./TurnoutAnalytics'), { ssr: false });
const LiveElectionResults = dynamic(() => import('./LiveElectionResults'), { ssr: false });
const CandidateManifesto = dynamic(() => import('./CandidateManifesto'), { ssr: false });
const VoterResources = dynamic(() => import('./VoterResources'), { ssr: false });

export default function VoterProfile() {
  const { user, voterCount } = useAuth();
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newsSearch, setNewsSearch] = useState('');
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveNews = [
    { id: 1, time: '2 mins ago', title: 'Poll Station Update', text: 'New polling station added in Sector 5 for faster processing.', type: 'info', fullText: 'To accommodate the higher-than-expected voter registration in Sector 5, a new high-capacity polling station has been established at the Community Hall.' },
    { id: 2, time: '1 hour ago', title: 'Regional Turnout', text: 'Voter turnout in your region is currently at 42%.', type: 'stat', fullText: 'Your region (Western District) is showing strong engagement. Compared to 2024, the turnout is up by 12%.' },
    { id: 3, time: '3 hours ago', title: 'Manifesto Alert', text: 'Candidate Alex Johnson released their final digital manifesto.', type: 'news', fullText: 'The "Green Democracy" manifesto focusing on sustainable energy and digital literacy has been released.' }
  ];

  const filteredNews = useMemo(() => {
    return liveNews.filter(n => n.title.toLowerCase().includes(newsSearch.toLowerCase()) || n.text.toLowerCase().includes(newsSearch.toLowerCase()));
  }, [newsSearch]);

  const quickStats = [
    { id: 'voters', label: 'Network Voters', value: (voterCount / 1000000).toFixed(2) + 'M', icon: CheckCircle, color: 'var(--secondary)', trend: '+12%', bg: 'rgba(16, 185, 129, 0.1)' },
    { id: 'rank', label: 'Region Rank', value: '#245', icon: Zap, color: 'var(--accent)', trend: 'Top 5%', bg: 'rgba(251, 191, 36, 0.1)' },
    { id: 'status', label: 'System Health', value: 'OPTIMAL', icon: Server, color: 'var(--primary)', trend: '99.9%', bg: 'rgba(56, 189, 248, 0.1)' }
  ];

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsDownloading(false);
    alert('Digital Voter ID Secure Download Complete.');
  };

  return (
    <div className="animate-slide-in">
      {/* Real-time Command Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            {t('nav_overview')}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--text-dim)', fontWeight: '600' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={16} /> Global Node: Asia-South-1</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {currentTime.toLocaleTimeString()}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="badge" style={{ color: 'var(--secondary)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem' }}>
            <Activity size={14} style={{ marginRight: '0.5rem' }} /> Live Election Sync Active
          </div>
        </div>
      </div>

      {/* BENTO BOX DASHBOARD LAYOUT */}
      <div className="bento-grid" style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* ROW 1: Digital ID (Span 8) & Quick Stats (Span 4) */}
        <motion.div 
          className="glass-card bento-item-large" 
          style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(2, 6, 23, 0.8))', border: '1px solid var(--primary)', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(120px)', opacity: 0.15 }} />
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <QrCode size={140} color="#020617" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>{t('voter_id_label')}</div>
                  <h3 style={{ fontSize: '2.75rem', fontWeight: '900', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>{user?.name || 'Citizen'}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '800', letterSpacing: '0.1em' }}>ID TOKEN</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '900', fontFamily: 'monospace', color: 'var(--primary)' }}>#V-2026-88XC</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.25rem' }}>ELECTORAL REGION</div>
                  <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{user?.region || 'National Capital Territory'}</div>
                </div>
                <div style={{ width: '1px', background: 'var(--border)' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.25rem' }}>POLLING STATUS</div>
                  <div style={{ fontWeight: '900', fontSize: '1.1rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="live-dot" style={{ width: '6px', height: '6px' }} /> REGISTERED
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleDownload} aria-label="Download Secure Voter Card" disabled={isDownloading} className="btn-primary" style={{ padding: '1rem 2rem' }}>
                  {isDownloading ? 'Encrypting...' : <><Download size={18} /> Download Secure Card</>}
                </button>
                <button className="btn-ghost" aria-label="Manage Access Settings" style={{ padding: '1rem 1.5rem' }}><Settings size={18} /> Manage Access</button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="bento-item-small" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {quickStats.map((stat, i) => (
            <motion.div key={stat.id} className="stat-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '1rem', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${stat.color}30` }}>
                <stat.icon size={32} color={stat.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '800', textTransform: 'uppercase' }}>{stat.label}</p>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: stat.color, background: stat.bg, padding: '0.2rem 0.5rem', borderRadius: '0.5rem' }}>{stat.trend}</span>
                </div>
                <h4 style={{ fontSize: '1.75rem', fontWeight: '900', letterSpacing: '-0.02em' }}>{stat.value}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROW 2: Turnout (Span 8) & Intel Feed (Span 4) */}
        <div className="bento-item-large">
          <TurnoutAnalytics />
        </div>

        <div className="bento-item-small" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="glass-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Radio size={20} color="var(--primary)" className="animate-pulse" /> {t('real_time_updates')}
              </h3>
            </div>

            <div className="search-wrapper" style={{ marginBottom: '1.5rem', width: '100%', maxWidth: 'none' }}>
              <Search className="search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Search intel feed..." 
                className="search-input" 
                aria-label="Search Intel Feed"
                value={newsSearch}
                onChange={(e) => setNewsSearch(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
              {filteredNews.map((item) => (
                <motion.div 
                  key={item.id} 
                  whileHover={{ x: 4, background: 'rgba(255,255,255,0.05)' }}
                  onClick={() => setSelectedNews(item)}
                  style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: '900', letterSpacing: '0.1em' }}>{item.time.toUpperCase()}</span>
                    <ArrowUpRight size={14} color="var(--text-dim)" />
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{item.text}</p>
                </motion.div>
              ))}
              {filteredNews.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem' }}>No matching intel found.</p>}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedNews && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedNews(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(12px)' }} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card" style={{ maxWidth: '600px', width: '100%', position: 'relative', border: '1px solid var(--primary)', padding: '4rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '1.5rem', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', border: '1px solid var(--primary)' }}>
                <Newspaper size={32} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1.5rem' }}>{selectedNews.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '3rem' }}>{selectedNews.fullText}</p>
              <button className="btn-primary" aria-label="Acknowledge and Close News" style={{ width: '100%', padding: '1.25rem' }} onClick={() => setSelectedNews(null)}>Acknowledge & Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="responsive-split-grid" style={{ display: 'grid', gap: '3rem', marginTop: '4rem' }}>
        <LiveElectionResults />
        <CandidateManifesto />
      </div>

      <VoterResources />
    </div>
  );
}
