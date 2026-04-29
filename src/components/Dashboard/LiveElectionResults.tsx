'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { BarChart3, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const candidates = [
  { id: 1, name: 'Sarah Williams', color: '#6366f1' },
  { id: 2, name: 'James Miller', color: '#10b981' },
  { id: 3, name: 'Elena Rodriguez', color: '#f59e0b' }
];

export default function LiveElectionResults() {
  const { voteTallies } = useAuth();
  const { t } = useLanguage();
  
  const totalVotes = Object.values(voteTallies).reduce((a, b) => a + b, 0);

  return (
    <div className="glass-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BarChart3 color="var(--primary)" size={20} /> {t('live_results_title')}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1s infinite' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '800', letterSpacing: '0.05em' }}>LIVE STREAM</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        {candidates.map((c) => {
          const count = voteTallies[c.id] || 0;
          const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : '0';
          
          return (
            <div key={c.id} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '4px', background: c.color }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text)' }}>{c.name}</h4>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                    {count.toLocaleString()} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>VOTES</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '900', color: c.color }}>{percentage}%</span>
                </div>
              </div>

              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ height: '100%', background: c.color, borderRadius: '3px' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--primary-glow)', borderRadius: '1rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '36px', height: '36px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} color="var(--primary)" />
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '800', letterSpacing: '0.05em' }}>AGGREGATE VOLUME</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900' }}>{totalVotes.toLocaleString()}</h3>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '800', letterSpacing: '0.05em' }}>SYNC STATUS</p>
            <p style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--secondary)' }}>REAL-TIME</p>
          </div>
        </div>
      </div>
    </div>
  );
}
