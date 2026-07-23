'use client';

import { CalendarCheck, BookOpen, GraduationCap, ClipboardList } from 'lucide-react';
import { AttendanceCalendar } from '@/src/components/home/attendance-calendar';
import { SubjectMarks } from '@/src/components/home/subject-marks';
import { HomeworkCards } from '@/src/components/home/homework-cards';
import { PeriodTimetable } from '@/src/components/home/period-timetable';
import { useAuthStore } from '@/src/stores/auth-store';
import { HERO_STATS } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

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
    bg: 'bg-neo-accent',
    rotate: 'rotate-1',
  },
  {
    label: 'Grade',
    value: HERO_STATS.grade.value,
    hint: HERO_STATS.grade.change,
    icon: GraduationCap,
    bg: 'bg-neo-secondary',
    rotate: '-rotate-1',
  },
  {
    label: 'Pending',
    value: String(HERO_STATS.pendingHomework.value),
    hint: HERO_STATS.pendingHomework.change,
    icon: BookOpen,
    bg: 'bg-neo-muted',
    rotate: 'rotate-2',
  },
  {
    label: 'Exams',
    value: String(HERO_STATS.upcomingExams.value),
    hint: HERO_STATS.upcomingExams.change,
    icon: ClipboardList,
    bg: 'bg-neo-white',
    rotate: '-rotate-2',
  },
] as const;

export default function HomePage() {
  const { user } = useAuthStore();
  const firstName = user?.name?.split(' ')[0] || 'Student';

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8 md:py-10">
      <header className="flex flex-col gap-4 border-b-4 border-neo-ink pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 inline-block -rotate-1 border-4 border-neo-ink bg-neo-secondary px-2 py-0.5 text-xs font-black uppercase tracking-[0.2em] shadow-neo-sm">
            Dashboard
          </p>
          <h1 className="text-4xl font-black uppercase leading-none tracking-tighter neo-text-shadow sm:text-5xl md:text-6xl">
            {getGreeting()},
            <span className="mt-2 block rotate-1 border-4 border-neo-ink bg-neo-accent px-2 py-1 text-3xl shadow-neo-md sm:inline-block sm:ml-3 sm:mt-0 sm:text-4xl md:text-5xl">
              {firstName}
            </span>
          </h1>
        </div>
        <p className="border-4 border-neo-ink bg-neo-white px-3 py-2 text-sm font-black uppercase tracking-wide shadow-neo-sm">
          {formatDate()}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {QUICK_STATS.map(({ label, value, hint, icon: Icon, bg, rotate }) => (
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
              <p className="text-2xl font-black tabular-nums leading-none">{value}</p>
              <p className="truncate text-[11px] font-bold">{hint}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:h-[560px]">
        <div className="min-h-[420px] h-full lg:col-span-7 lg:min-h-0">
          <AttendanceCalendar />
        </div>
        <div className="grid h-full min-h-[480px] grid-rows-2 gap-6 lg:col-span-5 lg:min-h-0">
          <div className="min-h-0 overflow-hidden">
            <HomeworkCards />
          </div>
          <div className="min-h-0 overflow-hidden">
            <SubjectMarks />
          </div>
        </div>
      </div>

      <PeriodTimetable />
    </div>
  );
}
