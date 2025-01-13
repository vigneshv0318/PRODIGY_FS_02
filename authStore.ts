import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (username: string, password: string) => {
    
    if (username === 'admin' && password === 'admin123') {
      set({ isAuthenticated: true, user: { username } });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
