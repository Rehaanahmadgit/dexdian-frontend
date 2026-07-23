'use client';

import { useEffect } from 'react';
import { LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/stores/auth-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

export function UserMenu() {
  const router = useRouter();
  const { user, logout, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const displayName = user?.name ?? 'Student';
  const displayEmail = user?.email ?? 'Signed in';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-11 items-center gap-2 border-4 border-neo-ink bg-neo-white px-2 shadow-neo-sm transition-all duration-100 ease-linear hover:-translate-y-0.5 hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Avatar className="h-7 w-7 rounded-none border-2 border-neo-ink">
            {user?.avatar && <AvatarImage src={user.avatar} alt={displayName} />}
            <AvatarFallback className="rounded-none bg-neo-muted text-xs font-black text-neo-ink">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[100px] truncate text-xs font-black uppercase tracking-wide md:inline">
            {displayName}
          </span>
          <ChevronDown className="hidden h-4 w-4 stroke-[3px] md:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-none border-4 border-neo-ink bg-neo-white p-0 shadow-neo-md font-neo"
      >
        <DropdownMenuLabel className="border-b-4 border-neo-ink bg-neo-muted px-3 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="font-black uppercase tracking-tight text-neo-ink">
              {displayName}
            </span>
            <span className="text-xs font-bold text-neo-ink">{displayEmail}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer gap-2 rounded-none px-3 py-2.5 font-bold uppercase tracking-wide focus:bg-neo-secondary">
          <UserIcon className="h-4 w-4 stroke-[3px]" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator className="m-0 bg-neo-ink h-1" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer gap-2 rounded-none px-3 py-2.5 font-black uppercase tracking-wide text-neo-ink focus:bg-neo-accent"
        >
          <LogOut className="h-4 w-4 stroke-[3px]" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
