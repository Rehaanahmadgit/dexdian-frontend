import { create } from 'zustand';
import Cookies from 'js-cookie';
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

export const useAuthStore = create<AuthState>((set) => ({
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
    set({ user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    Cookies.remove('accessToken');
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  setLoading: (isLoading) => set({ isLoading }),

  hydrate: () => {
    const token = Cookies.get('accessToken');
    // Mark loading as done — actual user fetch happens in the app
    set({ isLoading: false, isAuthenticated: !!token });
  },
}));
