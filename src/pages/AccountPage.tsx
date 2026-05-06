import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Package, Settings, CreditCard, LogOut, ArrowRight, ShieldCheck, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, auth, query, where, getDocs, collection, orderBy, signInWithGoogle, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function AccountPage() {
  const [user, setUser] = useState(auth.currentUser);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        fetchOrders(u.uid);
      } else {
        setOrders([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

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
       // handleFirestoreError(error, OperationType.LIST, 'orders');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleSignIn = () => {
    window.location.href = 'https://accounts.faizansaleem.studio/sign-in';
  };

  const handleSignUp = () => {
    window.location.href = 'https://accounts.faizansaleem.studio/sign-up';
  };

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
              { icon: Package, label: 'My Orders' },
              { icon: CreditCard, label: 'Billing' },
              { icon: ShieldCheck, label: 'License Keys' },
              { icon: Settings, label: 'Security' },
            ].map((item, i) => (
              <button 
                key={i} 
                className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] transition-all ${i === 1 ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            <div className="pt-8">
              {user ? (
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              ) : (
                <button 
                  onClick={handleSignIn}
                  className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-blue-400 hover:bg-blue-500/10 transition-all border border-transparent hover:border-blue-500/20"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
              )}
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
                  <h2 className="text-xl font-serif italic text-white mb-2">My Orders.</h2>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Recent purchase history.</p>
                </div>
                <Package className="h-5 w-5 text-white/20" />
              </div>

              <div className="space-y-4">
                {loading ? (
                  <p className="text-[10px] text-white/20 uppercase tracking-widest text-center py-8">Loading history...</p>
                ) : orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-6 bg-white/[0.01] border border-white/5 group hover:border-white/20 transition-colors">
                      <div>
                        <p className="text-sm text-white font-medium mb-1">{order.productName}</p>
                        <p className="text-[8px] uppercase tracking-widest text-white/30">Ordered: {order.date} // {order.price} PKR</p>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[8px] font-bold uppercase tracking-widest border border-blue-500/20">
                           {order.status}
                         </span>
                         <ArrowRight className="h-3 w-3 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border border-dashed border-white/5">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest mb-4">No orders found</p>
                    <Link to="/" className="text-[10px] text-white underline underline-offset-8 uppercase tracking-widest hover:text-white/60">Browse Studio Marketplace</Link>
                  </div>
                )}
                
                {orders.length > 0 && (
                  <p className="text-[8px] text-white/10 uppercase tracking-[0.2em] text-center pt-4">End of history</p>
                )}
              </div>
            </motion.div>

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
                  Sync with Clerk
                </a>
              </div>

              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[8px] uppercase tracking-[0.4em] text-white/20 block mb-2">Display Name</label>
                    <div className="text-sm text-white font-medium">{user?.displayName || 'Guest User'}</div>
                  </div>
                  <div>
                    <label className="text-[8px] uppercase tracking-[0.4em] text-white/20 block mb-2">Account Type</label>
                    <div className="text-sm text-white font-medium italic font-serif">{user ? 'Studio Pro' : 'Free Tier'}</div>
                  </div>
                </div>
                <div>
                  <label className="text-[8px] uppercase tracking-[0.4em] text-white/20 block mb-2">Connected Email</label>
                  <div className="text-sm text-white font-medium">{user?.email || 'Please sign in to view'}</div>
                </div>
              </div>
            </motion.div>

            {!user && (
              <div className="p-10 border border-white/5 group hover:bg-white/[0.01] transition-colors relative cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-white mb-2">Authentication Status</h3>
                    <p className="text-sm text-white/40 font-light">Secure your downloads and view order history.</p>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleSignUp}
                      className="px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200"
                    >
                      Sign Up
                    </button>
                    <button 
                      onClick={handleSignIn}
                      className="px-8 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                      Sign In
                    </button>
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
