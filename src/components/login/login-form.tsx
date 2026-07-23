'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
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
    errors.email = 'Please enter a valid email address';
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
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
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
      setTimeout(() => setShake(false), 500);
      return;
    }

    login(values, {
      onSuccess: () => {
        router.replace(redirectPath);
      },
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[420px]"
    >
      <motion.div
        animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-9">
          <p className="text-[13px] font-semibold tracking-[0.14em] uppercase text-[#0F6CBD] mb-3">
            Student Portal
          </p>
          <h1
            className="text-[1.875rem] sm:text-[2.125rem] font-semibold tracking-tight text-[#242424] leading-tight"
            style={{ fontFamily: 'var(--font-login-serif), Georgia, serif' }}
          >
            Sign in
          </h1>
          <p className="mt-2.5 text-[15px] sm:text-base leading-relaxed text-[#616161]">
            Enter your credentials to access DexDian.
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <motion.div variants={itemVariants} className="space-y-2">
            <label
              htmlFor="email"
              className="block text-[14px] font-semibold text-[#242424]"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8A8886] pointer-events-none" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@school.edu"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={cn(
                  'w-full h-12 pl-11 pr-4 rounded-md text-[15px] text-[#242424]',
                  'bg-white border border-[#D1D1D1]',
                  'placeholder:text-[#A19F9D]',
                  'focus:outline-none focus:border-[#0F6CBD] focus:ring-2 focus:ring-[#0F6CBD]/25',
                  'transition-all duration-150',
                  errors.email &&
                    'border-[#C50F1F] focus:border-[#C50F1F] focus:ring-[#C50F1F]/20',
                )}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[13px] text-[#C50F1F]"
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label
              htmlFor="password"
              className="block text-[14px] font-semibold text-[#242424]"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8A8886] pointer-events-none" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={cn(
                  'w-full h-12 pl-11 pr-12 rounded-md text-[15px] text-[#242424]',
                  'bg-white border border-[#D1D1D1]',
                  'placeholder:text-[#A19F9D]',
                  'focus:outline-none focus:border-[#0F6CBD] focus:ring-2 focus:ring-[#0F6CBD]/25',
                  'transition-all duration-150',
                  errors.password &&
                    'border-[#C50F1F] focus:border-[#C50F1F] focus:ring-[#C50F1F]/20',
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A8886] hover:text-[#242424] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-[18px] h-[18px]" />
                ) : (
                  <Eye className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[13px] text-[#C50F1F]"
              >
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-1">
            <button
              type="submit"
              disabled={isPending}
              className={cn(
                'w-full h-12 rounded-md font-semibold text-[15px] tracking-wide',
                'bg-[#0F6CBD] text-white',
                'hover:bg-[#115EA3] active:bg-[#0F548C]',
                'transition-colors duration-150',
                'focus:outline-none focus:ring-2 focus:ring-[#0F6CBD]/40 focus:ring-offset-2',
                'disabled:opacity-60 disabled:cursor-not-allowed',
                'flex items-center justify-center gap-2',
              )}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </motion.div>
        </form>

        <motion.p
          variants={itemVariants}
          className="mt-10 text-[13px] leading-relaxed text-[#8A8886]"
        >
          Protected access for authorised students and staff only.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
