/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Cake as CakeIcon, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
  businessName: string;
}

export default function Header({
  onNavigate,
  activeSection,
  isAdminMode,
  onToggleAdmin,
  businessName
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Menu', id: 'menu' },
    { label: 'About Us', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-chocolate-light bg-chocolate-dark/95 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center space-x-2.5 text-left focus:outline-none"
          id="nav-logo"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 p-1.5 transition-all duration-300 group-hover:bg-gold/20">
            <CakeIcon className="h-full w-full text-gold" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-gold transition-colors duration-300 group-hover:text-gold-hover">
              {businessName}
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-cream-dim/70">
              Haripur
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative py-2 font-sans text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none ${
                activeSection === item.id
                  ? 'text-gold'
                  : 'text-cream/80 hover:text-gold'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* Admin Switcher */}
          <button
            onClick={onToggleAdmin}
            className={`flex items-center space-x-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              isAdminMode
                ? 'bg-gold border-gold text-chocolate font-bold shadow-md shadow-gold/20'
                : 'bg-transparent border-gold/40 text-gold hover:bg-gold/10'
            }`}
            title="Access Bakery CMS Manager"
            id="admin-toggle-btn"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{isAdminMode ? 'Admin Mode (Active)' : 'Bakery CMS'}</span>
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Mobile Admin Trigger Icon */}
          <button
            onClick={onToggleAdmin}
            className={`rounded-full p-2 transition-all duration-300 ${
              isAdminMode ? 'bg-gold text-chocolate' : 'bg-chocolate-light text-gold border border-gold/20'
            }`}
            title="Toggle Admin Mode"
          >
            <ShieldCheck className="h-5 w-5" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-cream hover:bg-chocolate-light hover:text-gold focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-chocolate-light bg-chocolate md:hidden"
          >
            <div className="space-y-2 px-4 py-6 sm:px-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full rounded-lg px-4 py-3 text-left font-sans text-base font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gold/10 text-gold font-semibold'
                      : 'text-cream/90 hover:bg-chocolate-light hover:text-gold'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-chocolate-light/50">
                <button
                  onClick={() => {
                    onToggleAdmin();
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left font-sans text-sm font-semibold transition-all duration-300 ${
                    isAdminMode
                      ? 'bg-gold text-chocolate font-bold'
                      : 'bg-gold/10 text-gold hover:bg-gold/20'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <ShieldCheck className="h-4.5 w-4.5" />
                    <span>Bakery Admin CMS</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded">
                    {isAdminMode ? 'On' : 'Off'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
