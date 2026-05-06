import { Product } from '../types';
import { Eye, Plus } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative p-6 border-r border-white/10 hover:bg-white/[0.02] transition-colors"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="h-48 bg-neutral-900 border border-white/5 mb-6 overflow-hidden relative">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 m-2 group-hover:m-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-bg/80">
            <Plus className="h-4 w-4 text-white" />
          </div>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-white group-hover:text-white transition-colors">
              {product.name}
            </h3>
            <p className="text-[10px] text-white/40 mt-1 italic font-serif">
              {product.category} Asset
            </p>
          </div>
          <span className="text-[10px] font-mono text-white/80">{product.price} PKR</span>
        </div>
      </Link>
    </motion.div>
  );
}
