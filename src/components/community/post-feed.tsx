'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const feedContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

// ─── Component ───────────────────────────────────────────

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

      if (posts.length > COMMUNITY_POSTS.length * 3) {
        setHasMore(false);
      }
    }, 900);
  }, [isLoading, hasMore, posts.length]);

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
    <motion.div
      variants={feedContainer}
      initial="hidden"
      animate="show"
      className="space-y-4 max-w-[640px] mx-auto lg:mx-0 lg:max-w-none"
    >
      <CreatePost />

      <AnimatePresence mode="popLayout">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </AnimatePresence>

      <div ref={sentinelRef} className="flex items-center justify-center py-6">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-[14px] text-muted-foreground"
          >
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            Loading posts…
          </motion.div>
        )}
        {!hasMore && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2 text-[14px] text-muted-foreground"
          >
            <RefreshCw className="w-4 h-4" />
            <span>You&apos;re all caught up</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
