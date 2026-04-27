import { motion } from 'motion/react';

export default function Philosophy() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="philosophy" className="w-full relative bg-brand-dark text-brand-beige py-32 px-10 md:px-20 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Decorative noise/texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      {/* Abstract shape */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <motion.div {...fadeIn} className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px bg-brand-red"></div>
          <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-brand-red">
            The Meaning
          </h2>
          <div className="w-12 h-px bg-brand-red"></div>
        </div>

        <p className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] md:leading-[1.1] text-white font-display font-black uppercase tracking-tighter mb-12">
          "Neighbormind lahir dari <span className="text-brand-red italic">perpaduan</span> kata neighbor dan mind."
        </p>
          
        <p className="text-lg md:text-xl leading-relaxed text-zinc-400 font-serif italic mb-16 max-w-2xl">
          Kami mendekonstruksi gagasan bahwa ekspektasi orang lain adalah kurungan dari sebuah stereotipe.
        </p>

        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          className="w-px bg-zinc-800 h-24 mb-16 origin-top"
        />

        <p className="text-[13px] md:text-[15px] leading-loose text-zinc-500 font-light max-w-xl tracking-wide uppercase">
          Kami hadir untuk mereka yang berani mengacuhkan norma yang ada. Jadikan setiap pakaianmu sebagai <span className="text-brand-beige font-bold">kanvas ekspresi diri</span> dan bentuk perlawanan yang elegan.
        </p>
      </motion.div>
    </section>
  );
}
