import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Product, PageType } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Lineup from './components/Lineup';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePage, setActivePage] = useState<PageType>('home');

  return (
    <div className="min-h-screen selection:bg-brand-red selection:text-white bg-brand-beige overflow-x-hidden">
      {/* NAVBAR */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* PAGE CONTENT */}
      <AnimatePresence mode="wait">
        {activePage === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
          >
            <Hero />
            <main className="max-w-7xl mx-auto border-x border-zinc-200 bg-white flex flex-col">
              <Lineup onSelectProduct={setSelectedProduct} />
              <Philosophy />
            </main>
          </motion.div>
        ) : (
          <Contact key="contact" />
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <Footer setActivePage={setActivePage} />

      {/* PRODUCT DETAIL MODAL */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
