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

export function NavLinks({ onNavigate }: NavLinksProps) {
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
              'relative flex items-center gap-2 px-3 py-2 rounded-md text-[14px] font-semibold transition-colors duration-150',
              isActive
                ? 'text-primary bg-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
          >
            <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={isActive ? 2.25 : 2} />
            <span className="hidden sm:inline">{label}</span>
            {isActive && (
              <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary hidden sm:block" />
            )}
          </Link>
        );
      })}
    </>
  );
}
