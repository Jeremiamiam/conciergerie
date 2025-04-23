import React from 'react';
import Link from 'next/link';
import { locations } from '@/data/locations.json';
import { services } from '@/data/services.json';
import { categories } from '@/data/categories.json';
import { HomeIcon } from '@heroicons/react/24/outline';

export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  // Trouver le lieu correspondant au slug
  const location = locations.find((loc) => loc.slug === params.slug);
  
  if (!location) {
    return <div>Lieu non trouvé</div>;
  }
  
  // Filtrer les services disponibles dans ce lieu
  const availableServices = services.filter((service) => 
    location.availableServices.includes(service.id)
  );
  
  // Grouper les services par catégorie
  const servicesByCategory = availableServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  // Appliquer des couleurs différentes en fonction du lieu
  // Une couleur unique pour chaque espace
  const getLocationColors = () => {
    switch (location.slug) {
      case 'lacabane': // Vert pour La Cabane
        return {
          primary: '#16a34a', // green-600
          hover: '#166534', // green-800
          dark: '#15803d', // green-700
          darker: '#166534', // green-800
          light: '#dcfce7', // green-100
          bgGradient: 'linear-gradient(rgba(22, 101, 52, 0.8), rgba(22, 101, 52, 0.8))',
          bgOpacity: 'green-800 bg-opacity-50',
          lightBg: 'green-50'
        };
      case 'arkea': // Violet pour Arkea
        return {
          primary: '#9333ea', // purple-600
          hover: '#6b21a8', // purple-800
          dark: '#7e22ce', // purple-700
          darker: '#6b21a8', // purple-800
          light: '#f3e8ff', // purple-100
          bgGradient: 'linear-gradient(rgba(126, 34, 206, 0.8), rgba(126, 34, 206, 0.8))',
          bgOpacity: 'purple-800 bg-opacity-50',
          lightBg: 'purple-50'
        };
      case 'pei': // Orange pour PEI
        return {
          primary: '#f97316', // orange-500
          hover: '#c2410c', // orange-700
          dark: '#ea580c', // orange-600
          darker: '#c2410c', // orange-700
          light: '#ffedd5', // orange-100
          bgGradient: 'linear-gradient(rgba(234, 88, 12, 0.8), rgba(234, 88, 12, 0.8))',
          bgOpacity: 'orange-700 bg-opacity-50',
          lightBg: 'orange-50'
        };
      default: // Bleu par défaut
        return {
          primary: '#4f46e5', // indigo-600
          hover: '#3730a3', // indigo-800
          dark: '#4338ca', // indigo-700
          darker: '#3730a3', // indigo-800
          light: '#e0e7ff', // indigo-100
          bgGradient: 'linear-gradient(rgba(67, 56, 202, 0.8), rgba(67, 56, 202, 0.8))',
          bgOpacity: 'indigo-800 bg-opacity-50',
          lightBg: 'indigo-50'
        };
    }
  };

  const colors = getLocationColors();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className={`w-12 h-12 bg-${colors.primary} rounded-full mr-4 flex items-center justify-center`}>
                  <HomeIcon className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Les Conciergeries Rennaises</h1>
              </Link>
            </div>
            <nav className="flex space-x-6">
              <Link href="/#services" className={`text-gray-500 hover:text-${colors.primary}`}>Services</Link>
              <Link href="/#locations" className={`text-gray-500 hover:text-${colors.primary}`}>Nos espaces</Link>
              <Link href="/#about" className={`text-gray-500 hover:text-${colors.primary}`}>À propos</Link>
              <Link href="/#contact" className={`text-gray-500 hover:text-${colors.primary}`}>Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className={`bg-${colors.dark} text-white py-20`}
        style={{ 
          backgroundImage: colors.bgGradient, 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{location.name}</h1>
            <p className="text-xl mb-6">{location.description}</p>
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                <strong>Adresse:</strong> {location.address}
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                <strong>Horaires:</strong> {location.openingHours}
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                className="bg-white px-6 py-3 rounded-lg font-medium"
                style={{ color: colors.dark }}
              >
                Nos services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Votre concierge</h2>
              <p className="text-gray-600">{location.contactPerson}</p>
              <p className="text-gray-600">{location.email}</p>
              <p className="text-gray-600">{location.phone}</p>
              {location.slug === 'lacabane' && (
                <p className="text-gray-600 mt-2 max-w-md">
                  Votre concierge est un professionnel des Conciergeries Rennaises, 
                  présent pour faciliter votre quotidien et coordonner tous les services proposés.
                </p>
              )}
            </div>
            <div className="flex flex-col items-center md:items-end">
              <h3 className="text-xl font-bold mb-2">Services disponibles</h3>
              <p className={`text-3xl font-bold text-${colors.primary}`}>{location.availableServices.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {location.slug === 'lacabane' 
              ? "Services de conciergerie disponibles" 
              : "Services disponibles"}
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            {location.slug === 'lacabane' 
              ? "Tous les services ci-dessous sont proposés et coordonnés par Les Conciergeries Rennaises dans l'espace La Cabane. Notre équipe de concierges se charge de faciliter votre quotidien."
              : "Découvrez les services que nous proposons dans cet espace de conciergerie."}
          </p>
          
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button className={`bg-${colors.primary} text-white px-4 py-2 rounded-full`}>
              Tous
            </button>
            {categories
              .filter(category => Object.keys(servicesByCategory).includes(category.id))
              .map(category => (
                <button 
                  key={category.id} 
                  className={`bg-white text-gray-700 hover:bg-${colors.light} hover:text-${colors.primary} px-4 py-2 rounded-full border`}
                >
                  {category.name}
                </button>
              ))
            }
          </div>
          
          {/* Liste des services par catégorie */}
          {Object.entries(servicesByCategory).map(([categoryId, categoryServices]) => {
            const category = categories.find(c => c.id === categoryId);
            
            return (
              <div key={categoryId} className="mb-16">
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <span className={`w-10 h-10 bg-${colors.light} text-${colors.primary} rounded-full flex items-center justify-center mr-3`}>
                    {/* Suppression de l'icône qui cause la superposition */}
                  </span>
                  {category?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-6">
                        <h4 className="font-bold text-xl mb-2">{service.name}</h4>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-800">
                            {service.provider}
                          </span>
                          <button className={`text-${colors.primary} hover:text-${colors.hover}`}>
                            Détails
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-16 bg-${colors.lightBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
              <p className="text-gray-600 mb-8">
                Pour toute question concernant les services de conciergerie à {location.name}, 
                n'hésitez pas à contacter votre concierge ou à remplir le formulaire ci-contre.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-${colors.light} rounded-full flex items-center justify-center mr-4`}>
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold">{location.contactPerson}</h3>
                    <p className="text-gray-600">Votre concierge</p>
                  </div>
                </div>
                <div className="space-y-2 pl-16">
                  <p className="text-gray-600">{location.email}</p>
                  <p className="text-gray-600">{location.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-6">Formulaire de contact</h3>
              <form>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <button type="submit" className={`bg-${colors.primary} text-white px-6 py-3 rounded-md font-medium w-full`}>
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Les Conciergeries Rennaises</h3>
              <p className="text-gray-400">
                Première conciergerie d'entreprises créée à Rennes en 2009.
              </p>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Accueil</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-white">Services</Link></li>
                <li><Link href="/#locations" className="text-gray-400 hover:text-white">Espaces</Link></li>
                <li><Link href="/#about" className="text-gray-400 hover:text-white">À propos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>12 Rue des Conciergeries, 35000 Rennes</li>
                <li>contact@lesconciergeriesrennaises.fr</li>
                <li>02 XX XX XX XX</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Inscrivez-vous à notre newsletter</h4>
              <div className="flex">
                <input type="email" placeholder="Votre email" className="px-4 py-2 w-full rounded-l-md" />
                <button className={`bg-${colors.primary} text-white px-4 py-2 rounded-r-md`}>OK</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Les Conciergeries Rennaises. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 