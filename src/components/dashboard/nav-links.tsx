'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart3 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// ─── Nav Items ───────────────────────────────────────────

export const NAV_ITEMS = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
] as const;

// ─── Component ───────────────────────────────────────────

interface NavLinksProps {
  onNavigate?: () => void;
  variant?: 'sidebar' | 'header';
}

export function NavLinks({ onNavigate, variant }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            title={label}
            className={cn(
              'relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              'hover:bg-muted/80 active:scale-95',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="w-[18px] h-[18px] flex-shrink-0" />
            <span className="hidden sm:inline">{label}</span>
            {/* Active indicator dot */}
            {isActive && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary hidden sm:block" />
            )}
          </Link>
        );
      })}
    </>
  );
}
