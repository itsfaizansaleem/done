import { Product } from '../types';
import { Eye, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      className="group relative p-6 border-r border-slate-200 hover:bg-slate-50 transition-colors"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 bg-slate-100 border border-slate-200 mb-6 overflow-hidden relative">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 m-2 group-hover:m-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 h-8 w-8 rounded-full border border-slate-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 text-brand-primary">
            <Plus className="h-4 w-4" />
          </div>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-900 group-hover:text-brand-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 italic font-serif">
              {product.category} Asset
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-600 group-hover:text-brand-primary transition-colors">{product.price} PKR</span>
        </div>
      </Link>
    </motion.div>
  );
}
