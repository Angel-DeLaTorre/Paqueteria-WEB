import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ArticuloDto, ArticuloCreateDto, ArticuloUpdateDto, Result} from '@types';

export const getArticulos = async (): Promise<Result<ArticuloDto[]>> => {
    const { data } = await api.get<Result<ArticuloDto[]>>(ENDPOINTS.ARTICULO.GETALL);
    return data;
};

export const getArticuloById = async (id: string): Promise<Result<ArticuloDto>> => {
    const { data } = await api.get<Result<ArticuloDto>>(ENDPOINTS.ARTICULO.GETBYID(id));
    return data;
};

export const createArticulo = async (articulo: ArticuloCreateDto): Promise<Result<ArticuloDto>> => {
    const { data } = await api.post<Result<ArticuloDto>>(ENDPOINTS.ARTICULO.CREATE, articulo);
    return data;
};

export const updateArticulo = async (id: string, articulo: ArticuloUpdateDto): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.ARTICULO.UPDATE(id), articulo);
    return data;
}