"use client";

import { motion } from "framer-motion";

/**
 * FadeInUp - A reusable fade-in and slide-up animation component
 * Useful for hero sections, cards, and content reveals
 */
export function FadeInUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn - A scale and fade animation for cards or images
 */
export function ScaleIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideInLeft - Slide in from the left with fade
 */
export function SlideInLeft({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideInRight - Slide in from the right with fade
 */
export function SlideInRight({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverScale - Scale on hover effect
 */
export function HoverScale({ children, scale = 1.05 }) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      style={{ cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wiggle - A subtle wiggle animation loop
 */
export function Wiggle({ children, duration = 3 }) {
  return (
    <motion.div
      animate={{ rotate: [0, -2, 2, -2, 0] }}
      transition={{ duration, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

/**
 * PulseOpacity - A pulsing opacity effect
 */
export function PulseOpacity({ children, duration = 2 }) {
  return (
    <motion.div
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container for staggered animations of children
 * Example: <AnimationContainer>
 *            <FadeInUp>Item 1</FadeInUp>
 *            <FadeInUp>Item 2</FadeInUp>
 *          </AnimationContainer>
 */
export function AnimationContainer({ children, stagger = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
