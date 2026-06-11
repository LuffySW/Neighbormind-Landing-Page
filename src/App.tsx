import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageType, Product } from './types';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StorySection from './components/StorySection';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Lineup from './components/Lineup';
import { products as fallbackProducts } from './data/products';
import { fetchArticleDetail, fetchPublishedArticles } from './lib/cmsApi';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Static Data Fallback: Use local data initially, override if CMS has data.
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadArticles = async () => {
      const cmsProducts = await fetchPublishedArticles();
      if (isMounted && cmsProducts.length > 0) {
        setProducts(cmsProducts);
      }
    };

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectProduct = async (product: Product) => {
    if (product.scenes && product.scenes.length > 0) {
      setSelectedProduct(product);
      return;
    }

    setIsLoadingProduct(true);
    const detail = await fetchArticleDetail(product.id);
    setIsLoadingProduct(false);
    setSelectedProduct(detail ?? product);
  };

  return (
    <div className="min-h-screen selection:bg-brand-red selection:text-white bg-brand-dark w-full">
      {!selectedProduct && (
        <Navbar activePage={activePage} setActivePage={(page) => {
          setActivePage(page);
          if (page === 'home') setSelectedProduct(null);
        }} />
      )}

      <AnimatePresence mode="wait">
        {activePage === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col w-full"
          >
            <AnimatePresence mode="wait">
              {!selectedProduct ? (
                <motion.div
                  key="landing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero />
                  <Philosophy />
                  <Lineup onSelectProduct={handleSelectProduct} products={products} />
                </motion.div>
              ) : (
                <motion.div
                  key="story-mode"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {selectedProduct && (
                    <StorySection
                      product={selectedProduct}
                      onClose={() => setSelectedProduct(null)}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <Contact key="contact" />
        )}
      </AnimatePresence>

      {!selectedProduct && <Footer setActivePage={setActivePage} />}
      {isLoadingProduct && (
        <div className="fixed bottom-6 right-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-brand-dark shadow-lg">
          Loading story...
        </div>
      )}
    </div>
  );
}
