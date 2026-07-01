import { useMutation } from '@tanstack/react-query';
import apiClient from '@/src/lib/axios';
import { useAuthStore } from '@/src/stores/auth-store';
import { STUDENT } from '@/src/lib/dummy-data';
import type { LoginRequest, LoginResponse } from '@/src/types';
import toast from 'react-hot-toast';

// ─── Constants ───────────────────────────────────────────

const DUMMY_EMAIL = 'admin@dexdain.com';
const DUMMY_PASSWORD = 'dexdain123';
const FAKE_TOKEN = 'dummy-jwt-token-for-development';

// ─── Login Logic (API → Dummy Fallback) ──────────────────

async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  // Step 1 — Try the real backend API
  try {
    const { data } = await apiClient.post<LoginResponse>(
      '/v1/guardian/login',
      payload,
    );
    return data;
  } catch (apiError) {
    // Step 2 — Fallback: check dummy credentials
    if (payload.email === DUMMY_EMAIL && payload.password === DUMMY_PASSWORD) {
      // Simulate a short network delay for realistic UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      return {
        success: true,
        data: {
          user: {
            id: STUDENT.id,
            name: STUDENT.name,
            email: STUDENT.email,
            role: STUDENT.role,
            avatar: STUDENT.avatar ?? undefined,
            grade: STUDENT.grade,
            section: STUDENT.section,
          },
          token: FAKE_TOKEN,
        },
        message: 'Welcome back! (Demo Mode) 🎓',
      };
    }

    // Step 3 — Neither worked; re-throw so the error handler shows the message
    throw apiError;
  }
}

// ─── Hook ────────────────────────────────────────────────

export function useLogin() {
  const { login: setAuth, logout } = useAuthStore();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      const { user, token } = response.data;
      setAuth(user, token);
      toast.success(response.message || 'Welcome back! 🎓');
    },

    onError: (error: unknown) => {
      let message = 'Invalid email or password';

      // Try to extract a server-side error message
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: {
            data?: { message?: string; errors?: Record<string, string[]> };
          };
        };
        message =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.errors?.email?.[0] ||
          axiosError.response?.data?.errors?.password?.[0] ||
          message;
      }

      toast.error(message);
      logout();
    },
  });
}
