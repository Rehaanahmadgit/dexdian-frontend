'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Send, X, Smile } from 'lucide-react';
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
    setContent('');
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -1 }}
      className="rounded-lg border border-border bg-card p-4 shadow-sm"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarFallback className="text-[12px] bg-accent text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Share an update with your class…"
              rows={isExpanded ? 3 : 1}
              maxLength={maxChars}
              className={cn(
                'w-full resize-none rounded-md border border-border bg-background px-3 py-2.5 text-[14px] text-foreground',
                'placeholder:text-muted-foreground/70',
                'focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary',
                'transition-all duration-200',
              )}
            />

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <Image className="w-3.5 h-3.5" />
                        Photo
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <Smile className="w-3.5 h-3.5" />
                        Feeling
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-muted-foreground tabular-nums">
                        {content.length}/{maxChars}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsExpanded(false);
                          setContent('');
                        }}
                        className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-muted-foreground hover:bg-muted transition-colors"
                      >
                        <X className="w-3 h-3" />
                        Cancel
                      </button>
                      <motion.button
                        type="submit"
                        disabled={!content.trim()}
                        whileHover={content.trim() ? { scale: 1.03 } : undefined}
                        whileTap={content.trim() ? { scale: 0.97 } : undefined}
                        className={cn(
                          'flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[12px] font-semibold transition-colors',
                          content.trim()
                            ? 'bg-primary text-primary-foreground hover:bg-[#115EA3]'
                            : 'bg-muted text-muted-foreground cursor-not-allowed',
                        )}
                      >
                        <Send className="w-3 h-3" />
                        Post
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
