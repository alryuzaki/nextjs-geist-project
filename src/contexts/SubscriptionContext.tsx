'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getSubscription } from '../lib/api';

interface SubscriptionContextType {
  plan: string;
  goldBalance: number;
  queuePosition: number | null;
  loading: boolean;
  error: string | null;
  refreshSubscription: () => Promise<void>;
  token: string | null;
  setToken: (token: string | null) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  plan: 'FREE',
  goldBalance: 0,
  queuePosition: null,
  loading: true,
  error: null,
  refreshSubscription: async () => {},
  token: null,
  setToken: () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [plan, setPlan] = useState('FREE');
  const [goldBalance, setGoldBalance] = useState(0);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const fetchSubscription = async () => {
    try {
      if (!token) {
        setPlan('FREE');
        setGoldBalance(0);
        setQueuePosition(null);
        setError(null);
        setLoading(false);
        return;
      }

      const data = await getSubscription(token);
      setPlan(data.plan);
      setGoldBalance(data.goldBalance);
      setQueuePosition(data.queuePosition);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPlan('FREE');
      setGoldBalance(0);
      setQueuePosition(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load token from localStorage on mount
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchSubscription();
    } else {
      setPlan('FREE');
      setGoldBalance(0);
      setQueuePosition(null);
      setLoading(false);
    }
  }, [token]);

  const refreshSubscription = async () => {
    setLoading(true);
    await fetchSubscription();
  };

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <SubscriptionContext.Provider
      value={{
        plan,
        goldBalance,
        queuePosition,
        loading,
        error,
        refreshSubscription,
        token,
        setToken,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
