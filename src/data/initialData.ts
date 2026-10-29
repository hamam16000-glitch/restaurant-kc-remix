import { MenuItem, RestaurantInfo, DailySpecial, CustomerReview, Reservation } from '../types/restaurant';

export const INITIAL_RESTAURANT_INFO: RestaurantInfo = {
  name: "The Restaurant KC",
  tagline: "Kansas City Comfort & Historic Diner Tradition",
  subheading: "Home of the giant hand-pounded pork tenderloin, scratch-made sausage gravy, hand-spun milkshakes, and honest Midwestern hospitality on Kaw Drive.",
  neighborhood: "Historic Muncie",
  address: "6720 Kaw Dr",
  cityStateZip: "Kansas City, KS 66111",
  phone: "(913) 744-1957",
  email: "hello@therestaurantkc.com",
  googleMapsUrl: "https://maps.app.goo.gl/5oF6gjcd5RURpmS59",
  hours: {
    monday: "6:00 AM – 8:30 PM",
    tuesday: "6:00 AM – 8:30 PM",
    wednesday: "6:00 AM – 8:30 PM",
    thursday: "6:00 AM – 8:30 PM",
    friday: "6:00 AM – 9:30 PM",
    saturday: "6:00 AM – 9:30 PM",
    sunday: "7:00 AM – 3:00 PM",
  },
  announcement: {
    enabled: true,
    text: "Fresh batch of scratch buttermilk biscuits & sausage gravy served warm every morning starting at 6:00 AM! Plus hand-spun shakes all day.",
    badgeText: "Morning Special",
  },
  heroBadge: "Historic Muncie Landmark · Kansas City, KS",
  storyTitle: "Rooted on Kaw Drive in Historic Muncie",
  storyParagraph1: "For generations, The Restaurant KC has been a beloved neighborhood gathering spot tucked along Kaw Drive in Kansas City, Kansas. We believe great food doesn't need pretension—just sizzling flat tops, fresh locally sourced meats, bottomless hot diner coffee, and recipes perfected over decades of breakfast rushes and evening comfort dinners.",
  storyParagraph2: "Whether you're stopping in at daybreak for Papaw's Breakfast loaded with house country gravy, or biting into our famous giant crispy pork tenderloin that spills generously past the toasted bun, you're treated like family the moment you step through our doors.",
  isAnimatedHeroEnabled: true,
};

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // ================= TENDERLOINS (SIGNATURE) =================
  {
    id: "tenderloin-classic",
    name: "The Famous Giant Pork Tenderloin",
    category: "tenderloins",
    price: 13.99,
    description: "The Kansas legend. Center-cut pork loin hand-pounded paper thin, seasoned, double-dipped in seasoned breading, fried golden crisp. Served on a toasted brioche bun with pickles, onions, and your choice of fries or tots.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
    tags: ["Legendary", "House Special", "Huge Portion"],
    isAvailable: true,
    isFeatured: true,
    calories: "920 cal",
    servingNote: "Bigger than the bun — a true Kansas classic!"
  },
  {
    id: "tenderloin-loaded",
    name: "Smothered Country Tenderloin",
    category: "tenderloins",
    price: 15.49,
    description: "Our signature jumbo crispy tenderloin cutlet smothered in warm, peppery homemade sausage country gravy and melted Colby Jack cheese.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    tags: ["Chef Pick", "Scratch Gravy"],
    isAvailable: true,
    isFeatured: false,
    calories: "1080 cal"
  },
  {
    id: "tenderloin-spicy",
    name: "Fire-Cracker Buffalo Tenderloin",
    category: "tenderloins",
    price: 14.49,
    description: "Crispy hand-breaded tenderloin dunked in tangy cayenne buffalo sauce, topped with creamy buttermilk ranch, dill pickles, and crisp iceberg.",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1000&auto=format&fit=crop",
    tags: ["Spicy", "Crunchy"],
    isAvailable: true,
    calories: "960 cal"
  },

  // ================= BEVERAGES & DINER DRINKS (مشروبات) =================
  {
    id: "bev-diner-coffee",
    name: "Fresh Bottomless Diner Coffee",
    category: "beverages",
    price: 2.99,
    description: "Piping hot, freshly roasted signature diner coffee blend. Bottomless refills when dining in. Always brewed fresh every 20 minutes.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
    tags: ["Bottomless", "Fresh Brewed", "Piping Hot"],
    isAvailable: true,
    isFeatured: true,
    calories: "5 cal",
    temperature: "hot",
    servingNote: "Served steaming hot in heavy ceramic diner mugs"
  },
  {
    id: "bev-sweet-tea",
    name: "Southern Sweet Iced Tea",
    category: "beverages",
    price: 2.79,
    description: "Slow-steeped black tea sweetened the old-fashioned way while warm, poured over crushed pebble ice with fresh lemon wheel garnish.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop",
    tags: ["Customer Favorite", "Ice Cold"],
    isAvailable: true,
    calories: "120 cal",
    temperature: "iced"
  },
  {
    id: "bev-lemonade",
    name: "Country Fresh Squeezed Lemonade",
    category: "beverages",
    price: 3.49,
    description: "Real lemons squeezed daily with pure cane sugar and spring water. Tart, refreshing, and served ice cold with lemon slices.",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1000&auto=format&fit=crop",
    tags: ["House Made", "Refreshing"],
    isAvailable: true,
    calories: "150 cal",
    temperature: "iced"
  },
  {
    id: "bev-shake-chocolate",
    name: "Old-Fashioned Chocolate Malt Shake",
    category: "beverages",
    price: 6.49,
    description: "Hand-spun with rich vanilla bean ice cream, premium Belgian chocolate fudge, whole milk, and real malt powder. Topped with whipped cream and a maraschino cherry.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop",
    tags: ["Hand Spun", "Diner Legend"],
    isAvailable: true,
    isFeatured: true,
    calories: "680 cal",
    temperature: "chilled",
    servingNote: "Served in a frosty tall glass with the extra metal mixer cup!"
  },
  {
    id: "bev-shake-strawberry",
    name: "Hand-Spun Real Strawberry Shake",
    category: "beverages",
    price: 6.49,
    description: "Creamy vanilla custard ice cream blended with sweet ripe summer strawberries and fresh cream. Thick, luscious, and topped with strawberry drizzle.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=1000&auto=format&fit=crop",
    tags: ["Fresh Fruit", "Hand Spun"],
    isAvailable: true,
    calories: "620 cal",
    temperature: "chilled"
  },
  {
    id: "bev-root-beer-float",
    name: "Classic Draft Root Beer Float",
    category: "beverages",
    price: 5.99,
    description: "Chilled frosty mug filled with artisan draft root beer and two generous scoops of slow-churned vanilla bean ice cream creating thick vanilla foam.",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=1000&auto=format&fit=crop",
    tags: ["Classic Diner", "Frosty Mug"],
    isAvailable: true,
    calories: "440 cal",
    temperature: "iced"
  },
  {
    id: "bev-fountain-soda",
    name: "Fountain Sodas & Dr Pepper",
    category: "beverages",
    price: 2.79,
    description: "Choice of Coca-Cola, Diet Coke, Dr Pepper, Sprite, Barq's Root Beer, or Fanta Orange. Free refills during dine-in.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000&auto=format&fit=crop",
    tags: ["Refillable", "Ice Cold"],
    isAvailable: true,
    calories: "140 cal",
    temperature: "iced"
  },
  {
    id: "bev-orange-juice",
    name: "Fresh Squeezed Florida Orange Juice",
    category: "beverages",
    price: 3.99,
    description: "100% pure squeezed sweet Florida oranges with light pulp. The quintessential morning vitamin boost.",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1000&auto=format&fit=crop",
    tags: ["100% Pure", "Morning Boost"],
    isAvailable: true,
    calories: "160 cal",
    temperature: "chilled"
  },

  // ================= BREAKFAST ALL DAY =================
  {
    id: "breakfast-papaws",
    name: "Papaw's Breakfast Feast",
    category: "breakfast",
    price: 15.49,
    description: "Layered breakfast perfection: fluffy scrambled farm eggs, two warm golden biscuits split and drenched in sausage gravy, golden hashbrowns, melted cheddar, grilled sweet onions, and an extra ladle of gravy.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=1000&auto=format&fit=crop",
    tags: ["Customer Favorite", "All-Day Breakfast"],
    isAvailable: true,
    isFeatured: true,
    calories: "1150 cal",
    servingNote: "Our #1 most ordered morning skillet"
  },
  {
    id: "breakfast-pancakes",
    name: "Golden Buttermilk Pancakes Stack",
    category: "breakfast",
    price: 9.99,
    description: "Three gigantic fluffy buttermilk griddle cakes served steaming with whipped country butter and warm maple syrup. Option to add blueberries or chocolate chips (+$1.50).",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000&auto=format&fit=crop",
    tags: ["Fluffy", "Griddle Fresh"],
    isAvailable: true,
    isFeatured: true,
    calories: "780 cal"
  },
  {
    id: "breakfast-loaded-skillet",
    name: "Loaded Muncie Breakfast Skillet",
    category: "breakfast",
    price: 9.49,
    description: "Crispy grilled hashbrowns topped with your choice of thick-cut smoked bacon, ham, or breakfast sausage, diced green bell peppers, sautéed onions, smothered in homemade sausage gravy and shredded cheese.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop",
    tags: ["Hearty", "Best Value"],
    isAvailable: true,
    isFeatured: true,
    calories: "880 cal"
  },
  {
    id: "breakfast-denver-omelet",
    name: "Mile-High Denver Western Omelet",
    category: "breakfast",
    price: 11.49,
    description: "Three farm-fresh eggs folded with hickory-smoked ham, crisp green peppers, sweet yellow onions, and melted sharp cheddar. Served with hashbrowns and toast or biscuit.",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1000&auto=format&fit=crop",
    tags: ["High Protein", "Diner Classic"],
    isAvailable: true,
    calories: "820 cal"
  },
  {
    id: "breakfast-burrito-kaw",
    name: "Kaw Drive Giant Breakfast Burrito",
    category: "breakfast",
    price: 12.99,
    description: "Stuffed to the brim with 2 fluffy scrambled eggs, seasoned country sausage, grilled bell peppers, onions, golden hashbrowns, and three-cheese blend wrapped in a warm flour tortilla. Served with house fire salsa.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000&auto=format&fit=crop",
    tags: ["All-Day Breakfast", "Grab & Go"],
    isAvailable: true,
    calories: "940 cal"
  },
  {
    id: "breakfast-biscuits-gravy",
    name: "Full Order Biscuits & Sausage Gravy",
    category: "breakfast",
    price: 7.99,
    description: "Two freshly baked jumbo buttermilk biscuits split open and smothered in our thick, country pork sausage gravy made fresh every morning at 5:30 AM.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop",
    tags: ["House Special", "Traditional"],
    isAvailable: true,
    calories: "720 cal"
  },
  {
    id: "breakfast-ultimate-sandwich",
    name: "Ultimate Morning Sourdough Sandwich",
    category: "breakfast",
    price: 8.99,
    description: "Two fried eggs, double bacon or sausage patty, melted sharp American cheese, fresh tomato, and cracked-pepper garlic aioli on buttery griddled sourdough.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop",
    tags: ["Quick Bite"],
    isAvailable: true,
    calories: "690 cal"
  },

  // ================= BURGERS & MELTS =================
  {
    id: "burger-double-bacon",
    name: "Double Bacon Cheeseburger",
    category: "burgers",
    price: 17.99,
    description: "Two fresh 1/3-lb Midwestern beef patties smashed on the griddle with caramelized edges, loaded with 4 strips of thick-cut smoked bacon, double melted American cheese, lettuce, tomato, pickles, and diner burger sauce on a buttered bun. Served with fries.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    tags: ["Customer Favorite", "Beef Patty Smash"],
    isAvailable: true,
    isFeatured: true,
    calories: "1280 cal"
  },
  {
    id: "burger-patty-melt",
    name: "Historic Muncie Patty Melt",
    category: "burgers",
    price: 14.49,
    description: "Fresh beef patty smothered with sweet caramelized griddled onions, melted Swiss cheese, and tangy thousand island sauce on toasted marble rye bread.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1000&auto=format&fit=crop",
    tags: ["Diner Classic"],
    isAvailable: true,
    calories: "980 cal"
  },
  {
    id: "burger-kansas-cheesesteak",
    name: "Kansas City Sliced Ribeye Cheesesteak",
    category: "burgers",
    price: 14.99,
    description: "Thinly shaved ribeye seared hot on the flat top with bell peppers and sweet onions, draped in melted provolone on a toasted bakery hoagie.",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1000&auto=format&fit=crop",
    tags: ["Sizzling Flat Top", "Hearty"],
    isAvailable: true,
    calories: "1050 cal"
  },
  {
    id: "burger-kansas-smash",
    name: "Kaw Valley Mushroom & Swiss Burger",
    category: "burgers",
    price: 15.99,
    description: "Seared beef patty piled high with butter-braised baby portobello mushrooms, garlic herb mayo, and melted Wisconsin Swiss on a brioche bun.",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop",
    tags: ["Chef Pick"],
    isAvailable: true,
    calories: "1020 cal"
  },

  // ================= HOMESTYLE DINNERS =================
  {
    id: "dinner-chicken-fried-steak",
    name: "Crispy Country Fried Steak",
    category: "dinners",
    price: 16.99,
    description: "Tender cube steak hand-breaded and golden-fried, smothered in house peppered cream gravy. Served with red-skin mashed potatoes, buttered corn, and a warm dinner roll.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000&auto=format&fit=crop",
    tags: ["Southern Style", "Comfort Dinner"],
    isAvailable: true,
    isFeatured: true,
    calories: "1190 cal"
  },
  {
    id: "dinner-catfish",
    name: "Golden Cornmeal Catfish Fillets",
    category: "dinners",
    price: 16.49,
    description: "Two farm-raised catfish fillets rolled in seasoned yellow cornmeal and fried crisp. Served with seasoned hushpuppies, creamy coleslaw, tartar sauce, and crinkle fries.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop",
    tags: ["Seafood", "Crispy"],
    isAvailable: true,
    calories: "940 cal"
  },
  {
    id: "dinner-chicken-tenders",
    name: "Hand-Breaded Chicken Tenders Basket",
    category: "dinners",
    price: 13.99,
    description: "Four large buttermilk-marinated whole chicken breast tenders, double battered and fried golden. Served with honey mustard or BBQ sauce, crinkle fries, and Texas toast.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1000&auto=format&fit=crop",
    tags: ["Popular"],
    isAvailable: true,
    calories: "890 cal"
  },

  // ================= SIDES & SWEETS =================
  {
    id: "side-crinkle-fries",
    name: "Seasoned Crinkle Cut Fries Basket",
    category: "sides_sweets",
    price: 4.49,
    description: "Piping hot crinkle cut potatoes dusted in our secret diner house seasoning blend.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1000&auto=format&fit=crop",
    tags: ["Side"],
    isAvailable: true,
    calories: "380 cal"
  },
  {
    id: "side-onion-rings",
    name: "Beer-Battered Thick Onion Rings",
    category: "sides_sweets",
    price: 5.99,
    description: "Sweet Spanish onions cut thick, dipped in craft beer batter and fried ultra crunchy. Served with spicy dipping sauce.",
    image: "https://images.unsplash.com/photo-1639024471287-03521672198b?q=80&w=1000&auto=format&fit=crop",
    tags: ["House Made"],
    isAvailable: true,
    calories: "450 cal"
  },
  {
    id: "pie-apple-slice",
    name: "Warm Dutch Apple Pie Slice",
    category: "sides_sweets",
    price: 5.49,
    description: "Flaky butter crust filled with spiced Kansas honeycrisp apples and topped with crunchy brown sugar streusel. Add vanilla scoop +$1.50.",
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?q=80&w=1000&auto=format&fit=crop",
    tags: ["Fresh Baked"],
    isAvailable: true,
    calories: "510 cal"
  }
];

