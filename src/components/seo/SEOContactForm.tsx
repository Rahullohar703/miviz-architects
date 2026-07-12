import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

const SEOContactForm = () => {
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.2 });

  return (
    <section id="seo-form" className="py-16 md:py-24 bg-background border-t border-border">
      <div ref={ref} className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-champagne font-medium text-center mb-8">
            Get in Touch
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ready to start your project? Fill out the form below and our team will get back to you within 24 hours.
          </p>
          
          {/* Google Form Embed */}
          <div className="max-w-3xl mx-auto overflow-auto -webkit-overflow-scrolling-touch" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="relative w-full" style={{ paddingBottom: '200%' }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSegWQ4xHTVS9L_Z41XHO-xaydkIrEzjD4MBgZyMVcJlJFdKiQ/viewform?embedded=true"
                className="absolute inset-0 w-full h-full rounded-lg border border-border/50 bg-white"
                title="Contact Form"
                allowFullScreen
              >
                Loading…
              </iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SEOContactForm;
