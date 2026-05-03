'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Activity, ChevronRight, CheckCircle2, Cpu, Download, FileCheck } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';
import Swal from 'sweetalert2';
import EVM from './Dashboard/EVM';

export default function LiveVoting() {
  const { t } = useTranslation();
  const [hasVoted, setHasVoted] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPreparingBallot, setIsPreparingBallot] = useState(false);

  const startSession = async () => {
    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsVerifying(false);
    setIsPreparingBallot(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsPreparingBallot(false);
    setSessionActive(true);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '5rem' }}>
      <AnimatePresence mode="wait">
        {isPreparingBallot ? (
          <motion.div 
            key="preparing" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '10rem 0' }}
          >
            <motion.div 
              animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              style={{ width: '80px', height: '80px', margin: '0 auto 2.5rem', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%' }}
            />
            <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Preparing Digital Ballot</h3>
            <p style={{ color: 'var(--text-dim)', fontWeight: '700', letterSpacing: '0.1em' }}>DECRYPTING SECURE ELECTION SCHEMA...</p>
          </motion.div>
        ) : !sessionActive && !hasVoted ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="glass-card" 
            style={{ padding: '5rem 4rem', textAlign: 'center', border: '1px solid var(--primary)' }}
          >
            <div style={{ width: '100px', height: '100px', background: 'var(--primary-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3rem', border: '2px solid var(--primary)' }}>
              <Shield size={48} color="var(--primary)" />
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Secure Digital Booth</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem', lineHeight: '1.8' }}>
              Authorized electoral session for the 2026 General Elections. This environment is isolated, encrypted, and monitored for integrity.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
              {[
                { icon: Lock, title: 'AES-256', desc: 'Hardware Encryption' },
                { icon: Activity, title: 'Live Node', desc: 'Secure Connection' },
                { icon: Cpu, title: 'ZK-Proof', desc: 'Anonymity Shield' }
              ].map((item, i) => (
                <div key={i} style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
                  <item.icon size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                  <h4 style={{ fontWeight: '900', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '700' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={startSession}
              disabled={isVerifying}
              className="btn-primary" 
              style={{ padding: '1.5rem 5rem', fontSize: '1.35rem', fontWeight: '900' }}
            >
              {isVerifying ? 'AUTHENTICATING...' : 'ENTER SECURE BOOTH'}
            </button>
          </motion.div>
        ) : !hasVoted ? (
          <motion.div key="evm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
               <div className="badge" style={{ padding: '1rem 2rem', fontSize: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '2px solid #ef4444', fontWeight: '900' }}>
                  <Activity size={20} className="animate-pulse" style={{ marginRight: '1rem' }} /> SECURE SESSION IN PROGRESS
               </div>
             </div>
             <EVM onComplete={() => {
               setHasVoted(true);
               // Dispatch real-time notification to Dashboard
               window.dispatchEvent(new CustomEvent('voter-notification', {
                 detail: {
                   title: 'Vote Cast Successfully',
                   desc: 'Your digital ballot has been sealed on the blockchain.',
                   icon: CheckCircle2,
                   color: 'var(--secondary)'
                 }
               }));
             }} />
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="glass-card" 
            style={{ padding: '6rem 4rem', textAlign: 'center' }}
          >
            <div style={{ width: '120px', height: '120px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3rem', border: '3px solid var(--secondary)' }}>
              <CheckCircle2 size={64} color="var(--secondary)" />
            </div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Vote Cast Successfully</h2>
            
            <div style={{ position: 'relative', width: '200px', height: '150px', margin: '0 auto 3rem', background: 'var(--surface-light)', borderRadius: '1rem', border: '2px solid var(--primary)', overflow: 'hidden' }}>
              <motion.div 
                initial={{ y: -100 }}
                animate={{ y: 20 }}
                transition={{ delay: 0.5, type: 'spring' }}
                style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', padding: '1rem', background: 'white', color: '#020617', borderRadius: '4px', fontWeight: '900', fontSize: '0.6rem', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', zIndex: 10 }}
              >
                BALLOT #772
              </motion.div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40px', background: 'var(--primary)', opacity: 0.3 }} />
              <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '6px', background: 'var(--border)', borderRadius: '3px' }} />
              
              {/* Animated Chain Pulse */}
              <motion.div 
                animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ position: 'absolute', inset: 0, border: '4px solid var(--primary)', borderRadius: '1rem', opacity: 0.2 }}
              />
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem', lineHeight: '1.6' }}>
              Your digital ballot has been cryptographically sealed and recorded on the blockchain ledger.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
              <div style={{ background: 'var(--surface-light)', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid var(--border)', textAlign: 'left' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '900', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.15em' }}>Receipt Identity</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'monospace', color: 'var(--primary)' }}>#VC-X92-BLCK</div>
                <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified by 142 Network Nodes</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  onClick={() => {
                    Swal.fire({
                      title: 'Generating Receipt',
                      text: 'Encrypting transaction proof...',
                      timer: 1500,
                      showConfirmButton: false,
                      didOpen: () => { Swal.showLoading(); }
                    }).then(() => {
                      Swal.fire({ title: 'Downloaded!', text: 'Your official receipt has been saved.', icon: 'success', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
                    });
                  }} 
                  className="btn-primary" 
                  style={{ padding: '1.25rem' }}
                >
                  <Download size={20} /> Download Receipt
                </button>
                <button 
                  onClick={() => {
                    Swal.fire({
                      title: 'Blockchain Verification',
                      text: 'Tracing ballot hash on public ledger...',
                      timer: 2000,
                      showConfirmButton: false,
                      didOpen: () => { Swal.showLoading(); }
                    }).then(() => {
                      Swal.fire({ title: 'Verified!', text: 'Ballot #VC-X92 is present in Block #88219.', icon: 'success' });
                    });
                  }}
                  className="btn-ghost" 
                  style={{ padding: '1.25rem' }}
                >
                  <FileCheck size={20} /> Verify on Ledger
                </button>
              </div>
            </div>

            <button onClick={() => window.location.reload()} className="btn-link" style={{ color: 'var(--text-dim)', fontWeight: '800', fontSize: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              RETURN TO OVERVIEW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
