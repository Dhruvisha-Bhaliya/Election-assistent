'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/components/LandingPage';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';

export default function Home() {
  const { user, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [voterCount, setVoterCount] = useState(24500120);

  useEffect(() => {
    const interval = setInterval(() => {
      setVoterCount(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
        <div className="loader" />
      </div>
    );
  }

  if (user) {
    return <DashboardLayout />;
  }

  return (
    <LandingPage 
      authMode={authMode} 
      setAuthMode={setAuthMode} 
      voterCount={voterCount} 
    />
  );
}
