import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Car, 
  Utensils, 
  Check, 
  Navigation
} from 'lucide-react';

export const LocationHoursSection: React.FC = () => {
  const { info, setIsReservationOpen } = useRestaurant();

  // Find today's day name in lowercase
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayIndex = new Date().getDay();
  const currentDayKey = days[todayIndex] as keyof typeof info.hours;

  const hoursList = [
    { key: 'monday', label: 'Monday', hours: info.hours.monday },
    { key: 'tuesday', label: 'Tuesday', hours: info.hours.tuesday },
    { key: 'wednesday', label: 'Wednesday', hours: info.hours.wednesday },
    { key: 'thursday', label: 'Thursday', hours: info.hours.thursday },
    { key: 'friday', label: 'Friday', hours: info.hours.friday },
    { key: 'saturday', label: 'Saturday', hours: info.hours.saturday },
    { key: 'sunday', label: 'Sunday', hours: info.hours.sunday },
  ];

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#111115] border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Find Us in Kansas City, KS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-100 tracking-tight">
            Visit The Diner on Kaw Drive
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Located in the Historic Muncie district. Ample free parking and warm smiles always waiting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hours Card */}
            <div className="bg-[#17171d] border border-stone-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2 text-stone-100 font-bold text-lg">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>Weekly Operating Hours</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Open Today
                </span>
              </div>

              <div className="space-y-2.5">
                {hoursList.map(item => {
                  const isToday = item.key === currentDayKey;
                  return (
                    <div
                      key={item.key}
                      className={`flex items-center justify-between text-xs sm:text-sm py-1.5 px-3 rounded-lg transition-colors ${
                        isToday 
                          ? 'bg-amber-950/50 border border-amber-500/30 text-amber-200 font-semibold' 
                          : 'text-stone-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                        <span>{item.label}</span>
                        {isToday && <span className="text-[10px] text-amber-400 font-normal">(Today)</span>}
                      </span>
                      <span className="font-mono-numeric">{item.hours}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span>Breakfast served all operating hours</span>
                <span className="text-amber-400 font-medium">Coffee always fresh</span>
              </div>
            </div>

            {/* Quick Contact & Action Box */}
            <div className="bg-[#17171d] border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-stone-100 text-sm font-semibold">Street Address</h4>
                    <p className="text-stone-400 text-xs sm:text-sm mt-0.5">{info.address}</p>
                    <p className="text-stone-400 text-xs sm:text-sm">{info.cityStateZip}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-stone-100 text-sm font-semibold">Telephone &amp; Curbside</h4>
                    <a href={`tel:${info.phone}`} className="text-amber-400 hover:text-amber-300 text-sm font-mono-numeric mt-0.5 block">
                      {info.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3 grid grid-cols-2 gap-3">
                <a
                  href={info.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>

                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reserve Table</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map & Amenities */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Map Frame Card */}
            <div className="bg-[#17171d] border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-semibold text-stone-200">The Restaurant KC on Google Maps</span>
                </div>
                <a 
                  href={info.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium"
                >
                  <span>Open in App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Google Map */}
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-stone-900 relative">
                <iframe
                  title="The Restaurant KC Map Location"
                  src="https://maps.google.com/maps?q=The+Restaurant+KC+6720+Kaw+Dr+Kansas+City+KS+66111&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05] grayscale-[0.2]"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Location footer details */}
              <div className="p-4 bg-[#141418] border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kaw Drive corridor just minutes off I-70</span>
                </div>
                <span className="text-stone-300 font-medium">Free Customer Parking Lot</span>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#15151a] border border-stone-800 p-3.5 rounded-xl text-center space-y-1">
                <Car className="w-4 h-4 text-amber-400 mx-auto" />
                <p className="text-xs font-bold text-stone-200">Free Parking</p>
                <p className="text-[10px] text-stone-500">Dedicated diner lot</p>
              </div>

              <div className="bg-[#15151a] border border-stone-800 p-3.5 rounded-xl text-center space-y-1">
                <Utensils className="w-4 h-4 text-amber-400 mx-auto" />
                <p className="text-xs font-bold text-stone-200">Dine-In Boothing</p>
                <p className="text-[10px] text-stone-500">Classic booths &amp; counter</p>
              </div>

              <div className="bg-[#15151a] border border-stone-800 p-3.5 rounded-xl text-center space-y-1">
                <Clock className="w-4 h-4 text-amber-400 mx-auto" />
                <p className="text-xs font-bold text-stone-200">Fast Curbside</p>
                <p className="text-[10px] text-stone-500">Call when you arrive</p>
              </div>

              <div className="bg-[#15151a] border border-stone-800 p-3.5 rounded-xl text-center space-y-1">
                <Check className="w-4 h-4 text-amber-400 mx-auto" />
                <p className="text-xs font-bold text-stone-200">Large Groups</p>
                <p className="text-[10px] text-stone-500">Reservations welcome</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
