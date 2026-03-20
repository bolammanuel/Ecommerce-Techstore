import React from 'react';
import { X, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem,
  onAddToCart 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-all duration-500 translate-x-0">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Heart className="text-rose-500 fill-rose-500" />
                <h2 className="text-xl font-extrabold text-slate-900">Your Wishlist</h2>
                <span className="bg-rose-50 px-2.5 py-0.5 rounded-full text-xs font-bold text-rose-500">{items.length}</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                    <Heart size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Wishlist is empty</h3>
                  <p className="text-slate-500 max-w-[200px]">Save items you like to see them here.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900 leading-tight pr-4">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">${item.price}</p>
                      
                      <button 
                        onClick={() => { onAddToCart(item); onRemoveItem(item.id); }}
                        className="mt-4 flex items-center gap-2 text-xs font-bold text-[#137fec] hover:text-blue-600 transition-colors"
                      >
                        <ShoppingCart size={14} />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
