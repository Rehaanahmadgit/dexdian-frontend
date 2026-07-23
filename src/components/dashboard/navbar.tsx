'use client';

import { useEffect } from 'react';
import { GraduationCap, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NavLinks } from '@/src/components/dashboard/nav-links';
import { UserMenu } from '@/src/components/dashboard/user-menu';
import { useAuthStore } from '@/src/stores/auth-store';
import { cn } from '@/src/lib/utils';

// ─── Neo Navbar ──────────────────────────────────────────

export function Navbar() {
  const router = useRouter();
  const { logout, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-neo-ink bg-neo-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-6">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center border-4 border-neo-ink bg-neo-accent shadow-neo-sm">
            <GraduationCap className="h-6 w-6 stroke-[3px] text-neo-ink" />
          </div>
          <span className="border-4 border-neo-ink bg-neo-secondary px-2 py-0.5 text-lg font-black uppercase tracking-tight shadow-neo-sm whitespace-nowrap">
            DexDian
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLinks />
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <UserMenu />
          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            className={cn(
              'inline-flex h-11 items-center gap-1.5 border-4 border-neo-ink bg-neo-accent px-2.5 sm:px-3',
              'text-xs font-black uppercase tracking-wide text-neo-ink shadow-neo-sm',
              'transition-all duration-100 ease-linear',
              'hover:bg-[#ff5252]',
              'active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
            )}
          >
            <LogOut className="h-4 w-4 stroke-[3px]" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
