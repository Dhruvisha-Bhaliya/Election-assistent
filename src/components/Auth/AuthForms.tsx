'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2, CheckCircle, ShieldCheck, AlertTriangle, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function LoginForm({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t } = useLanguage();

  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(/^[a-z0-9._%+-]+@gmail\.com$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please use a valid @gmail.com address');
      return;
    }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1200));
    login(email, password);
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: '3.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.div initial={{ y: -10 }} animate={{ y: 0 }} style={{ width: '72px', height: '72px', background: 'var(--primary-glow)', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--primary)' }}>
          <Fingerprint size={36} color="var(--primary)" />
        </motion.div>
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{t('welcome_back')}</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: '500' }}>Secure multi-factor authentication</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <Mail className="search-icon" size={18} style={{ left: '1.5rem' }} />
          <input 
            type="email" 
            placeholder={t('gmail_address')} 
            className="search-input" 
            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            required
          />
        </div>
        
        <div style={{ position: 'relative' }}>
          <Lock className="search-icon" size={18} style={{ left: '1.5rem' }} />
          <input 
            type="password" 
            placeholder={t('secure_password')} 
            className="search-input" 
            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ color: 'var(--danger)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
              <AlertTriangle size={16} /> {error}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '1.25rem', marginTop: '1rem', fontSize: '1.125rem' }}>
          {loading ? <Loader2 className="animate-spin" /> : <>{t('access_portal')} <ArrowRight size={20} /></>}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--text-dim)', fontWeight: '600' }}>
          {t('new_voter')} <span onClick={onToggle} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '800' }}>{t('initialize_registration')}</span>
        </p>
      </div>
    </motion.div>
  );
}

export function RegisterForm({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { t } = useLanguage();

  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(/^[a-z0-9._%+-]+@gmail\.com$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Registration requires a @gmail.com address');
      return;
    }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 2000));
    setIsSuccess(true);
    setTimeout(() => register(email, name, password), 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: '3.5rem' }}>
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div key="reg" exit={{ opacity: 0, y: -20 }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{t('initialize_registration')}</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: '500' }}>{t('identity_creation')}</p>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ position: 'relative' }}>
                <UserIcon className="search-icon" size={18} style={{ left: '1.5rem' }} />
                <input type="text" placeholder={t('legal_name')} className="search-input" style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }} value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div style={{ position: 'relative' }}>
                <Mail className="search-icon" size={18} style={{ left: '1.5rem' }} />
                <input type="email" placeholder={t('gmail_address')} className="search-input" style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }} value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div style={{ position: 'relative' }}>
                <Lock className="search-icon" size={18} style={{ left: '1.5rem' }} />
                <input type="password" placeholder={t('secure_password')} className="search-input" style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }} value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--danger)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
                    <AlertTriangle size={16} /> {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '1.25rem', marginTop: '1rem', fontSize: '1.125rem' }}>
                {loading ? <Loader2 className="animate-spin" /> : <>{t('create_account')} <ArrowRight size={20} /></>}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-dim)', fontWeight: '600' }}>
                {t('already_registered')} <span onClick={onToggle} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '800' }}>{t('login')}</span>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ width: '100px', height: '100px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', border: '2px solid var(--secondary)' }}>
              <CheckCircle size={56} color="var(--secondary)" />
            </div>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem' }}>Verified!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Encryption complete. Redirecting to your secure dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
