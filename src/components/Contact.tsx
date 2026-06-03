/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, BadgeCheck, Sparkles } from 'lucide-react';
import { BusinessSettings } from '../types';
import { motion } from 'motion/react';

interface ContactProps {
  settings: BusinessSettings;
}

export default function Contact({ settings }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // High conversion WhatsApp integration for general inquiries
  const handleSubmitPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappText = `Hi, my name is ${name}. I have a query regarding Bakeandtake [${subject}]:\n\n"${message}"\n\nPlease reach back to me at: ${email || 'N/A'}`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
    
    window.open(url, '_blank', 'noreferrer');
    
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="bg-chocolate py-24 border-t border-chocolate-light/40" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/5 border border-gold/15 px-3 py-1 rounded-full">
            Keep In Touch
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Visit Our Bakery & Cafe
          </h2>
          <p className="text-cream-dim/80 text-sm md:text-base">
            Have a custom theme request, an upcoming wedding celebration, or simply want to talk sweets? Drop us a lines or visit our kitchen in Haripur.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Info Details Column */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-gold/10 bg-chocolate-dark p-8 space-y-6 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-gold">Shop Details</h3>
              
              {/* Box Info */}
              <div className="space-y-5">
                
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans font-bold text-sm text-cream">Haripur Kitchen Address</p>
                    <p className="text-xs text-cream-dim/95 leading-relaxed">
                      {settings.address}
                    </p>
                    <span className="inline-block text-[10px] text-gold uppercase tracking-wider font-semibold">
                      Near GPO Haripur landmarks
                    </span>
                  </div>
                </div>

                {/* WhatsApp & Contact */}
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold mt-0.5">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans font-bold text-sm text-cream">WhatsApp Helpline</p>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono font-bold text-gold hover:underline block"
                    >
                      +{settings.whatsappNumber}
                    </a>
                    <span className="block text-[10px] text-cream-dim/50">
                      Response within 30 minutes
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold mt-0.5">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans font-bold text-sm text-cream">Oven Operating Hours</p>
                    <p className="text-xs text-cream-dim/90">{settings.workingHours}</p>
                    <span className="block text-[10px] text-cream-dim/50">
                      Deliveries scheduled till midnight
                    </span>
                  </div>
                </div>

              </div>

              {/* Decorative Map Frame (styled to match theme rather than a default bright map) */}
              <div className="pt-4 border-t border-chocolate-light/50">
                <div className="relative rounded-lg overflow-hidden border border-gold/15 bg-chocolate-light p-6 text-center space-y-3">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="font-serif text-sm font-bold text-gold">Haripur Delivery Zone</p>
                  <p className="text-[11px] text-cream-dim/80 leading-relaxed max-w-xs mx-auto">
                    We offer warm doorstep delivery to Main Bazar, Khalabat Township, University Road, Kangra, and surrounding locations in Haripur district.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-gold/15 bg-chocolate-dark p-8 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-cream mb-6 flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-gold" />
                <span>Custom Inquiries & Party Bookings</span>
              </h3>

              <form onSubmit={handleSubmitPrompt} className="space-y-5">
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wider uppercase text-cream-dim/80">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Muhammad Ali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wider uppercase text-cream-dim/80">
                      Your Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g., ali@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold tracking-wider uppercase text-cream-dim/80">
                    Inquiry Category
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold cursor-pointer"
                  >
                    <option value="General Inquiry">General Questions / Price Check</option>
                    <option value="Custom Event Cake">Birthday / Wedding Order Request</option>
                    <option value="Bulk Order">Bakery Catering & Party Supplies</option>
                    <option value="Feedback">Chef review & Feedback</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold tracking-wider uppercase text-cream-dim/80">
                    What can we bake for you? *
                  </label>
                  <textarea
                    required
                    placeholder="Provide details about your theme, desired weight, sponge preference, delivery date, etc."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    maxLength={500}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-transparent border-2 border-gold hover:bg-gold hover:text-chocolate px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold transition-all duration-300 cursor-pointer shadow-lg shadow-gold/5"
                >
                  <Phone className="h-4.5 w-4.5" />
                  <span>Send Inquiry to Chef via WhatsApp</span>
                </button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-gold/10 border border-gold/30 p-3 flex items-center space-x-2 text-xs text-gold font-semibold"
                  >
                    <BadgeCheck className="h-4.5 w-4.5 shrink-0" />
                    <span>Inquiry converted! Check your WhatsApp window to send.</span>
                  </motion.div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
