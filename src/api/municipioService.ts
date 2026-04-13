import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {MunicipioDto } from '@types';

export const getMunicipios = async (): Promise<MunicipioDto[]> => {
    const { data } = await api.get<MunicipioDto[]>(ENDPOINTS.MUNICIPIO.GETALL);
    return data;
};

export const getMunicipioById = async (id: string): Promise<MunicipioDto> => {
    const { data } = await api.get<MunicipioDto>(ENDPOINTS.MUNICIPIO.GETBYID(id));
    return data;
};