import React from 'react';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import '@/styles/globals.css';
import Providers from './providers';
// Removed import for DesignSystemPanel as it will be moved to /theme page
// import DesignSystemPanel from '@/components/ui/DesignSystemPanel'; 

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'Les Conciergeries Rennaises', // Updated title
  description: 'Services de conciergerie pour simplifier votre quotidien', // Updated description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr"> {/* Removed data-theme="dracula" */}
      <body className={`${inter.className} ${montserrat.variable} tracking-[0.11em] font-sans`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            {/* Suppression des composants Header et Footer */}
            <main className="flex-grow">
              {children}
            </main>
          </div>
          {/* Panel removed from layout */}
        </Providers>
      </body>
    </html>
  );
}
