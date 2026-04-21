import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0, direction = 'up', distance = 40, duration = 0.8 }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
      scale: 0.98, // Very subtle scale
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.33, 1, 0.68, 1], // Smoother easeOutQuart
      },
    },

  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
