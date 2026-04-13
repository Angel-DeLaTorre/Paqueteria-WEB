import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ArticuloDto, ArticuloCreateDto, ArticuloUpdateDto} from '@types';

export const getArticulos = async (): Promise<ArticuloDto[]> => {
    const { data } = await api.get<ArticuloDto[]>(ENDPOINTS.ARTICULO.GETALL);
    return data;
};

export const getArticuloById = async (id: string): Promise<ArticuloDto> => {
    const { data } = await api.get<ArticuloDto>(ENDPOINTS.ARTICULO.GETBYID(id));
    return data;
};

export const createArticulo = async (articulo: ArticuloCreateDto): Promise<ArticuloDto> => {
    const { data } = await api.post<ArticuloDto>(ENDPOINTS.ARTICULO.CREATE, articulo);
    return data;
};

export const updateArticulo = async (id: string, articulo: ArticuloUpdateDto): Promise<boolean> => {
    const { data } = await api.post(ENDPOINTS.ARTICULO.UPDATE(id), articulo);
    return data;
}