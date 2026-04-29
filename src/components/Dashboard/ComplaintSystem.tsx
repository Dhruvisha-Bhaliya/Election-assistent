'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Send, MessageSquare, ShieldAlert, FileText, Plus, X, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ComplaintSystem() {
  const { t } = useLanguage();
  const [complaints, setComplaints] = useState([
    { id: 1, subject: 'Polling Booth Access', status: 'Resolved', date: '2026-04-20', ref: '#CMP-1022' },
    { id: 2, subject: 'Voter ID Correction', status: 'In Progress', date: '2026-04-25', ref: '#CMP-1045' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    
    const newComplaint = {
      id: complaints.length + 1,
      subject,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      ref: `#CMP-${Math.floor(Math.random() * 9000) + 1000}`
    };
    
    setComplaints([newComplaint, ...complaints]);
    setIsSubmitting(false);
    setSuccess(true);
    setSubject('');
    setDescription('');
    
    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShieldAlert color="var(--accent)" size={32} /> Help & Support
          </h2>
          <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem', fontWeight: '500' }}>Formal redressal and identity verification support</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.9375rem', background: showForm ? 'rgba(239, 68, 68, 0.1)' : 'var(--primary)', color: showForm ? '#ef4444' : 'white', border: showForm ? '1px solid #ef4444' : 'none' }}
        >
          {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> File Ticket</>}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="glass-card"
            style={{ marginBottom: '3rem', padding: '3.5rem', border: '1px solid var(--primary)' }}
          >
            {success ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '2px solid var(--secondary)' }}>
                  <CheckCircle size={40} color="var(--secondary)" />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1rem' }}>Ticket Filed Successfully</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Reference ID: #CMP-{Math.floor(Math.random()*10000)}. Our officers will review this shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: 'var(--text-dim)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Issue Category</label>
                    <select className="search-input" style={{ width: '100%', maxWidth: 'none', appearance: 'auto' }}>
                      <option>Identity Correction</option>
                      <option>Booth Reassignment</option>
                      <option>Voter Slip Issues</option>
                      <option>Security Reporting</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: 'var(--text-dim)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Subject</label>
                    <input 
                      type="text" 
                      className="search-input" 
                      style={{ width: '100%', maxWidth: 'none' }}
                      placeholder="e.g., Error in Voter ID Surname"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '800', color: 'var(--text-dim)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Incident Details</label>
                  <textarea 
                    className="search-input" 
                    style={{ minHeight: '160px', width: '100%', maxWidth: 'none', padding: '1.5rem', resize: 'none' }}
                    placeholder="Describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ padding: '1.25rem', justifyContent: 'center', fontSize: '1.125rem' }}>
                  {isSubmitting ? 'Encrypting & Sending...' : <><Send size={20} /> Initialize Support Ticket</>}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {complaints.map((c) => (
          <motion.div 
            key={c.id} 
            whileHover={{ y: -5 }}
            className="glass-card" 
            style={{ padding: '2rem', border: '1px solid var(--border)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <div style={{ color: 'var(--text-dim)', fontWeight: '800', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                {c.ref}
              </div>
              <span className="badge" style={{ 
                background: c.status === 'Resolved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                color: c.status === 'Resolved' ? 'var(--secondary)' : 'var(--accent)',
                fontWeight: '800',
                fontSize: '0.7rem'
              }}>
                {c.status.toUpperCase()}
              </span>
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '0.75rem' }}>{c.subject}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <Calendar size={14} /> Filed on {c.date}
            </div>
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' }}>View Detailed Log</span>
              <MessageSquare size={16} color="var(--text-dim)" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
