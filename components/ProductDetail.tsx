import React, { useState, useMemo } from 'react';
import { Star, ShoppingCart, Heart, ArrowLeft, ShieldCheck, Truck, RefreshCw, Send, User, Check } from 'lucide-react';
import { Product, Review } from '../types';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (p: Product) => void;
  onViewDetail: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  allProducts,
  onBack, 
  onAddToCart, 
  onViewDetail,
  onToggleWishlist,
  isWishlisted,
  reviews,
  onAddReview
}) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [userName, setUserName] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const relatedProducts = useMemo(() => {
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [allProducts, product]);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !userName) return;
    onAddReview({
      productId: product.id,
      userName,
      rating: newRating,
      comment: newComment
    });
    setNewComment('');
    setUserName('');
    setNewRating(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-[#137fec] font-bold text-sm mb-10 transition-colors group"
        aria-label="Back to Product Listing"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </button>

      <div className="grid lg:grid-cols-2 gap-16 mb-20">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="space-y-4 mb-8">
            <span className="inline-flex px-3 py-1 bg-blue-50 text-[#137fec] text-xs font-bold uppercase tracking-wider rounded-full">
              {product.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 2} />
                ))}
              </div>
              <span className="text-slate-400 font-bold">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="mb-8">
             <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-black text-slate-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl font-medium text-slate-300 line-through mb-1">${product.originalPrice}</span>
                )}
             </div>
             <p className="text-slate-500 leading-relaxed text-lg">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`col-span-1 py-4 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 ${
                isAdded ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-[#137fec] shadow-blue-500/30 hover:bg-blue-600'
              }`}
            >
              {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
              {isAdded ? 'Added!' : 'Add to Cart'}
            </button>
            <button 
              onClick={() => onToggleWishlist(product.id)}
              className={`col-span-1 py-4 font-black rounded-2xl border-2 transition-all flex items-center justify-center gap-3 active:scale-95 ${
                isWishlisted 
                ? 'bg-rose-50 border-rose-100 text-rose-500' 
                : 'bg-white border-slate-100 text-slate-900 hover:border-rose-500 hover:text-rose-500'
              }`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

          <div className="space-y-4 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4 text-slate-600">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0"><Truck size={20} /></div>
              <p className="text-sm font-semibold">Free Express Delivery on orders over $500</p>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0"><ShieldCheck size={20} /></div>
              <p className="text-sm font-semibold">2-Year manufacturer warranty included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Related Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={onAddToCart} 
                onViewDetail={onViewDetail}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={false} // This would need the actual wishlist state from App.tsx if we wanted it perfect
              />
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="grid lg:grid-cols-3 gap-16 border-t border-slate-100 pt-16">
        <div className="lg:col-span-1 space-y-8">
          <h2 className="text-2xl font-black text-slate-900">Customer Reviews</h2>
          <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-black text-slate-900">{product.rating}</div>
              <div className="space-y-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Global Rating</div>
              </div>
            </div>
            
            <form onSubmit={handleSubmitReview} className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Leave a review</h3>
              <input 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name" 
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#137fec]"
              />
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button" onClick={() => setNewRating(s)} className={`p-1 transition-colors ${newRating >= s ? 'text-amber-400' : 'text-slate-200'}`}>
                    <Star size={20} fill={newRating >= s ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..." 
                rows={4}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#137fec] resize-none"
              />
              <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                Post Review <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {reviews.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-100 border-dashed">
              <p className="text-slate-400">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="bg-white p-8 rounded-3xl border border-slate-50 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><User size={20} /></div>
                    <div>
                      <div className="font-bold text-slate-900">{r.userName}</div>
                      <div className="text-xs text-slate-400">{r.date}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} />)}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
