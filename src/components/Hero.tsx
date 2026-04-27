import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center bg-brand-dark overflow-hidden group mt-[114px]">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
      >
        <img 
          src="/src/img/hero/IMG_0514.webp" 
          alt="Neighbormind Premium Streetwear Collection" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          decoding="async"
        />
      </motion.div>
      <div className="relative z-10 text-center px-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-7xl md:text-[140px] font-black text-brand-beige leading-none tracking-tighter uppercase mb-6 drop-shadow-2xl">
            Mind Over <br className="hidden md:block" />
            <motion.span 
              initial={{ color: "#EAE6DD" }}
              animate={{ color: "#A6192E" }}
              transition={{ delay: 1, duration: 1 }}
            >
              Stereotype
            </motion.span>
          </h1>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-stone-300 text-lg md:text-2xl font-light tracking-widest mb-12 max-w-2xl mx-auto uppercase"
        >
          Bebaskan dirimu dari ekspektasi sosial.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a 
            href="#lineup" 
            className="group relative inline-flex justify-center items-center overflow-hidden bg-brand-red text-brand-beige px-12 py-5 font-bold uppercase tracking-widest text-sm min-w-[240px] border border-transparent"
          >
            <span className="relative z-10">Explore Collection</span>
            <motion.div 
              className="absolute inset-0 bg-brand-dark"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            />
          </a>
          <a 
            href="https://shopee.co.id/Neighbormind" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex justify-center items-center overflow-hidden bg-[#EE4D2D] text-white px-12 py-5 font-bold uppercase tracking-widest text-sm min-w-[240px] shadow-lg shadow-[#EE4D2D]/20 hover:shadow-[#EE4D2D]/40 transition-shadow"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Shop on Shopee
            </span>
            <motion.div 
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0 }}
              whileHover={{ scale: 2 }}
              transition={{ duration: 0.4 }}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
