'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ATTENDANCE_HEATMAP, type DayStatus } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Constants ───────────────────────────────────────────

const STATUS_COLORS: Record<DayStatus, string> = {
  present: 'bg-emerald-500 dark:bg-emerald-400',
  absent: 'bg-red-400 dark:bg-red-500',
  late: 'bg-amber-400 dark:bg-amber-500',
  holiday: 'bg-muted',
  future: 'bg-muted/30',
};

const STATUS_LABELS: Record<DayStatus, string> = {
  present: 'Present',
  absent: 'Absent',
  late: 'Late',
  holiday: 'Holiday',
  future: 'Future',
};

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const DAY_NAMES = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

// ─── Helpers ─────────────────────────────────────────────

interface TooltipInfo {
  date: string;
  status: DayStatus;
  x: number;
  y: number;
}

// Group heatmap data by week
function groupByWeeks(data: typeof ATTENDANCE_HEATMAP) {
  const weeks: (typeof ATTENDANCE_HEATMAP)[] = [];
  let currentWeek: typeof ATTENDANCE_HEATMAP = [];

  for (const day of data) {
    const d = new Date(day.date);
    const dayOfWeek = d.getDay();
    currentWeek.push(day);
    if (dayOfWeek === 6 || day === data[data.length - 1]) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  return weeks;
}

// ─── Component ───────────────────────────────────────────

export function AttendanceHeatmap() {
  const weeks = groupByWeeks(ATTENDANCE_HEATMAP);
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);

  // Get unique months for labels
  const monthLabels: { label: string; index: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    if (week.length > 0) {
      const month = new Date(week[0].date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTH_NAMES[month], index: i });
        lastMonth = month;
      }
    }
  });

  // Stats
  const presentCount = ATTENDANCE_HEATMAP.filter((d) => d.status === 'present').length;
  const absentCount = ATTENDANCE_HEATMAP.filter((d) => d.status === 'absent').length;
  const lateCount = ATTENDANCE_HEATMAP.filter((d) => d.status === 'late').length;
  const totalDays = presentCount + absentCount + lateCount;
  const attendancePct = totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(1) : '0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' as const }}
      className="rounded-xl border border-border p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Attendance History</h3>
        <span className="text-sm font-bold text-emerald-500">{attendancePct}%</span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {(['present', 'absent', 'late', 'holiday'] as DayStatus[]).map((status) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={cn('w-3 h-3 rounded-sm', STATUS_COLORS[status])} />
            <span className="text-xs text-muted-foreground">{STATUS_LABELS[status]}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-0.5 min-w-max">
          {/* Month labels */}
          <div className="flex ml-8 mb-1">
            {monthLabels.map(({ label, index }, i) => (
              <span
                key={i}
                className="text-[10px] text-muted-foreground"
                style={{ marginLeft: i === 0 ? index * 15 : (index - monthLabels[i - 1].index - 1) * 15 + 10 }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Day rows */}
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
            if (dayIndex === 0) return null; // Skip Sunday row
            return (
              <div key={dayIndex} className="flex items-center gap-0.5">
                <span className="w-8 text-[10px] text-muted-foreground text-right pr-1.5">
                  {DAY_NAMES[dayIndex]}
                </span>
                {weeks.map((week, wi) => {
                  const day = week.find(
                    (d) => new Date(d.date).getDay() === dayIndex,
                  );
                  if (!day) return <div key={wi} className="w-[13px] h-[13px]" />;

                  return (
                    <div
                      key={wi}
                      className={cn(
                        'w-[13px] h-[13px] rounded-[2px] cursor-pointer transition-transform hover:scale-125 hover:z-10',
                        STATUS_COLORS[day.status],
                      )}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          date: day.date,
                          status: day.status,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 8,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1.5 rounded-lg bg-popover border border-border shadow-lg text-xs"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <p className="font-medium">
            {new Date(tooltip.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p className={cn(
            'font-semibold',
            tooltip.status === 'present' && 'text-emerald-500',
            tooltip.status === 'absent' && 'text-red-500',
            tooltip.status === 'late' && 'text-amber-500',
            tooltip.status === 'holiday' && 'text-muted-foreground',
          )}>
            {STATUS_LABELS[tooltip.status]}
          </p>
        </div>
      )}
    </motion.div>
  );
}
