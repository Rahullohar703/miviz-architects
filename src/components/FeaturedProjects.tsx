import { motion, AnimatePresence } from 'framer-motion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useState } from 'react';

// Airlie Beach, Australia images
import airlieBeach01 from '@/assets/airlie-beach-01.jpg';
import airlieBeach02 from '@/assets/airlie-beach-02.jpg';
import airlieBeach03 from '@/assets/airlie-beach-03.jpg';
import airlieBeach04 from '@/assets/airlie-beach-04.jpg';
import airlieBeach041 from '@/assets/airlie-beach-04-1.jpg';
import airlieBeach05 from '@/assets/airlie-beach-05.jpg';
import airlieBeach06 from '@/assets/airlie-beach-06.jpg';
import airlieBeach07 from '@/assets/airlie-beach-07.jpg';
import airlieBeach08 from '@/assets/airlie-beach-08.jpg';
import airlieBeach09 from '@/assets/airlie-beach-09.jpg';

// Anandabhavan, Shirur images
import shirur01 from '@/assets/shirur-01.jpg';
import shirur02 from '@/assets/shirur-02.jpg';
import shirur03 from '@/assets/shirur-03.jpg';
import shirur04 from '@/assets/shirur-04.jpg';

// Twin House, Malda images
import malda01 from '@/assets/malda-01.jpg';
import malda02 from '@/assets/malda-02.jpg';
import malda03 from '@/assets/malda-03.jpg';
import malda04 from '@/assets/malda-04.jpg';

// Avantika Villa, Saswad images
import saswad01 from '@/assets/saswad-01.jpg';
import saswad02 from '@/assets/saswad-02.jpg';
import saswad03 from '@/assets/saswad-03.jpg';
import saswad04 from '@/assets/saswad-04.jpg';
import saswad05 from '@/assets/saswad-05.jpg';

// Jambhale House, Jambhulwadi images
import jambhulwadi01 from '@/assets/jambhulwadi-01.png';
import jambhulwadi02 from '@/assets/jambhulwadi-02.png';
import jambhulwadi03 from '@/assets/jambhulwadi-03.png';
import jambhulwadi04 from '@/assets/jambhulwadi-04.png';
import jambhulwadi05 from '@/assets/jambhulwadi-05.png';
import jambhulwadi06 from '@/assets/jambhulwadi-06.png';

// Placement Office DYP images
import dyp01 from '@/assets/dyp-01.jpg';
import dyp02 from '@/assets/dyp-02.jpg';
import dyp03 from '@/assets/dyp-03.jpg';
import dyp04 from '@/assets/dyp-04.jpg';
import dyp05 from '@/assets/dyp-05.jpg';
import dyp06 from '@/assets/dyp-06.jpg';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Project {
  image: string;
  location: string;
  title: string;
  description: string;
  gallery: string[];
}

