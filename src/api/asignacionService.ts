import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {AsignacionDto, AsignacionCreateDto, AsignacionUpdateDto} from '@types';

export const getAsignaciones = async (): Promise<AsignacionDto[]> => {
    const { data } = await api.get<AsignacionDto[]>(ENDPOINTS.ASIGNACION.GETALL);
    return data;
};

export const getAsignacionById = async (id: string): Promise<AsignacionDto> => {
    const { data } = await api.get<AsignacionDto>(ENDPOINTS.ASIGNACION.GETBYID(id));
    return data;
};

export const createAsignacion = async (asigancion: AsignacionCreateDto): Promise<AsignacionDto> => {
    const { data } = await api.post<AsignacionDto>(ENDPOINTS.ASIGNACION.CREATE, asigancion);
    return data;
};

export const updateAsignacion = async (id: string, asignacion: AsignacionUpdateDto): Promise<boolean> => {
    const { data } = await api.post(ENDPOINTS.ASIGNACION.UPDATE(id), asignacion);
    return data;
}