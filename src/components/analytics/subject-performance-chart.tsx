'use client';

import { motion } from 'framer-motion';
import {
  Calculator,
  FlaskConical,
  BookOpen,
  Scroll,
  Monitor,
  Dumbbell,
  type LucideIcon,
  BarChart3,
} from 'lucide-react';
import { SUBJECT_SCORES } from '@/src/lib/dummy-data';
import { ChartCard } from '@/src/components/analytics/chart-card';
import { cn } from '@/src/lib/utils';

const subjectMeta: Record<string, { name: string; icon: LucideIcon }> = {
  Math: { name: 'Mathematics', icon: Calculator },
  Science: { name: 'Science', icon: FlaskConical },
  English: { name: 'English', icon: BookOpen },
  History: { name: 'History', icon: Scroll },
  CS: { name: 'Computer Science', icon: Monitor },
  PE: { name: 'Physical Education', icon: Dumbbell },
};

const BAR_COLORS = ['bg-neo-accent', 'bg-neo-secondary', 'bg-neo-muted'] as const;

export function SubjectPerformanceChart() {
  return (
    <ChartCard
      title="Subject Performance"
      subtitle="Your score vs class average"
      icon={BarChart3}
      headerBg="bg-neo-muted"
    >
      <div className="space-y-3.5">
        {SUBJECT_SCORES.map((item, i) => {
          const meta = subjectMeta[item.subject] ?? {
            name: item.subject,
            icon: BookOpen,
          };
          const Icon = meta.icon;
          const delta = item.score - item.classAvg;
          const bar = BAR_COLORS[i % BAR_COLORS.length];

          return (
            <div key={item.subject} className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-neo-ink bg-neo-bg">
                  <Icon className="h-4 w-4 stroke-[3px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-black uppercase tracking-tight">
                      {meta.name}
                    </span>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-[11px] font-bold tabular-nums">
                        Avg {item.classAvg}
                      </span>
                      <span className="border-2 border-neo-ink bg-neo-secondary px-1 text-xs font-black tabular-nums">
                        {item.score}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative ml-10 h-3 overflow-hidden border-2 border-neo-ink bg-neo-bg">
                <div
                  className="absolute top-0 bottom-0 z-10 w-0.5 bg-neo-ink"
                  style={{ left: `${item.classAvg}%` }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{
                    delay: 0.1 + i * 0.04,
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                  className={cn('h-full', bar)}
                />
              </div>

              <p className="ml-10 text-[11px] font-bold uppercase tracking-wide">
                {delta >= 0 ? '+' : ''}
                {delta} vs class avg
              </p>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
