'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { CommunityLeftSidebar } from '@/src/components/community/left-sidebar';
import { PostFeed } from '@/src/components/community/post-feed';
import { CommunityRightSidebar } from '@/src/components/community/right-sidebar';

// ─── Community Page ──────────────────────────────────────

export default function CommunityPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="max-w-7xl mx-auto px-4 py-5 md:px-6 md:py-6">
        {/* Page header */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mb-5 pb-4 border-b border-border"
        >
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-primary mb-1">
            Campus Network
          </p>
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-foreground leading-none">
            Community
          </h1>
          <p className="text-[14px] text-muted-foreground mt-1.5">
            Connect with classmates, share updates, and stay informed
          </p>
        </motion.header>

        {/* 3-column professional layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_300px] gap-5 items-start">
          {/* Left — Profile */}
          <aside className="hidden lg:block">
            <div className="sticky top-[4.25rem]">
              <CommunityLeftSidebar />
            </div>
          </aside>

          {/* Center — Feed */}
          <section className="min-w-0">
            <Suspense
              fallback={
                <div className="space-y-4 animate-pulse">
                  <div className="h-28 rounded-lg bg-card border border-border" />
                  <div className="h-48 rounded-lg bg-card border border-border" />
                  <div className="h-48 rounded-lg bg-card border border-border" />
                </div>
              }
            >
              <PostFeed />
            </Suspense>
          </section>

          {/* Right — Messages & Notifications */}
          <aside className="hidden xl:block">
            <div className="sticky top-[4.25rem]">
              <CommunityRightSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
