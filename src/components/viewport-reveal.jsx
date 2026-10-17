import { motion, useReducedMotion } from 'framer-motion';

export function ViewportReveal({
  children,
  className = '',
  pop = false,
  delay = 0,
  once = false,
  amount = 0.12,
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: pop ? 22 : 32, scale: pop ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount, margin: '0px 0px -40px 0px' }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: 'spring', stiffness: 140, damping: 22, mass: 0.85, delay }
      }
    >
      {children}
    </motion.div>
  );
}