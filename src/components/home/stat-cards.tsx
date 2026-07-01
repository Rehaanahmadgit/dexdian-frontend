'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  FileText,
} from 'lucide-react';
import { HERO_STATS } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Icon Map ────────────────────────────────────────────

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Attendance: CalendarCheck,
  'Current Grade': GraduationCap,
  'Pending Homework': BookOpen,
  'Upcoming Exams': FileText,
};

const TREND_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const TREND_COLORS = {
  up: 'text-emerald-500',
  down: 'text-red-500',
  neutral: 'text-muted-foreground',
};

const CARD_BG = [
  'from-indigo-500/10 to-violet-500/5',
  'from-emerald-500/10 to-teal-500/5',
  'from-amber-500/10 to-orange-500/5',
  'from-rose-500/10 to-pink-500/5',
];

const CARD_ICON_BG = [
  'bg-indigo-500/10 text-indigo-500',
  'bg-emerald-500/10 text-emerald-500',
  'bg-amber-500/10 text-amber-500',
  'bg-rose-500/10 text-rose-500',
];

// ─── Component ───────────────────────────────────────────

export function StatCards() {
  const stats = Object.entries(HERO_STATS);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(([key, stat], i) => {
        const Icon = ICONS[key] || FileText;
        const TrendIcon = TREND_ICONS[stat.trend];
        const trendColor = TREND_COLORS[stat.trend];

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const }}
            className={cn(
              'relative overflow-hidden rounded-xl border border-border p-4',
              'bg-gradient-to-br',
              CARD_BG[i],
            )}
          >
            {/* Decorative corner glow */}
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/10 dark:bg-white/5 pointer-events-none" />

            <div className="relative flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                <div className="flex items-center gap-1">
                  <TrendIcon className={cn('w-3.5 h-3.5', trendColor)} />
                  <span className={cn('text-xs font-medium', trendColor)}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={cn('p-2 rounded-lg', CARD_ICON_BG[i])}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
