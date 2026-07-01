'use client';

import { AttendanceCalendar } from '@/src/components/home/attendance-calendar';
import { SubjectMarks } from '@/src/components/home/subject-marks';
import { HomeworkCards } from '@/src/components/home/homework-cards';
import { PeriodTimetable } from '@/src/components/home/period-timetable';
import { useAuthStore } from '@/src/stores/auth-store';

// ─── Helpers ─────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// ─── Home Page ───────────────────────────────────────────

export default function HomePage() {
  const { user } = useAuthStore();
  const firstName = user?.name?.split(' ')[0] || 'Student';

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8 space-y-6 md:space-y-7">
      {/* ── Elegant Header ─────────────────────────────── */}
      <header className="pt-2 md:pt-4">
        <h1 className="text-2xl md:text-[2rem] font-bold tracking-tight leading-tight">
          {getGreeting()},{' '}
          <span className="text-primary">{firstName}</span>
          <span className="ml-1.5 inline-block">👋</span>
        </h1>
        <p className="text-sm md:text-[15px] text-muted-foreground mt-1.5 font-normal">
          {formatDate()}
        </p>
      </header>

      {/* ── Row 1: Calendar (60%) + 50/50 Sidebar (40%) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Attendance Calendar — takes 3/5 width */}
        <div className="lg:col-span-3">
          <AttendanceCalendar />
        </div>

        {/* Right: Homework (top 50%) + Subjects (bottom 50%) */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          <div className="flex-1 min-h-0">
            <HomeworkCards />
          </div>
          <div className="flex-1 min-h-0">
            <SubjectMarks />
          </div>
        </div>
      </div>

      {/* ── Row 2: Timetable — Full Width ──────────────── */}
      <PeriodTimetable />
    </div>
  );
}
