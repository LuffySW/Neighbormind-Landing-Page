import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { PageType, NavLink } from '../types';

interface NavbarProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { name: 'Home', action: () => setActivePage('home'), href: '#' },
    { name: 'Philosophy', action: () => setActivePage('home'), href: '#philosophy' },
    { name: 'The Lineup', action: () => setActivePage('home'), href: '#lineup' },
    { name: 'Contact', action: () => setActivePage('contact'), href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-beige/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActivePage('home')}
          className="font-black text-2xl text-brand-red tracking-tighter uppercase font-display cursor-pointer flex items-center gap-3"
        >
          <img src="/src/img/logo/Transparent logo-R (1).webp" alt="Neighbormind Logo" className="h-10 object-contain drop-shadow-md" />
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
              onClick={(e) => {
                if (link.name === 'Contact' || link.name === 'Home') e.preventDefault();
                link.action();
              }}
              className={`group relative text-[11px] font-bold uppercase tracking-widest transition-colors ${(activePage === 'home' && link.name === 'Home') || (activePage === 'contact' && link.name === 'Contact')
                  ? 'text-brand-red'
                  : 'text-zinc-600 hover:text-brand-dark'
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
          className="md:hidden text-brand-dark p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            className="md:hidden bg-brand-beige border-b border-brand-dark/10 p-6 flex flex-col gap-6 overflow-hidden"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.name === 'Contact' || link.name === 'Home') e.preventDefault();
                  link.action();
                  setIsMenuOpen(false);
                }}
                className="text-3xl font-black uppercase tracking-widest text-brand-dark hover:text-brand-red transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
