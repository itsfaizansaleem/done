"use client";

import { motion } from 'motion/react';
import { ArrowRight, Zap, Shield, Sparkles, Globe } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'canva-pro',
    name: 'Canva Pro Lifetime',
    description: 'Get full access to Canva Pro features including millions of premium templates, stock photos, and advanced design tools.',
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
    description: 'A collection of 25 high-end abstract vector compositions.',
    price: 2400,
    category: 'Vector',
    imageUrl: 'https://picsum.photos/seed/neo/800/600',
    author: 'Studio Echo',
    fileSize: '142 MB',
    format: 'AI, EPS, PNG'
  },
  {
    id: '2',
    name: 'Brutalist UI Kit',
    description: 'Raw, unpolished interface elements for bold web projects.',
    price: 4500,
    category: 'UI Kit',
    imageUrl: 'https://picsum.photos/seed/ui/800/600',
    author: 'Grid System',
    fileSize: '89 MB',
    format: 'Figma'
  },
  {
    id: '3',
    name: 'Opaque Typeface',
    description: 'A high-contrast display serif for editorial excellence.',
    price: 3200,
    category: 'Typeface',
    imageUrl: 'https://picsum.photos/seed/type/800/600',
    author: 'Foundry X',
    fileSize: '1.2 MB',
    format: 'OTF, WOFF2'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-6 lg:px-12 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] animate-pulse" />
          <img 
            src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 text-[10px] text-white/40 uppercase tracking-[0.3em]">Featured Release // Vol. 04</div>
            <h1 className="text-6xl lg:text-8xl font-serif leading-[0.9] text-white mb-10">
              Faizan Digital<br/><span className="italic opacity-80 decoration-white/20">Studio.</span>
            </h1>
            <p className="text-sm text-white/60 max-w-sm mb-12 font-sans font-light leading-loose">
              Premium digital assets and software solutions. Elevate your creative workflow with our curated tools.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <button className="bg-white text-black px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors">
                Explore Studio
              </button>
              <div className="flex items-center gap-4 text-[10px] text-white/30 tracking-widest uppercase">
                <span className="w-8 h-[1px] bg-white/20" />
                Trusted by 5k+ Designers
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-24 px-6 lg:px-12 border-b border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-4">The Collection</p>
              <h2 className="text-4xl lg:text-5xl font-serif italic text-white">Latest Releases.</h2>
            </div>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40 overflow-x-auto pb-4 md:pb-0">
               <button className="text-white border-b border-white pb-2">All Assets</button>
               <button className="hover:text-white transition-colors">Vector</button>
               <button className="hover:text-white transition-colors">UI Kits</button>
               <button className="hover:text-white transition-colors">Typefaces</button>
               <button className="hover:text-white transition-colors">Texture</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-white/10">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6 lg:px-12 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 mid:grid-cols-3 gap-16 lg:gap-32">
          <div className="space-y-6">
            <Zap className="h-6 w-6 text-white/40" />
            <h3 className="text-xl font-serif italic text-white">Instant Fulfillment.</h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">
              Get immediate access to your digital assets upon purchase. No waiting, no friction.
            </p>
          </div>
          <div className="space-y-6">
            <Shield className="h-6 w-6 text-white/40" />
            <h3 className="text-xl font-serif italic text-white">Verified Quality.</h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">
              Each asset is rigorously tested for compatibility and high-fidelity performance.
            </p>
          </div>
          <div className="space-y-6">
            <Sparkles className="h-6 w-6 text-white/40" />
            <h3 className="text-xl font-serif italic text-white">Global Studio.</h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">
              Faizan Digital Solutions supports creators across the globe with premium tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
