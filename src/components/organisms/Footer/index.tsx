import React from 'react';
import Link from 'next/link';
import { 
  BuildingOffice2Icon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeOpenIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import { company } from '@/data/locations.json';
import { categories } from '@/data/categories.json';
import { locations } from '@/data/locations.json';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
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
                  <Link href={`/services#category-${category.id}`} className="hover:text-white flex items-center">
                    <ArrowRightIcon className="h-3 w-3 mr-1" />
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="hover:text-white flex items-center font-medium text-white">
                  <ArrowRightIcon className="h-3 w-3 mr-1" />
                  Tous nos services
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Nos espaces</h3>
            <ul className="space-y-2 text-gray-400">
              {locations
                .filter(location => location.id === "lacabane" || location.id === "colivia")
                .map((location) => (
                  <li key={location.id}>
                    <Link href={`/location/${location.slug}`} className="hover:text-white flex items-center">
                      <MapPinIcon className="h-3 w-3 mr-1" />
                      {location.name}
                    </Link>
                  </li>
                ))
              }
              <li>
                <Link href="/espaces" className="hover:text-white flex items-center font-medium text-white">
                  <ArrowRightIcon className="h-3 w-3 mr-1" />
                  Tous nos espaces
                </Link>
              </li>
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
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <p className="text-gray-400">© {currentYear} {company.name}. Tous droits réservés.</p>
            <Link 
              href="/connexion" 
              className="text-xs opacity-70 hover:opacity-100 text-gray-400 flex items-center"
            >
              <BuildingOffice2Icon className="h-3 w-3 mr-1" />
              <span>Accès conciergeries d'entreprise</span>
            </Link>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <Link href="/about" className="hover:text-white">À propos</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="#" className="hover:text-white">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
