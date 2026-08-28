import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {GuiaDto, GuiaCrearDto, GuiaActualizarDto, Respuesta, GuiaCreadaDto, GuiaFiltroDto} from '@types';

export const getGuias = async (): Promise<Respuesta<GuiaDto[]>> => {
    const { data } = await api.get<Respuesta<GuiaDto[]>>(ENDPOINTS.GUIA.GETALL);
    return data;
};

export const getGuiasFiltro = async (filtro? : GuiaFiltroDto): Promise<Respuesta<GuiaDto[]>> => {
    const { data } = await api.post<Respuesta<GuiaDto[]>>(ENDPOINTS.GUIA.GET_FILTRO, filtro);
    return data;
};

export const getGuiaById = async (id: string): Promise<Respuesta<GuiaDto>> => {
    const { data } = await api.get<Respuesta<GuiaDto>>(ENDPOINTS.GUIA.GETBYID(id));
    return data;
};

export const createGuia = async (guia: GuiaCrearDto): Promise<Respuesta<GuiaCreadaDto>> => {
    const { data } = await api.post<Respuesta<GuiaCreadaDto>>(ENDPOINTS.GUIA.CREATE, guia);
    return data;
};

export const updateGuia = async (guia: GuiaActualizarDto): Promise<Respuesta<boolean>> => {
    const { data } = await api.patch<Respuesta<boolean>>(ENDPOINTS.GUIA.UPDATE(guia.guiaId), guia);
    return data;
}

export const generarEtiqueta = async (guiaId: string):  Promise<Blob> => {
    const { data } = await api.get(ENDPOINTS.GUIA.GENERAR_ETIQUETA(guiaId), {
        responseType: 'blob',
    });
    return data;
}

export const generarCarta = async (asignacionId: string):  Promise<Blob> => {
    const { data } = await api.get(ENDPOINTS.GUIA.GENERAR_CARTA(asignacionId), {
        responseType: 'blob',
    });
    return data;
}