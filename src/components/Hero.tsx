import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '@/assets/hero-architecture.png';
import heroImageMobile from '@/assets/hero-mobile.png';
import mivizVLogo from '@/assets/miviz-v-overlay.png';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Faster animation on mobile (less scrolling needed)
  const scrollMultiplier = isMobile ? 1.8 : 1;
  
  // Direct transforms - image shrinks fully and disappears
  const imageScale = useTransform(scrollYProgress, [0, 0.4 / scrollMultiplier], [1, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.3 / scrollMultiplier, 0.4 / scrollMultiplier], [1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.2 / scrollMultiplier], [0, 24]);
  const padding = useTransform(scrollYProgress, [0, 0.2 / scrollMultiplier], [0, isMobile ? 16 : 32]);
  const textOpacity = useTransform(scrollYProgress, [0.25 / scrollMultiplier, 0.45 / scrollMultiplier], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.25 / scrollMultiplier, 0.45 / scrollMultiplier], [20, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1 / scrollMultiplier], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Shorter scroll distance on mobile
  const scrollHeight = isMobile ? 'h-[130vh]' : 'h-[180vh]';

  return (
    <section id="hero" ref={heroRef} className="relative">
      {/* Spacer to allow scrolling */}
      <div className={scrollHeight}>
        {/* Sticky container */}
        <div className="sticky top-0 h-screen overflow-hidden">
          
          {/* Background Text Layer - Hidden behind image, revealed on scroll */}
          <motion.div 
            className="absolute inset-0 z-0 flex items-center justify-center bg-background px-6 md:px-12 lg:px-20"
            style={{ opacity: textOpacity }}
          >
            <div className="max-w-2xl">
              <motion.div 
                className="overflow-hidden"
                style={{ y: textY }}
              >
                <motion.h1 
                  className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  We are MIVIZ
                </motion.h1>
              </motion.div>
              
              <motion.div 
                className="overflow-hidden"
                style={{ y: textY }}
              >
                <motion.p 
                  className="font-sans text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed text-justify"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Welcome to MIVIZ Architects, a prestigious architectural firm based in Pune, India. We specialize in crafting highly personalized homes where minimalism meets functionality. With a keen eye for detail and a commitment to innovative design, we create residences that reflect the unique visions and lifestyles of our clients.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Foreground Image Layer - Shrinks and disappears on scroll */}
          <motion.div 
            className="absolute inset-0 z-10 will-change-transform pointer-events-none"
            style={{
              padding,
              opacity: imageOpacity,
            }}
          >
            <motion.div 
              className="relative w-full h-full overflow-hidden will-change-transform"
              style={{
                borderRadius,
                scale: imageScale,
              }}
            >
              {/* Image */}
              <img
                src={isMobile ? heroImageMobile : heroImage}
                alt="Modern architecture design by MIVIZ"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className={`w-full h-full object-cover object-center transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              
              {/* Subtle overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20" />
              
              {/* MIVIZ V Logo Overlay - Centered & Bigger */}
              <div 
                className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              >
                <img
                  src={mivizVLogo}
                  alt="MIVIZ"
                  className="w-[50%] sm:w-[45%] md:w-[35%] lg:w-[28%] max-w-[350px] h-auto"
                />
              </div>
              
              {/* Scroll indicator */}
              <motion.div 
                className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20"
                style={{ opacity: scrollIndicatorOpacity }}
              >
                <div 
                  className={`flex flex-col items-center gap-3 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <span className="text-white/70 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-light animate-pulse">
                    Scroll to explore
                  </span>
                  
                  {/* Animated scroll indicator */}
                  <div className="relative w-6 h-10 sm:w-7 sm:h-12 border-2 border-white/40 rounded-full flex justify-center">
                    <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-white/80 rounded-full mt-2 animate-bounce" />
                  </div>
                  {/* Chevron arrows */}
                  <div className="flex flex-col items-center -mt-1 animate-pulse">
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 -mt-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
