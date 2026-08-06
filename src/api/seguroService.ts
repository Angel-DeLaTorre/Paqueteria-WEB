import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {SeguroDto, SeguroCreateDto, SeguroUpdateDto, Result} from '@types';

export const getSeguros = async (): Promise<Result<SeguroDto[]>> => {
    const { data } = await api.get<Result<SeguroDto[]>>(ENDPOINTS.SEGURO.GETALL);
    return data;
};

export const getSeguro = async ( id : string): Promise<Result<SeguroDto>> => {
    const { data } = await api.get<Result<SeguroDto>>(ENDPOINTS.SEGURO.GETBYID(id));
    return data;
};

export const createSeguro = async (seguro: SeguroCreateDto): Promise<Result<SeguroDto>> => {
    const { data } = await api.post<Result<SeguroDto>>(ENDPOINTS.SEGURO.CREATE, seguro);
    return data;
};

export const updateSeguro = async (seguro: SeguroUpdateDto): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.SEGURO.UPDATE(seguro.seguroId), seguro);
    return data;
};

export const deleteSeguro = async ( id : string ): Promise<Result<boolean>> => {
    const { data } = await api.delete<Result<boolean>>(ENDPOINTS.SEGURO.DELETE(id));
    return data;
};

export const desactivarSeguro = async ( id : string ): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.SEGURO.DESACTIVAR(id));
    return data;
};