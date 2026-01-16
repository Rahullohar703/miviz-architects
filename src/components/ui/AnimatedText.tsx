import { motion } from 'framer-motion';
import { letterReveal, staggerContainerFast } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

// Animate text word by word
export const AnimatedWords = ({ 
  text, 
  className,
  delay = 0,
  once = true 
}: AnimatedTextProps) => {
  const words = text.split(' ');

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: delay }
        }
      }}
      className={cn('inline-flex flex-wrap', className)}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={letterReveal}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Animate text letter by letter
export const AnimatedLetters = ({ 
  text, 
  className,
  delay = 0,
  once = true 
}: AnimatedTextProps) => {
  const letters = text.split('');

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.03, delayChildren: delay }
        }
      }}
      className={cn('inline-flex', className)}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Simple reveal with blur
export const AnimatedReveal = ({ 
  text, 
  className,
  delay = 0,
  once = true 
}: AnimatedTextProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }
      }}
      viewport={{ once, amount: 0.5 }}
      className={cn('inline-block', className)}
    >
      {text}
    </motion.span>
  );
};
