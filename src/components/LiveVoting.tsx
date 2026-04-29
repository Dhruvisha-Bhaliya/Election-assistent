'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, CheckCircle2, ShieldCheck, AlertCircle, User, Info, Lock, ChevronRight } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';

const candidates = [
  { id: 1, name: 'Robert Fox', party: 'Progressive Party', avatar: 'https://i.pravatar.cc/150?u=1', color: '#38bdf8' },
  { id: 2, name: 'Jane Cooper', party: 'Liberty Union', avatar: 'https://i.pravatar.cc/150?u=2', color: '#10b981' },
  { id: 3, name: 'Cody Fisher', party: 'Traditionalist Alliance', avatar: 'https://i.pravatar.cc/150?u=3', color: '#f59e0b' },
  { id: 4, name: 'Esther Howard', party: 'Green Democracy', avatar: 'https://i.pravatar.cc/150?u=4', color: '#8b5cf6' }
];

export default function LiveVoting() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [receiptId, setReceiptId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    const id = 'VC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setReceiptId(id);
    setHasVoted(true);
    setShowConfirm(false);
    setIsSubmitting(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {!hasVoted ? (
        <div className="glass-card" style={{ padding: '3rem', border: '1px solid var(--border)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                <div className="live-dot" />
                <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secure Voting Terminal</span>
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em', color: 'var(--text)' }}>Active Ballot</h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-dim)' }}>Session ID</div>
              <div style={{ fontSize: '1rem', fontWeight: '800', fontFamily: 'monospace', color: 'var(--primary)' }}>#ELEC-2026-X9</div>
            </div>
          </div>

          {/* Candidate Grid */}
          <div className="grid-main" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {candidates.map((candidate) => (
              <motion.div
                key={candidate.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelected(candidate.id)}
                style={{
                  padding: '2rem',
                  borderRadius: '1.5rem',
                  background: selected === candidate.id ? 'var(--surface-light)' : 'rgba(255, 255, 255, 0.02)',
                  border: `2px solid ${selected === candidate.id ? 'var(--primary)' : 'var(--border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}
              >
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '1.25rem', 
                  background: candidate.color, display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: selected === candidate.id ? `0 0 20px ${candidate.color}40` : 'none'
                }}>
                  <User size={32} color="#020617" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.25rem' }}>{candidate.name}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', fontWeight: '600' }}>{candidate.party}</p>
                </div>
                {selected === candidate.id && (
                  <div style={{ background: 'var(--primary)', borderRadius: '50%', padding: '4px' }}>
                    <CheckCircle2 size={24} color="#020617" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Action Bar */}
          <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-dim)' }}>
              <Lock size={20} />
              <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Your vote is anonymous and <br />
                protected by blockchain security.
              </div>
            </div>
            <button 
              className="btn-primary" 
              disabled={!selected}
              onClick={() => setShowConfirm(true)}
              style={{ padding: '1.25rem 3.5rem', fontSize: '1.125rem' }}
            >
              Verify & Cast Vote <ChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ textAlign: 'center', padding: '5rem 3rem' }}>
          <div style={{ width: '100px', height: '100px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', border: '2px solid var(--secondary)' }}>
            <ShieldCheck size={50} color="var(--secondary)" />
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Vote Confirmed</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '3.5rem', maxWidth: '500px', margin: '0 auto 3.5rem' }}>
            Your selection has been securely recorded in the national ledger. Thank you for participating in democracy.
          </p>
          
          <div style={{ background: 'var(--surface-light)', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid var(--border)', display: 'inline-block' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: '800' }}>Official Receipt</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '900', fontFamily: 'monospace', color: 'var(--primary)', letterSpacing: '0.1em' }}>{receiptId}</div>
          </div>
        </motion.div>
      )}

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {showConfirm && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isSubmitting && setShowConfirm(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(8px)' }} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-card"
              style={{ width: '100%', maxWidth: '500px', padding: '3.5rem', position: 'relative', zIndex: 1, textAlign: 'center', background: 'var(--surface)' }}
            >
              <div style={{ width: '80px', height: '80px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <AlertCircle size={40} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--text)' }}>Final Confirmation</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
                You are about to cast your vote for <br />
                <strong style={{ color: 'var(--text)', fontSize: '1.25rem' }}>{candidates.find(c => c.id === selected)?.name}</strong>. <br />
                This action is cryptographically final.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem' }}>
                <button className="btn-ghost" disabled={isSubmitting} onClick={() => setShowConfirm(false)}>Review Selection</button>
                <button className="btn-primary" disabled={isSubmitting} onClick={handleVote}>
                  {isSubmitting ? 'Encrypting...' : 'Confirm & Submit'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
