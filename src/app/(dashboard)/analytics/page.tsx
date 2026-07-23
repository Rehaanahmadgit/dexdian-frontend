'use client';

import { motion } from 'framer-motion';
import {
  CalendarCheck,
  GraduationCap,
  BookOpen,
  TrendingUp,
  ClipboardList,
} from 'lucide-react';
import { AttendanceTrendChart } from '@/src/components/analytics/attendance-trend-chart';
import { SubjectPerformanceChart } from '@/src/components/analytics/subject-performance-chart';
import { HomeworkCompletionChart } from '@/src/components/analytics/homework-completion-chart';
import { WeeklyStudyHoursChart } from '@/src/components/analytics/weekly-study-chart';
import { OverallProgressChart } from '@/src/components/analytics/overall-progress-chart';
import { HERO_STATS, SUBJECT_MARKS, WEEKLY_STUDY_HOURS } from '@/src/lib/dummy-data';

// ─── KPI helpers ─────────────────────────────────────────

const avgScore = Math.round(
  (SUBJECT_MARKS.reduce((a, b) => a + b.score / b.maxScore, 0) /
    SUBJECT_MARKS.length) *
    100,
);

const weeklyHours = WEEKLY_STUDY_HOURS.reduce((a, b) => a + b.hours, 0).toFixed(1);

const KPIS = [
  {
    label: 'Attendance',
    value: `${HERO_STATS.attendance.value}%`,
    hint: HERO_STATS.attendance.change,
    icon: CalendarCheck,
    accent: 'text-primary bg-accent',
  },
  {
    label: 'Average Score',
    value: `${avgScore}%`,
    hint: 'Across 6 subjects',
    icon: TrendingUp,
    accent: 'text-[#107C10] bg-[#F1FAF1]',
  },
  {
    label: 'Current Grade',
    value: HERO_STATS.grade.value,
    hint: HERO_STATS.grade.change,
    icon: GraduationCap,
    accent: 'text-[#115EA3] bg-[#E8F3FC]',
  },
  {
    label: 'Study Hours',
    value: `${weeklyHours}h`,
    hint: 'This week',
    icon: BookOpen,
    accent: 'text-[#8A3707] bg-[#FFF9F5]',
  },
] as const;

// ─── Analytics Page ──────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-5 md:px-8 md:py-7 space-y-5">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-4 border-b border-border"
      >
        <div>
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-primary mb-1">
            Performance Insights
          </p>
          <h1 className="text-[1.75rem] md:text-[2rem] font-semibold tracking-tight text-foreground leading-none">
            Analytics
          </h1>
          <p className="text-[14px] text-muted-foreground mt-1.5">
            Track academic progress with clear, actionable metrics
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-md border border-border bg-card px-3 py-1.5 text-[12px] text-muted-foreground shadow-sm">
          <ClipboardList className="w-3.5 h-3.5 text-primary" />
          Semester overview
        </div>
      </motion.header>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map(({ label, value, hint, icon: Icon, accent }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
            whileHover={{ y: -2 }}
            className="rounded-lg border border-border bg-card px-4 py-3.5 shadow-sm flex items-center gap-3"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-md shrink-0 ${accent}`}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-muted-foreground truncate">
                {label}
              </p>
              <p className="text-[1.25rem] font-semibold text-foreground tabular-nums leading-tight">
                {value}
              </p>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                {hint}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Attendance — wide */}
        <div className="lg:col-span-7 min-h-[360px]">
          <AttendanceTrendChart />
        </div>

        {/* Homework — side */}
        <div className="lg:col-span-5 min-h-[360px]">
          <HomeworkCompletionChart />
        </div>

        {/* Subjects */}
        <div className="lg:col-span-5 min-h-[340px]">
          <SubjectPerformanceChart />
        </div>

        {/* Study hours */}
        <div className="lg:col-span-7 min-h-[340px]">
          <WeeklyStudyHoursChart />
        </div>

        {/* Overall radar — full */}
        <div className="lg:col-span-12">
          <OverallProgressChart />
        </div>
      </div>
    </div>
  );
}
