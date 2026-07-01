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
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold">{entry.value}%</span>
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
      delay={0}
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={ATTENDANCE_TREND}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            className="text-muted-foreground text-xs"
          />
          <YAxis
            domain={[60, 100]}
            tick={{ fontSize: 12 }}
            className="text-muted-foreground text-xs"
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Line
            type="monotone"
            dataKey="attendance"
            name="Attendance"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#6366f1', strokeWidth: 0 }}
            animationDuration={1200}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="target"
            name="Target (85%)"
            stroke="#ef4444"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            dot={false}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
