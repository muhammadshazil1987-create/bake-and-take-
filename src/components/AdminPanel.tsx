/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Cake, BusinessSettings } from '../types';
import { 
  Plus, Edit, Trash2, Check, Image as ImageIcon, Save, RefreshCw, 
  Store, ToggleLeft, ToggleRight, ArrowLeft, Upload, Grid, Settings, Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPanelProps {
  cakes: Cake[];
  onAddCake: (cake: Omit<Cake, 'id' | 'isCustom'>) => void;
  onUpdateCake: (cake: Cake) => void;
  onRemoveCake: (id: string) => void;
  onResetDefaults: () => void;
  settings: BusinessSettings;
  onUpdateSettings: (settings: BusinessSettings) => void;
  onClose: () => void;
}

const PRESET_IMAGES = [
  { name: 'Gourmet Double Fudge', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop' },
  { name: 'Elegant Strawberry Glaze', url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=400&auto=format&fit=crop' },
  { name: 'Luxury White Vanilla', url: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=400&auto=format&fit=crop' },
  { name: 'Gold Caramel Drizzle', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop' },
  { name: 'Chantilly Fruit Festival', url: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=400&auto=format&fit=crop' },
  { name: 'Decadent Black Forest', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop' }
];

export default function AdminPanel({
  cakes,
  onAddCake,
  onUpdateCake,
  onRemoveCake,
  onResetDefaults,
  settings,
  onUpdateSettings,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'settings'>('manage');
  const [editingCakeId, setEditingCakeId] = useState<string | null>(null);

  // New item state
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Signature Cakes');
  const [newDescription, setNewDescription] = useState('');
  const [newImagePath, setNewImagePath] = useState(PRESET_IMAGES[0].url);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  // Editing items state
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImagePath, setEditImagePath] = useState('');

  // Settings State
  const [localSettings, setLocalSettings] = useState<BusinessSettings>({ ...settings });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Refs for upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Support local upload as base64 encoder
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'new' | 'edit') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (target === 'new') {
        setNewImagePath(base64String);
      } else {
        setEditImagePath(base64String);
      }
      setImageUploadLoading(false);
    };
    reader.onerror = () => {
      alert('Failed to read visual asset, please try another layout.');
      setImageUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewCakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    onAddCake({
      title: newTitle,
      description: newDescription || 'Fresh premium recipe cooked with the finest organic sweet imports.',
      price: parseFloat(newPrice),
      image: newImagePath,
      category: newCategory,
      available: true
    });

    // Reset Form
    setNewTitle('');
    setNewPrice('');
    setNewDescription('');
    setNewImagePath(PRESET_IMAGES[0].url);
    setActiveTab('manage');
  };

  const startEditMode = (cake: Cake) => {
    setEditingCakeId(cake.id);
    setEditTitle(cake.title);
    setEditPrice(cake.price.toString());
    setEditCategory(cake.category);
    setEditDescription(cake.description);
    setEditImagePath(cake.image);
  };

  const handleSaveEdit = (id: string) => {
    if (!editTitle || !editPrice) return;

    onUpdateCake({
      id,
      title: editTitle,
      description: editDescription,
      price: parseFloat(editPrice),
      image: editImagePath,
      category: editCategory,
      available: cakes.find(c => c.id === id)?.available ?? true
    });

    setEditingCakeId(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({ ...localSettings });
    setSettingsSuccess(true);
    setTimeout(() => {
      setSettingsSuccess(false);
    }, 4000);
  };

  return (
    <div className="bg-chocolate min-h-screen py-10 border-t border-gold/20" id="admin-panel-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Admin Navigation and Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-chocolate-light/60 pb-8 mb-10 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/5 border border-gold/15 px-2.5 py-1 rounded">
              Internal Control Panel
            </span>
            <h1 className="font-serif text-2xl font-bold text-cream tracking-tight mt-1">
              Bakeandtake Bakery CMS Catalog
            </h1>
            <p className="text-xs text-cream-dim/70 mt-0.5">
              Securely scale menu items, change starting rates, and alter Haripur shop configurations. No coding required.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={onResetDefaults}
              className="flex items-center space-x-1.5 rounded-full bg-chocolate-light hover:bg-gold/10 border border-gold/25 text-gold px-4 py-2 text-xs font-semibold cursor-pointer transition-all duration-300"
              title="Reset Database to original stunning presets"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset to Defaults</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center space-x-1.5 rounded-full bg-gold hover:bg-gold-hover text-chocolate px-5 py-2 text-xs font-bold cursor-pointer transition-all duration-300 shadow-md shadow-gold/15"
            >
              <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Back to Storefront</span>
            </button>
          </div>
        </div>

        {/* Tab triggers */}
        <div className="flex items-center space-x-2 border-b border-chocolate-light/40 mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => { setActiveTab('manage'); setEditingCakeId(null); }}
            className={`flex items-center space-x-2 px-5 py-3 text-xs md:text-sm font-semibold tracking-wide border-b-2 transition-all duration-305 focus:outline-none cursor-pointer ${
              activeTab === 'manage'
                ? 'border-gold text-gold font-bold'
                : 'border-transparent text-cream-dim/80 hover:text-gold hover:border-gold/30'
            }`}
          >
            <Grid className="h-4 w-4" />
            <span>Manage Cakes ({cakes.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('add'); setEditingCakeId(null); }}
            className={`flex items-center space-x-2 px-5 py-3 text-xs md:text-sm font-semibold tracking-wide border-b-2 transition-all duration-305 focus:outline-none cursor-pointer ${
              activeTab === 'add'
                ? 'border-gold text-gold font-bold'
                : 'border-transparent text-cream-dim/80 hover:text-gold hover:border-gold/30'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Add New Cake</span>
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setEditingCakeId(null); }}
            className={`flex items-center space-x-2 px-5 py-3 text-xs md:text-sm font-semibold tracking-wide border-b-2 transition-all duration-305 focus:outline-none cursor-pointer ${
              activeTab === 'settings'
                ? 'border-gold text-gold font-bold'
                : 'border-transparent text-cream-dim/80 hover:text-gold hover:border-gold/30'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Business Settings</span>
          </button>
        </div>

        {/* TAB 1: MANAGE CAKES */}
        {activeTab === 'manage' && (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-xl border border-gold/10 bg-chocolate-dark shadow-xl">
              <table className="min-w-full divide-y divide-chocolate-light/50">
                <thead className="bg-[#1C100E]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gold">Cake Photo / Thumbnail</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gold">Product Information</th>
                    <th scope="col" className="px-6 py-4 rural-table-cell text-left text-xs font-bold uppercase tracking-wider text-gold">Category</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gold">Price Tag</th>
                    <th scope="col" className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gold">Inventory Status</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gold">Action Controls</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-chocolate-light/40 bg-chocolate-dark/30">
                  {cakes.map((cake) => {
                    const isEditing = editingCakeId === cake.id;
                    const isAvailable = cake.available;

                    return (
                      <tr key={cake.id} className="hover:bg-chocolate-light/20 transition-colors">
                        
                        {/* Column: Image */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-gold/15 bg-chocolate-light">
                            <img
                              src={isEditing ? editImagePath : cake.image}
                              alt={cake.title}
                              className="h-full w-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => editFileInputRef.current?.click()}
                                className="absolute inset-0 flex items-center justify-center bg-black/60 text-gold transition-opacity opacity-0 hover:opacity-100"
                                title="Change image"
                              >
                                <Upload className="h-4.5 w-4.5" />
                              </button>
                            )}
                          </div>
                          
                          {/* Invisible edit input file */}
                          <input
                            type="file"
                            ref={editFileInputRef}
                            onChange={(e) => handleImageUpload(e, 'edit')}
                            accept="image/*"
                            className="hidden"
                          />
                        </td>

                        {/* Column: Info */}
                        <td className="px-6 py-4 max-w-xs md:max-w-md">
                          {isEditing ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full rounded bg-chocolate-light border border-gold/20 px-3 py-1 text-xs text-cream focus:outline-none focus:border-gold"
                              />
                              <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                rows={2}
                                className="w-full rounded bg-chocolate-light border border-gold/20 px-3 py-1 text-[11px] text-cream-dim focus:outline-none focus:border-gold resize-none"
                              />
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <p className="font-serif text-sm font-bold text-cream flex items-center space-x-1.5">
                                <span>{cake.title}</span>
                                {cake.isPopular && (
                                  <span className="bg-gold/10 text-gold text-[9px] px-1 lg:px-1.5 rounded uppercase tracking-wider font-semibold">Popular</span>
                                )}
                              </p>
                              <p className="line-clamp-2 text-[11px] text-cream-dim/80">
                                {cake.description}
                              </p>
                            </div>
                          )}
                        </td>

                        {/* Column: Category */}
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-cream">
                          {isEditing ? (
                            <select
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              className="rounded bg-chocolate-light border border-gold/20 px-2 py-1 text-xs text-cream focus:outline-none focus:border-gold cursor-pointer"
                            >
                              <option value="Signature Cakes">Signature Cakes</option>
                              <option value="Premium Cakes">Premium Cakes</option>
                              <option value="Traditional Favorites">Traditional Favorites</option>
                            </select>
                          ) : (
                            <span className="rounded-full bg-chocolate-light border border-gold/10 px-2.5 py-0.5 text-[10px] text-cream">
                              {cake.category}
                            </span>
                          )}
                        </td>

                        {/* Column: Price */}
                        <td className="whitespace-nowrap px-6 py-4 font-serif text-xs font-bold text-gold">
                          {isEditing ? (
                            <div className="flex items-center space-x-1">
                              <span className="text-xs">{settings.currencySymbol}</span>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="w-20 rounded bg-chocolate-light border border-gold/20 px-2 py-1 text-xs text-gold font-bold focus:outline-none"
                              />
                            </div>
                          ) : (
                            <span>{settings.currencySymbol} {cake.price.toLocaleString()}</span>
                          )}
                        </td>

                        {/* Column: Availability status switcher */}
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => onUpdateCake({ ...cake, available: !cake.available })}
                            className="inline-flex items-center justify-center p-1 text-cream hover:text-gold transition-colors focus:outline-none"
                            title={isAvailable ? "Set as Sold out" : "Set as Available"}
                          >
                            {isAvailable ? (
                              <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                                <span>In Stock</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1.5 text-xs text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                                <span>Sold Out</span>
                              </div>
                            )}
                          </button>
                        </td>

                        {/* Column: Actions */}
                        <td className="whitespace-nowrap px-6 py-4 text-right text-xs font-medium">
                          {isEditing ? (
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleSaveEdit(cake.id)}
                                className="flex items-center space-x-1 rounded bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 cursor-pointer"
                              >
                                <Save className="h-3.5 w-3.5" />
                                <span>Save</span>
                              </button>
                              <button
                                onClick={() => setEditingCakeId(null)}
                                className="rounded bg-white/10 hover:bg-white/20 text-cream px-3 py-1.5 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end space-x-2.5">
                              <button
                                onClick={() => startEditMode(cake)}
                                className="flex items-center space-x-1 rounded bg-chocolate-light hover:bg-gold/15 border border-gold/20 text-cream-dim hover:text-gold px-2.5 py-1.5 cursor-pointer transition-colors duration-200"
                                title="Edit Title and pricing"
                              >
                                <Edit className="h-3.5 w-3.5" />
                                <span>Quick Edit</span>
                              </button>
                              <button
                                onClick={() => onRemoveCake(cake.id)}
                                className="flex items-center space-x-1 rounded bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white px-2.5 py-1.5 cursor-pointer transition-all duration-200"
                                title="Delete cake completely"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>

            {cakes.length === 0 && (
              <div className="text-center p-12 border border-dashed border-gold/20 rounded-xl bg-chocolate-dark">
                <ImageIcon className="h-12 w-12 text-gold/30 mx-auto mb-3" />
                <p className="font-serif text-lg text-cream">Your Catalog Is Empty</p>
                <p className="text-xs text-cream-dim max-w-sm mx-auto mt-1">
                  Add custom recipes layout or hit "Reset to Defaults" to inject Haripur's elite selection.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADD NEW CAKE */}
        {activeTab === 'add' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            
            {/* Form Column */}
            <form onSubmit={handleAddNewCakeSubmit} className="lg:col-span-7 bg-chocolate-dark p-8 rounded-xl border border-gold/15 space-y-5 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-gold border-b border-chocolate-light pb-3 flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Specify Cake Attributes</span>
              </h3>

              {/* Title & Price Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                <div className="sm:col-span-8 space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                    Product Title / Cake Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="e.g., Haripur Chocolate Fudge Dream"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                
                <div className="sm:col-span-4 space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                    Price ({settings.currencySymbol}) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100000}
                    placeholder="1500"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-gold font-bold focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>

              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                  Select Category Menu Slot
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="Signature Cakes">Signature Cakes</option>
                  <option value="Premium Cakes">Premium Cakes</option>
                  <option value="Traditional Favorites">Traditional Favorites</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                  Bakery Dish Description
                </label>
                <textarea
                  placeholder="Describe your crust ingredients, decoration details, frosting levels, or allergy alerts."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  maxLength={180}
                  className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                />
              </div>

              {/* Upload visual */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                    High Resolution Cover Image *
                  </label>
                  <span className="text-[10px] text-gold/80 italic font-medium">Local Computer File or Presets Gallery below</span>
                </div>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-dashed border-gold/30 bg-chocolate-light/40 hover:bg-chocolate-light transition-colors p-6 text-center cursor-pointer space-y-2 group"
                >
                  <Upload className="h-7 w-7 text-gold/60 mx-auto group-hover:scale-110 transition-transform duration-200" />
                  <p className="font-sans font-semibold text-xs text-cream group-hover:text-gold transition-colors">
                    Upload image from device
                  </p>
                  <p className="text-[10px] text-cream-dim/60">
                    Supports premium photography (PNG, JPG, JPEG, WEBP)
                  </p>
                </div>
                
                <input
                  type="file"
                  id="image"
                  ref={fileInputRef}
                  onChange={(e) => handleImageUpload(e, 'new')}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Submit trigger */}
              <button
                type="submit"
                disabled={imageUploadLoading}
                className="w-full flex items-center justify-center space-x-2 rounded-lg bg-gold hover:bg-gold-hover disabled:bg-gold/45 text-chocolate py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-gold/15 cursor-pointer"
              >
                {imageUploadLoading ? (
                  <span>Saving Image Data...</span>
                ) : (
                  <>
                    <Check className="h-4 w-4 stroke-[2.5]" />
                    <span>Upload & Inject Cake to Live Catalog</span>
                  </>
                )}
              </button>

            </form>

            {/* Live mockup layout */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-chocolate-dark p-6 rounded-xl border border-gold/10 space-y-4">
                <h3 className="font-serif text-sm font-bold text-cream-dim uppercase tracking-wider">
                  Live Public Preview Card
                </h3>

                <div className="overflow-hidden rounded-xl border border-gold/10 bg-chocolate-dark select-none shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-chocolate-light">
                    <img 
                      src={newImagePath} 
                      alt="Review Cover" 
                      className="h-full w-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-chocolate">
                      Preview Label
                    </span>
                  </div>
                  
                  <div className="p-5 space-y-2">
                    <h4 className="font-serif text-base font-bold text-cream">
                      {newTitle || 'Untitled Premium Cake'}
                    </h4>
                    <p className="text-[11px] text-cream-dim line-clamp-2 leading-relaxed">
                      {newDescription || 'Specify ingredients in the form on the left to see descriptions appear recursively...'}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-chocolate-light/35 pt-3.5 mt-2">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase tracking-wider text-cream-dim/50 font-medium">
                          Starting Price
                        </span>
                        <p className="font-serif text-sm font-bold text-gold">
                          {settings.currencySymbol} {newPrice ? parseFloat(newPrice).toLocaleString() : '0'}
                        </p>
                      </div>
                      <span className="rounded bg-gold/10 p-1.5 text-gold">
                        <ImageIcon className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preset Visuals Selector */}
              <div className="bg-chocolate-dark p-6 rounded-xl border border-gold/10 space-y-4.5">
                <h3 className="font-serif text-sm font-bold text-cream-dim uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="h-4 w-4 text-gold animate-pulse" />
                  <span>Choose Baker Presets</span>
                </h3>
                <p className="text-[11px] text-cream-dim/75 leading-relaxed">
                  No photography ready? Choose one of our premium preset cake visuals to populate your catalog in standard professional elegance:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewImagePath(preset.url)}
                      className={`relative aspect-square rounded-lg overflow-hidden border transition-all duration-300 p-0.5 cursor-pointer ${
                        newImagePath === preset.url
                          ? 'border-gold bg-gold/10 scale-95 shadow-md shadow-gold/20'
                          : 'border-white/10 opacity-75 hover:opacity-100 hover:border-gold/30'
                      }`}
                      title={preset.name}
                    >
                      <img 
                        src={preset.url} 
                        alt={preset.name} 
                        className="h-full w-full object-cover rounded-md" 
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: BUSINESS SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSaveSettings} className="bg-chocolate-dark p-8 rounded-xl border border-gold/15 space-y-6 shadow-xl">
              
              <div className="border-b border-chocolate-light pb-4">
                <h3 className="font-serif text-lg font-bold text-gold flex items-center space-x-2">
                  <Store className="h-5 w-5" />
                  <span>Shop Location & Helpline Coordinates</span>
                </h3>
                <p className="text-xs text-cream-dim/80 mt-1">
                  Revise numbers, prices labels, and operational hours visible to GPO Haripur neighborhood clients.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                    Bakery Name
                  </label>
                  <input
                    type="text"
                    required
                    value={localSettings.businessName}
                    onChange={(e) => setLocalSettings({ ...localSettings, businessName: e.target.value })}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>

                {/* WhatsApp Connection helpline */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                    WhatsApp Shop Line *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 923129876543"
                    value={localSettings.whatsappNumber}
                    onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-mono text-xs text-gold font-bold focus:outline-none focus:border-gold"
                  />
                  <span className="block text-[10px] text-cream-dim/50">
                    Provide country code without '+' (e.g., 92 for Pakistan).
                  </span>
                </div>

                {/* Country Location label */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                    General Location
                  </label>
                  <input
                    type="text"
                    required
                    value={localSettings.location}
                    onChange={(e) => setLocalSettings({ ...localSettings, location: e.target.value })}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none"
                  />
                </div>

                {/* Currency symbol */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    required
                    value={localSettings.currencySymbol}
                    onChange={(e) => setLocalSettings({ ...localSettings, currencySymbol: e.target.value })}
                    className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-gold font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Precise Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                  Full Merchant Address
                </label>
                <input
                  type="text"
                  required
                  value={localSettings.address}
                  onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                  className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none"
                />
              </div>

              {/* Working Hours */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cream-dim/80">
                  Operational Hours
                </label>
                <input
                  type="text"
                  required
                  value={localSettings.workingHours}
                  onChange={(e) => setLocalSettings({ ...localSettings, workingHours: e.target.value })}
                  className="w-full rounded bg-chocolate-light border border-gold/15 px-4 py-3 font-sans text-xs text-cream focus:outline-none"
                />
              </div>

              {/* Submit Trigger Actions */}
              <div className="pt-4 border-t border-chocolate-light flex items-center justify-between gap-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 rounded-lg bg-gold hover:bg-gold-hover text-chocolate px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-gold/15 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Settings Coordinates</span>
                </button>

                {settingsSuccess && (
                  <span className="text-xs text-gold bg-gold/5 border border-gold/20 rounded px-3 py-1 animate-pulse">
                    Configurations updated dynamically!
                  </span>
                )}
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
