import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {UsuarioDto, UsuarioCreateDto, UsuarioUpdateDto, ApiResult} from '@types';

export const getUsuarios = async (): Promise<ApiResult<UsuarioDto[]>> => {
    const { data } = await api.get<ApiResult<UsuarioDto[]>>(ENDPOINTS.USUARIO.GETALL);
    return data;
};

export const createUsuario = async (usuario: UsuarioCreateDto): Promise<ApiResult<UsuarioDto>> => {
    const { data } = await api.post<ApiResult<UsuarioDto>>(ENDPOINTS.USUARIO.CREATE, usuario);
    return data;
};

export const updateUsuario = async (usuario: UsuarioUpdateDto): Promise<ApiResult<UsuarioDto>> => {
    const { data } = await api.put<ApiResult<UsuarioDto>>(ENDPOINTS.USUARIO.UPDATE(usuario.usuarioId), usuario);
    return data;
};