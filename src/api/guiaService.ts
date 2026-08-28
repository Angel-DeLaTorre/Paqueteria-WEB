import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {GuiaDto, GuiaCreateDto, GuiaUpdateDto, Result, GuiaCreadaDto} from '@types';

export const getGuias = async (): Promise<Result<GuiaDto[]>> => {
    const { data } = await api.get<Result<GuiaDto[]>>(ENDPOINTS.GUIA.GETALL);
    return data;
};

export const getGuiaById = async (id: string): Promise<Result<GuiaDto>> => {
    const { data } = await api.get<Result<GuiaDto>>(ENDPOINTS.GUIA.GETBYID(id));
    return data;
};

export const createGuia = async (guia: GuiaCreateDto): Promise<Result<GuiaCreadaDto>> => {
    const { data } = await api.post<Result<GuiaCreadaDto>>(ENDPOINTS.GUIA.CREATE, guia);
    return data;
};

export const updateGuia = async (guia: GuiaUpdateDto): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.GUIA.UPDATE(guia.id), guia);
    return data;
}