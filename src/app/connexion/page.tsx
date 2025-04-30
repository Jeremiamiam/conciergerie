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
import MainNav from '@/components/organisms/MainNav';

export default function ConnexionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <MainNav />

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
                    <Link 
                      href="/location/arkea" 
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <span>Se connecter</span>
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="mt-8 text-center pb-6">
              <p className="text-sm text-gray-600">
                Vous n'avez pas encore de compte ?{' '}
                <a href="#" className="text-red-600 hover:text-red-500 inline-flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  <span>Contactez votre conciergerie</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 