const FeaturedProjects = () => {
  const { ref, isInView } = useAnimateOnScroll({ amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects: Project[] = [
    {
      image: airlieBeach01,
      location: 'AIRLIE BEACH, AUSTRALIA',
      title: 'Coastal Serenity',
      description: 'A luxurious coastal retreat blending modern architecture with natural beauty.',
      gallery: [airlieBeach01, airlieBeach02, airlieBeach03, airlieBeach04, airlieBeach041, airlieBeach05, airlieBeach06, airlieBeach07, airlieBeach08, airlieBeach09],
    },
    {
      image: shirur01,
      location: 'SHIRUR, MAHARASHTRA',
      title: 'Anandabhavan',
      description: 'A grand residence featuring elegant interiors with dramatic chandelier and refined living spaces.',
      gallery: [shirur01, shirur02, shirur03, shirur04],
    },
    {
      image: malda01,
      location: 'MALDA, WEST BENGAL',
      title: 'Twin House',
      description: 'Contemporary twin villas with seamless indoor-outdoor living and private pools.',
      gallery: [malda01, malda02, malda03, malda04],
    },
    {
      image: saswad01,
      location: 'SASWAD, MAHARASHTRA',
      title: 'Avantika Villa',
      description: 'Bold contemporary architecture with sophisticated interiors and modern living spaces.',
      gallery: [saswad01, saswad02, saswad03, saswad04, saswad05],
    },
    {
      image: jambhulwadi01,
      location: 'JAMBHULWADI, MAHARASHTRA',
      title: 'Jambhale House',
      description: 'Warm, earthy interiors with marble accents and refined contemporary design.',
      gallery: [jambhulwadi01, jambhulwadi02, jambhulwadi03, jambhulwadi04, jambhulwadi05, jambhulwadi06],
    },
    {
      image: dyp01,
      location: 'PUNE, MAHARASHTRA',
      title: 'Placement Office DYP',
      description: 'A contemporary office space featuring flowing LED ceiling designs, parametric wood elements, and sophisticated meeting areas.',
      gallery: [dyp01, dyp02, dyp03, dyp04, dyp05, dyp06],
    },
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="projects" className="section-padding bg-background overflow-hidden">
      <div ref={ref} className="container-luxury">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8 mb-10 md:mb-12">
          <motion.div 
            className="overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-champagne font-medium">
              Featured Projects
            </h2>
          </motion.div>
          
          <motion.div 
            className="lg:max-w-md"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-base md:text-lg text-foreground leading-relaxed mb-2">
              Each project that we undertake has a story to tell - one that is brought to life through our expertise, refined aesthetics, and attention to detail.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              While each project has the inimitable kalaaakaar signature, they are all distinctive in their inception, design, and execution.
            </p>
          </motion.div>

          <motion.button
            onClick={() => scrollToSection('projects')}
            className="btn-luxury self-start whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>See All Projects</span>
          </motion.button>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 md:gap-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleProjectClick(project)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-md mb-4">
                {/* Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-charcoal/15 z-10"
                  animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredIndex === index ? 1.08 : 1 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Hover Reveal Text */}
                <motion.div 
                  className="absolute inset-0 z-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span 
                    className="font-sans text-xs tracking-[0.15em] uppercase text-ivory bg-charcoal/60 px-4 py-2 backdrop-blur-sm"
                    initial={{ y: 10 }}
                    animate={{ y: hoveredIndex === index ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    View Project
                  </motion.span>
                </motion.div>

                {/* Corner Accents */}
                {['top-3 left-3 origin-left origin-top', 'bottom-3 right-3 origin-right origin-bottom'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos}`}>
                    <motion.div 
                      className={`w-6 h-px bg-champagne ${i === 0 ? 'origin-left' : 'origin-right'}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className={`w-px h-6 bg-champagne ${i === 0 ? 'origin-top' : 'origin-bottom'}`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.075 }}
                    />
                  </div>
                ))}
              </div>

              {/* Content */}
              <motion.p 
                className="text-xs tracking-[0.15em] uppercase text-charcoal-light mb-1.5"
                animate={{ x: hoveredIndex === index ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.location}
              </motion.p>
              <motion.h3 
                className="font-cormorant text-xl md:text-2xl text-champagne font-medium"
                animate={{ x: hoveredIndex === index ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>
              
              {/* Animated Underline */}
              <motion.div 
                className="h-px bg-champagne/30 mt-3 origin-left"
                animate={{ 
                  scaleX: hoveredIndex === index ? 1 : 0.5,
                  backgroundColor: hoveredIndex === index ? 'hsl(var(--champagne) / 0.6)' : 'hsl(var(--champagne) / 0.3)'
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Gallery Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] max-h-[90vh] p-0 bg-background border-champagne/20 overflow-hidden">
          <AnimatePresence>
            {selectedProject && (
              <motion.div 
                className="flex flex-col max-h-[90vh]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 md:pb-4 border-b border-champagne/10 flex-shrink-0">
                  <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                    {selectedProject.location}
                  </p>
                  <DialogTitle className="font-cormorant text-lg sm:text-xl md:text-2xl lg:text-3xl text-champagne font-medium">
                    {selectedProject.title}
                  </DialogTitle>
                  <p className="text-xs sm:text-sm md:text-base text-foreground/80 mt-1 sm:mt-2">
                    {selectedProject.description}
                  </p>
                </DialogHeader>
                
                <div className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4 flex-1 overflow-hidden">
                  <Carousel className="w-full h-full">
                    <CarouselContent className="-ml-2 sm:-ml-4">
                      {selectedProject.gallery.map((image, index) => (
                        <CarouselItem key={index} className="pl-2 sm:pl-4">
                          <div className="flex items-center justify-center h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh]">
                            <img
                              src={image}
                              alt={`${selectedProject.title} - Image ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="max-w-full max-h-full w-auto h-auto object-contain rounded-md"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-1 sm:left-1 md:left-2 h-7 w-7 sm:h-8 sm:w-8 bg-background/80 border-champagne/30 text-champagne hover:bg-champagne hover:text-background" />
                    <CarouselNext className="-right-1 sm:right-1 md:right-2 h-7 w-7 sm:h-8 sm:w-8 bg-background/80 border-champagne/30 text-champagne hover:bg-champagne hover:text-background" />
                  </Carousel>
                  
                  {/* Image Indicators */}
                  <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-4">
                    {selectedProject.gallery.map((_, index) => (
                      <div
                        key={index}
                        className="w-4 sm:w-6 md:w-8 h-px bg-champagne/40"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturedProjects;
