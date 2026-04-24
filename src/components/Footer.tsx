import { PageType } from '../types';

interface FooterProps {
  setActivePage: (page: PageType) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="bg-brand-dark text-stone-400 py-20 px-10 border-t border-zinc-900 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <button 
            onClick={() => setActivePage('home')}
            className="font-black text-brand-red tracking-tighter uppercase text-3xl font-display cursor-pointer hover:scale-105 transition-transform flex items-center gap-4"
          >
            <img src="/src/img/logo/Transparent logo-R (1).webp" alt="Neighbormind Logo" className="h-12 object-contain" />
            <span className="hidden sm:inline-block">NEIGHBORMIND.</span>
          </button>
          <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-700">
            © {new Date().getFullYear()} REBELS OF SOCIETY
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
          <a href="https://instagram.com/Neighbormind" target="_blank" rel="noopener noreferrer" className="hover:text-brand-beige hover:-translate-y-1 transition-all">Instagram</a>
          <a href="https://tiktok.com/@Neighbormindd" target="_blank" rel="noopener noreferrer" className="hover:text-brand-beige hover:-translate-y-1 transition-all">TikTok</a>
          <button onClick={() => setActivePage('contact')} className="hover:text-brand-beige hover:-translate-y-1 transition-all uppercase">Support</button>
          <button onClick={() => setActivePage('contact')} className="hover:text-brand-beige hover:-translate-y-1 transition-all uppercase">Contact</button>
        </div>
      </div>
    </footer>
  );
}
