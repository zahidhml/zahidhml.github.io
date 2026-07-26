'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

/**
 * Client-side theme provider wrapper
 * Separates client-side functionality from server-side root layout
 */
export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
