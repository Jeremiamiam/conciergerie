'use client';

import React, { useState, useRef } from 'react'; 
// Import the specific function needed from the context
import { useUISettings } from '@/context/UISettingsContext'; 
import { ArrowDownTrayIcon, PaintBrushIcon } from '@heroicons/react/24/outline'; 

// Helper component to display DaisyUI examples
const DaisyUIPreview = () => {
  // ... (Keep the preview component as is) ...
  return (
    <div className="space-y-6">
      {/* Buttons */}
      <div>
        <h4 className="font-medium mb-2">Buttons</h4>
        <div className="flex flex-wrap gap-2">
          <button className="btn">Default</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn btn-link">Link</button>
        </div>
      </div>
      {/* Card */}
      <div>
        <h4 className="font-medium mb-2">Card</h4>
        <div className="card w-full bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      {/* Alert */}
      <div>
        <h4 className="font-medium mb-2">Alert</h4>
        <div role="alert" className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Your purchase has been confirmed!</span>
        </div>
         <div role="alert" className="alert alert-warning mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>Warning: Invalid email address!</span>
          </div>
      </div>
      {/* Badge */}
      <div>
        <h4 className="font-medium mb-2">Badge</h4>
        <div className="flex flex-wrap gap-2">
          <div className="badge">default</div>
          <div className="badge badge-primary">primary</div>
          <div className="badge badge-secondary">secondary</div>
          <div className="badge badge-accent">accent</div>
          <div className="badge badge-outline">outline</div>
        </div>
      </div>
      {/* Accordion */}
      <div>
        <h4 className="font-medium mb-2">Accordion</h4>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked /> 
          <div className="collapse-title text-xl font-medium">
            Accordion Item 1
          </div>
          <div className="collapse-content"> 
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" /> 
          <div className="collapse-title text-xl font-medium">
            Accordion Item 2
          </div>
          <div className="collapse-content"> 
            <p>hello</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ThemePage() {
  // Use the unified hook
  const { appliedTheme, baseMode, applyCustomTheme, setBaseMode, resetAppliedTheme, applyBuiltInTheme } = useUISettings(); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Gérer l'import et l'analyse du fichier CSS
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrorMsg(null); 
    if (!file) return;

    try {
      const text = await file.text();
      const themeNameMatch = text.match(/name:\s*"([^"]+)"/);
      const dataThemeMatch = text.match(/\[data-theme="([^"]+)"\]/);
      const themeName = themeNameMatch ? themeNameMatch[1] : (dataThemeMatch ? dataThemeMatch[1] : `custom-${Date.now()}`);

      let cssContent = text;
      if (text.includes('@plugin "daisyui/theme"')) {
         cssContent = `[data-theme="${themeName}"] {\n`;
         const cssVarRegex = /(--[a-zA-Z0-9-]+):\s*([^;]+);/g;
         let match;
         let foundVars = false;
         while ((match = cssVarRegex.exec(text)) !== null) {
           const [, varName, varValue] = match;
           const cleanedValue = varValue.split('/*')[0].trim(); 
           cssContent += `  ${varName.trim()}: ${cleanedValue};\n`;
           foundVars = true;
         }
         cssContent += '}';
         if (!foundVars) throw new Error("Aucune variable CSS n'a été trouvée dans le format plugin attendu.");
      } else if (!text.includes(`[data-theme=`)) { 
         const cssVarRegex = /(--[a-zA-Z0-9-]+):\s*([^;]+);/g;
         if (!cssVarRegex.test(text)) throw new Error("Le fichier ne semble pas contenir de variables CSS de thème valides.");
         console.warn("CSS importé n'a pas de wrapper [data-theme], tentative d'application directe.");
      }

      applyCustomTheme(cssContent, themeName); 
      alert(`Thème "${themeName}" appliqué !`);

    } catch (error) {
      console.error('Erreur lors de l\'import/analyse du thème CSS:', error);
      setErrorMsg(error instanceof Error ? error.message : "Erreur inconnue lors de l'analyse.");
    } finally {
       if(e.target) e.target.value = ''; 
    }
  };

  // Removed the local applyBuiltInTheme function, will use the one from context directly

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Gestion du Thème</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Colonne de Contrôle */}
        <div className="md:col-span-1 space-y-8 p-4 bg-base-200 rounded-lg shadow">
           <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contrôles</h2>
           
           {/* Section Import */}
           <section>
             <h3 className="text-lg font-medium mb-2">Importer Thème CSS (Générateur DaisyUI)</h3>
             <p className="mb-4 text-sm text-base-content/70">
               Importez le fichier CSS téléchargé depuis le{' '}
               <a href="https://daisyui.com/theme-generator" target="_blank" rel="noopener noreferrer" className="link link-primary">
                 générateur DaisyUI
               </a>. Le thème sera appliqué et sauvegardé.
             </p>
             <button
               onClick={() => fileInputRef.current?.click()}
               className="btn btn-primary btn-sm w-full inline-flex items-center justify-center"
             >
               <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
               Choisir un fichier CSS...
             </button>
             <input
               ref={fileInputRef}
               type="file"
               accept=".css"
               onChange={handleFileUpload}
               className="hidden"
             />
             {errorMsg && <p className="text-error text-sm mt-2">{errorMsg}</p>}
           </section>

           {/* Section Thème Actuel & Reset */}
           <section>
             <h3 className="text-lg font-medium mb-2">Thème Actuel</h3>
             <p className="text-base-content/70 font-mono bg-base-100 p-2 rounded mb-4">
               {appliedTheme} 
               <span className="text-xs opacity-70"> (Mode: {baseMode})</span>
             </p>
             <div className="space-y-2">
                {/* Button to apply Lofi theme - uses context function */}
                <button 
                  onClick={() => applyBuiltInTheme('lofi')}
                  className="btn btn-sm btn-outline w-full inline-flex items-center justify-center"
                  disabled={appliedTheme === 'lofi'} // Disable if already lofi
                >
                   <PaintBrushIcon className="w-4 h-4 mr-2" /> Appliquer Thème "Lofi"
                </button>
                 {/* Toggle base mode */}
                <button 
                  onClick={() => setBaseMode(baseMode === 'light' ? 'dark' : 'light')}
                  className="btn btn-sm btn-outline w-full"
                >
                  Basculer Mode (Light/Dark)
                </button>
                {/* Reset button */}
                <button 
                  onClick={resetAppliedTheme} // Use renamed function from context
                  className="btn btn-error btn-sm w-full"
                >
                  Réinitialiser (Thème par défaut 'lofi')
                </button>
             </div>
           </section>
           
        </div>

        {/* Colonne de Prévisualisation */}
        <div className="md:col-span-2">
           <h2 className="text-xl font-semibold mb-4">Prévisualisation Composants</h2>
           <div className="p-6 bg-base-300 rounded-lg shadow">
             <DaisyUIPreview />
           </div>
        </div>

      </div>
    </div>
  );
}
