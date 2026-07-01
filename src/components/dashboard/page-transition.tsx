'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

// ─── Props ───────────────────────────────────────────────

interface PageTransitionProps {
  children: ReactNode;
}

// ─── Animation Variants ──────────────────────────────────

const variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15, ease: 'easeIn' as const },
  },
};

// ─── Component ───────────────────────────────────────────

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
