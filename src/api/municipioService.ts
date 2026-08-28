import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {Respuesta, MunicipioDto} from '@types';

export const getMunicipios = async (): Promise<Respuesta<MunicipioDto[]>> => {
    const { data } = await api.get<Respuesta<MunicipioDto[]>>(ENDPOINTS.MUNICIPIO.GETALL);
    return data;
};

export const getMunicipiosByEstado = async (estadoId: string): Promise<Respuesta<MunicipioDto[]>> => {
    const { data } = await api.get<Respuesta<MunicipioDto[]>>(ENDPOINTS.MUNICIPIO.GETBYESTADO(estadoId));
    return data;
};

export const getMunicipioById = async (id: string): Promise<Respuesta<MunicipioDto>> => {
    const { data } = await api.get<Respuesta<MunicipioDto>>(ENDPOINTS.MUNICIPIO.GETBYID(id));
    return data;
};