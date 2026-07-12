import { motion } from 'framer-motion';

interface SEOArticleProps {
  content: string;
}

const SEOArticle = ({ content }: SEOArticleProps) => {
  return (
    <section id="seo-content" className="section-padding bg-background border-t border-border">
      <div className="container-luxury">
        <motion.div 
          className="max-w-4xl mx-auto prose prose-stone lg:prose-lg 
                     prose-headings:font-playfair prose-headings:font-medium prose-headings:text-foreground
                     prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-champagne
                     prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                     prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-justify
                     prose-a:text-champagne hover:prose-a:text-champagne/80
                     prose-li:text-muted-foreground prose-ul:list-disc
                     prose-strong:text-foreground prose-strong:font-medium"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default SEOArticle;
