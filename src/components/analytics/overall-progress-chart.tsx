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

// ─── Component ───────────────────────────────────────────

export function OverallProgressChart() {
  return (
    <ChartCard
      title="Overall Academic Progress"
      subtitle="Performance across attendance, academics, and engagement"
      icon={Target}
      delay={0.3}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,320px)] gap-4 items-center">
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart
            data={OVERALL_PROGRESS}
            cx="50%"
            cy="50%"
            outerRadius="72%"
          >
            <PolarGrid stroke="#E0E0E0" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: '#616161' }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#8A8886' }}
            />
            <Radar
              name="Your Score"
              dataKey="score"
              stroke="#0F6CBD"
              fill="#0F6CBD"
              fillOpacity={0.22}
              strokeWidth={2}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
          {OVERALL_PROGRESS.map((metric, i) => (
            <motion.div
              key={metric.category}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.06, duration: 0.3 }}
              whileHover={{ x: 2 }}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/40 px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-foreground truncate">
                  {metric.category}
                </p>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.score}%` }}
                    transition={{
                      delay: 0.5 + i * 0.06,
                      duration: 0.55,
                      ease: 'easeOut',
                    }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
              <span className="text-[15px] font-semibold text-primary tabular-nums shrink-0">
                {metric.score}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
