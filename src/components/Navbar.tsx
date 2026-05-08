import { ShoppingCart, Search, Menu, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 lg:px-12">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex flex-col -gap-1">
            <span className="text-xl font-serif italic tracking-tight text-brand-primary leading-none">Faizan.</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-slate-400 font-bold ml-1">Digital Studio</span>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-slate-600 hover:text-brand-primary transition-colors">
                  <User className="h-5 w-5" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hidden sm:block px-6 py-2 bg-brand-primary text-white text-[10px] uppercase tracking-widest hover:bg-brand-secondary transition-all duration-300 rounded-sm">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <Link 
              to="/account"
              className="hidden sm:block px-6 py-2 border border-brand-primary text-brand-primary text-[10px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all duration-300 rounded-sm"
            >
              Dashboard
            </Link>
          </SignedIn>

          <button className="md:hidden text-slate-600">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
