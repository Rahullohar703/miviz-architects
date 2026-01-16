import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useState } from 'react';
import seamlessExperienceInterior from '@/assets/seamless-experience-interior.jpg';
import { ArrowRight } from 'lucide-react';

const SeamlessExperience = () => {
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.2 });
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute top-1/4 left-8 w-16 h-16 border border-champagne/5 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-8 w-24 h-24 border border-champagne/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      <div ref={ref} className="container-luxury relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-champagne font-medium mb-3">
            A Seamless Experience
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            With MIVIZ, transforming your space is as smooth an experience as it gets
          </p>
        </motion.div>

        {/* Image with Gold Left Border */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <div className="flex group">
            {/* Gold Border */}
            <motion.div 
              className="flex-shrink-0"
              animate={{ 
                width: isImageHovered ? 8 : 6,
                backgroundColor: isImageHovered ? 'hsl(var(--champagne))' : 'hsl(var(--champagne) / 0.8)'
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Image Container */}
            <div className="flex-grow aspect-[16/9] overflow-hidden relative">
              {/* Overlay */}
              <motion.div 
                className="absolute inset-0 bg-charcoal/10 z-10"
                animate={{ opacity: isImageHovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.img
                src={seamlessExperienceInterior}
                alt="Seamless interior design experience"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                animate={{ scale: isImageHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Text & CTA */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            While we do the heavy lifting, all you need to do is walk into your brand new space.
          </p>
          
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="btn-luxury group"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              See All Projects
              <motion.span
                animate={{ x: isButtonHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SeamlessExperience;
