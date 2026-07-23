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

// ─── Subject metadata ────────────────────────────────────

const subjectMeta: Record<string, { name: string; icon: LucideIcon }> = {
  Math: { name: 'Mathematics', icon: Calculator },
  Science: { name: 'Science', icon: FlaskConical },
  English: { name: 'English', icon: BookOpen },
  History: { name: 'History', icon: Scroll },
  CS: { name: 'Computer Science', icon: Monitor },
  PE: { name: 'Physical Education', icon: Dumbbell },
};

// ─── Component ───────────────────────────────────────────

export function SubjectPerformanceChart() {
  return (
    <ChartCard
      title="Subject Performance"
      subtitle="Your score vs class average"
      icon={BarChart3}
      delay={0.22}
    >
      <div className="space-y-3.5">
        {SUBJECT_SCORES.map((item, i) => {
          const meta = subjectMeta[item.subject] ?? {
            name: item.subject,
            icon: BookOpen,
          };
          const Icon = meta.icon;
          const delta = item.score - item.classAvg;

          return (
            <motion.div
              key={item.subject}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-muted/70"
                  style={{ color: item.fill }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-medium truncate text-foreground">
                      {meta.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[12px] text-muted-foreground tabular-nums">
                        Avg {item.classAvg}
                      </span>
                      <span
                        className="text-[13px] font-semibold tabular-nums"
                        style={{ color: item.fill }}
                      >
                        {item.score}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-2 rounded-full bg-muted overflow-hidden ml-10">
                {/* Class average marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-foreground/25 z-10"
                  style={{ left: `${item.classAvg}%` }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{
                    delay: 0.35 + i * 0.05,
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
              </div>

              <p className="text-[11px] text-muted-foreground ml-10">
                {delta >= 0 ? '+' : ''}
                {delta} vs class average
              </p>
            </motion.div>
          );
        })}
      </div>
    </ChartCard>
  );
}
