import type {Respuesta, RutaCrearDto, RutaDto, RutaActualizarDto} from "@types";
import api from "@api/config/axiosConfig.ts";
import {ENDPOINTS} from "@api/config/endpoints.ts";

export const getRutas = async (): Promise<Respuesta<RutaDto[]>> => {
    const { data } = await api.get<Respuesta<RutaDto[]>>(ENDPOINTS.RUTA.GETALL);
    return data;
};

export const getRuta = async ( id : string): Promise<Respuesta<RutaDto>> => {
    const { data } = await api.get<Respuesta<RutaDto>>(ENDPOINTS.RUTA.GETBYID(id));
    return data;
};

export const createRuta = async (ruta: RutaCrearDto): Promise<Respuesta<RutaDto>> => {
    const { data } = await api.post<Respuesta<RutaDto>>(ENDPOINTS.RUTA.CREATE, ruta);
    return data;
};

export const updateRuta = async (ruta: RutaActualizarDto): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.RUTA.UPDATE(ruta.rutaId), ruta);
    return data;
};

export const deleteRuta = async ( id : string ): Promise<Respuesta<boolean>> => {
    const { data } = await api.delete<Respuesta<boolean>>(ENDPOINTS.RUTA.DELETE(id));
    return data;
};