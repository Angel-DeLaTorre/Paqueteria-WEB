import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {Result, MunicipioDto} from '@types';

export const getMunicipios = async (): Promise<Result<MunicipioDto[]>> => {
    const { data } = await api.get<Result<MunicipioDto[]>>(ENDPOINTS.MUNICIPIO.GETALL);
    return data;
};

export const getMunicipiosByEstado = async (estadoId: string): Promise<Result<MunicipioDto[]>> => {
    const { data } = await api.get<Result<MunicipioDto[]>>(ENDPOINTS.MUNICIPIO.GETBYESTADO(estadoId));
    return data;
};

export const getMunicipioById = async (id: string): Promise<Result<MunicipioDto>> => {
    const { data } = await api.get<Result<MunicipioDto>>(ENDPOINTS.MUNICIPIO.GETBYID(id));
    return data;
};