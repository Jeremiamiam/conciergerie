# Mock Data pour la plateforme de Conciergerie

Ce répertoire contient les données fictives (mock data) pour le prototype de la plateforme des Conciergeries Rennaises.

## Structure des fichiers

### `services.json`
Contient tous les services proposés par Les Conciergeries Rennaises, indépendamment du lieu où ils sont disponibles.

Structure :
```json
{
  "services": [
    {
      "id": "string",                    // Identifiant unique du service
      "category": "string",              // Catégorie du service (correspond à l'ID dans categories.json)
      "name": "string",                  // Nom du service
      "provider": "string",              // Prestataire du service
      "description": "string",           // Courte description
      "location": "string",              // Localisation du prestataire
      "process": "string",               // Processus de commande
      "deliveryDay": "string",           // Jour de livraison/prestation
      "contact": "string",               // Contact du prestataire
      "image": "string"                  // Chemin vers l'image du service
    }
  ]
}
```

### `locations.json`
Contient les différents lieux de conciergerie et les informations sur l'entreprise.

Structure pour les lieux :
```json
{
  "locations": [
    {
      "id": "string",                    // Identifiant unique du lieu
      "name": "string",                  // Nom du lieu
      "slug": "string",                  // Slug pour l'URL
      "description": "string",           // Description du lieu
      "address": "string",               // Adresse physique
      "image": "string",                 // Image principale du lieu
      "coverImage": "string",            // Image de couverture du lieu
      "openingHours": "string",          // Horaires d'ouverture
      "contactPerson": "string",         // Personne de contact
      "email": "string",                 // Email de contact
      "phone": "string",                 // Téléphone de contact
      "availableServices": ["string"],   // IDs des services disponibles dans ce lieu
      "events": [                        // Événements spécifiques à ce lieu
        {
          "id": "string",
          "title": "string",
          "date": "string",
          "description": "string",
          "image": "string"
        }
      ]
    }
  ],
  "company": {                           // Informations sur l'entreprise
    "name": "string",
    "founding": "string",
    "description": "string",
    "mission": "string",
    "impact": {
      "title": "string",
      "description": "string",
      "stats": [
        {
          "value": "string",
          "label": "string"
        }
      ]
    },
    "benefits": ["string"],
    "contact": {
      "address": "string",
      "email": "string",
      "phone": "string",
      "website": "string"
    }
  }
}
```

### `categories.json`
Contient les catégories de services pour le filtrage.

Structure :
```json
{
  "categories": [
    {
      "id": "string",                    // Identifiant unique de la catégorie
      "name": "string",                  // Nom de la catégorie
      "icon": "string",                  // Nom de l'icône (compatible avec la bibliothèque d'icônes utilisée)
      "description": "string"            // Description de la catégorie
    }
  ]
}
```

## Utilisation

Ces données sont conçues pour être utilisées dans un prototype de plateforme avec :

1. Une page d'accueil générale des Conciergeries Rennaises montrant tous les services et lieux disponibles
2. Des pages dédiées à chaque lieu de conciergerie ne montrant que les services disponibles à cet endroit

Pour obtenir les services disponibles dans un lieu spécifique, filtrez les services par ID en utilisant le tableau `availableServices` du lieu concerné. 