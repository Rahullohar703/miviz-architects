import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useState } from 'react';
import { Eye, FileText, Hammer, KeyRound } from 'lucide-react';

const Process = () => {
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.1 });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    { 
      number: '01', 
      icon: Eye,
      title: 'Concept & Visualization', 
      description: 'VR walkthrough and detailed consultation to help you see your space before it\'s built.' 
    },
    { 
      number: '02', 
      icon: FileText,
      title: 'Detailed Planning', 
      description: 'Finalized drawings, material selection, and a complete project roadmap for execution.' 
    },
    { 
      number: '03', 
      icon: Hammer,
      title: 'Execution & Craftsmanship', 
      description: 'Dedicated team, regular updates, and premium quality construction from start to finish.' 
    },
    { 
      number: '04', 
      icon: KeyRound,
      title: 'Handover & Completion', 
      description: 'Final walkthrough, maintenance guidelines, and warranties for your peace of mind.' 
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="section-padding bg-background overflow-hidden relative">
      {/* Background Elements - static for performance */}
      <div className="absolute top-16 left-1/4 w-48 h-48 border border-champagne/5 rounded-full" />
      <div className="absolute bottom-16 right-1/4 w-32 h-32 border border-champagne/5 rounded-full" />

      <div ref={ref} className="container-luxury relative z-10">
        {/* Stats */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p 
            className="font-cormorant text-xl md:text-2xl lg:text-3xl text-champagne font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Over <span className="font-playfair tracking-wider">50,000</span> sq ft of premium residential spaces in execution across India
          </motion.p>
          
          {/* Animated Line */}
          <motion.div 
            className="w-32 h-px bg-champagne/60 mx-auto mt-6 origin-center"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>

        {/* Section Header */}
        <motion.div 
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-cormorant text-2xl md:text-3xl text-champagne font-medium">
            Our Process
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <motion.div 
            className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-champagne/20 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredStep === index;
              
              return (
                <motion.div
                  key={step.number}
                  className="text-center cursor-pointer"
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  whileHover={{ y: -5 }}
                >
                  {/* Icon with Ring */}
                  <div className="flex justify-center mb-5 relative">
                    {/* Outer Ring */}
                    <motion.div 
                      className="absolute inset-0 w-14 h-14 md:w-16 md:h-16 m-auto border rounded-full"
                      animate={{ 
                        scale: isHovered ? 1.15 : 1,
                        borderColor: isHovered ? 'hsl(var(--champagne))' : 'hsl(var(--champagne) / 0.3)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Ping effect on hover */}
                    {isHovered && (
                      <motion.div 
                        className="absolute inset-0 w-14 h-14 md:w-16 md:h-16 m-auto border border-champagne rounded-full"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Icon */}
                    <motion.div 
                      className="relative z-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center"
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon 
                        size={28} 
                        strokeWidth={1} 
                        className={`transition-colors duration-300 ${isHovered ? 'text-champagne' : 'text-champagne/70'}`}
                      />
                    </motion.div>
                  </div>

                  {/* Number & Title */}
                  <div className="flex items-center gap-2 justify-center mb-3">
                    <motion.span 
                      className="w-6 h-6 rounded-full border flex items-center justify-center text-xs"
                      animate={{
                        borderColor: isHovered ? 'hsl(var(--champagne))' : 'hsl(var(--champagne) / 0.5)',
                        backgroundColor: isHovered ? 'hsl(var(--champagne))' : 'transparent',
                        color: isHovered ? 'hsl(var(--ivory))' : 'hsl(var(--champagne))'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.number}
                    </motion.span>
                    <h3 className={`font-playfair text-xs tracking-[0.08em] uppercase transition-colors duration-300 ${isHovered ? 'text-champagne' : 'text-champagne/80'}`}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${isHovered ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Line */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div 
            className="w-full h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent origin-center"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
