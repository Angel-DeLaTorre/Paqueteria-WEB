import axios, {AxiosError, type AxiosResponse} from 'axios';
import { useAuthStore } from '@store/useAuthStore';
import type {ApiResult} from "@types";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el Token de seguridad en el futuro
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response: AxiosResponse) => {
        const result = response.data as ApiResult<unknown>;
        return { ...response, data: result };
    },
    (error: unknown) => {
        // 2. Captura errores del GlobalExceptionHandler de .NET (HTTP 400, 401, 500, etc.) o fallas de red
        let formatoErrorGlobal: ApiResult<null> = {
            isSuccess: false,
            value: null,
            detalleError: {
                code: 'UNKNOWN_ERROR',
                description: 'Ocurrió un error inesperado en la comunicación con el servidor.',
            }
        };

        if (error instanceof AxiosError) {
            // Si el backend adjuntó el formato ApiResult dentro del cuerpo del error HTTP (muy común en .NET)
            if (error.response?.data && 'isSuccess' in error.response.data) {
                formatoErrorGlobal = error.response.data as ApiResult<null>;
            } else if (error.response?.data?.detalleError) {
                // Si solo envió el detalleError suelto
                formatoErrorGlobal.detalleError = error.response.data.detalleError;
            } else if (error.message) {
                // Si es un error de Axios puro (como un Timeout o red caída)
                formatoErrorGlobal.detalleError = {
                    code: error.code || 'ERR_NETWORK',
                    description: `Error de red: ${error.message}`
                };
            }
        }

        // ¡ESTA ES LA CLAVE!: Forzamos a Axios a Resolver la promesa en lugar de rechazarla.
        // De esta manera, el flujo en tus servicios y hooks nunca se interrumpe catastróficamente.
        return Promise.resolve({
            ...((error as AxiosError).response || {}),
            data: formatoErrorGlobal
        });
    }
);

export default api;