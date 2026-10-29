import React, { useState } from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureSpotlight } from './components/SignatureSpotlight';
import { BeveragesShowcase } from './components/BeveragesShowcase';
import { MenuSection } from './components/MenuSection';
import { SpecialsSection } from './components/SpecialsSection';
import { StorySection } from './components/StorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { OrderDrawer } from './components/OrderDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ReservationModal } from './components/ReservationModal';
import { AdminPortal } from './components/AdminPortal';
import { MenuItem } from './types/restaurant';
import { SlidersHorizontal, ShoppingBag, ArrowUp } from 'lucide-react';

function MainContent() {
  const { cartCount, setIsCartOpen, isAdmin } = useRestaurant();
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const handleEditDishFromMenu = (dish: MenuItem) => {
    setIsAdminPortalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0e0e11] text-[#f4f2ee] flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Announcement Banner */}
      <AnnouncementBanner />

      {/* Navigation */}
      <Navbar onOpenAdmin={() => setIsAdminPortalOpen(true)} />

      {/* Main Website Sections */}
      <main className="flex-1">
        <Hero />
        <SignatureSpotlight onSelectDish={(dish) => setSelectedDish(dish)} />
        <BeveragesShowcase onSelectDish={(dish) => setSelectedDish(dish)} />
        <MenuSection 
          onSelectDish={(dish) => setSelectedDish(dish)}
          onEditDish={handleEditDishFromMenu}
        />
        <SpecialsSection />
        <StorySection />
        <ReviewsSection />
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminPortalOpen(true)} />

      {/* Interactive Modals */}
      <DishDetailModal 
        dish={selectedDish} 
        onClose={() => setSelectedDish(null)} 
      />

      <OrderDrawer />
      <OrderSuccessModal />
      <ReservationModal />
      
      <AdminPortal 
        isOpen={isAdminPortalOpen} 
        onClose={() => setIsAdminPortalOpen(false)} 
      />

      {/* Sticky Floating Bar for Admin Mode Notice */}
      {isAdmin && (
        <div className="fixed bottom-4 left-4 z-40 bg-emerald-950/95 border border-emerald-500/50 text-emerald-200 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>
            <strong>Owner Mode Active:</strong> Live site editing enabled.
          </span>
          <button
            onClick={() => setIsAdminPortalOpen(true)}
            className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-lg cursor-pointer transition-colors"
          >
            Open Admin
          </button>
        </div>
      )}

      {/* Floating Cart Button for Mobile & Desktop when items added */}
      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 cursor-pointer transition-all hover:scale-105"
          aria-label="View pickup cart"
        >
          <ShoppingBag className="w-5 h-5 text-stone-950" />
          <span className="text-sm">Pickup Cart</span>
          <span className="bg-stone-950 text-amber-300 text-xs px-2 py-0.5 rounded-full font-mono-numeric">
            {cartCount}
          </span>
        </button>
      )}

    </div>
  );
}

export default function App() {
  return (
    <RestaurantProvider>
      <MainContent />
    </RestaurantProvider>
  );
}
