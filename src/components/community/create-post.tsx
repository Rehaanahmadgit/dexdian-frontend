'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Image, Send, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import { STUDENT } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

// ─── Component ───────────────────────────────────────────

export function CreatePost() {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const maxChars = 500;

  const initials = STUDENT.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    // In real app: API call here
    setContent('');
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-border bg-card p-3"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2.5">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className="text-[11px] bg-primary/10 text-primary font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="What's on your mind?"
              rows={isExpanded ? 3 : 1}
              maxLength={maxChars}
              className={cn(
                'w-full resize-none rounded-md border border-border bg-muted/50 px-2.5 py-1.5 text-[13px]',
                'placeholder:text-muted-foreground/60',
                'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                'transition-all duration-200',
              )}
            />

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between mt-2 pt-2 border-t border-border"
              >
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Image className="w-3.5 h-3.5" />
                    Photo
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">
                    {content.length}/{maxChars}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      setContent('');
                    }}
                    className="flex items-center gap-0.5 px-2 py-1 rounded-md text-[11px] text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!content.trim()}
                    className={cn(
                      'flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all',
                      content.trim()
                        ? 'bg-primary text-primary-foreground hover:opacity-90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed',
                    )}
                  >
                    <Send className="w-3 h-3" />
                    Post
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}
