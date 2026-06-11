import { useState, useEffect } from 'react';
import { ShoppingBag, ChevronDown, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface StorySectionProps {
  product: Product;
  onClose?: () => void;
}

export default function StorySection({ product, onClose }: StorySectionProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <div className="relative w-full bg-brand-dark text-white font-sans selection:bg-brand-red selection:text-white">
      {/* Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-50 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:scale-110 transition-all duration-300 shadow-xl group"
          aria-label="Close Story"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}

      {/* Fixed Background Image */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={product.img} 
          alt={product.name}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[center_15%] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 w-full flex flex-col">
        {product.scenes?.map((scene, idx) => (
          <section 
            key={idx} 
            className={`min-h-screen w-full flex flex-col items-center justify-center relative ${scene.carousel ? 'px-0 py-24' : 'px-6 md:px-12 py-24'}`}
          >
            {/* Title Scene */}
            {scene.title && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center w-full flex flex-col items-center"
              >
                <h2 className="text-[18vw] md:text-[140px] lg:text-[180px] font-black uppercase font-display tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-[0.85] italic mb-6">
                  {scene.title}
                </h2>
                {scene.subtitle && (
                  <p className="text-brand-red font-black tracking-[0.4em] uppercase text-sm md:text-xl lg:text-2xl drop-shadow-lg">
                    {scene.subtitle}
                  </p>
                )}
                {/* Scroll Indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
                >
                   <ChevronDown className="w-8 h-8 text-white/50" />
                </motion.div>
              </motion.div>
            )}

            {/* Narrative Text Scene */}
            {scene.text && scene.text.length > 0 && (
              <div className="flex flex-col items-center text-center gap-8 md:gap-12 max-w-5xl mx-auto w-full">
                {scene.text.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-display italic text-zinc-100 font-black uppercase tracking-tight leading-[1.1] drop-shadow-2xl"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            )}

            {/* Narrative Details (Secondary Text) */}
            {scene.details && scene.details.length > 0 && (
              <div className="flex flex-col gap-6 md:gap-8 max-w-3xl mx-auto mt-12 md:mt-16 text-center px-6">
                {scene.details.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className="text-base md:text-xl font-light text-zinc-300 leading-relaxed drop-shadow-md"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            )}

            {/* Carousel Scene */}
            {scene.carousel && scene.carousel.length > 0 && (
              <div className="w-full flex flex-col items-center justify-center">
                {scene.subtitle && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                     <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-zinc-400 bg-black/60 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-xl">
                       {scene.subtitle}
                     </p>
                  </motion.div>
                )}
                
                <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 px-8 md:px-[20vw] pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {scene.carousel.map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, margin: "-10%" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="snap-center shrink-0 w-[85vw] sm:w-[60vw] lg:w-[40vw] xl:w-[35vw] flex flex-col gap-4"
                    >
                      <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative group bg-black/50">
                         <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                         <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                           <h4 className="text-xl md:text-2xl font-black uppercase tracking-widest text-brand-red mb-3 drop-shadow-md">{item.title}</h4>
                           <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed drop-shadow-md">{item.desc}</p>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Hotspot Scene (Fallback if any) */}
            {scene.hotspots && scene.hotspots.length > 0 && (
              <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
                <div className="relative w-full max-w-7xl h-full md:h-[80vh]">
                  {scene.subtitle && !scene.carousel && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="absolute top-1/4 md:top-0 left-1/2 -translate-x-1/2 text-center z-10"
                    >
                       <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-zinc-400 bg-black/60 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-xl">
                         {scene.subtitle}
                       </p>
                    </motion.div>
                  )}
                  {scene.hotspots.map((hotspot, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, margin: "-10%" }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring" }}
                      className="absolute z-20 pointer-events-auto"
                      style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                    >
                      <span className="absolute inset-0 -m-3 rounded-full border border-brand-red/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
                      
                      <button
                        type="button"
                        aria-label={`View details for ${hotspot.title}`}
                        onClick={() => setActiveHotspot(current => current === i ? null : i)}
                        onMouseEnter={() => setActiveHotspot(i)}
                        onMouseLeave={() => setActiveHotspot(null)}
                        className="group relative flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none"
                      >
                        <span className="absolute inset-0 rounded-full bg-brand-red/80 blur-[6px] opacity-75 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute inset-2 rounded-full border-2 border-white/80 bg-brand-red shadow-[0_0_20px_rgba(166,25,46,0.9)]" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />
                      </button>

                      <div
                        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${hotspot.y > 50 ? 'bottom-full mb-6' : 'top-full mt-6'} w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-white/15 bg-black/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeHotspot === i ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 scale-90 translate-y-2'}`}
                      >
                        <h4 className="mb-3 text-sm md:text-base font-black uppercase tracking-widest text-brand-red">{hotspot.title}</h4>
                        <p className="text-sm leading-relaxed text-zinc-300 font-light">{hotspot.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Final CTA Scene */}
            {scene.isFinal && (
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-16 bg-black/60 backdrop-blur-xl p-10 md:p-16 rounded-[2.5rem] border border-white/15 text-center flex flex-col items-center shadow-2xl relative z-30 w-full max-w-2xl mx-auto"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">The Blueprint</p>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display italic text-white leading-none drop-shadow-md mb-8">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-6 mb-12">
                  {product.originalPrice && (
                    <span className="text-zinc-500 font-bold tracking-widest line-through text-lg">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl md:text-5xl font-black tracking-widest text-brand-red drop-shadow-[0_0_15px_rgba(166,25,46,0.3)]">
                    {product.price}
                  </span>
                </div>

                <a 
                  href={product.shopeeLink || "https://shopee.co.id/Neighbormind"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-brand-red text-white px-12 py-5 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-[13px] shadow-[0_0_40px_rgba(166,25,46,0.5)] hover:shadow-[0_0_60px_rgba(166,25,46,0.7)] rounded-full w-full md:w-auto transition-shadow duration-500"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    Acquire Piece
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu" />
                </a>
              </motion.div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
