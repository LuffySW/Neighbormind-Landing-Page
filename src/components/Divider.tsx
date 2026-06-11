import { motion } from 'motion/react';

export default function Divider({ title }: { title: string }) {
  return (
    <section className="h-[70vh] w-full flex flex-col items-center justify-center bg-brand-dark text-white text-center px-4 relative z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <span className="w-12 h-px bg-brand-red mb-2" />
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-[0.4em] font-display text-white">
          {title}
        </h2>
        <span className="w-12 h-px bg-brand-red mt-2" />
      </motion.div>
    </section>
  );
}
