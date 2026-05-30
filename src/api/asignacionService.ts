import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {AsignacionDto, AsignacionCreateDto, AsignacionUpdateDto, ApiResult} from '@types';

export const getAsignaciones = async (): Promise<ApiResult<AsignacionDto[]>> => {
    const { data } = await api.get<ApiResult<AsignacionDto[]>>(ENDPOINTS.ASIGNACION.GETALL);
    return data;
};

export const getAsignacionById = async (id: string): Promise<ApiResult<AsignacionDto>> => {
    const { data } = await api.get<ApiResult<AsignacionDto>>(ENDPOINTS.ASIGNACION.GETBYID(id));
    return data;
};

export const createAsignacion = async (asigancion: AsignacionCreateDto): Promise<ApiResult<AsignacionDto>> => {
    const { data } = await api.post<ApiResult<AsignacionDto>>(ENDPOINTS.ASIGNACION.CREATE, asigancion);
    return data;
};

export const updateAsignacion = async (asignacion: AsignacionUpdateDto): Promise<ApiResult<boolean>> => {
    const { data } = await api.put<ApiResult<boolean>>(ENDPOINTS.ASIGNACION.UPDATE(asignacion.asigancionId), asignacion);
    return data;
}