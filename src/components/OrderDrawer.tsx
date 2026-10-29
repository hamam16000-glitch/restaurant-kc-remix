import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Clock, MapPin, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderDrawer: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    checkoutPickup,
    info
  } = useRestaurant();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('ASAP (approx 20 mins)');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCartOpen) return null;

  const tax = cartTotal * 0.0925;
  const grandTotal = cartTotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter your name for order pickup.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number for pickup notifications.');
      return;
    }

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    setErrorMsg('');
    checkoutPickup(customerName, customerPhone, pickupTime);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#16161b] border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-[#131317] border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-stone-100">
                  Pickup Order Cart
                </h3>
                <p className="text-[11px] text-stone-400">
                  The Restaurant KC · 6720 Kaw Dr
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                <p className="text-stone-300 font-semibold text-base">Your cart is currently empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our giant pork tenderloins, scratch breakfast skillets, and diner burgers!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs text-stone-400 pb-1 border-b border-stone-800">
                  <span>{cartCount} items selected</span>
                  <button
                    onClick={clearCart}
                    className="text-stone-500 hover:text-red-400 text-xs transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map(item => (
                  <div
                    key={item.menuItem.id}
                    className="bg-stone-900/80 border border-stone-800/90 rounded-xl p-3.5 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-stone-100 text-sm">
                          {item.menuItem.name}
                        </h4>
                        <span className="font-mono-numeric text-xs text-amber-300">
                          ${item.menuItem.price.toFixed(2)} each
                        </span>
                        {item.notes && (
                          <p className="text-[11px] text-stone-400 italic mt-0.5">
                            Note: {item.notes}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.menuItem.id)}
                        className="text-stone-500 hover:text-red-400 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateCartQuantity(item.menuItem.id, item.quantity - 1)}
                          className="text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono-numeric font-bold text-xs text-stone-100 min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.menuItem.id, item.quantity + 1)}
                          className="text-stone-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-mono-numeric font-bold text-stone-100 text-sm">
                        ${(item.menuItem.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Form Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#131317] border-t border-stone-800 space-y-4">
              
              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs text-stone-400 border-b border-stone-800 pb-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono-numeric text-stone-200">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kansas Sales Tax (9.25%)</span>
                  <span className="font-mono-numeric text-stone-200">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-100 text-sm font-bold pt-1">
                  <span>Order Total</span>
                  <span className="font-mono-numeric text-amber-300 text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Inputs */}
              <form onSubmit={handleCheckout} className="space-y-3">
                {errorMsg && (
                  <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-500/20">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(913) 555-0199"
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-300 mb-1">Pickup Time</label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="ASAP (approx 20 mins)">ASAP (~20 mins from now)</option>
                    <option value="In 35 minutes">In 35 minutes</option>
                    <option value="In 50 minutes">In 50 minutes</option>
                    <option value="In 1 hour 15 mins">In 1 hour 15 mins</option>
                  </select>
                </div>

                <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Pickup location: 6720 Kaw Dr, Kansas City, KS</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-950/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Place Pickup Order (${grandTotal.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
