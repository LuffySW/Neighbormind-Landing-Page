import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center bg-brand-dark overflow-hidden group mt-[114px]">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000 transform-gpu"
      >
        <img 
          src="/img/hero/IMG_0514.webp" 
          alt="Neighbormind Premium Streetwear Collection" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="relative z-10 text-center px-4 sm:px-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[12vw] sm:text-7xl md:text-[120px] lg:text-[140px] font-black text-brand-beige leading-[1.1] tracking-tighter uppercase mb-6 drop-shadow-2xl">
            Mind Over <br />
            <motion.span 
              initial={{ color: "#EAE6DD" }}
              animate={{ color: "#A6192E" }}
              transition={{ delay: 1, duration: 1 }}
            >
              Stereotypes
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
            className="group relative inline-flex justify-center items-center overflow-hidden bg-brand-red text-brand-beige px-12 py-5 font-bold uppercase tracking-widest text-sm min-w-[240px] border border-transparent hover:shadow-[0_0_30px_rgba(166,25,46,0.4)] transition-shadow duration-300"
          >
            <span className="relative z-10 group-hover:text-white transition-colors">The Lineup</span>
            <div 
              className="absolute inset-0 bg-brand-dark -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out will-change-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
