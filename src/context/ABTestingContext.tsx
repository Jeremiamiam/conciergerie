'use client';

import React, { createContext, useContext, useState } from 'react';

type ABTestingContextType = {
  activeVariant: 'A' | 'B';
  toggleVariant: () => void;
};

const ABTestingContext = createContext<ABTestingContextType | undefined>(undefined);

export function ABTestingProvider({ children }: { children: React.ReactNode }) {
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');

  const toggleVariant = () => {
    setActiveVariant(prev => prev === 'A' ? 'B' : 'A');
  };

  return (
    <ABTestingContext.Provider value={{ activeVariant, toggleVariant }}>
      {children}
    </ABTestingContext.Provider>
  );
}

export function useABTesting() {
  const context = useContext(ABTestingContext);
  if (!context) {
    throw new Error('useABTesting must be used within ABTestingProvider');
  }
  return context;
}

export default ABTestingContext; 