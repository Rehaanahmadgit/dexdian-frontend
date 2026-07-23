'use client';

import { motion } from 'framer-motion';
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
    <div className="rounded-md border border-border bg-popover px-3 py-2 shadow-lg text-[12px]">
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: data.fill }}
        />
        <span className="font-semibold text-foreground">{name}</span>
        <span className="tabular-nums text-muted-foreground ml-1">{value}</span>
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
      delay={0.18}
    >
      <div className="flex flex-col h-full">
        <div className="relative flex-1 min-h-[200px]">
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
                animationDuration={1100}
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
            <span className="text-[1.5rem] font-semibold text-foreground tabular-nums leading-none">
              {total}
            </span>
            <span className="text-[11px] text-muted-foreground mt-1">Total</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          {HOMEWORK_COMPLETION.map((item, i) => (
            <motion.div
              key={item.status}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="flex items-center gap-2 rounded-md bg-muted/50 px-2.5 py-2"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.fill }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-muted-foreground truncate">
                  {item.status}
                </p>
                <p
                  className="text-[15px] font-semibold tabular-nums leading-tight"
                  style={{ color: item.fill }}
                >
                  {item.count}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
