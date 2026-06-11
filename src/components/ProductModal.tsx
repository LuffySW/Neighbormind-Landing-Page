import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useRef, useEffect } from 'react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

function ProductModalContent({ product, onClose }: { product: Product, onClose: () => void, key?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityImage = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-brand-beige overflow-y-auto"
      ref={containerRef}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[110] bg-white/80 backdrop-blur-md p-4 rounded-full shadow-2xl hover:bg-brand-red hover:text-white transition-all group border border-zinc-200"
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
      </button>

      {/* Hero Section with Parallax */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-zinc-900">
        <motion.div 
          style={{ y: yImage, opacity: opacityImage }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <img 
            src={product.img} 
            alt={product.name}
            className="w-full h-full object-cover opacity-80"
            loading="eager"
          />
        </motion.div>
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-brand-beige via-transparent to-transparent">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center px-4"
          >
            <h2 className="text-7xl md:text-9xl font-black uppercase font-display tracking-tighter text-white drop-shadow-2xl mb-4 italic">
              {product.name}
            </h2>
            <p className="text-white/80 font-black tracking-[0.4em] uppercase text-sm md:text-base">
              {product.collection}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story & Details Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 bg-brand-beige relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* Left Sidebar: Product Info */}
          <div className="md:col-span-4 flex flex-col gap-12">
            <div className="sticky top-12">
              <div className="mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">Retail Price</p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-black tracking-widest text-brand-red">
                    {product.price}
                  </p>
                  {product.originalPrice && (
                    <p className="text-zinc-400 font-medium tracking-widest line-through text-sm">
                      {product.originalPrice}
                    </p>
                  )}
                </div>
              </div>

              <a 
                href="https://shopee.co.id/Neighbormind" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-full bg-[#EE4D2D] text-white py-6 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-orange-600 transition-colors shadow-xl"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Acquire Piece
              </a>
            </div>
          </div>

          {/* Right Content: The Story */}
          <div className="md:col-span-8">
            {product.story ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="story-content"
                dangerouslySetInnerHTML={{ __html: product.story }}
              />
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">The Blueprint</h3>
                <p className="text-xl text-zinc-600 leading-relaxed font-light font-serif">
                  {product.longDesc}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <ProductModalContent key="product-modal" product={product} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}
