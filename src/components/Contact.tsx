import { motion } from 'motion/react';
import { Instagram, Music2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Contact() {
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
    <motion.section 
      key="contact"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-brand-beige pt-40 pb-20 px-10"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xs font-black uppercase tracking-[0.5em] text-brand-red mb-12">Digital Headquarters</h2>
          <h1 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter mb-20 leading-[0.8] italic">
            Digital <br /> Presence
          </h1>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="whileInView"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
        >
          {[
            { name: 'Instagram', handle: '@Neighbormind', url: 'https://instagram.com/Neighbormind', icon: <Instagram className="w-6 h-6" /> },
            { name: 'TikTok', handle: '@Neighbormindd', url: 'https://tiktok.com/@Neighbormindd', icon: <Music2 className="w-6 h-6" /> },
            { name: 'Shopee', handle: 'Neighbormind', url: 'https://shopee.co.id/Neighbormind', icon: <ShoppingBag className="w-6 h-6" /> }
          ].map((social) => (
            <motion.a 
              key={social.name}
              variants={{
                initial: { opacity: 0, scale: 0.95 },
                whileInView: { opacity: 1, scale: 1 }
              }}
              whileHover={{ y: -10 }}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-zinc-200 p-12 flex flex-col items-center gap-8 hover:border-brand-red transition-all duration-700"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-red scale-0 group-hover:scale-110 transition-transform duration-500 rounded-full blur-xl opacity-20" />
                <div className="relative p-5 bg-stone-50 rounded-full group-hover:bg-brand-red group-hover:text-white transition-all duration-500 border border-zinc-100">
                  {social.icon}
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{social.name}</h3>
                <p className="font-bold text-xl tracking-tight text-brand-dark">{social.handle}</p>
              </div>
              <div className="mt-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-red group-hover:translate-x-2 transition-transform">
                Follow Out <ArrowRight className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="border-y border-zinc-200 py-16"
        >
          <p className="text-zinc-400 font-light text-sm mb-6 uppercase tracking-widest">Business Inquiries</p>
          <a href="mailto:hello@neighbormind.id" className="text-3xl md:text-5xl font-black uppercase tracking-tighter hover:text-brand-red transition-colors relative inline-block group">
            hello@neighbormind.id
            <motion.span className="absolute -bottom-2 left-0 w-0 h-1 bg-brand-red group-hover:w-full transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
