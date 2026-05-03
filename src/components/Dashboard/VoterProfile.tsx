'use client';

/**
 * @file VoterProfile.tsx
 * @description The main overview dashboard for citizens. 
 * Features identity management, readiness tracking, and real-time blockchain monitoring.
 */

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import useTranslation from '@/hooks/useTranslation';
import Swal from 'sweetalert2';
import { 
  CheckCircle, Zap, Download, QrCode, Activity, Radio, 
  Globe, Server, Shield, MapPin, ExternalLink, 
  FileText, Lock, Cpu, Fingerprint, Calendar, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic imports for sub-components
const TurnoutAnalytics = dynamic(() => import('./TurnoutAnalytics'), { ssr: false });
const LiveElectionResults = dynamic(() => import('./LiveElectionResults'), { ssr: false });
const CandidateManifesto = dynamic(() => import('./CandidateManifesto'), { ssr: false });
const VoterResources = dynamic(() => import('./VoterResources'), { ssr: false });

interface LedgerEntry {
  id: string;
  hash: string;
  time: string;
  type: 'BALLOT_RECORD' | 'NODE_SYNC';
}

const OFFICIAL_RESOURCES = [
  { 
    title: 'National Voter Portal', 
    desc: 'Manage official registration data and verify enrollment status.', 
    link: 'voterportal.gov.in',
    url: 'https://www.nvsp.in/'
  },
  { 
    title: 'Election Commission Guidelines', 
    desc: 'Read the official 2026 conduct rules and citizen responsibilities.', 
    link: 'eci.gov.in/guidelines',
    url: 'https://eci.gov.in/'
  },
];

export default function VoterProfile() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDownloading, setIsDownloading] = useState(false);
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const ledgerInterval = setInterval(() => {
      const newEntry: LedgerEntry = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        hash: '0x' + Math.random().toString(16).substr(2, 40),
        time: new Date().toLocaleTimeString(),
        type: Math.random() > 0.5 ? 'BALLOT_RECORD' : 'NODE_SYNC'
      };
      setLedgerEntries(prev => [newEntry, ...prev].slice(0, 4));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(ledgerInterval);
    };
  }, []);

  const handleExportID = async () => {
    setIsDownloading(true);
    await Swal.fire({ 
      title: 'Exporting Identity...', 
      text: 'Establishing secure tunnel and signing package', 
      timer: 1500, 
      showConfirmButton: false, 
      didOpen: () => Swal.showLoading() 
    });
    await Swal.fire({ title: 'Export Successful', text: 'Voter ID saved securely.', icon: 'success' });
    setIsDownloading(false);
  };

  return (
    <div className="animate-slide-in" style={{ paddingBottom: '5rem' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', background: 'rgba(56, 189, 248, 0.03)', padding: '1.25rem 2.5rem', borderRadius: '1.5rem', border: '1px solid rgba(56, 189, 248, 0.1)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="live-dot" />
            <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--secondary)' }}>SYSTEM OPERATIONAL</span>
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Globe size={14} color="var(--primary)" /> ASIA-SOUTH-1
          </div>
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Calendar size={16} color="var(--primary)" /> {currentTime.toLocaleDateString().toUpperCase()}
        </div>
      </div>

      <div className="bento-grid">
        {/* Row 1: ID Card & Readiness */}
        <div className="bento-item-large">
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card" 
            style={{ padding: '4rem', background: 'linear-gradient(145deg, #0f172a, #020617)', border: '1px solid var(--primary)', position: 'relative', overflow: 'hidden', height: '100%' }}
          >
            <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 2, flexWrap: 'wrap' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '2rem', boxShadow: '0 30px 60px rgba(56, 189, 248, 0.2)' }}>
                <QrCode size={120} color="#020617" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(56, 189, 248, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--primary)', marginBottom: '1.5rem' }}>
                  <Shield size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '0.15em' }}>DIGITAL ID</span>
                </div>
                <h3 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem' }}>{user?.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontWeight: '700', marginBottom: '2.5rem' }}>{user?.region} • Verified Citizen</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={handleExportID} className="btn-primary" style={{ padding: '1rem 2rem' }}><Download size={18}/> Export ID</button>
                  <button onClick={() => Swal.fire('Accessing Portal...', 'Loading secure link', 'info')} className="btn-ghost" style={{ padding: '1rem 2rem' }}><FileText size={18}/> Guidelines</button>
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.1 }} />
          </motion.div>
        </div>

        <div className="bento-item-small">
          <div className="glass-card" style={{ padding: '3rem', border: '1px solid var(--border)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Fingerprint size={24} color="var(--accent)" /> Identity Readiness
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
              {[
                { label: 'Cloud Identity Link', status: true },
                { label: 'Blockchain ID Linked', status: true },
                { label: 'Biometric Handshake', status: false },
                { label: 'Manifesto Review', status: true },
                { label: 'Educational Badge', status: false }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: item.status ? 'var(--secondary)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.status && <CheckCircle size={12} color="#020617" />}
                  </div>
                  <span style={{ fontWeight: '700', color: item.status ? 'var(--text)' : 'var(--text-dim)', fontSize: '0.9rem' }}>{item.label}</span>
                </div>
              ))}
            </div>
            <button onClick={() => Swal.fire('Initializing Onboarding', 'Checking secure channel...', 'info')} style={{ width: '100%', marginTop: '2rem', background: 'var(--primary-glow)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '1rem', borderRadius: '1rem', fontWeight: '900', cursor: 'pointer' }}>
               COMPLETE PROFILE →
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Analytics & Intel */}
      <div className="bento-grid" style={{ marginTop: '2.5rem' }}>
        <div className="bento-item-small">
          <TurnoutAnalytics />
        </div>
        <div className="bento-item-large">
          <div className="glass-card" style={{ padding: '3rem', border: '1px solid var(--border)', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Radio size={24} color="var(--primary)" className="animate-pulse" /> Secure Intel Feed
              </h3>
              <div className="badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)', border: 'none' }}>LIVE</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
               {[
                 { title: 'Node-South-4 Sync', desc: 'Ballot packet #88219 verified and sealed.', time: '12m ago' },
                 { title: 'Security Pass', desc: 'Network-wide consistency check: 100%.', time: '45m ago' },
                 { title: 'Protocol v5.1', desc: 'Master branch synchronization successful.', time: '2h ago' }
               ].map((item, i) => (
                 <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.25rem', border: '1px solid var(--border)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                     <h5 style={{ fontWeight: '900', fontSize: '0.9rem' }}>{item.title}</h5>
                     <span style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--primary)' }}>{item.time}</span>
                   </div>
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: '1.4' }}>{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Results & Manifestos */}
      <div className="responsive-split-grid" style={{ marginTop: '2.5rem' }}>
        <LiveElectionResults />
        <CandidateManifesto />
      </div>

      {/* Official Resources */}
      <div className="glass-card" style={{ padding: '3rem', marginTop: '2.5rem', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ExternalLink size={24} color="var(--primary)" /> Government Portals
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
           {OFFICIAL_RESOURCES.map((res, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -5, background: 'rgba(56, 189, 248, 0.03)' }}
               onClick={() => {
                 Swal.fire({
                   title: 'External Access',
                   text: `Redirecting to ${res.link}...`,
                   icon: 'info',
                   showCancelButton: true
                 }).then(result => { if (result.isConfirmed) window.open(res.url, '_blank'); });
               }}
               style={{ padding: '2rem', background: 'rgba(255,255,255,0.01)', borderRadius: '1.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}
             >
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                 <h4 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{res.title}</h4>
                 <ExternalLink size={18} color="var(--primary)" />
               </div>
               <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{res.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <VoterResources />
      </div>
    </div>
  );
}
