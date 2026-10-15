import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0 : 0.55, ease: "easeOut", delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
