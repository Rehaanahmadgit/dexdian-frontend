'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { CreatePost } from '@/src/components/community/create-post';
import { PostCard } from '@/src/components/community/post-card';
import { COMMUNITY_POSTS, type CommunityPost } from '@/src/lib/dummy-data';

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function PostFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    setTimeout(() => {
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
      if (posts.length > COMMUNITY_POSTS.length * 3) setHasMore(false);
    }, 900);
  }, [isLoading, hasMore, posts.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) loadMore();
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  return (
    <div className="mx-auto max-w-[640px] space-y-4 lg:mx-0 lg:max-w-none">
      <CreatePost />
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
      <div ref={sentinelRef} className="flex items-center justify-center py-6">
        {isLoading && (
          <div className="flex items-center gap-2 border-4 border-neo-ink bg-neo-secondary px-4 py-2 text-sm font-black uppercase shadow-neo-sm">
            <Loader2 className="h-4 w-4 animate-spin stroke-[3px]" />
            Loading…
          </div>
        )}
        {!hasMore && !isLoading && (
          <div className="flex flex-col items-center gap-2 border-4 border-neo-ink bg-neo-muted px-4 py-3 text-sm font-black uppercase shadow-neo-sm">
            <RefreshCw className="h-4 w-4 stroke-[3px]" />
            You&apos;re all caught up
          </div>
        )}
      </div>
    </div>
  );
}
