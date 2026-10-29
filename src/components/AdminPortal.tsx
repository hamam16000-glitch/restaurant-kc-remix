import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, MenuCategory, DailySpecial, RestaurantHours } from '../types/restaurant';
import { 
  X, 
  Lock, 
  Unlock, 
  UtensilsCrossed, 
  Tag, 
  Megaphone, 
  Clock, 
  Calendar, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Sliders,
  Sparkles,
  Phone,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const { 
    info, 
    menuItems, 
    specials, 
    reservations, 
    isAdmin, 
    loginAdmin, 
    logoutAdmin,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem,
    updateRestaurantInfo,
    addSpecial,
    deleteSpecial,
    updateReservationStatus,
    resetAllToDefaults
  } = useRestaurant();

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<'menu' | 'specials' | 'info' | 'hours' | 'reservations' | 'system'>('menu');
  
  // Login Form State
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  // New Dish Modal / State
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [newDishCategory, setNewDishCategory] = useState<MenuItem['category']>('tenderloins');
  const [newDishPrice, setNewDishPrice] = useState('14.99');
  const [newDishDescription, setNewDishDescription] = useState('');
  const [newDishImage, setNewDishImage] = useState('https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop');
  const [newDishTags, setNewDishTags] = useState('Specialty, House Made');
  const [newDishCalories, setNewDishCalories] = useState('850 cal');
  const [newDishServingNote, setNewDishServingNote] = useState('');

  // Admin Menu Category Filter
  const [adminMenuFilter, setAdminMenuFilter] = useState<string>('all');
  // Editing existing dish modal
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);

  // Quick Inline Price Editing
  const [quickPriceEdits, setQuickPriceEdits] = useState<{ [id: string]: string }>({});

  // Feedback Notification
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showSuccessFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  if (!isOpen) return null;

  // Handle Passcode Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passcode)) {
      setLoginError(false);
      setPasscode('');
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch (err) {}
    } else {
      setLoginError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin('admin123');
    setLoginError(false);
  };

  // Dish Creation
  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName || !newDishPrice) return;

    addMenuItem({
      name: newDishName,
      category: newDishCategory,
      price: parseFloat(newDishPrice) || 12.99,
      description: newDishDescription,
      image: newDishImage,
      tags: newDishTags.split(',').map(t => t.trim()).filter(Boolean),
      isAvailable: true,
      calories: newDishCalories,
      servingNote: newDishServingNote
    });

    setIsAddingDish(false);
    setNewDishName('');
    setNewDishDescription('');
    showSuccessFeedback(`Added "${newDishName}" to menu!`);
  };

  // Dish Update
  const handleSaveEditedDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish) return;
    updateMenuItem(editingDish);
    setEditingDish(null);
    showSuccessFeedback(`Updated "${editingDish.name}" successfully!`);
  };

  // Quick Price Save
  const handleSavePrice = (dishId: string) => {
    const val = quickPriceEdits[dishId];
    if (!val) return;
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      const existing = menuItems.find(m => m.id === dishId);
      if (existing) {
        updateMenuItem({ ...existing, price: num });
        showSuccessFeedback(`Updated price for ${existing.name} to $${num.toFixed(2)}`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-5xl bg-[#141419] border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#111115] border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isAdmin ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' : 'bg-stone-800 text-stone-400'
            }`}>
              {isAdmin ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-stone-100">
                  The Restaurant KC · Owner Administration
                </h3>
                {isAdmin && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase">
                    Live System Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-400">
                Update prices, dishes, news, operating hours, and customer reservations in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="text-xs text-stone-400 hover:text-white px-3 py-1.5 rounded-lg border border-stone-800 hover:bg-stone-800 cursor-pointer"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 cursor-pointer"
              aria-label="Close owner dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {feedbackMsg && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/40 text-emerald-200 px-5 py-2.5 text-xs font-semibold flex items-center gap-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Screen Content: Either Login OR Admin Panel */}
        {!isAdmin ? (
          /* ================= LOGIN FORM ================= */
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-sm space-y-6 text-center bg-[#181820] border border-stone-800 p-8 rounded-2xl shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-bold text-2xl text-stone-100">
                  Owner &amp; Kitchen Login
                </h4>
                <p className="text-xs text-stone-400">
                  Enter your owner passcode to edit menu items, change prices, or post announcements.
                </p>
              </div>

              {loginError && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-500/30 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Incorrect passcode. Tip: Use <strong>admin123</strong> or click Quick Access.</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. admin123)"
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 text-center tracking-widest focus:outline-none focus:border-amber-500"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Log In to Dashboard
                </button>
              </form>

              {/* One-click Demo evaluation button */}
              <div className="pt-2 border-t border-stone-800">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  🚀 Quick Demo Access (1-Click Login)
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= MAIN OWNER DASHBOARD ================= */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Sub-navigation Tabs */}
            <div className="bg-[#121217] border-b border-stone-800 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              {[
                { id: 'menu', label: 'Menu & Prices', icon: UtensilsCrossed },
                { id: 'specials', label: 'Daily Specials', icon: Tag },
                { id: 'info', label: 'News & Announcements', icon: Megaphone },
                { id: 'hours', label: 'Operating Hours', icon: Clock },
                { id: 'reservations', label: `Reservations (${reservations.length})`, icon: Calendar },
                { id: 'system', label: 'Backup & Restore', icon: Sliders },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                      isActive 
                        ? 'border-amber-400 text-amber-300 bg-stone-900/40' 
                        : 'border-transparent text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dashboard Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* TAB 1: MENU & PRICING */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181820] p-4 rounded-xl border border-stone-800">
                    <div>
                      <h4 className="font-bold text-stone-100 text-base">Menu Items ({menuItems.length})</h4>
                      <p className="text-xs text-stone-400">
                        Change prices on the fly, toggle dish availability, or add new Kansas specialties.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingDish(true)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Menu Item</span>
                    </button>
                  </div>

                  {/* Category Filter Chips for Owner */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {[
                      { id: 'all', label: 'All Items' },
                      { id: 'beverages', label: 'Drinks & Shakes (مشروبات)' },
                      { id: 'breakfast', label: 'Breakfast' },
                      { id: 'tenderloins', label: 'Tenderloins' },
                      { id: 'burgers', label: 'Burgers' },
                      { id: 'dinners', label: 'Dinners' },
                      { id: 'sides_sweets', label: 'Sides' },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setAdminMenuFilter(f.id)}
                        className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                          adminMenuFilter === f.id
                            ? 'bg-amber-400 text-stone-950 font-bold'
                            : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                        }`}
                      >
                        {f.label} ({f.id === 'all' ? menuItems.length : menuItems.filter(i => i.category === f.id).length})
                      </button>
                    ))}
                  </div>

                  {/* Dish List Table */}
                  <div className="bg-[#17171d] border border-stone-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="divide-y divide-stone-800">
                      {menuItems
                        .filter(item => adminMenuFilter === 'all' || item.category === adminMenuFilter)
                        .map(item => (
                        <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-900/40 transition-colors">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-800"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-semibold text-stone-100 text-sm">{item.name}</h5>
                                <span className="text-[10px] uppercase font-bold text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                                  {item.category}
                                </span>
                                {item.isFeatured && (
                                  <span className="text-[10px] text-amber-400 font-bold">★ Featured</span>
                                )}
                              </div>
                              <p className="text-xs text-stone-400 line-clamp-1 mt-0.5 max-w-lg">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* Controls: Price Editor & Status */}
                          <div className="flex items-center gap-3 justify-end shrink-0">
                            {/* Fast Price Input */}
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-stone-400 font-bold">$</span>
                              <input
                                type="number"
                                step="0.50"
                                defaultValue={item.price.toFixed(2)}
                                onChange={(e) => setQuickPriceEdits({ ...quickPriceEdits, [item.id]: e.target.value })}
                                className="w-20 px-2 py-1 text-xs font-mono-numeric font-bold bg-stone-900 border border-stone-700 rounded text-amber-300 focus:outline-none focus:border-amber-400"
                              />
                              <button
                                onClick={() => handleSavePrice(item.id)}
                                className="p-1.5 bg-stone-800 hover:bg-amber-400 hover:text-stone-950 text-stone-300 rounded text-xs transition-colors cursor-pointer"
                                title="Save new price"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Stock Toggle */}
                            <button
                              onClick={() => {
                                updateMenuItem({ ...item, isAvailable: !item.isAvailable });
                                showSuccessFeedback(`Toggled ${item.name} availability.`);
                              }}
                              className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors cursor-pointer ${
                                item.isAvailable 
                                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                                  : 'bg-red-950/60 border-red-500/40 text-red-300'
                              }`}
                            >
                              {item.isAvailable ? 'In Stock' : 'Sold Out'}
                            </button>

                            {/* Edit Modal Button */}
                            <button
                              onClick={() => setEditingDish(item)}
                              className="p-1.5 text-stone-400 hover:text-white bg-stone-800 rounded transition-colors"
                              title="Edit all fields"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${item.name}" from the menu?`)) {
                                  deleteMenuItem(item.id);
                                  showSuccessFeedback(`Deleted ${item.name}.`);
                                }
                              }}
                              className="p-1.5 text-stone-500 hover:text-red-400 bg-stone-800 rounded transition-colors"
                              title="Delete dish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SPECIALS & DEALS */}
              {activeTab === 'specials' && (
                <div className="space-y-6">
                  <div className="bg-[#181820] p-4 rounded-xl border border-stone-800">
                    <h4 className="font-bold text-stone-100 text-base">Weekly Recurring Specials</h4>
                    <p className="text-xs text-stone-400">
                      Showcase special promotions that appear in the Daily Specials section.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specials.map(sp => (
                      <div key={sp.id} className="bg-[#17171d] border border-stone-800 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-400 text-xs bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded">
                            {sp.day} Special
                          </span>
                          <span className="font-mono-numeric font-bold text-stone-100 text-sm">
                            ${sp.price.toFixed(2)}
                          </span>
                        </div>

                        <div>
                          <h5 className="font-display font-bold text-base text-stone-100">{sp.title}</h5>
                          <p className="text-xs text-stone-400 mt-1">{sp.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                          <span className="text-[11px] text-emerald-400">{sp.badge}</span>
                          <button
                            onClick={() => {
                              deleteSpecial(sp.id);
                              showSuccessFeedback(`Removed ${sp.day} special.`);
                            }}
                            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: RESTAURANT INFO & ANNOUNCEMENTS */}
              {activeTab === 'info' && (
                <div className="space-y-6 max-w-3xl">
                  {/* Announcement Banner Settings */}
                  <div className="bg-[#17171d] border border-stone-800 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <div>
                        <h4 className="font-bold text-stone-100 text-sm">Top Announcement Banner</h4>
                        <p className="text-xs text-stone-400">Controls the bulletin bar that appears at the very top of the website.</p>
                      </div>

                      <button
                        onClick={() => {
                          updateRestaurantInfo({
                            announcement: {
                              ...info.announcement,
                              enabled: !info.announcement.enabled
                            }
                          });
                          showSuccessFeedback(`Announcement banner ${!info.announcement.enabled ? 'Enabled' : 'Disabled'}.`);
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                          info.announcement.enabled 
                            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' 
                            : 'bg-stone-800 border-stone-700 text-stone-400'
                        }`}
                      >
                        {info.announcement.enabled ? 'Banner Active' : 'Banner Off'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Badge Text (e.g., Morning Special, Notice)</label>
                        <input
                          type="text"
                          value={info.announcement.badgeText}
                          onChange={(e) => updateRestaurantInfo({
                            announcement: { ...info.announcement, badgeText: e.target.value }
                          })}
                          className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Announcement Message</label>
                        <textarea
                          rows={2}
                          value={info.announcement.text}
                          onChange={(e) => updateRestaurantInfo({
                            announcement: { ...info.announcement, text: e.target.value }
                          })}
                          className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact & Address Settings */}
                  <div className="bg-[#17171d] border border-stone-800 rounded-xl p-5 space-y-4">
                    <h4 className="font-bold text-stone-100 text-sm border-b border-stone-800 pb-2">
                      Restaurant Contact &amp; Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={info.phone}
                          onChange={(e) => updateRestaurantInfo({ phone: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Street Address</label>
                        <input
                          type="text"
                          value={info.address}
                          onChange={(e) => updateRestaurantInfo({ address: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">City, State, Zip</label>
                        <input
                          type="text"
                          value={info.cityStateZip}
                          onChange={(e) => updateRestaurantInfo({ cityStateZip: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Neighborhood</label>
                        <input
                          type="text"
                          value={info.neighborhood}
                          onChange={(e) => updateRestaurantInfo({ neighborhood: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Hero Subtitle</label>
                      <textarea
                        rows={2}
                        value={info.subheading}
                        onChange={(e) => updateRestaurantInfo({ subheading: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: OPERATING HOURS */}
              {activeTab === 'hours' && (
                <div className="bg-[#17171d] border border-stone-800 rounded-xl p-5 space-y-4 max-w-xl">
                  <h4 className="font-bold text-stone-100 text-sm border-b border-stone-800 pb-2">
                    Operating Schedule by Day
                  </h4>

                  <div className="space-y-3">
                    {(Object.keys(info.hours) as Array<keyof RestaurantHours>).map(day => (
                      <div key={day} className="flex items-center justify-between gap-4">
                        <label className="text-xs font-semibold text-stone-300 capitalize w-28">
                          {day}:
                        </label>
                        <input
                          type="text"
                          value={info.hours[day]}
                          onChange={(e) => {
                            updateRestaurantInfo({
                              hours: {
                                ...info.hours,
                                [day]: e.target.value
                              }
                            });
                          }}
                          className="flex-1 px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100 font-mono-numeric"
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-stone-400 pt-2 border-t border-stone-800">
                    Changes reflect immediately in the location card and customer hours table.
                  </p>
                </div>
              )}

              {/* TAB 5: RESERVATIONS BOOK */}
              {activeTab === 'reservations' && (
                <div className="space-y-4">
                  <div className="bg-[#181820] p-4 rounded-xl border border-stone-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-100 text-base">Guest Table Reservations ({reservations.length})</h4>
                      <p className="text-xs text-stone-400">
                        Review incoming table requests, confirm seating, or contact guests.
                      </p>
                    </div>
                  </div>

                  {reservations.length === 0 ? (
                    <div className="text-center py-12 text-stone-500 text-xs">
                      No reservations yet. Customer bookings from the website will appear here in real-time.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reservations.map(res => (
                        <div
                          key={res.id}
                          className="bg-[#17171d] border border-stone-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-100 text-sm">{res.name}</span>
                              <span className="text-xs text-stone-400">({res.guests} Guests)</span>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                res.status === 'confirmed' 
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                  : res.status === 'pending'
                                  ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                                  : 'bg-red-950 text-red-400 border border-red-500/30'
                              }`}>
                                {res.status}
                              </span>
                            </div>

                            <p className="text-xs text-stone-300">
                              📅 <strong>{res.date}</strong> at <strong>{res.time}</strong> · Area: <span className="capitalize">{res.seatingArea.replace('_', ' ')}</span>
                            </p>

                            <p className="text-xs text-stone-400">
                              📞 {res.phone} · ✉️ {res.email}
                              {res.specialNotes && <span className="block text-amber-300/80 italic mt-0.5">Note: "{res.specialNotes}"</span>}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {res.status !== 'confirmed' && (
                              <button
                                onClick={() => {
                                  updateReservationStatus(res.id, 'confirmed');
                                  showSuccessFeedback(`Confirmed reservation for ${res.name}.`);
                                }}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer"
                              >
                                Confirm Table
                              </button>
                            )}

                            {res.status !== 'cancelled' && (
                              <button
                                onClick={() => {
                                  updateReservationStatus(res.id, 'cancelled');
                                  showSuccessFeedback(`Cancelled reservation for ${res.name}.`);
                                }}
                                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs rounded-lg cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: BACKUP & RESTORE */}
              {activeTab === 'system' && (
                <div className="bg-[#17171d] border border-stone-800 rounded-xl p-6 space-y-6 max-w-xl">
                  <div>
                    <h4 className="font-bold text-stone-100 text-base">Data Management &amp; Recovery</h4>
                    <p className="text-xs text-stone-400 mt-1">
                      Export your custom changes to a JSON backup file or restore the authentic original Kansas diner data at any time.
                    </p>
                  </div>

                  <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3">
                    <h5 className="text-xs font-bold text-stone-200">Reset All Changes to Defaults</h5>
                    <p className="text-xs text-stone-400">
                      Resets all menu prices, items, hours, and announcements back to the original initial state.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Reset all website data and prices to default settings?')) {
                          resetAllToDefaults();
                          showSuccessFeedback('Restored default restaurant data.');
                        }
                      }}
                      className="px-4 py-2 bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Original Defaults</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* MODAL: ADD NEW DISH */}
        {isAddingDish && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#16161c] border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                <h4 className="font-display font-bold text-lg text-stone-100">Add New Dish to Menu</h4>
                <button onClick={() => setIsAddingDish(false)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateDish} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Dish Name</label>
                  <input
                    type="text"
                    required
                    value={newDishName}
                    onChange={(e) => setNewDishName(e.target.value)}
                    placeholder="e.g. Kaw River Catfish Poboy"
                    className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                    <select
                      value={newDishCategory}
                      onChange={(e) => setNewDishCategory(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                    >
                      <option value="beverages">Beverages &amp; Drinks (مشروبات)</option>
                      <option value="tenderloins">Giant Tenderloins</option>
                      <option value="breakfast">Breakfast All Day</option>
                      <option value="burgers">Burgers &amp; Melts</option>
                      <option value="dinners">Homestyle Dinners</option>
                      <option value="sides_sweets">Sides &amp; Sweets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Price ($ USD)</label>
                    <input
                      type="number"
                      step="0.10"
                      required
                      value={newDishPrice}
                      onChange={(e) => setNewDishPrice(e.target.value)}
                      placeholder="14.99"
                      className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newDishDescription}
                    onChange={(e) => setNewDishDescription(e.target.value)}
                    placeholder="Crispy fried, seasoned with house rub, served with fresh coleslaw..."
                    className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Photo Image URL</label>
                  <input
                    type="url"
                    value={newDishImage}
                    onChange={(e) => setNewDishImage(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingDish(false)}
                    className="px-3 py-1.5 bg-stone-800 text-stone-300 text-xs rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg"
                  >
                    Save Dish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT EXISTING DISH */}
        {editingDish && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#16161c] border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                <h4 className="font-display font-bold text-lg text-stone-100">Edit Dish Details</h4>
                <button onClick={() => setEditingDish(null)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditedDish} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Dish Name</label>
                  <input
                    type="text"
                    required
                    value={editingDish.name}
                    onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                    <select
                      value={editingDish.category}
                      onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                    >
                      <option value="beverages">Beverages &amp; Drinks (مشروبات)</option>
                      <option value="tenderloins">Giant Tenderloins</option>
                      <option value="breakfast">Breakfast All Day</option>
                      <option value="burgers">Burgers &amp; Melts</option>
                      <option value="dinners">Homestyle Dinners</option>
                      <option value="sides_sweets">Sides &amp; Sweets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={editingDish.price}
                      onChange={(e) => setEditingDish({ ...editingDish, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingDish.description}
                    onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editingDish.image}
                    onChange={(e) => setEditingDish({ ...editingDish, image: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-lg text-stone-100"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingDish(null)}
                    className="px-3 py-1.5 bg-stone-800 text-stone-300 text-xs rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
