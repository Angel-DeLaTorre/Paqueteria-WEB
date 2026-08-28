import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {SeguroDto, SeguroCrearDto, SeguroActualizarDto, Respuesta} from '@types';

export const getSeguros = async (): Promise<Respuesta<SeguroDto[]>> => {
    const { data } = await api.get<Respuesta<SeguroDto[]>>(ENDPOINTS.SEGURO.GETALL);
    return data;
};

export const getSeguro = async ( id : string): Promise<Respuesta<SeguroDto>> => {
    const { data } = await api.get<Respuesta<SeguroDto>>(ENDPOINTS.SEGURO.GETBYID(id));
    return data;
};

export const createSeguro = async (seguro: SeguroCrearDto): Promise<Respuesta<SeguroDto>> => {
    const { data } = await api.post<Respuesta<SeguroDto>>(ENDPOINTS.SEGURO.CREATE, seguro);
    return data;
};

export const updateSeguro = async (seguro: SeguroActualizarDto): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.SEGURO.UPDATE(seguro.seguroId), seguro);
    return data;
};

export const deleteSeguro = async ( id : string ): Promise<Respuesta<boolean>> => {
    const { data } = await api.delete<Respuesta<boolean>>(ENDPOINTS.SEGURO.DELETE(id));
    return data;
};

export const desactivarSeguro = async ( id : string ): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.SEGURO.DESACTIVAR(id));
    return data;
};