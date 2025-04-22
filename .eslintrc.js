// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended', // Utilise les règles TS recommandées
  ],
  // Ajoutez des règles spécifiques ou des surcharges ici si nécessaire
  // rules: {
  //   // Exemple: '@typescript-eslint/no-unused-vars': 'warn',
  // },
  parser: '@typescript-eslint/parser', // Assure l'utilisation du parser TS
  plugins: [
    '@typescript-eslint', // Assure le chargement du plugin TS
  ],
  // Optionnel: Spécifiez des paramètres si nécessaire, ex: version de React
  // settings: {
  //   react: {
  //     version: 'detect',
  //   },
  // },
  // Optionnel: Patterns à ignorer (bien que .eslintignore soit souvent préféré avec ce format)
  // ignorePatterns: ['.next/', 'node_modules/'],
};
