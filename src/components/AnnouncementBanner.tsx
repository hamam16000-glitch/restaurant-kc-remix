import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Bell, ArrowRight } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const { info, setIsReservationOpen } = useRestaurant();

  if (!info.announcement.enabled || !info.announcement.text) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-900/90 via-stone-900 to-amber-950/90 border-b border-amber-500/20 text-amber-100 text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-semibold text-amber-300 tracking-wide uppercase text-[11px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
            {info.announcement.badgeText || "Notice"}
          </span>
          <p className="text-stone-200 line-clamp-1 text-xs sm:text-sm font-medium">
            {info.announcement.text}
          </p>
        </div>

        <button 
          onClick={() => setIsReservationOpen(true)}
          className="hidden md:inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors group cursor-pointer"
        >
          <span>Book your table today</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
