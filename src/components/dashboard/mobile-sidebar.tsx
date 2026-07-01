'use client';

import { NavLinks } from '@/src/components/dashboard/nav-links';
import { useAuthStore } from '@/src/stores/auth-store';
import { GraduationCap, X } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/src/components/ui/sheet';

// ─── Props ───────────────────────────────────────────────

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

// ─── Component ───────────────────────────────────────────

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const { user } = useAuthStore();

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="flex flex-row items-center justify-between px-4 h-14 border-b border-border space-y-0">
          <SheetTitle className="flex items-center gap-2 text-base font-bold">
            <GraduationCap className="w-5 h-5 text-primary" />
            Dex<span className="text-primary">Dain</span>
          </SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </SheetHeader>

        {/* User info */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
            <span className="text-sm font-bold text-primary">
              {user?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2) || 'ST'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name || 'Student'}</p>
            {user?.grade && (
              <p className="text-xs text-muted-foreground">
                Grade {user.grade}
                {user.section ? ` • ${user.section}` : ''}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavLinks variant="sidebar" onNavigate={onClose} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
