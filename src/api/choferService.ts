import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ChoferDto, ChoferCreateDto, ChoferUpdateDto, ApiResult} from '@types';

export const getChoferes = async (): Promise<ApiResult<ChoferDto[]>> => {
    const { data } = await api.get<ApiResult<ChoferDto[]>>(ENDPOINTS.CHOFER.GETALL);
    return data;
};

export const getChoferById = async (id: string): Promise<ApiResult<ChoferDto>> => {
    const { data } = await api.get<ApiResult<ChoferDto>>(ENDPOINTS.CHOFER.GETBYID(id));
    return data;
};

export const createChofer = async (chofer: ChoferCreateDto): Promise<ApiResult<ChoferDto>> => {
    const { data } = await api.post<ApiResult<ChoferDto>>(ENDPOINTS.CHOFER.CREATE, chofer);
    return data;
};

export const updateChofer = async (chofer: ChoferUpdateDto): Promise<ApiResult<boolean>> => {
    const { data } = await api.put<ApiResult<boolean>>(ENDPOINTS.CHOFER.UPDATE(chofer.choferId), chofer);
    return data;
}