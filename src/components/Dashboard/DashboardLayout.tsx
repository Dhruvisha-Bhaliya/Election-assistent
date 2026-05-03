'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Swal from 'sweetalert2';
import { 
  Vote, LogOut, Menu, X, Shield, Map, BarChart3, MessageSquare, Search, Bell, UserCircle, BookOpen, Settings, ChevronLeft, ChevronRight,
  CheckCircle, Activity, GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BlockchainPulse from './BlockchainPulse';

const VoterProfile = dynamic(() => import('@/components/Dashboard/VoterProfile'), { ssr: false });
const Assistant = dynamic(() => import('@/components/Assistant'), { ssr: false });
const ElectionRoadmap = dynamic(() => import('@/components/ElectionRoadmap'), { ssr: false });
const LiveVoting = dynamic(() => import('@/components/LiveVoting'), { ssr: false });
const VoterEducation = dynamic(() => import('@/components/Dashboard/VoterEducation'), { ssr: false });
const ManagementConsole = dynamic(() => import('@/components/Dashboard/ManagementConsole'), { ssr: false });

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // For desktop
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  if (!user) return null;

  const [notifications, setNotifications] = useState<any[]>([]);

  // Listen for real-time notifications from other modules + Heartbeat
  useEffect(() => {
    const handleNewNotification = (e: any) => {
      const newNotif = {
        id: Date.now(),
        ...e.detail,
        time: 'Just now',
        unread: true
      };
      setNotifications(prev => [newNotif, ...prev]);
      
      Swal.fire({
        title: newNotif.title,
        text: newNotif.desc,
        icon: 'info',
        toast: true,
        position: 'top-end',
        timer: 4000,
        showConfirmButton: false,
        background: 'var(--surface)',
        color: 'var(--text)',
        timerProgressBar: true,
      });
    };

    // Simulate real-time "System Heartbeat" notifications every 45 seconds
    const heartbeat = setInterval(() => {
      const events = [
        { title: 'Node Synced', desc: 'Regional Node #42 is now in sync with the main chain.', icon: Activity, color: 'var(--secondary)' },
        { title: 'Integrity Check', desc: 'Scheduled security audit passed with 0 vulnerabilities.', icon: Shield, color: 'var(--primary)' },
        { title: 'New Block Validated', desc: 'Block #99210 has been successfully mined and verified.', icon: CheckCircle, color: 'var(--accent)' }
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      handleNewNotification({ detail: randomEvent });
    }, 45000);

    window.addEventListener('voter-notification', handleNewNotification);
    return () => {
      window.removeEventListener('voter-notification', handleNewNotification);
      clearInterval(heartbeat);
    };
  }, []);

  const NAV_ITEMS = [
    { id: 'overview', label: t('nav_overview'), icon: BarChart3 },
    { id: 'ballot', label: t('nav_ballot'), icon: Shield },
    { id: 'education', label: t('nav_education'), icon: BookOpen },
    { id: 'roadmap', label: t('nav_roadmap'), icon: Map },
    { id: 'management', label: t('nav_management'), icon: Settings },
    { id: 'assistant', label: t('nav_assistant'), icon: MessageSquare },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    if (query.includes('vote') || query.includes('ballot') || query.includes('cast') || query.includes('evm')) setActiveTab('ballot');
    else if (query.includes('learn') || query.includes('quiz') || query.includes('edu') || query.includes('study')) setActiveTab('education');
    else if (query.includes('map') || query.includes('date') || query.includes('when') || query.includes('schedule')) setActiveTab('roadmap');
    else if (query.includes('help') || query.includes('ask') || query.includes('chat') || query.includes('ai')) setActiveTab('assistant');
    else if (query.includes('manage') || query.includes('admin') || query.includes('system') || query.includes('log')) setActiveTab('management');
    else setActiveTab('overview');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90 }}
            className="mobile-only"
          />
        )}
      </AnimatePresence>

      <aside 
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`} 
        style={{ width: isCollapsed ? '80px' : '280px', transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
        aria-label="Main Sidebar"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden' }}>
            <div style={{ minWidth: '40px', width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Vote size={24} color="#020617" />
            </div>
            {!isCollapsed && (
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ fontWeight: '900', fontSize: '1.25rem', whiteSpace: 'nowrap' }}>
                VoterConnect
              </motion.span>
            )}
          </div>
          
          <button 
            className="desktop-only" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '4px', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <button className="mobile-only" onClick={() => setIsSidebarOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)' }} aria-label="Close Sidebar">
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`} 
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              aria-label={`Go to ${item.label}`}
              style={{ 
                background: 'transparent', border: 'none', width: '100%', textAlign: 'left', 
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', 
                borderRadius: '0.75rem', cursor: 'pointer', color: 'inherit', fontWeight: 'inherit',
                justifyContent: isCollapsed ? 'center' : 'flex-start'
              }}
            >
              <item.icon size={22} style={{ flexShrink: 0 }} /> 
              {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{item.label}</motion.span>}
            </button>
          ))}
        </nav>

        <nav style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <button 
            className="nav-item" 
            onClick={logout} 
            style={{ 
              color: 'var(--danger)', background: 'transparent', border: 'none', width: '100%', 
              textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem', 
              padding: '0.875rem', borderRadius: '0.75rem', cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }} 
            aria-label="Sign Out"
          >
            <LogOut size={22} style={{ flexShrink: 0 }} /> 
            {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t('sign_out')}</motion.span>}
          </button>
        </nav>
      </aside>

      <main className="main-content" style={{ marginLeft: isCollapsed ? '80px' : '280px', transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', position: 'relative', zIndex: 50, gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
            <button className="mobile-only" onClick={() => setIsSidebarOpen(true)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--text)' }} aria-label="Open Sidebar">
              <Menu size={24} />
            </button>
            <div className="desktop-only"><BlockchainPulse /></div>
            <form onSubmit={handleSearch} className="search-wrapper desktop-only" style={{ maxWidth: '400px', width: '100%' }}>
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder={t('search_placeholder')} 
                className="search-input" 
                aria-label="Search Dashboard" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="desktop-only"><LanguageSwitcher /></div>
            
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative', padding: '8px' }} 
                aria-label="View Notifications"
              >
                <Bell size={24} color={showNotifications ? 'var(--primary)' : 'var(--text-dim)'} />
                {notifications.some(n => n.unread) && (
                  <div style={{ position: 'absolute', top: '5px', right: '5px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--background)' }} />
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="glass-card"
                    style={{ position: 'absolute', top: '100%', right: 0, width: '320px', marginTop: '1rem', padding: 0, zIndex: 100, border: '1px solid var(--primary)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                  >
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(56, 189, 248, 0.03)' }}>
                      <span style={{ fontWeight: '900', fontSize: '0.8rem', letterSpacing: '0.05em' }}>NOTIFICATIONS</span>
                      {notifications.length > 0 && <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: '900' }}>{notifications.filter(n => n.unread).length} NEW</span>}
                    </div>
                    
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }} className="no-scrollbar">
                      {notifications.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: '600' }}>
                           No new notifications
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div 
                            key={n.id} 
                            onClick={(e) => {
                              e.stopPropagation();
                              Swal.fire({
                                title: n.title,
                                text: n.desc,
                                icon: 'info',
                                background: 'var(--surface)',
                                color: 'var(--text)',
                                confirmButtonColor: 'var(--primary)'
                              });
                            }}
                            style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.2s', background: n.unread ? 'rgba(56, 189, 248, 0.02)' : 'transparent' }} 
                            className="table-row-hover"
                          >
                            <div style={{ display: 'flex', gap: '1rem' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${n.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <n.icon size={16} color={n.color} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                   <div style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '0.2rem' }}>{n.title}</div>
                                   <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: '700' }}>{n.time.toUpperCase()}</span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>{n.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {notifications.length > 0 && (
                      <button 
                        onClick={() => {
                          setNotifications([]);
                          setTimeout(() => setShowNotifications(false), 300);
                        }}
                        style={{ width: '100%', padding: '0.875rem', background: 'rgba(56, 189, 248, 0.05)', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '900', cursor: 'pointer', borderTop: '1px solid var(--border)' }}
                      >
                        MARK ALL AS READ
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              role="status"
              aria-live="polite"
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '1rem', border: '1px solid var(--border)' }}
            >
              <div className="desktop-only" style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '800' }}>{user.name}</div>
                <div className="live-indicator">Online</div>
              </div>
              <UserCircle size={32} color="var(--primary)" aria-hidden="true" />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ minHeight: 'calc(100vh - 200px)' }}
          >
            {activeTab === 'overview' && <VoterProfile />}
            {activeTab === 'ballot' && <LiveVoting />}
            {activeTab === 'education' && <VoterEducation />}
            {activeTab === 'roadmap' && <ElectionRoadmap />}
            {activeTab === 'management' && <ManagementConsole />}
            {activeTab === 'assistant' && (
              <div style={{ height: '75vh', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <Assistant mode="inline" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
