'use client';

import React from 'react';
import { useABTesting } from '@/context/ABTestingContext';

// Added 'show' prop
export function ABTestingToggle({ show = false }: { show?: boolean }) { 
  const { activeVariant, toggleVariant } = useABTesting();

  // Return null if show is false
  if (!show) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button 
        onClick={toggleVariant}
        className="btn btn-primary btn-xs"
      >
        A/B Test: Version {activeVariant}
      </button>
    </div>
  );
}
