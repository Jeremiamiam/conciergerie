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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full mr-4"></div>
              <h1 className="text-2xl font-bold text-gray-900">Les Conciergeries Rennaises</h1>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-500 hover:text-indigo-600">Accueil</Link>
              <Link href="/#services" className="text-gray-500 hover:text-indigo-600">Services</Link>
              <Link href="/#locations" className="text-gray-500 hover:text-indigo-600">Nos espaces</Link>
              <Link href="/#about" className="text-gray-500 hover:text-indigo-600">À propos</Link>
              <Link href="/#contact" className="text-gray-500 hover:text-indigo-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="bg-indigo-700 text-white py-20"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(67, 56, 202, 0.8), rgba(67, 56, 202, 0.8))', 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{location.name}</h1>
            <p className="text-xl mb-6">{location.description}</p>
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <div className="bg-indigo-800 bg-opacity-50 px-4 py-2 rounded-full">
                <strong>Adresse:</strong> {location.address}
              </div>
              <div className="bg-indigo-800 bg-opacity-50 px-4 py-2 rounded-full">
                <strong>Horaires:</strong> {location.openingHours}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-medium">
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
            </div>
            <div className="flex flex-col items-center md:items-end">
              <h3 className="text-xl font-bold mb-2">Services disponibles</h3>
              <p className="text-3xl font-bold text-indigo-600">{location.availableServices.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Services disponibles</h2>
          
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full">
              Tous
            </button>
            {categories
              .filter(category => Object.keys(servicesByCategory).includes(category.id))
              .map(category => (
                <button 
                  key={category.id} 
                  className="bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 px-4 py-2 rounded-full border"
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
                  <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3">
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
                          <button className="text-indigo-600 hover:text-indigo-800">
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
                    <div className="text-sm text-indigo-600 mb-2">
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
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full">
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
      <section className="py-16 bg-indigo-50">
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
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
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
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between flex-col md:flex-row">
            <div>
              <h3 className="text-xl font-bold mb-4">Les Conciergeries Rennaises</h3>
              <p className="text-gray-400 max-w-md">
                Première conciergerie d'entreprises créée à Rennes, intervenant à Rennes, 
                Angers, Brest et Quimper.
              </p>
            </div>
            
            <div className="mt-8 md:mt-0">
              <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-block">
                Retour à l'accueil
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left">
            <p className="text-gray-400">© {new Date().getFullYear()} Les Conciergeries Rennaises. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 