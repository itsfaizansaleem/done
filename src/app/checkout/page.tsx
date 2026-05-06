"use client";

import { useState, Suspense } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, MessageCircle, Copy, Wallet } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || 'canva-pro';
  
  // Mocking the product lookup for simplicity in checkout
  const product = { name: productId === 'canva-pro' ? 'Canva Pro Lifetime' : 'Premium Asset', price: 500 };
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.phone) {
      setStep(2);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const whatsappNumber = "+923280926756";
  const whatsappMessage = `Hi Faizan, I've paid for ${product.name}. My email is ${formData.email}. [Attaching Screenshot]`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="mx-auto max-w-2xl">
      <button 
        onClick={() => step === 1 ? router.back() : setStep(1)}
        className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white mb-12 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {step === 1 ? 'Back to product' : 'Back to details'}
      </button>

      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-white/[0.02] border border-white/5 p-8 lg:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8">
           <div className="text-[40px] font-serif italic text-white/5 select-none uppercase tracking-widest">{step === 1 ? '01' : '02'}</div>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-serif italic text-white mb-2">Checkout.</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-12">Complete your purchase for {product.name}</p>

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Email Address</label>
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-sm tracking-widest text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/5 uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Phone Number</label>
                <input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="ENTER YOUR PHONE NUMBER"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-sm tracking-widest text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/5 uppercase"
                />
              </div>

              <div className="pt-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Total Due</p>
                  <p className="text-2xl font-serif italic text-white">{product.price} PKR</p>
                </div>
                <button 
                  type="submit"
                  className="px-10 py-5 bg-white text-black font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-neutral-200 transition-all"
                >
                  Proceed to payment
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-12">
              <div className="p-8 bg-white/[0.03] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-4 mb-8">
                   <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-white/40" />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Payment Method</p>
                     <p className="text-sm font-bold text-white">SadaPay Bank Transfer</p>
                   </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <div>
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] mb-2">Account Name</p>
                      <p className="text-lg font-serif italic text-white">Faizan Saleem</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <div>
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] mb-2">Account Number (Sadapay)</p>
                      <p className="text-xl font-mono text-white">03280926756</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('03280926756')}
                      className="p-2 text-white/30 hover:text-white transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] mb-2">Amount to pay</p>
                      <p className="text-2xl font-serif italic text-white">{product.price} PKR</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl flex gap-4">
                 <div className="text-blue-400">
                    <CheckCircle2 className="h-5 w-5" />
                 </div>
                 <p className="text-xs text-blue-200/60 leading-loose">
                   After payment, please take a clear screenshot and send it to our WhatsApp. Your order will be processed within 5-15 minutes of verification.
                 </p>
              </div>

              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-6 bg-[#25D366] text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="h-5 w-5" />
                Send Screenshot via WhatsApp
              </a>
              
              <p className="text-center text-[8px] text-white/20 uppercase tracking-[0.3em]">
                 Merchant: Faizan Digital Solutions (Reg. 03280926756)
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-brand-bg py-12 lg:py-24 px-6 lg:px-12">
      <Suspense fallback={<div className="text-white text-center">Loading Checkout...</div>}>
        <CheckoutContent />
      </Suspense>
    </main>
  );
}
