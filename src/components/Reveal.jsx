import { motion } from 'framer-motion';

export default function Reveal({ children, className, delay = 0, y = 36 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function Photo({ src, alt, className, fill = true }) {
  return (
    <motion.div
      className={className}
      style={{ overflow: 'hidden' }}
      initial={{ clipPath: 'inset(10% 8% 10% 8%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: fill ? 1.18 : 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: fill ? '100%' : 'auto',
          objectFit: fill ? 'cover' : 'unset',
          display: 'block',
        }}
      />
    </motion.div>
  );
}
