'use client';

import React from 'react';
import Link from 'next/link';
import MainNav from '@/components/organisms/MainNav';
import { services } from '@/data/services.json';
import { categories } from '@/data/categories.json';
import { 
  ArrowRightIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  HeartIcon,
  TruckIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function ServicesPage() {
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

  // Organiser les services par catégorie
  const servicesByCategory = categories.reduce((acc, category) => {
    acc[category.id] = services.filter(service => service.category === category.id);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <MainNav activePage="services" />

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Nos services</h1>
            <p className="text-xl">
              Découvrez notre gamme complète de services de conciergerie pour vous simplifier la vie
              au quotidien et vous faire gagner du temps.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Catégories de services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <a 
                  href={`#category-${category.id}`} 
                  className="text-red-600 hover:text-red-800 flex items-center justify-center"
                >
                  <span>Voir les services</span>
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      {categories.map((category) => (
        <section 
          key={category.id} 
          id={`category-${category.id}`} 
          className={`py-16 ${parseInt(category.id) % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-10">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4">
                {getCategoryIcon(category.icon, "h-5 w-5")}
              </div>
              <h2 className="text-2xl font-bold">{category.name}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesByCategory[category.id]?.map((service) => (
                <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
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
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Besoin d'un service sur mesure ?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Vous ne trouvez pas le service que vous recherchez ? Contactez-nous 
            pour discuter de vos besoins spécifiques.
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