'use client';

import { motion } from 'framer-motion';
import { CircleCheck, Clock4, Sparkles } from 'lucide-react';
import { DAILY_SUMMARY } from '@/src/lib/dummy-data';

// ─── Component ───────────────────────────────────────────

export function DailySummary() {
  const { classesAttended, totalClasses, homeworkCompleted, totalHomework, teacherNote } =
    DAILY_SUMMARY;

  const classPct = Math.round((classesAttended / totalClasses) * 100);
  const hwPct = Math.round((homeworkCompleted / totalHomework) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' as const }}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-muted/40 via-background to-muted/20 p-5 md:p-6"
    >
      {/* Subtle ambient glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
        {/* ── Left: Stats ─────────────────────────────── */}
        <div className="flex items-center gap-6 sm:gap-10 flex-shrink-0">
          {/* Classes */}
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
              <Clock4 className="w-[18px] h-[18px] text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums tracking-tight">
                {classesAttended}
                <span className="text-base font-normal text-muted-foreground">
                  /{totalClasses}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Classes attended
                <span className="ml-1.5 font-medium text-blue-500">{classPct}%</span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-12 bg-border/60 flex-shrink-0" />

          {/* Homework */}
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <CircleCheck className="w-[18px] h-[18px] text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums tracking-tight">
                {homeworkCompleted}
                <span className="text-base font-normal text-muted-foreground">
                  /{totalHomework}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Homework done
                <span className="ml-1.5 font-medium text-emerald-500">{hwPct}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Teacher Note ──────────────────────── */}
        {teacherNote && (
          <>
            {/* Divider on mobile */}
            <div className="block sm:hidden w-full h-px bg-border/40" />

            <div className="flex-1 min-w-0 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{teacherNote}&rdquo;
              </p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
