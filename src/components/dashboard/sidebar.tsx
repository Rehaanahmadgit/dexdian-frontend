'use client';

import { NavLinks } from '@/src/components/dashboard/nav-links';
import { useAuthStore } from '@/src/stores/auth-store';
import { GraduationCap } from 'lucide-react';

// ─── Component ───────────────────────────────────────────

export function Sidebar() {
  const { user } = useAuthStore();

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen sticky top-0 border-r border-border bg-background/60 backdrop-blur-sm">
      {/* Sidebar header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold truncate">
            {user?.name || 'Student'}
          </span>
          {user?.grade && (
            <span className="text-[11px] text-muted-foreground">
              Grade {user.grade}
              {user.section ? ` • ${user.section}` : ''}
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NavLinks variant="sidebar" />
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-border">
        <p className="text-[11px] text-muted-foreground text-center">
          DexDain v0.1.0
        </p>
      </div>
    </aside>
  );
}
