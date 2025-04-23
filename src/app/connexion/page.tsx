'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  BuildingOffice2Icon, 
  UserIcon,
  LockClosedIcon,
  KeyIcon,
  ArrowRightIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

export default function ConnexionPage() {
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
                <h1 className="text-2xl font-bold text-gray-900">Les Conciergeries Rennaises</h1>
              </Link>
            </div>
            <nav className="flex space-x-6">
              <Link href="/#services" className="text-gray-500 hover:text-red-600">
                Services
              </Link>
              <Link href="/#locations" className="text-gray-500 hover:text-red-600">
                Nos espaces
              </Link>
              <Link href="/#about" className="text-gray-500 hover:text-red-600">
                À propos
              </Link>
              <Link href="/#contact" className="text-gray-500 hover:text-red-600">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Connexion Section */}
      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-red-600 p-6 text-white text-center">
              <h2 className="text-2xl font-bold">Accès espace dédié</h2>
              <p className="mt-2 text-red-100">Connectez-vous pour accéder à votre espace</p>
            </div>
            
            <div className="p-6">
              <form>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <UserIcon className="h-4 w-4 mr-1" />
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <LockClosedIcon className="h-4 w-4 mr-1" />
                      Mot de passe
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-red-600 border-gray-300 rounded"
                      />
                      <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                        Se souvenir de moi
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="text-red-600 hover:text-red-500 flex items-center">
                        <KeyIcon className="h-4 w-4 mr-1" />
                        <span>Mot de passe oublié ?</span>
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <Link href="/location/lacabane" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      <span>Se connecter</span>
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Choisir un espace dédié
                </p>
                <div className="mt-3 flex justify-center space-x-3">
                  <Link 
                    href="/location/lacabane" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <BuildingOffice2Icon className="h-4 w-4 mr-1" />
                    La Cabane
                  </Link>
                  <Link 
                    href="/location/arkea" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <BuildingOffice2Icon className="h-4 w-4 mr-1" />
                    Arkea
                  </Link>
                  <Link 
                    href="/location/pei" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <BuildingOffice2Icon className="h-4 w-4 mr-1" />
                    PEI
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Vous n'avez pas encore de compte ?{' '}
              <a href="#" className="text-red-600 hover:text-red-500 inline-flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-1" />
                <span>Contactez votre conciergerie</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Les Conciergeries Rennaises</h3>
              <p className="text-gray-400 mb-4">Première conciergerie d'entreprises créée à Rennes, intervenant à Rennes, Angers, Brest et Quimper.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#services" className="hover:text-white flex items-center"><ArrowRightIcon className="h-4 w-4 mr-1" />Services</Link></li>
                <li><Link href="/#locations" className="hover:text-white flex items-center"><BuildingOffice2Icon className="h-4 w-4 mr-1" />Nos espaces</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Nos espaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/location/lacabane" className="hover:text-white flex items-center"><BuildingOffice2Icon className="h-4 w-4 mr-1" />La Cabane</Link></li>
                <li><Link href="/location/arkea" className="hover:text-white flex items-center"><BuildingOffice2Icon className="h-4 w-4 mr-1" />Arkea</Link></li>
                <li><Link href="/location/pei" className="hover:text-white flex items-center"><BuildingOffice2Icon className="h-4 w-4 mr-1" />PEI</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="text-gray-400 not-italic">
                <p className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2" />12 Rue des Conciergeries, 35000 Rennes</p>
                <p className="mt-2 flex items-center"><PhoneIcon className="h-4 w-4 mr-2" />02 XX XX XX XX</p>
                <p className="mt-2 flex items-center"><EnvelopeIcon className="h-4 w-4 mr-2" />contact@lesconciergeriesrennaises.fr</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex justify-between">
            <p className="text-gray-400">© {new Date().getFullYear()} Les Conciergeries Rennaises. Tous droits réservés.</p>
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