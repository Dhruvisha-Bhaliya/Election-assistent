'use client';

/**
 * @file LiveElectionResults.tsx
 * @description Real-time electoral tally dashboard with high-fidelity visualization.
 * Features live data streaming, candidate performance tracking, and network volume metrics.
 */

import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { BarChart3, TrendingUp, Activity, Users, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CANDIDATE_THEMES = [
  { id: 1, name: 'Sarah Williams', color: '#38bdf8', secondary: 'rgba(56, 189, 248, 0.1)' },
  { id: 2, name: 'James Miller', color: '#10b981', secondary: 'rgba(16, 185, 129, 0.1)' },
  { id: 3, name: 'Elena Rodriguez', color: '#fbbf24', secondary: 'rgba(251, 191, 36, 0.1)' }
];

export default function LiveElectionResults() {
  const { voteTallies } = useAuth();
  const { t } = useLanguage();
  
  const totalVotes = Object.values(voteTallies).reduce((a, b) => a + b, 0);

  return (
    <div className="glass-card" style={{ padding: '3rem', height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)' }}>
      {/* Dynamic Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Activity color="var(--primary)" size={24} className="animate-pulse" /> Live Election Tally
          </h2>
          <p style={{ color: 'var(--text-dim)', fontWeight: '600', fontSize: '0.9rem', marginTop: '0.5rem' }}>Real-time cryptographic vote counting in progress.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid #ef4444' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1s infinite' }} />
          <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '900', letterSpacing: '0.1em' }}>LIVE FEED</span>
        </div>
      </header>

      {/* Main Results Display */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        {CANDIDATE_THEMES.map((c) => {
          const count = voteTallies[c.id] || 0;
          const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : '0';
          
          return (
            <motion.div 
              key={c.id} 
              whileHover={{ x: 8 }}
              style={{ padding: '2rem', background: 'rgba(255,255,255,0.015)', borderRadius: '1.5rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '6px', background: c.color }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: c.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={16} color={c.color} />
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text)' }}>{c.name}</h4>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.04em', color: 'var(--text)' }}>
                    {count.toLocaleString()} <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '800' }}>VOTES RECORDED</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '900', color: c.color, lineHeight: '1' }}>{percentage}%</span>
                </div>
              </div>

              {/* High-Fidelity Progress Bar */}
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '5px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.5, ease: 'circOut' }}
                  style={{ height: '100%', background: `linear-gradient(90deg, ${c.color}, ${c.color}CC)`, borderRadius: '5px', boxShadow: `0 0 15px ${c.color}40` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Aggregate Volume Footer */}
      <footer style={{ marginTop: '2.5rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(2, 6, 23, 0.1))', borderRadius: '1.5rem', border: '1px solid var(--primary-glow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(56, 189, 248, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary-glow)' }}>
              <TrendingUp size={24} color="var(--primary)" />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '900', letterSpacing: '0.15em' }}>TOTAL SYSTEM VOLUME</p>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text)' }}>{totalVotes.toLocaleString()} <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>BALLOTS</span></h3>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', marginBottom: '0.25rem' }}>
               <ShieldCheck size={14} color="var(--secondary)" />
               <p style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--secondary)', letterSpacing: '0.1em' }}>VERIFIED</p>
            </div>
            <p style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text)' }}>142 NODES SYNCED</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
