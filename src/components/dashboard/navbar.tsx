'use client';

import { GraduationCap } from 'lucide-react';
import { NavLinks } from '@/src/components/dashboard/nav-links';
import { ThemeToggle } from '@/src/components/dashboard/theme-toggle';
import { UserMenu } from '@/src/components/dashboard/user-menu';

// ─── Component ───────────────────────────────────────────

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 ring-1 ring-primary/10">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight whitespace-nowrap">
            Dex<span className="text-primary">Dain</span>
          </span>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-0.5">
          <NavLinks />
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
