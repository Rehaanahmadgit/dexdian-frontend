'use client';

import { Users, MessageCircle, Bell, UserPlus, Send } from 'lucide-react';
import { FRIENDS, NOTIFICATIONS, SUGGESTED_FRIENDS } from '@/src/lib/dummy-data';
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
  'Hey, did you finish the lab?',
  'Revise chapter 5 together?',
  'Thanks for the notes!',
  'See you at practice.',
  'Deadline is tomorrow.',
];

const NOTIF_ICONS: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; bg: string }
> = {
  like: { icon: Users, bg: 'bg-neo-accent' },
  comment: { icon: MessageCircle, bg: 'bg-neo-secondary' },
  follow: { icon: UserPlus, bg: 'bg-neo-muted' },
  mention: { icon: Bell, bg: 'bg-neo-white' },
  share: { icon: Users, bg: 'bg-neo-secondary' },
};

export function CommunityRightSidebar() {
  const onlineCount = FRIENDS.filter((f) => f.isOnline).length;
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <aside className="max-h-[calc(100vh-6rem)] space-y-4 overflow-y-auto overscroll-contain">
      {/* Messages */}
      <div className="overflow-hidden border-4 border-neo-ink bg-neo-white shadow-neo-md">
        <div className="flex items-center justify-between border-b-4 border-neo-ink bg-neo-accent px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 stroke-[3px]" />
            <h3 className="text-xs font-black uppercase tracking-widest">
              Messages
            </h3>
          </div>
          <span className="border-2 border-neo-ink bg-neo-white px-1.5 text-[10px] font-black uppercase">
            {onlineCount} online
          </span>
        </div>
        <div className="max-h-[200px] space-y-0 overflow-y-auto p-1.5">
          {FRIENDS.slice(0, 5).map((friend, i) => (
            <button
              key={friend.id}
              type="button"
              className="flex w-full items-center gap-2.5 border-2 border-transparent p-2 text-left transition-all duration-100 ease-linear hover:border-neo-ink hover:bg-neo-secondary"
            >
              <div className="relative shrink-0">
                <Avatar className="h-9 w-9 rounded-none border-2 border-neo-ink">
                  <AvatarFallback className="rounded-none bg-neo-muted text-[10px] font-black">
                    {getInitials(friend.name)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    'absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 border-2 border-neo-ink',
                    friend.isOnline ? 'bg-neo-secondary' : 'bg-neo-bg',
                  )}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black uppercase">
                  {friend.name}
                </p>
                <p className="truncate text-[11px] font-bold">
                  {MESSAGE_PREVIEWS[i % MESSAGE_PREVIEWS.length]}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="border-t-4 border-neo-ink p-2">
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-1.5 border-4 border-neo-ink bg-neo-secondary text-xs font-black uppercase tracking-wide shadow-neo-sm transition-all duration-100 ease-linear active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Send className="h-3.5 w-3.5 stroke-[3px]" />
            New message
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="overflow-hidden border-4 border-neo-ink bg-neo-white shadow-neo-md">
        <div className="flex items-center justify-between border-b-4 border-neo-ink bg-neo-secondary px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 stroke-[3px]" />
            <h3 className="text-xs font-black uppercase tracking-widest">
              Notifications
            </h3>
          </div>
          {unreadCount > 0 && (
            <span className="flex min-w-5 items-center justify-center border-2 border-neo-ink bg-neo-accent px-1.5 text-[11px] font-black">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="p-1.5">
          {NOTIFICATIONS.map((notif) => {
            const { icon: Icon, bg } = NOTIF_ICONS[notif.type];
            return (
              <div
                key={notif.id}
                className={cn(
                  'flex cursor-pointer items-start gap-2 border-2 border-transparent p-2 transition-all duration-100 ease-linear hover:border-neo-ink hover:bg-neo-bg',
                  !notif.read && 'bg-neo-muted/40',
                )}
              >
                <div
                  className={cn(
                    'flex shrink-0 items-center justify-center border-2 border-neo-ink p-1.5',
                    bg,
                  )}
                >
                  <Icon className="h-3 w-3 stroke-[3px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold leading-snug">
                    <span className="font-black uppercase">{notif.by}</span>{' '}
                    {notif.message}
                  </p>
                  <p className="mt-0.5 text-[10px] font-black uppercase tracking-widest">
                    {timeAgo(notif.timestamp)}
                  </p>
                </div>
                {!notif.read && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 border border-neo-ink bg-neo-accent" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested */}
      <div className="overflow-hidden border-4 border-neo-ink bg-neo-white shadow-neo-sm">
        <div className="border-b-4 border-neo-ink bg-neo-muted px-3.5 py-2.5">
          <h3 className="text-xs font-black uppercase tracking-widest">
            People you may know
          </h3>
        </div>
        <div className="p-1.5">
          {SUGGESTED_FRIENDS.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-2.5 p-2"
            >
              <Avatar className="h-8 w-8 rounded-none border-2 border-neo-ink">
                <AvatarFallback className="rounded-none bg-neo-secondary text-[10px] font-black">
                  {getInitials(friend.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black uppercase">
                  {friend.name}
                </p>
                <p className="text-[11px] font-bold">Grade {friend.grade}</p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 border-4 border-neo-ink bg-neo-accent px-2 py-1 text-[11px] font-black uppercase shadow-neo-sm transition-all duration-100 ease-linear active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <UserPlus className="h-3 w-3 stroke-[3px]" />
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
