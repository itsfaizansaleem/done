import { motion } from 'motion/react';
import { ArrowRight, Box, Image as ImageIcon, LayoutGrid, Palette, Sparkles, Zap, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

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
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Hero Spotlight Section */}
      <section className="flex flex-col lg:flex-row h-[70vh] min-h-[600px] border-b border-white/10 overflow-hidden">
        <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center border-r border-white/10 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 text-[10px] text-white/40 uppercase tracking-[0.3em]">Exclusive Bundle // Lifetime Access</div>
            <h1 className="text-6xl lg:text-8xl font-serif leading-[0.9] text-white mb-10">
              Canva Pro<br/><span className="italic opacity-80 decoration-white/20">Lifetime.</span>
            </h1>
            <p className="text-sm text-white/60 max-w-sm mb-12 font-sans font-light leading-loose">
              Unlock the full power of Canva with our exclusive Pro Lifetime access. Designed for individuals and creators looking for premium tools without recurring costs.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <button className="bg-white text-black px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors">
                Purchase bundle — 500 PKR
              </button>
              <span className="text-[10px] text-white/40 uppercase tracking-widest underline underline-offset-8 cursor-pointer hover:text-white transition-colors">
                View Full Details
              </span>
            </div>
          </motion.div>
        </div>
        
        <div className="lg:w-1/2 bg-brand-surface relative flex items-center justify-center p-12 lg:p-24 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] grayscale" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="z-10 w-full max-w-md aspect-[3/4] bg-white/5 backdrop-blur-2xl border border-white/10 flex flex-col p-8 relative"
          >
            <div className="flex-1 bg-white/[0.02] border border-white/5 mb-6 relative flex items-center justify-center overflow-hidden">
               <div className="text-[80px] lg:text-[120px] font-serif italic text-white/5 select-none absolute">Cp.</div>
               <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale mix-blend-overlay" referrerPolicy="no-referrer" />
            </div>
            <div className="text-[10px] tracking-widest text-white/30 mb-2 uppercase">Order ID // LV-2026</div>
            <div className="text-xl font-serif italic text-white">Canva Pro Lifetime Access</div>
            
            <div className="absolute -bottom-12 -right-12 text-[120px] font-serif italic text-white/[0.03] select-none pointer-events-none">PRO</div>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          <div className="p-12 lg:p-16 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-white/[0.02] transition-colors border-r border-white/10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 group-hover:text-white transition-colors">Explore Full Archive</div>
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
               <ChevronRight className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Spotlight */}
      <section className="bg-brand-surface py-32 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 grid lg:grid-cols-3 gap-24 relative z-10">
          {[
            { tag: '01', title: 'Curated Assets', desc: 'Hand-picked by our studio to ensure geometric precision and timeless aesthetic value.' },
            { tag: '02', title: 'Studio Grade', desc: 'Assets provided in native AI, EPS, and high-fidelity textures for professional output.' },
            { tag: '03', title: 'Universal License', desc: 'Simple, transparent licensing for both independent creators and global agencies.' }
          ].map((feat, i) => (
            <div key={i} className="flex flex-col gap-6">
              <span className="text-[40px] font-serif italic text-white/10">{feat.tag}</span>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">{feat.title}</h3>
              <p className="text-sm text-white/40 leading-loose font-light">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Editorial Newsletter */}
      <section className="py-32 px-12 text-center relative">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
           <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-8 tracking-tight">The Weekly Circular.</h2>
           <p className="text-white/40 max-w-xl mx-auto mb-12 text-sm uppercase tracking-widest">Selected releases and studio insights direct to your inbox.</p>
           <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
             <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              className="flex-1 bg-transparent border-b border-white/20 py-4 text-[10px] tracking-widest text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/10 uppercase"
             />
             <button className="px-10 py-5 bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] whitespace-nowrap hover:bg-neutral-200 transition-colors">Join Atelier</button>
           </form>
         </motion.div>
      </section>
    </main>
  );
}
