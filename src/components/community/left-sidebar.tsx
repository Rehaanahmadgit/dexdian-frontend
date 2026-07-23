'use client';

import {
  Calendar,
  BookOpen,
  Medal,
  Award,
  Users,
  Bookmark,
  Settings,
} from 'lucide-react';
import { STUDENT, HERO_STATS, SUBJECT_MARKS, FRIENDS } from '@/src/lib/dummy-data';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import { cn } from '@/src/lib/utils';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const QUICK_STATS = [
  {
    icon: Calendar,
    label: 'Attend.',
    value: `${HERO_STATS.attendance.value}%`,
    bg: 'bg-neo-accent',
  },
  {
    icon: BookOpen,
    label: 'Avg',
    value: `${Math.round(
      (SUBJECT_MARKS.reduce((a, b) => a + b.score / b.maxScore, 0) /
        SUBJECT_MARKS.length) *
        100,
    )}%`,
    bg: 'bg-neo-secondary',
  },
  {
    icon: Medal,
    label: 'Rank',
    value: '5th',
    bg: 'bg-neo-muted',
  },
  {
    icon: Award,
    label: 'Grade',
    value: HERO_STATS.grade.value,
    bg: 'bg-neo-white',
  },
];

const MENU_ITEMS = [
  { icon: Users, label: 'My Network', count: FRIENDS.length },
  { icon: Bookmark, label: 'Saved Posts', count: 8 },
  { icon: Settings, label: 'Preferences', count: null },
];

export function CommunityLeftSidebar() {
  const initials = getInitials(STUDENT.name);

  return (
    <aside className="space-y-4">
      <div className="overflow-hidden border-4 border-neo-ink bg-neo-white shadow-neo-md transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-neo-lg">
        <div className="h-16 border-b-4 border-neo-ink bg-neo-accent neo-texture-halftone" />
        <div className="px-4 pb-4">
          <div className="mb-2 flex justify-center -mt-8">
            <Avatar className="h-16 w-16 rounded-none border-4 border-neo-ink bg-neo-secondary shadow-neo-sm">
              <AvatarFallback className="rounded-none bg-neo-secondary text-base font-black text-neo-ink">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="mb-3 text-center">
            <h3 className="text-sm font-black uppercase tracking-tight">
              {STUDENT.name}
            </h3>
            <p className="mt-0.5 text-xs font-bold">
              Grade {STUDENT.grade}-{STUDENT.section} · #{STUDENT.rollNo}
            </p>
          </div>
          <div className="my-3 border-t-4 border-neo-ink" />
          <div className="grid grid-cols-2 gap-2">
            {QUICK_STATS.map(({ icon: Icon, label, value, bg }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 border-2 border-neo-ink bg-neo-bg p-2"
              >
                <div
                  className={cn(
                    'flex h-7 w-7 items-center justify-center border-2 border-neo-ink',
                    bg,
                  )}
                >
                  <Icon className="h-3.5 w-3.5 stroke-[3px]" />
                </div>
                <span className="text-sm font-black leading-none">{value}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-4 border-neo-ink bg-neo-white shadow-neo-sm">
        <div className="border-b-4 border-neo-ink bg-neo-secondary px-4 py-2.5">
          <h4 className="text-xs font-black uppercase tracking-widest">
            Shortcuts
          </h4>
        </div>
        <div className="p-1.5">
          {MENU_ITEMS.map(({ icon: Icon, label, count }) => (
            <button
              key={label}
              type="button"
              className="flex w-full items-center gap-2.5 border-2 border-transparent px-2 py-2 text-left transition-all duration-100 ease-linear hover:border-neo-ink hover:bg-neo-accent hover:shadow-neo-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center border-4 border-neo-ink bg-neo-muted">
                <Icon className="h-4 w-4 stroke-[3px]" />
              </div>
              <span className="flex-1 text-xs font-black uppercase tracking-wide">
                {label}
              </span>
              {count !== null && (
                <span className="border-2 border-neo-ink bg-neo-secondary px-1.5 text-[11px] font-black">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
