import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import mivizLogoLight from '@/assets/miviz-v-overlay.png';
import mivizLogoDark from '@/assets/miviz-logo-dark.png';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-2 border-b border-border">
        <div className="container-luxury flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-champagne transition-colors duration-300"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
            <span className="font-cormorant text-sm tracking-wider">Back to Home</span>
          </Link>
          <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
            <img 
              src={mivizLogoDark} 
              alt="MIVIZ Architects" 
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-3 md:py-4">
        <div className="container-luxury">
          <h1 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-champagne font-medium text-center mb-4">
            Contact Us
          </h1>
          
          {/* Google Form Embed */}
          <div className="max-w-3xl mx-auto w-full overflow-hidden rounded-lg shadow-sm border border-border/50 pb-24 md:pb-0" style={{ height: '750px' }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSegWQ4xHTVS9L_Z41XHO-xaydkIrEzjD4MBgZyMVcJlJFdKiQ/viewform?embedded=true"
              className="w-full h-full bg-white border-0"
              title="Contact Form"
              allowFullScreen
            >
              Loading…
            </iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;