import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, MenuCategory } from '../types/restaurant';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Flame, 
  Plus, 
  Edit3, 
  UtensilsCrossed,
  X,
  Coffee,
  GlassWater
} from 'lucide-react';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onEditDish?: (dish: MenuItem) => void;
}

const CATEGORIES: { id: MenuCategory; label: string; icon?: string }[] = [
  { id: 'all', label: 'All Specialties' },
  { id: 'beverages', label: 'Beverages & Shakes (مشروبات)', icon: '🥤' },
  { id: 'tenderloins', label: 'Giant Tenderloins', icon: '🥩' },
  { id: 'breakfast', label: 'Breakfast All Day', icon: '🍳' },
  { id: 'burgers', label: 'Burgers & Melts', icon: '🍔' },
  { id: 'dinners', label: 'Homestyle Dinners', icon: '🍗' },
  { id: 'sides_sweets', label: 'Sides & Sweets', icon: '🥧' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectDish, onEditDish }) => {
  const { 
    menuItems, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    addToCart,
    isAdmin 
  } = useRestaurant();

  // Filter items based on category and search query
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (catId: MenuCategory) => {
    if (catId === 'all') return menuItems.length;
    return menuItems.filter(i => i.category === catId).length;
  };

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#111115] border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-full">
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Kitchen, Griddle &amp; Soda Fountain</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-stone-100 tracking-tight">
              Food &amp; Drinks Menu
            </h2>
            <p className="text-sm sm:text-base text-stone-400">
              Discover all-day breakfast, colossal tenderloins, fresh smashed burgers, and ice-cold hand-spun malt shakes &amp; bottomless diner coffee.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, drinks or ingredients..."
              className="w-full pl-10 pr-9 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-950/20'
                    : 'bg-stone-900/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.label}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono-numeric ${
                  isActive ? 'bg-stone-950 text-amber-300 font-bold' : 'bg-stone-800 text-stone-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Admin notice indicator if active */}
        {isAdmin && (
          <div className="mb-6 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-300">
            <span>✨ <strong>Owner Mode Active:</strong> You can click the pencil icon on any dish or beverage to edit its price, name, or description directly.</span>
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-stone-900/40 rounded-2xl border border-stone-800/80 p-8">
            <UtensilsCrossed className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-200">No dishes or drinks match your search</h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Try searching for something else like "coffee", "shake", "tenderloin", "gravy", or clear filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => {
              const animClass = index % 3 === 0 
                ? 'animate-living-1' 
                : index % 3 === 1 
                ? 'animate-living-2' 
                : 'animate-living-3';

              return (
              <div
                key={item.id}
                className="group relative bg-[#17171c] border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/70"
              >
                {/* Photo Top with continuous living cinemagraph motion */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover ${animClass}`}
                    loading="lazy"
                  />
                  
                  {/* Living Frost shimmer overlay for cold items */}
                  {item.temperature === 'iced' && (
                    <div className="absolute inset-0 animate-frost pointer-events-none" />
                  )}
                  {/* Living Steam overlay for hot items */}
                  {item.temperature === 'hot' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/30 via-transparent to-transparent pointer-events-none" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#17171c] via-transparent to-transparent opacity-90" />

                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {item.temperature === 'hot' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 bg-amber-950/85 px-2 py-0.5 rounded backdrop-blur-md border border-amber-500/40 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>Hot</span>
                      </span>
                    )}
                    {item.temperature === 'iced' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-200 bg-cyan-950/85 px-2 py-0.5 rounded backdrop-blur-md border border-cyan-500/40 flex items-center gap-1">
                        <GlassWater className="w-3 h-3 text-cyan-400" />
                        <span>Ice Cold</span>
                      </span>
                    )}
                    {item.temperature === 'chilled' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200 bg-purple-950/85 px-2 py-0.5 rounded backdrop-blur-md border border-purple-500/40">
                        Hand-Spun
                      </span>
                    )}
                    {item.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-stone-200 bg-black/75 px-2 py-0.5 rounded backdrop-blur-md border border-stone-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-3 right-3 font-mono-numeric font-bold text-base text-amber-300 bg-black/85 px-2.5 py-0.5 rounded-lg backdrop-blur-md border border-stone-700 z-10">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quick Admin Edit Button */}
                  {isAdmin && onEditDish && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditDish(item);
                      }}
                      className="absolute bottom-3 right-3 p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg cursor-pointer transition-colors z-20"
                      title="Quick edit this item"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      <span className="capitalize font-medium text-amber-400/90">{item.category.replace('_', ' & ')}</span>
                      {item.calories && (
                        <>
                          <span>·</span>
                          <span>{item.calories}</span>
                        </>
                      )}
                      {!item.isAvailable && (
                        <>
                          <span>·</span>
                          <span className="text-red-400 font-semibold">Sold Out Today</span>
                        </>
                      )}
                    </div>

                    <h3 
                      onClick={() => onSelectDish(item)}
                      className="font-display font-bold text-lg text-stone-100 group-hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {item.servingNote && (
                      <p className="text-[11px] text-amber-400/90 italic">
                        "{item.servingNote}"
                      </p>
                    )}
                  </div>

                  {/* Add to Order Button */}
                  <div className="pt-3 flex items-center gap-2 border-t border-stone-800/80">
                    <button
                      onClick={() => addToCart(item, 1)}
                      disabled={!item.isAvailable}
                      className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        item.isAvailable 
                          ? 'text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-sm'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{item.isAvailable ? 'Add to Pickup' : 'Unavailable'}</span>
                    </button>

                    <button
                      onClick={() => onSelectDish(item)}
                      className="py-2.5 px-3.5 rounded-xl text-xs font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
          </div>
        )}

      </div>
    </section>
  );
};
