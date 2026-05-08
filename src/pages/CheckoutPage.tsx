import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, MessageCircle, Copy, Wallet, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SignInButton, useUser, useAuth } from "@clerk/clerk-react";
import { db, collection, addDoc, serverTimestamp } from '../lib/firebase';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const product = location.state?.product || { name: 'Canva Pro Lifetime', price: 500 };
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync email when user loads
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setFormData(prev => ({ ...prev, email: user.primaryEmailAddress!.emailAddress }));
    }
  }, [user]);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      // The button below should handle modal trigger if not signed in
      return;
    }

    if (formData.email && formData.phone && user) {
      setIsSubmitting(true);
      try {
        // Save to Firebase
        const orderData = {
          userId: user.id,
          email: formData.email,
          phone: formData.phone,
          productName: product.name,
          price: product.price,
          status: 'processing',
          createdAt: serverTimestamp()
        };
        
        await addDoc(collection(db, 'orders'), orderData);

        // Send to Formspree as backup
        await fetch("https://formspree.io/f/xaqaokak", {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            userId: user.id,
            product: product.name,
            price: product.price,
            timestamp: new Date().toISOString()
          }),
          headers: {
            'Accept': 'application/json'
          }
        });
        
        setStep(2);
      } catch (error) {
        console.error("Checkout failed", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const whatsappNumber = "+923280926756";
  const whatsappMessage = `Hi Faizan, I've paid for ${product.name}. My email is ${formData.email}. [Attaching Screenshot]`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg py-12 lg:py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <button 
          onClick={() => step === 1 ? navigate(-1) : setStep(1)}
          className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-primary mb-12 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {step === 1 ? 'Back to product' : 'Back to details'}
        </button>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white border border-slate-200 p-8 lg:p-12 relative overflow-hidden shadow-2xl rounded-sm"
        >
          <div className="absolute top-0 right-0 p-8">
             <div className="text-[40px] font-serif italic text-brand-primary/5 select-none uppercase tracking-widest">{step === 1 ? '01' : '02'}</div>
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl font-serif italic text-slate-900 mb-2">Checkout.</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-12">Complete your purchase for {product.name}</p>

            {step === 1 ? (
              <form onSubmit={handleNext} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full bg-slate-50 border-b border-slate-200 py-4 px-4 text-sm tracking-widest text-slate-900 focus:outline-none focus:border-brand-primary transition-colors placeholder:text-slate-300 uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="ENTER YOUR PHONE NUMBER"
                    className="w-full bg-slate-50 border-b border-slate-200 py-4 px-4 text-sm tracking-widest text-slate-900 focus:outline-none focus:border-brand-primary transition-colors placeholder:text-slate-300 uppercase"
                  />
                </div>

                <div className="pt-8 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Due</p>
                    <p className="text-2xl font-serif italic text-brand-primary">{product.price} PKR</p>
                  </div>
                  {isSignedIn ? (
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-5 bg-brand-primary text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-brand-secondary transition-all disabled:opacity-50 flex items-center gap-2 rounded-sm shadow-lg shadow-brand-primary/20"
                    >
                      {isSubmitting ? 'Processing...' : 'Proceed to payment'}
                    </button>
                  ) : (
                    <SignInButton mode="modal">
                      <button 
                        type="button"
                        className="px-10 py-5 bg-brand-primary text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-brand-secondary transition-all flex items-center gap-2 rounded-sm shadow-lg shadow-brand-primary/20"
                      >
                        <LogIn className="h-4 w-4" />
                        Sign in & Pay
                      </button>
                    </SignInButton>
                  )}
                </div>
              </form>
            ) : (
              <div className="space-y-12">
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="h-12 w-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-brand-primary" />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Payment Method</p>
                       <p className="text-sm font-bold text-slate-900">SadaPay Bank Transfer</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-2">Account Name</p>
                        <p className="text-lg font-serif italic text-slate-900">Usman Akbar</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-2">Account Number (Sadapay)</p>
                        <p className="text-xl font-mono text-brand-primary font-bold">03280926756</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('03280926756')}
                        className="p-2 text-slate-300 hover:text-brand-primary transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-2">Amount to pay</p>
                        <p className="text-2xl font-serif italic text-brand-primary font-bold">{product.price} PKR</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-primary/5 border border-brand-primary/10 p-6 rounded-lg flex gap-4">
                   <div className="text-brand-primary">
                      <CheckCircle2 className="h-5 w-5" />
                   </div>
                   <p className="text-xs text-slate-600 leading-loose">
                     After payment, please take a clear screenshot and send it to our WhatsApp. Your order will be processed within 5-15 minutes of verification.
                   </p>
                </div>

                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-6 bg-[#25D366] text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3 rounded-sm shadow-lg shadow-green-500/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Screenshot via WhatsApp
                </a>
                
                <p className="text-center text-[8px] text-slate-400 uppercase tracking-[0.3em]">
                   Merchant: Faizan Digital Solutions (Reg. 03280926756)
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
