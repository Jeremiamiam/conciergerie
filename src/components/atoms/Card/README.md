# Composant Card

Un composant carte modulaire avec support pour en-tête, corps et pied de carte.

## Utilisation

```tsx
import { Card } from '@/components/atoms/Card';

// Carte simple
<Card>
  <Card.Body>
    Contenu de la carte
  </Card.Body>
</Card>

// Carte complète
<Card isHoverable>
  <Card.Header>
    <h2>Titre de la carte</h2>
  </Card.Header>
  <Card.Body>
    Contenu principal
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Carte avec ombre personnalisée
<Card shadow="lg">
  <Card.Body>
    Contenu avec grande ombre
  </Card.Body>
</Card>
```

## Props

### Card
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isHoverable` | `boolean` | `false` | Active l'effet de survol |
| `shadow` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille de l'ombre |
| `className` | `string` | - | Classes CSS additionnelles |

### Card.Header
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Classes CSS additionnelles |

### Card.Body
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Classes CSS additionnelles |

### Card.Footer
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Classes CSS additionnelles |

## Styles

Le composant utilise Tailwind CSS pour le styling et s'adapte automatiquement au thème actif (clair/sombre).

### Carte
- Base : `bg-background border border-neutral rounded-lg`
- Hover : `hover:shadow-lg hover:-translate-y-1` (si isHoverable)

### En-tête
- Base : `px-6 py-4 border-b border-neutral`

### Corps
- Base : `px-6 py-4`

### Pied
- Base : `px-6 py-4 border-t border-neutral`

## Sous-composants

Le composant Card est composé de trois sous-composants :
- `Card.Header` : Pour l'en-tête de la carte
- `Card.Body` : Pour le contenu principal
- `Card.Footer` : Pour le pied de la carte

Chaque sous-composant peut être utilisé de manière indépendante dans la carte. 