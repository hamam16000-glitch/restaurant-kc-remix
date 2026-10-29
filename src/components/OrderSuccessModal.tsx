import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { CheckCircle2, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { isOrderSuccessOpen, setIsOrderSuccessOpen, lastOrderDetails, info } = useRestaurant();

  if (!isOrderSuccessOpen || !lastOrderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#16161c] border border-emerald-500/30 rounded-2xl p-6 sm:p-7 space-y-5 text-center shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Order Received &amp; Sent to Kitchen
          </span>
          <h3 className="font-display font-bold text-2xl text-stone-100">
            Thank you, {lastOrderDetails.customerName}!
          </h3>
          <p className="text-xs sm:text-sm text-stone-400">
            Our griddle team has fired up your order. We’ll have it steaming hot and packed for you.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 text-left space-y-3">
          <div className="flex justify-between items-center border-b border-stone-800 pb-2">
            <span className="text-xs text-stone-400">Pickup Order #</span>
            <span className="font-mono-numeric font-bold text-amber-400 text-sm">{lastOrderDetails.orderId}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-300">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Ready by: <strong className="text-stone-100">{lastOrderDetails.pickupTime}</strong></span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-300">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Counter pickup: {info.address}, {info.cityStateZip}</span>
          </div>

          <div className="flex justify-between items-center border-t border-stone-800 pt-2 text-xs">
            <span className="text-stone-400">Total with tax</span>
            <span className="font-mono-numeric font-bold text-amber-300 text-sm">
              ${lastOrderDetails.total.toFixed(2)} (Pay at Counter)
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-[11px] text-stone-400">
            Need curbside delivery to your car? Call <strong className="text-amber-400">{info.phone}</strong> when parked outside!
          </p>

          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
