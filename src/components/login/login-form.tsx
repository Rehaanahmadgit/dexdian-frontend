'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2, LogIn } from 'lucide-react';
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
    errors.email = 'Please enter a valid email';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

// ─── Animation Variants ──────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

// ─── Component ───────────────────────────────────────────

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/home';

  const { mutate: login, isPending } = useLogin();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  // ── Handlers ──────────────────────────────────────

  const handleChange = (field: keyof typeof INITIAL_VALUES, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
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
      setTimeout(() => setShake(false), 500);
      return;
    }

    login(values, {
      onSuccess: () => {
        router.replace(redirectPath);
      },
    });
  };

  // ── Render ────────────────────────────────────────

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      {/* --- Glass Card --- */}
      <motion.div
        animate={shake ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={cn(
          'relative overflow-hidden rounded-2xl border border-white/20',
          'bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl',
          'shadow-2xl shadow-black/5 dark:shadow-black/30',
        )}
      >
        {/* Shine accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="p-8 sm:p-10">
          {/* --- Header --- */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <LogIn className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome to DexDain
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to your student portal
            </p>
          </motion.div>

          {/* --- Form --- */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@school.edu"
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={cn(
                    'w-full h-11 pl-10 pr-4 rounded-xl text-sm',
                    'bg-muted/50 border border-border',
                    'placeholder:text-muted-foreground/60',
                    'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                    'transition-all duration-200',
                    errors.email && 'border-destructive focus:ring-destructive/30',
                  )}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive pl-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={cn(
                    'w-full h-11 pl-10 pr-11 rounded-xl text-sm',
                    'bg-muted/50 border border-border',
                    'placeholder:text-muted-foreground/60',
                    'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                    'transition-all duration-200',
                    errors.password && 'border-destructive focus:ring-destructive/30',
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive pl-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isPending}
                className={cn(
                  'w-full h-11 rounded-xl font-semibold text-sm',
                  'bg-primary text-primary-foreground',
                  'hover:opacity-90 active:scale-[0.98]',
                  'transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50',
                  'disabled:opacity-60 disabled:cursor-not-allowed',
                  'flex items-center justify-center gap-2',
                )}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* --- Footer --- */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-center text-xs text-muted-foreground"
      >
        DexDain School Management Platform
      </motion.p>
    </motion.div>
  );
}
