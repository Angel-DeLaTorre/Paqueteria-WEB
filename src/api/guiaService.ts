import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {GuiaDto, GuiaCreateDto, GuiaUpdateDto, ApiResult} from '@types';

export const getGuias = async (): Promise<ApiResult<GuiaDto[]>> => {
    const { data } = await api.get<ApiResult<GuiaDto[]>>(ENDPOINTS.GUIA.GETALL);
    return data;
};

export const getGuiaById = async (id: string): Promise<ApiResult<GuiaDto>> => {
    const { data } = await api.get<ApiResult<GuiaDto>>(ENDPOINTS.GUIA.GETBYID(id));
    return data;
};

export const createGuia = async (guia: GuiaCreateDto): Promise<ApiResult<GuiaDto>> => {
    const { data } = await api.post<ApiResult<GuiaDto>>(ENDPOINTS.GUIA.CREATE, guia);
    return data;
};

export const updateGuia = async (guia: GuiaUpdateDto): Promise<ApiResult<boolean>> => {
    const { data } = await api.put<ApiResult<boolean>>(ENDPOINTS.GUIA.UPDATE(guia.id), guia);
    return data;
}