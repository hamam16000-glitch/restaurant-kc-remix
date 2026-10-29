import React, { useState } from 'react';
import { MenuItem } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';
import { X, ShoppingBag, Plus, Minus, Flame, Sparkles } from 'lucide-react';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose }) => {
  const { addToCart } = useRestaurant();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!dish) return null;

  const handleAddToCart = () => {
    addToCart(dish, quantity, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#16161b] border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-stone-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dish preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Image */}
        <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover animate-living-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16161b] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-3 left-4 font-mono-numeric font-bold text-2xl text-amber-300 bg-black/70 px-3 py-0.5 rounded-lg border border-stone-700">
            ${dish.price.toFixed(2)}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
              <span className="uppercase tracking-wider">{dish.category.replace('_', ' & ')}</span>
              {dish.calories && <span>· {dish.calories}</span>}
              {!dish.isAvailable && <span className="text-red-400 font-bold">· Currently Sold Out</span>}
            </div>

            <h3 className="font-display font-bold text-2xl text-stone-100">
              {dish.name}
            </h3>

            <p className="text-sm text-stone-300 mt-2 leading-relaxed">
              {dish.description}
            </p>

            {dish.servingNote && (
              <p className="text-xs text-amber-400/90 italic mt-2 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20">
                ⭐ {dish.servingNote}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {dish.tags.map(tag => (
              <span key={tag} className="text-xs text-stone-300 bg-stone-900 border border-stone-800 px-2.5 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          {/* Special Instructions */}
          <div className="space-y-1.5 pt-2 border-t border-stone-800">
            <label className="text-xs font-semibold text-stone-300">
              Special kitchen requests (e.g., extra pickles, gravy on the side):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g., Well-done fries, onions on side..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quantity Selector & Add Button */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-stone-400 hover:text-white p-1"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono-numeric font-bold text-stone-100 text-sm min-w-5 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-stone-400 hover:text-white p-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!dish.isAvailable}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                dish.isAvailable
                  ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-lg shadow-amber-950/30'
                  : 'bg-stone-800 text-stone-500 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Pickup · ${(dish.price * quantity).toFixed(2)}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
