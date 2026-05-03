'use client';

/**
 * @file ElectionRoadmap.tsx
 * @description Simplified Educational Roadmap with illustrative styling.
 * Focuses on 'Plain Language' headers and a high-fidelity 'App-Style' icon design.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogIn, UserCheck, Send, FileText, BarChart,
  GraduationCap, ChevronDown, Lock, ShieldCheck, BookOpen, 
  Sparkles, CheckCircle, Smartphone, MousePointer2, ClipboardCheck
} from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';
import Swal from 'sweetalert2';

interface VoterStep {
  id: number;
  simpleHeader: string;
  officialTitle: string;
  icon: any;
  color: string;
  summary: string;
  details: string;
  lesson: string;
  security: string;
}

const VOTER_STEPS: VoterStep[] = [
  { 
    id: 1, 
    simpleHeader: '1. Log In Safely',
    officialTitle: 'Secure Identity Check', 
    icon: LogIn,
    color: '#10b981', 
    summary: 'Enter your Voter ID and use your fingerprint to enter the system.',
    details: 'Just like a bank app, we use your fingerprint or face to make sure it is really you. We don\'t save your fingerprint; we only use it to open your ballot.',
    lesson: 'Think of your Digital ID as your key to the voting booth. Keep it private!',
    security: 'Bank-Grade Authentication'
  },
  { 
    id: 2, 
    simpleHeader: '2. Choose Your Candidate',
    officialTitle: 'Private Selection', 
    icon: MousePointer2,
    color: '#38bdf8', 
    summary: 'Look at the candidates and pick the one you want.',
    details: 'You can read about each candidate before you pick. Once you select someone, the system hides your choice so nobody else can see it.',
    lesson: 'You have the right to a secret vote. Nobody can see who you pick on this screen.',
    security: 'Private Digital Booth'
  },
  { 
    id: 3, 
    simpleHeader: '3. Send Your Vote',
    officialTitle: 'Cryptographic Casting', 
    icon: Send,
    color: '#fbbf24', 
    summary: 'Confirm your choice and send your vote to the box.',
    details: 'When you click "Send", your vote is sealed in a digital envelope. It travels safely to the national counting center through a secure tunnel.',
    lesson: 'Once you click send, your vote is permanent and cannot be changed by anyone.',
    security: 'End-to-End Encryption'
  },
  { 
    id: 4, 
    simpleHeader: '4. Get Your Receipt',
    officialTitle: 'Ballot Hash Receipt', 
    icon: ClipboardCheck,
    color: '#818cf8', 
    summary: 'Save your unique receipt code to prove you voted.',
    details: 'The system gives you a special code (like a tracking number). This code doesn\'t show who you voted for, but it proves your vote is in the system.',
    lesson: 'Keep this code safe! You will need it later to check if your vote was counted.',
    security: 'Digital Tracking ID'
  },
  { 
    id: 5, 
    simpleHeader: '5. Check the Results',
    officialTitle: 'Public Verification', 
    icon: BarChart,
    color: '#f472b6', 
    summary: 'Use your receipt to see that your vote was counted.',
    details: 'After the election, you can put your receipt code into the "Public Ledger" to see your vote is included in the final total.',
    lesson: 'This is called "Transparency." It means you can prove the election was fair.',
    security: 'Public Audit Ledger'
  },
];

export default function ElectionRoadmap() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number | null>(1);
  const [unlocked, setUnlocked] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('voter_roadmap_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCompleted(parsed);
      setUnlocked(Math.min(parsed.length + 1, VOTER_STEPS.length));
    }
  }, []);

  const handleNext = (id: number) => {
    if (!completed.includes(id)) {
      const newCompleted = [...completed, id];
      setCompleted(newCompleted);
      localStorage.setItem('voter_roadmap_v2', JSON.stringify(newCompleted));
      
      if (id < VOTER_STEPS.length) {
        setUnlocked(id + 1);
        setExpanded(id + 1);
        Swal.fire({
          title: 'Great Job!',
          text: 'You understood this step. Now let\'s learn the next one.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      } else {
        Swal.fire({
          title: 'You are an Expert!',
          text: 'You now know exactly how to vote safely. You are ready for Election Day.',
          icon: 'success',
          confirmButtonText: 'View Dashboard',
          confirmButtonColor: 'var(--secondary)'
        });
      }
    }
  };

  const progress = (completed.length / VOTER_STEPS.length) * 100;

  return (
    <div className="animate-slide-in" style={{ paddingBottom: '5rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Simplified Educational Header */}
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(56, 189, 248, 0.1)', padding: '0.6rem 1.5rem', borderRadius: '2rem', border: '1px solid var(--primary)', marginBottom: '2rem' }}>
          <GraduationCap size={20} color="var(--primary)" />
          <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '0.1em' }}>VOTING MADE SIMPLE</span>
        </div>
        
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>How to Vote: A Simple Guide</h2>
        <p style={{ color: 'var(--text-dim)', fontWeight: '600', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Follow these 5 simple steps to cast your secure digital vote in 2026.
        </p>

        {/* Progress Bar with Simple Text */}
        <div style={{ maxWidth: '450px', margin: '3rem auto 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '900', color: 'var(--text)', marginBottom: '0.75rem' }}>
            <span>YOUR LEARNING PROGRESS</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', boxShadow: '0 0 20px var(--primary-glow)' }}
            />
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative' }}>
        {/* Simple Vertical Line */}
        <div style={{ position: 'absolute', left: '40px', top: '2rem', bottom: '2rem', width: '2px', background: 'var(--border)', opacity: 0.2 }} />

        {VOTER_STEPS.map((step) => {
          const isLocked = step.id > unlocked;
          const isDone = completed.includes(step.id);
          const isOpen = expanded === step.id;

          return (
            <div key={step.id} style={{ position: 'relative', zIndex: 1, opacity: isLocked ? 0.4 : 1 }}>
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                {/* Illustrative Icon Design (App-Style) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.div 
                    animate={{ 
                      scale: isOpen ? 1.1 : 1,
                      backgroundColor: isDone ? 'var(--secondary)' : isOpen ? step.color : 'var(--surface)',
                      borderColor: isDone ? 'var(--secondary)' : isOpen ? step.color : 'var(--border)'
                    }}
                    style={{ 
                      width: '82px', height: '82px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '2px solid', cursor: isLocked ? 'not-allowed' : 'pointer', position: 'relative',
                      boxShadow: isOpen ? `0 15px 30px ${step.color}30` : 'none', transition: 'all 0.3s'
                    }}
                    onClick={() => !isLocked && setExpanded(isOpen ? null : step.id)}
                  >
                    {isDone ? (
                      <CheckCircle size={36} color="#020617" />
                    ) : (
                      <step.icon size={36} color={isOpen ? "#020617" : step.color} />
                    )}
                    {isOpen && !isDone && (
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ position: 'absolute', inset: -8, borderRadius: '28px', border: `2px solid ${step.color}`, opacity: 0.3 }} 
                      />
                    )}
                  </motion.div>
                </div>

                {/* Simple Content Card */}
                <motion.div 
                  layout
                  className="glass-card"
                  style={{ 
                    flex: 1, padding: '2.5rem', cursor: isLocked ? 'not-allowed' : 'pointer', 
                    border: isOpen ? `2px solid ${step.color}` : isDone ? '1px solid var(--secondary)' : '1px solid var(--border)',
                    background: isOpen ? `${step.color}05` : 'var(--surface)'
                  }}
                  onClick={() => !isLocked && setExpanded(isOpen ? null : step.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: isLocked ? 'var(--text-dim)' : 'var(--text)' }}>
                        {step.simpleHeader}
                      </h3>
                      {!isOpen && !isLocked && (
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.75rem', fontWeight: '500' }}>
                          {step.summary}
                        </p>
                      )}
                    </div>
                    {!isLocked && (
                      <ChevronDown size={24} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: 'var(--text-dim)' }} />
                    )}
                  </div>

                  <AnimatePresence>
                    {isOpen && !isLocked && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: '2rem', marginTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: '900', color: step.color, letterSpacing: '0.1em', marginBottom: '1rem' }}>OFFICIAL PROCESS: {step.officialTitle.toUpperCase()}</h4>
                            <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: 'var(--text)' }}>{step.details}</p>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div style={{ padding: '1.5rem', background: `${step.color}05`, borderRadius: '1.25rem', border: `1px solid ${step.color}20` }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <ShieldCheck size={20} color={step.color} />
                                <span style={{ fontSize: '0.75rem', fontWeight: '900', color: step.color }}>HOW WE PROTECT YOU</span>
                              </div>
                              <p style={{ fontSize: '1rem', fontWeight: '800' }}>{step.security}</p>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '1.25rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <BookOpen size={20} color="var(--secondary)" />
                                <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--secondary)' }}>WHAT TO REMEMBER</span>
                              </div>
                              <p style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: '1.5', color: 'var(--text-muted)' }}>{step.lesson}</p>
                            </div>
                          </div>

                          {!isDone && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleNext(step.id); }}
                              className="btn-primary"
                              style={{ width: '100%', padding: '1.5rem', background: step.color, fontSize: '1.1rem', fontWeight: '900', boxShadow: `0 10px 30px ${step.color}40` }}
                            >
                              I Understand, Next Step →
                            </button>
                          )}
                          {isDone && (
                            <div style={{ textAlign: 'center', padding: '1.25rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1.25rem', color: 'var(--secondary)', fontWeight: '900', fontSize: '1rem', border: '1px solid var(--secondary)' }}>
                               ✓ YOU HAVE MASTERED THIS STEP
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
