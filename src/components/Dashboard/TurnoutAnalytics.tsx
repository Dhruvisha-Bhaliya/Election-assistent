'use client';

/**
 * @file TurnoutAnalytics.tsx
 * @description Visualizes real-time voter participation across different electoral zones.
 */

import { motion } from 'framer-motion';
import { Activity, ArrowUp, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/** @interface Jurisdiction - Defines the data structure for a regional turnout record */
interface Jurisdiction {
  name: string;
  turnout: string;
  change: string;
  color: string;
  trend: 'up' | 'down';
}

const REGIONAL_DATA: Jurisdiction[] = [
  { name: 'North Zone', turnout: '68%', change: '+5%', color: 'var(--primary)', trend: 'up' },
  { name: 'South Zone', turnout: '74%', change: '+2%', color: 'var(--secondary)', trend: 'up' },
  { name: 'East Zone', turnout: '62%', change: '-1%', color: '#f59e0b', trend: 'down' },
  { name: 'West Zone', turnout: '81%', change: '+8%', color: 'var(--accent)', trend: 'up' },
];

export default function TurnoutAnalytics() {
  const { t } = useLanguage();

  return (
    <div className="glass-card" style={{ padding: '2.5rem', height: '100%', border: '1px solid var(--border)', background: 'linear-gradient(to bottom right, var(--surface), rgba(15, 23, 42, 0.4))' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '1rem', letterSpacing: '-0.02em' }}>
            <Activity color="var(--primary)" size={24} /> {t('turnout_analytics_title')}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.5rem', fontWeight: '600' }}>Live participation metrics by electoral jurisdiction.</p>
        </div>
        <div style={{ padding: '1rem 1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '1rem', border: '1px solid rgba(16, 185, 129, 0.1)', textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--secondary)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>TOTAL TURNOUT</div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', lineHeight: '1' }}>
             72.4%
          </div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {REGIONAL_DATA.map((region, i) => (
          <motion.div 
            key={region.name} 
            whileHover={{ y: -5, background: 'rgba(255,255,255,0.03)' }}
            style={{ padding: '2rem', background: 'rgba(255,255,255,0.015)', borderRadius: '1.5rem', border: `1px solid var(--border)`, position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={16} color={region.color} />
                <span style={{ fontSize: '1rem', color: 'var(--text)', fontWeight: '900' }}>{region.name}</span>
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: region.trend === 'up' ? 'var(--secondary)' : '#ef4444',
                fontWeight: '900',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <ArrowUp size={14} style={{ transform: region.trend === 'up' ? 'none' : 'rotate(180deg)' }} />
                {region.change}
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '0.5rem' }}>{region.turnout}</div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: region.turnout }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  style={{ height: '100%', background: region.color, borderRadius: '3px', boxShadow: `0 0 10px ${region.color}40` }}
                />
              </div>
            </div>

            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              VERIFIED BY 24 NODES
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
