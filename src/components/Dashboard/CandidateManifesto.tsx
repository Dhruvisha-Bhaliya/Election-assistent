'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Target, Award, X, Search, Filter, ArrowRight, Download, Share2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const candidates = [
  { 
    id: 1, 
    name: 'Sarah Williams', 
    party: 'Frontier Party', 
    category: 'Technology',
    vision: 'Technological Sovereignty & Education',
    details: 'Focusing on universal AI literacy, renewable energy infrastructure, and digital rights for all citizens. Proposing a "Digital Bill of Rights" and investment in quantum computing for national research.',
    color: '#38bdf8'
  },
  { 
    id: 2, 
    name: 'James Miller', 
    party: 'Citizen Choice', 
    category: 'Economy',
    vision: 'Economic Equity & Healthcare',
    details: 'Implementing universal basic income trials, decentralizing healthcare access, and supporting small local businesses. Focus on reducing corporate tax loopholes to fund public infrastructure.',
    color: '#10b981'
  },
  { 
    id: 3, 
    name: 'Elena Rodriguez', 
    party: 'Nature First', 
    category: 'Environment',
    vision: 'Environmental Restoration',
    details: 'Achieving net-zero by 2030, rewilding urban spaces, and implementing strict corporate environmental accountability. National solar grid expansion and high-speed rail network development.',
    color: '#f59e0b'
  },
  { 
    id: 4, 
    name: 'Marcus Thorne', 
    party: 'Liberty Alliance', 
    category: 'Privacy',
    vision: 'Civil Liberties & Data Privacy',
    details: 'End to mass surveillance, implementation of decentralized identity systems, and protection of journalistic freedoms. Strengthening judicial independence and community-led policing.',
    color: '#f43f5e'
  }
];

export default function CandidateManifesto() {
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { t } = useLanguage();

  const categories = ['All', 'Technology', 'Economy', 'Environment', 'Privacy'];

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.party.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="glass-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <User color="var(--primary)" size={20} /> {t('manifesto_title')}
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
          <div className="search-wrapper" style={{ minWidth: '200px', maxWidth: '300px' }}>
            <Search className="search-icon" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '0.5rem 1rem 0.5rem 2.5rem' }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }} className="no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '0.75rem', 
              border: '1px solid var(--border)',
              background: activeCategory === cat ? 'var(--primary-glow)' : 'rgba(255,255,255,0.02)',
              color: activeCategory === cat ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: '800',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem', maxHeight: '500px' }}>
        {filteredCandidates.map((c) => (
          <motion.div 
            key={c.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ x: 4, background: 'rgba(255,255,255,0.05)' }}
            style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => setSelected(c.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: `${c.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${c.color}40` }}>
                  <Target color={c.color} size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '900' }}>{c.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: c.color, fontWeight: '800', textTransform: 'uppercase' }}>{c.party}</p>
                </div>
              </div>
              <div className="badge" style={{ color: 'var(--text-dim)', border: '1px solid var(--border)' }}>{c.category}</div>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>{c.vision}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '800', fontSize: '0.75rem' }}>
              READ FULL VISION <ArrowRight size={14} />
            </div>
          </motion.div>
        ))}
        {filteredCandidates.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
            <Search size={32} style={{ marginBottom: '1rem', opacity: 0.2, margin: '0 auto' }} />
            <p style={{ fontSize: '0.85rem' }}>No candidates found.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(12px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} style={{ position: 'absolute', inset: 0 }} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card"
              style={{ maxWidth: '700px', width: '100%', position: 'relative', border: '1px solid var(--primary)', padding: '3.5rem' }}
            >
              <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={28} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
                <div style={{ width: '80px', height: '80px', background: `${candidates.find(c => c.id === selected)?.color}15`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${candidates.find(c => c.id === selected)?.color}40` }}>
                  <User color={candidates.find(c => c.id === selected)?.color} size={40} />
                </div>
                <div>
                  <h3 style={{ fontSize: '2rem', fontWeight: '900' }}>{candidates.find(c => c.id === selected)?.name}</h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <p style={{ color: 'var(--primary)', fontWeight: '800' }}>{candidates.find(c => c.id === selected)?.party}</p>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border)' }} />
                    <p style={{ color: 'var(--text-dim)', fontWeight: '600' }}>{candidates.find(c => c.id === selected)?.category}</p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--border)', marginBottom: '2.5rem' }}>
                <h4 style={{ fontWeight: '900', marginBottom: '1rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <BookOpen size={20} color="var(--primary)" /> Proposal Highlights
                </h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.125rem' }}>
                  {candidates.find(c => c.id === selected)?.details}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <button className="btn-primary" style={{ flex: 1 }}>Support Now</button>
                <button className="btn-ghost" style={{ flex: 1 }}><Download size={18} /> Manifesto</button>
                <button className="btn-ghost" style={{ flex: 1 }}><Share2 size={18} /> Share</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
