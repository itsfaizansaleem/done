/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_cGxlYXNhbnQtY293LTYyLmNsZXJrLmFjY291bnRzLmRldiQ";

export default function App() {
  const isSecretKey = CLERK_PUBLISHABLE_KEY?.startsWith('sk_');
  const isValidKey = CLERK_PUBLISHABLE_KEY?.startsWith('pk_');

  if (!CLERK_PUBLISHABLE_KEY || isSecretKey || !isValidKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-900 p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-brand-primary">Authentication Config Required</h1>
          {isSecretKey ? (
            <div className="bg-red-50 border border-red-100 p-6 rounded-lg text-left">
              <p className="text-red-600 font-bold mb-2">Error: Secret Key Detected</p>
              <p className="text-red-500 text-sm mb-4">You are using a <strong>Secret Key</strong> (starting with <code>sk_</code>). For the frontend, you MUST use a <strong>Publishable Key</strong> (starting with <code>pk_</code>).</p>
              <p className="text-slate-600 text-xs">Please go to your <a href="https://dashboard.clerk.com/last-active?path=api-keys" target="_blank" rel="noopener noreferrer" className="underline">Clerk Dashboard</a> and copy the <strong>Publishable Key</strong> into the <code>VITE_CLERK_PUBLISHABLE_KEY</code> variable in your settings.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-600 mb-6">Please set <code>VITE_CLERK_PUBLISHABLE_KEY</code> in your environment variables to enable authentication.</p>
              <div className="text-[10px] text-slate-400 p-4 border border-dashed border-slate-200 rounded">
                If you have already set it, make sure it starts with <code>pk_</code> and you have restarted the dev server.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <Router>
        <div className="min-h-screen flex flex-col bg-brand-bg text-slate-900 selection:bg-brand-primary selection:text-white">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/account" element={<AccountPage />} />
              {/* Add other routes as they are created */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
          <Footer />
          <SpeedInsights />
        </div>
      </Router>
    </ClerkProvider>
  );
}
