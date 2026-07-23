'use client';

import { useState, type FormEvent } from 'react';
import { Image, Send, X, Smile } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import { STUDENT } from '@/src/lib/dummy-data';
import { cn } from '@/src/lib/utils';

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
    <div className="border-4 border-neo-ink bg-neo-white p-4 shadow-neo-md transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-neo-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Avatar className="h-11 w-11 shrink-0 rounded-none border-4 border-neo-ink">
            <AvatarFallback className="rounded-none bg-neo-accent text-xs font-black">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Share something LOUD with your class…"
              rows={isExpanded ? 3 : 1}
              maxLength={maxChars}
              className={cn(
                'w-full resize-none border-4 border-neo-ink bg-neo-bg px-3 py-2.5',
                'rounded-none text-base font-bold text-neo-ink',
                'placeholder:text-neo-ink/40',
                'transition-colors duration-100 ease-out',
                'focus-visible:bg-neo-secondary focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-neo-sm',
              )}
            />

            {isExpanded && (
              <div className="mt-2.5 flex items-center justify-between border-t-4 border-neo-ink pt-2.5">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="flex items-center gap-1 border-2 border-neo-ink bg-neo-muted px-2 py-1 text-[11px] font-black uppercase transition-all duration-100 hover:bg-neo-accent"
                  >
                    <Image className="h-3.5 w-3.5 stroke-[3px]" />
                    Photo
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 border-2 border-neo-ink bg-neo-secondary px-2 py-1 text-[11px] font-black uppercase transition-all duration-100 hover:bg-neo-accent"
                  >
                    <Smile className="h-3.5 w-3.5 stroke-[3px]" />
                    Feeling
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black tabular-nums">
                    {content.length}/{maxChars}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      setContent('');
                    }}
                    className="flex items-center gap-0.5 border-2 border-neo-ink bg-neo-white px-2 py-1 text-[11px] font-black uppercase"
                  >
                    <X className="h-3 w-3 stroke-[3px]" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!content.trim()}
                    className={cn(
                      'flex items-center gap-1 border-4 border-neo-ink px-3 py-1 text-[11px] font-black uppercase shadow-neo-sm',
                      'transition-all duration-100 ease-linear',
                      'active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
                      content.trim()
                        ? 'bg-neo-accent hover:bg-[#ff5252]'
                        : 'cursor-not-allowed bg-neo-bg opacity-50',
                    )}
                  >
                    <Send className="h-3 w-3 stroke-[3px]" />
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
