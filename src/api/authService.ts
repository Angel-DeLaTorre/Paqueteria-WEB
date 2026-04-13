import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type { LoginDto, SesionDto } from '@types';

export const postLogin = async (credentials: LoginDto): Promise<SesionDto> => {
    const { data } = await api.post<SesionDto>(ENDPOINTS.AUTH.LOGIN, credentials);
    return data;
};