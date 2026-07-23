'use client';

import { Navbar } from '@/src/components/dashboard/navbar';
import { PageTransition } from '@/src/components/dashboard/page-transition';

// ─── Dashboard Layout — Neo-Brutalism ────────────────────

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-neo-bg font-neo text-neo-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 neo-texture-grid opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 neo-texture-noise opacity-[0.06]"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
