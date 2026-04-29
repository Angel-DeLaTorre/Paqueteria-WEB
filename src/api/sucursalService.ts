import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {SucursalDto, SucursalCreateDto } from '@types';

export const getSucursales = async (): Promise<SucursalDto[]> => {
    const { data } = await api.get<SucursalDto[]>(ENDPOINTS.SUCURSAL.GETALL);
    return data;
};

export const getSucursalById = async (id: string): Promise<SucursalDto> => {
    const { data } = await api.get<SucursalDto>(ENDPOINTS.SUCURSAL.GETBYID(id));
    return data;
};

export const createSucursal = async (sucursal: SucursalCreateDto): Promise<SucursalDto> => {
    const { data } = await api.post<SucursalDto>(ENDPOINTS.SUCURSAL.CREATE, sucursal);
    return data;
};