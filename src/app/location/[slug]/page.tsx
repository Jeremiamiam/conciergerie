import React from 'react';
import Link from 'next/link';
import { locations } from '@/data/locations.json';
import { services } from '@/data/services.json';
import { categories } from '@/data/categories.json';

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

  // Appliquer des couleurs différentes en fonction du lieu (vert pour La Cabane, bleu pour les autres)
  const isLaCabane = location.slug === 'lacabane';
  const primaryColor = isLaCabane ? 'green-600' : 'indigo-600';
  const primaryHoverColor = isLaCabane ? 'green-800' : 'indigo-800';
  const darkPrimaryColor = isLaCabane ? 'green-700' : 'indigo-700';
  const darkerPrimaryColor = isLaCabane ? 'green-800' : 'indigo-800';
  const lightPrimaryColor = isLaCabane ? 'green-100' : 'indigo-100';
  const primaryBgGradient = isLaCabane 
    ? 'linear-gradient(rgba(22, 101, 52, 0.8), rgba(22, 101, 52, 0.8))' 
    : 'linear-gradient(rgba(67, 56, 202, 0.8), rgba(67, 56, 202, 0.8))';
  const primaryBgOpacity = isLaCabane ? 'green-800 bg-opacity-50' : 'indigo-800 bg-opacity-50';
  const lightBgColor = isLaCabane ? 'green-50' : 'indigo-50';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className={`w-12 h-12 bg-${primaryColor} rounded-full mr-4`}></div>
              <h1 className="text-2xl font-bold text-gray-900">Les Conciergeries Rennaises</h1>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className={`text-gray-500 hover:text-${primaryColor}`}>Accueil</Link>
              <Link href="/#services" className={`text-gray-500 hover:text-${primaryColor}`}>Services</Link>
              <Link href="/#locations" className={`text-gray-500 hover:text-${primaryColor}`}>Nos espaces</Link>
              <Link href="/#about" className={`text-gray-500 hover:text-${primaryColor}`}>À propos</Link>
              <Link href="/#contact" className={`text-gray-500 hover:text-${primaryColor}`}>Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className={`bg-${darkPrimaryColor} text-white py-20`}
        style={{ 
          backgroundImage: primaryBgGradient, 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{location.name}</h1>
            <p className="text-xl mb-6">{location.description}</p>
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <div className={`bg-${primaryBgOpacity} px-4 py-2 rounded-full`}>
                <strong>Adresse:</strong> {location.address}
              </div>
              <div className={`bg-${primaryBgOpacity} px-4 py-2 rounded-full`}>
                <strong>Horaires:</strong> {location.openingHours}
              </div>
            </div>
            <div className="flex gap-4">
              <button className={`bg-white text-${darkPrimaryColor} px-6 py-3 rounded-lg font-medium`}>
                Nos services
              </button>
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium">
                Événements
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
              {isLaCabane && (
                <p className="text-gray-600 mt-2 max-w-md">
                  Votre concierge est un professionnel des Conciergeries Rennaises, 
                  présent pour faciliter votre quotidien et coordonner tous les services proposés.
                </p>
              )}
            </div>
            <div className="flex flex-col items-center md:items-end">
              <h3 className="text-xl font-bold mb-2">Services disponibles</h3>
              <p className={`text-3xl font-bold text-${primaryColor}`}>{location.availableServices.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isLaCabane 
              ? "Services de conciergerie disponibles" 
              : "Services disponibles"}
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            {isLaCabane 
              ? "Tous les services ci-dessous sont proposés et coordonnés par Les Conciergeries Rennaises dans l'espace La Cabane. Notre équipe de concierges se charge de faciliter votre quotidien."
              : "Découvrez les services que nous proposons dans cet espace de conciergerie."}
          </p>
          
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button className={`bg-${primaryColor} text-white px-4 py-2 rounded-full`}>
              Tous
            </button>
            {categories
              .filter(category => Object.keys(servicesByCategory).includes(category.id))
              .map(category => (
                <button 
                  key={category.id} 
                  className={`bg-white text-gray-700 hover:bg-${lightPrimaryColor} hover:text-${primaryColor} px-4 py-2 rounded-full border`}
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
                  <span className={`w-10 h-10 bg-${lightPrimaryColor} text-${primaryColor} rounded-full flex items-center justify-center mr-3`}>
                    {category?.icon}
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
                          <button className={`text-${primaryColor} hover:text-${primaryHoverColor}`}>
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

      {/* Events Section */}
      {location.events && location.events.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Événements à venir</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {location.events.map((event) => (
                <div key={event.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className={`text-sm text-${primaryColor} mb-2`}>
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <h3 className="font-bold text-xl mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <button className={`bg-${primaryColor} text-white px-4 py-2 rounded-md w-full`}>
                      S'inscrire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className={`py-16 bg-${lightBgColor}`}>
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
                  <div className={`w-12 h-12 bg-${lightPrimaryColor} rounded-full flex items-center justify-center mr-4`}>
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
                  <button type="submit" className={`bg-${primaryColor} text-white px-6 py-3 rounded-md font-medium w-full`}>
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
                <button className={`bg-${primaryColor} text-white px-4 py-2 rounded-r-md`}>OK</button>
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