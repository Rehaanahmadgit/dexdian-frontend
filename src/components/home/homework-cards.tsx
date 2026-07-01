'use client';

import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle2, FileCheck, ChevronRight } from 'lucide-react';
import { HOMEWORK_LIST, type HomeworkItem } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Helpers ─────────────────────────────────────────────

const PRIORITY_STYLES: Record<HomeworkItem['priority'], { bg: string; text: string; dot: string }> = {
  high: { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' },
  medium: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  low: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
};

const STATUS_ICONS: Record<HomeworkItem['status'], React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  submitted: CheckCircle2,
  graded: FileCheck,
  overdue: AlertTriangle,
};

const STATUS_STYLES: Record<HomeworkItem['status'], string> = {
  pending: 'text-blue-500',
  submitted: 'text-amber-500',
  graded: 'text-emerald-500',
  overdue: 'text-red-500',
};

function isDueSoon(dateStr: string): boolean {
  const due = new Date(dateStr);
  const now = new Date();
  const diff = due.getTime() - now.getTime();
  return diff > 0 && diff < 2 * 24 * 60 * 60 * 1000; // < 2 days
}

// ─── Component ───────────────────────────────────────────

export function HomeworkCards() {
  const pendingCount = HOMEWORK_LIST.filter(
    (h) => h.status === 'pending' || h.status === 'overdue',
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.4, ease: 'easeOut' as const }}
      className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col h-full"
    >
      {/* Header — fixed at top */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 flex-shrink-0">
        <h3 className="text-sm font-semibold">Homework</h3>
        <span className="text-xs text-muted-foreground">
          {pendingCount} pending
        </span>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
        {HOMEWORK_LIST.map((hw, i) => {
          const StatusIcon = STATUS_ICONS[hw.status];
          const priorityStyle = PRIORITY_STYLES[hw.priority];
          const dueSoon = hw.status === 'pending' && isDueSoon(hw.dueDate);

          return (
            <motion.div
              key={hw.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + i * 0.06, duration: 0.3 }}
              className={cn(
                'group flex items-start gap-3 rounded-lg border border-border p-3',
                'hover:bg-muted/50 transition-colors cursor-pointer',
                hw.status === 'overdue' && 'border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/10',
              )}
            >
              {/* Status icon */}
              <div className={cn('mt-0.5', STATUS_STYLES[hw.status])}>
                <StatusIcon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium truncate">{hw.title}</p>
                  {hw.grade && (
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
                      {hw.grade}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {hw.subject} — {hw.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  {/* Priority badge */}
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded',
                      priorityStyle.bg,
                      priorityStyle.text,
                    )}
                  >
                    <span className={cn('w-1.5 h-1.5 rounded-full', priorityStyle.dot)} />
                    {hw.priority}
                  </span>

                  {/* Due date */}
                  <span
                    className={cn(
                      'text-[10px]',
                      hw.status === 'overdue'
                        ? 'text-red-500 font-semibold'
                        : dueSoon
                          ? 'text-amber-500 font-semibold'
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

              <ChevronRight className="w-4 h-4 text-muted-foreground/40 mt-1 group-hover:text-foreground transition-colors flex-shrink-0" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
