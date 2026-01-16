import { Variants } from 'framer-motion';

// Use string-based easing for type compatibility
const smoothEase = "easeOut" as const;
const smoothInOut = "easeInOut" as const;

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: smoothEase }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: smoothEase }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: smoothEase }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    }
  }
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase }
  }
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: smoothEase }
};

export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: smoothEase }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: smoothEase }
  }
};

// Card hover animation
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: smoothEase }
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: smoothEase }
  }
};

// Stagger container fast variant
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { 
      staggerChildren: 0.05, 
      delayChildren: 0.1 
    }
  }
};

// Float animation for decorative elements
export const float: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Pulse animation
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};
