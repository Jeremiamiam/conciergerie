import type { Config } from 'tailwindcss';

// Removed unused 'themes' constant definition

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'], // Keep dark mode based on class or data-theme
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    // Updated themes list: removed the explicit 'custom' object definition
    // Ensured 'light', 'dark', and 'lofi' are present. Kept others for flexibility.
    themes: [
      "light",
      "dark",
      "lofi", // Ensure lofi is included
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      // "lofi", // Already included above
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "lightest"
      // You can add your permanent custom themes here later, like:
      // {
      //   "mytheme": {
      //      "primary": "#...",
      //      "secondary": "#...",
      //      ... etc ...
      //   },
      // },
    ],
    base: true,
    utils: true,
    logs: false, // Keep logs disabled unless debugging DaisyUI itself
    darkTheme: "dark", // Specifies which theme to use when dark mode is activated via class/preference
  },
};

export default config;

// Removed 'export { themes };'
