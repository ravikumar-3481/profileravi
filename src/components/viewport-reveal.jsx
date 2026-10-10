import { motion, useReducedMotion } from 'framer-motion';

export function ViewportReveal({ children, className = '', pop = false, delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className}
    initial={reduced ? false : { opacity: 0, y: pop ? 20 : 28, scale: pop ? .96 : 1 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: .08, margin: '0px 0px -32px 0px' }}
    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 150, damping: 23, mass: .8, delay }}>
    {children}
  </motion.div>;
}