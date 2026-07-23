'use client';

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
import { cn } from '@/src/lib/utils';

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
    bg: 'bg-neo-accent',
    rotate: 'rotate-1',
  },
  {
    label: 'Avg Score',
    value: `${avgScore}%`,
    hint: '6 subjects',
    icon: TrendingUp,
    bg: 'bg-neo-secondary',
    rotate: '-rotate-1',
  },
  {
    label: 'Grade',
    value: HERO_STATS.grade.value,
    hint: HERO_STATS.grade.change,
    icon: GraduationCap,
    bg: 'bg-neo-muted',
    rotate: 'rotate-2',
  },
  {
    label: 'Study Hrs',
    value: `${weeklyHours}h`,
    hint: 'This week',
    icon: BookOpen,
    bg: 'bg-neo-white',
    rotate: '-rotate-2',
  },
] as const;

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8 md:py-10">
      <header className="flex flex-col gap-4 border-b-4 border-neo-ink pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 inline-block -rotate-1 border-4 border-neo-ink bg-neo-accent px-2 py-0.5 text-xs font-black uppercase tracking-[0.2em] shadow-neo-sm">
            Insights
          </p>
          <h1 className="text-4xl font-black uppercase leading-none tracking-tighter neo-text-shadow sm:text-5xl md:text-6xl">
            Analytics
          </h1>
          <p className="mt-3 max-w-lg text-lg font-bold leading-snug">
            Track academic progress with loud, clear metrics.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 self-start border-4 border-neo-ink bg-neo-secondary px-3 py-2 text-xs font-black uppercase tracking-wide shadow-neo-sm sm:self-auto">
          <ClipboardList className="h-4 w-4 stroke-[3px]" />
          Semester overview
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map(({ label, value, hint, icon: Icon, bg, rotate }) => (
          <div
            key={label}
            className={cn(
              'flex items-center gap-3 border-4 border-neo-ink bg-neo-white p-3 shadow-neo-sm',
              'transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-neo-md',
              rotate,
            )}
          >
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center border-4 border-neo-ink',
                bg,
              )}
            >
              <Icon className="h-6 w-6 stroke-[3px]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest">
                {label}
              </p>
              <p className="text-2xl font-black tabular-nums leading-none">
                {value}
              </p>
              <p className="truncate text-[11px] font-bold">{hint}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="min-h-[360px] lg:col-span-7">
          <AttendanceTrendChart />
        </div>
        <div className="min-h-[360px] lg:col-span-5">
          <HomeworkCompletionChart />
        </div>
        <div className="min-h-[340px] lg:col-span-5">
          <SubjectPerformanceChart />
        </div>
        <div className="min-h-[340px] lg:col-span-7">
          <WeeklyStudyHoursChart />
        </div>
        <div className="lg:col-span-12">
          <OverallProgressChart />
        </div>
      </div>
    </div>
  );
}
