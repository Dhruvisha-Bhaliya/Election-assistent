'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2, AlertTriangle, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Swal from 'sweetalert2';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').endsWith('@gmail.com', 'Registration requires a @gmail.com address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters')
});

export function LoginForm({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      login(email, password);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 3000,
        background: 'var(--surface)',
        color: 'var(--text)'
      });
    } catch (err: any) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 4000,
        background: 'var(--surface)',
        color: 'var(--text)'
      });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card auth-card" role="main" aria-labelledby="login-title">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.div initial={{ y: -10 }} animate={{ y: 0 }} style={{ width: '72px', height: '72px', background: 'var(--primary-glow)', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--primary)' }}>
          <Fingerprint size={36} color="var(--primary)" aria-hidden="true" />
        </motion.div>
        <h2 id="login-title" className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{t('welcome_back')}</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: '500' }}>Secure multi-factor authentication</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <Mail className="search-icon" size={18} style={{ left: '1.5rem' }} aria-hidden="true" />
          <input 
            type="email" 
            placeholder={t('gmail_address')} 
            className="search-input" 
            aria-label="Email Address"
            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            required
            autoComplete="email"
          />
        </div>
        
        <div style={{ position: 'relative' }}>
          <Lock className="search-icon" size={18} style={{ left: '1.5rem' }} aria-hidden="true" />
          <input 
            type="password" 
            placeholder={t('secure_password')} 
            className="search-input" 
            aria-label="Password"
            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ color: 'var(--danger)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }} role="alert">
              <AlertTriangle size={16} /> {error}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button type="submit" className="btn-primary" disabled={loading} aria-label="Login to Portal" style={{ width: '100%', padding: '1.25rem', marginTop: '1rem', fontSize: '1.125rem' }}>
          {loading ? <Loader2 className="animate-spin" aria-label="Loading" /> : <>{t('access_portal')} <ArrowRight size={20} /></>}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--text-dim)', fontWeight: '600' }}>
          {t('new_voter')} <button onClick={onToggle} className="btn-link" aria-label="Switch to registration" style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '800', background: 'transparent', border: 'none', padding: 0 }}>{t('initialize_registration')}</button>
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
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validation = registerSchema.safeParse({ email, password, name });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      register(email, name, password);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Please login with your credentials.',
        showConfirmButton: false,
        timer: 4000,
        background: 'var(--surface)',
        color: 'var(--text)'
      });
      onToggle();
    } catch (err: any) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.message || 'Registration failed',
        showConfirmButton: false,
        timer: 4000,
        background: 'var(--surface)',
        color: 'var(--text)'
      });
      setError(err.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card auth-card" role="main" aria-labelledby="register-title">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 id="register-title" className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{t('initialize_registration')}</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: '500' }}>{t('identity_creation')}</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ position: 'relative' }}>
          <UserIcon className="search-icon" size={18} style={{ left: '1.5rem' }} aria-hidden="true" />
          <input type="text" placeholder={t('legal_name')} className="search-input" aria-label="Full Name" style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }} value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
        </div>
        <div style={{ position: 'relative' }}>
          <Mail className="search-icon" size={18} style={{ left: '1.5rem' }} aria-hidden="true" />
          <input type="email" placeholder={t('gmail_address')} className="search-input" aria-label="Email Address" style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </div>
        <div style={{ position: 'relative' }}>
          <Lock className="search-icon" size={18} style={{ left: '1.5rem' }} aria-hidden="true" />
          <input type="password" placeholder={t('secure_password')} className="search-input" aria-label="Password" style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1rem' }} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--danger)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }} role="alert">
              <AlertTriangle size={16} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <button type="submit" className="btn-primary" disabled={loading} aria-label="Create Voter Account" style={{ width: '100%', padding: '1.25rem', marginTop: '1rem', fontSize: '1.125rem' }}>
          {loading ? <Loader2 className="animate-spin" aria-label="Loading" /> : <>{t('create_account')} <ArrowRight size={20} /></>}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--text-dim)', fontWeight: '600' }}>
          {t('already_registered')} <button onClick={onToggle} className="btn-link" aria-label="Switch to login" style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '800', background: 'transparent', border: 'none', padding: 0 }}>{t('login')}</button>
        </p>
      </div>
    </motion.div>
  );
}
