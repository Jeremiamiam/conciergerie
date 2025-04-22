# Guide de Déploiement - Projet Conciergerie

## Prérequis

- Compte GitHub avec accès au dépôt
- Node.js 18.17.0 ou supérieur
- npm ou yarn

## Configuration de Base

### 1. Configuration Next.js

Assurez-vous que votre fichier `next.config.mjs` contient bien :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Génère une version statique
  images: {
    unoptimized: true, // Nécessaire pour le déploiement statique
  },
};

export default nextConfig;
```

### 2. Fichiers Nécessaires

- Fichier `.nojekyll` vide à la racine du projet (déjà ajouté)
- Vérifiez que le fichier `.gitignore` contient :
  ```
  .next
  node_modules
  out
  ```

## Suppression du Système de Design

Ce projet contenait des références à un système de design qui n'est plus utilisé. Pour nettoyer le code et éviter les erreurs de build, supprimez les éléments suivants :

### 1. Fichiers à Supprimer

```bash
# Suppression du composant DesignSystemPanel
rm -rf src/components/ui/DesignSystemPanel

# Suppression du contexte (s'il existe)
rm -rf src/context/DesignSystemContext.tsx
```

### 2. Références à Vérifier et Nettoyer

Vérifiez les fichiers suivants pour des imports ou références au système de design et supprimez-les :

- `src/app/layout.tsx` - Vérifiez les imports commentés
- `src/app/theme/page.tsx` - Ce fichier peut contenir des références au système de design
- D'autres composants pouvant utiliser le contexte du système de design

## Déploiement sur GitHub Pages

### 1. Configuration GitHub

1. Allez dans Settings > Pages
2. Dans Source, sélectionnez "GitHub Actions"

### 2. GitHub Actions Workflow

Le fichier `.github/workflows/nextjs_deploy.yml` est déjà configuré avec :

```yaml
name: Deploy Next.js site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "18.17.0"
          cache: 'npm'
      - name: Setup Pages
        uses: actions/configure-pages@v4
        with:
          enablement: true
      - name: Install dependencies
        run: npm ci
      - name: Build with Next.js
        run: npm run build -- --no-lint
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3. Déploiement

1. Après chaque push sur la branche `main`, le workflow se déclenchera automatiquement
2. Vous pouvez aussi lancer manuellement le workflow depuis l'onglet "Actions" de GitHub

Le site est accessible à l'URL : `https://jeremiamiam.github.io/conciergerie/`

## Résolution des Problèmes Courants

### 1. Erreurs d'Importation JSON

Si vous rencontrez des erreurs d'importation JSON comme celles-ci :
```
Attempted import error: 'locations'.'map' is not exported from '@/data/locations.json'
```

Solutions possibles :
- Vérifiez que vos fichiers JSON sont correctement formatés
- Adaptez le code pour utiliser correctement les importations JSON (les fichiers JSON n'exportent pas de méthodes)
- Convertissez vos fichiers JSON en fichiers .ts/.js qui exportent des objets JavaScript

### 2. Erreurs ESLint

Pour éviter les erreurs ESLint lors du build, vous pouvez :
- Corriger toutes les erreurs signalées (méthode recommandée)
- Continuer à utiliser le paramètre `--no-lint` dans la commande de build
- Créer un fichier `.eslintrc.js` plus permissif

### 3. Problèmes avec les Images

Si les images ne s'affichent pas :
- Vérifiez que `unoptimized: true` est bien dans la config
- Utilisez des chemins relatifs pour les images
- Placez les images dans le dossier `public/`

### 4. Problèmes de Route

Les applications Next.js statiques ont des limitations pour certaines fonctionnalités dynamiques :
- API Routes ne fonctionnent pas
- Middleware nécessite des adaptations
- getServerSideProps n'est pas compatible

## Test Local

Pour tester en local avant de déployer :

```bash
# Construire le site
npm run build

# Servir les fichiers statiques
npx serve out
```

## Maintenance

- Mettez à jour régulièrement Next.js et les dépendances
- Surveillez les logs d'erreur dans GitHub Actions
- Corrigez progressivement les warnings du build
- Effectuez des tests sur différents navigateurs et appareils 