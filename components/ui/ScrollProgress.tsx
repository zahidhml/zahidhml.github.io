'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — fixed top bar showing scroll progress with violet→aquamarine gradient.
 * 3px height with subtle glow.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #7400B8, #6930C3, #5E60CE, #48BFE3, #80FFDB)',
        boxShadow: '0 0 10px rgba(128, 255, 219, 0.5)',
      }}
    />
  );
}
