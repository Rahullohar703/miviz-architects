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

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
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
