import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { X, Calendar, Users, Clock, Utensils, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReservationModal: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, createReservation, info } = useRestaurant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('11:30 AM');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<'cozy_booth' | 'main_diner' | 'counter_bar'>('cozy_booth');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isReservationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your telephone number.');
      return;
    }

    createReservation({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@guest.com`,
      date,
      time,
      guests,
      seatingArea,
      specialNotes
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrorMsg('');
    setIsReservationOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#16161c] border border-stone-800 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#131317] border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-stone-100">
                Reserve a Table
              </h3>
              <p className="text-[11px] text-stone-400">
                The Restaurant KC · 6720 Kaw Dr, Kansas City
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="font-display font-bold text-2xl text-stone-100">
                Table Reserved!
              </h4>
              <p className="text-xs sm:text-sm text-stone-300">
                Thank you, <strong>{name}</strong>. We've reserved a table for <strong>{guests} guests</strong> on <strong>{date}</strong> at <strong>{time}</strong>.
              </p>
            </div>

            <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl text-left text-xs text-stone-400 space-y-1.5">
              <p>📍 Location: 6720 Kaw Dr, Kansas City, KS 66111</p>
              <p>📞 Phone: {info.phone}</p>
              <p className="text-amber-400/90 font-medium pt-1">
                Notice: The table is held for 15 minutes past reservation time. Please call if running late!
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/40 p-2.5 rounded-lg border border-red-500/20">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Miller"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(913) 555-0123"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Time Slot</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="6:30 AM">6:30 AM (Breakfast)</option>
                  <option value="7:30 AM">7:30 AM (Breakfast)</option>
                  <option value="8:30 AM">8:30 AM (Breakfast)</option>
                  <option value="9:30 AM">9:30 AM (Breakfast)</option>
                  <option value="11:30 AM">11:30 AM (Lunch)</option>
                  <option value="12:30 PM">12:30 PM (Lunch)</option>
                  <option value="1:30 PM">1:30 PM (Lunch)</option>
                  <option value="5:00 PM">5:00 PM (Dinner)</option>
                  <option value="6:30 PM">6:30 PM (Dinner)</option>
                  <option value="7:30 PM">7:30 PM (Dinner)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Party Size</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">Seating Preference</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cozy_booth', label: 'Cozy Booth' },
                  { id: 'main_diner', label: 'Dining Table' },
                  { id: 'counter_bar', label: 'Classic Counter' }
                ].map(opt => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setSeatingArea(opt.id as any)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                      seatingArea === opt.id
                        ? 'bg-amber-400 text-stone-950 border-amber-400 font-semibold'
                        : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Special Occasion or Notes</label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="High chair needed, wheelchair access, anniversary, etc."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-900 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
