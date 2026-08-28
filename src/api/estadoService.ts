import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {Respuesta, EstadoDto} from '@types';

export const getEstados = async (): Promise<Respuesta<EstadoDto[]>> => {
    const { data } = await api.get<Respuesta<EstadoDto[]>>(ENDPOINTS.ESTADO.GETALL);
    return data;
};

export const getEstadoById = async (id: string): Promise<Respuesta<EstadoDto>> => {
    const { data } = await api.get<Respuesta<EstadoDto>>(ENDPOINTS.ESTADO.GETBYID(id));
    return data;
};