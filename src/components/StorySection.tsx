import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Heart, Sparkles, Coffee, Flame, Award, Users } from 'lucide-react';

export const StorySection: React.FC = () => {
  const { info } = useRestaurant();

  return (
    <section id="story" className="py-20 sm:py-28 bg-[#121216] border-b border-stone-800/80 relative overflow-hidden">
      
      {/* Decorative ambient elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Photos Collage Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-stone-700/80 shadow-lg relative bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
                  alt="Historic Kansas Diner Counter Atmosphere"
                  className="w-full h-48 object-cover animate-living-1"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-stone-700/80 shadow-lg relative bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop"
                  alt="Fresh Scratch Biscuits & Country Sausage Gravy"
                  className="w-full h-64 object-cover animate-living-2"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden border border-stone-700/80 shadow-lg relative bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop"
                  alt="Golden Tenderloin Crispy Cutlet"
                  className="w-full h-64 object-cover animate-living-3"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-stone-700/80 shadow-lg bg-amber-950/40 p-5 flex flex-col justify-center text-center">
                <span className="font-mono-numeric font-bold text-3xl text-amber-400">40+</span>
                <span className="text-xs text-stone-300 font-medium uppercase tracking-wider mt-1">Years of Comfort on Kaw Drive</span>
              </div>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-full">
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>Historic Muncie Roots</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-stone-100 tracking-tight leading-tight">
              {info.storyTitle}
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {info.storyParagraph1}
            </p>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {info.storyParagraph2}
            </p>

            {/* Core Values Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-800">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Scratch Daily</span>
                </div>
                <p className="text-xs text-stone-400">
                  Every batch of country sausage gravy and biscuits is prepared from raw ingredients before dawn.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Award className="w-4 h-4" />
                  <span>Colossal Cuts</span>
                </div>
                <p className="text-xs text-stone-400">
                  We don't skimp. When you order a tenderloin or burger, you get real Midwestern abundance.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Users className="w-4 h-4" />
                  <span>Family First</span>
                </div>
                <p className="text-xs text-stone-400">
                  From working truck drivers to multi-generation families, you're always greeted with a hot cup of coffee.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
