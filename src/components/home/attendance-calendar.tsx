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

const STATUS_STYLES: Record<DayStatus, { cell: string; dot: string; label: string }> = {
  present: {
    cell: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50',
    dot: 'bg-emerald-500',
    label: 'Present',
  },
  absent: {
    cell: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50',
    dot: 'bg-red-500',
    label: 'Absent',
  },
  late: {
    cell: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50',
    dot: 'bg-amber-500',
    label: 'Late',
  },
  holiday: {
    cell: 'bg-muted/30 border-border/30',
    dot: 'bg-muted-foreground/30',
    label: 'Holiday',
  },
  future: {
    cell: 'bg-transparent border-transparent',
    dot: 'bg-transparent',
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
  iso: string; // YYYY-MM-DD
  status: DayStatus;
  isCurrentMonth: boolean;
  isToday: boolean;
}

function buildCalendarGrid(year: number, month: number, data: typeof ATTENDANCE_HEATMAP): CalendarDay[][] {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  // Build a lookup map from date string → status
  const statusMap = new Map<string, DayStatus>();
  for (const d of data) {
    statusMap.set(d.date, d.status);
  }

  // First day of the month
  const firstDay = new Date(Date.UTC(year, month, 1));
  // Day of week: 0=Sun → grid col 6, 1=Mon → grid col 0, ...
  const startCol = firstDay.getUTCDay() === 0 ? 6 : firstDay.getUTCDay() - 1;

  // Number of days in the month
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  // Build flat array of 42 cells (6 weeks × 7 days)
  const flat: CalendarDay[] = [];
  const totalCells = 42;

  for (let i = 0; i < totalCells; i++) {
    if (i < startCol) {
      // Before month starts — empty cell
      flat.push({ date: 0, iso: '', status: 'future', isCurrentMonth: false, isToday: false });
    } else {
      const dayNum = i - startCol + 1;
      if (dayNum > daysInMonth) {
        // After month ends — empty cell
        flat.push({ date: 0, iso: '', status: 'future', isCurrentMonth: false, isToday: false });
      } else {
        const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
        const status = statusMap.get(iso) || 'future';
        flat.push({
          date: dayNum,
          iso,
          status,
          isCurrentMonth: true,
          isToday: iso === todayStr,
        });
      }
    }
  }

  // Chunk into weeks
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < flat.length; i += 7) {
    weeks.push(flat.slice(i, i + 7));
  }
  return weeks;
}

// ─── Component ───────────────────────────────────────────

