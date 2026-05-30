import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ApiResult, MunicipioDto} from '@types';

export const getMunicipios = async (): Promise<ApiResult<MunicipioDto[]>> => {
    const { data } = await api.get<ApiResult<MunicipioDto[]>>(ENDPOINTS.MUNICIPIO.GETALL);
    return data;
};

export const getMunicipiosByEstado = async (estadoId: string): Promise<ApiResult<MunicipioDto[]>> => {
    const { data } = await api.get<ApiResult<MunicipioDto[]>>(ENDPOINTS.MUNICIPIO.GETBYESTADO(estadoId));
    return data;
};

export const getMunicipioById = async (id: string): Promise<ApiResult<MunicipioDto>> => {
    const { data } = await api.get<ApiResult<MunicipioDto>>(ENDPOINTS.MUNICIPIO.GETBYID(id));
    return data;
};