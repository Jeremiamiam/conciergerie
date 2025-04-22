'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import ClientOnly from '@/components/ClientOnly'; 
import { converter } from 'culori'; 
import { colors as defaultColorThemes, typography as defaultTypography, spacing as defaultSpacing, borderRadius as defaultBorderRadius } from '@/styles/theme';

// Define converters using culori
const oklchConverter = converter('oklch');
const hslConverter = converter('hsl'); 

// --- Types ---
type ThemeName = string; // Defined ThemeName
type BaseMode = 'light' | 'dark';
type ThemeColors = typeof defaultColorThemes.light; 
type Typography = typeof defaultTypography;
type Spacing = typeof defaultSpacing;
type BorderRadius = typeof defaultBorderRadius;

// --- Local storage keys ---
const LS_APPLIED_THEME_NAME = 'ui-applied-theme-name'; 
const LS_APPLIED_THEME_CSS = 'ui-applied-theme-css';   
const LS_BASE_MODE = 'ui-base-mode';             
const LS_CUSTOM_COLORS = 'ui-custom-colors';       
// Add keys for typo, spacing, radius if needed

// --- Context Interface ---
interface UISettingsContextType {
  appliedTheme: ThemeName;
  baseMode: BaseMode;
  colors: ThemeColors; 
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  applyCustomTheme: (cssContent: string, themeName: string) => void;
  setBaseMode: (mode: BaseMode) => void;
  resetAppliedTheme: () => void; 
  updateColor: (key: keyof ThemeColors | `text.${keyof ThemeColors['text']}`, hexColor: string) => void; 
  updateFont: (key: keyof Typography['fonts'], value: string) => void;
  updateFontSize: (key: keyof Typography['sizes'], value: string) => void;
  updateSpacing: (key: keyof Spacing, value: string) => void; 
  updateBorderRadius: (key: keyof BorderRadius, value: string) => void; 
  exportSettings: () => string; 
  importSettings: (settingsJson: string) => void; 
  resetCustomSettings: () => void; 
  applyBuiltInTheme: (themeName: ThemeName) => void; 
}

const UISettingsContext = createContext<UISettingsContextType | undefined>(undefined);

// --- Helper Functions ---
const getInitialBaseMode = (): BaseMode => {
  if (typeof window === 'undefined') return 'light'; 
  const savedMode = localStorage.getItem(LS_BASE_MODE);
  if (savedMode === 'light' || savedMode === 'dark') return savedMode;
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
};

const getInitialAppliedTheme = (initialMode: BaseMode): ThemeName => {
   if (typeof window === 'undefined') return 'lofi'; 
   const savedThemeName = localStorage.getItem(LS_APPLIED_THEME_NAME);
   return savedThemeName || 'lofi'; 
}

const getInitialColors = (initialMode: BaseMode): ThemeColors => {
   if (typeof window === 'undefined') return defaultColorThemes.light;
   const savedColorsJson = localStorage.getItem(LS_CUSTOM_COLORS);
   if (savedColorsJson) {
     try {
       const savedColors = JSON.parse(savedColorsJson);
       if (savedColors && typeof savedColors.primary === 'string') {
         const baseColors = defaultColorThemes[initialMode]; 
         const mergedColors = { ...baseColors, ...savedColors };
         mergedColors.text = { ...baseColors.text, ...(savedColors.text || {}) };
         return mergedColors;
       }
     } catch (e) { console.error("Error parsing saved colors from localStorage", e); }
   }
   return defaultColorThemes[initialMode]; 
 };

