import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ChoferDto, ChoferCreateDto, ChoferUpdateDto} from '@types';

export const getChoferes = async (): Promise<ChoferDto[]> => {
    const { data } = await api.get<ChoferDto[]>(ENDPOINTS.CHOFER.GETALL);
    return data;
};

export const getChoferById = async (id: string): Promise<ChoferDto> => {
    const { data } = await api.get<ChoferDto>(ENDPOINTS.CHOFER.GETBYID(id));
    return data;
};

export const createChofer = async (chofer: ChoferCreateDto): Promise<ChoferDto> => {
    const { data } = await api.post<ChoferDto>(ENDPOINTS.CHOFER.CREATE, chofer);
    return data;
};

export const updateChofer = async (id: string, chofer: ChoferUpdateDto): Promise<boolean> => {
    const { data } = await api.post(ENDPOINTS.CHOFER.UPDATE(id), chofer);
    return data;
}