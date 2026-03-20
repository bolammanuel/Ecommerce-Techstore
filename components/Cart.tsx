
import React, { useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { VAT_RATE } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true" />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-all duration-500 translate-x-0">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#137fec]" aria-hidden="true" />
                <h2 id="cart-title" className="text-xl font-extrabold text-slate-900">Your Cart</h2>
                <span className="bg-slate-100 px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-500" aria-label={`${items.length} items in cart`}>{items.length}</span>
              </div>
              <button 
                ref={closeButtonRef}
                onClick={onClose} 
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close Cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 animate-pulse">
                    <ShoppingBag size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    Looks like you haven't added any premium tech to your cart yet. Discover our latest collection of high-performance electronics.
                  </p>
                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-[#137fec] text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
                  >
                    Start Shopping
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="mt-8 grid grid-cols-2 gap-4 w-full opacity-30 grayscale pointer-events-none">
                    <div className="h-20 bg-slate-100 rounded-xl"></div>
                    <div className="h-20 bg-slate-100 rounded-xl"></div>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4" role="listitem">
                    <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900 leading-tight pr-4">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm hover:text-[#137fec] disabled:opacity-50"
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center" aria-live="polite">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm hover:text-[#137fec]"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 p-6 space-y-4 bg-slate-50/50">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-slate-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={onCheckout}
                  className="w-full py-4 bg-[#137fec] text-white font-bold rounded-xl shadow-xl shadow-blue-500/30 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group"
                  aria-label="Proceed to Checkout"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
