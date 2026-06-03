/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Cake {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string; // Base64 or URL
  category: string;
  available: boolean;
  isPopular?: boolean;
  isCustom?: boolean; // True if added via modern client-side CMS
}

export interface BusinessSettings {
  whatsappNumber: string; // e.g. "923123456789"
  businessName: string;
  location: string;
  address: string;
  workingHours: string;
  currencySymbol: string;
}

export interface OrderFormState {
  customerName: string;
  customerPhone: string;
  quantity: number;
  messageNote: string;
  additionalCustomization?: string;
}
