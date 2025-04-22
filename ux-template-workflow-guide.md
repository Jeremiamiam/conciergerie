# Guide de Workflow - Création d'un nouveau site avec le Template UX React

### Étape 1: Analyse du brief client

- Identifiez les couleurs principales de la charte graphique.
- Notez les polices à utiliser (si différentes des défauts).
- Listez les principales pages à créer.
- Identifiez les fonctionnalités clés requises.

### Étape 2: Configuration du Thème via la page `/theme`

1.  **Ouvrez l'application** dans votre navigateur et allez sur la page `/theme`.
2.  **Option A : Importer un thème du Générateur DaisyUI**
    *   Créez votre thème sur [daisyui.com/theme-generator/](https://daisyui.com/theme-generator/).
    *   Téléchargez le fichier CSS généré.
    *   Sur la page `/theme`, cliquez sur "Choisir un fichier CSS..." et sélectionnez votre fichier.
    *   Le thème est appliqué immédiatement et sauvegardé dans le `localStorage` pour les prochaines visites. La prévisualisation des composants se met à jour.
3.  **Option B : Utiliser un thème intégré**
    *   Cliquez sur "Appliquer Thème 'Lofi'" pour un style wireframe rapide.
    *   Utilisez "Basculer Mode (Light/Dark)" pour alterner entre les thèmes de base.
    *   Utilisez "Réinitialiser" pour revenir au thème par défaut (basé sur les préférences système) et supprimer tout thème CSS importé.
4.  **(Optionnel) Configurer la typographie/spacing/etc. :** Actuellement, ces éléments sont définis dans `src/styles/theme/index.ts`. L'édition live n'est pas active, mais l'état peut être exporté/importé via JSON depuis le contexte (fonctionnalité avancée).

### ⚠️ Règle Critique : Providers

1.  **NE JAMAIS SUPPRIMER OU MODIFIER** :
   ```typescript
   // src/app/layout.tsx
   <Providers>
     {/* contenu de l'application */}
   </Providers>
   ```
   Le composant `Providers` est **ESSENTIEL** car il contient les contextes React nécessaires.

2.  **Structure des providers (`src/app/providers.tsx`)** :
    *   `UISettingsProvider` : **Le contexte principal.** Gère le thème appliqué (intégré ou importé via CSS), le mode light/dark, l'état des valeurs personnalisables (pour export/import JSON), etc.
    *   `ABTestingProvider` : Gère la variante A/B active.
    *   Toujours maintenir cette hiérarchie.

3.  **Modification du thème** :
    *   Utiliser la page `/theme` pour importer un CSS ou choisir un thème intégré pour les tests rapides.
    *   Pour rendre un thème **permanent**, il faut l'ajouter manuellement à `tailwind.config.ts` (voir section 5).

### Étape 2.1: Utilisation de DaisyUI (OBLIGATOIRE)

1. **Composants obligatoires**:
   - Utiliser SYSTÉMATIQUEMENT les composants DaisyUI disponibles (`btn`, `card`, `alert`, etc.).
   - Ne PAS utiliser les classes Tailwind brutes (ex: `bg-blue-500`) quand un composant ou une classe utilitaire DaisyUI existe (ex: `btn-primary`, `bg-primary`).
   
2. **⚠️ Utilisation Sémantique des Boutons**:
   
   TOUJOURS respecter la hiérarchie suivante :

   ```typescript
   // Actions Principales (CTA - Call To Action)
   btn-primary 
   - Utilisé pour : l'action principale de la page/section.
   - Exemples : "Voir nos produits", "Commander", "S'inscrire".
   - Maximum 1 par section visible.

   // Actions Secondaires
   btn-secondary
   - Utilisé pour : actions importantes mais pas principales.
   - Exemples : "En savoir plus", "Demander un devis".
   - Peut être combiné avec `btn-outline`.

   // Actions Tertiaires
   btn-ghost ou btn-link
   - Utilisé pour : navigation secondaire, actions optionnelles.
   - Exemples : "Retour", "Voir détails", "Annuler".

   // Actions de Danger/Warning
   btn-warning : UNIQUEMENT pour les vrais avertissements (ex: confirmation avant action).
   btn-error : UNIQUEMENT pour les actions dangereuses ou indicateurs d'erreur.
   - Exemples : "Supprimer le compte", "Vider le panier".
   ```

   ❌ À NE JAMAIS FAIRE :
   - Utiliser `btn-warning` ou `btn-error` comme couleur principale ou pour des actions non critiques.
   - Mélanger les niveaux d'importance (ex: deux `btn-primary` côte à côte).

3. **Classes de composants principales**:
   ```
   - Layout: card, drawer, navbar, footer, hero (si générique)
   - Actions: btn, btn-primary, btn-secondary, btn-accent, btn-ghost, btn-link, btn-error, btn-warning
   - Data Display: card, card-body, card-title, alert, badge, table
   - Navigation: menu, breadcrumbs, steps, tabs, pagination, navbar
   - Feedback: alert, loading, progress, skeleton, toast
   - Formulaires: input, textarea, select, checkbox, radio, toggle, range
   ```

4. **Système de couleurs**:
   ```
   - Utiliser les classes de couleur sémantiques DaisyUI:
     - Fonds: bg-base-100, bg-base-200, bg-base-300
     - Texte: text-base-content, text-primary, text-secondary, etc.
     - Composants: btn-primary, alert-success, badge-accent, etc.
   - NE PAS utiliser les classes Tailwind de couleur brute (bg-gray-100, text-blue-500, etc.). Le thème gère les couleurs réelles.
   ```

5. **Thèmes Permanents**:
   - Les thèmes "permanents" (inclus dans le build) sont définis dans `tailwind.config.ts` sous la clé `daisyui.themes`.
   - Pour ajouter un thème personnalisé de manière permanente :
     1.  Utilisez le générateur DaisyUI et importez le CSS via la page `/theme` pour vérifier.
     2.  Convertissez les couleurs en HEX (si nécessaire, l'outil peut le faire).
     3.  Ajoutez un nouvel objet thème dans le tableau `daisyui.themes` de `tailwind.config.ts` avec vos couleurs HEX.
     ```javascript
     // Exemple dans tailwind.config.ts
     daisyui: {
       themes: [
         "light", 
         "dark",
         "lofi", // Thème intégré ajouté
         { 
           "monThemeClient": { 
              "primary": "#aabbcc", 
              "secondary": "#ddeeff",
              "accent": "#112233",
              "neutral": "#...",
              "base-100": "#...", 
              // ... inclure TOUTES les couleurs requises par DaisyUI ...
              // (primary, secondary, accent, neutral, base-100, info, success, warning, error)
              // Et idéalement les couleurs -content aussi pour un contrôle fin
              "primary-content": "#...", 
              "secondary-content": "#...",
              // etc...
           },
         },
       ],
     },
     ```
   - Les thèmes `light`, `dark`, et `lofi` sont inclus par défaut.

6. **Bonnes pratiques**:
   - Vérifier la documentation DaisyUI pour chaque nouveau composant.
   - Utiliser les modificateurs DaisyUI (`btn-sm`, `card-bordered`, `alert-error`, etc.).
   - Maintenir la cohérence des composants dans tout le projet.

### Étape 3: Création de la page d'accueil (Maintenant minimale)

La page d'accueil (`src/app/page.tsx`) est maintenant une page simple affichant "UX Zoning Generator". Utilisez-la comme point de départ pour construire votre prototype.

1.  **Demandez à l'IA (Claude) de créer des sections** pour la page d'accueil.
    *   **Convention A/B :** Si vous prévoyez des variantes, demandez à l'IA de créer le contenu dans `src/app/variants/HomePageA.tsx` (ou `src/app/page/variants/HomePageA.tsx`) et de modifier `src/app/page.tsx` pour qu'il devienne un routeur A/B (comme pour les autres pages). Sinon, modifiez directement `src/app/page.tsx`.
    *   Spécifiez l'utilisation des composants et classes DaisyUI.
2.  **Intégrez et ajustez** le contenu généré.

## 3. Développement des pages

### Méthode efficace pour chaque nouvelle page

1. **Planifiez la structure** de la page (sections, composants).
2. **Demandez à l'IA (Claude) de créer la page** :
   - **Convention Importante :** L'IA doit **toujours** créer la page initiale en tant que **Variante A** dans un sous-dossier `variants/`. Par exemple, pour une page "Contact", l'IA créera `src/app/contact/variants/PageA.tsx`.
   - L'IA doit également créer le fichier parent `src/app/contact/page.tsx` qui importe et affiche `PageA.tsx` par défaut (sans logique A/B initialement).
   - Décrivez clairement les sections et composants nécessaires en utilisant les classes DaisyUI.
   ```
   Exemple de prompt: "Crée la page 'Contact' en utilisant DaisyUI. Crée le contenu dans `src/app/contact/variants/PageA.tsx` et le fichier parent `src/app/contact/page.tsx` qui l'affiche. Inclus un formulaire de contact simple (nom, email, message) avec un bouton `btn-primary`."
   ```
3. **Intégrez les composants générés** si nécessaire.
4. **Créez une Variante B (Optionnel)** : Si vous souhaitez tester une autre approche :
   - Demandez à l'IA de créer `src/app/contact/variants/PageB.tsx`.
   - Demandez à l'IA de modifier `src/app/contact/page.tsx` pour qu'il importe `PageB`, utilise le hook `useABTesting`, affiche A ou B conditionnellement, et passe `showToggleButton={true}` aux deux variantes.
5. **Vérifiez la responsivité** sur différentes tailles d'écran.
6. **Affinez les animations et interactions**.

### Organisation de multiples pages

Pour un site comportant plusieurs pages :
1. Suivez la "Méthode efficace" ci-dessus pour chaque nouvelle page/route.
2. Assurez-vous que la structure `src/app/[nom-route]/page.tsx` et `src/app/[nom-route]/variants/PageA.tsx` est respectée.
3. Réutilisez les composants existants autant que possible.
4. Maintenez la cohérence visuelle entre les pages.

## 4. Tests et optimisations

### Tests A/B

#### Structure et règles importantes

1. **Structure des fichiers** (Rappel)
```
src/app/[route]/
├── page.tsx              # Page principale (Client Component, routeur A/B si B existe)
└── variants/            # Dossier contenant les variantes
    ├── PageA.tsx        # Variante A (Client Component)
    └── PageB.tsx        # Variante B (Client Component, optionnelle)
```

2. **Points clés à respecter**
- La page principale (`page.tsx`) **doit** être un Client Component (`'use client'`) **si et seulement si** elle contient la logique A/B (c'est-à-dire si `PageB.tsx` existe). Si elle ne fait qu'afficher `PageA.tsx`, elle peut rester un Server Component.
- Les variantes (`PageA.tsx`, `PageB.tsx`) doivent **toujours** être des Client Components (`'use client'`).
- **IMPORTANT** : Ne pas utiliser `async/await` directement dans les composants clients (variantes ou page routeur A/B).
- La logique de récupération de données doit être gérée via des hooks, des contextes, ou passée en props depuis des Server Components parents (si possible).

3. **Exemple d'implémentation**

Page principale (`page.tsx`) - Exemple Routeur A/B :
```typescript
'use client'; // Nécessaire car utilise un hook

import { useABTesting } from '@/context/ABTestingContext';
import PageVariantA from './variants/PageA'; 
import PageVariantB from './variants/PageB'; // Importer B seulement si elle existe

// Déterminez ici si la variante B existe pour cette page
// Idéalement, cela pourrait être fait dynamiquement, mais pour l'instant, on le met manuellement.
const hasVariantB = true; // Mettre à false si PageB.tsx n'existe pas

export default function PageRouter() { 
  const { activeVariant } = useABTesting();

  const showToggle = hasVariantB; 

  return (
    <> 
      {(activeVariant === 'B' && hasVariantB)
        ? <PageVariantB showToggleButton={showToggle} />
        : <PageVariantA showToggleButton={showToggle} /> 
      }
    </>
  );
}
```

Variante A (`variants/PageA.tsx`) - Exemple avec Toggle intégré :
```typescript
'use client';

import React from 'react';
import { ABTestingToggle } from '@/components/ui/ABTestingToggle';

// Accepte la prop showToggleButton
export default function PageVariantA({ showToggleButton = false }: { showToggleButton?: boolean }) {
  return (
    <div className="relative"> 
      {/* ... votre JSX pour la variante A ... */}

      {/* Affiche le toggle seulement si la prop est vraie */}
      <ABTestingToggle show={showToggleButton} />
    </div>
  );
}
```

4. **⚠️ Pièges à éviter** (Rappel)
- **Affichage Conditionnel du Toggle** : Le composant parent (`page.tsx`) doit déterminer si `PageB.tsx` existe et passer `showToggleButton={true}` aux variantes uniquement dans ce cas. Le composant `ABTestingToggle` est rendu *dans* les variantes et utilise cette prop pour s'afficher ou non.
- Ne pas utiliser `async/await` dans les composants clients (`page.tsx` si routeur A/B, `PageA.tsx`, `PageB.tsx`).
- Garder la logique de récupération de données hors des variantes.
- Toujours ajouter `'use client'` en haut des fichiers `PageA.tsx`, et `PageB.tsx`, et `page.tsx` *si* il contient la logique A/B.

5. **Bonnes pratiques** (Rappel)
- Garder les données dans un hook ou contexte séparé.
- Utiliser des noms cohérents (PageA/PageB).
- Documenter les différences entre les variantes.
- Centraliser la logique de switch dans la page principale (`page.tsx`).

6. **Workflow de test**
- Créer d'abord la variante A complète.
- Dupliquer et modifier pour créer la variante B.
- Mettre à jour `page.tsx` pour gérer le A/B et passer `showToggleButton={true}`.
- Tester le switch avec le toggle.
- Recueillir les retours utilisateurs.
- Sélectionner la meilleure version (et potentiellement supprimer l'autre et simplifier `page.tsx`).

#### Exemple de différences entre variantes

```typescript
// Variante A : Layout classique
<div className="grid lg:grid-cols-2 gap-12"> ... </div>

// Variante B : Layout moderne
<div className="flex flex-col"> ... </div>
```

### Optimisations visuelles

1. **Vérifiez la cohérence** des espacements et alignements.
2. **Assurez-vous que le contraste** est suffisant pour l'accessibilité (DaisyUI aide, mais vérifiez les combinaisons personnalisées).
3. **Testez les animations** pour qu'elles soient fluides mais non intrusives.
4. **Vérifiez les performances** (temps de chargement, fluidité).


## 6. Création d'une bibliothèque de composants personnalisés

Au fil des projets, vous pouvez créer votre propre bibliothèque de composants réutilisables:

1. **Identifiez les composants génériques** créés pour un projet spécifique.
2. **Copiez-les** dans le template d'origine sous un dossier dédié (ex: `src/components/custom/`).
3. **Documentez leur utilisation** pour les projets futurs.
4. **Adaptez-les** pour qu'ils utilisent pleinement le système de design.

## 7. Optimisation du workflow avec Claude (ou autre IA)

Pour tirer le meilleur parti de l'IA lors de la création de maquettes:

1. **Soyez précis dans vos descriptions et spécifiez l'utilisation de DaisyUI**:
   ```
   Bon exemple: "Crée un formulaire de contact avec DaisyUI, utilisant les classes form-control, input, et btn-primary pour les champs et le bouton d'envoi."
   
   Exemple peu efficace: "Fais-moi un formulaire de contact avec Tailwind."
   ```

2. **Référencez les composants DaisyUI existants**:
   ```
   "Utilise le composant card de DaisyUI mais ajoute un badge en haut à droite avec la classe badge-warning."
   ```

3. **Spécifiez l'emplacement et la structure des fichiers** (Convention Variante A) :
   ```
   "Crée la page '/about'. Le contenu doit être dans `src/app/about/variants/PageA.tsx` et le fichier parent `src/app/about/page.tsx` doit l'afficher."
   ```

4. **Demandez des variantes** quand vous hésitez sur une approche:
   ```
   "Génère une Variante B pour la page '/about' dans `src/app/about/variants/PageB.tsx` avec une mise en page différente. Modifie aussi `src/app/about/page.tsx` pour gérer le A/B et afficher le toggle."
   ```

## Astuces et bonnes pratiques

1. **Commencez chaque projet par la configuration du thème** via la page `/theme` (import CSS) ou `tailwind.config.ts` (thème permanent).
2. **Créez d'abord la structure globale** puis affinez les détails.
3. **Utilisez abondamment les composants réutilisables** (DaisyUI ou vos propres atomes/molécules).
4. **Documentez les décisions de design** importantes.
5. **Testez régulièrement sur différents appareils**.
6. **Utilisez le système A/B** pour explorer des options, mais n'oubliez pas de choisir une version finale.

Suivez ce workflow pour créer rapidement des maquettes web interactives et professionnelles qui respectent les chartes graphiques de vos clients, tout en tirant parti de la puissance de l'IA pour accélérer votre processus créatif.
