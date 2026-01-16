import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useState } from 'react';
import heroImage from '@/assets/hero-luxury-interior.jpg';
import { Eye, KeyRound, Sparkles } from 'lucide-react';

const About = () => {
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.2 });
  const [isImageHovered, setIsImageHovered] = useState(false);

  const advantages = [
    { icon: Eye, text: 'VR walkthroughs to visualize before building' },
    { icon: KeyRound, text: 'Turnkey execution - single-point responsibility' },
    { icon: Sparkles, text: 'Hassle-free, end-to-end delivery' },
  ];

  return (
    <section id="about" className="section-padding bg-background border-t border-border overflow-hidden">
      <div ref={ref} className="container-luxury">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-md group">
              {/* Decorative Frame */}
              <motion.div 
                className="absolute inset-3 border z-20"
                animate={{
                  inset: isImageHovered ? '1rem' : '0.75rem',
                  borderColor: isImageHovered ? 'hsl(var(--champagne))' : 'hsl(var(--champagne) / 0.3)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Corner accents */}
                {[
                  'top-0 left-0 border-t border-l origin-top-left',
                  'top-0 right-0 border-t border-r origin-top-right',
                  'bottom-0 left-0 border-b border-l origin-bottom-left',
                  'bottom-0 right-0 border-b border-r origin-bottom-right'
                ].map((classes, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-4 h-4 border-champagne ${classes}`}
                    animate={{ width: isImageHovered ? 20 : 16, height: isImageHovered ? 20 : 16 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </motion.div>
              
              {/* Image */}
              <motion.img
                src={heroImage}
                alt="About MIVIZ Architects"
                className="w-full h-full object-cover"
                animate={{ scale: isImageHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />

              {/* Gradient Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-charcoal/10 to-transparent"
                animate={{ opacity: isImageHovered ? 0.6 : 0.3 }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating Badge */}
              <motion.div 
                className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: isImageHovered ? 0 : 10, 
                  opacity: isImageHovered ? 1 : 0 
                }}
                transition={{ duration: 0.4 }}
              >
                <span className="font-playfair text-xs tracking-[0.1em] uppercase text-champagne">Est. 2018</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="relative">
            {/* Decorative Line */}
            <motion.div 
              className="absolute -left-3 top-0 w-px h-full bg-gradient-to-b from-champagne via-champagne/50 to-transparent origin-top"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            />
            
            <div className="overflow-hidden pb-1">
              <motion.h2 
                className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-champagne font-medium mb-6"
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                We don't just design spaces — we make them work for you
              </motion.h2>
            </div>

            <div className="space-y-4">
              <motion.p 
                className="text-base md:text-lg text-foreground leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Homes that heal, offices that boost productivity, and restaurants that attract more guests. Every decision, every corner, every detail is built to deliver results, not just beauty.
              </motion.p>

              <motion.p 
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                We take on a select number of clients; we see ourselves as your partners right from the beginning and craft all our projects from scratch.
              </motion.p>

              {/* MIVIZ Advantage */}
              <motion.div 
                className="pt-6 space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="font-playfair text-sm tracking-[0.1em] uppercase text-champagne mb-4">The MIVIZ Advantage</p>
                <div className="space-y-3">
                  {advantages.map((advantage, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3 text-foreground/80"
                      initial={{ x: -20, opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <advantage.icon size={18} className="text-champagne flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm md:text-base">{advantage.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Decorative dots */}
            <motion.div 
              className="absolute -right-4 bottom-0 flex flex-col gap-1.5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[...Array(4)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="w-1 h-1 rounded-full bg-champagne/40"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
