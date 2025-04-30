'use client';

import React from 'react';
import Link from 'next/link';
import MainNav from '@/components/organisms/MainNav';
import { locations } from '@/data/locations.json';
import { services } from '@/data/services.json';
import { 
  MapPinIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

export default function EspacesPage() {
  // Filtrer uniquement les espaces publics
  const publicLocations = locations.filter(location => 
    location.id === "lacabane" || location.id === "colivia"
  );
  
  // Espaces privés pour la section informative
  const privateLocations = locations.filter(location => 
    location.id !== "lacabane" && location.id !== "colivia"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <MainNav activePage="locations" />

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Nos espaces de conciergerie</h1>
            <p className="text-xl">
              Découvrez nos espaces de conciergerie ouverts aux particuliers et professionnels,
              où vous attendent des services de qualité pour faciliter votre quotidien.
            </p>
          </div>
        </div>
      </section>

      {/* Public Spaces */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">Conciergeries publiques</h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Nos espaces de conciergerie ouverts à tous, proposant une large gamme de services
            aux habitants et professionnels des quartiers environnants.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publicLocations.map((location) => (
              <div key={location.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-200 relative">
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-2xl font-bold text-white">{location.name}</h3>
                    <div className="flex items-center text-gray-200">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{location.address}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{location.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <ClockIcon className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Horaires</h4>
                        <p className="text-sm text-gray-500">{location.openingHours}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <UserIcon className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Contact</h4>
                        <p className="text-sm text-gray-500">{location.contactPerson}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <PhoneIcon className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Téléphone</h4>
                        <p className="text-sm text-gray-500">{location.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <EnvelopeIcon className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Email</h4>
                        <p className="text-sm text-gray-500">{location.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-3">Services populaires</h4>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {location.availableServices.slice(0, 4).map(serviceId => {
                      const service = services.find(s => s.id === serviceId);
                      return service ? (
                        <div key={service.id} className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                          {service.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                  
                  <Link 
                    href={`/location/${location.slug}`} 
                    className="mt-4 bg-red-600 text-white w-full py-2 rounded-md flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <span>En savoir plus</span>
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Spaces */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">Conciergeries d'entreprise</h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Nos conciergeries d'entreprise sont accessibles uniquement aux salariés des entreprises partenaires.
            Pour plus d'informations, contactez-nous.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privateLocations.map((location) => (
              <div key={location.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <BuildingOffice2Icon className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{location.name}</h3>
                    <div className="text-xs text-gray-500 flex items-center">
                      <MapPinIcon className="h-3 w-3 mr-1" />
                      <span>{location.address}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{location.description}</p>
                <div className="flex items-center mb-3">
                  <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">{location.openingHours}</span>
                </div>
                <Link
                  href="/connexion"
                  className="mt-2 flex items-center justify-center text-sm text-red-700 bg-red-100 px-3 py-2 rounded-md hover:bg-red-200 transition-colors"
                >
                  <LockClosedIcon className="h-4 w-4 mr-2" />
                  <span>Accès réservé</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Vous souhaitez implanter une conciergerie dans votre entreprise ?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Offrez un service de qualité à vos collaborateurs et améliorez leur qualité de vie au travail.
            Contactez-nous pour discuter de votre projet.
          </p>
          <Link 
            href="/contact" 
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center hover:bg-red-700 transition-colors"
          >
            <span>Nous contacter</span>
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
} 