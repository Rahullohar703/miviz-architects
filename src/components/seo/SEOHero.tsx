import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import heroImage from '@/assets/hero-architecture.png';
import heroImageMobile from '@/assets/hero-mobile.png';

interface SEOHeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  imageAlt?: string; // Kept for prop compatibility
}

const SEOHero = ({ title, subtitle, ctaText = 'Read Article', imageAlt = 'Modern architecture design' }: SEOHeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    const content = document.getElementById('seo-content');
    if (content) {
      const yOffset = -80; 
      const y = content.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <section className="relative w-full bg-background pt-24 pb-12 md:pt-40 md:pb-20 border-b border-border">
      <div className="container-luxury relative z-10 flex flex-col items-center text-center">
        <div className="max-w-5xl w-full mx-auto">
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-champagne font-medium">
              Editorial
            </span>
          </motion.div>

          <motion.div className="overflow-hidden mb-6">
            <motion.h1 
              className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground tracking-tight leading-[1.15]"
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {title}
            </motion.h1>
          </motion.div>
          
          <motion.div className="overflow-hidden mb-10 md:mb-12 flex justify-center">
            <motion.p 
              className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* New elegant image container */}
          <motion.div
            className="w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mb-12 md:mb-16 aspect-[4/3] md:aspect-[21/9] relative border border-border"
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img 
              src={isMobile ? heroImageMobile : heroImage} 
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            <button 
              onClick={scrollToContent}
              className="group flex flex-col items-center gap-2 md:gap-3 text-xs md:text-sm tracking-[0.15em] uppercase text-foreground/60 hover:text-champagne transition-colors duration-300"
            >
              <span>{ctaText}</span>
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-border flex items-center justify-center group-hover:border-champagne group-hover:bg-champagne/5 transition-all duration-300">
                <ArrowDown size={isMobile ? 12 : 14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SEOHero;
