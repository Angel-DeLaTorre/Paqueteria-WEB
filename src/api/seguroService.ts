// src/api/seguroService.ts
import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type { SeguroDto, SeguroCreateDto, SeguroUpdateDto } from '@types';

export const getSeguros = async (): Promise<SeguroDto[]> => {
    const { data } = await api.get<SeguroDto[]>(ENDPOINTS.SEGURO.GETALL);
    return data;
};

export const getSeguro = async ( id : string): Promise<SeguroDto> => {
    const { data } = await api.get<SeguroDto>(ENDPOINTS.SEGURO.GETBYID(id));
    return data;
};

export const createSeguro = async (seguro: SeguroCreateDto): Promise<SeguroDto> => {
    const { data } = await api.post<SeguroDto>(ENDPOINTS.SEGURO.CREATE, seguro);
    return data;
};

export const updateSeguro = async (seguro: SeguroUpdateDto): Promise<boolean> => {
    const response = await api.put<SeguroDto>(ENDPOINTS.SEGURO.UPDATE(seguro.id), seguro);
    return response.status === 204 || response.status === 200;
};

export const deleteSeguro = async ( id : string ): Promise<boolean> => {
    const response = await api.delete<SeguroDto>(ENDPOINTS.SEGURO.DELETE(id));
    return response.status === 204 || response.status === 200;
};