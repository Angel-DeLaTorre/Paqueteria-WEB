import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ArticuloDto, ArticuloCreateDto, ArticuloUpdateDto, Respuesta} from '@types';

export const getArticulos = async (): Promise<Respuesta<ArticuloDto[]>> => {
    const { data } = await api.get<Respuesta<ArticuloDto[]>>(ENDPOINTS.ARTICULO.GETALL);
    return data;
};

export const getArticuloById = async (id: string): Promise<Respuesta<ArticuloDto>> => {
    const { data } = await api.get<Respuesta<ArticuloDto>>(ENDPOINTS.ARTICULO.GETBYID(id));
    return data;
};

export const createArticulo = async (articulo: ArticuloCreateDto): Promise<Respuesta<ArticuloDto>> => {
    const { data } = await api.post<Respuesta<ArticuloDto>>(ENDPOINTS.ARTICULO.CREATE, articulo);
    return data;
};

export const updateArticulo = async (id: string, articulo: ArticuloUpdateDto): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.ARTICULO.UPDATE(id), articulo);
    return data;
}