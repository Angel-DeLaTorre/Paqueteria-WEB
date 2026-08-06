import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {SucursalDto, SucursalCreateDto, SucursalUpdateDto, Result} from '@types';

export const getSucursales = async (): Promise<Result<SucursalDto[]>> => {
    const { data } = await api.get<Result<SucursalDto[]>>(ENDPOINTS.SUCURSAL.GETALL);
    return data;
};

export const getSucursalById = async (id: string): Promise<Result<SucursalDto>> => {
    const { data } = await api.get<Result<SucursalDto>>(ENDPOINTS.SUCURSAL.GETBYID(id));
    return data;
};

export const createSucursal = async (sucursal: SucursalCreateDto): Promise<Result<SucursalDto>> => {
    const { data } = await api.post<Result<SucursalDto>>(ENDPOINTS.SUCURSAL.CREATE, sucursal);
    return data;
};

export const updateSucursal = async (sucursal: SucursalUpdateDto): Promise<Result<SucursalDto>> => {
    const { data } = await api.put<Result<SucursalDto>>(ENDPOINTS.SUCURSAL.UPDATE(sucursal.sucursalId), sucursal);
    return data;
};

export const desactivarSucursal = async ( id : string ): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.SUCURSAL.DESACTIVAR(id));
    return data;
};