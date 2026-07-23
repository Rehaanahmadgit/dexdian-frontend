'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { OVERALL_PROGRESS } from '@/src/lib/dummy-data';
import { ChartCard } from '@/src/components/analytics/chart-card';
import { cn } from '@/src/lib/utils';

// ─── Component ───────────────────────────────────────────

export function OverallProgressChart() {
  return (
    <ChartCard
      title="Overall Academic Progress"
      subtitle="Performance across attendance, academics, and engagement"
      icon={Target}
      headerBg="bg-neo-secondary"
    >
      <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_minmax(0,320px)]">
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart
            data={OVERALL_PROGRESS}
            cx="50%"
            cy="50%"
            outerRadius="72%"
          >
            <PolarGrid stroke="#000000" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 11, fill: '#000000', fontWeight: 700 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#000000', fontWeight: 700 }}
            />
            <Radar
              name="Your Score"
              dataKey="score"
              stroke="#000000"
              fill="#FF6B6B"
              fillOpacity={0.35}
              strokeWidth={2}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {OVERALL_PROGRESS.map((metric, i) => (
            <div
              key={metric.category}
              className="flex items-center justify-between gap-3 border-2 border-neo-ink bg-neo-bg px-3 py-2.5 transition-transform duration-100 ease-linear hover:-translate-x-0.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black uppercase tracking-tight">
                  {metric.category}
                </p>
                <div className="mt-1.5 h-2 overflow-hidden border-2 border-neo-ink bg-neo-white">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.score}%` }}
                    transition={{
                      delay: 0.15 + i * 0.04,
                      duration: 0.4,
                      ease: 'easeOut',
                    }}
                    className={cn(
                      'h-full',
                      i % 3 === 0
                        ? 'bg-neo-accent'
                        : i % 3 === 1
                          ? 'bg-neo-secondary'
                          : 'bg-neo-muted',
                    )}
                  />
                </div>
              </div>
              <span className="shrink-0 border-2 border-neo-ink bg-neo-secondary px-1.5 text-sm font-black tabular-nums">
                {metric.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
