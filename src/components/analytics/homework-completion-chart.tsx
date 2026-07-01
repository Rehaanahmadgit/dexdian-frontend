'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { HOMEWORK_COMPLETION } from '@/src/lib/dummy-data';
import { ChartCard } from '@/src/components/analytics/chart-card';

// ─── Custom Tooltip ──────────────────────────────────────

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { fill: string } }>;
}) {
  if (!active || !payload?.[0]) return null;
  const { name, value, payload: data } = payload[0];
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg text-xs">
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: data.fill }}
        />
        <span className="font-semibold">{name}:</span>
        <span>{value}</span>
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────

export function HomeworkCompletionChart() {
  const total = HOMEWORK_COMPLETION.reduce((sum, d) => sum + d.count, 0);

  return (
    <ChartCard
      title="Homework Overview"
      subtitle={`${total} total assignments this semester`}
      delay={0.3}
      className="h-full flex flex-col overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto min-h-0 -mr-1 pr-1">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={HOMEWORK_COMPLETION}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="count"
              nameKey="status"
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {HOMEWORK_COMPLETION.map((entry) => (
                <Cell key={entry.status} fill={entry.fill} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Quick stats row */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {HOMEWORK_COMPLETION.map((item) => (
            <div key={item.status} className="text-center">
              <p className="text-lg font-bold" style={{ color: item.fill }}>
                {item.count}
              </p>
              <p className="text-[10px] text-muted-foreground">{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
