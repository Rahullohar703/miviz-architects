import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-architecture.png';
import heroImageMobile from '@/assets/hero-mobile.png';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface SEOHeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  imageAlt?: string;
}

const SEOHero = ({ title, subtitle, ctaText = 'Explore Our Work', imageAlt = 'Modern architecture design by MIVIZ' }: SEOHeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    const form = document.getElementById('seo-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    } else {
      const content = document.getElementById('seo-content');
      if (content) {
        content.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-background pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={isMobile ? heroImageMobile : heroImage}
          alt={imageAlt}
          fetchPriority="high"
          loading="eager"
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="container-luxury relative z-10 h-full flex items-center">
        <div className="max-w-3xl">
          <motion.div 
            className="overflow-hidden"
          >
            <motion.h1 
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {title}
            </motion.h1>
          </motion.div>
          
          <motion.div 
            className="overflow-hidden"
          >
            <motion.p 
              className="font-sans text-base md:text-lg lg:text-xl text-foreground/80 leading-relaxed mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Button 
              onClick={scrollToContent}
              className="bg-champagne text-background hover:bg-champagne/90 rounded-none px-8 py-6 text-sm tracking-widest uppercase"
            >
              {ctaText}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SEOHero;
