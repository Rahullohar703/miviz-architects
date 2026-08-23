import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const SEOContactPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenContactPopup');

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenContactPopup', 'true');
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-border/50 bg-background/95 backdrop-blur-md">
        <div className="p-6 md:p-8 bg-black/40">
          <DialogHeader className="mb-6 text-center sm:text-center">
            <DialogTitle className="font-cormorant text-3xl text-champagne font-medium">
              Let's Discuss Your Project
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Fill out the form below and our team will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>

          {/* Google Form Embed */}
          <div className="w-full overflow-hidden" style={{ height: '400px' }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSegWQ4xHTVS9L_Z41XHO-xaydkIrEzjD4MBgZyMVcJlJFdKiQ/viewform?embedded=true"
              className="w-full h-full rounded-md border border-border/20 bg-white"
              title="Contact Form Popup"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SEOContactPopup;
