import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || 'Error de red con la API';
    }
    if (error instanceof Error) return error.message;
    return 'Error desconocido';
};