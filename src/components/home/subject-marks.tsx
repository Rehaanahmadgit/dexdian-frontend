'use client';

import { motion } from 'framer-motion';
import { SUBJECT_MARKS } from '@/src/lib/dummy-data';

// ─── Component ───────────────────────────────────────────

export function SubjectMarks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.35, ease: 'easeOut' as const }}
      className="rounded-lg border border-border bg-card shadow-sm flex flex-col h-full min-h-0 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0">
        <h3 className="text-[15px] font-semibold text-foreground">
          Subject Performance
        </h3>
        <span className="text-[12px] font-medium text-muted-foreground">
          {SUBJECT_MARKS.length} subjects
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pt-2.5 pb-2 space-y-2.5">
        {SUBJECT_MARKS.map((subject, i) => {
          const pct = Math.round((subject.score / subject.maxScore) * 100);

          return (
            <div key={subject.subject} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[15px] shrink-0">{subject.icon}</span>
                  <span className="text-[14px] font-medium truncate text-foreground">
                    {subject.subject}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[14px] font-semibold tabular-nums text-foreground">
                    {subject.score}
                    <span className="text-muted-foreground font-normal text-[12px]">
                      /{subject.maxScore}
                    </span>
                  </span>
                  <span
                    className="text-[12px] font-semibold tabular-nums w-9 text-right"
                    style={{ color: subject.color }}
                  >
                    {pct}%
                  </span>
                </div>
              </div>

              <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    delay: 0.3 + i * 0.05,
                    duration: 0.45,
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
