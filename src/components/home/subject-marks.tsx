'use client';

import { motion } from 'framer-motion';
import { SUBJECT_MARKS } from '@/src/lib/dummy-data';

export function SubjectMarks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
      className="flex h-full min-h-0 flex-col overflow-hidden border-4 border-neo-ink bg-neo-white shadow-neo-md"
    >
      <div className="flex shrink-0 items-center justify-between border-b-4 border-neo-ink bg-neo-muted px-4 py-2.5">
        <h3 className="text-sm font-black uppercase tracking-wide">
          Subject Performance
        </h3>
        <span className="text-[11px] font-black uppercase tracking-widest">
          {SUBJECT_MARKS.length} subjects
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 pb-2 pt-2.5">
        {SUBJECT_MARKS.map((subject, i) => {
          const pct = Math.round((subject.score / subject.maxScore) * 100);
          const barColor =
            i % 3 === 0
              ? 'bg-neo-accent'
              : i % 3 === 1
                ? 'bg-neo-secondary'
                : 'bg-neo-muted';

          return (
            <div key={subject.subject} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-base shrink-0">{subject.icon}</span>
                  <span className="truncate text-sm font-black uppercase tracking-tight">
                    {subject.subject}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-black tabular-nums">
                    {subject.score}
                    <span className="font-bold">/{subject.maxScore}</span>
                  </span>
                  <span className="w-10 border-2 border-neo-ink bg-neo-bg text-center text-xs font-black tabular-nums">
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="relative h-3 overflow-hidden border-2 border-neo-ink bg-neo-bg">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    delay: 0.1 + i * 0.04,
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                  className={`absolute inset-y-0 left-0 ${barColor}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
