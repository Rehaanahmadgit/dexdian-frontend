'use client';

import { motion } from 'framer-motion';
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
  {
    icon: Calendar,
    label: 'Attendance',
    value: `${HERO_STATS.attendance.value}%`,
    color: 'text-[#107C10]',
  },
  {
    icon: BookOpen,
    label: 'Avg Score',
    value: `${Math.round(
      (SUBJECT_MARKS.reduce((a, b) => a + b.score / b.maxScore, 0) /
        SUBJECT_MARKS.length) *
        100,
    )}%`,
    color: 'text-primary',
  },
  {
    icon: Medal,
    label: 'Rank',
    value: '5th',
    color: 'text-[#8A3707]',
  },
  {
    icon: Award,
    label: 'Grade',
    value: HERO_STATS.grade.value,
    color: 'text-[#115EA3]',
  },
];

const MENU_ITEMS = [
  { icon: Users, label: 'My Network', count: FRIENDS.length },
  { icon: Bookmark, label: 'Saved Posts', count: 8 },
  { icon: Settings, label: 'Preferences', count: null },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -14, y: 6 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
};

// ─── Component ───────────────────────────────────────────

export function CommunityLeftSidebar() {
  const initials = getInitials(STUDENT.name);

  return (
    <motion.aside
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {/* Profile card */}
      <motion.div
        variants={item}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="rounded-lg border border-border bg-card overflow-hidden shadow-sm"
      >
        <div className="relative h-16 bg-gradient-to-br from-[#0C3B5E] via-[#0F6CBD] to-[#2899F5]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 80%, white 0%, transparent 45%)',
            }}
          />
        </div>

        <div className="px-4 pb-4">
          <div className="flex justify-center -mt-8 mb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260 }}
            >
              <Avatar className="w-16 h-16 border-[3px] border-card shadow-sm">
                <AvatarFallback className="text-base bg-accent text-primary font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </div>

          <div className="text-center mb-3">
            <h3 className="font-semibold text-[15px] text-foreground">
              {STUDENT.name}
            </h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Grade {STUDENT.grade}-{STUDENT.section} · Roll #{STUDENT.rollNo}
            </p>
            <p className="text-[12px] text-primary font-medium mt-1 truncate">
              {STUDENT.email}
            </p>
          </div>

          <div className="border-t border-border my-3" />

          <div className="grid grid-cols-2 gap-2">
            {QUICK_STATS.map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="flex flex-col items-center gap-1 p-2 rounded-md bg-muted/60 hover:bg-muted transition-colors"
              >
                <Icon className={cn('w-3.5 h-3.5', color)} />
                <span className="text-[15px] font-semibold leading-none text-foreground">
                  {value}
                </span>
                <span className="text-[11px] text-muted-foreground">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Shortcuts */}
      <motion.div
        variants={item}
        className="rounded-lg border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="px-4 py-2.5 border-b border-border">
          <h4 className="text-[13px] font-semibold text-foreground">Shortcuts</h4>
        </div>
        <div className="p-1.5">
          {MENU_ITEMS.map(({ icon: Icon, label, count }) => (
            <motion.button
              key={label}
              type="button"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-accent text-primary">
                <Icon className="w-4 h-4" />
              </div>
              <span className="flex-1 text-[13px] font-medium text-foreground">
                {label}
              </span>
              {count !== null && (
                <span className="text-[12px] font-semibold text-muted-foreground tabular-nums">
                  {count}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.aside>
  );
}
