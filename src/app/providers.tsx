'use client';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactNode } from 'react';

import { CurrentEventProvider } from '@/contexts/CurrentEventContext';
import useScreenSize from '@/hooks/useScreenSize';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  useScreenSize();

  return (
    <CurrentEventProvider>
      <Analytics />
      <SpeedInsights />
      {children}
    </CurrentEventProvider>
  );
};

export default Providers;
