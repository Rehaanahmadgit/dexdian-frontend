'use client';

import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle2, FileCheck, ChevronRight } from 'lucide-react';
import { HOMEWORK_LIST, type HomeworkItem } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Helpers ─────────────────────────────────────────────

const PRIORITY_STYLES: Record<
  HomeworkItem['priority'],
  { bg: string; text: string; dot: string }
> = {
  high: {
    bg: 'bg-[#FDF3F4]',
    text: 'text-[#C50F1F]',
    dot: 'bg-[#C50F1F]',
  },
  medium: {
    bg: 'bg-[#FFF9F5]',
    text: 'text-[#8A3707]',
    dot: 'bg-[#8A3707]',
  },
  low: {
    bg: 'bg-[#F1FAF1]',
    text: 'text-[#107C10]',
    dot: 'bg-[#107C10]',
  },
};

const STATUS_ICONS: Record<
  HomeworkItem['status'],
  React.ComponentType<{ className?: string }>
> = {
  pending: Clock,
  submitted: CheckCircle2,
  graded: FileCheck,
  overdue: AlertTriangle,
};

const STATUS_STYLES: Record<HomeworkItem['status'], string> = {
  pending: 'text-primary',
  submitted: 'text-[#8A3707]',
  graded: 'text-[#107C10]',
  overdue: 'text-[#C50F1F]',
};

function isDueSoon(dateStr: string): boolean {
  const due = new Date(dateStr);
  const now = new Date();
  const diff = due.getTime() - now.getTime();
  return diff > 0 && diff < 2 * 24 * 60 * 60 * 1000;
}

// ─── Component ───────────────────────────────────────────

export function HomeworkCards() {
  const pendingCount = HOMEWORK_LIST.filter(
    (h) => h.status === 'pending' || h.status === 'overdue',
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.35, ease: 'easeOut' as const }}
      className="rounded-lg border border-border bg-card shadow-sm flex flex-col h-full min-h-0 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0">
        <h3 className="text-[15px] font-semibold text-foreground">Homework</h3>
        <span className="inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-[12px] font-semibold text-primary">
          {pendingCount} pending
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 pt-2.5 pb-2 space-y-1.5">
        {HOMEWORK_LIST.map((hw, i) => {
          const StatusIcon = STATUS_ICONS[hw.status];
          const priorityStyle = PRIORITY_STYLES[hw.priority];
          const dueSoon = hw.status === 'pending' && isDueSoon(hw.dueDate);

          return (
            <motion.div
              key={hw.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.03, duration: 0.2 }}
              className={cn(
                'group flex items-start gap-2.5 rounded-md border border-border px-2.5 py-2',
                'hover:bg-muted/50 transition-colors cursor-pointer',
                hw.status === 'overdue' && 'border-[#F1B6BC] bg-[#FDF3F4]/50',
              )}
            >
              <div className={cn('mt-0.5 shrink-0', STATUS_STYLES[hw.status])}>
                <StatusIcon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[14px] font-semibold truncate text-foreground leading-snug">
                    {hw.title}
                  </p>
                  {hw.grade && (
                    <span className="text-[11px] font-semibold text-[#107C10] bg-[#F1FAF1] px-1.5 py-0.5 rounded shrink-0">
                      {hw.grade}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">
                  {hw.subject} — {hw.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded',
                      priorityStyle.bg,
                      priorityStyle.text,
                    )}
                  >
                    <span
                      className={cn('w-1.5 h-1.5 rounded-full', priorityStyle.dot)}
                    />
                    {hw.priority}
                  </span>
                  <span
                    className={cn(
                      'text-[11px]',
                      hw.status === 'overdue'
                        ? 'text-[#C50F1F] font-semibold'
                        : dueSoon
                          ? 'text-[#8A3707] font-semibold'
                          : 'text-muted-foreground',
                    )}
                  >
                    {hw.status === 'overdue'
                      ? `Overdue — ${new Date(hw.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                      : hw.status === 'graded'
                        ? 'Graded'
                        : hw.status === 'submitted'
                          ? 'Submitted'
                          : `Due ${new Date(hw.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/35 mt-0.5 group-hover:text-foreground transition-colors shrink-0" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
