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
  EnvelopeOpenIcon
} from '@heroicons/react/24/outline';

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

  // Composant de lien d'ancrage avec défilement fluide
  const SmoothScrollLink = ({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      return (
        <a 
          href={href} 
          className={className}
          onClick={(e) => handleSmoothScroll(e, targetId)}
        >
          {children}
        </a>
      );
    }
    return <Link href={href} className={className}>{children}</Link>;
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-12 h-12 bg-red-600 rounded-full mr-4 flex items-center justify-center">
                  <HomeIcon className="h-7 w-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
              </Link>
            </div>
            <div className="flex items-center">
              <nav className="flex space-x-6 mr-8">
                <SmoothScrollLink href="#services" className="text-gray-500 hover:text-red-600">
                  Services
                </SmoothScrollLink>
                <SmoothScrollLink href="#locations" className="text-gray-500 hover:text-red-600">
                  Nos espaces
                </SmoothScrollLink>
                <SmoothScrollLink href="#about" className="text-gray-500 hover:text-red-600">
                  À propos
                </SmoothScrollLink>
                <SmoothScrollLink href="#contact" className="text-gray-500 hover:text-red-600">
                  Contact
                </SmoothScrollLink>
              </nav>
              <Link href="/connexion" className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
                <UserGroupIcon className="h-5 w-5 mr-2" />
                <span>Espace dédié</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Services de conciergerie pour simplifier votre quotidien</h2>
              <p className="text-xl mb-8">{company.description}</p>
              <div className="flex space-x-4">
                <SmoothScrollLink href="#services" className="bg-white text-red-700 px-6 py-3 rounded-lg font-medium flex items-center">
                  <span>Découvrir nos services</span>
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </SmoothScrollLink>
                <Link href="/connexion" className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium flex items-center">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  <span>Accéder à mon espace</span>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-red-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{company.impact.title}</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">{company.impact.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {company.impact.stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-red-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 bg-gray-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos services</h2>
          
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
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium flex items-center mx-auto">
              <CurrencyDollarIcon className="h-5 w-5 mr-2" />
              <span>Voir tous nos services</span>
            </button>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-white" id="locations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos espaces de conciergerie</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{location.name}</h3>
                  <p className="text-gray-600 mb-4">{location.description}</p>
                  <div className="text-sm text-gray-500 mb-4 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1 text-red-600" />
                    {location.address}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-red-600 flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {location.availableServices.length} services disponibles
                    </div>
                    <Link 
                      href="/connexion" 
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      <span>Accéder</span>
                      <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{company.name}</h3>
              <p className="text-gray-400 mb-4">{company.description.substring(0, 100)}...</p>
              <p className="text-gray-400">Depuis {company.founding}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Nos services</h3>
              <ul className="space-y-2 text-gray-400">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link href="#" className="hover:text-white flex items-center">
                      <ArrowRightIcon className="h-3 w-3 mr-1" />
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Nos espaces</h3>
              <ul className="space-y-2 text-gray-400">
                {locations.map((location) => (
                  <li key={location.id}>
                    <Link href="/connexion" className="hover:text-white flex items-center">
                      <MapPinIcon className="h-3 w-3 mr-1" />
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="text-gray-400 not-italic">
                <p className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2" />{company.contact.address}</p>
                <p className="mt-2 flex items-center"><PhoneIcon className="h-4 w-4 mr-2" />{company.contact.phone}</p>
                <p className="mt-2 flex items-center"><EnvelopeOpenIcon className="h-4 w-4 mr-2" />{company.contact.email}</p>
              </address>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  FB
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  IG
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  LI
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex justify-between">
            <p className="text-gray-400">© {new Date().getFullYear()} {company.name}. Tous droits réservés.</p>
            <div className="flex space-x-6 text-gray-400">
              <Link href="#" className="hover:text-white">Mentions légales</Link>
              <Link href="#" className="hover:text-white">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
