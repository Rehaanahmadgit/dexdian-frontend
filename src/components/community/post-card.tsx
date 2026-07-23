'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import type { CommunityPost } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

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

interface PostCardProps {
  post: CommunityPost;
  index?: number;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);

  const initials = getInitials(post.author.name);

  const handleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikes((prev) => (next ? prev + 1 : prev - 1));
  };

  return (
    <article className="border-4 border-neo-ink bg-neo-white p-4 shadow-neo-md transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-neo-lg">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-11 w-11 rounded-none border-4 border-neo-ink">
            <AvatarFallback className="rounded-none bg-neo-muted text-xs font-black">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-black uppercase tracking-tight">
              {post.author.name}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wide">
              {post.author.role} · {formatTimestamp(post.timestamp)}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="border-2 border-neo-ink bg-neo-secondary p-1.5 transition-all duration-100 hover:bg-neo-accent"
        >
          <MoreHorizontal className="h-4 w-4 stroke-[3px]" />
        </button>
      </div>

      <p className="mb-3 text-base font-bold leading-snug whitespace-pre-wrap">
        {post.content}
      </p>

      {post.image && (
        <div className="mb-3 flex h-40 items-center justify-center border-4 border-neo-ink bg-neo-muted neo-texture-halftone">
          <span className="border-4 border-neo-ink bg-neo-secondary px-3 py-1 text-sm font-black uppercase shadow-neo-sm">
            Photo
          </span>
        </div>
      )}

      <div className="mb-3 text-xs font-black uppercase tracking-widest">
        {likes} likes · {post.comments} comments · {post.shares} shares
      </div>

      <div className="-mx-4 border-t-4 border-neo-ink" />

      <div className="flex items-center justify-between pt-3">
        <button
          type="button"
          onClick={handleLike}
          className={cn(
            'flex items-center gap-1.5 border-2 border-neo-ink px-2.5 py-1.5 text-[11px] font-black uppercase',
            'transition-all duration-100 ease-linear active:translate-x-[1px] active:translate-y-[1px]',
            isLiked ? 'bg-neo-accent' : 'bg-neo-bg hover:bg-neo-accent',
          )}
        >
          <Heart className={cn('h-3.5 w-3.5 stroke-[3px]', isLiked && 'fill-neo-ink')} />
          Like
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 border-2 border-neo-ink bg-neo-bg px-2.5 py-1.5 text-[11px] font-black uppercase transition-all duration-100 hover:bg-neo-secondary"
        >
          <MessageCircle className="h-3.5 w-3.5 stroke-[3px]" />
          Comment
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 border-2 border-neo-ink bg-neo-bg px-2.5 py-1.5 text-[11px] font-black uppercase transition-all duration-100 hover:bg-neo-muted"
        >
          <Share2 className="h-3.5 w-3.5 stroke-[3px]" />
          Share
        </button>
        <button
          type="button"
          onClick={() => setIsSaved((p) => !p)}
          className={cn(
            'flex items-center gap-1.5 border-2 border-neo-ink px-2.5 py-1.5 text-[11px] font-black uppercase',
            'transition-all duration-100',
            isSaved ? 'bg-neo-secondary' : 'bg-neo-bg hover:bg-neo-secondary',
          )}
        >
          <Bookmark className={cn('h-3.5 w-3.5 stroke-[3px]', isSaved && 'fill-neo-ink')} />
          Save
        </button>
      </div>
    </article>
  );
}
