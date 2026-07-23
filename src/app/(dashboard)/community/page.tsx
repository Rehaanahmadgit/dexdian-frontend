'use client';

import { Suspense } from 'react';
import { CommunityLeftSidebar } from '@/src/components/community/left-sidebar';
import { PostFeed } from '@/src/components/community/post-feed';
import { CommunityRightSidebar } from '@/src/components/community/right-sidebar';

export default function CommunityPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-8 border-b-4 border-neo-ink pb-6">
          <p className="mb-2 inline-block rotate-1 border-4 border-neo-ink bg-neo-muted px-2 py-0.5 text-xs font-black uppercase tracking-[0.2em] shadow-neo-sm">
            Campus Network
          </p>
          <h1 className="text-4xl font-black uppercase leading-none tracking-tighter neo-text-shadow sm:text-5xl md:text-6xl">
            Community
          </h1>
          <p className="mt-3 max-w-xl text-lg font-bold leading-snug">
            Connect with classmates, share updates, and stay loud.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_300px]">
          <aside className="hidden lg:block">
            <div className="sticky top-[5rem]">
              <CommunityLeftSidebar />
            </div>
          </aside>

          <section className="min-w-0">
            <Suspense
              fallback={
                <div className="space-y-4">
                  <div className="h-28 border-4 border-neo-ink bg-neo-white shadow-neo-sm" />
                  <div className="h-48 border-4 border-neo-ink bg-neo-white shadow-neo-sm" />
                </div>
              }
            >
              <PostFeed />
            </Suspense>
          </section>

          <aside className="hidden xl:block">
            <div className="sticky top-[5rem]">
              <CommunityRightSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
