import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

interface AuthState {
    token: string | null;
    user: JwtPayload | null;
    isAuthenticated: boolean;
    setSession: (token: string) => void;
    clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,

            setSession: (token: string) => {
                const decoded = jwtDecode(token);
                set({
                    token,
                    user: decoded,
                    isAuthenticated: true
                });
            },

            clearSession: () => set({ token: null, user: null, isAuthenticated: false }),
        }),
        { name: 'auth-storage' }
    )
);