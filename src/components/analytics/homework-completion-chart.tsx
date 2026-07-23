'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ClipboardCheck } from 'lucide-react';
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
    <div className="rounded-none border-4 border-neo-ink bg-neo-white px-3 py-2 shadow-neo-sm text-xs font-bold">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 border border-neo-ink"
          style={{ backgroundColor: data.fill }}
        />
        <span className="font-black uppercase">{name}</span>
        <span className="ml-1 tabular-nums">{value}</span>
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
      subtitle={`${total} assignments this semester`}
      icon={ClipboardCheck}
      headerBg="bg-neo-accent"
    >
      <div className="flex h-full flex-col">
        <div className="relative min-h-[200px] flex-1">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={HOMEWORK_COMPLETION}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={82}
                paddingAngle={3}
                dataKey="count"
                nameKey="status"
                stroke="#000000"
                strokeWidth={2}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {HOMEWORK_COMPLETION.map((entry) => (
                  <Cell key={entry.status} fill={entry.fill} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black tabular-nums leading-none">
              {total}
            </span>
            <span className="mt-1 text-[10px] font-black uppercase tracking-widest">
              Total
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {HOMEWORK_COMPLETION.map((item) => (
            <div
              key={item.status}
              className="flex items-center gap-2 border-2 border-neo-ink bg-neo-bg px-2.5 py-2"
            >
              <span
                className="h-3 w-3 shrink-0 border border-neo-ink"
                style={{ backgroundColor: item.fill }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-black uppercase tracking-widest">
                  {item.status}
                </p>
                <p className="text-base font-black tabular-nums leading-tight">
                  {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
