import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseAnimateOnScrollOptions {
  amount?: number;
  once?: boolean;
}

export const useAnimateOnScroll = (options: UseAnimateOnScrollOptions = {}) => {
  const { amount = 0.3, once = true } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  
  return { ref, isInView };
};
