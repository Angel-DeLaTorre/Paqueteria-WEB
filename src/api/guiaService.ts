import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {GuiaDto, GuiaCreateDto, GuiaUpdateDto} from '@types';

export const getGuias = async (): Promise<GuiaDto[]> => {
    const { data } = await api.get<GuiaDto[]>(ENDPOINTS.GUIA.GETALL);
    return data;
};

export const getGuiaById = async (id: string): Promise<GuiaDto> => {
    const { data } = await api.get<GuiaDto>(ENDPOINTS.GUIA.GETBYID(id));
    return data;
};

export const createGuia = async (guia: GuiaCreateDto): Promise<GuiaDto> => {
    const { data } = await api.post<GuiaDto>(ENDPOINTS.GUIA.CREATE, guia);
    return data;
};

export const updateGuia = async (id: string, guia: GuiaUpdateDto): Promise<boolean> => {
    const { data } = await api.post(ENDPOINTS.GUIA.UPDATE(id), guia);
    return data;
}