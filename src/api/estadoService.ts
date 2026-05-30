import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ApiResult, EstadoDto} from '@types';

export const getEstados = async (): Promise<ApiResult<EstadoDto[]>> => {
    const { data } = await api.get<ApiResult<EstadoDto[]>>(ENDPOINTS.ESTADO.GETALL);
    return data;
};

export const getEstadoById = async (id: string): Promise<ApiResult<EstadoDto>> => {
    const { data } = await api.get<ApiResult<EstadoDto>>(ENDPOINTS.ESTADO.GETBYID(id));
    return data;
};