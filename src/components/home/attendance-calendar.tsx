'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ATTENDANCE_HEATMAP, type DayStatus } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Constants ───────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const STATUS_STYLES: Record<
  DayStatus,
  { cell: string; dot: string; swatch: string; label: string }
> = {
  present: {
    cell: 'bg-neo-muted border-neo-ink',
    dot: 'bg-neo-ink',
    swatch: 'bg-neo-muted',
    label: 'Present',
  },
  absent: {
    cell: 'bg-neo-accent border-neo-ink',
    dot: 'bg-neo-ink',
    swatch: 'bg-neo-accent',
    label: 'Absent',
  },
  late: {
    cell: 'bg-neo-secondary border-neo-ink',
    dot: 'bg-neo-ink',
    swatch: 'bg-neo-secondary',
    label: 'Late',
  },
  holiday: {
    cell: 'bg-neo-bg border-neo-ink',
    dot: 'bg-neo-ink',
    swatch: 'bg-neo-bg',
    label: 'Holiday',
  },
  future: {
    cell: 'bg-transparent border-transparent',
    dot: 'bg-transparent',
    swatch: 'bg-transparent',
    label: '—',
  },
};

// ─── Helpers ─────────────────────────────────────────────

interface MonthGroup {
  year: number;
  month: number;
  days: typeof ATTENDANCE_HEATMAP;
  key: string;
}

function groupByMonth(data: typeof ATTENDANCE_HEATMAP): MonthGroup[] {
  const map = new Map<string, typeof ATTENDANCE_HEATMAP>();
  for (const day of data) {
    const d = new Date(day.date);
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(day);
  }
  return Array.from(map.entries())
    .map(([key, days]) => {
      const [y, m] = key.split('-').map(Number);
      return { year: y, month: m, days, key };
    })
    .sort((a, b) => a.key.localeCompare(b.key));
}

interface CalendarDay {
  date: number;
  iso: string;
  status: DayStatus;
  isCurrentMonth: boolean;
  isToday: boolean;
}

function buildCalendarGrid(
  year: number,
  month: number,
  data: typeof ATTENDANCE_HEATMAP,
): CalendarDay[][] {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const statusMap = new Map<string, DayStatus>();
  for (const d of data) {
    statusMap.set(d.date, d.status);
  }

  const firstDay = new Date(Date.UTC(year, month, 1));
  const startCol = firstDay.getUTCDay() === 0 ? 6 : firstDay.getUTCDay() - 1;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const flat: CalendarDay[] = [];
  const totalCells = 42;

  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startCol + 1;
    if (dayNum < 1 || dayNum > daysInMonth) {
      flat.push({
        date: 0,
        iso: '',
        status: 'future',
        isCurrentMonth: false,
        isToday: false,
      });
      continue;
    }
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    flat.push({
      date: dayNum,
      iso,
      status: statusMap.get(iso) ?? (iso > todayStr ? 'future' : 'holiday'),
      isCurrentMonth: true,
      isToday: iso === todayStr,
    });
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < 6; i++) {
    weeks.push(flat.slice(i * 7, i * 7 + 7));
  }
  return weeks;
}

// ─── Component ───────────────────────────────────────────

