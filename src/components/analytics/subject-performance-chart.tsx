'use client';

import {
  Calculator,
  FlaskConical,
  BookOpen,
  Scroll,
  Monitor,
  Dumbbell,
  type LucideIcon,
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
      delay={0.15}
      className="h-full flex flex-col overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto min-h-0 -mr-1 pr-1 space-y-1">
        {SUBJECT_SCORES.map((item) => {
          const meta = subjectMeta[item.subject] ?? {
            name: item.subject,
            icon: BookOpen,
          };
          const Icon = meta.icon;

          return (
            <div
              key={item.subject}
              className="flex items-center gap-3 py-1.5 group"
            >
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-muted/60"
                style={{ color: item.fill }}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Subject name */}
              <span className="text-sm font-medium w-28 flex-shrink-0 truncate">
                {meta.name}
              </span>

              {/* Progress bar */}
              <div className="flex-1 h-2 rounded-full bg-muted/70 overflow-hidden min-w-0">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor: item.fill,
                  }}
                />
              </div>

              {/* Score */}
              <span className="text-xs text-muted-foreground w-14 text-right flex-shrink-0 tabular-nums">
                {item.score}/100
              </span>

              {/* Percentage */}
              <span
                className="text-xs font-semibold w-10 text-right flex-shrink-0 tabular-nums"
                style={{ color: item.fill }}
              >
                {item.score}%
              </span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}