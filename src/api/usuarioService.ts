import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type { UsuarioDto, UsuarioCreateDto } from '@types';

export const getUsuarios = async (): Promise<UsuarioDto[]> => {
    const { data } = await api.get<UsuarioDto[]>(ENDPOINTS.USUARIO.GETALL);
    return data;
};

export const createUsuario = async (usuario: UsuarioCreateDto): Promise<UsuarioDto> => {
    const { data } = await api.post<UsuarioDto>(ENDPOINTS.USUARIO.CREATE, usuario);
    return data;
};