import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import mivizLogoLight from '@/assets/miviz-v-overlay.png';
import mivizLogoDark from '@/assets/miviz-logo-dark.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero', isRoute: false },
    { label: 'About', id: 'about', isRoute: false },
    { label: 'Projects', id: 'projects', isRoute: false },
    { label: 'Contact', id: '/contact', isRoute: true },
  ];

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Pill-shaped navbar */}
      <motion.nav 
        className={`flex items-center justify-between md:justify-start gap-1 px-3 md:px-2 py-2 rounded-2xl md:rounded-full w-full md:w-auto transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-xl shadow-lg border border-border/50' 
            : 'bg-white/10 backdrop-blur-md border border-white/20'
        }`}
        layout
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="p-1 rounded-full transition-all duration-300 hover:scale-105"
        >
          <motion.img 
            src={isScrolled ? mivizLogoDark : mivizLogoLight} 
            alt="MIVIZ Architects" 
            className="h-8 w-auto object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={isScrolled ? 'dark' : 'light'}
          />
        </button>

        {/* Divider */}
        <div className={`hidden md:block w-px h-5 transition-colors duration-300 ${isScrolled ? 'bg-border' : 'bg-white/30'}`} />

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              {item.isRoute ? (
                <Link
                  to={item.id}
                  onClick={() => window.scrollTo(0, 0)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative px-4 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                    isScrolled 
                      ? `text-foreground/70 hover:text-foreground` 
                      : `text-white/80 hover:text-white`
                  }`}
                >
                  {item.label}
                  {hoveredNav === item.id && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${isScrolled ? 'bg-muted' : 'bg-white/10'}`}
                      layoutId="navHover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative px-4 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                    isScrolled 
                      ? `text-foreground/70 hover:text-foreground` 
                      : `text-white/80 hover:text-white`
                  }`}
                >
                  {item.label}
                  {hoveredNav === item.id && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${isScrolled ? 'bg-muted' : 'bg-white/10'}`}
                      layoutId="navHover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-full transition-all duration-300 ${
            isScrolled 
              ? 'text-foreground hover:bg-muted' 
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-4 h-4">
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0, opacity: isMobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Menu size={16} strokeWidth={1.5} />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 0 : -90, opacity: isMobileMenuOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <X size={16} strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-20 left-4 right-4 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <nav className="p-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  {item.isRoute ? (
                    <Link
                      to={item.id}
                      onClick={() => { setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}
                      className="block px-4 py-3 rounded-xl text-[11px] tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="w-full px-4 py-3 rounded-xl text-left text-[11px] tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
