import React, { useCallback } from 'react';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

interface MainNavProps {
  activePage?: 'home' | 'services' | 'locations' | 'about' | 'contact';
}

export const MainNav: React.FC<MainNavProps> = ({ activePage = 'home' }) => {
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

  return (
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
            <Link 
              href="/services" 
              className={`${activePage === 'services' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
            >
              Services
            </Link>
            
            <Link 
              href="/espaces" 
              className={`${activePage === 'locations' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
            >
              Nos espaces
            </Link>
            
            <Link 
              href="/about" 
              className={`${activePage === 'about' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
            >
              À propos
            </Link>
            
            <Link 
              href="/contact" 
              className={`${activePage === 'contact' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MainNav; 