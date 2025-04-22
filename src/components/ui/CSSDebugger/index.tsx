'use client';

import React, { useState, useEffect } from 'react';

export const CSSDebugger: React.FC = () => {
  const [cssVars, setCssVars] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get all CSS variables from :root
    const computedStyle = getComputedStyle(document.documentElement);
    const variables: Record<string, string> = {};

    // Filter to only get variables we're interested in (design system related)
    const varList = [
      'primary', 'secondary', 'accent', 'neutral', 
      'base', 'background', 'surface',
      'text-primary', 'text-secondary',
      'error', 'success', 'warning', 'info'
    ];

    varList.forEach(name => {
      const value = computedStyle.getPropertyValue(`--${name}`).trim();
      if (value) {
        variables[name] = value;
      }
    });

    // Also check DaisyUI variables
    ['primary', 'secondary', 'accent', 'neutral', 'base-100'].forEach(name => {
      const value = computedStyle.getPropertyValue(`--${name}`).trim();
      if (value) {
        variables[`daisyui-${name}`] = value;
      }
    });

    setCssVars(variables);
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 flex items-center justify-center w-10 h-10 bg-neutral-800 text-white rounded-full shadow-lg text-xs"
        aria-label="Show CSS Variables"
      >
        CSS
      </button>
    );
  }

  return (
    <div className="debug-variables">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold">CSS Variables</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="px-2 py-1 bg-white/20 rounded text-xs"
        >
          Close
        </button>
      </div>
      <div>
        {Object.entries(cssVars).map(([name, value]) => (
          <div key={name} className="flex justify-between mb-1 text-xs">
            <span>--{name}:</span>
            <span className="font-mono">
              {value}
              <span 
                className="inline-block ml-2 w-3 h-3 rounded-sm" 
                style={{ backgroundColor: value }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSSDebugger;