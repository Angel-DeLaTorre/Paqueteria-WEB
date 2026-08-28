import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ChoferDto, ChoferCreateDto, ChoferUpdateDto, Result} from '@types';

export const getChoferes = async (): Promise<Result<ChoferDto[]>> => {
    const { data } = await api.get<Result<ChoferDto[]>>(ENDPOINTS.CHOFER.GETALL);
    return data;
};

export const getChoferById = async (id: string): Promise<Result<ChoferDto>> => {
    const { data } = await api.get<Result<ChoferDto>>(ENDPOINTS.CHOFER.GETBYID(id));
    return data;
};

export const createChofer = async (chofer: ChoferCreateDto): Promise<Result<ChoferDto>> => {
    const { data } = await api.post<Result<ChoferDto>>(ENDPOINTS.CHOFER.CREATE, chofer);
    return data;
};

export const updateChofer = async (chofer: ChoferUpdateDto): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.CHOFER.UPDATE(chofer.choferId), chofer);
    return data;
}