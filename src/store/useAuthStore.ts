import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SesionDto } from '@types';

interface AuthState {
    token: string | null;
    user: UserSession | null;
    isAuthenticated: boolean;
    expiracion: string | null;
    setSession: (sessionData: SesionDto) => void;
    clearSession: () => void;
    hasPermission: (permisoRequerido: string) => boolean;
    isTokenActive: () => boolean;
}

interface UserSession {
    username: string;
    nombre: string;
    permisos: string[];
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            expiracion: null,

            setSession: (sessionData: SesionDto) => {
                set({
                    token: sessionData.token,
                    user: {
                        username: sessionData.username,
                        nombre: sessionData.nombre,
                        permisos: sessionData.permisos || []
                    },
                    expiracion: sessionData.expiracion.toString(),
                    isAuthenticated: true
                });
            },

            clearSession: () => set({ token: null, user: null, expiracion: null,  isAuthenticated: false }),

            hasPermission: (permisoRequerido: string) => {
                const { user } = get();
                if (!user || !user.permisos) return false;

                return user.permisos.includes(permisoRequerido);
            },

            isTokenActive: () => {
                const { expiracion } = get();

                if (!expiracion) return false;
                const fechaExp = new Date(expiracion);
                const ahora = new Date();

                return fechaExp > ahora;
            },
        }),
        {
            name: 'auth-storage'
        }
    )
);