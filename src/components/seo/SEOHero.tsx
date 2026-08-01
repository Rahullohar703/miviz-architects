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

          {/* Interactive elegant image container for navigation */}
          <motion.div
            className="w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mb-12 md:mb-16 aspect-[4/3] md:aspect-[21/9] relative border border-border group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={scrollToContent}
          >
            <img 
              src={isMobile ? heroImageMobile : heroImage} 
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            {/* Navigation Overlay CTA */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col items-center justify-end pointer-events-none text-white">
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium mb-3 opacity-90 drop-shadow-md">
                {ctaText}
              </span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-500">
                <ArrowDown size={isMobile ? 16 : 20} className="group-hover:translate-y-1 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SEOHero;
