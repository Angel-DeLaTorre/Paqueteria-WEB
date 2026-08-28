import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {LoginSolicitudDto, SesionRespuestaDto, Respuesta} from '@types';

export const postLogin = async (credentials: LoginSolicitudDto): Promise<Respuesta<SesionRespuestaDto>> => {
    const { data } = await api.post<Respuesta<SesionRespuestaDto>>(ENDPOINTS.AUTH.LOGIN, credentials);
    return data;
};