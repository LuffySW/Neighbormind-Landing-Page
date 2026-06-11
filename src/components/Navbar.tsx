import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { PageType, NavLink } from '../types';

interface NavbarProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { name: 'Home', action: () => setActivePage('home'), href: '#' },
    { name: 'The Lineup', action: () => setActivePage('home'), href: '#lineup' },
    { name: 'The Meaning', action: () => setActivePage('home'), href: '#philosophy' },
    { name: 'Contact', action: () => setActivePage('contact'), href: '#' },
  ];

  const handleNavClick = (e: React.MouseEvent, link: NavLink) => {
    if (link.name === 'Contact' || link.name === 'Home') e.preventDefault();
    link.action();
    
    // Handle scrolling if it's an anchor link and we are switching to home page
    if (link.href.startsWith('#') && link.href.length > 1) {
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 800);
    } else if (link.name === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => handleNavClick(e as any, navLinks[0])}
          className="font-black text-2xl text-white tracking-tighter uppercase font-display cursor-pointer flex items-center gap-3"
        >
          <img src="/img/logo/Transparent logo-R (1).webp" alt="Neighbormind Logo" loading="eager" fetchPriority="high" decoding="async" className="h-10 object-contain drop-shadow-md filter brightness-0 invert" />
          <span className="hidden sm:inline-block pt-1">NEIGHBORMIND.</span>
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
              onClick={(e) => handleNavClick(e, link)}
              className={`group relative text-[11px] font-bold uppercase tracking-widest transition-colors transform-gpu ${(activePage === 'home' && link.name === 'Home') || (activePage === 'contact' && link.name === 'Contact')
                  ? 'text-brand-red'
                  : 'text-zinc-400 hover:text-white'
                }`}
            >
              {link.name}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"
                animate={{ width: ((activePage === 'home' && link.name === 'Home') || (activePage === 'contact' && link.name === 'Contact')) ? '100%' : '0%' }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-6 overflow-hidden"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link);
                  setIsMenuOpen(false);
                }}
                className="text-3xl font-black uppercase tracking-widest text-white hover:text-brand-red transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Running Text Promo */}
      <div className="bg-brand-red w-full py-2 flex overflow-hidden border-b border-white/5 shadow-md">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="whitespace-nowrap flex items-center flex-nowrap min-w-max transform-gpu will-change-transform"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] text-white px-6">
              LIMITED SALE UP TO 15% <span className="px-6 opacity-30">✦</span> NEW DROP FOR 7 DEADLY SINS SERIES ALERT! <span className="px-6 opacity-30">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </nav>
  );
}
