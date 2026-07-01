'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { TIMETABLE } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Subject color map ───────────────────────────────────

const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-800/30',
  Science: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-800/30',
  English: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-800/30',
  History: 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-800/30',
  'Computer Science': 'bg-violet-50 dark:bg-violet-950/20 border-violet-100 dark:border-violet-800/30',
  'Physical Education': 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-100 dark:border-cyan-800/30',
  'Art & Craft': 'bg-pink-50 dark:bg-pink-950/20 border-pink-100 dark:border-pink-800/30',
  Music: 'bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-800/30',
  Library: 'bg-slate-50 dark:bg-slate-950/20 border-slate-100 dark:border-slate-800/30',
  'Club Activity': 'bg-teal-50 dark:bg-teal-950/20 border-teal-100 dark:border-teal-800/30',
};

const SUBJECT_TEXT: Record<string, string> = {
  Mathematics: 'text-indigo-700 dark:text-indigo-300',
  Science: 'text-emerald-700 dark:text-emerald-300',
  English: 'text-amber-700 dark:text-amber-300',
  History: 'text-rose-700 dark:text-rose-300',
  'Computer Science': 'text-violet-700 dark:text-violet-300',
  'Physical Education': 'text-cyan-700 dark:text-cyan-300',
  'Art & Craft': 'text-pink-700 dark:text-pink-300',
  Music: 'text-orange-700 dark:text-orange-300',
  Library: 'text-slate-700 dark:text-slate-300',
  'Club Activity': 'text-teal-700 dark:text-teal-300',
};

// ─── Component ───────────────────────────────────────────

export function PeriodTimetable() {
  // Transpose: periods → rows, days → columns
  const dayLabels = TIMETABLE.map((d) => d.day.slice(0, 3)); // Mon, Tue, ...
  const periods = TIMETABLE[0].periods;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.4, ease: 'easeOut' as const }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-semibold tracking-tight">Class Timetable</h3>
          <span className="hidden sm:inline text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
            Mon–Sat · 8:00 AM – 12:30 PM
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">6 periods daily</span>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          {/* Column headers: empty + day names */}
          <thead>
            <tr className="border-b border-border/60">
              <th className="sticky left-0 bg-card z-10 w-[100px] md:w-[120px] py-3 px-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Period
              </th>
              {dayLabels.map((day, i) => (
                <th
                  key={day}
                  className={cn(
                    'py-3 px-2 text-center text-xs font-semibold uppercase tracking-wider min-w-[90px] md:min-w-[110px]',
                    i === new Date().getDay() - 1
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground',
                  )}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {periods.map((template, pIdx) => {
              const isBreak = template.subject === 'Break';

              if (isBreak) {
                return (
                  <tr key={pIdx} className="border-b border-border/30">
                    <td
                      colSpan={7}
                      className="py-2.5 px-4 text-center"
                    >
                      <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-muted/60 text-xs font-medium text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Break · {template.time}
                      </span>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={pIdx} className="border-b border-border/30 last:border-b-0">
                  {/* Period # and time */}
                  <td className="sticky left-0 bg-card z-10 py-3 px-3 border-r border-border/30">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-muted-foreground">
                        {pIdx + 1}
                      </span>
                      <span className="text-[11px] text-muted-foreground/60 font-mono tabular-nums leading-tight mt-0.5">
                        {template.time.split(' - ')[0]}
                      </span>
                    </div>
                  </td>

                  {/* Day cells */}
                  {TIMETABLE.map((day, dIdx) => {
                    const period = day.periods[pIdx];
                    const isToday =
                      new Date().getDay() - 1 === dIdx;
                    const colorBg = SUBJECT_COLORS[period.subject] || '';
                    const colorText = SUBJECT_TEXT[period.subject] || '';

                    return (
                      <td
                        key={day.day}
                        className={cn(
                          'py-2.5 px-2 md:px-3 align-top transition-colors',
                          isToday && 'bg-primary/[0.03]',
                        )}
                      >
                        <div
                          className={cn(
                            'rounded-lg border px-2.5 py-2 h-full',
                            colorBg || 'bg-muted/20 border-border/20',
                          )}
                        >
                          <p
                            className={cn(
                              'text-xs md:text-sm font-semibold leading-snug',
                              colorText || 'text-foreground',
                            )}
                          >
                            {period.subject}
                          </p>
                          <p className="text-[10px] md:text-[11px] text-muted-foreground mt-0.5 leading-tight">
                            {period.teacher}
                          </p>
                          <p className="text-[10px] md:text-[11px] text-muted-foreground/60 leading-tight">
                            {period.room}
                          </p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