export function AttendanceCalendar() {
  const months = useMemo(() => groupByMonth(ATTENDANCE_HEATMAP), []);
  const today = new Date();
  const currentKey = `${today.getFullYear()}-${today.getMonth()}`;
  const initialIdx = Math.max(0, months.findIndex((m) => m.key === currentKey));
  const [monthIndex, setMonthIndex] = useState(initialIdx >= 0 ? initialIdx : months.length - 1);
  const [tooltip, setTooltip] = useState<{ day: CalendarDay; x: number; y: number } | null>(null);

  const currentMonth = months[monthIndex];
  if (!currentMonth) return null;

  const weeks = useMemo(
    () => buildCalendarGrid(currentMonth.year, currentMonth.month, ATTENDANCE_HEATMAP),
    [currentMonth],
  );

  // Monthly stats
  const stats = useMemo(() => {
    const days = currentMonth.days;
    const p = days.filter((d) => d.status === 'present').length;
    const a = days.filter((d) => d.status === 'absent').length;
    const l = days.filter((d) => d.status === 'late').length;
    const total = p + a + l;
    return {
      present: p,
      absent: a,
      late: l,
      total,
      pct: total > 0 ? ((p / total) * 100).toFixed(1) : '0',
    };
  }, [currentMonth]);

  const canPrev = monthIndex > 0;
  const canNext = monthIndex < months.length - 1;

  // All-time stats
  const allTime = useMemo(() => {
    const p = ATTENDANCE_HEATMAP.filter((d) => d.status === 'present').length;
    const a = ATTENDANCE_HEATMAP.filter((d) => d.status === 'absent').length;
    const l = ATTENDANCE_HEATMAP.filter((d) => d.status === 'late').length;
    const total = p + a + l;
    return { pct: total > 0 ? ((p / total) * 100).toFixed(1) : '0' };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' as const }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-base font-semibold tracking-tight">Attendance</h3>
          <span className="text-sm font-bold text-emerald-500 tabular-nums ml-1">
            {allTime.pct}%
          </span>
        </div>

        {/* Month Navigator */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => canPrev && setMonthIndex(monthIndex - 1)}
            disabled={!canPrev}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              canPrev
                ? 'hover:bg-muted text-foreground'
                : 'text-muted-foreground/30 cursor-default',
            )}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-sm font-semibold min-w-[120px] text-center tabular-nums">
            {MONTH_NAMES[currentMonth.month]} {currentMonth.year}
          </span>

          <button
            onClick={() => canNext && setMonthIndex(monthIndex + 1)}
            disabled={!canNext}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              canNext
                ? 'hover:bg-muted text-foreground'
                : 'text-muted-foreground/30 cursor-default',
            )}
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Month stats compact */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {stats.present}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            {stats.absent}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {stats.late}
          </span>
        </div>
      </div>

      {/* ── Calendar Grid ────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.key}
          initial={{ opacity: 0, x: monthIndex > initialIdx ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: monthIndex > initialIdx ? -20 : 20 }}
          transition={{ duration: 0.2 }}
          className="p-4 md:p-5"
        >
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_HEADERS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground py-1.5"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Week rows */}
          <div className="space-y-1.5">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1.5">
                {week.map((day, di) => {
                  if (!day.isCurrentMonth || day.date === 0) {
                    return <div key={di} className="aspect-square rounded-lg" />;
                  }

                  const style = STATUS_STYLES[day.status];

                  return (
                    <div
                      key={di}
                      className={cn(
                        'relative aspect-square rounded-lg border flex flex-col items-center justify-center transition-all duration-150',
                        style.cell,
                        day.isToday && 'ring-2 ring-primary ring-offset-1 ring-offset-background',
                        day.status !== 'future' && 'cursor-pointer hover:scale-[1.08] hover:shadow-md hover:z-10',
                      )}
                      onMouseEnter={(e) => {
                        if (day.status === 'future') return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({ day, x: rect.left + rect.width / 2, y: rect.top - 8 });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <span
                        className={cn(
                          'text-sm font-semibold tabular-nums leading-none',
                          day.isToday
                            ? 'text-primary'
                            : day.status === 'future'
                              ? 'text-muted-foreground/30'
                              : 'text-foreground',
                        )}
                      >
                        {day.date}
                      </span>

                      {/* Status dot */}
                      {day.status !== 'future' && (
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full mt-0.5',
                            style.dot,
                          )}
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

      {/* ── Legend ───────────────────────────────────── */}
      <div className="flex items-center justify-center gap-4 md:gap-6 px-5 py-3 border-t border-border/50 flex-wrap">
        {(Object.entries(STATUS_STYLES) as [DayStatus, typeof STATUS_STYLES['present']][])
          .filter(([key]) => key !== 'future')
          .map(([key, style]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={cn('w-2.5 h-2.5 rounded-full', style.dot)} />
              <span className="text-xs text-muted-foreground">{style.label}</span>
            </div>
          ))}
      </div>

      {/* ── Tooltip ──────────────────────────────────── */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 rounded-xl bg-popover border border-border shadow-xl text-xs"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <p className="font-medium">{formattedDate(tooltip.day.iso)}</p>
          <p
            className={cn(
              'font-semibold mt-0.5',
              tooltip.day.status === 'present' && 'text-emerald-500',
              tooltip.day.status === 'absent' && 'text-red-500',
              tooltip.day.status === 'late' && 'text-amber-500',
              tooltip.day.status === 'holiday' && 'text-muted-foreground',
            )}
          >
            {STATUS_STYLES[tooltip.day.status].label}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// Helper for tooltip date formatting
function formattedDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
