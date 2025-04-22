import React from 'react';
import Link from 'next/link';
import { services } from '@/data/services.json';
import { locations } from '@/data/locations.json';
import { categories } from '@/data/categories.json';

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export default function ServicePage({ params }: { params: { id: string } }) {
  // Trouver le service correspondant à l'ID
  const service = services.find((s) => s.id === params.id);
  
  if (!service) {
    return <div>Service non trouvé</div>;
  }

  // Trouver la catégorie du service
  const category = categories.find(c => c.id === service.category);
  
  // Trouver les lieux où ce service est disponible
  const availableLocations = locations.filter(location => 
    location.availableServices.includes(service.id)
  );
  
  // Trouver des services similaires (même catégorie)
  const similarServices = services
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

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

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600">Accueil</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-indigo-600">Services</Link>
            <span>/</span>
            <Link href="#" className="hover:text-indigo-600">{category?.name}</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{service.name}</span>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm mb-4">
                {category?.name}
              </div>
              <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
              <div className="flex items-center mb-6">
                <span className="font-medium mr-2">Prestataire:</span>
                <span className="text-indigo-600">{service.provider}</span>
              </div>
              
              <p className="text-gray-700 mb-8 text-lg">{service.description}</p>
              
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                <h2 className="text-xl font-bold mb-4">Informations pratiques</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-36 font-medium">Localisation:</div>
                    <div>{service.location}</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium">Jour de livraison:</div>
                    <div>{service.deliveryDay}</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium">Processus:</div>
                    <div>{service.process}</div>
                  </div>
                  <div className="flex">
                    <div className="w-36 font-medium">Contact:</div>
                    <div>{service.contact}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium flex-1">
                  Passer commande
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex-1">
                  Contacter le prestataire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Locations */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Où trouver ce service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableLocations.map(location => (
              <Link key={location.id} href={`/location/${location.slug}`}>
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gray-200"></div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{location.description}</p>
                    <div className="text-sm text-gray-500">{location.address}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Comment ça marche</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Demandez auprès du concierge</h3>
              <p className="text-gray-600">
                Contactez votre concierge pour passer votre commande ou obtenir plus d'informations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Nous prenons en charge votre demande</h3>
              <p className="text-gray-600">
                Le concierge s'occupe de tout pour vous, en contactant le prestataire et en organisant la livraison.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Récupérez votre commande</h3>
              <p className="text-gray-600">
                Récupérez votre commande auprès du concierge le jour de livraison prévu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Services */}
      {similarServices.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Services similaires</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarServices.map(similarService => (
                <Link key={similarService.id} href={`/service/${similarService.id}`}>
                  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{similarService.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{similarService.description}</p>
                      <span className="text-sm font-medium text-indigo-600">
                        {similarService.provider}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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