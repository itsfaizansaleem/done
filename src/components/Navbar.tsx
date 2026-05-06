import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-bg/80 backdrop-blur-md px-6 lg:px-12">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex flex-col -gap-1">
            <span className="text-xl font-serif italic tracking-tight text-white leading-none">Faizan.</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold ml-1">Digital Studio</span>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/account" className="relative group text-white/60 hover:text-white transition-colors">
              <User className="h-4 w-4" />
            </Link>
          </div>
          
          <Link 
            to="/account"
            className="hidden sm:block px-6 py-2 border border-white/20 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-white"
          >
            Account
          </Link>

          <button className="md:hidden text-white/60">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
