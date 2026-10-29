export type MenuCategory = 
  | 'all'
  | 'beverages'
  | 'breakfast'
  | 'burgers'
  | 'tenderloins'
  | 'dinners'
  | 'sides_sweets';

export interface MenuItem {
  id: string;
  name: string;
  category: 'beverages' | 'breakfast' | 'burgers' | 'tenderloins' | 'dinners' | 'sides_sweets';
  price: number;
  description: string;
  image: string;
  tags: string[];
  isAvailable: boolean;
  isFeatured?: boolean;
  calories?: string;
  servingNote?: string;
  temperature?: 'hot' | 'iced' | 'chilled';
}

export interface DailySpecial {
  id: string;
  title: string;
  day: string;
  price: number;
  originalPrice?: number;
  description: string;
  badge: string;
  image: string;
}

export interface RestaurantHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  subheading: string;
  neighborhood: string;
  address: string;
  cityStateZip: string;
  phone: string;
  email: string;
  googleMapsUrl: string;
  hours: RestaurantHours;
  announcement: {
    enabled: boolean;
    text: string;
    badgeText: string;
  };
  heroBadge: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  isAnimatedHeroEnabled?: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'main_diner' | 'cozy_booth' | 'counter_bar';
  specialNotes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}
