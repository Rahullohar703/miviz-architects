import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Essence from '@/components/Essence';
import FeaturedProjects from '@/components/FeaturedProjects';
import About from '@/components/About';
import Venture from '@/components/Venture';
import Process from '@/components/Process';
import SeamlessExperience from '@/components/SeamlessExperience';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/Contact';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    document.title = "MIVIZ Architects | Tech-Enabled Architecture & Interior Design in Pune";
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://mivizarchitects.in/');
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <h1 className="sr-only">MIVIZ Architects: Premium Architecture and Interior Design Firm in Pune</h1>
      <Header />
      <Hero />
      <Essence />
      <FeaturedProjects />
      <About />
      <Venture />
      <Process />
      <SeamlessExperience />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
