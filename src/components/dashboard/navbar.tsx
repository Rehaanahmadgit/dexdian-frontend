'use client';

import { useEffect } from 'react';
import { GraduationCap, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NavLinks } from '@/src/components/dashboard/nav-links';
import { ThemeToggle } from '@/src/components/dashboard/theme-toggle';
import { UserMenu } from '@/src/components/dashboard/user-menu';
import { useAuthStore } from '@/src/stores/auth-store';
import { cn } from '@/src/lib/utils';

// ─── Component ───────────────────────────────────────────

export function Navbar() {
  const router = useRouter();
  const { logout, hydrate } = useAuthStore();

  // Restore session after refresh so profile + logout always appear
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/90">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
            <GraduationCap
              className="w-[18px] h-[18px] text-primary-foreground"
              strokeWidth={2}
            />
          </div>
          <span className="text-[17px] font-semibold tracking-tight whitespace-nowrap text-foreground">
            Dex<span className="text-primary">Dian</span>
          </span>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-0.5">
          <NavLinks />
        </nav>

        {/* Right: Actions — logout always visible on dashboard */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <UserMenu />
          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            className={cn(
              'inline-flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-md',
              'text-[13px] font-semibold',
              'text-[#C50F1F] bg-[#FDF3F4] hover:bg-[#F8E4E6]',
              'border border-[#F1B6BC]',
              'transition-colors',
            )}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
