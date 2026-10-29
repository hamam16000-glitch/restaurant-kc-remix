import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  RestaurantInfo, 
  DailySpecial, 
  CustomerReview, 
  Reservation, 
  CartItem,
  MenuCategory
} from '../types/restaurant';
import { 
  INITIAL_RESTAURANT_INFO, 
  INITIAL_MENU_ITEMS, 
  INITIAL_SPECIALS, 
  INITIAL_REVIEWS, 
  INITIAL_RESERVATIONS 
} from '../data/initialData';

interface RestaurantContextType {
  info: RestaurantInfo;
  menuItems: MenuItem[];
  specials: DailySpecial[];
  reviews: CustomerReview[];
  reservations: Reservation[];
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isAdmin: boolean;
  selectedCategory: MenuCategory;
  searchQuery: string;
  isCartOpen: boolean;
  isReservationOpen: boolean;
  isOrderSuccessOpen: boolean;
  lastOrderDetails: { orderId: string; customerName: string; pickupTime: string; total: number } | null;
  // State setters
  setSelectedCategory: (cat: MenuCategory) => void;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsReservationOpen: (open: boolean) => void;
  setIsOrderSuccessOpen: (open: boolean) => void;
  // Cart Actions
  addToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  checkoutPickup: (customerName: string, customerPhone: string, pickupTime: string) => void;
  // Reservations
  createReservation: (data: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => boolean;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  // Admin Operations
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  updateMenuItem: (item: MenuItem) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (id: string) => void;
  updateRestaurantInfo: (updated: Partial<RestaurantInfo>) => void;
  updateSpecials: (specials: DailySpecial[]) => void;
  addSpecial: (special: Omit<DailySpecial, 'id'>) => void;
  deleteSpecial: (id: string) => void;
  resetAllToDefaults: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INFO: 'therestaurantkc_info_v4',
  MENU: 'therestaurantkc_menu_v4',
  SPECIALS: 'therestaurantkc_specials_v4',
  RESERVATIONS: 'therestaurantkc_reservations_v4',
  ADMIN_AUTH: 'therestaurantkc_admin_auth_v1',
  CART: 'therestaurantkc_cart_v1',
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Restaurant Info
  const [info, setInfo] = useState<RestaurantInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      return saved ? JSON.parse(saved) : INITIAL_RESTAURANT_INFO;
    } catch {
      return INITIAL_RESTAURANT_INFO;
    }
  });

  // 2. Menu Items (Guaranteed to have all beverages & specialties)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      if (saved) {
        const parsed: MenuItem[] = JSON.parse(saved);
        // Ensure all beverages and initial dishes are included
        const missingItems = INITIAL_MENU_ITEMS.filter(initial => !parsed.some(p => p.id === initial.id));
        if (missingItems.length > 0) {
          const merged = [...parsed, ...missingItems];
          localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(INITIAL_MENU_ITEMS));
      return INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // 3. Daily Specials
  const [specials, setSpecials] = useState<DailySpecial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SPECIALS);
      return saved ? JSON.parse(saved) : INITIAL_SPECIALS;
    } catch {
      return INITIAL_SPECIALS;
    }
  });

  // 4. Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  // 5. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. Admin state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // UI States
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    orderId: string;
    customerName: string;
    pickupTime: string;
    total: number;
  } | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(info));
    } catch (e) {
      console.error(e);
    }
  }, [info]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SPECIALS, JSON.stringify(specials));
    } catch (e) {
      console.error(e);
    }
  }, [specials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.error(e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdmin]);

  // Cart calculations
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = cart.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);

  const addToCart = (item: MenuItem, quantity: number = 1, notes: string = '') => {
    setCart(prev => {
      const existingIndex = prev.findIndex(c => c.menuItem.id === item.id);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        if (notes) {
          copy[existingIndex].notes = notes;
        }
        return copy;
      }
      return [...prev, { menuItem: item, quantity, notes }];
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(c => c.menuItem.id === itemId ? { ...c, quantity } : c));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(c => c.menuItem.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutPickup = (customerName: string, customerPhone: string, pickupTime: string) => {
    const orderId = `KC-${Math.floor(100000 + Math.random() * 900000)}`;
    setLastOrderDetails({
      orderId,
      customerName,
      pickupTime,
      total: cartTotal * 1.0925 // KS sales tax approx 9.25%
    });
    setCart([]);
    setIsCartOpen(false);
    setIsOrderSuccessOpen(true);
  };

  // Reservations
  const createReservation = (data: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const newRes: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setReservations(prev => [newRes, ...prev]);
    return true;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // Admin Auth
  const loginAdmin = (passcode: string) => {
    if (passcode.trim() === 'admin123' || passcode.trim().toLowerCase() === 'kansas' || passcode.trim() === 'admin') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  // Admin CRUD for Menu Items
  const updateMenuItem = (item: MenuItem) => {
    setMenuItems(prev => prev.map(i => i.id === item.id ? item : i));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `menu-custom-${Date.now()}`,
    };
    setMenuItems(prev => [newItem, ...prev]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  // Admin Restaurant Info Update
  const updateRestaurantInfo = (updated: Partial<RestaurantInfo>) => {
    setInfo(prev => ({
      ...prev,
      ...updated,
    }));
  };

  const updateSpecials = (newSpecials: DailySpecial[]) => {
    setSpecials(newSpecials);
  };

  const addSpecial = (special: Omit<DailySpecial, 'id'>) => {
    const newSpec: DailySpecial = {
      ...special,
      id: `spec-${Date.now()}`,
    };
    setSpecials(prev => [newSpec, ...prev]);
  };

  const deleteSpecial = (id: string) => {
    setSpecials(prev => prev.filter(s => s.id !== id));
  };

  const resetAllToDefaults = () => {
    setInfo(INITIAL_RESTAURANT_INFO);
    setMenuItems(INITIAL_MENU_ITEMS);
    setSpecials(INITIAL_SPECIALS);
    setReservations(INITIAL_RESERVATIONS);
    localStorage.removeItem(STORAGE_KEYS.INFO);
    localStorage.removeItem(STORAGE_KEYS.MENU);
    localStorage.removeItem(STORAGE_KEYS.SPECIALS);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
  };

  return (
    <RestaurantContext.Provider
      value={{
        info,
        menuItems,
        specials,
        reviews: INITIAL_REVIEWS,
        reservations,
        cart,
        cartCount,
        cartTotal,
        isAdmin,
        selectedCategory,
        searchQuery,
        isCartOpen,
        isReservationOpen,
        isOrderSuccessOpen,
        lastOrderDetails,
        setSelectedCategory,
        setSearchQuery,
        setIsCartOpen,
        setIsReservationOpen,
        setIsOrderSuccessOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        checkoutPickup,
        createReservation,
        updateReservationStatus,
        loginAdmin,
        logoutAdmin,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        updateRestaurantInfo,
        updateSpecials,
        addSpecial,
        deleteSpecial,
        resetAllToDefaults,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
