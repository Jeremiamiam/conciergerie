import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded"> {/* Simplified structure */}
      <nav className="grid grid-flow-col gap-4">
        <Link href="/" className="link link-hover">Accueil</Link> 
        <Link href="/theme" className="link link-hover">Services</Link>
        <Link href="/theme" className="link link-hover">Nos espaces</Link>
        <Link href="/theme" className="link link-hover">À propos</Link>
        <Link href="/theme" className="link link-hover">Contact</Link>
      </nav> 
      <aside>
        <p>Copyright © {currentYear} - Les Conciergeries Rennaises</p> {/* Updated copyright */}
      </aside>
    </footer>
  );
};

export default Footer;
