'use client';

/**
 * @file AuthContext.tsx
 * @description Centralized Authentication and Voting State Provider.
 * Handles user sessions, voter registration, and real-time voting tallies.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * @interface User
 * @property {string} email - Unique identifier for the user.
 * @property {string} name - Display name of the citizen.
 * @property {string} region - Assigned electoral region.
 */
interface User {
  email: string;
  name: string;
  region: string;
}

/**
 * @interface AuthContextType
 * @description Defines the shape of the Auth Context.
 */
interface AuthContextType {
  user: User | null;
  /** Authenticates user against local registry */
  login: (email: string, password: string) => void;
  /** Registers a new citizen and assigns an electoral region */
  register: (email: string, name: string, password: string) => void;
  /** Terminates the current session */
  logout: () => void;
  isLoading: boolean;
  voterCount: number;
  incrementVoterCount: () => void;
  voteTallies: Record<number, number>;
  /** Cryptographically sealed vote recording simulation */
  recordVote: (candidateId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialTallies = { 1: 4205, 2: 3890, 3: 4112 };

const regions = ['Bengaluru North', 'Mumbai South', 'Delhi Central', 'Hyderabad East', 'Chennai West'];

/**
 * @component AuthProvider
 * @description Provides auth and voting state to the entire application.
 */
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
    const users = JSON.parse(localStorage.getItem('civic_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (!existingUser) {
      throw new Error('No account found with this email. Please register first.');
    }

    if (existingUser.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }

    setUser(existingUser);
    localStorage.setItem('civic_user', JSON.stringify(existingUser));
  };

  const register = (email: string, name: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('civic_users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email already registered. Please login.');
    }

    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const newUser = { email, name, region: randomRegion, password };
    
    localStorage.setItem('civic_users', JSON.stringify([...users, newUser]));
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

/**
 * @hook useAuth
 * @description Access the authentication and voting state.
 * @throws {Error} If used outside of AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
