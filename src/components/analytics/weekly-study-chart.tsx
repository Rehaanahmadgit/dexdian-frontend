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
import { Clock } from 'lucide-react';
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
    <div className="rounded-md border border-border bg-popover px-3 py-2 shadow-lg text-[12px]">
      <p className="font-semibold mb-1.5 text-foreground">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}</span>
          <span className="font-semibold tabular-nums ml-auto">{entry.value}h</span>
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
      icon={Clock}
      delay={0.26}
    >
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={WEEKLY_STUDY_HOURS}
          margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F6CBD" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#0F6CBD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: '#616161' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#616161' }}
            axisLine={false}
            tickLine={false}
            unit="h"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="hours"
            name="Study Hours"
            stroke="#0F6CBD"
            strokeWidth={2.25}
            fill="url(#studyGradient)"
            animationDuration={1100}
            animationEasing="ease-out"
          />
          <Area
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="#8A3707"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            fill="none"
            animationDuration={1100}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
