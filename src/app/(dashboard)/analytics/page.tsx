import { AttendanceTrendChart } from '@/src/components/analytics/attendance-trend-chart';
import { SubjectPerformanceChart } from '@/src/components/analytics/subject-performance-chart';
import { HomeworkCompletionChart } from '@/src/components/analytics/homework-completion-chart';
import { WeeklyStudyHoursChart } from '@/src/components/analytics/weekly-study-chart';
import { OverallProgressChart } from '@/src/components/analytics/overall-progress-chart';

// ─── Analytics Page ──────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track your academic performance and progress
        </p>
      </div>

      {/* Top row: 2 columns — right side split 50/50 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceTrendChart />
        <div className="flex flex-col gap-2 h-full">
          <div className="flex-1 min-h-0 overflow-hidden rounded-xl">
            <HomeworkCompletionChart />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden rounded-xl">
            <SubjectPerformanceChart />
          </div>
        </div>
      </div>

      {/* Middle row: full width */}
      <div className="grid grid-cols-1 gap-6">
        <WeeklyStudyHoursChart />
      </div>

      {/* Bottom: Full width */}
      <OverallProgressChart />
    </div>
  );
}
