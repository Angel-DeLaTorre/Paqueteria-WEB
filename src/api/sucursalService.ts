import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {SucursalDto, SucursalCreateDto, SucursalUpdateDto, ApiResult} from '@types';

export const getSucursales = async (): Promise<ApiResult<SucursalDto[]>> => {
    const { data } = await api.get<ApiResult<SucursalDto[]>>(ENDPOINTS.SUCURSAL.GETALL);
    return data;
};

export const getSucursalById = async (id: string): Promise<ApiResult<SucursalDto>> => {
    const { data } = await api.get<ApiResult<SucursalDto>>(ENDPOINTS.SUCURSAL.GETBYID(id));
    return data;
};

export const createSucursal = async (sucursal: SucursalCreateDto): Promise<ApiResult<SucursalDto>> => {
    const { data } = await api.post<ApiResult<SucursalDto>>(ENDPOINTS.SUCURSAL.CREATE, sucursal);
    return data;
};

export const updateSucursal = async (sucursal: SucursalUpdateDto): Promise<ApiResult<SucursalDto>> => {
    const { data } = await api.put<ApiResult<SucursalDto>>(ENDPOINTS.SUCURSAL.UPDATE(sucursal.sucursalId), sucursal);
    return data;
};