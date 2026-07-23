'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { TIMETABLE } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Subject color map ───────────────────────────────────

const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: 'bg-neo-muted',
  Science: 'bg-neo-secondary',
  English: 'bg-neo-secondary',
  History: 'bg-neo-accent',
  'Computer Science': 'bg-neo-muted',
  'Physical Education': 'bg-neo-white',
  'Art & Craft': 'bg-neo-accent',
  Music: 'bg-neo-secondary',
  Library: 'bg-neo-bg',
  'Club Activity': 'bg-neo-white',
};

// ─── Component ───────────────────────────────────────────

export function PeriodTimetable() {
  // Transpose: periods → rows, days → columns
  const dayLabels = TIMETABLE.map((d) => d.day.slice(0, 3)); // Mon, Tue, ...
  const periods = TIMETABLE[0].periods;
  const todayColIdx = new Date().getDay() - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.2, ease: 'linear' }}
      className="overflow-hidden rounded-none border-4 border-neo-ink bg-neo-white font-neo shadow-neo-md"
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between border-b-4 border-neo-ink bg-neo-secondary px-4 py-3">
        <div className="flex items-center gap-2.5">
          <h3 className="text-sm font-black uppercase tracking-wide text-neo-ink">
            Class Timetable
          </h3>
          <span className="hidden border-2 border-neo-ink bg-neo-white px-2 py-0.5 text-[11px] font-black uppercase sm:inline">
            Mon–Sat · 8:00 AM – 12:30 PM
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-neo-ink">
          <Clock className="h-3.5 w-3.5 stroke-[3px]" />
          <span className="hidden sm:inline">6 periods daily</span>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          {/* Column headers: empty + day names */}
          <thead>
            <tr className="border-b-4 border-neo-ink">
              <th className="sticky left-0 z-10 w-[100px] border-r-2 border-neo-ink bg-neo-white py-3 px-3 text-left text-[11px] font-black uppercase tracking-wider text-neo-ink md:w-[120px]">
                Period
              </th>
              {dayLabels.map((day, i) => {
                const isToday = todayColIdx === i;
                return (
                  <th
                    key={day}
                    className={cn(
                      'min-w-[90px] py-3 px-2 text-center text-[11px] font-black uppercase tracking-wider md:min-w-[110px]',
                      isToday
                        ? 'border-x-2 border-neo-ink bg-neo-secondary text-neo-ink'
                        : 'text-neo-ink',
                    )}
                  >
                    {day}
                    {isToday && (
                      <span className="mt-0.5 block text-[9px] font-black">Today</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {periods.map((template, pIdx) => {
              const isBreak = template.subject === 'Break';

              if (isBreak) {
                return (
                  <tr key={pIdx} className="border-b-2 border-neo-ink">
                    <td colSpan={7} className="py-2.5 px-4 text-center">
                      <span className="inline-flex items-center gap-2 border-2 border-neo-ink bg-neo-bg px-4 py-1 text-[12px] font-black uppercase text-neo-ink">
                        <Clock className="h-3.5 w-3.5 stroke-[3px]" />
                        Break · {template.time}
                      </span>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={pIdx} className="border-b-2 border-neo-ink last:border-b-0">
                  {/* Period # and time */}
                  <td className="sticky left-0 z-10 border-r-2 border-neo-ink bg-neo-white py-3 px-3">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-black text-neo-ink">
                        {pIdx + 1}
                      </span>
                      <span className="mt-0.5 font-mono text-[11px] font-bold tabular-nums leading-tight text-neo-ink">
                        {template.time.split(' - ')[0]}
                      </span>
                    </div>
                  </td>

                  {/* Day cells */}
                  {TIMETABLE.map((day, dIdx) => {
                    const period = day.periods[pIdx];
                    const isToday = todayColIdx === dIdx;
                    const colorBg = SUBJECT_COLORS[period.subject] || 'bg-neo-bg';

                    return (
                      <td
                        key={day.day}
                        className={cn(
                          'px-2 py-2.5 align-top transition-colors duration-100 ease-linear md:px-3',
                          isToday && 'border-x-2 border-neo-ink bg-neo-secondary',
                        )}
                      >
                        <div
                          className={cn(
                            'h-full rounded-none border-2 border-neo-ink px-2.5 py-2 shadow-neo-sm',
                            colorBg,
                          )}
                        >
                          <p className="text-sm font-black uppercase leading-snug text-neo-ink md:text-[14px]">
                            {period.subject}
                          </p>
                          <p className="mt-0.5 text-[11px] font-bold leading-tight text-neo-ink md:text-[12px]">
                            {period.teacher}
                          </p>
                          <p className="text-[11px] font-bold leading-tight text-neo-ink">
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