export function AttendanceCalendar() {
  const months = useMemo(() => groupByMonth(ATTENDANCE_HEATMAP), []);
  const initialIdx = Math.max(0, months.length - 1);
  const [monthIndex, setMonthIndex] = useState(initialIdx);
  const [tooltip, setTooltip] = useState<{
    day: CalendarDay;
    x: number;
    y: number;
  } | null>(null);

  const currentMonth = months[monthIndex] ?? months[months.length - 1];
  const weeks = useMemo(
    () =>
      currentMonth
        ? buildCalendarGrid(currentMonth.year, currentMonth.month, ATTENDANCE_HEATMAP)
        : [],
    [currentMonth],
  );

  const stats = useMemo(() => {
    if (!currentMonth) return { present: 0, absent: 0, late: 0 };
    let p = 0;
    let a = 0;
    let l = 0;
    for (const d of currentMonth.days) {
      if (d.status === 'present') p++;
      else if (d.status === 'absent') a++;
      else if (d.status === 'late') l++;
    }
    return { present: p, absent: a, late: l };
  }, [currentMonth]);

  const allTime = useMemo(() => {
    const p = ATTENDANCE_HEATMAP.filter((d) => d.status === 'present').length;
    const a = ATTENDANCE_HEATMAP.filter((d) => d.status === 'absent').length;
    const l = ATTENDANCE_HEATMAP.filter((d) => d.status === 'late').length;
    const total = p + a + l;
    return { pct: total > 0 ? ((p / total) * 100).toFixed(1) : '0' };
  }, []);

  const canPrev = monthIndex > 0;
  const canNext = monthIndex < months.length - 1;

  if (!currentMonth) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.2, ease: 'linear' }}
      className="flex h-full flex-col overflow-hidden rounded-none border-4 border-neo-ink bg-neo-white font-neo shadow-neo-md"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b-4 border-neo-ink bg-neo-secondary px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-sm font-black uppercase tracking-wide text-neo-ink">
            Attendance
          </h3>
          <span className="border-2 border-neo-ink bg-neo-white px-1.5 py-0.5 text-[13px] font-black tabular-nums text-neo-ink">
            {allTime.pct}%
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => canPrev && setMonthIndex(monthIndex - 1)}
            disabled={!canPrev}
            className={cn(
              'rounded-none border-2 border-neo-ink p-1.5 transition-colors duration-100 ease-linear',
              canPrev
                ? 'bg-neo-white text-neo-ink hover:bg-neo-accent'
                : 'cursor-default border-transparent bg-transparent text-neo-ink/30',
            )}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4 stroke-[3px]" />
          </button>
          <span className="min-w-[128px] text-center text-[13px] font-black uppercase tabular-nums text-neo-ink">
            {MONTH_NAMES[currentMonth.month]} {currentMonth.year}
          </span>
          <button
            onClick={() => canNext && setMonthIndex(monthIndex + 1)}
            disabled={!canNext}
            className={cn(
              'rounded-none border-2 border-neo-ink p-1.5 transition-colors duration-100 ease-linear',
              canNext
                ? 'bg-neo-white text-neo-ink hover:bg-neo-accent'
                : 'cursor-default border-transparent bg-transparent text-neo-ink/30',
            )}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4 stroke-[3px]" />
          </button>
        </div>

        <div className="hidden items-center gap-3 text-[11px] font-black uppercase md:flex">
          <span className="flex items-center gap-1 text-neo-ink">
            <span className="h-2 w-2 rounded-none border border-neo-ink bg-neo-muted" />
            {stats.present}
          </span>
          <span className="flex items-center gap-1 text-neo-ink">
            <span className="h-2 w-2 rounded-none border border-neo-ink bg-neo-accent" />
            {stats.absent}
          </span>
          <span className="flex items-center gap-1 text-neo-ink">
            <span className="h-2 w-2 rounded-none border border-neo-ink bg-neo-secondary" />
            {stats.late}
          </span>
        </div>
      </div>

      {/* Calendar fills remaining height — no empty gap */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: 'linear' }}
          className="flex min-h-0 flex-1 flex-col px-3 pb-1.5 pt-2.5 md:px-4"
        >
          <div className="mb-1 grid shrink-0 grid-cols-7">
            {DAY_HEADERS.map((day) => (
              <div
                key={day}
                className="py-1 text-center text-[11px] font-black uppercase text-neo-ink"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-rows-6 gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid min-h-0 grid-cols-7 gap-1">
                {week.map((day, di) => {
                  if (!day.isCurrentMonth || day.date === 0) {
                    return <div key={di} className="min-h-0 rounded-none" />;
                  }

                  const style = STATUS_STYLES[day.status];

                  return (
                    <div
                      key={di}
                      className={cn(
                        'relative flex min-h-0 flex-col items-center justify-center gap-0.5 rounded-none border-2 transition-colors duration-100 ease-linear',
                        style.cell,
                        day.isToday && 'outline outline-2 outline-offset-[-2px] outline-neo-ink shadow-neo-sm',
                        day.status !== 'future' &&
                          'cursor-pointer hover:-translate-y-px hover:shadow-neo-sm',
                      )}
                      onMouseEnter={(e) => {
                        if (day.status === 'future') return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          day,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 8,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <span
                        className={cn(
                          'text-[13px] font-black tabular-nums leading-none md:text-[14px]',
                          day.isToday
                            ? 'text-neo-ink'
                            : day.status === 'future'
                              ? 'text-neo-ink/25'
                              : 'text-neo-ink',
                        )}
                      >
                        {day.date}
                      </span>
                      {day.status !== 'future' && (
                        <span
                          className={cn('h-1.5 w-1.5 rounded-none border border-neo-ink', style.dot)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex shrink-0 items-center justify-center gap-4 border-t-4 border-neo-ink px-4 py-2 md:gap-5">
        {(
          Object.entries(STATUS_STYLES) as [
            DayStatus,
            (typeof STATUS_STYLES)['present'],
          ][]
        )
          .filter(([key]) => key !== 'future')
          .map(([key, style]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className={cn(
                  'h-2 w-2 rounded-none border border-neo-ink',
                  style.swatch,
                )}
              />
              <span className="text-[11px] font-black uppercase text-neo-ink">
                {style.label}
              </span>
            </div>
          ))}
      </div>

      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-none border-4 border-neo-ink bg-neo-white px-2.5 py-1.5 text-[12px] shadow-neo-sm"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <p className="font-black uppercase">{formattedDate(tooltip.day.iso)}</p>
          <p className="mt-0.5 font-black uppercase text-neo-ink">
            {STATUS_STYLES[tooltip.day.status].label}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function formattedDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
