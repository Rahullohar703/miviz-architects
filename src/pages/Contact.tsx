import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import mivizLogoDark from '@/assets/miviz-logo-dark.png';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-champagne/30 selection:text-foreground">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Column: Branding & Contact Info (Sticky on Desktop) */}
        <div className="w-full lg:w-5/12 xl:w-1/2 relative bg-background border-r border-border p-6 md:p-10 lg:p-16 flex flex-col justify-between">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
            <div className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--champagne)) 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }}
            />
          </div>

          <div className="relative z-10">
            {/* Header / Nav */}
            <div className="flex items-center justify-between mb-16 md:mb-24">
              <Link 
                to="/" 
                className="group flex items-center gap-3 text-muted-foreground hover:text-champagne transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-champagne/50 group-hover:bg-champagne/5 transition-all">
                  <ArrowLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-cormorant text-sm tracking-[0.2em] uppercase font-medium">Return Home</span>
              </Link>
              <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
                <img 
                  src={mivizLogoDark} 
                  alt="MIVIZ Architects" 
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-champagne font-medium leading-[1.1] mb-6">
                Let's Build Something <br className="hidden md:block" />
                <span className="italic">Extraordinary.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed mb-12">
                Whether you're envisioning a luxury villa or a cutting-edge commercial space, our team is ready to bring your vision to life.
              </p>
            </motion.div>

            {/* Contact Details Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Phone */}
              <div className="group">
                <div className="flex items-center gap-3 text-champagne mb-3">
                  <Phone size={20} strokeWidth={1.5} />
                  <h3 className="font-cormorant text-xl font-medium tracking-wide">Phone</h3>
                </div>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  <a href="tel:+918888059434" className="hover:text-champagne transition-colors">
                    +91 88880 59434
                  </a>
                </p>
              </div>

              {/* Email */}
              <div className="group">
                <div className="flex items-center gap-3 text-champagne mb-3">
                  <Mail size={20} strokeWidth={1.5} />
                  <h3 className="font-cormorant text-xl font-medium tracking-wide">Email</h3>
                </div>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  <a href="mailto:info@mivizarchitects.in" className="hover:text-champagne transition-colors">
                    info@mivizarchitects.in
                  </a>
                </p>
              </div>

              {/* Office */}
              <div className="group sm:col-span-2">
                <div className="flex items-center gap-3 text-champagne mb-3">
                  <MapPin size={20} strokeWidth={1.5} />
                  <h3 className="font-cormorant text-xl font-medium tracking-wide">Office</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-sm group-hover:text-foreground transition-colors">
                  Office No. 401, 4th Floor, Platinum Square, Viman Nagar, Pune, Maharashtra 411014
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer of Left Column */}
          <motion.div 
            className="mt-16 md:mt-24 pt-8 border-t border-border/50 text-sm text-muted-foreground flex items-center justify-between relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span>&copy; {new Date().getFullYear()} MIVIZ Architects</span>
            <span className="flex items-center gap-2">
              <Clock size={14} /> Mon-Sat: 10am - 7pm
            </span>
          </motion.div>
        </div>

        {/* Right Column: The Form */}
        <div className="w-full lg:w-7/12 xl:w-1/2 bg-[hsl(var(--charcoal))] relative flex items-center justify-center p-6 md:p-10 lg:p-16 min-h-[100vh]">
          {/* Decorative Glow */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-champagne/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-champagne/5 rounded-full blur-[100px] pointer-events-none" />
          
          <motion.div 
            className="w-full max-w-2xl relative z-10"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Glassmorphism Card */}
            <div className="bg-background/95 backdrop-blur-xl border border-border/30 rounded-2xl p-2 md:p-4 shadow-2xl shadow-black/20 overflow-hidden">
              <div className="w-full overflow-hidden rounded-xl">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSegWQ4xHTVS9L_Z41XHO-xaydkIrEzjD4MBgZyMVcJlJFdKiQ/viewform?embedded=true"
                  className="w-full h-[1300px] md:h-[900px] bg-white border-0"
                  title="Contact Form"
                  allowFullScreen
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Contact;