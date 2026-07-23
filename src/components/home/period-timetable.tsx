'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { TIMETABLE } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Subject color map ───────────────────────────────────

const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: 'bg-[#E8F3FC] border-[#B4D6F2]',
  Science: 'bg-[#F1FAF1] border-[#9FD89F]',
  English: 'bg-[#FFF9F5] border-[#F5D0B5]',
  History: 'bg-[#FDF3F4] border-[#F1B6BC]',
  'Computer Science': 'bg-[#EEF0FB] border-[#C5CAE8]',
  'Physical Education': 'bg-[#E8F7F7] border-[#9FD6D6]',
  'Art & Craft': 'bg-[#FDF3F4] border-[#F1B6BC]',
  Music: 'bg-[#FFF9F5] border-[#F5D0B5]',
  Library: 'bg-muted border-border',
  'Club Activity': 'bg-[#E8F7F7] border-[#9FD6D6]',
};

const SUBJECT_TEXT: Record<string, string> = {
  Mathematics: 'text-[#0C3B5E]',
  Science: 'text-[#0E700E]',
  English: 'text-[#8A3707]',
  History: 'text-[#C50F1F]',
  'Computer Science': 'text-[#115EA3]',
  'Physical Education': 'text-[#038387]',
  'Art & Craft': 'text-[#C50F1F]',
  Music: 'text-[#8A3707]',
  Library: 'text-foreground',
  'Club Activity': 'text-[#038387]',
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
      className="rounded-lg border border-border bg-card overflow-hidden shadow-sm"
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
            Class Timetable
          </h3>
          <span className="hidden sm:inline text-[12px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
            Mon–Sat · 8:00 AM – 12:30 PM
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
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
              <th className="sticky left-0 bg-card z-10 w-[100px] md:w-[120px] py-3 px-3 text-left text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">
                Period
              </th>
              {dayLabels.map((day, i) => (
                <th
                  key={day}
                  className={cn(
                    'py-3 px-2 text-center text-[13px] font-semibold uppercase tracking-wider min-w-[90px] md:min-w-[110px]',
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
                      <span className="inline-flex items-center gap-2 px-4 py-1 rounded-md bg-muted/60 text-[13px] font-medium text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
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
                      <span className="text-[13px] font-bold text-muted-foreground">
                        {pIdx + 1}
                      </span>
                      <span className="text-[12px] text-muted-foreground/70 font-mono tabular-nums leading-tight mt-0.5">
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
                              'text-sm md:text-[15px] font-semibold leading-snug',
                              colorText || 'text-foreground',
                            )}
                          >
                            {period.subject}
                          </p>
                          <p className="text-[12px] md:text-[13px] text-muted-foreground mt-0.5 leading-tight">
                            {period.teacher}
                          </p>
                          <p className="text-[12px] text-muted-foreground/70 leading-tight">
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
