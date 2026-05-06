"use client";

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Check, Download, Share2, ShieldCheck, ArrowLeft, Tag, FileText, Maximize, User, Zap } from 'lucide-react';
import { Product } from '../../../types';
import Link from 'next/link';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'canva-pro',
    name: 'Canva Pro Lifetime',
    description: 'Get full access to Canva Pro features including millions of premium templates, stock photos, and advanced design tools. No monthly fees, lifetime access with continuous updates.',
    price: 500,
    category: 'Subscription',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
    author: 'Faizan Digital',
    fileSize: 'N/A',
    format: 'Account Access'
  },
  {
    id: '1',
    name: 'Neo-Abstract Vector Pack',
    description: 'A collection of 25 high-end abstract vector compositions for modern branding. Perfect for background elements, social media graphics, and textile design. Each piece is meticulously crafted with mathematical precision.',
    price: 2400,
    category: 'Vector',
    imageUrl: 'https://picsum.photos/seed/neo/1200/900',
    author: 'Studio Echo',
    fileSize: '142 MB',
    format: 'AI, EPS, PNG'
  }
];

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0]; 

  const handleCheckout = () => {
    // In Next.js, we should handle persistent state differently, but for now we'll pass via URL or context if needed.
    // However, given the instructions, I'll just push to checkout.
    router.push(`/checkout?productId=${product.id}`);
  };

  return (
    <main className="min-h-screen bg-brand-bg py-12 lg:py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link 
          href="/"
          className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white mb-20 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to collection
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Visuals */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-12"
          >
            <div className="aspect-[4/5] bg-brand-surface border border-white/5 overflow-hidden relative group">
              <img 
                src={product.imageUrl} 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                <Maximize className="h-4 w-4 text-white/60" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-brand-surface border border-white/5 cursor-pointer hover:border-white/20 transition-colors overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100">
                  <img src={`https://picsum.photos/seed/${product.id}-${i}/400/400`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-12">
              <div className="flex items-center gap-6 mb-8 text-[10px] tracking-[0.3em] uppercase">
                <span className="text-white/40 italic font-serif normal-case tracking-normal">Offer Type //</span>
                <span className="text-white font-bold">{product.category === 'Subscription' ? 'PRO ACCESS' : product.category}</span>
                <span className="text-white/40 px-2">|</span>
                <span className="text-white/40 italic font-serif normal-case tracking-normal">By //</span>
                <span className="text-white font-bold">{product.author}</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-serif italic text-white mb-8 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-sm text-white/50 leading-loose font-light max-w-lg mb-12">
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

              <div className="space-y-4 mb-10 text-[10px] uppercase tracking-widest text-white/60">
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

            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-white/5">
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
