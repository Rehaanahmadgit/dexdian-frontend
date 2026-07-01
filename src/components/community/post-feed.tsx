'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { CreatePost } from '@/src/components/community/create-post';
import { PostCard } from '@/src/components/community/post-card';
import { COMMUNITY_POSTS, type CommunityPost } from '@/src/lib/dummy-data';

// ─── Helpers ─────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ─── Component ───────────────────────────────────────────

export function PostFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Simulate loading more posts
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    setTimeout(() => {
      // Simulate: shuffle and append existing posts as "new" ones
      const morePosts = shuffleArray(COMMUNITY_POSTS).map((p, i) => ({
        ...p,
        id: `more-${Date.now()}-${i}`,
        isLiked: false,
        isSaved: false,
        likes: Math.floor(Math.random() * 30) + 5,
        comments: Math.floor(Math.random() * 15),
        shares: Math.floor(Math.random() * 10),
      }));
      setPosts((prev) => [...prev, ...morePosts]);
      setIsLoading(false);

      // Stop after ~3 loads for demo
      if (posts.length > COMMUNITY_POSTS.length * 3) {
        setHasMore(false);
      }
    }, 1000);
  }, [isLoading, hasMore, posts.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  return (
    <div className="space-y-3">
      {/* Create Post */}
      <CreatePost />

      {/* Posts */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="flex items-center justify-center py-6">
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading posts...
          </div>
        )}
        {!hasMore && !isLoading && (
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            <span>You&apos;re all caught up!</span>
          </div>
        )}
      </div>
    </div>
  );
}
