import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ArticuloDto, ArticuloCreateDto, ArticuloUpdateDto, ApiResult} from '@types';

export const getArticulos = async (): Promise<ApiResult<ArticuloDto[]>> => {
    const { data } = await api.get<ApiResult<ArticuloDto[]>>(ENDPOINTS.ARTICULO.GETALL);
    return data;
};

export const getArticuloById = async (id: string): Promise<ApiResult<ArticuloDto>> => {
    const { data } = await api.get<ApiResult<ArticuloDto>>(ENDPOINTS.ARTICULO.GETBYID(id));
    return data;
};

export const createArticulo = async (articulo: ArticuloCreateDto): Promise<ApiResult<ArticuloDto>> => {
    const { data } = await api.post<ApiResult<ArticuloDto>>(ENDPOINTS.ARTICULO.CREATE, articulo);
    return data;
};

export const updateArticulo = async (id: string, articulo: ArticuloUpdateDto): Promise<ApiResult<boolean>> => {
    const { data } = await api.put<ApiResult<boolean>>(ENDPOINTS.ARTICULO.UPDATE(id), articulo);
    return data;
}