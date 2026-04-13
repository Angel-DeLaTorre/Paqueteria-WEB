import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type { EstadoDto } from '@types';

export const getEstados = async (): Promise<EstadoDto[]> => {
    const { data } = await api.get<EstadoDto[]>(ENDPOINTS.ESTADO.GETALL);
    return data;
};

export const getEstadoById = async (id: string): Promise<EstadoDto> => {
    const { data } = await api.get<EstadoDto>(ENDPOINTS.ESTADO.GETBYID(id));
    return data;
};