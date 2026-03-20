import React from 'react';
import { Play } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 mb-16 border border-slate-100">
      <div className="grid lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 lg:p-20">
        <div className="flex flex-col gap-8 order-2 lg:order-1 relative z-10">
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-0.5 bg-[#137fec] rounded-full"></div>
            <span className="text-[#137fec] font-bold text-xs uppercase tracking-[0.2em]">New Release</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
            The Future of <br className="hidden sm:block" /> Sound is Here.
          </h1>
          
          <p className="text-lg text-slate-500 max-w-md leading-relaxed">
            Experience audio like never before with the Ultra-Noise Cancelling Headphones X5. Immerse yourself in pure silence.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={onShopNow}
              className="h-14 px-10 bg-[#137fec] text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
              Shop Now
            </button>
            <a 
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-14 px-8 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Play size={14} fill="currentColor" />
              </div>
              Watch Video
            </a>
          </div>
        </div>
        
        <div className="relative h-[400px] sm:h-[500px] lg:h-full min-h-[450px] order-1 lg:order-2">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-white rounded-3xl overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center mix-blend-multiply opacity-90 transition-transform duration-1000 hover:scale-110"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop')` }}
            />
          </div>
          {/* Floating badge */}
          <div className="absolute top-10 right-10 bg-white p-6 rounded-2xl shadow-2xl animate-bounce-slow border border-slate-50">
            <div className="text-[#137fec] font-black text-3xl">40h</div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Battery Life</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
