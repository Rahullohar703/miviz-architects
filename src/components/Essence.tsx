import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

const Essence = () => {
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.3 });

  const words = "We are a tech-enabled firm that design and build spaces that actually work for you".split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="essence-section" className="pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10 lg:pb-12 bg-background relative overflow-hidden">
      {/* Simple Decorative Elements - static for performance */}
      <div className="absolute top-16 left-8 w-20 h-20 border border-champagne/10 rounded-full" />
      <div className="absolute bottom-16 right-16 w-14 h-14 border border-champagne/15" />
      
      <div ref={ref} className="container-luxury relative z-10">
        <div className="text-center">
          <motion.h2 
            className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-champagne font-medium leading-relaxed max-w-4xl mx-auto pb-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-[0.25em]"
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          
          {/* Animated underline */}
          <motion.div 
            className="w-20 h-px bg-gradient-to-r from-transparent via-champagne to-transparent mx-auto mt-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      </div>
    </section>
  );
};

export default Essence;
