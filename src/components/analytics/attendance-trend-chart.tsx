'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { ATTENDANCE_TREND } from '@/src/lib/dummy-data';
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
          <span className="font-semibold tabular-nums ml-auto">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────

export function AttendanceTrendChart() {
  return (
    <ChartCard
      title="Attendance Trend"
      subtitle="Monthly attendance vs school target (85%)"
      icon={TrendingUp}
      delay={0.12}
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={ATTENDANCE_TREND} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#616161' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[60, 100]}
            tick={{ fontSize: 12, fill: '#616161' }}
            axisLine={false}
            tickLine={false}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            iconType="circle"
            iconSize={8}
          />
          <Line
            type="monotone"
            dataKey="attendance"
            name="Attendance"
            stroke="#0F6CBD"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#0F6CBD', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#0F6CBD', strokeWidth: 2, stroke: '#fff' }}
            animationDuration={1100}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="target"
            name="Target (85%)"
            stroke="#C50F1F"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            dot={false}
            animationDuration={1100}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
