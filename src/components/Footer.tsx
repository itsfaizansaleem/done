import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Shield, RefreshCcw, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  const policies = {
    refund: {
      title: "Refund Policy",
      content: "As we provide digital goods and accounts, refunds are only issued if the account access is not delivered within 24 hours of payment verification. Once the activation is processed, no refunds will be issued."
    },
    return: {
      title: "Return Policy",
      content: "Digital products cannot be 'returned' in the traditional sense. However, if you face any issues with your Canva Pro access, we provide a replacement or fix within the warranty period."
    },
    privacy: {
      title: "Privacy Policy",
      content: "We only collect your email and phone number to deliver the digital service. Your data is never shared with third parties and is used strictly for order fulfillment."
    }
  };

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 py-20 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-serif italic text-slate-900 mb-6">Faizan Digital Studio.</h3>
            <p className="text-xs text-slate-500 leading-loose max-w-xs mb-8">
              Premium digital assets and software solutions. Elevate your creative workflow with our curated tools.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/923280926756" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="mailto:contact@faizansaleem.studio" className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-900 font-bold mb-8">Contact Information</h4>
            <ul className="space-y-6 text-[10px] uppercase tracking-widest text-slate-500 font-medium">
              <li className="flex items-start gap-4">
                <MapPin className="h-4 w-4 shrink-0 text-brand-primary" />
                <span>Lahore, Pakistan<br/>Main Boulevard Gulberg</span>
              </li>
              <li>
                <a href="mailto:contact@faizansaleem.studio" className="flex items-center gap-4 hover:text-brand-primary transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-brand-primary" />
                  <span>contact@faizansaleem.studio</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/923280926756" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-brand-primary transition-colors">
                  <MessageCircle className="h-4 w-4 shrink-0 text-brand-primary" />
                  <span>+92 328 0926756</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-900 font-bold mb-8">Policies & Legal</h4>
            <ul className="space-y-6 text-[10px] uppercase tracking-widest text-slate-500 font-medium">
              <li>
                <button onClick={() => setActivePolicy('refund')} className="hover:text-brand-primary transition-colors flex items-center gap-4 uppercase">
                  <RefreshCcw className="h-4 w-4 text-brand-primary" /> Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('return')} className="hover:text-brand-primary transition-colors flex items-center gap-4 uppercase">
                  <RefreshCcw className="h-4 w-4 text-brand-primary" /> Return & Warranty
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('privacy')} className="hover:text-brand-primary transition-colors flex items-center gap-4 uppercase">
                  <Shield className="h-4 w-4 text-brand-primary" /> Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[8px] text-slate-400 uppercase tracking-[0.4em] text-center md:text-left">
            © 2026 faizansaleem.studio — Faizan Digital Solutions
          </div>
          <div className="text-[8px] text-slate-300 uppercase tracking-[0.2em]">
            Designed with Geometric Precision in Lahore
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activePolicy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 p-10 max-w-lg w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setActivePolicy(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-brand-primary uppercase text-[10px] tracking-widest font-bold"
              >
                CLOSE
              </button>
              <h3 className="text-2xl font-serif italic text-slate-900 mb-6">
                {policies[activePolicy as keyof typeof policies].title}
              </h3>
              <p className="text-sm text-slate-600 leading-loose">
                {policies[activePolicy as keyof typeof policies].content}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
