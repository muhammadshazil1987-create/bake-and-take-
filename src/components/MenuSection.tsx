/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Cake, BusinessSettings } from '../types';
import { MessageCircle, ShoppingBag, Plus, Minus, Tag, Check, Calendar, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  cakes: Cake[];
  categories: string[];
  settings: BusinessSettings;
}

export default function MenuSection({ cakes, categories, settings }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [flavorNote, setFlavorNote] = useState('');
  const [lettering, setLettering] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Filtering cakes based on the category
  const filteredCakes = selectedCategory === 'All'
    ? cakes
    : cakes.filter(cake => cake.category === selectedCategory);

  // Directly link to WhatsApp conforming exactly with instructions
  const generateDirectWhatsAppUrl = (cake: Cake) => {
    const rawMsg = `Hi, I would like to order this cake: ${cake.title} priced at ${settings.currencySymbol} ${cake.price.toLocaleString()}. Please let me know the availability.`;
    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(rawMsg)}`;
  };

  // Generate enriched message based on configuration panel
  const handleCheckoutOverWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCake) return;

    // Conforms to user requirement but enriched if custom parameters are set
    let message = `Hi, I would like to order this cake: ${selectedCake.title} priced at ${settings.currencySymbol} ${selectedCake.price.toLocaleString()}. Please let me know the availability.`;

    const details: string[] = [];
    if (quantity > 1) {
      details.push(`Quantity: ${quantity}`);
    }
    if (lettering.trim()) {
      details.push(`Cake Lettering/Name on Cake: "${lettering.trim()}"`);
    }
    if (flavorNote.trim()) {
      details.push(`Special Preferences: ${flavorNote.trim()}`);
    }
    if (deliveryDate) {
      details.push(`Desired Delivery/Pickup Date: ${deliveryDate}`);
    }

    if (details.length > 0) {
      message += `\n\n*Personalized Details:*\n` + details.map(d => `• ${d}`).join('\n');
    }

    const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noreferrer');
    
    // Close modal
    setSelectedCake(null);
    setQuantity(1);
    setLettering('');
    setFlavorNote('');
    setDeliveryDate('');
  };

  const openCustomizer = (cake: Cake) => {
    setSelectedCake(cake);
    setQuantity(1);
    setLettering('');
    setFlavorNote('');
    // Set default tomorrow date picker
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDeliveryDate(tomorrow.toISOString().split('T')[0]);
  };

  return (
    <section className="bg-chocolate py-24 border-t border-chocolate-light/40" id="menu">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title and Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/5 border border-gold/15 px-3 py-1 rounded-full">
            Our Freshly Oven-Baked Menu
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Slices of Celebration & Comfort
          </h2>
          <p className="text-cream-dim/80 text-sm md:text-base">
            Every creation is hand-crafted right here in Haripur using rich dark imports, luscious caramels, and real cream. Choose a recipe to order instantly or customize to your event.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-gold text-chocolate font-bold shadow-md shadow-gold/25'
                  : 'bg-chocolate-light/50 border border-gold/15 text-cream hover:border-gold/35 hover:bg-chocolate-light'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCakes.map((cake) => {
              const isAvailable = cake.available;
              return (
                <motion.div
                  key={cake.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col overflow-hidden rounded-xl border border-gold/15 bg-chocolate-dark transition-all duration-300 hover:border-gold/35 hover:shadow-xl hover:shadow-gold/5 group"
                >
                  
                  {/* Photo Container */}
                  <div className="relative aspect-square overflow-hidden bg-chocolate-light">
                    {/* Tags */}
                    {cake.isPopular && isAvailable && (
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-chocolate">
                        Popular Selection
                      </span>
                    )}

                    {!isAvailable && (
                      <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/75 font-serif text-sm font-bold uppercase tracking-widest text-gold border border-gold/25">
                        Sold Out Today
                      </span>
                    )}

                    <img
                      src={cake.image}
                      alt={cake.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Body Details */}
                  <div className="flex flex-1 flex-col p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif text-lg font-bold text-cream group-hover:text-gold transition-colors duration-300">
                        {cake.title}
                      </h3>
                      {cake.isCustom && (
                        <span className="rounded bg-gold/10 px-1.5 py-0.5 text-[9px] font-bold text-gold uppercase tracking-wider" title="Custom CMS product">
                          CMS Entry
                        </span>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="flex-1 text-xs leading-relaxed text-cream-dim/80">
                      {cake.description}
                    </p>

                    {/* Price - DISPLAYED CLEARLY BELOW IMAGE */}
                    <div className="flex items-center justify-between border-t border-chocolate-light/40 pt-4 mt-2">
                      <div className="space-y-0.5" id={`price-tag-${cake.id}`}>
                        <span className="text-[10px] uppercase tracking-wider text-cream-dim/60 font-medium">
                          Starting Price
                        </span>
                        <p className="font-serif text-lg font-bold text-gold">
                          {settings.currencySymbol} {cake.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Micro Order Button to open Personalizer Panel */}
                      <button
                        onClick={() => isAvailable && openCustomizer(cake)}
                        disabled={!isAvailable}
                        className={`rounded-full p-2 border font-medium transition-all duration-300 ${
                          isAvailable
                            ? 'border-gold/25 bg-gold/5 text-gold hover:bg-gold hover:text-chocolate hover:border-gold'
                            : 'border-white/10 text-white/20 cursor-not-allowed'
                        }`}
                        title="Personalize and Build Order"
                      >
                        <ShoppingBag className="h-4.5 w-4.5" />
                      </button>
                    </div>

                    {/* Prominent Order via WhatsApp Button */}
                    <div className="pt-2">
                      {isAvailable ? (
                        <div className="grid grid-cols-12 gap-2">
                          {/* Direct Quick Order (No-Modal Instant Flow) */}
                          <a
                            href={generateDirectWhatsAppUrl(cake)}
                            target="_blank"
                            rel="noreferrer"
                            className="col-span-12 flex items-center justify-center space-x-2 rounded-lg bg-gold hover:bg-gold-hover px-4 py-3 text-xs font-bold uppercase tracking-wider text-chocolate transition-all duration-300 shadow-md shadow-gold/5 cursor-pointer"
                            id={`order-btn-${cake.id}`}
                          >
                            <MessageCircle className="h-4.5 w-4.5 text-chocolate fill-chocolate" />
                            <span>Quick WhatsApp Order</span>
                          </a>
                        </div>
                      ) : (
                        <button
                          disabled
                          className="flex w-full items-center justify-center space-x-2 rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-cream-dim/30 cursor-not-allowed"
                        >
                          <span>Item Unavailable</span>
                        </button>
                      )}
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Dynamic Personalization Modal Drawer */}
      <AnimatePresence>
        {selectedCake && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCake(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gold/35 bg-chocolate-dark shadow-2xl z-10"
            >
              
              {/* Image Header with Dismiss Button */}
              <div className="relative h-48 bg-chocolate-light">
                <img
                  src={selectedCake.image}
                  alt={selectedCake.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark to-black/30" />
                
                <button
                  onClick={() => setSelectedCake(null)}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-cream hover:text-gold transition-colors duration-200"
                >
                  &times;
                </button>

                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/15 px-2 py-0.5 rounded">
                    {selectedCake.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-cream mt-1">
                    {selectedCake.title}
                  </h3>
                </div>
              </div>

              {/* Form customizer */}
              <form onSubmit={handleCheckoutOverWhatsApp} className="p-6 space-y-4">
                
                <p className="text-xs text-cream-dim leading-relaxed">
                  Configure your cake order below. Your selection is generated into a beautiful ready-to-send message layout over WhatsApp.
                </p>

                {/* Grid controls */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Quantity */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wider uppercase text-cream-dim/80">
                      Quantity (No. of Cakes)
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex h-9 w-9 items-center justify-center rounded bg-chocolate-light hover:bg-gold/20 text-cream hover:text-gold transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-mono font-bold text-sm w-8 text-center text-gold">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded bg-chocolate-light hover:bg-gold/20 text-cream hover:text-gold transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Delivery Day */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wider uppercase text-cream-dim/80">
                      Required Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full rounded bg-chocolate-light border border-gold/10 px-3 py-1.5 font-sans text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Cake Lettering Text */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold tracking-wider uppercase text-cream-dim/80">
                      Cake Lettering / Written Name
                    </label>
                    <span className="text-[10px] text-gold/80 italic font-medium">Complementary</span>
                  </div>
                  <input
                    type="text"
                    placeholder='e.g., "Happy 25th Birthday Fatima!"'
                    value={lettering}
                    onChange={(e) => setLettering(e.target.value)}
                    maxLength={40}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-3.5 py-2.5 font-sans text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                {/* Custom demands */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold tracking-wider uppercase text-cream-dim/80">
                    Dietary demands / Special instructions
                  </label>
                  <textarea
                    placeholder='e.g., "Less sweet, extra syrup, split into two boxes etc."'
                    value={flavorNote}
                    onChange={(e) => setFlavorNote(e.target.value)}
                    rows={2}
                    maxLength={150}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-3.5 py-2.5 font-sans text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                  />
                </div>

                {/* Pricing Overview */}
                <div className="rounded-lg bg-chocolate-light/50 p-3 flex items-center justify-between border border-gold/10">
                  <div className="flex items-center space-x-1 text-xs text-cream-dim">
                    <Tag className="h-3.5 w-3.5 text-gold" />
                    <span>Est. Ordered Total:</span>
                  </div>
                  <span className="font-serif text-base font-bold text-gold">
                    {settings.currencySymbol} {(selectedCake.price * quantity).toLocaleString()}
                  </span>
                </div>

                {/* Order Button link */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-gold hover:bg-gold-hover py-3 text-xs font-bold uppercase tracking-wider text-chocolate transition-all duration-300 shadow-lg shadow-gold/20"
                >
                  <MessageCircle className="h-4.5 w-4.5 fill-chocolate text-chocolate" />
                  <span>Personalize & Submit Order via WhatsApp</span>
                </button>

                <div className="text-center">
                  <span className="text-[10px] text-cream-dim/60">
                    Connecting to <span className="text-gold">+{settings.whatsappNumber}</span> via WhatsApp Web/App
                  </span>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
