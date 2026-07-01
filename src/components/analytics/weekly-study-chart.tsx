'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { WEEKLY_STUDY_HOURS } from '@/src/lib/dummy-data';
import { ChartCard } from '@/src/components/analytics/chart-card';

// ─── Custom Tooltip ──────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold">{entry.value}h</span>
        </div>
      ))}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────

export function WeeklyStudyHoursChart() {
  return (
    <ChartCard
      title="Weekly Study Hours"
      subtitle="Daily study time vs daily target"
      delay={0.45}
    >
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={WEEKLY_STUDY_HOURS}>
          <defs>
            <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            className="text-muted-foreground text-xs"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            className="text-muted-foreground text-xs"
            unit="h"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Area
            type="monotone"
            dataKey="hours"
            name="Study Hours"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#studyGradient)"
            animationDuration={1200}
            animationEasing="ease-out"
          />
          <Area
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="#f59e0b"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            fill="none"
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
