import { CommunityLeftSidebar } from '@/src/components/community/left-sidebar';
import { PostFeed } from '@/src/components/community/post-feed';
import { CommunityRightSidebar } from '@/src/components/community/right-sidebar';

// ─── Community Page ──────────────────────────────────────

export default function CommunityPage() {
  return (
    <div className="flex gap-0 h-full">
      {/* Left Sidebar — sticky, hidden on mobile */}
      <div className="hidden lg:block w-[232px] flex-shrink-0">
        <div className="sticky top-16 p-3 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <CommunityLeftSidebar />
        </div>
      </div>

      {/* Center Feed — fills available space naturally */}
      <div className="flex-1 min-w-0 border-x border-border">
        <div className="px-4 py-3 md:px-5 md:py-4">
          <div className="mb-3">
            <h1 className="text-lg font-bold tracking-tight">Community</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Connect with classmates and teachers
            </p>
          </div>
          <PostFeed />
        </div>
      </div>

      {/* Right Sidebar — sticky, hidden on mobile */}
      <div className="hidden xl:block w-[268px] flex-shrink-0">
        <div className="sticky top-16 p-3 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <CommunityRightSidebar />
        </div>
      </div>
    </div>
  );
}
