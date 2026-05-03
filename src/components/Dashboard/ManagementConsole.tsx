'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Activity, Lock, AlertTriangle, CheckCircle, Search, Filter, Download, MoreHorizontal, UserPlus, Server } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';
import Swal from 'sweetalert2';

const VOTER_LOGS = [
  { id: 1, name: 'Alice Smith', action: 'Identity Verified', time: '10:45 AM', status: 'secure', node: 'Node-77' },
  { id: 2, name: 'Bob Johnson', action: 'Vote Cast', time: '11:02 AM', status: 'secure', node: 'Node-12' },
  { id: 3, name: 'Charlie Brown', action: 'Manifesto Download', time: '11:15 AM', status: 'flagged', node: 'Node-89' },
  { id: 4, name: 'Diana Prince', action: 'New Registration', time: '11:30 AM', status: 'secure', node: 'Node-45' },
];

export default function ManagementConsole() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const stats = [
    { label: 'Active Sessions', value: '14,202', icon: Activity, color: '#38bdf8' },
    { label: 'Network Health', value: '99.9%', icon: Server, color: '#10b981' },
    { label: 'Encrypted Vaults', value: '8.4M', icon: Lock, color: '#f59e0b' },
    { label: 'Verified Voters', value: '1.2M', icon: CheckCircle, color: '#8b5cf6' },
  ];

  const filteredLogs = useMemo(() => {
    return VOTER_LOGS.filter(log => 
      (log.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       log.action.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeFilter === 'all' || log.status === activeFilter)
    );
  }, [searchQuery, activeFilter]);

  return (
    <div className="animate-slide-in">
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{t('nav_management')}</h2>
        <p style={{ color: 'var(--text-dim)', fontWeight: '600' }}>Administrative control center for electoral integrity and system monitoring.</p>
      </div>

      <div className="grid-main" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="glass-card" 
            style={{ padding: '2rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '1rem', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${stat.color}40` }}>
              <stat.icon color={stat.color} size={28} />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900' }}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid var(--primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Users color="var(--primary)" size={24} /> Voter Activity Logs
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flex: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <div className="search-wrapper" style={{ minWidth: '240px' }}>
              <Search className="search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Search logs..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => {
                Swal.fire({
                  title: 'Preparing Data Export',
                  text: 'Fetching activity logs from secure nodes...',
                  timer: 1500,
                  showConfirmButton: false,
                  didOpen: () => { Swal.showLoading(); }
                }).then(() => {
                  Swal.fire({ title: 'Export Ready!', text: 'Voter_Activity_May_2026.csv has been generated.', icon: 'success' });
                });
              }}
              className="btn-ghost" 
              style={{ padding: '0.75rem 1.25rem' }}
            >
              <Download size={18} /> Export CSV
            </button>
          </div>
        </div>

        <div className="no-scrollbar" style={{ overflowX: 'auto' }}>
          <table 
            role="table" 
            aria-label="Voter Activity Logs" 
            style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}
          >
            <thead role="rowgroup">
              <tr role="row" style={{ borderBottom: '1px solid var(--border)' }}>
                {['User', 'Action', 'Time', 'Node ID', 'Security Status', ''].map(h => (
                  <th 
                    key={h} 
                    role="columnheader" 
                    style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup">
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  role="row" 
                  style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}
                >
                  <td role="cell" style={{ padding: '1.25rem', fontWeight: '800' }}>{log.name}</td>
                  <td role="cell" style={{ padding: '1.25rem', color: 'var(--text-muted)' }}>{log.action}</td>
                  <td role="cell" style={{ padding: '1.25rem', color: 'var(--text-muted)' }}>{log.time}</td>
                  <td role="cell" style={{ padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--primary)' }}>{log.node}</td>
                  <td role="cell" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: log.status === 'secure' ? 'var(--secondary)' : '#ef4444' }} />
                      <span style={{ fontSize: '0.7rem', fontWeight: '900', color: log.status === 'secure' ? 'var(--secondary)' : '#ef4444', letterSpacing: '0.05em' }}>
                        {log.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td role="cell" style={{ padding: '1.25rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => {
                        Swal.fire({
                          title: `Audit Trace: ${log.name}`,
                          html: `<div style="text-align:left; font-size:0.9rem; line-height:2">
                            <p><b>Event:</b> ${log.action}</p>
                            <p><b>Timestamp:</b> 2026-05-03 ${log.time}</p>
                            <p><b>Node:</b> ${log.node}</p>
                            <p><b>Chain Position:</b> Block #882-${log.id}</p>
                          </div>`,
                          icon: 'info',
                          confirmButtonText: 'Export Audit Trace',
                          confirmButtonColor: 'var(--primary)',
                          showCancelButton: true,
                          cancelButtonText: 'Flag for Review'
                        }).then((res) => {
                          if (res.isConfirmed) Swal.fire('Exporting...', 'Audit trace saved to disk', 'success');
                          else if (res.dismiss === Swal.DismissReason.cancel) Swal.fire('Flagged', 'Security team notified', 'warning');
                        });
                      }}
                      className="btn-ghost"
                      aria-label={`View audit trace for ${log.name}`}
                      style={{ padding: '0.5rem', borderRadius: '0.5rem', minWidth: 'auto' }}
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLogs.length === 0 && <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>No matching logs found.</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Shield color="var(--accent)" size={20} /> Integrity Audit
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'Blockchain Consistency', status: 'Verified', time: '2m ago' },
              { label: 'EVM Zero-Knowledge Proof', status: 'Verified', time: '15m ago' },
              { label: 'Duplicate Entry Check', status: 'Processing', time: 'Now' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem' }}>
                <div>
                  <p style={{ fontWeight: '800', marginBottom: '0.25rem' }}>{item.label}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Last check: {item.time}</p>
                </div>
                <div style={{ color: item.status === 'Verified' ? 'var(--secondary)' : 'var(--primary)', fontWeight: '900', fontSize: '0.85rem' }}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => {
              Swal.fire({
                title: 'Global Integrity Audit',
                text: 'Commencing full system cross-check across all 142 nodes. This may take a moment.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Begin Audit',
                confirmButtonColor: 'var(--primary)'
              }).then((res) => {
                if (res.isConfirmed) {
                  let timerInterval: any;
                  Swal.fire({
                    title: 'Auditing Network...',
                    html: 'Analyzing blockchain consistency: <b></b>%',
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                      Swal.showLoading();
                      const b = Swal.getHtmlContainer()?.querySelector('b');
                      timerInterval = setInterval(() => {
                        if (b) b.textContent = (Swal.getTimerLeft() ? Math.floor((3000 - (Swal.getTimerLeft() || 0)) / 30) : 100).toString();
                      }, 100);
                    },
                    willClose: () => { clearInterval(timerInterval); }
                  }).then(() => {
                    Swal.fire('Audit Complete', 'No discrepancies found. Network state is 100% consistent.', 'success');
                  });
                }
              });
            }}
            className="btn-primary" 
            style={{ width: '100%', marginTop: '2.5rem', padding: '1rem' }}
          >
            Initialize Full Audit
          </button>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle color="#ef4444" size={20} /> Threat Detection
          </h3>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle size={32} color="var(--secondary)" />
            </div>
            <h4 style={{ fontWeight: '900', marginBottom: '0.5rem' }}>System Secure</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No active threats or unauthorized access attempts detected in the last 24 hours.</p>
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '1rem', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
            <p style={{ fontSize: '0.8125rem', color: '#ef4444', fontWeight: '700' }}>Intrusion Detection System (IDS) is active and monitoring all nodes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
