import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Animated counter component
const AnimatedCounter = ({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>{count}{suffix}</span>
  );
};

const ContactSection = () => {
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contact" className="section-padding bg-background border-t border-border relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--champagne)) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div ref={ref} className="container-luxury relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Left Content */}
          <div className="md:max-w-lg">
            <motion.h2 
              className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-champagne font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Ready to build a space that works for you?
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg text-muted-foreground mb-1.5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Fill the inquiry form and our team connects within 24 hours.
            </motion.p>
            
            <motion.p 
              className="text-base md:text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Let's discuss your vision and bring it to life.
            </motion.p>

            {/* 4-Step Client Journey */}
            <motion.div 
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {[
                { step: '01', title: 'Inquiry', description: 'Fill form, we connect in 24hrs' },
                { step: '02', title: 'Discussion', description: 'Project call & site visit' },
                { step: '03', title: 'Proposal', description: 'Conceptual plan & quote' },
                { step: '04', title: 'Onboard', description: 'Begin your journey' }
              ].map((item, index) => (
                <motion.div 
                  key={item.step}
                  className="group cursor-default p-3 border border-border/50 rounded-lg hover:border-champagne/30 transition-colors duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -2 }}
                >
                  <div className="font-cormorant text-champagne/60 text-sm mb-1">{item.step}</div>
                  <div className="font-cormorant text-champagne text-lg mb-0.5">{item.title}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{item.description}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div 
              className="mt-6 flex gap-8 md:gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {[
                { value: 50, suffix: '+', label: 'Projects' },
                { value: 7, suffix: '+', label: 'Years' },
                { value: 100, suffix: '%', label: 'Satisfaction' }
              ].map((stat) => (
                <motion.div 
                  key={stat.label}
                  className="group cursor-default"
                  whileHover={{ y: -2 }}
                >
                  <div className="font-playfair text-2xl text-champagne mb-0.5">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wider uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right CTA */}
          <motion.div 
            className="md:border-l md:border-champagne/30 md:pl-8 lg:pl-10"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link to="/contact">
              <motion.div
                className="btn-luxury group relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Get Started
                  <motion.span
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </motion.span>
                </span>
              </motion.div>
            </Link>

            {/* Decorative Corner */}
            <div className="hidden md:block mt-6 relative">
              <motion.div 
                className="w-10 h-px bg-champagne/40 origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <motion.div 
                className="w-px h-10 bg-champagne/40 origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
