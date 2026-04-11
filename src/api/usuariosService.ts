import api from '@api/config/axiosConfig';
import type { UsuarioDto, UsuarioCreateDto } from '@types';

export const getUsuarios = async (): Promise<UsuarioDto[]> => {
    const { data } = await api.get<UsuarioDto[]>('v1/usuario');
    return data;
};

export const createUsuario = async (usuario: UsuarioCreateDto): Promise<UsuarioDto> => {
    const { data } = await api.post<UsuarioDto>('v1/usuario/', usuario);
    return data;
};