import { motion } from 'framer-motion';
import { Instagram, Youtube, Mail, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import mivizLogoDark from '@/assets/miviz-logo-dark.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/mivizarchitects', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@mivizarchitects', label: 'YouTube' },
    { icon: Mail, href: 'mailto:reachus.mivizarchitects@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="py-12 md:py-14 bg-background border-t border-champagne/40 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-8 right-16 w-24 h-24 border border-champagne/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute bottom-16 left-8 w-16 h-16 border border-champagne/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container-luxury relative z-10">
        {/* Main Footer Content */}
        <div className="pb-8 border-b border-border">
          {/* Logo & Address */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <motion.div 
                className="mb-8 group cursor-pointer" 
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={mivizLogoDark} 
                  alt="MIVIZ Architects" 
                  className="h-12 w-auto object-contain"
                />
              </motion.div>

              {/* Contact Info */}
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>MIVIZ Architects</p>
                <p>Pune, Maharashtra, India</p>
                <div className="flex items-center gap-2 mt-3">
                  <Mail size={14} className="text-champagne" />
                  <a href="mailto:reachus.mivizarchitects@gmail.com" className="hover:text-champagne transition-colors">
                    reachus.mivizarchitects@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="w-10 h-10 border flex items-center justify-center transition-all duration-300"
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  animate={{
                    borderColor: hoveredSocial === index ? 'hsl(var(--champagne))' : 'hsl(var(--champagne) / 0.5)',
                    backgroundColor: hoveredSocial === index ? 'hsl(var(--champagne))' : 'transparent',
                    scale: hoveredSocial === index ? 1.1 : 1
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon 
                    size={18} 
                    strokeWidth={1.5} 
                    className={`transition-colors duration-300 ${hoveredSocial === index ? 'text-background' : 'text-champagne'}`}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} MIVIZ Architects. All Rights Reserved.
          </p>
          
          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-champagne transition-all duration-300 group"
            whileHover={{ y: -2 }}
          >
            <span className="tracking-wider uppercase">Back to Top</span>
            <motion.div 
              className="w-8 h-8 border border-champagne/50 rounded-full flex items-center justify-center group-hover:border-champagne group-hover:bg-champagne transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUp 
                size={14} 
                strokeWidth={1.5} 
                className="transition-colors duration-300 group-hover:text-background" 
              />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
