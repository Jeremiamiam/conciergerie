# UX Template React

Un environnement de prototypage UX/UI basé sur React et DaisyUI pour la création rapide de maquettes web interactives.

## 🚀 Caractéristiques

- 🎨 **Système de design modulaire** - Changez facilement les couleurs, polices et styles
- 🔄 **Tests A/B intégrés** - Comparez différentes versions d'interface via un simple bouton
- 🧩 **Composants préfabriqués** - Bibliothèque de composants UI basée sur DaisyUI et Tailwind
- 📱 **Responsive par défaut** - Conçu pour fonctionner sur tous les appareils
- 🤖 **Optimisé pour l'IA** - Structure claire pour faciliter la génération de code avec Claude

## 📋 Prérequis

- Node.js (v14+)
- npm ou yarn
- Git

## 🛠️ Installation

### Pour démarrer un nouveau projet à partir du template

```bash
# 1. Clonez ou copiez le dossier template
cp -r template-ux/ mon-nouveau-projet/

# 2. Accédez au dossier du nouveau projet
cd mon-nouveau-projet

# 3. Installez les dépendances
npm install

# 4. Lancez le serveur de développement
npm start
```

## 📚 Structure du Projet

```
template-ux/
├── public/                 # Ressources statiques
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── ui/             # Éléments d'interface de base
│   │   ├── layout/         # Structures de page
│   │   └── sections/       # Sections de page réutilisables
│   ├── pages/              # Pages complètes
│   │   └── variants/       # Variantes A/B des pages
│   ├── styles/             # Styles globaux
│   ├── context/            # Contextes React (Design System, A/B Testing)
│   ├── utils/              # Fonctions utilitaires
│   ├── App.js              # Composant principal
│   └── index.js            # Point d'entrée
└── package.json            # Dépendances
```

## 🎨 Système de Design

Le système de design est accessible via le bouton "Design System" situé en haut à droite de l'interface. Il permet de :

- Modifier les couleurs principales
- Changer les polices de caractères
- Ajuster les espacements et les rayons de bordure
- Exporter/importer des configurations de design

### Modification des couleurs

Le template utilise cinq couleurs principales que vous pouvez personnaliser :

- **Primary** : Couleur principale de la marque
- **Secondary** : Couleur secondaire pour les accents
- **Accent** : Couleur d'accentuation pour les éléments interactifs
- **Neutral** : Couleur neutre pour le texte et les fonds
- **Base** : Couleur de fond principale

### Modification des polices

Vous pouvez sélectionner parmi une liste de polices Google Fonts pour :

- **Font Primary** : Police principale pour les titres
- **Font Secondary** : Police secondaire pour le corps de texte
- **Font Accent** : Police d'accentuation pour les éléments spéciaux

## 🔄 Tests A/B

Le système de tests A/B permet de créer et de comparer différentes versions d'une même interface.

- Utilisez le bouton "Toggle A/B" en haut de l'interface pour basculer entre les variantes
- Créez vos variantes dans le dossier `src/pages/variants/`
- Chaque variante peut avoir des composants, des styles et des layouts différents

## 🧩 Utilisation des Composants

Les composants sont organisés en trois catégories :

- **UI** : Boutons, inputs, cartes, alertes, etc.
- **Layout** : Grilles, conteneurs, headers, footers, etc.
- **Sections** : Blocs de contenu réutilisables (hero, features, testimonials, etc.)

Exemple d'utilisation :

```jsx
import { Button } from '../components/ui/Button';
import { Container } from '../components/layout/Container';
import { Hero } from '../components/sections/Hero';

const MyPage = () => {
  return (
    <Container>
      <Hero 
        title="Mon super titre" 
        subtitle="Une description accrocheuse"
        ctaText="En savoir plus" 
      />
      <Button variant="primary">Cliquez-moi</Button>
    </Container>
  );
};
```

## 🔧 Configuration

### Tailwind CSS

La configuration de Tailwind se trouve dans le fichier `tailwind.config.js`. Elle est déjà configurée pour utiliser les variables du système de design, mais vous pouvez l'ajuster selon vos besoins.

### DaisyUI

DaisyUI est configuré pour utiliser les couleurs du système de design. Vous pouvez ajouter ou modifier les composants dans le dossier `src/components/ui/`.

## 🤖 Utilisation avec Claude

Ce template est optimisé pour être utilisé avec Claude. Voici quelques bonnes pratiques :

- Décrivez clairement ce que vous souhaitez créer
- Spécifiez le composant et son emplacement dans la structure
- Indiquez les propriétés et comportements attendus
- Référencez les composants existants que vous souhaitez réutiliser

Exemple de prompt pour Claude :

```
Crée un composant de carousel pour la page d'accueil qui :
- Affiche 3 slides avec des images et du texte
- Permet la navigation par flèches et indicateurs
- S'adapte aux écrans mobiles
- Utilise le système de design (couleurs primaires et secondaires)
- Doit être placé dans src/components/sections/Carousel.js
```

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 👨‍💻 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests ou à ouvrir des issues pour améliorer ce template.

## 📞 Support

Pour toute question ou problème, veuillez contacter [votre-email@exemple.com].
