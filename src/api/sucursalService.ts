import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {SucursalDto, SucursalCrearDto, SucursalActualizarDto, Respuesta} from '@types';

export const getSucursales = async (): Promise<Respuesta<SucursalDto[]>> => {
    const { data } = await api.get<Respuesta<SucursalDto[]>>(ENDPOINTS.SUCURSAL.GETALL);
    return data;
};

export const getSucursalById = async (id: string): Promise<Respuesta<SucursalDto>> => {
    const { data } = await api.get<Respuesta<SucursalDto>>(ENDPOINTS.SUCURSAL.GETBYID(id));
    return data;
};

export const createSucursal = async (sucursal: SucursalCrearDto): Promise<Respuesta<SucursalDto>> => {
    const { data } = await api.post<Respuesta<SucursalDto>>(ENDPOINTS.SUCURSAL.CREATE, sucursal);
    return data;
};

export const updateSucursal = async (sucursal: SucursalActualizarDto): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.SUCURSAL.UPDATE(sucursal.sucursalId), sucursal);
    return data;
};

export const desactivarSucursal = async ( id : string ): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.SUCURSAL.DESACTIVAR(id));
    return data;
};