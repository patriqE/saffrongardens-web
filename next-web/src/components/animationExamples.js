/**
 * Animation examples and usage guide
 * Copy code snippets from here to use in your components
 */

/**
 * Example 1: Hero Section with Staggered Animations
 *
 * import { motion } from 'framer-motion';
 *
 * export default function HeroSection() {
 *   const containerVariants = {
 *     hidden: { opacity: 0 },
 *     visible: {
 *       opacity: 1,
 *       transition: {
 *         staggerChildren: 0.2,
 *       },
 *     },
 *   };
 *
 *   const itemVariants = {
 *     hidden: { opacity: 0, y: 20 },
 *     visible: { opacity: 1, y: 0 },
 *   };
 *
 *   return (
 *     <motion.div
 *       initial="hidden"
 *       animate="visible"
 *       variants={containerVariants}
 *     >
 *       <motion.h1 variants={itemVariants}>
 *         Welcome to Saffron Gardens
 *       </motion.h1>
 *       <motion.p variants={itemVariants}>
 *         Elegant event spaces for your perfect celebration
 *       </motion.p>
 *       <motion.button variants={itemVariants}>
 *         Book Now
 *       </motion.button>
 *     </motion.div>
 *   );
 * }
 */

/**
 * Example 2: Card with Hover Effects
 *
 * import { motion } from 'framer-motion';
 *
 * export default function ServiceCard({ title, description }) {
 *   return (
 *     <motion.div
 *       whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
 *       transition={{ duration: 0.3 }}
 *       className="p-6 border rounded-lg"
 *     >
 *       <h3>{title}</h3>
 *       <p>{description}</p>
 *     </motion.div>
 *   );
 * }
 */

/**
 * Example 3: Image Gallery with Staggered Load
 *
 * import { motion } from 'framer-motion';
 *
 * export default function Gallery({ images }) {
 *   return (
 *     <motion.div className="grid">
 *       {images.map((img, i) => (
 *         <motion.img
 *           key={i}
 *           src={img}
 *           initial={{ opacity: 0, scale: 0.8 }}
 *           whileInView={{ opacity: 1, scale: 1 }}
 *           transition={{ delay: i * 0.1 }}
 *           viewport={{ once: true, amount: 0.3 }}
 *           className="w-full h-auto"
 *         />
 *       ))}
 *     </motion.div>
 *   );
 * }
 */

/**
 * Example 4: Modal/Dialog with Backdrop
 *
 * import { motion } from 'framer-motion';
 *
 * export default function Modal({ isOpen, onClose, children }) {
 *   if (!isOpen) return null;
 *
 *   return (
 *     <motion.div
 *       initial={{ opacity: 0 }}
 *       animate={{ opacity: 1 }}
 *       exit={{ opacity: 0 }}
 *       onClick={onClose}
 *       className="fixed inset-0 bg-black/50 flex items-center justify-center"
 *     >
 *       <motion.div
 *         initial={{ scale: 0.9, opacity: 0 }}
 *         animate={{ scale: 1, opacity: 1 }}
 *         exit={{ scale: 0.9, opacity: 0 }}
 *         onClick={(e) => e.stopPropagation()}
 *         className="bg-white rounded-lg p-6"
 *       >
 *         {children}
 *       </motion.div>
 *     </motion.div>
 *   );
 * }
 */

/**
 * Example 5: Scroll-triggered Animation
 *
 * import { motion } from 'framer-motion';
 *
 * export default function ScrollSection() {
 *   return (
 *     <motion.div
 *       initial={{ opacity: 0, y: 50 }}
 *       whileInView={{ opacity: 1, y: 0 }}
 *       transition={{ duration: 0.8 }}
 *       viewport={{ once: true, amount: 0.3 }}
 *     >
 *       <h2>This animates when scrolled into view</h2>
 *     </motion.div>
 *   );
 * }
 */

export const ANIMATION_EXAMPLES = {
  heading: "Framer Motion Animation Examples",
  description:
    "Use these examples to add smooth animations throughout the site",
};
