import { Suspense } from 'react';
import { Source_Serif_4, Source_Sans_3 } from 'next/font/google';
import { GraduationCap } from 'lucide-react';
import { LoginForm } from '@/src/components/login/login-form';
import { AnimatedBackground } from '@/src/components/login/animated-background';
import { cn } from '@/src/lib/utils';

// ─── Fonts (traditional / professional) ──────────────────

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-login-serif',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-login-sans',
  display: 'swap',
});

// ─── Login Page ──────────────────────────────────────────

export default function LoginPage() {
  return (
    <main
      className={cn(
        sourceSerif.variable,
        sourceSans.variable,
        'relative min-h-screen grid lg:grid-cols-2',
        'font-[family-name:var(--font-login-sans)]',
      )}
    >
      {/* ── Brand panel (Fluent Theme) ── */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#0C3B5E] text-white px-12 xl:px-16 py-12">
        {/* Atmosphere */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(15,108,189,0.45),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(17,94,163,0.35),transparent_50%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-md bg-white/10 border border-white/15">
              <GraduationCap className="w-6 h-6 text-white" strokeWidth={1.75} />
            </div>
            <span
              className="text-[1.65rem] font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-login-serif), Georgia, serif' }}
            >
              Dex<span className="text-[#7EB6E8]">Dian</span>
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <p className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#9CC9ED] mb-4">
            School Management
          </p>
          <h2
            className="text-[2.35rem] xl:text-[2.75rem] font-semibold leading-[1.15] tracking-tight text-white"
            style={{ fontFamily: 'var(--font-login-serif), Georgia, serif' }}
          >
            DexDian
          </h2>
          <p className="mt-5 text-[16px] xl:text-[17px] leading-relaxed text-white/75 max-w-sm">
            A reliable portal for students, parents, and educators — attendance,
            academics, and campus life in one place.
          </p>
        </div>

        <p className="relative z-10 text-[13px] text-white/45">
          © {new Date().getFullYear()} DexDian. All rights reserved.
        </p>
      </aside>

      {/* ── Form panel ── */}
      <section className="relative flex flex-col justify-center bg-[#F5F5F5] px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        <AnimatedBackground />

        {/* Mobile brand */}
        <div className="relative z-10 mb-10 lg:hidden">
          <div className="inline-flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-[#0C3B5E]">
              <GraduationCap className="w-5 h-5 text-white" strokeWidth={1.75} />
            </div>
            <span
              className="text-[1.35rem] font-semibold tracking-tight text-[#0C3B5E]"
              style={{ fontFamily: 'var(--font-login-serif), Georgia, serif' }}
            >
              Dex<span className="text-[#0F6CBD]">Dian</span>
            </span>
          </div>
        </div>

        <div className="relative z-10 w-full flex justify-center lg:justify-start">
          <Suspense
            fallback={
              <div className="w-full max-w-[420px] space-y-6 animate-pulse">
                <div className="h-4 w-28 rounded bg-[#E0E0E0]" />
                <div className="h-9 w-40 rounded bg-[#E0E0E0]" />
                <div className="h-5 w-64 rounded bg-[#E0E0E0]" />
                <div className="h-12 rounded-md bg-[#E0E0E0]" />
                <div className="h-12 rounded-md bg-[#E0E0E0]" />
                <div className="h-12 rounded-md bg-[#E0E0E0]" />
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
