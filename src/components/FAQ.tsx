import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useParallax } from '@/hooks/useParallax';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { ref: parallaxRef, offset } = useParallax<HTMLDivElement>({ speed: 0.08 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Do you offer design + supervision only?',
      answer: 'No. We work only in two formats: complete turnkey design & build, or pure design-only. We do not offer supervision without design or partial involvement.',
    },
    {
      question: 'Do you take limited projects each year?',
      answer: 'Yes. To maintain our standards of quality and attention, we intentionally limit the number of projects we undertake annually.',
    },
    {
      question: 'Do you work outside Pune?',
      answer: 'On a case-by-case basis. While our primary focus is Pune and surrounding areas, we consider select projects in other locations based on scope and alignment.',
    },
    {
      question: 'What is your design process timeline?',
      answer: 'The design phase typically spans 8-12 weeks, depending on project complexity. Turnkey execution timelines are determined during the proposal stage.',
    },
    {
      question: 'How do we begin working together?',
      answer: 'Start with an enquiry through our contact form. We will arrange an initial conversation to understand your vision and determine if we are the right fit for your project.',
    },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset * 0.4}px)` }}
      >
        <div className="absolute top-20 right-20 w-40 h-40 border border-champagne/5 rounded-full" />
        <div className="absolute bottom-40 left-10 w-24 h-24 border border-champagne/5" />
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-champagne/10 rounded-full" />
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-champagne/10 rounded-full" />
        
        {/* Subtle gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 70% 30%, hsl(var(--champagne) / 0.03) 0%, transparent 50%)`
          }}
        />
      </div>

      <div ref={ref} className="container-luxury relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ease-luxury ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="caption mb-4">Common Questions</p>
          <h2 className="heading-section text-foreground">FAQ</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className={`border-b transition-all duration-1000 ease-luxury ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isOpen || isHovered ? 'border-champagne/50' : 'border-border/50'}`}
                style={{ transitionDelay: `${100 + index * 80}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className={`font-playfair text-sm md:text-base tracking-[0.05em] transition-all duration-500 ${isOpen || isHovered ? 'text-champagne translate-x-2' : 'text-foreground'}`}>
                    {faq.question}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'border-champagne bg-champagne rotate-180' : isHovered ? 'border-champagne' : 'border-champagne/30'}`}>
                    <ChevronDown 
                      size={16} 
                      strokeWidth={1.5}
                      className={`transition-colors duration-300 ${isOpen ? 'text-background' : 'text-champagne'}`}
                    />
                  </div>
                </button>

                <div 
                  className="overflow-hidden transition-all duration-700 ease-luxury"
                  style={{ 
                    maxHeight: isOpen ? '200px' : '0',
                    opacity: isOpen ? 1 : 0 
                  }}
                >
                  <div className="pb-6 pl-0 md:pl-4">
                    <div className={`w-12 h-px bg-champagne/30 mb-4 transition-all duration-500 origin-left ${isOpen ? 'scale-x-100' : 'scale-x-0'}`} />
                    <p className="font-cormorant text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;