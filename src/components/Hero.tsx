import React, { useState, useEffect, useRef } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Star, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Sparkles
} from 'lucide-react';

interface HeroSlide {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  description: string;
  image: string;
  badge: string;
  badgeType: 'special' | 'drink' | 'breakfast' | 'burger';
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "tenderloin-classic",
    name: "The Famous Giant Pork Tenderloin",
    categoryName: "House Legend",
    price: 13.99,
    description: "Hand-pounded center-cut pork loin, double breaded in signature spices, fried golden crisp. Spills right off the bun!",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    badge: "🔥 Bigger Than The Bun™",
    badgeType: "special"
  },
  {
    id: "bev-shake-chocolate",
    name: "Hand-Spun Old-Fashioned Milkshakes",
    categoryName: "Diner Beverages & Shakes",
    price: 6.49,
    description: "Crafted with pure vanilla bean custard, Belgian fudge, and malt powder. Served with whipped cream and the extra frost mixer cup!",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
    badge: "🥤 Hand-Spun All Day",
    badgeType: "drink"
  },
  {
    id: "breakfast-papaws",
    name: "Papaw's Breakfast Feast & Scratch Gravy",
    categoryName: "All-Day Breakfast",
    price: 15.49,
    description: "Scrambled farm eggs, golden buttermilk biscuits split open and drenched in peppery country sausage gravy, grilled hashbrowns & melted cheddar.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=1200&auto=format&fit=crop",
    badge: "🍳 Scratch Gravy at 5:30 AM",
    badgeType: "breakfast"
  },
  {
    id: "burger-double-bacon",
    name: "Double Bacon Smashed Cheeseburger",
    categoryName: "Griddle Burger",
    price: 17.99,
    description: "Two 1/3-lb Midwestern patties smashed on the griddle with caramelized edges, thick-cut smoked bacon, and double melted American cheese.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    badge: "🥩 Sizzling Flat Top",
    badgeType: "burger"
  }
];

export const Hero: React.FC = () => {
  const { info, setIsReservationOpen, setIsCartOpen, addToCart, menuItems } = useRestaurant();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Auto-advance slides every 5.5 seconds if isPlaying is true
  useEffect(() => {
    if (!isPlaying) {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }

    slideTimerRef.current = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isPlaying, currentSlideIndex]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((currentSlideIndex + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((currentSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const scrollToMenu = (category?: string) => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAddSlide = () => {
    const matched = menuItems.find(m => m.id === currentSlide.id) || menuItems[0];
    addToCart(matched, 1);
  };

  return (
    <section className="relative overflow-hidden bg-[#101014] pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-stone-800/80">
      {/* Background ambient warmth glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-600/10 via-amber-900/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Location & Status Kicker */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{info.address} · {info.neighborhood}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-stone-300 font-medium bg-stone-900/80 border border-stone-800 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Open for Dine-In, Pickup &amp; Drinks</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-bold text-stone-100 tracking-tight leading-[1.12]">
              Honest Kansas Comfort,{' '}
              <span className="italic font-normal text-amber-400">Fried to Golden Perfection.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-xl">
              {info.subheading}
            </p>

            {/* Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-stone-300 text-xs bg-stone-900/50 border border-stone-800/80 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Giant Tenderloins</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300 text-xs bg-stone-900/50 border border-stone-800/80 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>All-Day Breakfast</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-stone-300 text-xs bg-stone-900/50 border border-stone-800/80 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hand-Spun Shakes</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => scrollToMenu()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-lg shadow-amber-950/40 cursor-pointer"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700/80 rounded-xl transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Order Pickup</span>
              </button>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-300 hover:text-white bg-transparent hover:bg-stone-900/50 border border-stone-800 hover:border-stone-700 rounded-xl transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Book a Table</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-3 flex items-center gap-4 border-t border-stone-800/70">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-stone-400">
                <span className="font-semibold text-stone-200">4.8 / 5.0</span> on Google Maps · Historic Muncie Favorite
              </div>
            </div>

          </div>

          {/* Right Column: Animated Motion Showcase (يجذب العملاء بالحركة الحية) */}
          <div className="lg:col-span-6 relative">
            
            {/* The Main Animated Card */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-700/80 bg-stone-900 shadow-2xl shadow-black/90 group">
              
              {/* Image Frame with Ken Burns Animation */}
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden bg-black">
                <img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={currentSlide.name}
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    isPlaying ? 'animate-ken-burns' : 'scale-100'
                  }`}
                />
                
                {/* Gradient shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                {/* Animated Floating Steam or Ice Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-300 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/40 shadow-lg flex items-center gap-1.5 animate-float">
                    <span>{currentSlide.badge}</span>
                  </span>
                </div>

                {/* Motion Play/Pause Indicator & Controls */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-700 text-xs text-stone-300">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
                    title={isPlaying ? "Pause automatic animation" : "Resume animation"}
                  >
                    {isPlaying ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <Pause className="w-3 h-3 text-emerald-400" />
                        <span className="text-[11px] font-medium text-emerald-300">Live Motion</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-amber-400" />
                        <span className="text-[11px] font-medium text-stone-400">Paused</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Prev / Next Arrows */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white transition-all backdrop-blur-sm cursor-pointer"
                  aria-label="Previous specialty"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white transition-all backdrop-blur-sm cursor-pointer"
                  aria-label="Next specialty"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar indicating time to next slide */}
              {isPlaying && (
                <div className="w-full bg-stone-800 h-1 overflow-hidden">
                  <div 
                    key={currentSlideIndex}
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-[5500ms] ease-linear w-full"
                    style={{ animation: 'none' }}
                  />
                </div>
              )}

              {/* Card Details Overlay */}
              <div className="p-5 sm:p-6 bg-[#15151a] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider uppercase text-amber-400">
                    {currentSlide.categoryName}
                  </span>
                  <span className="font-mono-numeric font-bold text-amber-300 text-xl">
                    ${currentSlide.price.toFixed(2)}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-xl sm:text-2xl text-stone-100">
                  {currentSlide.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 leading-relaxed">
                  {currentSlide.description}
                </p>

                {/* Bottom Action inside card */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-800/80">
                  {/* Thumbnails to jump between slides */}
                  <div className="flex items-center gap-2">
                    {HERO_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`w-9 h-9 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                          idx === currentSlideIndex 
                            ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105' 
                            : 'border-stone-700 opacity-60 hover:opacity-100'
                        }`}
                        title={slide.name}
                      >
                        <img src={slide.image} alt={slide.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleQuickAddSlide}
                    className="inline-flex items-center gap-2 py-2 px-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Subtle Floating Trust Badge */}
            <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 bg-[#18181e]/95 border border-stone-700/80 p-3 rounded-xl shadow-xl backdrop-blur-md animate-float">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-100">Freshly Made On Kaw Dr</p>
                <p className="text-[10px] text-stone-400">Never frozen · Served steaming hot</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
