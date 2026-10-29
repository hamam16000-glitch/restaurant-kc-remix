import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, Calendar, Tag, ArrowRight } from 'lucide-react';

export const SpecialsSection: React.FC = () => {
  const { specials, addToCart, menuItems } = useRestaurant();

  const handleOrderSpecial = (specialTitle: string, price: number) => {
    // Find matching dish or create virtual item for cart
    const matched = menuItems.find(m => m.name.toLowerCase().includes('tenderloin') || m.name.toLowerCase().includes('breakfast'));
    if (matched) {
      addToCart({
        ...matched,
        name: `Special: ${specialTitle}`,
        price: price
      });
    }
  };

  return (
    <section id="specials" className="py-20 bg-[#0e0e11] border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Weekly Grill &amp; Smoker Specials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-100 tracking-tight">
            Rotating Neighborhood Deals
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Handcrafted combinations at special neighbor-friendly prices. Available all day while daily supplies last!
          </p>
        </div>

        {/* Specials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specials.map((sp, spIdx) => {
            const animClass = spIdx === 0 ? 'animate-living-1' : spIdx === 1 ? 'animate-living-2' : 'animate-living-3';
            return (
            <div
              key={sp.id}
              className="bg-[#16161b] border border-stone-800 hover:border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/20"
            >
              <div className="space-y-4">
                {/* Day Badge & Promo Tag */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-lg">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Every {sp.day}</span>
                  </span>

                  {sp.badge && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      {sp.badge}
                    </span>
                  )}
                </div>

                {/* Photo with continuous living motion */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-900 relative">
                  <img
                    src={sp.image}
                    alt={sp.title}
                    className={`w-full h-full object-cover ${animClass}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-display font-bold text-xl text-stone-100 leading-snug">
                    {sp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed">
                    {sp.description}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono-numeric font-bold text-2xl text-amber-300">
                    ${sp.price.toFixed(2)}
                  </span>
                  {sp.originalPrice && (
                    <span className="font-mono-numeric text-xs text-stone-500 line-through">
                      ${sp.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleOrderSpecial(sp.title, sp.price)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Order Deal
                </button>
              </div>

            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
