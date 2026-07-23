'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// ─── Props ───────────────────────────────────────────────

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  delay?: number;
  action?: ReactNode;
}

// ─── Component ───────────────────────────────────────────

export function ChartCard({
  title,
  subtitle,
  icon: Icon,
  children,
  className,
  bodyClassName,
  delay = 0,
  action,
}: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' as const }}
      whileHover={{ y: -2 }}
      className={cn(
        'rounded-lg border border-border bg-card shadow-sm overflow-hidden flex flex-col h-full',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-start gap-2.5 min-w-0">
          {Icon && (
            <div className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-md bg-accent text-primary shrink-0">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-foreground tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {action}
      </div>
      <div className={cn('flex-1 min-h-0 p-4', bodyClassName)}>{children}</div>
    </motion.div>
  );
}
