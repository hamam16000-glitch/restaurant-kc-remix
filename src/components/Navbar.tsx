import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Menu as MenuIcon, 
  X, 
  Flame, 
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { info, cartCount, cartTotal, setIsCartOpen, setIsReservationOpen, isAdmin } = useRestaurant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121215]/95 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-950/40 border border-amber-500/30">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl sm:text-2xl text-stone-100 tracking-tight">
                  {info.name}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-400/90 font-medium tracking-wide flex items-center gap-1.5">
                <span>{info.neighborhood}</span>
                <span className="text-stone-600">·</span>
                <span>{info.address}</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button 
              onClick={() => scrollTo('menu')} 
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Full Menu
            </button>
            <button 
              onClick={() => scrollTo('spotlight')} 
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Giant Tenderloin
            </button>
            <button 
              onClick={() => scrollTo('beverages-bar')} 
              className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Drinks &amp; Shakes</span>
            </button>
            <button 
              onClick={() => scrollTo('specials')} 
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Daily Specials
            </button>
            <button 
              onClick={() => scrollTo('story')} 
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Our Story
            </button>
            <button 
              onClick={() => scrollTo('location')} 
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Location & Hours
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone quick call */}
            <a 
              href={`tel:${info.phone}`}
              className="hidden xl:flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 transition-colors"
              title="Call The Restaurant KC"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{info.phone}</span>
            </a>

            {/* Table Reservation Button */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700/80 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Table</span>
            </button>

            {/* Cart / Pickup order button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md shadow-amber-950/20 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>Order Pickup</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center bg-stone-950 text-amber-300 font-mono-numeric font-bold text-[11px] px-1.5 py-0.2 rounded-full min-w-5 h-5 ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Owner Management Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isAdmin 
                  ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-stone-900/90 border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-500/40'
              }`}
              title="Owner & Kitchen Administration Dashboard"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Owner Mode' : 'Owner Portal'}</span>
              {isAdmin && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-stone-900 border border-stone-800 rounded-lg text-amber-400"
              aria-label="View pickup cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-stone-900 border border-stone-800 rounded-lg text-stone-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#151519] border-b border-stone-800 px-5 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => scrollTo('menu')} 
              className="text-left py-2 text-stone-200 hover:text-amber-400 text-base font-medium border-b border-stone-800/60"
            >
              Full Menu & Pricing
            </button>
            <button 
              onClick={() => scrollTo('spotlight')} 
              className="text-left py-2 text-stone-200 hover:text-amber-400 text-base font-medium border-b border-stone-800/60"
            >
              The Giant Tenderloin
            </button>
            <button 
              onClick={() => scrollTo('beverages-bar')} 
              className="text-left py-2 text-cyan-300 hover:text-cyan-200 text-base font-semibold border-b border-stone-800/60 flex items-center justify-between"
            >
              <span>Drinks &amp; Shakes (مشروبات)</span>
              <span className="text-xs bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40">Fresh</span>
            </button>
            <button 
              onClick={() => scrollTo('specials')} 
              className="text-left py-2 text-stone-200 hover:text-amber-400 text-base font-medium border-b border-stone-800/60"
            >
              Daily Specials
            </button>
            <button 
              onClick={() => scrollTo('story')} 
              className="text-left py-2 text-stone-200 hover:text-amber-400 text-base font-medium border-b border-stone-800/60"
            >
              Our Story & Heritage
            </button>
            <button 
              onClick={() => scrollTo('location')} 
              className="text-left py-2 text-stone-200 hover:text-amber-400 text-base font-medium border-b border-stone-800/60"
            >
              Location & Hours
            </button>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-stone-200 bg-stone-900 border border-stone-700 rounded-lg"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book Table</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 rounded-lg font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Pickup</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className={`w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg border ${
                isAdmin 
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' 
                  : 'bg-stone-900 border-stone-800 text-stone-400'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{isAdmin ? 'Open Owner Admin (Logged In)' : 'Owner Portal (Edit Menu & Prices)'}</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <a 
              href={`tel:${info.phone}`} 
              className="text-xs text-amber-400 inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call (913) 744-1957 for curbside pickup</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
