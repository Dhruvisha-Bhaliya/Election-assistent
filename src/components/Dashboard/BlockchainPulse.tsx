'use client';

import { motion } from 'framer-motion';

export default function BlockchainPulse() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(56, 189, 248, 0.03)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
      <div style={{ display: 'flex', gap: '4px', height: '20px', alignItems: 'flex-end' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{ height: [8, 18, 10, 20, 8] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1, ease: 'easeInOut' }}
            style={{ width: '3px', background: 'var(--primary)', borderRadius: '2px' }}
          />
        ))}
      </div>
      <div style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
        BLOCKCHAIN PULSE: <span style={{ color: 'var(--secondary)' }}>LIVE</span>
      </div>
    </div>
  );
}
