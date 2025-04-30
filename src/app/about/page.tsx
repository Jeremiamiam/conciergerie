'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HomeIcon,
  BuildingOffice2Icon,
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon,
  CheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { company } from '@/data/locations.json';
import MainNav from '@/components/organisms/MainNav';

export default function AboutPage() {
  // Liste fictive des prestataires
  const providers = [
    { name: 'Panier Local', category: 'Alimentation' },
    { name: 'Pressing Express', category: 'Services du quotidien' },
    { name: 'Cordonnerie Martin', category: 'Services du quotidien' },
    { name: 'Les Paniers Bio', category: 'Alimentation' },
    { name: 'L\'Atelier Floral', category: 'Cadeaux' },
    { name: 'Auto Service Plus', category: 'Mobilité' },
    { name: 'Vélo Assistance', category: 'Mobilité' },
    { name: 'Massage Zen', category: 'Bien-être' },
    { name: 'Coiffure à domicile', category: 'Bien-être' },
    { name: 'Épicerie Vrac & Local', category: 'Alimentation' },
    { name: 'Traiteur Événementiel', category: 'Alimentation' },
    { name: 'Retouche Express', category: 'Services du quotidien' }
  ];

  // Informations environnementales
  const environmentalInfo = {
    title: "Notre démarche environnementale",
    description: "Les Conciergeries Rennaises s'engagent quotidiennement pour un développement durable et responsable, en favorisant les circuits courts et les prestataires locaux.",
    points: [
      "Réduction des émissions de CO2 grâce à la mutualisation des déplacements",
      "Sélection de prestataires engagés dans une démarche éco-responsable",
      "Promotion des produits locaux et de saison",
      "Limitation des emballages à usage unique",
      "Sensibilisation aux enjeux environnementaux auprès de nos clients"
    ]
  };

  // Storytelling
  const storytelling = {
    title: "Notre histoire",
    paragraphs: [
      "Fondée en 2009, Les Conciergeries Rennaises sont nées d'une idée simple : rendre service au quotidien. Tout a commencé avec un premier service de conciergerie installé au sein d'une entreprise rennaise, proposant des services simples mais essentiels aux salariés.",
      "Au fil des années, nous avons développé notre réseau de prestataires locaux et notre expertise des besoins des salariés et des entreprises. De Rennes, nous nous sommes étendus à Angers, Brest et Quimper, toujours avec la même philosophie : privilégier les circuits courts et valoriser les savoir-faire locaux.",
      "Aujourd'hui, nous sommes fiers d'accompagner plus d'une dizaine d'entreprises et des milliers de salariés au quotidien, en leur faisant gagner un temps précieux tout en soutenant l'économie locale."
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <MainNav activePage="about" />

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">À propos de nous</h1>
            <p className="text-xl mb-6">{company.description}</p>
            <p className="text-xl">Notre mission : {company.mission}</p>
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{storytelling.title}</h2>
              {storytelling.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
              ))}
            </div>
            <div className="bg-gray-200 h-96 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Environmental Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">{environmentalInfo.title}</h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">{environmentalInfo.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {environmentalInfo.points.map((point, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="ml-3 text-gray-700">{point}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {company.impact.stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg text-center shadow-sm">
                  <p className="text-4xl font-bold text-green-600 mb-2">{stat.value}</p>
                  <p className="text-gray-700">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">Nos prestataires</h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Nous travaillons avec des prestataires locaux sélectionnés pour la qualité de leurs services et produits,
            ainsi que pour leur engagement éthique et responsable.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {providers.map((provider, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">{provider.name}</p>
                <p className="text-sm text-red-600">{provider.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nous contacter</h2>
              <p className="text-gray-700 mb-8">
                Pour toute demande d'information concernant nos services de conciergerie,
                n'hésitez pas à nous contacter.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-700">{company.contact.address}</p>
                </div>
                <div className="flex items-start">
                  <PhoneIcon className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-700">{company.contact.phone}</p>
                </div>
                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-700">{company.contact.email}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Formulaire de contact</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Votre message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 