// --- Provider Component ---
export const UISettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  const [baseMode, setBaseModeState] = useState<BaseMode>(getInitialBaseMode); 
  const [appliedTheme, setAppliedTheme] = useState<ThemeName>(() => getInitialAppliedTheme(baseMode)); 
  const [customColors, setCustomColors] = useState<ThemeColors>(() => getInitialColors(baseMode)); 
  const [customTypography, setCustomTypography] = useState<Typography>(defaultTypography); 
  const [customSpacing, setCustomSpacing] = useState<Spacing>(defaultSpacing); 
  const [customBorderRadius, setCustomBorderRadius] = useState<BorderRadius>(defaultBorderRadius); 
  const [isMounted, setIsMounted] = useState(false); 

  // Function to apply theme attribute and manage CSS injection
  const applyThemeDOM = useCallback((themeName: ThemeName, css?: string | null) => {
    if (typeof document === 'undefined') return; 

    const styleElementId = 'dynamic-theme-style';
    let styleElement = document.getElementById(styleElementId) as HTMLStyleElement | null;

    if (css) { 
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleElementId;
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = css;
      localStorage.setItem(LS_APPLIED_THEME_CSS, css);
      localStorage.setItem(LS_APPLIED_THEME_NAME, themeName);
      console.log(`Applied custom theme "${themeName}" and saved CSS.`);
    } else { 
      if (styleElement) styleElement.textContent = ''; 
      localStorage.removeItem(LS_APPLIED_THEME_CSS);
      localStorage.removeItem(LS_APPLIED_THEME_NAME);
      console.log(`Switched to built-in theme "${themeName}". Cleared custom CSS.`);
    }

    document.documentElement.setAttribute('data-theme', themeName);
    setAppliedTheme(prev => prev === themeName ? prev : themeName); 

    const isDark = themeName.includes('dark') || themeName.includes('night') || themeName === 'synthwave' || themeName === 'halloween' || themeName === 'forest' || themeName === 'black' || themeName === 'dracula' || themeName === 'business';
    if (isDark) { 
       document.documentElement.classList.add('dark');
       setBaseModeState('dark'); 
       localStorage.setItem(LS_BASE_MODE, 'dark');
    } else {
       document.documentElement.classList.remove('dark');
       setBaseModeState('light'); 
       localStorage.setItem(LS_BASE_MODE, 'light');
    }

  }, []); // Removed baseMode dependency

  // Effect to load initial theme/mode AFTER hydration
  useEffect(() => {
    const savedThemeName = localStorage.getItem(LS_APPLIED_THEME_NAME);
    const savedThemeCSS = localStorage.getItem(LS_APPLIED_THEME_CSS);
    const initialBaseMode = getInitialBaseMode(); 

    let themeToApply: ThemeName;
    let cssToApply: string | null = null;

    if (savedThemeName && savedThemeCSS) {
      themeToApply = savedThemeName;
      cssToApply = savedThemeCSS;
    } else {
      themeToApply = 'lofi'; 
    }
    
    setBaseModeState(initialBaseMode); 
    applyThemeDOM(themeToApply, cssToApply); 
    setCustomColors(getInitialColors(initialBaseMode)); 

    setIsMounted(true); 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // --- Theme Application Functions ---
  const applyCustomTheme = useCallback((cssContent: string, themeName: string) => {
    applyThemeDOM(themeName, cssContent);
  }, [applyThemeDOM]);

  const setBaseMode = useCallback((mode: BaseMode) => {
    setBaseModeState(mode);
    localStorage.setItem(LS_BASE_MODE, mode);
    const savedThemeName = localStorage.getItem(LS_APPLIED_THEME_NAME);
    if (!savedThemeName) {
      applyThemeDOM(mode); 
    } else {
       if (typeof document !== 'undefined') {
          if (mode === 'dark') document.documentElement.classList.add('dark');
          else document.documentElement.classList.remove('dark');
       }
    }
  }, [applyThemeDOM]);

  const resetAppliedTheme = useCallback(() => { 
    const defaultMode = 'lofi'; 
    setBaseModeState('light'); 
    localStorage.removeItem(LS_BASE_MODE); 
    applyThemeDOM(defaultMode); 
  }, [applyThemeDOM]);

  const applyBuiltInTheme = useCallback((themeName: ThemeName) => {
     applyThemeDOM(themeName); 
  }, [applyThemeDOM]);

  // --- State Update Functions (No DOM changes) ---
  const updateColor = useCallback((key: keyof ThemeColors | `text.${keyof ThemeColors['text']}`, hexColor: string) => {
    setCustomColors((prev) => {
      const newState = JSON.parse(JSON.stringify(prev)) as ThemeColors; 
      if (typeof key === 'string' && key.startsWith('text.')) {
        const subKey = key.split('.')[1] as keyof ThemeColors['text'];
        if (!newState.text) newState.text = { primary: '', secondary: '' }; 
        newState.text[subKey] = hexColor;
      } else if (key !== 'text') { 
         // Use 'any' cast as the simplest workaround for the persistent TS error
         (newState as any)[key] = hexColor; 
      }
      localStorage.setItem(LS_CUSTOM_COLORS, JSON.stringify(newState)); 
      return newState;
    });
  }, []); 

  const updateFont = useCallback((key: keyof Typography['fonts'], value: string) => {
    setCustomTypography((prev) => ({ ...prev, fonts: { ...prev.fonts, [key]: value } }));
  }, []);
  const updateFontSize = useCallback((key: keyof Typography['sizes'], value: string) => {
    setCustomTypography((prev) => ({ ...prev, sizes: { ...prev.sizes, [key]: value } }));
  }, []);
  const updateSpacing = useCallback((key: keyof Spacing, value: string) => { 
    setCustomSpacing((prev) => ({ ...prev, [key]: value }));
  }, []);
  const updateBorderRadius = useCallback((key: keyof BorderRadius, value: string) => { 
    setCustomBorderRadius((prev) => ({ ...prev, [key]: value }));
  }, []);

  // --- Export/Import/Reset for Custom State ---
  const exportSettings = useCallback(() => { // Restored function body
    return JSON.stringify({
      colors: customColors, 
      typography: customTypography,
      spacing: customSpacing,
      borderRadius: customBorderRadius,
    }, null, 2);
  }, [customColors, customTypography, customSpacing, customBorderRadius]); 

  const importSettings = useCallback((settingsJson: string) => { // Restored function body
    try {
      const imported = JSON.parse(settingsJson);
      if (imported.colors) {
         const baseColors = defaultColorThemes[baseMode]; 
         const validatedColors = { ...baseColors };
         for (const key in baseColors) {
            if (key === 'text') {
               validatedColors.text = { ...baseColors.text, ...(imported.colors.text || {}) };
            } else if (key in imported.colors) {
               validatedColors[key as keyof ThemeColors] = imported.colors[key];
            }
         }
         setCustomColors(validatedColors);
         localStorage.setItem(LS_CUSTOM_COLORS, JSON.stringify(validatedColors));
      }
      if (imported.typography) setCustomTypography(imported.typography);
      if (imported.spacing) setCustomSpacing(imported.spacing);
      if (imported.borderRadius) setCustomBorderRadius(imported.borderRadius);
    } catch (error) { console.error('Error importing settings:', error); throw error; }
  }, [baseMode]); 

  const resetCustomSettings = useCallback(() => { // Restored function body
    setCustomColors(defaultColorThemes[baseMode]); 
    setCustomTypography(defaultTypography);
    setCustomSpacing(defaultSpacing);
    setCustomBorderRadius(defaultBorderRadius);
    localStorage.removeItem(LS_CUSTOM_COLORS); 
  }, [baseMode]); 

  // --- Context Value ---
  const value = useMemo(() => ({
    appliedTheme,
    baseMode,
    colors: customColors, 
    typography: customTypography,
    spacing: customSpacing,
    borderRadius: customBorderRadius,
    applyCustomTheme,
    setBaseMode,
    resetAppliedTheme, 
    updateColor,
    updateFont,
    updateFontSize,
    updateSpacing,
    updateBorderRadius, 
    exportSettings, 
    importSettings, 
    resetCustomSettings, 
    applyBuiltInTheme, 
  }), [
      appliedTheme, baseMode, customColors, customTypography, customSpacing, customBorderRadius, 
      applyCustomTheme, setBaseMode, resetAppliedTheme, 
      updateColor, updateFont, updateFontSize, updateSpacing, updateBorderRadius,
      exportSettings, importSettings, resetCustomSettings, applyBuiltInTheme 
  ]);

  return (
    <UISettingsContext.Provider value={value}>
      <ClientOnly>{children}</ClientOnly> 
    </UISettingsContext.Provider>
  );
};

// --- Hook ---
export const useUISettings = () => { 
  const context = useContext(UISettingsContext);
  if (context === undefined) throw new Error('useUISettings must be used within a UISettingsProvider');
  return context;
};

export default UISettingsContext;
