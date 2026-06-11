import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface LineupProps {
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

export default function Lineup({ onSelectProduct, products }: LineupProps) {
  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    viewport: { once: true, margin: "-50px" }
  };

  const dsSeries = products.filter(p => p.collection === '7DS Series');
  const singleReleases = products.filter(p => p.collection === 'Single Releases');

  const renderProductCard = (item: Product) => (
    <motion.div 
      key={item.id}
      variants={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      className="group relative bg-white flex flex-col h-full hover:shadow-2xl transition-shadow duration-500 transform-gpu border border-zinc-100/50"
    >
      <div className="aspect-[4/5] bg-zinc-100 overflow-hidden relative cursor-pointer" onClick={() => onSelectProduct(item)}>
        <img 
          src={item.img} 
          alt={item.name}
          className={`w-full h-full object-cover transition-all duration-700 transform-gpu group-hover:scale-105 will-change-transform ${item.hoverImg ? 'group-hover:opacity-0' : ''}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
        {item.hoverImg && (
          <img 
            src={item.hoverImg} 
            alt={`${item.name} Back`} 
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transform-gpu will-change-transform"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
        )}
        {item.originalPrice && (
          <div className="absolute top-5 left-5 bg-brand-red text-white px-3 py-1.5 text-[9px] font-black tracking-widest uppercase shadow-md">
            Sale
          </div>
        )}
        <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-3 py-1.5 text-[9px] font-black border border-zinc-200 uppercase tracking-widest text-brand-dark group-hover:bg-brand-red group-hover:text-white group-hover:border-transparent transition-colors shadow-sm">
          {item.collection === '7DS Series' ? '7DS Drop' : 'Single Drop'}
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col relative bg-white">
        <div className="flex justify-between items-start mb-5">
          <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tighter leading-none group-hover:text-brand-red transition-colors font-display italic">
            {item.name}
          </h3>
          <div className="flex flex-col items-end gap-1">
            {item.originalPrice && (
              <span className="text-[10px] text-zinc-400 line-through decoration-zinc-300 font-medium tracking-widest">
                {item.originalPrice}
              </span>
            )}
            <span className="text-brand-dark bg-zinc-100 px-3 py-1 text-xs font-black tracking-widest group-hover:bg-brand-red group-hover:text-white transition-colors">
              {item.price}
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 font-normal mb-8 line-clamp-3">
          {item.desc}
        </p>
        
        <button 
          onClick={() => onSelectProduct(item)}
          className="mt-auto w-full group/btn flex items-center justify-center gap-3 bg-brand-dark text-white py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-red transition-colors duration-300 overflow-hidden relative"
        >
          <span className="relative z-10 flex items-center gap-2">
            Explore Story <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out transform-gpu will-change-transform" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <section id="lineup" className="w-full p-6 md:p-16 lg:p-24 flex flex-col bg-stone-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6"
      >
        <div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic font-display text-brand-dark">
            The <span className="text-brand-red">Lineup</span>
          </h2>
          <p className="mt-4 text-zinc-500 text-sm md:text-base font-light max-w-md">
            Koleksi eksklusif dengan bahan premium dan fit yang merepresentasikan dirimu.
          </p>
        </div>
        <div className="flex flex-col md:items-end border-l-2 md:border-l-0 md:border-r-2 border-brand-red pl-4 md:pl-0 md:pr-4 py-1">
          <span className="text-[11px] font-black text-brand-dark uppercase tracking-[0.4em] mb-1">It's About You.</span>
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Since 2025.</span>
        </div>
      </motion.div>

      {/* 7DS Series Section */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-lg font-black uppercase tracking-widest text-brand-dark">7 Deadly Sins Series</h3>
          <div className="h-px bg-zinc-200 flex-1"></div>
        </div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {dsSeries.map(renderProductCard)}
        </motion.div>
      </div>

      {/* Single Releases Section */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-lg font-black uppercase tracking-widest text-brand-dark">Single Releases</h3>
          <div className="h-px bg-zinc-200 flex-1"></div>
        </div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {singleReleases.map(renderProductCard)}
        </motion.div>
      </div>
    </section>
  );
}
