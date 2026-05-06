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
        <Link to="/" className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white mb-12 transition-colors">
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
            <div className="aspect-[4/3] bg-brand-surface border border-white/5 relative group overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="h-full w-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-brand-surface border border-white/5 cursor-pointer hover:border-white/20 transition-colors overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100">
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
              <div className="flex items-center gap-6 mb-8 text-[10px] tracking-[0.3em] uppercase">
                <span className="text-white/40 italic font-serif normal-case tracking-normal">Offer Type //</span>
                <span className="text-white font-bold">{product.category === 'Subscription' ? 'PRO ACCESS' : product.category}</span>
                <span className="text-white/40 px-2">|</span>
                <span className="text-white/40 italic font-serif normal-case tracking-normal">By //</span>
                <span className="text-white font-bold">{product.author}</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-serif leading-[0.9] text-white mb-10">
                {product.name.split(' ').slice(0, -1).join(' ')}<br/>
                <span className="italic opacity-80">{product.name.split(' ').pop()}</span>
              </h1>
              
              <p className="text-sm text-white/50 leading-loose font-sans font-light max-w-lg">
                {product.description}
              </p>
            </div>

            <div className="p-10 bg-white/[0.02] border border-white/5 relative overflow-hidden mb-12">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-4">Limited Time Offer</p>
                  <p className="text-4xl font-serif italic text-white">{product.price} PKR</p>
                </div>
                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
                   <Zap className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-5 mb-12 text-[10px] uppercase tracking-[0.2em] text-white/60">
                <div className="flex items-center gap-4">
                  <div className="h-1 w-1 bg-white/40 rounded-full" />
                  Lifetime Activation
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-1 bg-white/40 rounded-full" />
                  Instant Account Setup
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-1 bg-white/40 rounded-full" />
                  Premium Support included
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full py-5 bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-neutral-200 transition-all flex items-center justify-center gap-3"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-white/10">
              <div>
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] mb-3">Delivery</p>
                <div className="text-[10px] uppercase tracking-widest text-white">
                   INSTANT
                </div>
              </div>
              <div>
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] mb-3">Setup</p>
                <div className="text-[10px] uppercase tracking-widest text-white">
                   5 MINUTES
                </div>
              </div>
              <div>
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] mb-3">Guarantee</p>
                <div className="text-[10px] uppercase tracking-widest text-white">
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
