'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, ChevronRight, HelpCircle, Shield, Award, Sparkles, QrCode, GraduationCap } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';
import { useAuth } from '@/context/AuthContext';
import Swal from 'sweetalert2';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What documents are required for digital identity verification?",
    options: ["Only an email address", "A valid @gmail.com address and government ID", "Social media profile", "No documents needed"],
    correct: 1
  },
  {
    id: 2,
    question: "How is your vote kept anonymous in the digital system?",
    options: ["By hiding your name from the database", "Using AES-256 encryption and blockchain hashing", "Deleting the logs after voting", "It's not anonymous"],
    correct: 1
  },
  {
    id: 3,
    question: "When is the official election day for VoterConnect 2026?",
    options: ["May 1, 2026", "May 17, 2026", "June 10, 2026", "December 25, 2025"],
    correct: 1
  }
];

export default function VoterEducation() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === QUIZ_QUESTIONS[currentStep].correct) {
      setScore(score + 1);
    }

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
      // Trigger notification for Quiz Results (Failure case)
      const finalScore = index === QUIZ_QUESTIONS[currentStep].correct ? score + 1 : score;
      if (finalScore < QUIZ_QUESTIONS.length) {
        window.dispatchEvent(new CustomEvent('voter-notification', {
          detail: {
            title: 'Quiz Attempt Failed',
            desc: `Score: ${finalScore}/${QUIZ_QUESTIONS.length}. Review the materials and try again for your badge.`,
            icon: Shield,
            color: '#ef4444'
          }
        }));
      }
    }
  };

  return (
    <div className="glass-card" style={{ padding: '3rem', marginTop: '4rem', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{ width: '48px', height: '48px', background: 'var(--primary-glow)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary)' }}>
          <BookOpen size={24} color="var(--primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '900', letterSpacing: '-0.02em' }}>{t('nav_education')}</h2>
          <p style={{ color: 'var(--text-dim)', fontWeight: '600' }}>Master the digital voting process and earn your 'Certified Voter' badge.</p>
        </div>
      </div>

      {!quizStarted ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
            <Shield size={32} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>Secure Voting Guide</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>Learn how our dual-layer encryption protects your identity while ensuring every vote is counted accurately.</p>
            <button onClick={() => setShowGuide(true)} className="btn-link" style={{ color: 'var(--secondary)', fontWeight: '700', padding: 0, background: 'transparent', border: 'none', cursor: 'pointer' }}>Read Full Guide →</button>
          </div>

          <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--primary)' }}>
            <Award size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>Interactive Quiz</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>Test your knowledge of the electoral process and earn your digital certification for the 2026 elections.</p>
            <button onClick={() => setQuizStarted(true)} className="btn-primary" style={{ width: '100%', padding: '1rem' }}>Start Quiz</button>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', color: 'var(--primary)' }}>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <div style={{ width: '100px', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }} 
                    style={{ height: '100%', background: 'var(--primary)' }} 
                  />
                </div>
              </div>
              <h3 id="quiz-question" style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2.5rem' }}>{QUIZ_QUESTIONS[currentStep].question}</h3>
              <div 
                role="group" 
                aria-labelledby="quiz-question"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {QUIZ_QUESTIONS[currentStep].options.map((option, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(i)}
                    className="btn-ghost" 
                    aria-label={`Option ${i + 1}: ${option}`}
                    style={{ 
                      textAlign: 'left', padding: '1.25rem 2rem', 
                      borderRadius: '1rem', border: '1px solid var(--border)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}
                  >
                    {option} <ChevronRight size={18} opacity={0.5} />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
              {score === QUIZ_QUESTIONS.length ? (
                <>
                  <div style={{ width: '100px', height: '100px', background: 'var(--primary-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '2px solid var(--primary)', position: 'relative' }}>
                    <Sparkles size={48} color="var(--primary)" />
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }} style={{ position: 'absolute', inset: -10, border: '2px dashed var(--primary)', borderRadius: '50%', opacity: 0.3 }} />
                  </div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>Perfect Score!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '3rem' }}>
                    You have successfully demonstrated deep knowledge of the digital electoral system.
                  </p>
                  
                  <div className="glass-card" style={{ padding: '2.5rem', background: 'rgba(56, 189, 248, 0.03)', border: '2px solid var(--primary)', maxWidth: '450px', margin: '0 auto 3rem', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(56, 189, 248, 0.2)' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.6rem 1.2rem', background: 'var(--primary)', color: '#020617', fontWeight: '900', fontSize: '0.7rem', borderBottomLeftRadius: '1rem' }}>CERTIFIED 2026</div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <QrCode size={48} color="#020617" />
                      </div>
                      <div>
                        <h4 style={{ fontWeight: '900', fontSize: '1.25rem' }}>Digital Voter Credential</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ID: #VC-QZ-7782</p>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>This certificate confirms that <strong style={{ color: 'var(--text)' }}>{user?.name || 'Citizen'}</strong> has completed the comprehensive digital electoral literacy program.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 size={16} color="var(--secondary)" />
                        <span style={{ fontSize: '0.7rem', fontWeight: '800' }}>VERIFIED ON CHAIN</span>
                      </div>
                      <Award size={20} color="var(--primary)" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ width: '100px', height: '100px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '2px solid #ef4444' }}>
                    <HelpCircle size={48} color="#ef4444" />
                  </div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>Certification Denied</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '3rem' }}>
                    You scored <strong style={{ color: '#ef4444' }}>{score}/{QUIZ_QUESTIONS.length}</strong>. A perfect score is required for official digital certification.
                  </p>
                </>
              )}

              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <button onClick={() => { setQuizStarted(false); setShowResults(false); setCurrentStep(0); setScore(0); }} className="btn-ghost" style={{ padding: '1.25rem 2.5rem' }}>
                  {score === QUIZ_QUESTIONS.length ? 'Retake for Practice' : 'Try Again'}
                </button>
                {score === QUIZ_QUESTIONS.length && (
                  <button 
                    onClick={() => {
                      // Dispatch real-time notification to Dashboard
                      window.dispatchEvent(new CustomEvent('voter-notification', {
                        detail: {
                          title: 'Quiz Completed',
                          desc: `You scored ${score}/${QUIZ_QUESTIONS.length}. Digital badge granted!`,
                          icon: GraduationCap,
                          color: 'var(--primary)'
                        }
                      }));

                      Swal.fire({
                        title: 'Issuing Digital Badge',
                        text: 'Verifying quiz results on the blockchain...',
                        icon: 'info',
                        timer: 2000,
                        showConfirmButton: false,
                        didOpen: () => { Swal.showLoading(); }
                      }).then(() => {
                        Swal.fire({
                          title: 'Credential Issued!',
                          text: 'Your Literacy Badge has been added to your Digital ID.',
                          icon: 'success',
                          toast: true,
                          position: 'top-end',
                          timer: 3000,
                          showConfirmButton: false
                        });
                      });
                    }}
                    className="btn-primary" 
                    style={{ padding: '1.25rem 4rem', fontSize: '1.1rem' }}
                  >
                    Claim Digital Badge
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {showGuide && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGuide(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(12px)' }} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card" style={{ maxWidth: '700px', width: '100%', position: 'relative', border: '1px solid var(--primary)', padding: '4rem', maxHeight: '80vh', overflowY: 'auto' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '2rem' }}>Digital Voting Guide 2026</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <section>
                  <h4 style={{ color: 'var(--text)', fontWeight: '800', marginBottom: '0.5rem' }}>1. Identity Verification</h4>
                  <p>Your identity is verified using government-issued credentials linked to your secure @gmail.com account. Once verified, a unique cryptographic token is generated for your session.</p>
                </section>
                <section>
                  <h4 style={{ color: 'var(--text)', fontWeight: '800', marginBottom: '0.5rem' }}>2. Casting Your Vote</h4>
                  <p>When you select a candidate, your choice is encrypted locally using AES-256. This ensures that even the system administrators cannot see who you voted for.</p>
                </section>
                <section>
                  <h4 style={{ color: 'var(--text)', fontWeight: '800', marginBottom: '0.5rem' }}>3. Blockchain Confirmation</h4>
                  <p>Your encrypted vote is sent to the distributed ledger. Once confirmed by the network, you receive a transaction hash (Receipt ID) which you can use to verify that your vote was counted without revealing its content.</p>
                </section>
              </div>
              <button className="btn-primary" style={{ width: '100%', padding: '1.25rem', marginTop: '3rem' }} onClick={() => setShowGuide(false)}>I Understand</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
