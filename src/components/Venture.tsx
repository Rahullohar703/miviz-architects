import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useState } from 'react';
import { AlertTriangle, Check, Home, Building2, UtensilsCrossed } from 'lucide-react';

const Venture = () => {
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.2 });
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);

  const problems = [
    'Costly mistakes & delays',
    'Coordination issues with multiple contractors',
    'Hidden costs & budget overruns',
  ];

  const advantages = [
    'See Your Space Before It\'s Built (VR walkthroughs)',
    'Turnkey Execution - Single Point Responsibility',
    'Hassle-free, End-to-End Delivery',
  ];

  const clientTypes = [
    {
      icon: Home,
      title: 'Villa & Home Owners',
      description: 'Wellness-focused luxury living with optimal light, ventilation, and vastu compliance.',
    },
    {
      icon: Building2,
      title: 'Business Owners',
      description: 'Offices designed for productivity, workflow optimization, and powerful brand image.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Restaurant & Hospitality',
      description: 'Experiential interiors that optimize customer flow and social media aesthetics.',
    },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute top-8 right-8 w-24 h-24 border border-champagne/5 rotate-45"
        animate={{ rotate: 405 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div 
        className="absolute bottom-16 left-16 w-32 h-32 border border-champagne/5 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      />

      <div ref={ref} className="container-luxury relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="caption mb-4">Why Choose Us</p>
          <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-champagne font-medium max-w-2xl mx-auto leading-relaxed">
            The MIVIZ Difference
          </h2>
        </motion.div>

        {/* Problem vs Solution */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Problem */}
          <motion.div 
            className="p-6 md:p-8 border border-border/50 bg-background/50"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-destructive/30 flex items-center justify-center">
                <AlertTriangle size={20} className="text-destructive/70" strokeWidth={1.5} />
              </div>
              <h3 className="font-playfair text-sm tracking-[0.1em] uppercase text-muted-foreground">
                Traditional Construction
              </h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/50 mt-2 flex-shrink-0" />
                  <span>{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div 
            className="p-6 md:p-8 border border-champagne/30 bg-champagne/5"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-champagne flex items-center justify-center">
                <Check size={20} className="text-champagne" strokeWidth={1.5} />
              </div>
              <h3 className="font-playfair text-sm tracking-[0.1em] uppercase text-champagne">
                The MIVIZ Advantage
              </h3>
            </div>
            <ul className="space-y-4">
              {advantages.map((advantage, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3 text-foreground"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 flex-shrink-0" />
                  <span>{advantage}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Client Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-cormorant text-xl md:text-2xl text-champagne font-medium text-center mb-8">
            Who We Serve
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {clientTypes.map((client, index) => {
              const Icon = client.icon;
              const isHovered = hoveredClient === index;
              
              return (
                <motion.div
                  key={index}
                  className={`p-6 border text-center transition-all duration-300 cursor-pointer ${
                    isHovered ? 'border-champagne bg-champagne/5' : 'border-border/50'
                  }`}
                  onMouseEnter={() => setHoveredClient(index)}
                  onMouseLeave={() => setHoveredClient(null)}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="mb-4 flex justify-center"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isHovered ? 'border-champagne' : 'border-champagne/30'
                    }`}>
                      <Icon 
                        size={22} 
                        strokeWidth={1.5} 
                        className={`transition-colors duration-300 ${isHovered ? 'text-champagne' : 'text-champagne/70'}`}
                      />
                    </div>
                  </motion.div>
                  <h4 className={`font-playfair text-sm tracking-wider uppercase mb-2 transition-colors duration-300 ${
                    isHovered ? 'text-champagne' : 'text-foreground'
                  }`}>
                    {client.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {client.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Venture;
