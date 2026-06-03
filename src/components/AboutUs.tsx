/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartHandshake, Flame, ShieldAlert, Award, Compass, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  const values = [
    {
      icon: Flame,
      title: 'Freshly Baked On Demand',
      description: 'We don’t believe in stale storage. No cake stays on our shelves; every single orders is whipped, layered, and baked on the exact morning of your event.'
    },
    {
      icon: HeartHandshake,
      title: 'Tailored Customization',
      description: 'Through our dynamic CMS panel, you get a direct gateway to our kitchen. From specific chocolate fudge heights to special lettering, we build it to match.'
    },
    {
      icon: Award,
      title: 'Premium Imports & Local Produce',
      description: 'Using high-end cocoa imports paired with deep organic produce right from the gardens of Haripur to ensure a pristine, luxurious flavor bouquet.'
    }
  ];

  return (
    <section className="bg-chocolate-dark py-24 relative overflow-hidden" id="about">
      {/* Visual Accent Bullets */}
      <div className="absolute bottom-1/4 right-0 -z-10 h-64 w-64 rounded-full bg-gold/5 blur-[100px]" />
      <div className="absolute top-1/4 left-10 -z-10 h-80 w-80 rounded-full bg-chocolate-light/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Aesthetic Story Panel */}
          <div className="lg:col-span-5 relative space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/5 border border-gold/15 px-3 py-1 rounded-full">
              Our Legacy, Your Celebrations
            </span>
            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-cream sm:text-4xl text-left">
              The Art of Baking with Passion & Gold
            </h2>
            
            <div className="space-y-4 text-cream-dim/90 text-sm leading-relaxed">
              <p>
                Founded in the picturesque city of Haripur, <strong className="text-gold">Bakeandtake</strong> was born from a singular vision: to elevate routine desserts into luxury focal pieces for life’s most meaningful moments.
              </p>
              <p>
                We believe a cake is more than flour, sugar, and cream. It represents a shared glance relative to a birthday wish, the centerpiece of a wedding, or a sweet reward after a heavy day. That is why our bakers treat every step—from the velvet flour sifting to the final brush of edible gold—as an act of culinary craftsmanship.
              </p>
              <p>
                Our shop combines local warmth with global standards. Driven by perfection, we empower our client community through frictionless ordering and total customizable CMS accessibility.
              </p>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Heart className="h-6 w-6 fill-gold/20" />
              </div>
              <div>
                <p className="font-serif font-bold text-base text-gold">Baked Fresh in Haripur</p>
                <p className="text-xs text-cream-dim/70">Delivering sweet moments to your doorstep</p>
              </div>
            </div>
          </div>

          {/* Grid Values Panel */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`rounded-xl border border-gold/10 bg-chocolate-light/30 p-6 space-y-4 hover:border-gold/30 transition-all duration-300 ${
                      idx === 2 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-base font-bold text-cream">
                        {v.title}
                      </h3>
                      <p className="text-xs text-cream-dim/80 leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quote Block */}
            <blockquote className="rounded-xl border-l-[3px] border-gold bg-chocolate/40 p-5 mt-6 italic text-xs leading-relaxed text-cream-dim/95 select-none">
              "We took our Haripur culinary roots and fused them with a sophisticated chocolate-and-gold visual elegance. Each recipe is balanced perfectly—never too sweet, always profoundly rich."
              <span className="block font-sans font-bold text-[10px] uppercase tracking-wider text-gold mt-2 not-italic">
                — Head Pastry Chef & Owner, Bakeandtake
              </span>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}
