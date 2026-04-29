'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Calendar, MapPin, Award, ArrowRight } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';

export default function InteractiveElectionTimeline() {
  const { t } = useTranslation();

  const events = [
    { key: 'roadmap_step_1', date: 'Oct 03, 2026', icon: CheckCircle2, status: 'completed' },
    { key: 'roadmap_step_2', date: 'Oct 15, 2026', icon: Award, status: 'active' },
    { key: 'roadmap_step_3', date: 'Oct 25, 2026', icon: Clock, status: 'upcoming' },
    { key: 'roadmap_step_4', date: 'Nov 03, 2026', icon: MapPin, status: 'upcoming' },
    { key: 'roadmap_step_5', date: 'Nov 10, 2026', icon: Award, status: 'upcoming' },
  ];

  return (
    <div style={{ marginTop: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
          Election <span className="gradient-text">Roadmap</span>
        </h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.125rem' }}>{t('timeline_title')}</p>
      </div>

      <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Connection Line */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--secondary), var(--primary), var(--border))', transform: 'translateX(-50%)', opacity: 0.3 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {events.map((event, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ 
                  display: 'flex', 
                  width: '100%',
                  justifyContent: isEven ? 'flex-end' : 'flex-start',
                  position: 'relative'
                }}
              >
                {/* Center Node */}
                <div style={{ 
                  position: 'absolute', 
                  left: '50%', 
                  top: '20px', 
                  transform: 'translateX(-50%)',
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%', 
                  background: event.status === 'completed' ? 'var(--secondary)' : event.status === 'active' ? 'var(--primary)' : 'var(--surface)',
                  border: '4px solid var(--background)',
                  boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  zIndex: 2,
                  color: event.status === 'upcoming' ? 'var(--text-dim)' : 'white'
                }}>
                  <event.icon size={20} />
                </div>

                <div className="glass-card" style={{ 
                  width: '42%', 
                  padding: '2rem', 
                  border: event.status === 'active' ? '1px solid var(--primary)' : '1px solid var(--border)',
                  position: 'relative',
                  textAlign: isEven ? 'right' : 'left'
                }}>
                  <div style={{ fontSize: '0.8125rem', color: event.status === 'active' ? 'var(--primary)' : 'var(--text-dim)', fontWeight: '800', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    {event.date}
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '0.5rem' }}>{t(event.key)}</h4>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{t(`${event.key}_desc`)}</p>
                  
                  {event.status === 'active' && (
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
                      <span className="badge" style={{ background: 'var(--primary-glow)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                        LIVE STAGE
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
