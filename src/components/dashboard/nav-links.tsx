'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart3 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const NAV_ITEMS = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
] as const;

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
              'flex items-center gap-1.5 border-4 px-2.5 py-1.5 text-xs font-black uppercase tracking-wide sm:px-3 sm:text-sm',
              'transition-all duration-100 ease-linear',
              isActive
                ? 'border-neo-ink bg-neo-secondary shadow-neo-sm -rotate-1'
                : 'border-transparent hover:border-neo-ink hover:bg-neo-accent hover:shadow-neo-sm hover:rotate-1',
            )}
          >
            <Icon className="h-4 w-4 shrink-0 stroke-[3px] sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
    </>
  );
}
