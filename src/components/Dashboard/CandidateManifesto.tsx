'use client';

/**
 * @file CandidateManifesto.tsx
 * @description High-fidelity immersive directory for 2026 Electoral Candidates.
 * Features categorized visions, deep-dive modals, and interactive supporter engagement.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, BookOpen, Target, Award, X, Search, 
  ArrowRight, Download, Share2, Heart, Sparkles, 
  ChevronRight, Globe, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Swal from 'sweetalert2';

const CANDIDATES = [
  { 
    id: 1, 
    name: 'Sarah Williams', 
    party: 'Frontier Party', 
    category: 'Technology',
    vision: 'Technological Sovereignty & Education',
    details: 'Focusing on universal AI literacy, renewable energy infrastructure, and digital rights for all citizens. Proposing a "Digital Bill of Rights" and investment in quantum computing for national research.',
    color: '#38bdf8',
    image_accent: 'rgba(56, 189, 248, 0.1)'
  },
  { 
    id: 2, 
    name: 'James Miller', 
    party: 'Citizen Choice', 
    category: 'Economy',
    vision: 'Economic Equity & Healthcare',
    details: 'Implementing universal basic income trials, decentralizing healthcare access, and supporting small local businesses. Focus on reducing corporate tax loopholes to fund public infrastructure.',
    color: '#10b981',
    image_accent: 'rgba(16, 185, 129, 0.1)'
  },
  { 
    id: 3, 
    name: 'Elena Rodriguez', 
    party: 'Nature First', 
    category: 'Environment',
    vision: 'Environmental Restoration',
    details: 'Achieving net-zero by 2030, rewilding urban spaces, and implementing strict corporate environmental accountability. National solar grid expansion and high-speed rail network development.',
    color: '#fbbf24',
    image_accent: 'rgba(251, 191, 36, 0.1)'
  },
  { 
    id: 4, 
    name: 'Marcus Thorne', 
    party: 'Liberty Alliance', 
    category: 'Privacy',
    vision: 'Civil Liberties & Data Privacy',
    details: 'End to mass surveillance, implementation of decentralized identity systems, and protection of journalistic freedoms. Strengthening judicial independence and community-led policing.',
    color: '#f43f5e',
    image_accent: 'rgba(244, 63, 94, 0.1)'
  }
];

export default function CandidateManifesto() {
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { t } = useLanguage();

  const categories = ['All', 'Technology', 'Economy', 'Environment', 'Privacy'];

  const filtered = useMemo(() => {
    return CANDIDATES.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.party.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="glass-card" style={{ padding: '3rem', height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)' }}>
      {/* Header & Filter System */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Sparkles color="var(--primary)" size={24} /> Candidate Manifestos 2026
            </h2>
            <p style={{ color: 'var(--text-dim)', fontWeight: '600', fontSize: '0.9rem', marginTop: '0.5rem' }}>Review the official visions shaping our national future.</p>
          </div>

          <div className="search-wrapper" style={{ maxWidth: '350px', width: '100%' }}>
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or party..." 
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }} className="no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ 
                padding: '0.6rem 1.25rem', 
                borderRadius: '2rem', 
                border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border)',
                background: activeCategory === cat ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.02)',
                color: activeCategory === cat ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: '900',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      
      {/* Scrollable Directory */}
      <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((c) => (
            <motion.div 
              key={c.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ x: 6, background: 'rgba(255,255,255,0.03)' }}
              onClick={() => setSelected(c.id)}
              style={{ border: '1px solid var(--border)', padding: '2rem', borderRadius: '1.5rem', background: 'rgba(255,255,255,0.015)', cursor: 'pointer', transition: 'all 0.3s' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '1.25rem', background: c.image_accent, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${c.color}30` }}>
                    <User color={c.color} size={28} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '900' }}>{c.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: c.color, fontWeight: '900', letterSpacing: '0.05em' }}>{c.party.toUpperCase()}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontWeight: '800', fontSize: '0.7rem' }}>
                   DETAILS <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <Search size={32} color="var(--text-dim)" />
            </div>
            <p style={{ color: 'var(--text-dim)', fontWeight: '700' }}>No candidates match your criteria.</p>
          </div>
        )}
      </div>

      {/* Immersive Deep-Dive Modal */}
      <AnimatePresence>
        {selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(16px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} style={{ position: 'absolute', inset: 0 }} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="glass-card"
              style={{ maxWidth: '800px', width: '100%', position: 'relative', border: `1px solid ${CANDIDATES.find(c => c.id === selected)?.color}`, padding: '4rem', boxShadow: `0 30px 100px ${CANDIDATES.find(c => c.id === selected)?.color}20` }}
            >
              <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '2.5rem', right: '2.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.75rem', borderRadius: '50%', color: 'white', cursor: 'pointer' }}>
                <X size={24} />
              </button>
              
              <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
                <div style={{ width: '120px', height: '120px', background: CANDIDATES.find(c => c.id === selected)?.image_accent, borderRadius: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${CANDIDATES.find(c => c.id === selected)?.color}` }}>
                  <User color={CANDIDATES.find(c => c.id === selected)?.color} size={60} />
                </div>
                <div>
                  <h3 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-0.04em' }}>{CANDIDATES.find(c => c.id === selected)?.name}</h3>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ color: CANDIDATES.find(c => c.id === selected)?.color, fontWeight: '900', letterSpacing: '0.1em' }}>{CANDIDATES.find(c => c.id === selected)?.party.toUpperCase()}</span>
                    <div className="badge" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>{CANDIDATES.find(c => c.id === selected)?.category}</div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '2rem', border: '1px solid var(--border)', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                  <Globe size={20} />
                  <span style={{ fontWeight: '900', fontSize: '0.7rem', letterSpacing: '0.2em' }}>MISSION STATEMENT 2026</span>
                </div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>{CANDIDATES.find(c => c.id === selected)?.vision}</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.15rem' }}>
                  {CANDIDATES.find(c => c.id === selected)?.details}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <button 
                  onClick={() => {
                    Swal.fire({
                      title: 'Support Registered!',
                      text: `You have joined the ${CANDIDATES.find(c => c.id === selected)?.party} support group.`,
                      icon: 'success',
                      background: 'var(--surface)',
                      color: 'var(--text)',
                      confirmButtonColor: 'var(--secondary)'
                    });
                  }}
                  className="btn-primary" 
                  style={{ padding: '1.25rem', fontSize: '1rem', fontWeight: '900' }}
                >
                  <Heart size={18} /> Support Vision
                </button>
                <button 
                  onClick={() => Swal.fire({ title: 'Downloading...', text: 'Establishing secure link...', icon: 'info' })}
                  className="btn-ghost" 
                  style={{ padding: '1.25rem', fontWeight: '900' }}
                >
                  <Download size={18} /> Manifesto PDF
                </button>
                <button 
                  onClick={() => Swal.fire({ title: 'Share Link', text: 'https://voterconnect.gov/manifesto/2026', icon: 'success' })}
                  className="btn-ghost" 
                  style={{ padding: '1.25rem', fontWeight: '900' }}
                >
                  <Share2 size={18} /> Share
                </button>
              </div>
              
              <div style={{ marginTop: '2.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '800' }}>
                 <ShieldCheck size={16} /> VERIFIED BY ELECTORAL COMMISSION
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
