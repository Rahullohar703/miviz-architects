import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "404 - Page Not Found | MIVIZ Architects";

    // Inform search engines this is a 404 page to prevent soft 404 indexing
    const robots = document.querySelector('meta[name="robots"]');
    const originalRobots = robots ? robots.getAttribute('content') : null;
    if (robots) {
      robots.setAttribute('content', 'noindex, nofollow');
    } else {
      const newRobots = document.createElement('meta');
      newRobots.setAttribute('name', 'robots');
      newRobots.setAttribute('content', 'noindex, nofollow');
      document.head.appendChild(newRobots);
    }

    // Remove canonical tag so 404 pages never report a canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && document.head.contains(canonical)) {
      document.head.removeChild(canonical);
    }

    return () => {
      const currentRobots = document.querySelector('meta[name="robots"]');
      if (currentRobots && originalRobots) {
        currentRobots.setAttribute('content', originalRobots);
      }
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center container-luxury">
        <p className="text-xs tracking-[0.25em] uppercase text-champagne mb-4">404</p>
        <h1 className="font-playfair text-4xl md:text-5xl tracking-[0.05em] text-foreground mb-6">
          Page Not Found
        </h1>
        <p className="font-cormorant text-lg text-muted-foreground mb-10 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground border border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
