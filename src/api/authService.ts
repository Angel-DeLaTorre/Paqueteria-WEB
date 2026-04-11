import api from '@api/config/axiosConfig';
import type { LoginDto, SesionDto } from '@types';

export const postLogin = async (credentials: LoginDto): Promise<SesionDto> => {
    const { data } = await api.post<SesionDto>('/v1/auth', credentials);
    return data;
};