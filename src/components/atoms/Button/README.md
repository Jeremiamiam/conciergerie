# Composant Button

Un composant bouton flexible et réutilisable qui supporte différentes variantes et tailles.

## Utilisation

```tsx
import { Button } from '@/components/atoms/Button';

// Bouton standard
<Button>
  Cliquez-moi
</Button>

// Bouton avec variante
<Button variant="outline">
  Bouton outline
</Button>

// Bouton avec taille spécifique
<Button size="lg">
  Grand bouton
</Button>

// Bouton désactivé
<Button disabled>
  Désactivé
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Style du bouton |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du bouton |
| `isLoading` | `boolean` | `false` | État de chargement |
| `disabled` | `boolean` | `false` | État désactivé |
| `fullWidth` | `boolean` | `false` | Largeur complète |

Le composant accepte également toutes les props HTML standard de `<button>`.

## Styles

Le composant utilise Tailwind CSS pour le styling et s'adapte automatiquement au thème actif (clair/sombre).

### Variantes
- `solid` : Fond coloré, texte blanc
- `outline` : Bordure colorée, fond transparent
- `ghost` : Fond transparent, texte coloré

### Tailles
- `sm` : Padding réduit, texte plus petit
- `md` : Taille standard
- `lg` : Padding augmenté, texte plus grand

### États
- Normal : `bg-primary text-white`
- Hover : `hover:bg-primary-dark`
- Disabled : `opacity-50 cursor-not-allowed`
- Loading : Affiche un indicateur de chargement 