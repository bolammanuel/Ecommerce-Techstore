import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, User, Menu, RefreshCw, Heart, Loader2, MapPin } from 'lucide-react';
import { getSearchSuggestions } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigateHome: () => void;
  onNavigateTrack: () => void;
  onNavigateHelp: () => void;
  activeCategory: string;
  setActiveCategory: (cat: any) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  cartCount, 
  wishlistCount,
  onOpenCart, 
  onOpenWishlist,
  onNavigateHome,
  onNavigateTrack,
  onNavigateHelp,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsTyping(true);
        const results = await getSearchSuggestions(searchQuery);
        setSuggestions(results);
        setIsTyping(false);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200" role="navigation" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            <div 
              className="flex items-center gap-2 shrink-0 cursor-pointer group" 
              onClick={() => {
                onNavigateHome();
                setSearchQuery('');
                setActiveCategory('All');
                window.scrollTo(0, 0);
              }} 
              aria-label="Go to Home"
            >
              <div className="w-10 h-10 bg-[#137fec] rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
                 <RefreshCw size={24} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 hidden sm:block">TechStore</span>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {['Laptops', 'Audio', 'Wearables', 'Smart Home'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); onNavigateHome(); }}
                  className={`text-sm font-semibold transition-colors ${
                    activeCategory === cat ? 'text-[#137fec]' : 'text-slate-600 hover:text-[#137fec]'
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
              <div className="hidden sm:flex max-w-xs w-full relative group" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec]" size={18} aria-hidden="true" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:ring-2 focus:ring-[#137fec] focus:bg-white transition-all outline-none"
                  aria-label="Search Products"
                  aria-autocomplete="list"
                  aria-controls="search-suggestions"
                />
                {isTyping && <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-slate-400" />}
                
                {showSuggestions && suggestions.length > 0 && (
                  <div id="search-suggestions" className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-[100] overflow-hidden" role="listbox">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setSearchQuery(s); setShowSuggestions(false); }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none flex items-center gap-3"
                        role="option"
                      >
                        <Search size={14} className="text-slate-300" />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={onNavigateTrack}
                  className="p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Track Order"
                >
                  <MapPin size={22} />
                </button>
                <button 
                  onClick={onOpenWishlist}
                  className="relative p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label={`Wishlist, ${wishlistCount} items`}
                >
                  <Heart size={22} className={wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white" aria-hidden="true">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button 
                  onClick={onOpenCart}
                  className="relative p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label={`Cart, ${cartCount} items`}
                >
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#137fec] text-[10px] font-bold text-white ring-2 ring-white" aria-hidden="true">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <RefreshCw className="text-[#137fec]" strokeWidth={2.5} /> TechStore
            </h3>
            <p className="text-slate-400 text-sm">Premium electronics for modern creators and professionals.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li className="hover:text-white cursor-pointer" onClick={onNavigateHome}>Products</li>
              <li className="hover:text-white cursor-pointer">Categories</li>
              <li className="hover:text-white cursor-pointer">Offers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li className="hover:text-white cursor-pointer" onClick={onNavigateTrack}>Track Order</li>
              <li className="hover:text-white cursor-pointer" onClick={onNavigateHelp}>Help Center</li>
              <li className="hover:text-white cursor-pointer">Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-[#137fec]" />
              <button className="bg-[#137fec] px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
