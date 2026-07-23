'use client';

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  delay?: number;
  action?: ReactNode;
  headerBg?: string;
}

export function ChartCard({
  title,
  subtitle,
  icon: Icon,
  children,
  className,
  bodyClassName,
  action,
  headerBg = 'bg-neo-secondary',
}: ChartCardProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden border-4 border-neo-ink bg-neo-white shadow-neo-md',
        'transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-neo-lg',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-start justify-between gap-3 border-b-4 border-neo-ink px-4 py-3',
          headerBg,
        )}
      >
        <div className="flex min-w-0 items-start gap-2.5">
          {Icon && (
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border-4 border-neo-ink bg-neo-white">
              <Icon className="h-4 w-4 stroke-[3px]" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-sm font-black uppercase tracking-wide">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5 text-xs font-bold leading-snug">{subtitle}</p>
            )}
          </div>
        </div>
        {action}
      </div>
      <div className={cn('min-h-0 flex-1 p-4', bodyClassName)}>{children}</div>
    </div>
  );
}
