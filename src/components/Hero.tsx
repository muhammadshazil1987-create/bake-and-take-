/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Sparkles, MessageSquareHeart } from 'lucide-react';
import { motion } from 'motion/react';
import heroImage from '../assets/images/bakeandtake_hero_png_1780397094464.png';

interface HeroProps {
  onExploreMenu: () => void;
  businessName: string;
}

export default function Hero({ onExploreMenu, businessName }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-chocolate-dark py-20 lg:py-28" id="home">
      
      {/* Decorative Golden Ambient Gradients */}
      <div className="absolute top-1/2 left-0 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="absolute top-10 right-10 -z-10 h-96 w-96 rounded-full bg-chocolate-light/30 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Content Area */}
          <div className="space-y-6 lg:col-span-6 lg:pr-4">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-gold"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
              <span>Artisanal Sweet House in Haripur</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl font-bold leading-tight tracking-tight text-cream sm:text-5xl lg:text-6xl"
            >
              Cakes Crafted for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold">
                Perfect Moments
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl font-sans text-base leading-relaxed text-cream-dim/90"
            >
              Welcome to <strong className="text-gold">{businessName}</strong>. We oven-fresh bake premium masterpieces featuring dense double-chocolate fudge layers, dynamic melted caramel drapes, and sweet-scented decorations. Order fresh, personalized cakes directly to your doorstep in Haripur with ease.
            </motion.p>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
            >
              <button
                onClick={onExploreMenu}
                className="flex items-center justify-center space-x-2 rounded-full bg-gold px-8 py-4 font-sans text-sm font-bold tracking-wide text-chocolate transition-all duration-300 hover:bg-gold-hover hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-gold/20 cursor-pointer"
              >
                <span>Explore Live Menu</span>
                <ChevronRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <a
                href="#contact"
                className="flex items-center justify-center space-x-2 rounded-full border border-cream-dim/20 bg-chocolate-light/40 px-6 py-4 font-sans text-sm font-semibold tracking-wide text-cream hover:text-gold hover:border-gold/35 hover:bg-chocolate-light transition-all duration-300"
              >
                <MessageSquareHeart className="h-4.5 w-4.5" />
                <span>Our Bakery Story</span>
              </a>
            </motion.div>

            {/* High Conversion Local Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-chocolate-light/40"
            >
              <div>
                <span className="block font-serif text-2xl font-bold text-gold">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-cream-dim/70 font-medium">Fresh Baked</span>
              </div>
              <div className="border-l border-chocolate-light/50 pl-4">
                <span className="block font-serif text-2xl font-bold text-gold">Custom</span>
                <span className="text-[11px] uppercase tracking-wider text-cream-dim/70 font-medium">CMS Designer</span>
              </div>
              <div className="border-l border-chocolate-light/50 pl-4">
                <span className="block font-serif text-2xl font-bold text-gold">Fast</span>
                <span className="text-[11px] uppercase tracking-wider text-cream-dim/70 font-medium">WhatsApp Delivery</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Premium Visual Asset Container */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Gold frame shadow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold/30 inside via-chocolate-light/50 to-gold/25 blur-lg opacity-80" />
              
              <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-chocolate-light shadow-2xl">
                <img
                  src={heroImage}
                  alt="Premium Luxury Chocolate Gold Cake by Bakeandtake"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Aesthetic Overlay */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-gold/10 bg-chocolate-dark/80 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-base font-bold text-gold">Premium Signature Cake Edition</p>
                      <p className="text-xs text-cream-dim">Oven-fresh with premium edible gold glaze</p>
                    </div>
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
                      Haripur Selection
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
