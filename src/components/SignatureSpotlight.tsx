import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';
import { ShoppingBag, Sparkles, Check, Flame } from 'lucide-react';

interface SignatureSpotlightProps {
  onSelectDish: (dish: MenuItem) => void;
}

export const SignatureSpotlight: React.FC<SignatureSpotlightProps> = ({ onSelectDish }) => {
  const { menuItems, addToCart } = useRestaurant();

  // Find the signature spotlight items
  const tenderloin = menuItems.find(i => i.id === 'tenderloin-classic') || menuItems[0];
  const papaws = menuItems.find(i => i.id === 'breakfast-papaws') || menuItems[3];
  const doubleBacon = menuItems.find(i => i.id === 'burger-double-bacon') || menuItems[6];

  const featured = [tenderloin, papaws, doubleBacon].filter(Boolean);

  return (
    <section id="spotlight" className="py-16 sm:py-24 bg-[#0e0e11] border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-full">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>The Kaw Drive Legends · Living Kitchen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-100 tracking-tight">
            Our Hall of Fame Dishes
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            These are the staples that built our reputation in Kansas City. Generous portions, unmatched crunch, and secret scratch family recipes.
          </p>
        </div>

        {/* 3 Featured Cards Grid with Living Cinemagraph Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((dish, index) => {
            const animClass = index === 0 ? 'animate-living-1' : index === 1 ? 'animate-living-2' : 'animate-living-3';
            
            return (
              <div 
                key={dish.id}
                className="group relative bg-[#151519] border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-950/20"
              >
                {/* Image Container with Continuous Living Cinemagraph Motion */}
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-900">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className={`w-full h-full object-cover ${animClass}`}
                    loading="lazy"
                  />
                  
                  {/* Atmospheric warmth overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151519] via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/40 shadow-sm flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>{index === 0 ? "★ #1 Signature Dish" : index === 1 ? "★ Breakfast Icon" : "★ Diner Smash"}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 font-mono-numeric font-bold text-lg text-amber-300 bg-black/85 px-2.5 py-0.5 rounded-lg backdrop-blur-md border border-stone-700 z-10">
                    ${dish.price.toFixed(2)}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      {dish.tags.slice(0, 2).map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          <span>{tag}</span>
                          {tIdx < Math.min(dish.tags.length - 1, 1) && <span>·</span>}
                        </React.Fragment>
                      ))}
                      {dish.calories && (
                        <>
                          <span>·</span>
                          <span>{dish.calories}</span>
                        </>
                      )}
                    </div>

                    <h3 
                      onClick={() => onSelectDish(dish)}
                      className="font-display font-bold text-xl text-stone-100 group-hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {dish.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-400 line-clamp-3 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-2 flex items-center gap-2 border-t border-stone-800/80">
                    <button
                      onClick={() => addToCart(dish, 1)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Pickup</span>
                    </button>

                    <button
                      onClick={() => onSelectDish(dish)}
                      className="py-2.5 px-3.5 rounded-xl text-xs font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
