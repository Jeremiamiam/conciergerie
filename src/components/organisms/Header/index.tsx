'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  Bars3Icon
} from '@heroicons/react/24/outline';

// Simplified nav links for the template - Updated to use anchor links
const navLinks = [
  { href: '/theme', label: 'Services', exact: true },
  { href: '/theme', label: 'Nos espaces', exact: true },
  { href: '/theme', label: 'À propos', exact: true },
  { href: '/theme', label: 'Contact', exact: true },
  // Add more generic links later if needed (e.g., /about, /contact)
];

// Links for the home page with anchor scrolling
const homePageLinks = [
  { href: '#services', label: 'Services' },
  { href: '#locations', label: 'Nos espaces' },
  { href: '#about', label: 'À propos' },
  { href: '#contact', label: 'Contact' }
];

export const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Smooth scroll function for anchor links
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply to anchor links on homepage
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        // Close mobile menu if open
        const drawerToggle = document.getElementById('my-drawer-3') as HTMLInputElement;
        if (drawerToggle && drawerToggle.checked) {
          drawerToggle.checked = false;
        }
        
        // Smooth scroll to element
        window.scrollTo({
          top: element.offsetTop - 80, // Offset to account for header height
          behavior: 'smooth'
        });
      }
    }
  }, [isHomePage]);

  const isActive = (link: typeof navLinks[0]): boolean => {
    if (link.exact) return pathname === link.href;
    return false; // Only exact match for now
  };

  const renderNavItems = (isMobile: boolean) => {
    // Use home page links with anchors if on home page
    const links = isHomePage ? homePageLinks : navLinks;
    
    return links.map((link) => (
      <li key={link.href}>
        <a 
          href={link.href} 
          onClick={(e) => handleAnchorClick(e, link.href)}
          className={isActive(link as any) ? 'active' : ''}
        >
          {link.label}
        </a>
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
              <Bars3Icon className="h-6 w-6" />
            </label>
          </div> 
          <div className="flex-1 px-2 mx-2">
            <Link href="/" className="text-xl font-bold hover:text-primary transition-colors flex items-center">
              <HomeIcon className="h-6 w-6 mr-2" />
              <span>Les Conciergeries Rennaises</span>
            </Link>
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
