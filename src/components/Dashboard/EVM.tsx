'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Printer, CheckCircle2, AlertCircle, Sun, Heart, Trees, Zap, Leaf, Shield, Cpu, Activity } from 'lucide-react';
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
    
    await new Promise(r => setTimeout(r, 1000));
    playBeep();
    
    setShowVVPAT(true);
    await new Promise(r => setTimeout(r, 7000));
    setShowVVPAT(false);
    
    recordVote(id);
    onComplete();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
      {/* Modern EVM Terminal Design */}
      <div style={{ 
        width: '100%', 
        maxWidth: '700px', 
        background: '#0f172a', 
        borderRadius: '2.5rem', 
        padding: '3.5rem', 
        border: '12px solid #1e293b',
        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7), inset 0 0 40px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        {/* Machine Status Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', background: '#020617', padding: '1.25rem 2rem', borderRadius: '1.25rem', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isCasting ? '#ef4444' : '#10b981', boxShadow: `0 0 15px ${isCasting ? '#ef4444' : '#10b981'}` }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.1em' }}>{isCasting ? 'MACHINE BUSY' : 'READY TO VOTE'}</span>
            </div>
            <div style={{ width: '1px', height: '16px', background: '#334155' }} />
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={14} /> SECURE BOOTH #42
            </div>
          </div>
          <div style={{ color: '#475569', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '0.1em' }}>v2.0-STABLE</div>
        </div>

        {/* Ballot Interface */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {candidates.map((c) => (
            <div key={c.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'rgba(255,255,255,0.03)', 
              padding: '1.5rem 2.5rem', 
              borderRadius: '1.5rem', 
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.3s',
              boxShadow: selectedId === c.id ? `0 0 30px ${c.color}20` : 'none'
            }}>
              <div style={{ 
                width: '24px', height: '24px', borderRadius: '50%', 
                background: selectedId === c.id ? c.color : '#020617', 
                border: `3px solid ${selectedId === c.id ? c.color : '#334155'}`,
                boxShadow: selectedId === c.id ? `0 0 20px ${c.color}` : 'none',
                marginRight: '2rem'
              }} />
              
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#f1f5f9', marginBottom: '0.25rem' }}>{c.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <c.icon size={18} color={c.color} />
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '800', letterSpacing: '0.05em' }}>{c.party.toUpperCase()}</span>
                </div>
              </div>

              <motion.button 
                whileHover={!isCasting ? { scale: 1.05 } : {}}
                whileTap={!isCasting ? { scale: 0.95, y: 5 } : {}}
                onClick={() => handleVote(c.id)}
                disabled={isCasting || selectedId !== null}
                style={{ 
                  width: '80px', height: '55px', 
                  background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8)', 
                  border: 'none', borderRadius: '1rem',
                  boxShadow: '0 8px 0 #1e3a8a, 0 15px 30px rgba(0,0,0,0.5)',
                  cursor: isCasting ? 'not-allowed' : 'pointer',
                  position: 'relative'
                }}
              >
                {selectedId === c.id && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'absolute', inset: 0, background: 'var(--primary)', borderRadius: '1rem', zIndex: -1 }}
                  />
                )}
                <div style={{ width: '32px', height: '32px', border: '4px solid rgba(255,255,255,0.2)', borderRadius: '50%', margin: '0 auto' }} />
              </motion.button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ color: '#475569', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.05em' }}>PRESS THE BLUE BUTTON CORRESPONDING TO YOUR CHOICE</p>
        </div>
      </div>

      {/* Proper VVPAT Overlay */}
      <AnimatePresence>
        {showVVPAT && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            style={{ 
              width: '400px', background: 'white', padding: '3rem', borderRadius: '1rem', 
              boxShadow: '0 50px 100px rgba(0,0,0,0.5)', position: 'relative', zIndex: 100
            }}
          >
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '250px', height: '25px', background: '#1e293b', borderRadius: '6px' }} />
            <div style={{ textAlign: 'center', color: '#0f172a' }}>
              <Printer size={40} color="#64748b" style={{ margin: '0 auto 2rem' }} />
              <div style={{ border: '4px dashed #e2e8f0', padding: '2.5rem', borderRadius: '1.5rem', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '900', color: '#94a3b8', marginBottom: '1.5rem', letterSpacing: '0.2em' }}>OFFICIAL VVPAT SLIP</div>
                <h4 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>{vvpatCandidate?.name}</h4>
                <p style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem' }}>{vvpatCandidate?.party}</p>
                {vvpatCandidate && <vvpatCandidate.icon size={80} color={vvpatCandidate.color} />}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2.5rem', fontWeight: '700' }}>VERIFY YOUR CHOICE. THIS SLIP WILL BE STORED SECURELY.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
