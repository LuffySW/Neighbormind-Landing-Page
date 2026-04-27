import { motion } from 'motion/react';
import { Instagram, Music2, ArrowRight, ShoppingBag, Mail } from 'lucide-react';

export default function Contact() {
  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    viewport: { once: true }
  };

  return (
    <motion.section 
      key="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-brand-dark pt-32 pb-20 relative overflow-hidden flex flex-col"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex-1 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-red"></div>
              <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-brand-red">
                Join The Movement
              </h2>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black uppercase tracking-tighter mb-8 leading-[0.85] text-white font-display italic">
              Break The <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-[#ff4d4d]">Rules.</span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl font-light mb-12 max-w-md leading-relaxed">
              Jadilah bagian dari komunitas yang menolak stereotipe. Dapatkan update eksklusif, drop terbaru, dan penawaran rahasia dari Neighbormind.
            </p>

            <a href="mailto:hello@neighbormind.id" className="group inline-flex items-center gap-4 bg-white text-brand-dark px-8 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-red hover:text-white transition-colors duration-500">
              <Mail className="w-4 h-4" />
              Business Inquiries
            </a>
          </motion.div>

          {/* Right Column - Cards */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="whileInView"
            className="flex flex-col gap-4"
          >
            {[
              { name: 'Instagram', desc: 'Visual Archive & Community', handle: '@Neighbormind', url: 'https://instagram.com/Neighbormind', icon: <Instagram className="w-8 h-8" /> },
              { name: 'Shopee', desc: 'Acquire Our Pieces', handle: 'Neighbormind Official', url: 'https://shopee.co.id/Neighbormind', icon: <ShoppingBag className="w-8 h-8" /> },
              { name: 'TikTok', desc: 'Behind The Scenes & Style', handle: '@Neighbormindd', url: 'https://tiktok.com/@Neighbormindd', icon: <Music2 className="w-8 h-8" /> }
            ].map((social) => (
              <motion.a 
                key={social.name}
                variants={{
                  initial: { opacity: 0, x: 30 },
                  whileInView: { opacity: 1, x: 0 }
                }}
                whileHover={{ scale: 1.02, x: -10 }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/5 border border-white/10 p-6 md:p-8 flex items-center justify-between hover:bg-brand-red transition-all duration-500 overflow-hidden transform-gpu will-change-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-red/0 via-white/10 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out transform-gpu will-change-transform" />
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="text-zinc-500 group-hover:text-white transition-colors duration-500">
                    {social.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-widest text-white mb-1 group-hover:text-white">{social.name}</h3>
                    <p className="text-[11px] font-bold tracking-widest text-zinc-500 group-hover:text-white/80">{social.desc}</p>
                  </div>
                </div>
                
                <div className="relative z-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white text-zinc-500 group-hover:text-brand-red transition-all duration-500">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
