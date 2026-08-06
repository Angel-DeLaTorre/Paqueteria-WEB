import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {AsignacionDto, AsignacionCreateDto, AsignacionUpdateDto, Result} from '@types';

export const getAsignaciones = async (): Promise<Result<AsignacionDto[]>> => {
    const { data } = await api.get<Result<AsignacionDto[]>>(ENDPOINTS.ASIGNACION.GETALL);
    return data;
};

export const getAsignacionById = async (id: string): Promise<Result<AsignacionDto>> => {
    const { data } = await api.get<Result<AsignacionDto>>(ENDPOINTS.ASIGNACION.GETBYID(id));
    return data;
};

export const createAsignacion = async (asigancion: AsignacionCreateDto): Promise<Result<AsignacionDto>> => {
    const { data } = await api.post<Result<AsignacionDto>>(ENDPOINTS.ASIGNACION.CREATE, asigancion);
    return data;
};

export const updateAsignacion = async (asignacion: AsignacionUpdateDto): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.ASIGNACION.UPDATE(asignacion.asigancionId), asignacion);
    return data;
}