import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ChoferDto, ChoferCrearDto, ChoferActualizarDto, Respuesta} from '@types';

export const getChoferes = async (): Promise<Respuesta<ChoferDto[]>> => {
    const { data } = await api.get<Respuesta<ChoferDto[]>>(ENDPOINTS.CHOFER.GETALL);
    return data;
};

export const getChoferById = async (id: string): Promise<Respuesta<ChoferDto>> => {
    const { data } = await api.get<Respuesta<ChoferDto>>(ENDPOINTS.CHOFER.GETBYID(id));
    return data;
};

export const createChofer = async (chofer: ChoferCrearDto): Promise<Respuesta<ChoferDto>> => {
    const { data } = await api.post<Respuesta<ChoferDto>>(ENDPOINTS.CHOFER.CREATE, chofer);
    return data;
};

export const updateChofer = async (chofer: ChoferActualizarDto): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.CHOFER.UPDATE(chofer.choferId), chofer);
    return data;
}