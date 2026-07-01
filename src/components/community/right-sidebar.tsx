'use client';

import { motion } from 'framer-motion';
import { Users, MessageCircle, Bell, UserPlus } from 'lucide-react';
import { FRIENDS, NOTIFICATIONS, SUGGESTED_FRIENDS } from '@/src/lib/dummy-data';
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

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

const NOTIF_ICONS: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  like: { icon: Users, color: 'text-red-500 bg-red-50 dark:bg-red-950/30' },
  comment: { icon: MessageCircle, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' },
  follow: { icon: UserPlus, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' },
  mention: { icon: Bell, color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/30' },
  share: { icon: Users, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
};

// ─── Component ───────────────────────────────────────────

export function CommunityRightSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' as const, delay: 0.1 }}
      className="space-y-3"
    >
      {/* Friends List */}
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-[13px] font-semibold">Friends</h3>
          <span className="text-[11px] text-muted-foreground">
            {FRIENDS.filter((f) => f.isOnline).length} online
          </span>
        </div>
        <div className="space-y-1">
          {FRIENDS.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="relative">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-[9px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-primary font-bold">
                    {getInitials(friend.name)}
                  </AvatarFallback>
                </Avatar>
                {/* Online dot */}
                <span
                  className={cn(
                    'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background',
                    friend.isOnline ? 'bg-emerald-500' : 'bg-muted-foreground/40',
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">{friend.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {friend.isOnline
                    ? 'Online'
                    : friend.lastSeen
                      ? `Last seen ${friend.lastSeen}`
                      : 'Offline'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-[13px] font-semibold">Notifications</h3>
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            {NOTIFICATIONS.filter((n) => !n.read).length}
          </span>
        </div>
        <div className="space-y-0.5">
          {NOTIFICATIONS.map((notif) => {
            const { icon: Icon, color } = NOTIF_ICONS[notif.type];
            return (
              <div
                key={notif.id}
                className={cn(
                  'flex items-start gap-2 p-1.5 rounded-md transition-colors cursor-pointer',
                  !notif.read
                    ? 'bg-primary/5 hover:bg-primary/10'
                    : 'hover:bg-muted/50',
                )}
              >
                <div className={cn('p-1 rounded-md', color)}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] leading-tight">
                    <span className="font-semibold">{notif.by}</span>{' '}
                    <span className="text-muted-foreground">{notif.message}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {timeAgo(notif.timestamp)}
                  </p>
                </div>
                {!notif.read && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Friends */}
      <div className="rounded-lg border border-border bg-card p-3">
        <h3 className="text-[13px] font-semibold mb-2.5">Suggested Friends</h3>
        <div className="space-y-1">
          {SUGGESTED_FRIENDS.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Avatar className="w-7 h-7">
                <AvatarFallback className="text-[9px] bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 font-bold">
                  {getInitials(friend.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">{friend.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  Grade {friend.grade}
                </p>
              </div>
              <button className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-semibold hover:bg-primary/20 transition-colors">
                <UserPlus className="w-3 h-3" />
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
