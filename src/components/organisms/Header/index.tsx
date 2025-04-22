'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Simplified nav links for the template
const navLinks = [
  { href: '/', label: 'Accueil', exact: true },
  { href: '/theme', label: 'Services', exact: true },
  { href: '/theme', label: 'Nos espaces', exact: true },
  { href: '/theme', label: 'À propos', exact: true },
  { href: '/theme', label: 'Contact', exact: true },
  // Add more generic links later if needed (e.g., /about, /contact)
];

export const Header = () => {
  const pathname = usePathname();

  const isActive = (link: typeof navLinks[0]): boolean => {
    if (link.exact) return pathname === link.href;
    return false; // Only exact match for now
  };

  const renderNavItems = (isMobile: boolean) => {
    return navLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={isActive(link) ? 'active' : ''}>
            {link.label}
          </Link>
        </li>
      ));
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div> 
          <div className="flex-1 px-2 mx-2">
            <Link href="/" className="text-xl font-bold">Les Conciergeries Rennaises</Link> {/* Updated Title */}
          </div>
          {/* Desktop Menu */}
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {renderNavItems(false)} 
              {/* Removed specific Devis button */}
            </ul>
          </div>
           {/* Removed specific Mobile Devis Button */}
        </div>
      </div> 
      {/* Sidebar (mobile) */}
      <div className="drawer-side z-50"> 
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {renderNavItems(true)} 
           {/* Removed specific Devis button */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
