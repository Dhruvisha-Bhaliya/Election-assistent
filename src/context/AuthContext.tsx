'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  region: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, name: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
  voterCount: number;
  incrementVoterCount: () => void;
  voteTallies: Record<number, number>;
  recordVote: (candidateId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialTallies = { 1: 4205, 2: 3890, 3: 4112 };

const regions = ['Bengaluru North', 'Mumbai South', 'Delhi Central', 'Hyderabad East', 'Chennai West'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [voterCount, setVoterCount] = useState(24500000);
  const [voteTallies, setVoteTallies] = useState<Record<number, number>>(initialTallies);

  useEffect(() => {
    const saved = localStorage.getItem('civic_user');
    if (saved) setUser(JSON.parse(saved));
    setIsLoading(false);

    const interval = setInterval(() => {
      setVoterCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const incrementVoterCount = () => {
    setVoterCount(prev => prev + 1);
  };

  const recordVote = (candidateId: number) => {
    setVoteTallies(prev => ({
      ...prev,
      [candidateId]: prev[candidateId] + 1
    }));
    incrementVoterCount();
  };

  const login = (email: string, password: string) => {
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const newUser = { email, name: email.split('@')[0], region: randomRegion };
    setUser(newUser);
    localStorage.setItem('civic_user', JSON.stringify(newUser));
  };

  const register = (email: string, name: string, password: string) => {
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const newUser = { email, name, region: randomRegion };
    setUser(newUser);
    localStorage.setItem('civic_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civic_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, voterCount, incrementVoterCount, voteTallies, recordVote }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
