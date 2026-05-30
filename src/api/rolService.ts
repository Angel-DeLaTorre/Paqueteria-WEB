import type {ApiResult, RolDto} from "@types";
import api from "@api/config/axiosConfig.ts";
import {ENDPOINTS} from "@api/config/endpoints.ts";

export const getRoles = async (): Promise<ApiResult<RolDto[]>> => {
    const { data } = await api.get<ApiResult<RolDto[]>>(ENDPOINTS.ROLES.GETALL);
    return data;
};