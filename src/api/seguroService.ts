import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {SeguroDto, SeguroCreateDto, SeguroUpdateDto, ApiResult} from '@types';

export const getSeguros = async (): Promise<ApiResult<SeguroDto[]>> => {
    const { data } = await api.get<ApiResult<SeguroDto[]>>(ENDPOINTS.SEGURO.GETALL);
    return data;
};

export const getSeguro = async ( id : string): Promise<ApiResult<SeguroDto>> => {
    const { data } = await api.get<ApiResult<SeguroDto>>(ENDPOINTS.SEGURO.GETBYID(id));
    return data;
};

export const createSeguro = async (seguro: SeguroCreateDto): Promise<ApiResult<SeguroDto>> => {
    const { data } = await api.post<ApiResult<SeguroDto>>(ENDPOINTS.SEGURO.CREATE, seguro);
    return data;
};

export const updateSeguro = async (seguro: SeguroUpdateDto): Promise<ApiResult<boolean>> => {
    const { data } = await api.put<ApiResult<boolean>>(ENDPOINTS.SEGURO.UPDATE(seguro.seguroId), seguro);
    return data;
};

export const deleteSeguro = async ( id : string ): Promise<ApiResult<boolean>> => {
    const { data } = await api.delete<ApiResult<boolean>>(ENDPOINTS.SEGURO.DELETE(id));
    return data;
};