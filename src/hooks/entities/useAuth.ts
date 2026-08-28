import { useState } from 'react';
import { postLogin } from '@api/authService.ts';
import { useAuthStore } from '@store/useAuthStore.ts';
import {type Respuesta, type LoginSolicitudDto, type SesionRespuestaDto} from '@types';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const setSession = useAuthStore((state) => state.setSession);
    const logout = useAuthStore((state) => state.clearSession);

    const executeLogin = async (values: LoginSolicitudDto) : Promise<Respuesta<SesionRespuestaDto>> =>
    {
        setLoading(true);
        try
        {
            const result = await postLogin(values);
            if (result.esExitoso && result.datos) {
                setSession(result.datos);
            }
            return result;
        }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (error : unknown)
        {
            return {
                esExitoso: false,
                datos: null,
                detalleError: {
                    codigo: 'FRONTEND_EXCEPTION',
                    descripcion: 'Ocurrió un error inesperado al procesar la sesión en la aplicación.'
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