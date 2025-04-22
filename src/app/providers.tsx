'use client';

import React from 'react';
// Removed ThemeProvider and DesignSystemProvider imports
import { ABTestingProvider } from '@/context/ABTestingContext';
import { UISettingsProvider } from '@/context/UISettingsContext'; // Import the new provider

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Wrap with the new UISettingsProvider
    <UISettingsProvider> 
      <ABTestingProvider>
        {children}
      </ABTestingProvider>
    </UISettingsProvider>
  );
}
