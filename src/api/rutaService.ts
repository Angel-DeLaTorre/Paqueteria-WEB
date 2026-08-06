import type {Result, RutaCreateDto, RutaDto, RutaUpdateDto} from "@types";
import api from "@api/config/axiosConfig.ts";
import {ENDPOINTS} from "@api/config/endpoints.ts";

export const getRutas = async (): Promise<Result<RutaDto[]>> => {
    const { data } = await api.get<Result<RutaDto[]>>(ENDPOINTS.RUTA.GETALL);
    return data;
};

export const getRuta = async ( id : string): Promise<Result<RutaDto>> => {
    const { data } = await api.get<Result<RutaDto>>(ENDPOINTS.RUTA.GETBYID(id));
    return data;
};

export const createRuta = async (ruta: RutaCreateDto): Promise<Result<RutaDto>> => {
    const { data } = await api.post<Result<RutaDto>>(ENDPOINTS.RUTA.CREATE, ruta);
    return data;
};

export const updateRuta = async (ruta: RutaUpdateDto): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.RUTA.UPDATE(ruta.rutaId), ruta);
    return data;
};

export const deleteRuta = async ( id : string ): Promise<Result<boolean>> => {
    const { data } = await api.delete<Result<boolean>>(ENDPOINTS.RUTA.DELETE(id));
    return data;
};