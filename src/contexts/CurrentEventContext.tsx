'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import { CodeFestivalApiError, getCurrentEventSummary } from '@/services/api';
import { CodeFestivalCurrentEvent } from '@/types/application';

type CurrentEventContextValue = {
  event?: CodeFestivalCurrentEvent;
  error: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
};

const CurrentEventContext = createContext<CurrentEventContextValue | undefined>(undefined);

type CurrentEventProviderProps = {
  children: ReactNode;
};

export const CurrentEventProvider = ({ children }: CurrentEventProviderProps) => {
  const [event, setEvent] = useState<CodeFestivalCurrentEvent>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setEvent(await getCurrentEventSummary());
      setError(false);
    } catch (requestError) {
      if (requestError instanceof CodeFestivalApiError && requestError.status === 404) {
        setEvent(undefined);
        setError(false);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialRequest = window.setTimeout(() => void refresh(), 0);
    return () => window.clearTimeout(initialRequest);
  }, [refresh]);

  return (
    <CurrentEventContext value={{ event, error, loading, refresh }}>{children}</CurrentEventContext>
  );
};

export const useCurrentEvent = () => {
  const context = useContext(CurrentEventContext);
  if (!context) {
    throw new Error('useCurrentEvent must be used within CurrentEventProvider.');
  }
  return context;
};
