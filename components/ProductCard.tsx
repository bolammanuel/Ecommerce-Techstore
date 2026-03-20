import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetail: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onViewDetail, 
  onToggleWishlist,
  isWishlisted
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onViewDetail(product.id)}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-[#137fec] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">New</span>
          )}
          {product.originalPrice && (
            <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">Sale</span>
          )}
        </div>

        <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
            className={`p-2.5 rounded-full shadow-lg transition-all ${isWishlisted ? 'bg-rose-500 text-white' : 'bg-white text-slate-400 hover:text-rose-500'}`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-3 text-white text-sm font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${
              isAdded ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-[#137fec] shadow-blue-500/30 hover:bg-blue-600'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-3 flex-grow">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 2} />
            ))}
          </div>
          <span className="text-slate-400 text-xs font-semibold">({product.rating})</span>
        </div>

        <h3 
          className="text-lg font-bold text-slate-900 group-hover:text-[#137fec] transition-colors line-clamp-1 cursor-pointer"
          onClick={() => onViewDetail(product.id)}
        >
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed h-10">{product.description}</p>
        
        <div className="mt-auto pt-4 flex items-end gap-3">
          <span className="text-2xl font-black text-slate-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm font-medium text-slate-300 line-through mb-1">${product.originalPrice}</span>
          )}
          {product.stock < 10 && (
            <span className="ml-auto text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded uppercase">Only {product.stock} left</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
