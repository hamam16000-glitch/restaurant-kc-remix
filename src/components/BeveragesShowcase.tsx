import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';
import { ShoppingBag, Coffee, GlassWater, Flame, Sparkles, ArrowRight } from 'lucide-react';

interface BeveragesShowcaseProps {
  onSelectDish: (dish: MenuItem) => void;
}

export const BeveragesShowcase: React.FC<BeveragesShowcaseProps> = ({ onSelectDish }) => {
  const { menuItems, addToCart } = useRestaurant();

  // Get all beverage items
  const beverages = menuItems.filter(item => item.category === 'beverages');

  if (beverages.length === 0) return null;

  return (
    <section id="beverages-bar" className="py-20 sm:py-24 bg-[#0d0d10] border-b border-stone-800/80 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1 rounded-full shadow-sm">
              <GlassWater className="w-3.5 h-3.5 text-cyan-400" />
              <span>Diner Soda Fountain &amp; Coffee Bar (قسم المشروبات)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-stone-100 tracking-tight">
              Hand-Spun Shakes &amp; Chilled Drinks
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              Piping hot bottomless diner coffee brewed fresh every 20 minutes, tall frosty hand-spun malt shakes, country-style sweet tea, and ice-cold soda fountain pours.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 border border-amber-500/20 px-3 py-1.5 rounded-lg font-medium">
              <Coffee className="w-3.5 h-3.5" />
              <span>Bottomless Refills On Coffee &amp; Tea</span>
            </span>
          </div>
        </div>

        {/* Drinks Grid with Living Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {beverages.map((drink, index) => {
            // Assign alternating living animation classes so photos move dynamically
            const animClass = index % 3 === 0 
              ? 'animate-living-1' 
              : index % 3 === 1 
              ? 'animate-living-2' 
              : 'animate-living-3';

            const isHot = drink.temperature === 'hot';
            const isIced = drink.temperature === 'iced';

            return (
              <div
                key={drink.id}
                className="group relative bg-[#15151b] border border-stone-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30"
              >
                {/* Image Container with Continuous Living Cinemagraph Motion */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className={`w-full h-full object-cover ${animClass}`}
                    loading="lazy"
                  />
                  
                  {/* Subtle frost shimmer overlay for iced drinks, or warmth for hot coffee */}
                  {isIced && (
                    <div className="absolute inset-0 animate-frost pointer-events-none" />
                  )}
                  {isHot && (
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent pointer-events-none" />
                  )}

                  {/* Gradient shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15151b] via-transparent to-transparent opacity-80" />

                  {/* Live Status Badge */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                    {isHot ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 bg-amber-950/85 px-2.5 py-1 rounded-md border border-amber-500/40 backdrop-blur-md">
                        <Flame className="w-3 h-3 text-amber-400 animate-steam" />
                        <span>Piping Hot</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200 bg-cyan-950/85 px-2.5 py-1 rounded-md border border-cyan-500/40 backdrop-blur-md">
                        <GlassWater className="w-3 h-3 text-cyan-400" />
                        <span>Ice Chilled</span>
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-3 right-3 z-10 font-mono-numeric font-bold text-sm sm:text-base text-amber-300 bg-black/85 px-2.5 py-0.5 rounded-lg backdrop-blur-md border border-stone-700">
                    ${drink.price.toFixed(2)}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                      <span>{drink.tags[0] || 'Diner Drink'}</span>
                      {drink.calories && <span>· {drink.calories}</span>}
                    </div>

                    <h3 
                      onClick={() => onSelectDish(drink)}
                      className="font-display font-bold text-base sm:text-lg text-stone-100 group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                    >
                      {drink.name}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {drink.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2 border-t border-stone-800/80">
                    <button
                      onClick={() => addToCart(drink, 1)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Pickup</span>
                    </button>

                    <button
                      onClick={() => onSelectDish(drink)}
                      className="py-2 px-2.5 rounded-xl text-xs font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
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
