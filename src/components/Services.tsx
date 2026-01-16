import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useParallax } from '@/hooks/useParallax';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Palette, Crown } from 'lucide-react';

const Services = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const { ref: parallaxRef, offset } = useParallax<HTMLDivElement>({ speed: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<'concept' | 'immersive' | 'signature' | null>(null);

  const packages = [
    {
      id: 'concept' as const,
      icon: Compass,
      tagline: 'Architecture Only',
      title: 'Concept & Vision',
      description: 'For clients seeking architectural design expertise without execution.',
      services: [
        'Conceptual design & layouts',
        'Sanction drawings & approvals',
        'Detailed working drawings',
        'Landscape & outdoor design',
        'Material consultation',
      ],
    },
    {
      id: 'immersive' as const,
      icon: Palette,
      tagline: 'Interior Design Only',
      title: 'Immersive Interiors',
      description: 'Pure interior design expertise to transform your existing spaces.',
      services: [
        '3D visualizations',
        'Detailed working drawings & layouts',
        'Material & finish consultation',
        'Furniture recommendations',
        'Fixtures & lighting design',
      ],
    },
    {
      id: 'signature' as const,
      icon: Crown,
      tagline: 'End-to-End',
      title: 'The MIVIZ Signature',
      description: 'Complete turnkey solution from concept to keys in hand.',
      services: [
        'Complete architecture or interior design',
        'Civil construction & premium finishing',
        'Material procurement & consultation',
        'Project management & site supervision',
        'Hassle-free end-to-end delivery',
      ],
      featured: true,
    },
  ];

  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 border border-champagne/5 rounded-full" />
        <div className="absolute bottom-40 right-20 w-60 h-60 border border-champagne/5 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-champagne/10 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-champagne/10 rounded-full" />
      </div>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, hsl(var(--champagne) / 0.05) 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 80%, hsl(var(--champagne) / 0.05) 0%, transparent 50%)`
        }}
      />

      <div ref={ref} className="container-luxury relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ease-luxury ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="caption mb-4">What We Offer</p>
          <h2 className="heading-section text-foreground">Our Packages</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            const isHovered = hoveredCard === pkg.id;
            
            return (
              <motion.div 
                key={pkg.id}
                className={`p-6 md:p-8 border transition-all duration-700 ease-luxury relative ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isHovered ? 'border-champagne bg-champagne/5' : 'border-border/50'} ${
                  pkg.featured ? 'md:-mt-4 md:pb-10' : ''
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(pkg.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -5 }}
              >
                {/* Featured Badge */}
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-champagne px-4 py-1">
                    <span className="text-xs tracking-wider uppercase text-background font-medium">Recommended</span>
                  </div>
                )}

                {/* Icon */}
                <motion.div 
                  className="mb-6 flex justify-center"
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'border-champagne bg-champagne/10' : 'border-champagne/30'
                  }`}>
                    <Icon 
                      size={24} 
                      strokeWidth={1.5} 
                      className={`transition-colors duration-300 ${isHovered ? 'text-champagne' : 'text-champagne/70'}`}
                    />
                  </div>
                </motion.div>

                <div className="text-center mb-6">
                  <p className="caption text-champagne mb-2">{pkg.tagline}</p>
                  <h3 className={`font-playfair text-lg md:text-xl tracking-[0.05em] transition-colors duration-500 ${isHovered ? 'text-champagne' : 'text-foreground'}`}>
                    {pkg.title}
                  </h3>
                </div>

                <p className="font-cormorant text-base text-muted-foreground mb-6 text-center">
                  {pkg.description}
                </p>

                <ul className="space-y-2.5 font-cormorant">
                  {pkg.services.map((service, serviceIndex) => (
                    <li 
                      key={serviceIndex} 
                      className={`flex items-start gap-3 text-foreground/80 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                      style={{ transitionDelay: `${serviceIndex * 30}ms` }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ${isHovered ? 'bg-champagne scale-125' : 'bg-champagne/50'}`} />
                      <span className="text-sm">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p 
          className={`text-center text-sm text-muted-foreground mt-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '600ms' }}
        >
          All packages include personalized consultation and dedicated project manager
        </motion.p>
      </div>
    </section>
  );
};

export default Services;
