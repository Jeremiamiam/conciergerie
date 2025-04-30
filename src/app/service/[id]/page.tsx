import React from 'react';
import Link from 'next/link';
import { services } from '@/data/services.json';
import { locations } from '@/data/locations.json';
import { categories } from '@/data/categories.json';
import { HomeIcon, BuildingOffice2Icon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import MainNav from '@/components/organisms/MainNav';

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
      <MainNav activePage="services" />

      {/* Breadcrumb */}
      <nav className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600">Accueil</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-red-600">Services</Link>
            <span>/</span>
            <span className="text-red-600">{service.name}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center mb-4">
                {category && (
                  <span className="bg-red-700 text-white px-3 py-1 rounded-full text-sm">
                    {category.name}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
              <p className="text-xl text-red-100">{service.description}</p>
            </div>
            <div className="hidden md:block w-1/3">
              <div className="bg-red-700 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">À propos de ce service</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">{service.description}</p>
                {/* Ajoutez ici plus de contenu sur le service */}
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Disponible dans ces espaces</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {availableLocations.map((location) => (
                    <Link
                      key={location.id}
                      href={`/location/${location.slug}`}
                      className="flex items-center p-4 border rounded-lg hover:border-red-600 transition-colors"
                    >
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                        <BuildingOffice2Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{location.name}</h4>
                        <p className="text-sm text-gray-500">{location.address}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                <h3 className="text-lg font-bold mb-4">Informations pratiques</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Prestataire</h4>
                    <p className="text-gray-600">{service.provider}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Délai moyen</h4>
                    <p className="text-gray-600">{service.deliveryDay}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Tarifs</h4>
                    <p className="text-gray-600">Sur devis</p>
                  </div>
                  <Link
                    href="/#contact"
                    className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-md text-center hover:bg-red-700 transition-colors inline-block"
                  >
                    Nous contacter pour ce service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Services similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarServices.map((similarService) => (
              <Link
                key={similarService.id}
                href={`/service/${similarService.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{similarService.name}</h3>
                  <p className="text-gray-600 mb-4">{similarService.description}</p>
                  <span className="text-red-600 font-medium">En savoir plus →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 