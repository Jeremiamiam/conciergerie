'use client';

import React, { useState, useEffect } from 'react';

/**
 * Composant qui ne rend ses enfants que côté client, après le montage.
 * Utile pour éviter les erreurs d'hydratation avec des composants
 * qui dépendent de l'état du navigateur (localStorage, matchMedia, etc.).
 */
const ClientOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback = null 
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback; // Ne rien rendre (ou un fallback) avant le montage client
  }

  return <>{children}</>; // Rendre les enfants une fois monté
};

export default ClientOnly;
