'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Map, Activity, ArrowUp, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TurnoutAnalytics() {
  const { t } = useLanguage();
  const regions = [
    { name: 'North Zone', turnout: '68%', change: '+5%', color: 'var(--primary)', bg: 'rgba(56, 189, 248, 0.1)' },
    { name: 'South Zone', turnout: '74%', change: '+2%', color: 'var(--secondary)', bg: 'rgba(16, 185, 129, 0.1)' },
    { name: 'East Zone', turnout: '62%', change: '-1%', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    { name: 'West Zone', turnout: '81%', change: '+8%', color: 'var(--accent)', bg: 'rgba(251, 191, 36, 0.1)' },
  ];

  return (
    <div className="glass-card" style={{ padding: '2rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Activity color="var(--primary)" size={20} /> {t('turnout_analytics_title')}
          </h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="live-dot" style={{ width: '8px', height: '8px' }} /> 72.4%
          </div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {regions.map((region, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.02 }}
            style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: `1px solid ${region.color}30`, position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: region.color, filter: 'blur(80px)', opacity: 0.1 }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: '800' }}>{region.name}</span>
              <span className="badge" style={{ 
                fontSize: '0.7rem', 
                background: region.change.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                color: region.change.startsWith('+') ? 'var(--secondary)' : '#ef4444',
                border: 'none',
                fontWeight: '800'
              }}>
                <ArrowUp size={12} style={{ marginRight: '0.25rem', transform: region.change.startsWith('+') ? 'none' : 'rotate(180deg)' }} />
                {region.change}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.05em' }}>{region.turnout}</span>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: region.turnout }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                style={{ height: '100%', background: `linear-gradient(to right, ${region.color}, white)`, borderRadius: '4px' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
