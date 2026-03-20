import React from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

interface HelpCenterProps {
  onBack: () => void;
  onOpenChat: () => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ onBack, onOpenChat }) => {
  const faqs = [
    { q: "How do I track my order?", a: "You can track your order using the Order ID provided in your confirmation email. Visit our Track Order page and enter your ID." },
    { q: "What is your return policy?", a: "We offer a 30-day return policy for all unused items in their original packaging. Contact support to initiate a return." },
    { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. Shipping costs and times vary by location." },
    { q: "How can I contact support?", a: "You can reach us via live chat, email, or phone. Our support team is available 24/7." }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-[#137fec] font-bold text-sm mb-10 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Store
      </button>

      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">Help Center</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Everything you need to know about our products, shipping, and support services.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-center space-y-4">
          <div className="w-14 h-14 bg-blue-50 text-[#137fec] rounded-2xl flex items-center justify-center mx-auto">
            <MessageSquare size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Live Chat</h3>
          <p className="text-slate-500 text-sm">Chat with our support team in real-time for quick answers.</p>
          <button 
            onClick={onOpenChat}
            className="text-[#137fec] font-bold text-sm flex items-center gap-2 mx-auto hover:gap-3 transition-all"
          >
            Start Chat <ArrowRight size={14} />
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
            <Phone size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Phone Support</h3>
          <p className="text-slate-500 text-sm">Call us directly at +1 (800) TECH-STORE for assistance.</p>
          <button className="text-emerald-500 font-bold text-sm flex items-center gap-2 mx-auto hover:gap-3 transition-all">
            Call Now <ArrowRight size={14} />
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-center space-y-4">
          <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mx-auto">
            <Mail size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Email Us</h3>
          <p className="text-slate-500 text-sm">Send us an email and we'll get back to you within 24 hours.</p>
          <button className="text-purple-500 font-bold text-sm flex items-center gap-2 mx-auto hover:gap-3 transition-all">
            Send Email <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="bg-slate-50 rounded-[3rem] p-12 lg:p-16">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-900">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h4>
              <p className="text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <FileText size={14} /> Documentation
          </div>
          <h3 className="text-2xl font-bold mb-4">Need more detailed information?</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Check our full documentation for product manuals, warranty details, and technical specifications.</p>
          <button className="px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all">
            Browse Manuals
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
