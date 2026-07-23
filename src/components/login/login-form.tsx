'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { useLogin } from '@/src/hooks/use-login';
import { cn } from '@/src/lib/utils';

// ─── Constants ───────────────────────────────────────────

const INITIAL_VALUES = { email: '', password: '' };

interface FieldErrors {
  email?: string;
  password?: string;
}

// ─── Helpers ─────────────────────────────────────────────

function validate(values: typeof INITIAL_VALUES): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

// ─── Component (Neo-Brutalism) ───────────────────────────

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/home';

  const { mutate: login, isPending } = useLogin();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (field: keyof typeof INITIAL_VALUES, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    login(values, {
      onSuccess: () => {
        router.replace(redirectPath);
      },
    });
  };

  return (
    <div
      className={cn('w-full font-neo', shake && 'animate-neo-shake')}
    >
      <p className="mb-6 text-base font-bold leading-snug">
        Enter your credentials to access DexDian. Demo:{' '}
        <span className="bg-neo-secondary px-1 font-black">
          admin@dexdian.com
        </span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-black uppercase tracking-[0.2em] text-neo-ink"
          >
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 stroke-[3px] text-neo-ink" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@school.edu"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={cn(
                'h-14 w-full border-4 border-neo-ink bg-neo-white pl-12 pr-4',
                'rounded-none text-lg font-bold text-neo-ink',
                'placeholder:text-neo-ink/40',
                'transition-colors duration-100 ease-out',
                'focus-visible:bg-neo-secondary focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-neo-sm',
                errors.email && 'bg-neo-accent/40',
              )}
            />
          </div>
          {errors.email && (
            <p className="border-2 border-neo-ink bg-neo-accent px-2 py-1 text-sm font-black uppercase tracking-wide">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-black uppercase tracking-[0.2em] text-neo-ink"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 stroke-[3px] text-neo-ink" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className={cn(
                'h-14 w-full border-4 border-neo-ink bg-neo-white pl-12 pr-14',
                'rounded-none text-lg font-bold text-neo-ink',
                'placeholder:text-neo-ink/40',
                'transition-colors duration-100 ease-out',
                'focus-visible:bg-neo-secondary focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-neo-sm',
                errors.password && 'bg-neo-accent/40',
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center border-2 border-neo-ink bg-neo-secondary transition-transform duration-100 ease-out active:translate-x-[1px] active:translate-y-[1px]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 stroke-[3px]" />
              ) : (
                <Eye className="h-4 w-4 stroke-[3px]" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="border-2 border-neo-ink bg-neo-accent px-2 py-1 text-sm font-black uppercase tracking-wide">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit — mechanical push */}
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'flex h-14 w-full items-center justify-center gap-2',
            'border-4 border-neo-ink bg-neo-accent',
            'rounded-none text-sm font-black uppercase tracking-wide text-neo-ink',
            'shadow-neo-sm transition-all duration-100 ease-linear',
            'hover:bg-[#ff5252]',
            'active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-ink focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />
              Signing In…
            </>
          ) : (
            <>
              Sign In
              <span aria-hidden>→</span>
            </>
          )}
        </button>
      </form>

      <p className="mt-6 border-t-4 border-neo-ink pt-4 text-xs font-bold uppercase tracking-widest">
        Authorised students & staff only
      </p>
    </div>
  );
}
