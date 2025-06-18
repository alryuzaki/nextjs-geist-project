'use client';

import { SessionProvider } from 'next-auth/react';
import { SubscriptionProvider } from '../contexts/SubscriptionContext';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SubscriptionProvider>
          {children}
          <Toaster position="top-center" expand={true} richColors />
        </SubscriptionProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Providers;
