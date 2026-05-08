import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, Package, Settings, CreditCard, LogOut, ArrowRight, ShieldCheck, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SignInButton, SignUpButton, useUser, useAuth } from "@clerk/clerk-react";
import { db, query, where, getDocs, collection, orderBy } from '../lib/firebase';

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const { isSignedIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchOrders(user.id);
    } else if (isLoaded && !isSignedIn) {
      setOrders([]);
      setLoading(false);
    }
  }, [isSignedIn, user, isLoaded]);

  const fetchOrders = async (uid: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate?.()?.toLocaleDateString() || new Date().toLocaleDateString()
      }));
      setOrders(fetchedOrders);
    } catch (error) {
       console.error("Fetch orders failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg py-12 lg:py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif italic text-slate-900 mb-4">Your Studio.</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Manage your assets, license, and session details.</p>
        </header>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Dashboard Nav */}
          <div className="space-y-2">
            {[
              { icon: UserIcon, label: 'Profile' },
              { icon: Package, label: 'My Orders' },
              { icon: CreditCard, label: 'Billing' },
              { icon: ShieldCheck, label: 'License Keys' },
              { icon: Settings, label: 'Security' },
            ].map((item, i) => (
              <button 
                key={i} 
                className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] transition-all rounded-sm font-bold ${i === 1 ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            <div className="pt-8">
              {isSignedIn ? (
                <button 
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 rounded-sm font-bold"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button 
                    className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-brand-primary hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 rounded-sm font-bold"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 bg-slate-50 border border-slate-200 relative overflow-hidden shadow-sm"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-xl font-serif italic text-slate-900 mb-2">My Orders.</h2>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Recent purchase history.</p>
                </div>
                <Package className="h-5 w-5 text-slate-300" />
              </div>

              <div className="space-y-4">
                {loading ? (
                  <p className="text-[10px] text-slate-300 uppercase tracking-widest text-center py-8">Loading history...</p>
                ) : orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-6 bg-white border border-slate-200 group hover:border-brand-primary transition-colors shadow-sm">
                      <div>
                        <p className="text-sm text-slate-900 font-medium mb-1">{order.productName}</p>
                        <p className="text-[8px] uppercase tracking-widest text-slate-400">Ordered: {order.date} // {order.price} PKR</p>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[8px] font-bold uppercase tracking-widest border border-brand-primary/20">
                           {order.status}
                         </span>
                         <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border border-dashed border-slate-200 bg-white">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-4">No orders found</p>
                    {isSignedIn ? (
                      <Link to="/" className="text-[10px] text-brand-primary underline underline-offset-8 uppercase tracking-widest font-bold hover:text-brand-secondary transition-colors">Browse Studio Marketplace</Link>
                    ) : (
                      <SignInButton mode="modal">
                        <button className="text-[10px] text-brand-primary underline underline-offset-8 uppercase tracking-widest font-bold hover:text-brand-secondary transition-colors">Sign in to view orders</button>
                      </SignInButton>
                    )}
                  </div>
                )}
                
                {orders.length > 0 && (
                  <p className="text-[8px] text-slate-300 uppercase tracking-[0.2em] text-center pt-4">End of history</p>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-slate-50 border border-slate-200 relative overflow-hidden shadow-sm"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-xl font-serif italic text-slate-900 mb-2">Identity Details.</h2>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Verify your information for billing.</p>
                </div>
                <div className="flex flex-col items-end gap-2 text-right">
                  <UserIcon className="h-5 w-5 text-slate-300 mb-2" />
                  <a 
                    href="https://accounts.faizansaleem.studio/user" 
                    className="text-[10px] uppercase tracking-widest text-slate-400 underline underline-offset-8 hover:text-brand-primary font-bold"
                  >
                    Manage Identity
                  </a>
                </div>
              </div>

              <div className="space-y-10">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[8px] uppercase tracking-[0.4em] text-slate-400 block mb-2 font-bold">Display Name</label>
                    <div className="text-sm text-slate-900 font-medium">{user?.fullName || 'Guest User'}</div>
                  </div>
                  <div>
                    <label className="text-[8px] uppercase tracking-[0.4em] text-slate-400 block mb-2 font-bold">Account Type</label>
                    <div className="text-sm text-brand-primary font-medium italic font-serif">{isSignedIn ? 'Studio Pro' : 'Free Tier'}</div>
                  </div>
                </div>
                <div>
                  <label className="text-[8px] uppercase tracking-[0.4em] text-slate-400 block mb-2 font-bold">Email Address</label>
                  <div className="text-sm text-slate-900 font-medium">{user?.primaryEmailAddress?.emailAddress || 'Not authenticated'}</div>
                </div>
              </div>
            </motion.div>

            {!isSignedIn && (
              <div className="p-10 border border-slate-100 bg-slate-50/50 group hover:bg-slate-50 transition-colors relative cursor-pointer shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-900 font-bold mb-2">Authentication Status</h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">Secure your downloads and view order history with our verified system.</p>
                  </div>
                  <div className="flex gap-4 shrink-0">
                    <SignUpButton mode="modal">
                      <button 
                        className="px-8 py-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-secondary rounded-sm transition-all shadow-lg shadow-brand-primary/20"
                      >
                        Sign Up
                      </button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <button 
                        className="px-8 py-4 border border-brand-primary text-brand-primary text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all rounded-sm"
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
