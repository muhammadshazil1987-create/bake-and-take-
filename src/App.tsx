/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  getStoredCakes, getStoredSettings, saveStoredCakes, saveStoredSettings, 
  DEFAULT_CAKES, DEFAULT_SETTINGS, CATEGORIES 
} from './data';
import { Cake, BusinessSettings } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ArrowRight, Sparkles, Cake as CakeIcon } from 'lucide-react';

export default function App() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(DEFAULT_SETTINGS);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Load initial data from local storage
  useEffect(() => {
    setCakes(getStoredCakes());
    setSettings(getStoredSettings());
  }, []);

  // Update scrolled active sections
  useEffect(() => {
    const handleScroll = () => {
      if (isAdminMode) return;
      const sections = ['home', 'menu', 'about', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminMode]);

  // Handle addition of a cake
  const handleAddCake = (newCake: Omit<Cake, 'id' | 'isCustom'>) => {
    const freshCake: Cake = {
      ...newCake,
      id: `cake-custom-${Date.now()}`,
      isCustom: true
    };
    const updated = [freshCake, ...cakes];
    setCakes(updated);
    saveStoredCakes(updated);
  };

  // Handle edit / update of a cake
  const handleUpdateCake = (updatedCake: Cake) => {
    const updated = cakes.map((cake) => cake.id === updatedCake.id ? updatedCake : cake);
    setCakes(updated);
    saveStoredCakes(updated);
  };

  // Handle deletion of a cake
  const handleRemoveCake = (id: string) => {
    const updated = cakes.filter((cake) => cake.id !== id);
    setCakes(updated);
    saveStoredCakes(updated);
  };

  // Reset to original sweet defaults
  const handleResetDefaults = () => {
    if (confirm("Are you sure you want to reset all catalog items and business details to defaults? This will overwrite your current configuration.")) {
      setCakes(DEFAULT_CAKES);
      setSettings(DEFAULT_SETTINGS);
      saveStoredCakes(DEFAULT_CAKES);
      saveStoredSettings(DEFAULT_SETTINGS);
    }
  };

  // Handle business settings modification
  const handleUpdateSettings = (updatedSettings: BusinessSettings) => {
    setSettings(updatedSettings);
    saveStoredSettings(updatedSettings);
  };

  // Smooth scroll helper
  const handleNavigate = (sectionId: string) => {
    if (isAdminMode) {
      setIsAdminMode(false);
    }
    setActiveSection(sectionId);
    
    // Defer slightly to allow rendering if we exited Admin mode
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-chocolate font-sans text-cream text-selection">
      
      {/* Sticky Top Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isAdminMode={isAdminMode}
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
        businessName={settings.businessName}
      />

      {/* Admin Mode Quick Access Alert Banner */}
      {isAdminMode && (
        <div className="bg-gold text-chocolate px-4 py-2 text-xs font-bold tracking-wider text-center flex items-center justify-center space-x-2">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>You are inside the Admin CMS Panel. Changes reflect instantly on your live storefront.</span>
          <button 
            onClick={() => setIsAdminMode(false)}
            className="underline hover:opacity-80 active:opacity-100 ml-2 font-black uppercase cursor-pointer"
          >
            Exit CMS View &rarr;
          </button>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {isAdminMode ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <AdminPanel
                cakes={cakes}
                onAddCake={handleAddCake}
                onUpdateCake={handleUpdateCake}
                onRemoveCake={handleRemoveCake}
                onResetDefaults={handleResetDefaults}
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onClose={() => setIsAdminMode(false)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="storefront"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Header */}
              <Hero 
                onExploreMenu={() => handleNavigate('menu')} 
                businessName={settings.businessName}
              />

              {/* Dynamic Products Catalog */}
              <MenuSection
                cakes={cakes}
                categories={CATEGORIES}
                settings={settings}
              />

              {/* About Us Storyteller */}
              <AboutUs />

              {/* Contact and Landmarker Locator */}
              <Contact settings={settings} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Element */}
      <footer className="bg-chocolate-dark border-t border-chocolate-light/40 py-12 text-cream-dim select-none text-xs md:text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
            
            {/* Left Col */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <CakeIcon className="h-6 w-6 text-gold" />
                <span className="font-serif text-lg font-bold tracking-tight text-gold">
                  {settings.businessName}
                </span>
              </div>
              <p className="max-w-xs text-xs text-cream-dim/70 leading-relaxed">
                Haripur’s premium artisanal cake boutique. Blending rich cocoa, buttery caramels, and elegant gold design assets into memory-making masterpieces.
              </p>
              <span className="block text-[10px] text-gold/80 italic font-semibold">
                Oven-fresh warmth delivered throughout Haripur district
              </span>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-serif font-bold text-sm text-gold">Browse Recipes</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => handleNavigate('menu')} className="hover:text-gold transition-colors text-cream-dim/80 text-left">
                    Signature Chocolate Fudge
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('menu')} className="hover:text-gold transition-colors text-cream-dim/80 text-left">
                    Royal Red Velvet Edition
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('menu')} className="hover:text-gold transition-colors text-cream-dim/80 text-left">
                    Salted Caramel Lotus Crumbles
                  </button>
                </li>
              </ul>
            </div>

            {/* Support and Safety info */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-serif font-bold text-sm text-gold">Ordering Support</h4>
              <p className="text-xs text-cream-dim/85 leading-relaxed">
                All customized selections are compiled directly into rapid smart automated pre-filled messages sent over WhatsApp for zero friction.
              </p>
              <div className="pt-1 flex items-center space-x-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase font-bold text-cream-dim/60 font-mono">
                  Kitchen Live: {settings.workingHours}
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Landmarks */}
          <div className="border-t border-chocolate-light/40 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream-dim/65">
            <p className="font-medium text-center sm:text-left">
              &copy; {new Date().getFullYear()} <strong className="text-gold">{settings.businessName}</strong> Haripur. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-1.5 justify-center">
              <span>Main Bazar near GPO, Haripur</span>
              <span className="text-gold/40">•</span>
              <span className="text-gold font-semibold underline cursor-pointer" onClick={() => setIsAdminMode(true)}>
                Bakery CMS Entry Portal
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
