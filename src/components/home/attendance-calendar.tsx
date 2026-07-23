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
    cell: 'bg-[#F1FAF1] border-[#9FD89F]',
    dot: 'bg-[#107C10]',
    label: 'Present',
  },
  absent: {
    cell: 'bg-[#FDF3F4] border-[#F1B6BC]',
    dot: 'bg-[#C50F1F]',
    label: 'Absent',
  },
  late: {
    cell: 'bg-[#FFF9F5] border-[#F5D0B5]',
    dot: 'bg-[#8A3707]',
    label: 'Late',
  },
  holiday: {
    cell: 'bg-muted/40 border-border',
    dot: 'bg-muted-foreground/35',
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
      transition={{ delay: 0.15, duration: 0.35, ease: 'easeOut' as const }}
      className="rounded-lg border border-border bg-card shadow-sm h-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-[15px] font-semibold text-foreground">Attendance</h3>
          <span className="text-[14px] font-semibold text-primary tabular-nums">
            {allTime.pct}%
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => canPrev && setMonthIndex(monthIndex - 1)}
            disabled={!canPrev}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              canPrev
                ? 'hover:bg-muted text-foreground'
                : 'text-muted-foreground/30 cursor-default',
            )}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[14px] font-semibold min-w-[128px] text-center tabular-nums">
            {MONTH_NAMES[currentMonth.month]} {currentMonth.year}
          </span>
          <button
            onClick={() => canNext && setMonthIndex(monthIndex + 1)}
            disabled={!canNext}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              canNext
                ? 'hover:bg-muted text-foreground'
                : 'text-muted-foreground/30 cursor-default',
            )}
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#107C10]" />
            {stats.present}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#C50F1F]" />
            {stats.absent}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#8A3707]" />
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
          transition={{ duration: 0.15 }}
          className="flex-1 min-h-0 flex flex-col px-3 pt-2.5 pb-1.5 md:px-4"
        >
          <div className="grid grid-cols-7 mb-1 shrink-0">
            {DAY_HEADERS.map((day) => (
              <div
                key={day}
                className="text-center text-[12px] font-semibold text-muted-foreground py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-0 grid grid-rows-6 gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1 min-h-0">
                {week.map((day, di) => {
                  if (!day.isCurrentMonth || day.date === 0) {
                    return <div key={di} className="min-h-0 rounded-md" />;
                  }

                  const style = STATUS_STYLES[day.status];

                  return (
                    <div
                      key={di}
                      className={cn(
                        'relative min-h-0 rounded-md border flex flex-col items-center justify-center gap-0.5 transition-colors',
                        style.cell,
                        day.isToday && 'ring-2 ring-primary ring-offset-1 ring-offset-card',
                        day.status !== 'future' && 'cursor-pointer hover:brightness-[0.98]',
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
                          'text-[13px] md:text-[14px] font-semibold tabular-nums leading-none',
                          day.isToday
                            ? 'text-primary'
                            : day.status === 'future'
                              ? 'text-muted-foreground/30'
                              : 'text-foreground',
                        )}
                      >
                        {day.date}
                      </span>
                      {day.status !== 'future' && (
                        <span className={cn('w-1.5 h-1.5 rounded-full', style.dot)} />
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
      <div className="flex items-center justify-center gap-4 md:gap-5 px-4 py-2 border-t border-border shrink-0">
        {(
          Object.entries(STATUS_STYLES) as [
            DayStatus,
            (typeof STATUS_STYLES)['present'],
          ][]
        )
          .filter(([key]) => key !== 'future')
          .map(([key, style]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={cn('w-2 h-2 rounded-full', style.dot)} />
              <span className="text-[12px] text-muted-foreground">{style.label}</span>
            </div>
          ))}
      </div>

      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1.5 rounded-md bg-popover border border-border shadow-lg text-[12px]"
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
              tooltip.day.status === 'present' && 'text-[#107C10]',
              tooltip.day.status === 'absent' && 'text-[#C50F1F]',
              tooltip.day.status === 'late' && 'text-[#8A3707]',
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

function formattedDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
