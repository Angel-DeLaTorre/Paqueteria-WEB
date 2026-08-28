import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {Result, EstadoDto} from '@types';

export const getEstados = async (): Promise<Result<EstadoDto[]>> => {
    const { data } = await api.get<Result<EstadoDto[]>>(ENDPOINTS.ESTADO.GETALL);
    return data;
};

export const getEstadoById = async (id: string): Promise<Result<EstadoDto>> => {
    const { data } = await api.get<Result<EstadoDto>>(ENDPOINTS.ESTADO.GETBYID(id));
    return data;
};