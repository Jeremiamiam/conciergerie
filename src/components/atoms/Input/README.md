# Composant Input

Un composant de saisie flexible qui supporte à la fois les champs de texte simples et les zones de texte.

## Utilisation

```tsx
import { Input } from '@/components/atoms/Input';

// Input simple
<Input
  label="Nom"
  placeholder="Entrez votre nom"
/>

// Input avec erreur
<Input
  label="Email"
  type="email"
  error="L'email est invalide"
  placeholder="Entrez votre email"
/>

// Textarea
<Input
  label="Message"
  as="textarea"
  rows={4}
  placeholder="Votre message"
/>

// Input avec icônes
<Input
  label="Recherche"
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
  placeholder="Rechercher..."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label du champ |
| `error` | `string` | - | Message d'erreur |
| `helperText` | `string` | - | Texte d'aide |
| `leftIcon` | `ReactNode` | - | Icône à gauche |
| `rightIcon` | `ReactNode` | - | Icône à droite |
| `as` | `'input' \| 'textarea'` | `'input'` | Type de champ |
| `rows` | `number` | `3` | Nombre de lignes (textarea) |

Le composant accepte également toutes les props HTML standard de `<input>` et `<textarea>`.

## Styles

Le composant utilise Tailwind CSS pour le styling et s'adapte automatiquement au thème actif (clair/sombre).

- Bordure standard : `border-neutral`
- Focus : `ring-2 ring-primary/20`
- Erreur : `border-error`
- Texte d'aide/erreur : `text-gray-500`/`text-red-500` 