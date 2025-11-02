// providers/SessionCacheProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface SessionCacheContextType {
  session: Session | null;
  isLoading: boolean;
  updateCache: (session: Session) => void;
}

const SessionCacheContext = createContext<SessionCacheContextType | undefined>(undefined);

// Storage key for session cache
const SESSION_CACHE_KEY = "rbac_session_cache";

export function SessionCacheProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  
  // Initialize with cached session from memory/storage
  const [cachedSession, setCachedSession] = useState<Session | null>(() => {
    // Try to get from memory first (SSR safe)
    if (typeof window === "undefined") return null;
    
    try {
      const cached = sessionStorage.getItem(SESSION_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  // Update cache when session changes
  useEffect(() => {
    if (session) {
      setCachedSession(session);
      
      // Persist to sessionStorage for instant availability
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(session));
        } catch (error) {
          console.warn("Failed to cache session:", error);
        }
      }
    }
  }, [session]);

  // Clear cache on sign out
  useEffect(() => {
    if (status === "unauthenticated" && cachedSession) {
      setCachedSession(null);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(SESSION_CACHE_KEY);
      }
    }
  }, [status, cachedSession]);

  const updateCache = useCallback((newSession: Session) => {
    setCachedSession(newSession);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(newSession));
      } catch (error) {
        console.warn("Failed to update session cache:", error);
      }
    }
  }, []);

  const value: SessionCacheContextType = {
    session: session || cachedSession,
    isLoading: status === "loading" && !cachedSession,
    updateCache,
  };

  return (
    <SessionCacheContext.Provider value={value}>
      {children}
    </SessionCacheContext.Provider>
  );
}

export function useSessionCache() {
  const context = useContext(SessionCacheContext);
  if (!context) {
    throw new Error("useSessionCache must be used within SessionCacheProvider");
  }
  return context;
}
