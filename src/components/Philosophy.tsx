import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useParallax } from '@/hooks/useParallax';
import { useState } from 'react';

const Philosophy = () => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const { ref: parallaxRef, offset } = useParallax<HTMLDivElement>({ speed: 0.12 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const principles = [
    {
      title: 'Timeless Design',
      description: 'Spaces that transcend trends and stand the test of time.',
      icon: '◈'
    },
    {
      title: 'Detail-Driven Thinking',
      description: 'Every element considered, every proportion refined.',
      icon: '◇'
    },
    {
      title: 'Built Exactly as Designed',
      description: 'No compromises between vision and reality.',
      icon: '○'
    },
  ];

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      >
        {/* Geometric patterns */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-champagne/10 rotate-45" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-champagne/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-champagne/5" />
        
        {/* Vertical lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-champagne/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-champagne/10 to-transparent" />
        
        {/* Dots */}
        <div className="absolute top-1/4 right-10 w-2 h-2 bg-champagne/20 rounded-full" />
        <div className="absolute bottom-1/4 left-10 w-3 h-3 bg-champagne/20 rounded-full" />
      </div>

      <div ref={ref} className="container-luxury relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ease-luxury ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="caption text-champagne mb-4">Guiding Principles</p>
          <h2 className="heading-section text-primary-foreground">Our Philosophy</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 max-w-5xl mx-auto">
          {principles.map((principle, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ease-luxury cursor-default ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon with animation */}
                <div className={`relative w-20 h-20 mx-auto mb-6 flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}>
                  <span className={`text-4xl transition-all duration-500 ${isHovered ? 'text-champagne' : 'text-champagne/70'}`}>
                    {principle.icon}
                  </span>
                  
                  {/* Animated rings */}
                  <div className={`absolute inset-0 border rounded-full transition-all duration-700 ${isHovered ? 'border-champagne scale-100 opacity-100' : 'border-champagne/30 scale-90 opacity-50'}`} />
                  <div className={`absolute inset-0 border border-champagne/20 rounded-full transition-all duration-700 delay-100 ${isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`} />
                  {isHovered && (
                    <div className="absolute inset-0 border border-champagne rounded-full animate-ping opacity-20" />
                  )}
                </div>

                {/* Decorative line */}
                <div className={`w-px mx-auto mb-6 transition-all duration-700 origin-top ${isHovered ? 'h-12 bg-champagne' : 'h-8 bg-champagne/50'}`} />
                
                <h3 className={`font-playfair text-lg tracking-[0.05em] mb-4 transition-all duration-500 ${isHovered ? 'text-champagne' : 'text-primary-foreground'}`}>
                  {principle.title}
                </h3>
                
                <p className={`font-cormorant text-lg transition-all duration-500 ${isHovered ? 'text-primary-foreground' : 'text-primary-foreground/70'}`}>
                  {principle.description}
                </p>

                {/* Bottom accent */}
                <div className={`h-px mx-auto mt-6 transition-all duration-500 origin-center ${isHovered ? 'w-16 bg-champagne' : 'w-8 bg-champagne/30'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;