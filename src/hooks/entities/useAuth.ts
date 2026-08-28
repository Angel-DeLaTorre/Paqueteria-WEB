import { useState } from 'react';
import { postLogin } from '@api/authService.ts';
import { useAuthStore } from '@store/useAuthStore.ts';
import {type ApiResult, type LoginDto, type SesionDto} from '@types';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const setSession = useAuthStore((state) => state.setSession);
    const logout = useAuthStore((state) => state.clearSession);

    const executeLogin = async (values: LoginDto) : Promise<ApiResult<SesionDto>> =>
    {
        setLoading(true);
        try
        {
            const result = await postLogin(values);
            if (result.isSuccess && result.value) {
                setSession(result.value);
            }
            return result;
        }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (error : unknown)
        {
            return {
                isSuccess: false,
                value: null,
                detalleError: {
                    code: 'FRONTEND_EXCEPTION',
                    description: 'Ocurrió un error inesperado al procesar la sesión en la aplicación.'
                }
            };
        }
        finally
        {
            setLoading(false);
        }
    };

    return { executeLogin, loading, logout };
};