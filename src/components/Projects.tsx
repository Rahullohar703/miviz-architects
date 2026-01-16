import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import projectVilla from '@/assets/project-villa.jpg';
import projectApartment from '@/assets/project-apartment.jpg';
import projectInterior from '@/assets/project-interior.jpg';

const Projects = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      image: projectVilla,
      title: 'Private Villa',
      type: 'Luxury Villa',
      location: 'Pune',
    },
    {
      image: projectApartment,
      title: 'Heritage Apartment',
      type: 'Residential Interior',
      location: 'Mumbai',
    },
    {
      image: projectInterior,
      title: 'Serene Retreat',
      type: 'Complete Interiors',
      location: 'Pune',
    },
  ];

  return (
    <section id="projects" className="section-padding bg-background">
      <div ref={ref} className="container-luxury">
        <div className={`text-center mb-16 transition-all duration-1000 ease-luxury ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="caption mb-4">Portfolio</p>
          <h2 className="heading-section text-foreground">Selected Projects</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative aspect-[4/5] overflow-hidden cursor-pointer transition-all duration-1000 ease-luxury ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full object-cover transition-all duration-700 ease-luxury ${
                  hoveredIndex === index ? 'scale-105' : 'scale-100'
                }`}
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-primary/60 transition-opacity duration-500 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`} />

              {/* Content */}
              <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-all duration-500 ${
                hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <p className="caption text-champagne mb-2">{project.type}</p>
                <h3 className="font-playfair text-xl tracking-[0.05em] text-primary-foreground mb-1">
                  {project.title}
                </h3>
                <p className="font-cormorant text-primary-foreground/70">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
