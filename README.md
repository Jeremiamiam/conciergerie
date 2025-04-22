# Les Conciergeries Rennaises - Prototype

Ce projet est une maquette de la plateforme web des Conciergeries Rennaises, qui permet aux utilisateurs de découvrir les services de conciergerie disponibles et d'accéder à leurs espaces dédiés.

## Fonctionnalités

- Page d'accueil présentant les services et espaces disponibles
- Page de connexion pour accéder aux espaces dédiés (La Cabane, Arkea, PEI)
- Pages détaillées pour chaque espace avec les services disponibles spécifiquement dans cet espace
- Pages détaillées pour chaque service
- Interface responsive adaptée à tous les appareils

## Structure du projet

Le projet est construit avec Next.js et Tailwind CSS, avec une architecture modulaire :

- `src/app/page.tsx` : Page d'accueil
- `src/app/connexion/page.tsx` : Page de connexion
- `src/app/location/[slug]/page.tsx` : Modèle pour les pages d'espaces dédiés
- `src/app/service/[id]/page.tsx` : Modèle pour les pages de services
- `src/data/` : Dossier contenant les données mock pour le prototype

## Installation locale

```bash
# Cloner le dépôt
git clone https://github.com/Jeremiamiam/conciergerie.git

# Naviguer dans le dossier
cd conciergerie

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## Démonstration en ligne

Une démonstration du prototype est disponible à l'adresse suivante :
https://jeremiamiam.github.io/conciergerie/

## Licence

Ce projet est un prototype à des fins de démonstration uniquement.
