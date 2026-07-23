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
    <div className="rounded-none border-4 border-neo-ink bg-neo-white px-3 py-2 text-xs font-bold shadow-neo-sm">
      <p className="mb-1.5 font-black uppercase">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span
            className="h-2.5 w-2.5 shrink-0 border border-neo-ink"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}</span>
          <span className="ml-auto font-black tabular-nums">{entry.value}%</span>
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
      headerBg="bg-neo-secondary"
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={ATTENDANCE_TREND} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#000000" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#000000', fontWeight: 700 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[60, 100]}
            tick={{ fontSize: 12, fill: '#000000', fontWeight: 700 }}
            axisLine={false}
            tickLine={false}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px', fontWeight: 700 }}
            iconType="square"
            iconSize={10}
          />
          <Line
            type="monotone"
            dataKey="attendance"
            name="Attendance"
            stroke="#000000"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#FF6B6B', strokeWidth: 2, stroke: '#000' }}
            activeDot={{ r: 6, fill: '#FFD93D', strokeWidth: 2, stroke: '#000' }}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="target"
            name="Target (85%)"
            stroke="#FF6B6B"
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
