import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ApiResult, LoginDto, SesionDto} from '@types';

export const postLogin = async (credentials: LoginDto): Promise<ApiResult<SesionDto>> => {
    const { data } = await api.post<ApiResult<SesionDto>>(ENDPOINTS.AUTH.LOGIN, credentials);
    return data;
};