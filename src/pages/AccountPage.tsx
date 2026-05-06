import { motion } from 'motion/react';
import { User, Package, Settings, CreditCard, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-brand-bg py-12 lg:py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif italic text-white mb-4">Your Studio.</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Manage your assets, license, and session details.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { icon: User, label: 'Profile' },
              { icon: Package, label: 'Download History' },
              { icon: CreditCard, label: 'Billing & Invoice' },
              { icon: ShieldCheck, label: 'License Keys' },
              { icon: Settings, label: 'Security' },
            ].map((item, i) => (
              <button 
                key={i} 
                className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] transition-all ${i === 0 ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            <div className="pt-8">
              <a 
                href="https://accounts.faizansaleem.studio/sign-in"
                className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </a>
            </div>
          </div>

          {/* Main Context */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 bg-white/[0.02] border border-white/5 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-xl font-serif italic text-white mb-2">Identity Details.</h2>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Verify your information for billing.</p>
                </div>
                <a 
                  href="https://accounts.faizansaleem.studio/user" 
                  className="text-[10px] uppercase tracking-widest text-white/40 underline underline-offset-8 hover:text-white"
                >
                  Edit in Clerk
                </a>
              </div>

              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[8px] uppercase tracking-[0.4em] text-white/20 block mb-2">Display Name</label>
                    <div className="text-sm text-white font-medium">Guest User</div>
                  </div>
                  <div>
                    <label className="text-[8px] uppercase tracking-[0.4em] text-white/20 block mb-2">Account Type</label>
                    <div className="text-sm text-white font-medium italic font-serif">Studio Pro</div>
                  </div>
                </div>
                <div>
                  <label className="text-[8px] uppercase tracking-[0.4em] text-white/20 block mb-2">Connected Email</label>
                  <div className="text-sm text-white font-medium">Please sign in to view</div>
                </div>
              </div>
            </motion.div>

            <div className="p-10 border border-white/5 group hover:bg-white/[0.01] transition-colors relative cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white mb-2">Authentication Status</h3>
                  <p className="text-sm text-white/40 font-light">Secure your downloads with Clerk.</p>
                </div>
                <div className="flex gap-4">
                  <a 
                    href="https://accounts.faizansaleem.studio/sign-up" 
                    className="px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200"
                  >
                    Register Account
                  </a>
                  <a 
                    href="https://accounts.faizansaleem.studio/sign-in" 
                    className="px-8 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
