import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Star, Quote, MapPin } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews } = useRestaurant();

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#0e0e11] border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Community Verified Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-100 tracking-tight">
            Loved Across Kansas City
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Real feedback from neighbors, regulars, and travelers discovering our diner along Kaw Drive.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="bg-[#15151a] border border-stone-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-stone-700 transition-colors"
            >
              <div className="space-y-4">
                {/* Rating & Favorite Dish */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-stone-400 bg-stone-900 px-2.5 py-1 rounded-md border border-stone-800">
                    Fave: <span className="text-amber-300">{rev.favoriteDish}</span>
                  </span>
                </div>

                {/* Comment */}
                <p className="text-stone-200 text-sm sm:text-base italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Source */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <div>
                  <span className="font-bold text-stone-100 text-sm block">{rev.author}</span>
                  <span className="text-stone-400">{rev.city}</span>
                </div>
                <div className="text-right">
                  <span className="text-amber-400 font-medium">Google Maps Review</span>
                  <span className="block text-[11px] text-stone-500">{rev.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
