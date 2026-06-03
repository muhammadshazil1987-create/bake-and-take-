/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cake, BusinessSettings } from './types';

// Let's import the generated images or use stable paths. In Vite, we can reference absolute paths or relative imports.
// To ensure it works in all build environments, let's use standard relative paths that Vite understands perfectly.
import chocolateFudgeImg from './assets/images/chocolate_fudge_cake_png_1780397112930.png';
import redVelvetImg from './assets/images/red_velvet_cake_png_1780397146897.png';
import lotusCaramelImg from './assets/images/lotus_caramel_cake_png_1780397180116.png';

export const DEFAULT_CAKES: Cake[] = [
  {
    id: 'cake-1',
    title: 'Double Chocolate Fudge Cake',
    description: 'Super moist, layered chocolate fudge cake coated in rich, velvety chocolate ganache and premium cocoa glaze. Haripur\'s favorite chocolate indulgence.',
    price: 1450,
    image: chocolateFudgeImg,
    category: 'Signature Cakes',
    available: true,
    isPopular: true
  },
  {
    id: 'cake-2',
    title: 'Royal Red Velvet',
    description: 'Elegant crimson layers stacked with luscious, rich vanilla cream cheese frosting and fine edible gold sprinkles. The epitome of celebratory premium cakes.',
    price: 1600,
    image: redVelvetImg,
    category: 'Signature Cakes',
    available: true,
    isPopular: true
  },
  {
    id: 'cake-3',
    title: 'Salted Caramel Biscoff',
    description: 'Delicate salted caramel glaze draped over buttery Lotus Biscoff crunch layers and moist vanilla bean sponge. Pure caramelized perfection.',
    price: 1750,
    image: lotusCaramelImg,
    category: 'Premium Cakes',
    available: true,
    isPopular: true
  },
  {
    id: 'cake-4',
    title: 'Golden Almond Crunch',
    description: 'Light, fluffy almond-infused cloud sponge layered with vanilla bean custard and sweet, caramelized honey-toasted almonds.',
    price: 1350,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
    category: 'Premium Cakes',
    available: true
  },
  {
    id: 'cake-5',
    title: 'Black Forest Classic',
    description: 'Decadent dark chocolate sponge layered with Haripur\'s finest local cherries, premium cream, and chocolate bark shavings.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop',
    category: 'Traditional Favorites',
    available: true
  },
  {
    id: 'cake-6',
    title: 'Zesty Lemon Meringue Cake',
    description: 'Bright citrus lemon layers paired with smooth lemon curd, finished with light whipped marshmallow meringue frosting.',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1535141123063-0bd34beef968?q=80&w=600&auto=format&fit=crop',
    category: 'Traditional Favorites',
    available: true
  }
];

export const CATEGORIES = [
  'All',
  'Signature Cakes',
  'Premium Cakes',
  'Traditional Favorites'
];

export const DEFAULT_SETTINGS: BusinessSettings = {
  whatsappNumber: '923129876543', // Default Pakistani number (for Haripur)
  businessName: 'Bakeandtake',
  location: 'Haripur, Pakistan',
  address: 'Main Bazar Road, Near GPO, Haripur',
  workingHours: '10:00 AM - 10:00 PM (Daily)',
  currencySymbol: 'Rs.'
};

const STORAGE_CAKES_KEY = 'bakeandtake_cakes_store_v1';
const STORAGE_SETTINGS_KEY = 'bakeandtake_settings_store_v1';

export function getStoredCakes(): Cake[] {
  try {
    const data = localStorage.getItem(STORAGE_CAKES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading localStorage cakes:', e);
  }
  return DEFAULT_CAKES;
}

export function saveStoredCakes(cakes: Cake[]): void {
  try {
    localStorage.setItem(STORAGE_CAKES_KEY, JSON.stringify(cakes));
  } catch (e) {
    console.error('Error writing localStorage cakes:', e);
  }
}

export function getStoredSettings(): BusinessSettings {
  try {
    const data = localStorage.getItem(STORAGE_SETTINGS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading localStorage settings:', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveStoredSettings(settings: BusinessSettings): void {
  try {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error writing localStorage settings:', e);
  }
}
