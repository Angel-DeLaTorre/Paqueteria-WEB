import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {AsignacionDto, AsignacionCrearDto, AsignacionActualizarDto, Respuesta} from '@types';

export const getAsignaciones = async (): Promise<Respuesta<AsignacionDto[]>> => {
    const { data } = await api.get<Respuesta<AsignacionDto[]>>(ENDPOINTS.ASIGNACION.GETALL);
    return data;
};

export const getAsignacionById = async (id: string): Promise<Respuesta<AsignacionDto>> => {
    const { data } = await api.get<Respuesta<AsignacionDto>>(ENDPOINTS.ASIGNACION.GETBYID(id));
    return data;
};

export const createAsignacion = async (asigancion: AsignacionCrearDto): Promise<Respuesta<AsignacionDto>> => {
    const { data } = await api.post<Respuesta<AsignacionDto>>(ENDPOINTS.ASIGNACION.CREATE, asigancion);
    return data;
};

export const updateAsignacion = async (asignacion: AsignacionActualizarDto): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.ASIGNACION.UPDATE(asignacion.asignacionId), asignacion);
    return data;
}

export const generarReporteSalida = async (asignacionId: string):  Promise<Blob> => {
    const { data } = await api.get(ENDPOINTS.ASIGNACION.REPORTE_SALIDA(asignacionId), {
        responseType: 'blob',
    });
    return data;
}