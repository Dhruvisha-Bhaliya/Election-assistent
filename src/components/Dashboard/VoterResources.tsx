'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, BookOpen, Info, Globe, Shield, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Swal from 'sweetalert2';

export default function VoterResources() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqs = [
    { q: 'How do I update my address?', a: 'You can update your address through the "Profile Settings" or by filing a correction complaint in the Redressal section.' },
    { q: 'What IDs are valid for voting?', a: 'Digital Voter ID, Passport, Driver License, or any National Identity Card with a photograph.' },
    { q: 'Can I vote from abroad?', a: 'Yes, registered overseas voters can use the Digital Secure Booth from their verified region during the election window.' }
  ];

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <BookOpen color="var(--primary)" size={20} /> Educational Resources & FAQ
      </h2>
      
      <div className="bento-grid" style={{ display: 'grid', gap: '2rem' }}>
        <div className="bento-item-large" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card" style={{ padding: '0.5rem', border: '1px solid var(--border)' }}>
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-label={`Toggle FAQ: ${faq.q}`}
                aria-expanded={openFaq === i}
                style={{ width: '100%', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontWeight: '800', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <HelpCircle size={18} color="var(--primary)" /> {faq.q}
                </span>
                <ChevronDown size={18} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ padding: '0 1.5rem 1.5rem 3.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="glass-card bento-item-small" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
          <h4 style={{ fontWeight: '900', fontSize: '1.1rem', color: 'var(--text)' }}>Official Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Constitutional Rights', icon: Shield, url: 'law.gov/rights' },
              { label: 'Global Election Watch', icon: Globe, url: 'elections.org/global' },
              { label: 'Verify Electoral Roll', icon: Info, url: 'voterlist.gov/verify' }
            ].map((link, i) => (
              <button 
                key={i} 
                onClick={() => {
                  Swal.fire({
                    title: 'Secure External Link',
                    text: `Redirecting to ${link.url}. Your session remains encrypted.`,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Continue to Portal'
                  }).then((res) => {
                    if (res.isConfirmed) {
                      const urls: {[key: string]: string} = {
                        'Constitutional Rights': 'https://legislative.gov.in/constitution-of-india/',
                        'Global Election Watch': 'https://www.idea.int/',
                        'Verify Electoral Roll': 'https://voters.eci.gov.in/'
                      };
                      window.open(urls[link.label] || 'https://voters.eci.gov.in/', '_blank');
                      Swal.fire({ title: 'Redirecting...', text: 'Connecting to official gateway', icon: 'success', timer: 1500, showConfirmButton: false });
                    }
                  });
                }}
                className="btn-ghost" 
                aria-label={`Link to ${link.label}`} 
                style={{ justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', width: '100%' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <link.icon size={18} color="var(--primary)" /> {link.label}
                </div>
                <ExternalLink size={14} color="var(--text-dim)" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
