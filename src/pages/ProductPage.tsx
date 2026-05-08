import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Download, Share2, ShieldCheck, ArrowLeft, Tag, FileText, Maximize, User, Zap } from 'lucide-react';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'canva-pro',
    name: 'Canva Pro Lifetime',
    description: 'Get full access to Canva Pro features including millions of premium templates (100M+), stock photos, high-end videos, and advanced design tools like Magic Resize, Background Remover, and Brand Kits. This is a one-time activation for your personal email, providing lifetime access without any monthly or yearly subscriptions. Perfect for designers, marketers, and business owners looking to scale their creative output.',
    price: 500,
    category: 'Subscription',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
    author: 'Faizan Digital Solutions',
    fileSize: 'N/A',
    format: 'Premium Account Access'
  }
];

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0]; 

  const handleCheckout = () => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <main className="min-h-screen bg-brand-bg py-12 lg:py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-primary mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Gallery Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="aspect-[4/3] bg-slate-50 border border-slate-200 relative group overflow-hidden shadow-sm">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="h-full w-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #2563EB 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-50 border border-slate-200 cursor-pointer hover:border-brand-primary transition-colors overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 shadow-sm">
                  <img src={`https://picsum.photos/seed/${product.id}-${i}/400/400`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-12">
              <div className="flex items-center gap-6 mb-8 text-[10px] tracking-[0.3em] uppercase font-bold">
                <span className="text-slate-400 italic font-serif normal-case tracking-normal">Offer Type //</span>
                <span className="text-brand-primary">{product.category === 'Subscription' ? 'PRO ACCESS' : product.category}</span>
                <span className="text-slate-200 px-2">|</span>
                <span className="text-slate-400 italic font-serif normal-case tracking-normal">By //</span>
                <span className="text-slate-900">{product.author}</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-serif leading-[0.9] text-slate-900 mb-10">
                {product.name.split(' ').slice(0, -1).join(' ')}<br/>
                <span className="italic text-brand-primary">{product.name.split(' ').pop()}</span>
              </h1>
              
              <p className="text-sm text-slate-500 leading-loose font-sans font-light max-w-lg">
                {product.description}
              </p>
            </div>

            <div className="p-10 bg-slate-50 border border-slate-200 relative overflow-hidden mb-12 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Limited Time Offer</p>
                  <p className="text-4xl font-serif italic text-brand-primary">{product.price} PKR</p>
                </div>
                <div className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center animate-pulse text-brand-primary">
                   <Zap className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-5 mb-12 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                <div className="flex items-center gap-4">
                  <div className="h-1 w-1 bg-brand-primary/40 rounded-full" />
                  Lifetime Activation
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-1 bg-brand-primary/40 rounded-full" />
                  Instant Account Setup
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-1 bg-brand-primary/40 rounded-full" />
                  Premium Support included
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full py-5 bg-brand-primary text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-brand-secondary transition-all flex items-center justify-center gap-3 rounded-sm shadow-lg shadow-brand-primary/20"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-slate-200">
              <div>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-3">Delivery</p>
                <div className="text-[10px] uppercase tracking-widest text-slate-900 font-medium">
                   INSTANT
                </div>
              </div>
              <div>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-3">Setup</p>
                <div className="text-[10px] uppercase tracking-widest text-slate-900 font-medium">
                   5 MINUTES
                </div>
              </div>
              <div>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-3">Guarantee</p>
                <div className="text-[10px] uppercase tracking-widest text-slate-900 font-medium">
                   100% SECURE
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
