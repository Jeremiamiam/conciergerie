'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { locations, company } from '@/data/locations.json';
import { services } from '@/data/services.json';
import { categories } from '@/data/categories.json';
import { 
  HomeIcon,
  BuildingOffice2Icon, 
  HeartIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  CalendarIcon,
  TruckIcon,
  ArrowRightIcon,
  UserGroupIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import MainNav from '@/components/organisms/MainNav';

export default function HomePage() {
  // Fonction pour le défilement fluide
  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Décalage pour tenir compte de la hauteur du header
        behavior: 'smooth'
      });
    }
  }, []);

  // Fonction pour obtenir l'icône correspondante à une catégorie
  const getCategoryIcon = (iconName: string, className = "h-6 w-6") => {
    switch(iconName) {
      case 'ShoppingBasket':
        return <ShoppingBagIcon className={className} />;
      case 'Briefcase':
        return <BriefcaseIcon className={className} />;
      case 'Heart':
        return <HeartIcon className={className} />;
      case 'Car':
        return <TruckIcon className={className} />;
      case 'Calendar':
        return <CalendarIcon className={className} />;
      default:
        return <CurrencyDollarIcon className={className} />;
    }
  };

  // Filtrer uniquement les espaces publics (La Cabane et Colivia)
  const publicLocations = locations.filter(location => 
    location.id === "lacabane" || location.id === "colivia"
  );

  console.log("Espaces publics :", publicLocations); // Pour vérifier que les deux espaces sont bien filtrés

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <MainNav activePage="home" />

      {/* Hero Section */}
      <section className="bg-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Services de conciergerie pour simplifier votre quotidien</h2>
              <p className="text-xl mb-8">{company.description}</p>
              <div className="flex space-x-4">
                <a 
                  href="#services" 
                  className="bg-white text-red-700 px-6 py-3 rounded-lg font-medium flex items-center"
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                >
                  <span>Découvrir nos services</span>
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-red-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-green-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">{company.impact.title}</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">{company.impact.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.impact.stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-4xl font-bold text-green-600 mb-2">{stat.value}</p>
                <p className="text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
            >
              En savoir plus sur notre démarche
            </a>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 bg-gray-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Nos services</h2>
          <div className="text-center mb-8">
            <Link 
              href="/services"
              className="text-red-600 hover:text-red-800 inline-flex items-center text-lg"
            >
              <span>Voir tous les détails</span>
              <ArrowRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {categories.map((category) => (
              <div key={category.id} className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
          
          <h3 className="text-2xl font-bold text-center mb-8">Services populaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="text-sm text-red-600 mb-1">{service.category}</div>
                  <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">
                      {service.provider}
                    </span>
                    <Link href={`/service/${service.id}`} className="text-red-600 hover:text-red-800 flex items-center">
                      <span>En savoir plus</span>
                      <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="/services" 
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium flex items-center mx-auto"
            >
              <CurrencyDollarIcon className="h-5 w-5 mr-2" />
              <span>Voir tous nos services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-white" id="locations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Nos espaces de conciergerie</h2>
          <div className="text-center mb-8">
            <Link 
              href="/espaces"
              className="text-red-600 hover:text-red-800 inline-flex items-center text-lg"
            >
              <span>Voir tous les détails</span>
              <ArrowRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {publicLocations.map((location) => (
              <div key={location.id} className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="h-24 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                  <div className="text-xs text-gray-500 mb-3 flex items-center">
                    <MapPinIcon className="h-3 w-3 mr-1 text-red-600 flex-shrink-0" />
                    <span className="truncate">{location.address}</span>
                  </div>
                  <Link 
                    href={`/location/${location.slug}`}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 w-full justify-center"
                  >
                    <span>Accéder</span>
                    <ArrowRightIcon className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos avantages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {company.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mr-4">
                  <CheckIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-medium">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
