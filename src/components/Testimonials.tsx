import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

const Testimonials = () => {
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.2 });

  const testimonials = [
    {
      quote: 'I had the pleasure of working with MIVIZ, and I cannot express how impressed and grateful I am for the incredible work they did. From start to finish, the team was attentive, knowledgeable, and creative.',
      author: 'Sneha Singhi',
      location: 'Pune',
    },
    {
      quote: 'MIVIZ understood our vision from the very first meeting. The attention to detail and the seamless execution made the entire journey effortless. Our home feels like a true reflection of who we are.',
      author: 'Sharma Family',
      location: 'Kothrud, Pune',
    },
    {
      quote: 'What sets them apart is their unwavering commitment to quality. Every single element was crafted with intention and care. Three years later, our home still brings us the same sense of calm and beauty.',
      author: 'The Mehtas',
      location: 'Baner, Pune',
    },
    {
      quote: 'Working with MIVIZ Architects was a transformative experience. They turned our outdated apartment into a modern sanctuary while respecting our budget and timeline. Truly exceptional service.',
      author: 'Priya & Rahul Deshmukh',
      location: 'Wakad, Pune',
    },
    {
      quote: 'The team brought fresh ideas we never would have thought of. Their ability to blend functionality with aesthetics is remarkable. Every guest who visits compliments our space.',
      author: 'Anjali Kulkarni',
      location: 'Aundh, Pune',
    },
    {
      quote: 'From the initial consultation to the final reveal, the process was smooth and enjoyable. They listened to our needs and delivered beyond expectations. Highly recommend their services.',
      author: 'Dr. Suresh Patil',
      location: 'Shivajinagar, Pune',
    },
    {
      quote: 'MIVIZ Architects transformed our commercial space into something our clients love. The design perfectly balances professionalism with warmth. Best investment we made for our business.',
      author: 'Vishal Joshi',
      location: 'Hinjewadi, Pune',
    },
    {
      quote: 'Their understanding of space, light, and texture is extraordinary. What impressed me most was their patience in understanding our lifestyle before proposing any design.',
      author: 'Neha & Amit Sawant',
      location: 'Viman Nagar, Pune',
    },
  ];

  // Duplicate for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="section-padding bg-background border-t border-border overflow-hidden">
      <div ref={ref} className="relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16 container-luxury"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-playfair text-xs tracking-[0.3em] text-champagne/70 uppercase mb-3">
            Client Stories
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-foreground font-light">
            Words from Those We've Served
          </h2>
        </motion.div>

        {/* Continuous Marquee - First Row (Left to Right) */}
        <motion.div 
          className="relative mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="marquee-container">
            <div className="marquee-content animate-marquee">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Continuous Marquee - Second Row (Right to Left) */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="marquee-container">
            <div className="marquee-content animate-marquee-reverse">
              {duplicatedTestimonials.slice().reverse().map((testimonial, index) => (
                <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: { quote: string; author: string; location: string } }) => {
  return (
    <motion.div 
      className="flex-shrink-0 w-[320px] md:w-[400px] mx-3 group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-card/30 backdrop-blur-sm border border-border/50 p-6 md:p-8 h-full hover:border-champagne/30 transition-all duration-500">
        {/* Quote mark */}
        <div className="text-champagne/20 text-3xl font-cormorant leading-none mb-4">"</div>
        
        <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6 line-clamp-4">
          {testimonial.quote}
        </p>
        
        <div className="flex items-center gap-3 pt-4 border-t border-border/30">
          <motion.div 
            className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--champagne) / 0.2)' }}
          >
            <span className="font-playfair text-xs text-champagne">
              {testimonial.author.charAt(0)}
            </span>
          </motion.div>
          <div>
            <p className="font-playfair text-xs tracking-wide text-foreground">
              {testimonial.author}
            </p>
            <p className="text-xs text-muted-foreground">
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
