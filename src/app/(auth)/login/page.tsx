import { Suspense } from 'react';
import { LoginForm } from '@/src/components/login/login-form';
import { AnimatedBackground } from '@/src/components/login/animated-background';

// ─── Login Page ──────────────────────────────────────────

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12">
      {/* Animated gradient orbs */}
      <AnimatedBackground />

      {/* Login Form wrapped in Suspense for useSearchParams */}
      <Suspense
        fallback={
          <div className="w-full max-w-md mx-auto">
            <div className="rounded-2xl border border-white/20 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-10">
              <div className="space-y-6 animate-pulse">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-muted" />
                <div className="h-7 w-40 mx-auto rounded bg-muted" />
                <div className="h-5 w-52 mx-auto rounded bg-muted" />
                <div className="h-11 rounded-xl bg-muted" />
                <div className="h-11 rounded-xl bg-muted" />
                <div className="h-11 rounded-xl bg-muted" />
              </div>
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
