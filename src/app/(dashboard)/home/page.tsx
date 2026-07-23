'use client';

import { CalendarCheck, BookOpen, GraduationCap, ClipboardList } from 'lucide-react';
import { AttendanceCalendar } from '@/src/components/home/attendance-calendar';
import { SubjectMarks } from '@/src/components/home/subject-marks';
import { HomeworkCards } from '@/src/components/home/homework-cards';
import { PeriodTimetable } from '@/src/components/home/period-timetable';
import { useAuthStore } from '@/src/stores/auth-store';
import { HERO_STATS } from '@/src/lib/dummy-data';

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

const QUICK_STATS = [
  {
    label: 'Attendance',
    value: `${HERO_STATS.attendance.value}%`,
    hint: HERO_STATS.attendance.change,
    icon: CalendarCheck,
    accent: 'text-primary bg-accent',
  },
  {
    label: 'Current Grade',
    value: HERO_STATS.grade.value,
    hint: HERO_STATS.grade.change,
    icon: GraduationCap,
    accent: 'text-[#107C10] bg-[#F1FAF1]',
  },
  {
    label: 'Pending Work',
    value: String(HERO_STATS.pendingHomework.value),
    hint: HERO_STATS.pendingHomework.change,
    icon: BookOpen,
    accent: 'text-[#8A3707] bg-[#FFF9F5]',
  },
  {
    label: 'Upcoming Exams',
    value: String(HERO_STATS.upcomingExams.value),
    hint: HERO_STATS.upcomingExams.change,
    icon: ClipboardList,
    accent: 'text-[#115EA3] bg-[#E8F3FC]',
  },
] as const;

// ─── Home Page ───────────────────────────────────────────

export default function HomePage() {
  const { user } = useAuthStore();
  const firstName = user?.name?.split(' ')[0] || 'Student';

  return (
    <div className="max-w-7xl mx-auto px-4 py-5 md:px-8 md:py-7 space-y-5">
      {/* ── Header ──────────────────────────────────── */}
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-4 border-b border-border">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-primary mb-1">
            Student Dashboard
          </p>
          <h1 className="text-[1.75rem] md:text-[2rem] font-semibold tracking-tight text-foreground leading-none">
            {getGreeting()}, {firstName}
          </h1>
        </div>
        <p className="text-[14px] text-muted-foreground sm:text-right">
          {formatDate()}
        </p>
      </header>

      {/* ── Quick stats ─────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {QUICK_STATS.map(({ label, value, hint, icon: Icon, accent }) => (
          <div
            key={label}
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
          </div>
        ))}
      </div>

      {/* ── Main panels: equal height, balanced split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:h-[560px]">
        <div className="lg:col-span-7 min-h-[420px] lg:min-h-0 h-full">
          <AttendanceCalendar />
        </div>

        <div className="lg:col-span-5 grid grid-rows-2 gap-4 min-h-[480px] lg:min-h-0 h-full">
          <div className="min-h-0 overflow-hidden">
            <HomeworkCards />
          </div>
          <div className="min-h-0 overflow-hidden">
            <SubjectMarks />
          </div>
        </div>
      </div>

      {/* ── Timetable ───────────────────────────────── */}
      <PeriodTimetable />
    </div>
  );
}
