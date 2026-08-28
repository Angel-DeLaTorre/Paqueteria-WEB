import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type { LoginDto, SesionDto, Result} from '@types';

export const postLogin = async (credentials: LoginDto): Promise<Result<SesionDto>> => {
    const { data } = await api.post<Result<SesionDto>>(ENDPOINTS.AUTH.LOGIN, credentials);
    return data;
};