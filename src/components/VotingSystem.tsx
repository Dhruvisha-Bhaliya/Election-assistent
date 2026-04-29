'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MapPin, Search, ArrowRight, ArrowLeft, Volume2, ShieldCheck, Fingerprint, Lock, FileCheck, UserCheck, CreditCard } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import EVM from './Dashboard/EVM';

export default function VotingSystem() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [voterId, setVoterId] = useState('');
  const [inList, setInList] = useState(false);

  const checkVoterList = async () => {
    if (!voterId) return;
    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 2000));
    setInList(true);
    setIsVerifying(false);
  };

  return (
    <div className="glass-card" style={{ padding: '3rem', border: '1px solid var(--primary)', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShieldCheck color="var(--primary)" size={32} /> {t('voting_title')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-dim)', marginTop: '0.5rem', fontWeight: '600' }}>
            GOVERNMENT OF INDIA • ELECTION COMMISSION PORTAL
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ 
              width: '50px', height: '8px', borderRadius: '4px', 
              background: step >= i ? 'var(--primary)' : 'var(--border)',
              transition: 'all 0.5s ease'
            }} />
          ))}
        </div>
      </div>

      {!hasVoted ? (
        <div style={{ minHeight: '500px' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} style={{ textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', background: 'var(--primary-glow)', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', border: '1px solid var(--primary)' }}>
                  <UserCheck size={48} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1rem' }}>Electoral Roll Verification</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.125rem', lineHeight: '1.6' }}>
                  Please enter your 10-digit EPIC (Voter ID) number to authorize your digital booth session.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', maxWidth: '550px', margin: '0 auto' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <CreditCard className="search-icon" size={20} style={{ left: '1.5rem' }} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="e.g. ABC1234567"
                      value={voterId}
                      onChange={(e) => setVoterId(e.target.value.toUpperCase())}
                      style={{ paddingLeft: '3.5rem', width: '100%', maxWidth: 'none', height: '60px' }}
                    />
                  </div>
                  <button className="btn-primary" onClick={checkVoterList} disabled={isVerifying || !voterId} style={{ height: '60px', padding: '0 2rem' }}>
                    {isVerifying ? 'Searching...' : 'Verify ID'}
                  </button>
                </div>

                {inList && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '3rem', padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '1.5rem', border: '1px solid var(--secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--secondary)', fontWeight: '900', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                      <CheckCircle2 size={24} /> RECORD FOUND • BOOTH #42-SOUTH
                    </div>
                    <button className="btn-primary" onClick={() => setStep(2)} style={{ padding: '1rem 2.5rem' }}>
                      Proceed to Identity Check <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} style={{ textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', background: 'var(--primary-glow)', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', border: '1px solid var(--primary)' }}>
                  <Fingerprint size={52} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1rem' }}>Secure Biometric Unlock</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.125rem' }}>
                  The machine is now ready. Complete the multi-factor authentication to unlock the digital ballot.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                  <button className="btn-ghost" onClick={() => setStep(1)} style={{ padding: '1rem 2rem' }}><ArrowLeft size={20} /> Back</button>
                  <button className="btn-primary" onClick={() => setStep(3)} style={{ padding: '1rem 3rem' }}>
                    Unlock Ballot <Lock size={18} style={{ marginLeft: '0.5rem' }} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <EVM onComplete={() => setHasVoted(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ width: '120px', height: '120px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3rem', color: 'var(--secondary)', border: '2px solid var(--secondary)' }}>
            <FileCheck size={64} />
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>VOTE RECORDED</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
            Your digital ballot has been securely hashed and archived. The VVPAT audit trail is now permanent.
          </p>
          
          <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left', padding: '2rem', border: '1px dashed var(--border)', background: 'var(--surface-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontWeight: '800' }}>VVPAT HASH ID</span>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)', fontWeight: '900' }}>VERIFIED</span>
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: '1rem', wordBreak: 'break-all', color: 'var(--text)', fontWeight: '700' }}>
              IN-DL-2026-BHARAT-0x7d2f9a8b1c4e6d3f0a9b2c5d8e7f1a4b6c9d0e3f
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
