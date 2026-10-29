import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Flame, Phone, MapPin, Clock, ExternalLink, SlidersHorizontal, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { info, setIsReservationOpen, setIsCartOpen } = useRestaurant();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c0c0f] border-t border-stone-800 text-stone-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white shadow-md">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-stone-100">
                {info.name}
              </span>
            </div>
            
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Authentic Kansas comfort food, legendary giant pork tenderloins, and all-day farm breakfast. Proudly serving Historic Muncie on Kaw Drive.
            </p>

            <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5">
              <span>Made with pride in Kansas City, KS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider">
              Explore Diner
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => scrollTo('menu')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Full Menu &amp; Current Prices
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('spotlight')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  The Famous Giant Tenderloin
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('specials')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Weekly Rotating Specials
                </button>
              </li>
              <li>
                <button onClick={() => setIsReservationOpen(true)} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Table Reservations
                </button>
              </li>
              <li>
                <button onClick={() => setIsCartOpen(true)} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Order Pickup Online
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider">
              Visit On Kaw Drive
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-stone-300 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{info.address}, {info.cityStateZip} ({info.neighborhood})</span>
              </p>

              <p className="text-stone-300 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${info.phone}`} className="hover:text-amber-400 font-mono-numeric">
                  {info.phone}
                </a>
              </p>

              <div className="pt-1">
                <a
                  href={info.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Google Maps Location</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Kitchen Administration Portal Entry */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider">
              Management
            </h4>
            <p className="text-[11px] text-stone-500">
              Restaurant owner or kitchen manager portal.
            </p>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-400 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Owner Portal</span>
            </button>
          </div>

        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} The Restaurant KC. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Historic Muncie · Kansas City, Kansas</span>
            <span>·</span>
            <span>All-Day Scratch Comfort</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
