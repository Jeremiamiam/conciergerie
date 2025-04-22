'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { HexColorPicker } from 'react-colorful'; 
import { borderRadius as defaultBorderRadiusOptions } from '@/styles/theme'; // Import default options

// Helper component for a single color input
const ColorInput = ({ label, colorKey }: { label: string; colorKey: keyof ReturnType<typeof useDesignSystem>['colors'] | `text.${keyof ReturnType<typeof useDesignSystem>['colors']['text']}` }) => {
  const { colors, updateColor } = useDesignSystem();

  const getCurrentColor = () => {
    if (colorKey.startsWith('text.')) {
      const subKey = colorKey.split('.')[1] as keyof typeof colors.text;
      return colors.text?.[subKey] ?? '#000000'; 
    }
    // Need to handle potential non-string values if ThemeColors type changes
    const colorValue = colors[colorKey as keyof typeof colors];
    return typeof colorValue === 'string' ? colorValue : '#000000'; 
  };

  const handleColorChange = (newColor: string) => {
    // Basic validation for hex color format
    if (/^#[0-9A-F]{6}$/i.test(newColor) || /^#[0-9A-F]{3}$/i.test(newColor)) {
       updateColor(colorKey, newColor);
    } else {
       // Optionally provide feedback for invalid format
       console.warn(`Invalid HEX color format: ${newColor}`);
    }
  };

  const currentColor = getCurrentColor();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 capitalize">
        {label} ({colorKey})
      </label>
      <div className="flex items-center gap-2">
        <HexColorPicker 
          color={currentColor || '#ffffff'} 
          onChange={handleColorChange} 
          style={{ width: '100px', height: '100px' }}
        />
        <input
          type="text"
          value={currentColor || ''}
          onChange={(e) => handleColorChange(e.target.value)}
          className="input input-bordered input-sm w-full"
          placeholder="#rrggbb"
        />
      </div>
    </div>
  );
};

// Helper component for border radius select
const BorderRadiusSelect = ({ label, radiusKey, daisyVar }: { label: string; radiusKey: keyof typeof defaultBorderRadiusOptions; daisyVar: string }) => {
  const { borderRadius, updateBorderRadius } = useDesignSystem();
  const options = Object.keys(defaultBorderRadiusOptions);
  // Ensure borderRadius is not null/undefined before accessing key
  const currentValue = borderRadius?.[radiusKey] ?? defaultBorderRadiusOptions[radiusKey];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValueKey = event.target.value as keyof typeof defaultBorderRadiusOptions;
    updateBorderRadius(radiusKey, defaultBorderRadiusOptions[newValueKey]); 
  };
  
  const currentKey = Object.keys(defaultBorderRadiusOptions).find(key => defaultBorderRadiusOptions[key as keyof typeof defaultBorderRadiusOptions] === currentValue) || radiusKey;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 capitalize">
        {label} ({daisyVar})
      </label>
      <select 
        className="select select-bordered select-sm w-full" 
        value={currentKey} 
        onChange={handleChange}
      >
        {options.map((optionKey) => (
          <option key={optionKey} value={optionKey}>
            {optionKey} ({defaultBorderRadiusOptions[optionKey as keyof typeof defaultBorderRadiusOptions]})
          </option>
        ))}
      </select>
    </div>
  );
};


export const DesignSystemPanel = () => {
  const { theme, toggleTheme, exportTheme, importTheme, resetTheme } = useDesignSystem();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImportClick = () => { fileInputRef.current?.click(); };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonContent = e.target?.result as string;
        importTheme(jsonContent);
        alert('Thème importé avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'importation du thème:', error);
        alert('Erreur lors de l\'importation du thème. Vérifiez le format JSON.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; 
  };

  const handleExportClick = () => {
    const themeJson = exportTheme();
    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-system-theme-${theme}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6"> 
      {/* Theme Toggle */}
      <div className="mb-4">
        <button onClick={toggleTheme} className="btn btn-sm w-full">
          Passer en thème {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>

      {/* Color Pickers */}
      <h4 className="text-md font-medium mb-2">Couleurs</h4> 
      <div className="grid grid-cols-1 gap-4"> {/* Use grid for better layout */}
        <ColorInput label="Primary" colorKey="primary" />
        <ColorInput label="Primary Content" colorKey="primary-content" /> 
        <ColorInput label="Secondary" colorKey="secondary" />
        <ColorInput label="Secondary Content" colorKey="secondary-content" />
        <ColorInput label="Accent" colorKey="accent" />
        <ColorInput label="Accent Content" colorKey="accent-content" />
        <ColorInput label="Neutral" colorKey="neutral" />
        <ColorInput label="Neutral Content" colorKey="neutral-content" />
        <ColorInput label="Background (Base-100)" colorKey="background" />
        <ColorInput label="Surface (Base-200)" colorKey="surface" />
        <ColorInput label="Text Primary (Base Content)" colorKey="text.primary" />
        <ColorInput label="Text Secondary (Neutral Content)" colorKey="text.secondary" />
        <ColorInput label="Info" colorKey="info" />
        <ColorInput label="Info Content" colorKey="info-content" />
        <ColorInput label="Success" colorKey="success" />
        <ColorInput label="Success Content" colorKey="success-content" />
        <ColorInput label="Warning" colorKey="warning" />
        <ColorInput label="Warning Content" colorKey="warning-content" />
        <ColorInput label="Error" colorKey="error" />
        <ColorInput label="Error Content" colorKey="error-content" />
      </div>

      {/* Border Radius Selects */}
      <h4 className="text-md font-medium mb-2 mt-4">Arrondis</h4> 
      <BorderRadiusSelect label="Boutons" radiusKey="base" daisyVar="--rounded-btn" /> 
      <BorderRadiusSelect label="Cartes/Boîtes" radiusKey="lg" daisyVar="--rounded-box" />

      {/* Import / Export / Reset */}
      <h4 className="text-md font-medium mb-2 mt-4">Gestion Thème</h4>
      <div className="space-y-2">
         <button onClick={handleImportClick} className="btn btn-sm btn-outline w-full">
           Importer Thème (JSON)
         </button>
         <input 
           type="file" 
           ref={fileInputRef} 
           onChange={handleFileChange} 
           accept=".json" 
           className="hidden" 
         />
         <button onClick={handleExportClick} className="btn btn-sm btn-outline w-full">
           Exporter Thème (JSON)
         </button>
         <button onClick={resetTheme} className="btn btn-sm btn-error btn-outline w-full">
           Réinitialiser Thème
         </button>
      </div>
    </div>
  );
};

export default DesignSystemPanel;
