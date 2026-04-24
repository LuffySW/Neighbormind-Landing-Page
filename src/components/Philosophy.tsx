import { motion } from 'motion/react';

export default function Philosophy() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="philosophy" className="md:col-span-12 lg:col-span-4 p-10 md:p-20 border-b lg:border-b-0 lg:border-r border-zinc-200 flex flex-col justify-center bg-stone-50">
      <motion.div {...fadeIn}>
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-brand-red mb-10">
          The Meaning
        </h2>
        <p className="text-2xl md:text-3xl leading-tight text-zinc-900 font-serif italic mb-10">
          "Neighbormind lahir dari perpaduan kata &quot;neighbor&quot; dan &quot;mind&quot;. Kami mendekonstruksi gagasan bahwa ekspektasi orang lain adalah kurungan dari sebuah stereotipe. </p>
          
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-brand-red w-24 mb-10 origin-left"
        />
        <p className="text-[15px] leading-relaxed text-zinc-500 font-light max-w-sm">
          Kami hadir untuk mereka yang berani mengacuhkan norma yang ada. Jadikan setiap pakaianmu sebagai kanvas ekspresi diri dan bentuk perlawanan yang elegan.
        </p>
      </motion.div>
    </section>
  );
}
