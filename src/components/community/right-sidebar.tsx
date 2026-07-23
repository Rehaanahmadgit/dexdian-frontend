'use client';

import { motion } from 'framer-motion';
import { Users, MessageCircle, Bell, UserPlus, Send } from 'lucide-react';
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

const MESSAGE_PREVIEWS = [
  'Hey, did you finish the lab report?',
  'Can we revise chapter 5 together?',
  'Thanks for sharing those notes!',
  'See you at practice later.',
  'The assignment deadline is tomorrow.',
  'Congrats on the quiz score!',
  'Are you free after school?',
];

const NOTIF_ICONS: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  like: { icon: Users, color: 'text-[#C50F1F] bg-[#FDF3F4]' },
  comment: { icon: MessageCircle, color: 'text-primary bg-accent' },
  follow: { icon: UserPlus, color: 'text-[#107C10] bg-[#F1FAF1]' },
  mention: { icon: Bell, color: 'text-[#115EA3] bg-accent' },
  share: { icon: Users, color: 'text-[#8A3707] bg-[#FFF9F5]' },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, x: 14, y: 6 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
};

// ─── Component ───────────────────────────────────────────

export function CommunityRightSidebar() {
  const onlineCount = FRIENDS.filter((f) => f.isOnline).length;
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <motion.aside
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain pr-0.5"
    >
      {/* Messages */}
      <motion.div
        variants={item}
        className="rounded-lg border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            <h3 className="text-[14px] font-semibold text-foreground">Messages</h3>
          </div>
          <span className="text-[12px] font-medium text-[#107C10]">
            {onlineCount} online
          </span>
        </div>

        <div className="p-1.5 max-h-[220px] overflow-y-auto">
          {FRIENDS.slice(0, 5).map((friend, i) => (
            <motion.button
              key={friend.id}
              type="button"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              whileHover={{ backgroundColor: 'var(--muted)' }}
              className="w-full flex items-center gap-2.5 p-2 rounded-md text-left transition-colors cursor-pointer"
            >
              <div className="relative shrink-0">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="text-[10px] bg-accent text-primary font-semibold">
                    {getInitials(friend.name)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card',
                    friend.isOnline ? 'bg-[#107C10]' : 'bg-muted-foreground/35',
                  )}
                >
                  {friend.isOnline && (
                    <span className="absolute inset-0 rounded-full bg-[#107C10] animate-ping opacity-40" />
                  )}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold truncate text-foreground">
                    {friend.name}
                  </p>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {friend.isOnline ? 'now' : friend.lastSeen ?? ''}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                  {MESSAGE_PREVIEWS[i % MESSAGE_PREVIEWS.length]}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="px-3.5 py-2 border-t border-border">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-1.5 h-8 rounded-md bg-primary text-primary-foreground text-[12px] font-semibold hover:bg-[#115EA3] transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            New message
          </button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        variants={item}
        className="rounded-lg border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="text-[14px] font-semibold text-foreground">
              Notifications
            </h3>
          </div>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, delay: 0.35 }}
              className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-md bg-primary text-[11px] font-semibold text-primary-foreground"
            >
              {unreadCount}
            </motion.span>
          )}
        </div>

        <div className="p-1.5">
          {NOTIFICATIONS.map((notif, i) => {
            const { icon: Icon, color } = NOTIF_ICONS[notif.type];
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ x: 2 }}
                className={cn(
                  'flex items-start gap-2 p-2 rounded-md transition-colors cursor-pointer',
                  !notif.read ? 'bg-accent/60 hover:bg-accent' : 'hover:bg-muted',
                )}
              >
                <div className={cn('p-1.5 rounded-md shrink-0', color)}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] leading-snug">
                    <span className="font-semibold text-foreground">{notif.by}</span>{' '}
                    <span className="text-muted-foreground">{notif.message}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {timeAgo(notif.timestamp)}
                  </p>
                </div>
                {!notif.read && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Suggested */}
      <motion.div
        variants={item}
        className="rounded-lg border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="px-3.5 py-2.5 border-b border-border">
          <h3 className="text-[14px] font-semibold text-foreground">
            People you may know
          </h3>
        </div>
        <div className="p-1.5">
          {SUGGESTED_FRIENDS.map((friend, i) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-2.5 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-[10px] bg-secondary text-foreground font-semibold">
                  {getInitials(friend.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold truncate text-foreground">
                  {friend.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Grade {friend.grade}
                </p>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[12px] font-semibold hover:bg-[#115EA3] transition-colors"
              >
                <UserPlus className="w-3 h-3" />
                Add
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.aside>
  );
}
