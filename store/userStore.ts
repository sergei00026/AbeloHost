import { create } from 'zustand';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
};
export const useUserStore = create<UserStore>((set) => ({
  user: typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null,
  setUser: (user) => {
    set({ user });
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  logout: () => {
    set({ user: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },
  updateTokens: (accessToken, refreshToken) =>
    set((state) =>
      state.user
        ? (() => {
            const updatedUser = { ...state.user, accessToken, refreshToken };
            if (typeof window !== 'undefined') {
              localStorage.setItem('user', JSON.stringify(updatedUser));
            }
            return { user: updatedUser };
          })()
        : {}
    ),
}));
