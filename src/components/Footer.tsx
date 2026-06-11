import { PageType } from '../types';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: PageType) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="bg-brand-dark text-stone-400 pt-24 pb-12 px-6 md:px-10 border-t border-zinc-800 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <button 
              onClick={() => { setActivePage('home'); window.scrollTo(0,0); }}
              className="font-black text-brand-red tracking-tighter uppercase text-4xl font-display cursor-pointer hover:scale-[1.02] transition-transform flex items-center gap-4 mb-8"
            >
              <img src="/img/logo/Transparent logo-R (1).webp" alt="Neighbormind Logo" loading="lazy" decoding="async" className="h-16 object-contain filter brightness-0 invert opacity-100" />
              <span>NEIGHBORMIND.</span>
            </button>
            <p className="text-sm font-light leading-relaxed max-w-sm mb-8 text-zinc-400">
              Mendekonstruksi gagasan bahwa ekspektasi orang lain adalah kurungan. Jadikan setiap pakaianmu sebagai kanvas ekspresi diri dan bentuk perlawanan elegan.
            </p>
          </div>

          {/* Links Col */}
          <div className="md:col-span-3 flex flex-col gap-6 md:pl-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-2">Navigation</h4>
            <button onClick={() => { setActivePage('home'); window.scrollTo(0,0); }} className="text-[11px] uppercase tracking-widest text-zinc-300 hover:text-brand-red transition-colors text-left w-fit">Home</button>
            <a href="#lineup" onClick={() => setActivePage('home')} className="text-[11px] uppercase tracking-widest text-zinc-300 hover:text-brand-red transition-colors text-left w-fit">The Lineup</a>
            <a href="#philosophy" onClick={() => setActivePage('home')} className="text-[11px] uppercase tracking-widest text-zinc-300 hover:text-brand-red transition-colors text-left w-fit">The Meaning</a>
            <button onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }} className="text-[11px] uppercase tracking-widest text-zinc-300 hover:text-brand-red transition-colors text-left w-fit">Contact Us</button>
          </div>

          {/* Socials Col */}
          <div className="md:col-span-4 flex flex-col gap-6 border-t md:border-t-0 border-white/10 pt-8 md:pt-0">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-2">Connect</h4>
            <a href="https://instagram.com/Neighbormind" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest text-zinc-300 hover:text-brand-red transition-colors flex items-center justify-between group border-b border-white/10 pb-4">
              Instagram <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform opacity-70 group-hover:opacity-100" />
            </a>
            <a href="https://tiktok.com/@Neighbormindd" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest text-zinc-300 hover:text-brand-red transition-colors flex items-center justify-between group border-b border-white/10 pb-4">
              TikTok <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform opacity-70 group-hover:opacity-100" />
            </a>
            <a href="https://shopee.co.id/Neighbormind" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest text-zinc-300 hover:text-brand-red transition-colors flex items-center justify-between group pb-4">
              Shopee Store <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform opacity-70 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            © {new Date().getFullYear()} #MINDOVERSTEREOTYPES.
          </span>
          <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Huge Background Watermark */}
      <div className="absolute -bottom-10 md:-bottom-24 left-1/2 -translate-x-1/2 text-[20vw] md:text-[15vw] font-black uppercase tracking-tighter text-white/5 pointer-events-none whitespace-nowrap font-display">
        NEIGHBORMIND
      </div>
    </footer>
  );
}
