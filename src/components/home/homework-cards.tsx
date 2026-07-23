'use client';

import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle2, FileCheck, ChevronRight } from 'lucide-react';
import { HOMEWORK_LIST, type HomeworkItem } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

const PRIORITY_STYLES: Record<HomeworkItem['priority'], string> = {
  high: 'bg-neo-accent',
  medium: 'bg-neo-secondary',
  low: 'bg-neo-muted',
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

function isDueSoon(dateStr: string): boolean {
  const due = new Date(dateStr);
  const now = new Date();
  const diff = due.getTime() - now.getTime();
  return diff > 0 && diff < 2 * 24 * 60 * 60 * 1000;
}

export function HomeworkCards() {
  const pendingCount = HOMEWORK_LIST.filter(
    (h) => h.status === 'pending' || h.status === 'overdue',
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex h-full min-h-0 flex-col overflow-hidden border-4 border-neo-ink bg-neo-white shadow-neo-md"
    >
      <div className="flex shrink-0 items-center justify-between border-b-4 border-neo-ink bg-neo-secondary px-4 py-2.5">
        <h3 className="text-sm font-black uppercase tracking-wide">Homework</h3>
        <span className="border-2 border-neo-ink bg-neo-accent px-2 py-0.5 text-[11px] font-black uppercase">
          {pendingCount} pending
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-3 pb-2 pt-2.5">
        {HOMEWORK_LIST.map((hw, i) => {
          const StatusIcon = STATUS_ICONS[hw.status];
          const dueSoon = hw.status === 'pending' && isDueSoon(hw.dueDate);

          return (
            <div
              key={hw.id}
              className={cn(
                'group flex cursor-pointer items-start gap-2.5 border-4 border-neo-ink bg-neo-bg p-2.5',
                'transition-transform duration-100 ease-linear hover:-translate-y-0.5 hover:shadow-neo-sm',
                hw.status === 'overdue' && 'bg-neo-accent/50',
                i % 2 === 0 ? 'rotate-[0.3deg]' : '-rotate-[0.3deg]',
              )}
            >
              <StatusIcon className="mt-0.5 h-4 w-4 shrink-0 stroke-[3px]" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-black uppercase tracking-tight">
                    {hw.title}
                  </p>
                  {hw.grade && (
                    <span className="shrink-0 border-2 border-neo-ink bg-neo-muted px-1 text-[10px] font-black">
                      {hw.grade}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 line-clamp-1 text-xs font-bold">
                  {hw.subject} — {hw.description}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={cn(
                      'border-2 border-neo-ink px-1.5 py-0.5 text-[10px] font-black uppercase',
                      PRIORITY_STYLES[hw.priority],
                    )}
                  >
                    {hw.priority}
                  </span>
                  <span className="text-[11px] font-bold uppercase">
                    {hw.status === 'overdue'
                      ? `Overdue — ${new Date(hw.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                      : hw.status === 'graded'
                        ? 'Graded'
                        : hw.status === 'submitted'
                          ? 'Submitted'
                          : dueSoon
                            ? `Due soon`
                            : `Due ${new Date(hw.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  </span>
                </div>
              </div>
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 stroke-[3px] opacity-40 group-hover:opacity-100" />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
