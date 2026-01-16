import { useEffect, useState, useRef, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

export const useParallax = <T extends HTMLElement>(
  options: ParallaxOptions = {}
): { ref: RefObject<T>; offset: number; progress: number } => {
  const { speed = 0.3, direction = 'up', disabled = false } = options;
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate how far through the viewport the element is
      const elementCenter = rect.top + elementHeight / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      // Progress: 0 when entering, 0.5 when centered, 1 when leaving
      const rawProgress = (windowHeight - rect.top) / (windowHeight + elementHeight);
      setProgress(Math.max(0, Math.min(1, rawProgress)));

      // Calculate parallax offset
      const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? -1 : 1);
      setOffset(parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, disabled]);

  return { ref, offset, progress };
};

// Hook for background parallax with slower movement
export const useBackgroundParallax = (speed: number = 0.15) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return scrollY;
};

// Hook for element visibility with intersection observer
export const useInViewParallax = <T extends HTMLElement>(
  options: ParallaxOptions = {}
): { ref: RefObject<T>; offset: number; isInView: boolean } => {
  const { speed = 0.2 } = options;
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    const handleScroll = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return { ref, offset, isInView };
};