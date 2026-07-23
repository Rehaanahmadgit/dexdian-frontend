import { create } from 'zustand';
import Cookies from 'js-cookie';
import { STUDENT } from '@/src/lib/dummy-data';
import type { User } from '@/src/types';

// ─── Types ───────────────────────────────────────────────

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  hydrate: () => void;
}

// ─── Store ───────────────────────────────────────────────

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  login: (user, token) => {
    Cookies.set('accessToken', token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    // Keep a copy so refresh still has profile data
    if (typeof window !== 'undefined') {
      localStorage.setItem('dexdian_user', JSON.stringify(user));
    }
    set({ user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    Cookies.remove('accessToken');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dexdian_user');
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  setLoading: (isLoading) => set({ isLoading }),

  hydrate: () => {
    if (typeof window === 'undefined') return;

    const token = Cookies.get('accessToken');
    if (!token) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    // Prefer existing in-memory user, then localStorage, then demo fallback
    let user = get().user;
    if (!user) {
      try {
        const raw = localStorage.getItem('dexdian_user');
        if (raw) user = JSON.parse(raw) as User;
      } catch {
        user = null;
      }
    }

    if (!user) {
      user = {
        id: STUDENT.id,
        name: STUDENT.name,
        email: STUDENT.email,
        role: STUDENT.role,
        avatar: STUDENT.avatar ?? undefined,
        grade: STUDENT.grade,
        section: STUDENT.section,
      };
    }

    set({ user, isAuthenticated: true, isLoading: false });
  },
}));