export const INITIAL_SPECIALS: DailySpecial[] = [
  {
    id: "special-1",
    title: "Monday All-Day Breakfast Stack",
    day: "Monday",
    price: 11.99,
    originalPrice: 14.49,
    description: "Full order of biscuits and gravy paired with 2 eggs your way, 2 crispy bacon strips, and a hot bottomless mug of diner coffee.",
    badge: "20% OFF",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "special-2",
    title: "Wednesday Giant Tenderloin & Shake Combo",
    day: "Wednesday",
    price: 16.99,
    originalPrice: 20.48,
    description: "Our world-famous giant pork tenderloin sandwich with seasoned crinkle fries and any 16oz hand-spun malt milkshake.",
    badge: "Neighborhood Pick",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "special-3",
    title: "Friday Fried Catfish & Hushpuppies Feast",
    day: "Friday",
    price: 14.99,
    originalPrice: 17.99,
    description: "Crispy cornmeal-crusted catfish fillets, five sweet corn hushpuppies, creamy coleslaw, and fresh tartar sauce.",
    badge: "Friday Special",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop"
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Dave Miller",
    city: "Kansas City, KS",
    rating: 5,
    date: "2 weeks ago",
    comment: "If you haven't had the giant pork tenderloin here on Kaw Drive, you haven't lived in Kansas. The tenderloin is literally bigger than my steering wheel, pounded thin, piping hot and ultra crispy. Pair it with a chocolate malt shake!",
    favoriteDish: "The Famous Giant Pork Tenderloin"
  },
  {
    id: "rev-2",
    author: "Sarah Jenkins",
    city: "Overland Park, KS",
    rating: 5,
    date: "1 month ago",
    comment: "The Papaw's Breakfast is pure heaven. The homemade sausage gravy is the best I've tasted in the entire Kansas City metro area. Bottomless fresh coffee that never runs dry. Unbeatable comfort food.",
    favoriteDish: "Papaw's Breakfast Feast"
  },
  {
    id: "rev-3",
    author: "Marcus Vance",
    city: "Kansas City, MO",
    rating: 5,
    date: "3 weeks ago",
    comment: "A true hidden gem in Historic Muncie! The Double Bacon Cheeseburger is smashburger gold with perfectly seared edges and smoky bacon. Real diner vibes with zero nonsense. 10/10.",
    favoriteDish: "Double Bacon Cheeseburger"
  },
  {
    id: "rev-4",
    author: "Betty & Harold T.",
    city: "Bonner Springs, KS",
    rating: 5,
    date: "Last month",
    comment: "We've been eating here on Saturday mornings for years. The coffee is always hot, the biscuits are fresh out of the oven, and the owners treat you like cherished family. Long live The Restaurant KC!",
    favoriteDish: "Biscuits & Sausage Gravy"
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: "res-101",
    name: "Robert Callahan",
    phone: "(913) 555-0142",
    email: "robert.c@example.com",
    date: "2026-10-30",
    time: "12:30 PM",
    guests: 4,
    seatingArea: "cozy_booth",
    specialNotes: "Celebrating family birthday, high chair needed.",
    status: "confirmed",
    createdAt: "2026-10-27T10:15:00Z"
  },
  {
    id: "res-102",
    name: "Amanda Wright",
    phone: "(816) 555-8931",
    email: "amanda.w@example.com",
    date: "2026-10-31",
    time: "9:00 AM",
    guests: 6,
    seatingArea: "main_diner",
    specialNotes: "Saturday breakfast group after morning run.",
    status: "pending",
    createdAt: "2026-10-28T08:20:00Z"
  }
];
