import { motion } from 'framer-motion';

interface SEOArticleProps {
  content: string;
}

const SEOArticle = ({ content }: SEOArticleProps) => {
  return (
    <section id="seo-content" className="section-padding bg-background border-t border-border">
      <div className="container-luxury">
        <motion.div 
          className="max-w-3xl mx-auto prose prose-stone lg:prose-lg 
                     prose-headings:font-cormorant prose-headings:font-medium prose-headings:text-foreground
                     prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:text-champagne
                     prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                     prose-p:text-foreground/90 prose-p:leading-relaxed
                     prose-a:text-champagne hover:prose-a:text-champagne/80 prose-a:underline prose-a:underline-offset-4 decoration-champagne/30 hover:decoration-champagne
                     prose-li:text-foreground/90 prose-ul:list-disc
                     prose-strong:text-foreground prose-strong:font-medium
                     prose-blockquote:border-l-champagne prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:font-cormorant prose-blockquote:text-xl prose-blockquote:text-foreground/80 prose-blockquote:italic"
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
