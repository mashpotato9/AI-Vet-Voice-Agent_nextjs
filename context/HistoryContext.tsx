"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { SessionInfo } from '../app/(routes)/dashboard/vet-agent/[sessionId]/page';

interface HistoryContextType {
  history: SessionInfo[];
  loading: boolean;
  refreshHistory: () => Promise<void>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const getHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/session-chat?sessionId=all');
      setHistory(res.data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <HistoryContext.Provider value={{ 
      history, 
      loading, 
      refreshHistory: getHistory 
    }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}