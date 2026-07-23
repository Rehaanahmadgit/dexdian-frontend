import { Suspense } from 'react';
import { GraduationCap, Star, ArrowRight } from 'lucide-react';
import { LoginForm } from '@/src/components/login/login-form';
import { cn } from '@/src/lib/utils';

const MARQUEE = [
  'ATTENDANCE',
  'GRADES',
  'HOMEWORK',
  'COMMUNITY',
  'ANALYTICS',
  'DEXDIAN',
  'STUDENT PORTAL',
];

// ─── Login Page — Neo-Brutalism ──────────────────────────

export default function LoginPage() {
  return (
    <main
      className={cn(
        'relative min-h-screen overflow-hidden font-neo',
        'bg-neo-bg text-neo-ink',
      )}
    >
      {/* Texture — never flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 neo-texture-grid opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 neo-texture-noise opacity-[0.08]"
      />

      {/* Giant background type as texture */}
      <p
        aria-hidden
        className="pointer-events-none absolute -left-4 top-24 select-none text-[7rem] font-black uppercase leading-none tracking-tighter text-neo-ink/5 sm:text-[10rem] md:text-[12rem]"
      >
        DEX
      </p>

      {/* Floating stickers / chaos zone */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-16 hidden rotate-3 border-4 border-neo-ink bg-neo-secondary px-3 py-1 font-black uppercase tracking-widest shadow-neo-sm md:block"
      >
        LIVE
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-28 left-8 hidden -rotate-2 border-4 border-neo-ink bg-neo-muted px-3 py-1 font-black uppercase tracking-widest shadow-neo-sm lg:block"
      >
        CLASS OF NOW
      </div>
      <Star
        aria-hidden
        className="pointer-events-none absolute right-[18%] top-[42%] hidden h-12 w-12 animate-spin-slow fill-neo-accent stroke-neo-ink stroke-[3px] lg:block"
      />

      {/* Marquee divider */}
      <div className="relative z-10 border-b-4 border-neo-ink bg-neo-ink text-neo-white overflow-hidden">
        <div className="flex w-max animate-neo-marquee whitespace-nowrap py-2 font-black uppercase tracking-[0.2em] text-sm">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={`${item}-${i}`} className="mx-6 inline-flex items-center gap-6">
              {item}
              <span className="text-neo-secondary">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* Asymmetric 60/40 layout */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-44px)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-8 lg:grid-cols-5 lg:gap-12 lg:px-10 lg:py-16">
        {/* Brand panel — ~60% */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="inline-flex items-center gap-3 -rotate-1">
            <div className="flex h-14 w-14 items-center justify-center border-4 border-neo-ink bg-neo-accent shadow-neo-sm">
              <GraduationCap className="h-8 w-8 stroke-[3px] text-neo-ink" />
            </div>
            <span className="border-4 border-neo-ink bg-neo-white px-3 py-1 text-xl font-black uppercase tracking-tight shadow-neo-sm sm:text-2xl">
              DexDian
            </span>
          </div>

          <div className="relative">
            <h1 className="font-black uppercase leading-[0.85] tracking-tighter">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl neo-text-shadow">
                School
              </span>
              <span className="mt-2 inline-block -rotate-2 border-4 border-neo-ink bg-neo-secondary px-3 py-1 text-4xl shadow-neo-md sm:text-5xl md:text-6xl">
                Portal
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg font-bold leading-snug sm:text-xl">
              Punch in. Check attendance. Drop homework. No soft UI — just the
              loud student dashboard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {['ATTENDANCE', 'GRADES', 'FEED'].map((tag, i) => (
              <span
                key={tag}
                className={cn(
                  'border-4 border-neo-ink px-3 py-1 text-sm font-black uppercase tracking-widest shadow-neo-sm',
                  i === 0 && 'bg-neo-accent rotate-1',
                  i === 1 && 'bg-neo-muted -rotate-2',
                  i === 2 && 'bg-neo-secondary rotate-2',
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            Scroll? Nah.
            <ArrowRight className="h-5 w-5 stroke-[3px]" />
            Just sign in.
          </p>
        </aside>

        {/* Form panel — ~40% */}
        <section className="lg:col-span-2 relative">
          <div
            aria-hidden
            className="absolute -right-3 -top-5 z-20 rotate-3 border-4 border-neo-ink bg-neo-accent px-3 py-1 text-xs font-black uppercase tracking-widest shadow-neo-sm sm:-right-4"
          >
            Sign In
          </div>

          <div className="border-4 border-neo-ink bg-neo-white shadow-neo-lg transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-neo-xl">
            <div className="border-b-4 border-neo-ink bg-neo-muted px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[0.2em]">
                Student Access
              </p>
              <h2 className="mt-1 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                Welcome Back
              </h2>
            </div>

            <div className="p-5 sm:p-6">
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <div className="h-4 w-24 border-2 border-neo-ink bg-neo-secondary" />
                    <div className="h-14 border-4 border-neo-ink bg-neo-bg" />
                    <div className="h-14 border-4 border-neo-ink bg-neo-bg" />
                    <div className="h-14 border-4 border-neo-ink bg-neo-accent" />
                  </div>
                }
              >
                <LoginForm />
              </Suspense>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-bold uppercase tracking-widest text-neo-ink">
            © {new Date().getFullYear()} DexDian · No Soft Shadows Allowed
          </p>
        </section>
      </div>
    </main>
  );
}
