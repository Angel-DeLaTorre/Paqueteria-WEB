import type {Respuesta, RolDto} from "@types";
import api from "@api/config/axiosConfig.ts";
import {ENDPOINTS} from "@api/config/endpoints.ts";

export const getRoles = async (): Promise<Respuesta<RolDto[]>> => {
    const { data } = await api.get<Respuesta<RolDto[]>>(ENDPOINTS.ROLES.GETALL);
    return data;
};

export const desactivarRol = async ( id : string ): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.ROLES.DESACTIVAR(id));
    return data;
};