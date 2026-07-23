'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import type { CommunityPost } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Helpers ─────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatTimestamp(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// ─── Component ───────────────────────────────────────────

interface PostCardProps {
  post: CommunityPost;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);
  const [likeBurst, setLikeBurst] = useState(false);

  const initials = getInitials(post.author.name);

  const handleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikes((prev) => (next ? prev + 1 : prev - 1));
    if (next) {
      setLikeBurst(true);
      setTimeout(() => setLikeBurst(false), 400);
    }
  };

  const handleSave = () => setIsSaved((p) => !p);

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="rounded-lg border border-border bg-card p-4 shadow-sm"
      style={{ transitionDelay: `${Math.min(index, 6) * 20}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="text-[12px] bg-accent text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[14px] font-semibold leading-tight text-foreground">
              {post.author.name}
            </p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              {post.author.role} · {formatTimestamp(post.timestamp)}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="p-1.5 rounded-md hover:bg-muted transition-colors"
        >
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <p className="text-[14px] leading-relaxed whitespace-pre-wrap mb-3 text-foreground">
        {post.content}
      </p>

      {/* Image */}
      {post.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-3 -mx-4 sm:mx-0 rounded-none sm:rounded-md overflow-hidden bg-gradient-to-br from-accent to-[#E8F3FC] h-44 flex items-center justify-center"
        >
          <span className="text-4xl">📸</span>
        </motion.div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-1 mb-3 text-[12px] text-muted-foreground">
        <motion.span
          key={likes}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          className="tabular-nums"
        >
          {likes} likes
        </motion.span>
        <span className="mx-1">·</span>
        <span>{post.comments} comments</span>
        <span className="mx-1">·</span>
        <span>{post.shares} shares</span>
      </div>

      <div className="border-t border-border -mx-4" />

      {/* Actions */}
      <div className="flex items-center justify-between pt-2.5">
        <motion.button
          type="button"
          onClick={handleLike}
          whileTap={{ scale: 0.92 }}
          className={cn(
            'relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-semibold transition-colors',
            isLiked
              ? 'text-[#C50F1F] bg-[#FDF3F4]'
              : 'text-muted-foreground hover:text-[#C50F1F] hover:bg-[#FDF3F4]',
          )}
        >
          <motion.span
            animate={likeBurst ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart className={cn('w-3.5 h-3.5', isLiked && 'fill-current')} />
          </motion.span>
          Like
        </motion.button>

        <button
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-semibold text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Comment
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-semibold text-muted-foreground hover:text-[#107C10] hover:bg-[#F1FAF1] transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>

        <motion.button
          type="button"
          onClick={handleSave}
          whileTap={{ scale: 0.92 }}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-semibold transition-colors',
            isSaved
              ? 'text-[#8A3707] bg-[#FFF9F5]'
              : 'text-muted-foreground hover:text-[#8A3707] hover:bg-[#FFF9F5]',
          )}
        >
          <Bookmark className={cn('w-3.5 h-3.5', isSaved && 'fill-current')} />
          Save
        </motion.button>
      </div>
    </motion.article>
  );
}
