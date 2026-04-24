import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/90 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative bg-brand-beige w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10"
          >
            {/* Modal Image area */}
            <div className="w-full md:w-3/5 bg-zinc-200 relative group overflow-hidden h-[450px] md:h-auto">
              <motion.img 
                layoutId={`img-${product.id}`}
                src={product.img} 
                alt={product.name}
                className={`w-full h-full object-cover transition-opacity duration-1000 ${product.hoverImg ? 'group-hover:opacity-0' : ''}`}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              {product.hoverImg && (
                <img 
                  src={product.hoverImg} 
                  alt={`${product.name} back`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                <div className="bg-brand-red text-brand-beige px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                  Exclusive Drop
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-2/5 p-10 md:p-16 flex flex-col overflow-y-auto bg-white/50 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-12">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-5xl font-black uppercase font-display tracking-tighter leading-none mb-3 italic">
                    {product.name}
                  </h2>
                  <p className="text-brand-red font-black tracking-[0.3em] uppercase text-xs">
                    Retail {product.price}
                  </p>
                </motion.div>
                <button 
                  onClick={onClose}
                  className="p-3 hover:bg-brand-red hover:text-white transition-all border border-zinc-200 hover:border-transparent group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <div className="flex-1">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-zinc-400">The Blueprint</h3>
                  <p className="text-zinc-600 leading-relaxed text-[15px] mb-12 font-light italic font-serif">
                    "{product.longDesc}"
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-8 border-t border-zinc-100 pt-10"
                >
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 mb-2 font-sans text-right">Collection</p>
                    <p className="text-[11px] font-black uppercase tracking-tighter text-right">{product.id === 'greed' ? '7 Deadly Sins' : 'Essential 01'}</p>
                  </div>
                  <div className="border-l border-zinc-100 pl-8">
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 mb-2 font-sans">Craftsmanship</p>
                    <p className="text-[11px] font-black uppercase tracking-tighter">Premium Cotton</p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.5 }}
                className="mt-16 flex flex-col gap-6"
              >
                <a 
                  href="https://shopee.co.id/Neighbormind" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative w-full bg-[#EE4D2D] text-white py-6 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-[11px] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Acquire Piece
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-brand-dark opacity-20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 2 }}
                  />
                </a>
                <div className="flex justify-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[8px] text-zinc-400 uppercase tracking-[0.4em] font-black">
                    Live on Shopee Official Store
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
