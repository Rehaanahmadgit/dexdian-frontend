'use client';

import { motion } from 'framer-motion';
import { Calendar, BookOpen, Medal, Award } from 'lucide-react';
import { STUDENT, HERO_STATS, SUBJECT_MARKS } from '@/src/lib/dummy-data';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import { cn } from '@/src/lib/utils';

// ─── Helpers ─────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const QUICK_STATS = [
  { icon: Calendar, label: 'Attendance', value: `${HERO_STATS.attendance.value}%`, color: 'text-emerald-500' },
  { icon: BookOpen, label: 'Avg Score', value: `${Math.round(SUBJECT_MARKS.reduce((a, b) => a + b.score / b.maxScore, 0) / SUBJECT_MARKS.length * 100)}%`, color: 'text-blue-500' },
  { icon: Medal, label: 'Rank', value: '5th', color: 'text-amber-500' },
  { icon: Award, label: 'Grade', value: HERO_STATS.grade.value, color: 'text-violet-500' },
];

// ─── Component ───────────────────────────────────────────

export function CommunityLeftSidebar() {
  const initials = getInitials(STUDENT.name);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' as const }}
      className="space-y-3"
    >
      {/* Profile Card */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {/* Banner gradient */}
        <div className="h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="px-3 pb-3">
          {/* Avatar */}
          <div className="flex justify-center -mt-7 mb-2">
            <Avatar className="w-14 h-14 border-[3px] border-background ring-1 ring-border/40">
              <AvatarFallback className="text-sm bg-primary/10 text-primary font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Info */}
          <div className="text-center mb-2">
            <h3 className="font-semibold text-[13px]">{STUDENT.name}</h3>
            <p className="text-[11px] text-muted-foreground">
              Grade {STUDENT.grade}-{STUDENT.section} • Roll #{STUDENT.rollNo}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-2" />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-1.5">
            {QUICK_STATS.map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-0.5 p-1.5 rounded-md bg-muted/50"
              >
                <Icon className={cn('w-3.5 h-3.5', color)} />
                <span className="text-base font-bold leading-none">{value}</span>
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
