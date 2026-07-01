'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { OVERALL_PROGRESS } from '@/src/lib/dummy-data';
import { ChartCard } from '@/src/components/analytics/chart-card';
import { motion } from 'framer-motion';

// ─── Component ───────────────────────────────────────────

export function OverallProgressChart() {
  return (
    <ChartCard
      title="Overall Academic Progress"
      subtitle="Your performance across all metrics"
      delay={0.6}
    >
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart
          data={OVERALL_PROGRESS}
          cx="50%"
          cy="50%"
          outerRadius="75%"
        >
          <PolarGrid className="stroke-border" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: 11 }}
            className="text-muted-foreground text-xs"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10 }}
            className="text-muted-foreground text-xs"
          />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.25}
            strokeWidth={2}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Metric legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
        {OVERALL_PROGRESS.map((metric, i) => (
          <motion.div
            key={metric.category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.3 }}
            className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-muted/50"
          >
            <span className="text-lg font-bold text-primary">
              {metric.score}%
            </span>
            <span className="text-[10px] text-muted-foreground text-center leading-tight">
              {metric.category}
            </span>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
}
