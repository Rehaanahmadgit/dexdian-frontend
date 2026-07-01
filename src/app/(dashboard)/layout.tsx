'use client';

import { Navbar } from '@/src/components/dashboard/navbar';
import { PageTransition } from '@/src/components/dashboard/page-transition';

// ─── Dashboard Layout ────────────────────────────────────

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Page content with transitions */}
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
