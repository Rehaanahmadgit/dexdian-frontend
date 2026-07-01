'use client';

import { motion } from 'framer-motion';
import { SUBJECT_MARKS } from '@/src/lib/dummy-data';

// ─── Component ───────────────────────────────────────────

export function SubjectMarks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.4, ease: 'easeOut' as const }}
      className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col h-full"
    >
      {/* Header — fixed at top */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 flex-shrink-0">
        <h3 className="text-sm font-semibold">Subject Performance</h3>
        <span className="text-[11px] text-muted-foreground">
          {SUBJECT_MARKS.length} subjects
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-2.5 space-y-2">
        {SUBJECT_MARKS.map((subject, i) => {
          const pct = Math.round((subject.score / subject.maxScore) * 100);

          return (
            <div key={subject.subject} className="space-y-1">
              {/* Subject name + score row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm flex-shrink-0">{subject.icon}</span>
                  <span className="text-xs font-medium truncate">{subject.subject}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-xs font-semibold tabular-nums">
                    {subject.score}
                    <span className="text-muted-foreground font-normal">/{subject.maxScore}</span>
                  </span>
                  <span className="text-[11px] font-medium tabular-nums w-8 text-right" style={{ color: subject.color }}>
                    {pct}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    delay: 0.5 + i * 0.08,
                    duration: 0.6,
                    ease: 'easeOut' as const,
                  }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
