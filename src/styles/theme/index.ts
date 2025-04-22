export const colors = {
  light: {
    primary: '#3498db',
    'primary-content': '#ffffff', // Added
    secondary: '#2ecc71',
    'secondary-content': '#ffffff', // Added
    accent: '#e74c3c',
    'accent-content': '#ffffff', // Added
    neutral: '#95a5a6',
    'neutral-content': '#ffffff', // Added
    base: '#ffffff', // Note: 'base' key might not directly map to a single DaisyUI var easily
    background: '#ffffff', // Maps to --b1
    surface: '#f8f9fa',    // Maps to --b2
    text: {
      primary: '#333333',   // Maps to --bc
      secondary: '#666666', // Maps to --nc
    },
    error: '#e74c3c',
    'error-content': '#ffffff', // Added
    success: '#2ecc71',
    'success-content': '#ffffff', // Added
    warning: '#f1c40f',
    'warning-content': '#ffffff', // Added
    info: '#3498db',
    'info-content': '#ffffff', // Added
  },
  dark: {
    primary: '#2980b9',
    'primary-content': '#ffffff', // Added (adjust if needed for dark)
    secondary: '#27ae60',
    'secondary-content': '#ffffff', // Added (adjust if needed for dark)
    accent: '#c0392b',
    'accent-content': '#ffffff', // Added (adjust if needed for dark)
    neutral: '#7f8c8d',
    'neutral-content': '#ffffff', // Added (adjust if needed for dark)
    base: '#1a1a1a',
    background: '#121212', // Maps to --b1
    surface: '#1e1e1e',    // Maps to --b2
    text: {
      primary: '#f8f9fa',   // Maps to --bc
      secondary: '#a0a0a0', // Maps to --nc
    },
    error: '#c0392b',
    'error-content': '#ffffff', // Added (adjust if needed for dark)
    success: '#27ae60',
    'success-content': '#ffffff', // Added (adjust if needed for dark)
    warning: '#f39c12',
    'warning-content': '#ffffff', // Added (adjust if needed for dark)
    info: '#2980b9',
    'info-content': '#ffffff', // Added (adjust if needed for dark)
  },
};

// --- Keep the rest of the file as is ---

export const typography = {
  fonts: {
    primary: 'Inter',
    secondary: 'Roboto',
    accent: 'Playfair Display',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

export const transitions = {
  base: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndices,
};

export default theme;
