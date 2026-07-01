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
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Component ───────────────────────────────────────────

interface PostCardProps {
  post: CommunityPost;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);

  const initials = getInitials(post.author.name);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => setIsSaved((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
      className="rounded-lg border border-border bg-card p-3 hover:border-border/80 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-[11px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-primary font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[13px] font-semibold leading-tight">{post.author.name}</p>
            <p className="text-[11px] text-muted-foreground">
              {post.author.role} • {formatTimestamp(post.timestamp)}
            </p>
          </div>
        </div>
        <button className="p-1 rounded-md hover:bg-muted transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <p className="text-[13px] leading-relaxed whitespace-pre-wrap mb-2.5">{post.content}</p>

      {/* Image */}
      {post.image && (
        <div className="mb-2.5 -mx-3 sm:mx-0 rounded-none sm:rounded-md overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 h-40 flex items-center justify-center">
          <span className="text-3xl">📸</span>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-1 mb-2.5 text-[11px] text-muted-foreground">
        <span>{likes} likes</span>
        <span className="mx-1">•</span>
        <span>{post.comments} comments</span>
        <span className="mx-1">•</span>
        <span>{post.shares} shares</span>
      </div>

      {/* Divider */}
      <div className="border-t border-border -mx-3" />

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleLike}
          className={cn(
            'flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all hover:bg-red-50 dark:hover:bg-red-950/30',
            isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500',
          )}
        >
          <Heart className={cn('w-3.5 h-3.5 transition-all', isLiked && 'fill-current scale-110')} />
          Like
        </button>

        <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all">
          <MessageCircle className="w-3.5 h-3.5" />
          Comment
        </button>

        <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-foreground hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all">
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>

        <button
          onClick={handleSave}
          className={cn(
            'flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all',
            isSaved
              ? 'text-amber-500'
              : 'text-muted-foreground hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30',
          )}
        >
          <Bookmark className={cn('w-3.5 h-3.5 transition-all', isSaved && 'fill-current')} />
          Save
        </button>
      </div>
    </motion.div>
  );
}
