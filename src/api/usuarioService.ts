import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {UsuarioDto, UsuarioCreateDto, UsuarioUpdateDto, Result} from '@types';

export const getUsuarios = async (): Promise<Result<UsuarioDto[]>> => {
    const { data } = await api.get<Result<UsuarioDto[]>>(ENDPOINTS.USUARIO.GETALL);
    return data;
};

export const createUsuario = async (usuario: UsuarioCreateDto): Promise<Result<UsuarioDto>> => {
    const { data } = await api.post<Result<UsuarioDto>>(ENDPOINTS.USUARIO.CREATE, usuario);
    return data;
};

export const updateUsuario = async (usuario: UsuarioUpdateDto): Promise<Result<UsuarioDto>> => {
    const { data } = await api.put<Result<UsuarioDto>>(ENDPOINTS.USUARIO.UPDATE(usuario.usuarioId), usuario);
    return data;
};

export const desactivarUsuario = async ( id : string ): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.USUARIO.DESACTIVAR(id));
    return data;
};