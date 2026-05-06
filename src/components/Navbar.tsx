import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-bg/80 backdrop-blur-md px-6 lg:px-12">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex flex-col -gap-1">
            <span className="text-xl font-serif italic tracking-tight text-white leading-none">Faizan.</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold ml-1">Digital Solutions</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Marketplace</Link>
            <Link to="/account" className="hover:text-white transition-colors">My Account</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Studio</Link>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden sm:flex items-center gap-3 py-1 border-b border-white/5 group">
            <Search className="h-3.5 w-3.5 text-white/30 group-hover:text-white/50" />
            <input 
              type="text" 
              placeholder="SEARCH ASSETS" 
              className="bg-transparent border-none text-[10px] tracking-widest focus:outline-none placeholder:text-white/20 w-40 uppercase"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative group">
              <div className="w-4 h-4 border border-white/30 flex items-center justify-center text-[8px] absolute -top-2 -right-2 bg-brand-bg group-hover:border-white transition-colors">3</div>
              <ShoppingCart className="h-4 w-4 text-white/60 group-hover:text-white" />
            </button>
            
            <a 
              href="https://accounts.faizansaleem.studio/sign-in"
              className="hidden sm:block px-6 py-2 border border-white/20 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Account
            </a>
          </div>
          
          <button className="md:hidden text-white/60">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
