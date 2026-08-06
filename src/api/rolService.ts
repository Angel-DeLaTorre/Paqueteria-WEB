import type {Result, RolDto} from "@types";
import api from "@api/config/axiosConfig.ts";
import {ENDPOINTS} from "@api/config/endpoints.ts";

export const getRoles = async (): Promise<Result<RolDto[]>> => {
    const { data } = await api.get<Result<RolDto[]>>(ENDPOINTS.ROLES.GETALL);
    return data;
};

export const desactivarRol = async ( id : string ): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.ROLES.DESACTIVAR(id));
    return data;
};