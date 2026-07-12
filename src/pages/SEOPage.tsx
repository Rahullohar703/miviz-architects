import Header from '@/components/Header';
import SEOHead, { SEOHeadProps } from '@/components/seo/SEOHead';
import SEOHero from '@/components/seo/SEOHero';
import SEOArticle from '@/components/seo/SEOArticle';
import SEOContactForm from '@/components/seo/SEOContactForm';
import FeaturedProjects from '@/components/FeaturedProjects';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/Contact';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

export interface SEOPageData {
  slug: string;
  head: SEOHeadProps;
  hero: {
    title: string;
    subtitle: string;
    ctaText?: string;
  };
  content: string;
}

interface SEOPageProps {
  data: SEOPageData;
}

const SEOPage = ({ data }: SEOPageProps) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data.slug]);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead {...data.head} />
      <Header />
      <SEOHero {...data.hero} />
      <SEOArticle content={data.content} />
      <SEOContactForm />
      <FeaturedProjects />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default SEOPage;
