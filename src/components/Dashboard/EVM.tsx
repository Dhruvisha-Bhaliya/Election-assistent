'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Printer, CheckCircle2, AlertCircle, Sun, Heart, Trees, Zap, Leaf } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const candidates = [
  { id: 1, name: 'Sarah Williams', party: 'Frontier Party', icon: Sun, color: '#f59e0b' },
  { id: 2, name: 'James Miller', party: 'Citizen Choice', icon: Heart, color: '#ef4444' },
  { id: 3, name: 'Elena Rodriguez', party: 'Nature First', icon: Trees, color: '#10b981' }
];

export default function EVM({ onComplete }: { onComplete: () => void }) {
  const { recordVote } = useAuth();
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  const [showVVPAT, setShowVVPAT] = useState(false);
  const [vvpatCandidate, setVvpatCandidate] = useState<any>(null);

  const playBeep = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3');
    audio.play().catch(e => console.log('Audio blocked'));
  };

  const handleVote = async (id: number) => {
    if (isCasting || selectedId) return;
    
    setSelectedId(id);
    setVvpatCandidate(candidates.find(c => c.id === id));
    setIsCasting(true);
    
    // Simulate real machine processing delay
    await new Promise(r => setTimeout(r, 1000));
    playBeep();
    
    // Show VVPAT Slip for 7 seconds (India Standard)
    setShowVVPAT(true);
    await new Promise(r => setTimeout(r, 7000));
    setShowVVPAT(false);
    
    // Finalize recording
    recordVote(id);
    onComplete();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      {/* Physical Machine UI */}
      <div className="glass-card" style={{ 
        width: '100%', 
        maxWidth: '550px', 
        padding: '2.5rem', 
        background: 'linear-gradient(135deg, #1e293b, #0f172a)', 
        border: '10px solid #020617',
        borderRadius: '2rem',
        boxShadow: '0 40px 80px -12px rgba(0, 0, 0, 0.6), inset 0 2px 10px rgba(255,255,255,0.05)'
      }}>
        {/* Machine Header */}
        <div style={{ background: '#020617', padding: '1.25rem', borderRadius: '1rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              borderRadius: '50%', 
              background: isCasting ? '#ef4444' : '#10b981', 
              boxShadow: `0 0 15px ${isCasting ? '#ef4444' : '#10b981'}`,
              animation: isCasting ? 'pulse 0.5s infinite' : 'none'
            }} />
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '900', letterSpacing: '0.15em' }}>
              {isCasting ? 'MACHINE BUSY' : 'READY TO VOTE'}
            </span>
          </div>
          <div style={{ color: '#475569', fontSize: '0.7rem', fontWeight: '800' }}>EVM v.2026-BHARAT</div>
        </div>

        {/* Candidate Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {candidates.map((c) => (
            <div key={c.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'rgba(255,255,255,0.02)', 
              padding: '1rem 1.5rem', 
              borderRadius: '0.75rem', 
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative'
            }}>
              {/* LED Indicator */}
              <div style={{ 
                width: '16px', 
                height: '16px', 
                borderRadius: '50%', 
                background: selectedId === c.id ? '#ef4444' : '#020617',
                border: '2px solid #334155',
                marginRight: '1.5rem',
                boxShadow: selectedId === c.id ? '0 0 20px #ef4444' : 'none',
                transition: 'all 0.1s'
              }} />

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: '800', color: '#f1f5f9' }}>{c.name}</span>
                  <c.icon size={28} color={c.color} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '800', letterSpacing: '0.05em' }}>{c.party.toUpperCase()}</span>
              </div>

              {/* Physical Blue Button */}
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => handleVote(c.id)}
                disabled={isCasting || selectedId !== null}
                style={{ 
                  marginLeft: '2rem',
                  width: '70px',
                  height: '45px',
                  background: 'linear-gradient(to bottom, #2563eb, #1e40af)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 6px 0 #1e3a8a, 0 10px 15px rgba(0,0,0,0.4)',
                  cursor: isCasting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' }} />
              </motion.button>
            </div>
          ))}
        </div>

        {/* Instructions Footer */}
        <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: '#020617', borderRadius: '0.75rem', textAlign: 'center', border: '1px dashed #1e293b' }}>
          <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', letterSpacing: '0.05em' }}>
            PRESS THE BLUE BUTTON AGAINST YOUR CANDIDATE
          </p>
        </div>
      </div>

      {/* VVPAT Printer Animation */}
      <AnimatePresence>
        {showVVPAT && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            style={{ 
              width: '350px', 
              background: '#ffffff', 
              borderRadius: '0.5rem', 
              padding: '2rem', 
              boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.4)',
              border: '1px solid #e2e8f0',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '220px', height: '25px', background: '#1e293b', borderRadius: '6px' }} />
            <div style={{ textAlign: 'center', color: '#0f172a' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Printer size={32} color="#64748b" />
              </div>
              <p style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.15em', marginBottom: '1.5rem', color: '#475569' }}>VVPAT AUDIT SLIP</p>
              <div style={{ border: '3px dashed #cbd5e1', padding: '2rem', borderRadius: '1rem', background: '#f8fafc' }}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.5rem' }}>{vvpatCandidate?.name}</h4>
                <p style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary)' }}>{vvpatCandidate?.party}</p>
                <div style={{ marginTop: '1.5rem' }}>
                  {vvpatCandidate && <vvpatCandidate.icon size={60} color={vvpatCandidate.color} />}
                </div>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2rem', lineHeight: '1.5' }}>
                Verification active for 7 seconds.<br/>Slip will drop into secure ballot container.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isCasting && !showVVPAT && selectedId && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
          <CheckCircle2 size={64} color="#10b981" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.75rem', fontWeight: '900' }}>Vote Recorded Successfully</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Session closed. Please exit the booth area.</p>
        </motion.div>
      )}
    </div>
  );
}
