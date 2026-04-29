'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, MapPin, UserCheck, Vote, ArrowRight } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';

export default function ElectionRoadmap() {
  const { t } = useTranslation();

  const steps = [
    { id: 1, title: t('roadmap_step_1'), desc: t('roadmap_step_1_desc'), icon: UserCheck, status: 'completed', date: 'Oct 2025' },
    { id: 2, title: t('roadmap_step_2'), desc: t('roadmap_step_2_desc'), icon: Clock, status: 'active', date: 'Jan 2026' },
    { id: 3, title: t('roadmap_step_3'), desc: t('roadmap_step_3_desc'), icon: MapPin, status: 'upcoming', date: 'Mar 2026' },
    { id: 4, title: t('roadmap_step_4'), desc: t('roadmap_step_4_desc'), icon: Vote, status: 'upcoming', date: 'May 2026' },
    { id: 5, title: t('roadmap_step_5'), desc: t('roadmap_step_5_desc'), icon: CheckCircle2, status: 'upcoming', date: 'Jun 2026' }
  ];

  return (
    <section style={{ padding: '40px 0' }}>
      <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
        {/* Connection Line */}
        <div style={{ 
          position: 'absolute', left: '28px', top: '20px', bottom: '20px', width: '3px', 
          background: 'linear-gradient(to bottom, var(--secondary), var(--primary), var(--border))', 
          zIndex: 0, opacity: 0.3 
        }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {steps.map((step, i) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              style={{ display: 'flex', gap: '2.5rem', position: 'relative', zIndex: 1 }}
            >
              <div style={{ position: 'relative' }}>
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '18px', 
                  background: step.status === 'completed' ? 'var(--secondary)' : step.status === 'active' ? 'var(--primary)' : 'var(--surface)',
                  border: `2px solid ${step.status === 'active' ? 'var(--primary)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  color: step.status === 'completed' || step.status === 'active' ? 'white' : 'var(--text-dim)',
                  boxShadow: step.status === 'active' ? '0 0 20px var(--primary-glow)' : 'none',
                  position: 'relative', zIndex: 2
                }}>
                  <step.icon size={28} />
                </div>
                {step.status === 'active' && (
                  <motion.div 
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', inset: 0, background: 'var(--primary)', borderRadius: '18px', zIndex: 1 }}
                  />
                )}
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.02, x: 5 }}
                className="glass-card" 
                style={{ 
                  padding: '2rem', flex: 1, 
                  border: step.status === 'active' ? '1px solid var(--primary)' : '1px solid var(--border)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-dim)', fontSize: '0.875rem', fontWeight: '700' }}>
                  {step.date}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.375rem', fontWeight: '800', letterSpacing: '-0.02em' }}>{step.title}</h3>
                  {step.status === 'completed' && <div className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>Completed</div>}
                  {step.status === 'active' && <div className="badge badge-indigo" style={{ background: 'var(--primary)', color: 'white' }}>Current Phase</div>}
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', maxWidth: '500px' }}>{step.desc}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9375rem' }}>
                  Learn details <ArrowRight size={16} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
