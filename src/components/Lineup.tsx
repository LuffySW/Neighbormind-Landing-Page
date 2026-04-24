import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';

interface LineupProps {
  onSelectProduct: (product: Product) => void;
}

export default function Lineup({ onSelectProduct }: LineupProps) {
  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    viewport: { once: true }
  };

  return (
    <section id="lineup" className="md:col-span-12 lg:col-span-8 p-10 md:p-20 flex flex-col">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">The Lineup</h2>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-brand-red uppercase tracking-[0.3em] mb-1">Authentic Gear</span>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Season 01 / SS2024</span>
        </div>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 flex-1"
      >
        {products.map((item) => (
          <motion.div 
            key={item.id}
            variants={{
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="group relative bg-white border border-zinc-100 p-2 flex flex-col h-full hover:border-brand-red transition-all duration-700 shadow-sm hover:shadow-xl"
          >
            <div className="aspect-[3/4] bg-zinc-100 mb-6 overflow-hidden relative cursor-pointer" onClick={() => onSelectProduct(item)}>
              <motion.img 
                src={item.img} 
                alt={item.name}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className={`w-full h-full object-cover transition-all duration-700 ${item.hoverImg ? 'group-hover:opacity-0' : ''}`}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              {item.hoverImg && (
                <motion.img 
                  src={item.hoverImg} 
                  alt={`${item.name} Back`} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="absolute top-4 right-4 bg-brand-dark/10 backdrop-blur-md px-2 py-1 text-[8px] font-black border border-white/20 uppercase text-brand-dark group-hover:bg-brand-red group-hover:text-white group-hover:border-transparent transition-colors">
                S01
              </div>
            </div>
            <div className="px-4 pb-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-black text-lg uppercase tracking-tighter leading-none group-hover:text-brand-red transition-colors">{item.name}</h3>
                <span className="text-brand-red text-xs font-black tracking-widest">{item.price}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400 font-light mb-6 line-clamp-2 h-8">
                {item.desc}
              </p>
              <button 
                onClick={() => onSelectProduct(item)}
                className="mt-auto group/btn flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark hover:text-[#EE4D2D] transition-all"
              >
                Secure Your Piece <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
