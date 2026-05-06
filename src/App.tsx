/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-bg text-white selection:bg-white selection:text-black">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* Add other routes as they are created */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
        <SpeedInsights />
      </div>
    </Router>
  );
}
