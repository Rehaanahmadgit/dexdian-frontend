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
    <div className="rounded-none border-4 border-neo-ink bg-neo-white px-3 py-2 text-xs font-bold shadow-neo-sm">
      <p className="mb-1.5 font-black uppercase">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span
            className="h-2.5 w-2.5 shrink-0 border border-neo-ink"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}</span>
          <span className="ml-auto font-black tabular-nums">{entry.value}h</span>
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
      headerBg="bg-neo-muted"
    >
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={WEEKLY_STUDY_HOURS}
          margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#000000" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: '#000000', fontWeight: 700 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#000000', fontWeight: 700 }}
            axisLine={false}
            tickLine={false}
            unit="h"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px', fontWeight: 700 }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="hours"
            name="Study Hours"
            stroke="#000000"
            strokeWidth={2.25}
            fill="url(#studyGradient)"
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Area
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="#FFD93D"
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
